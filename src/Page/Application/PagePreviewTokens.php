<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use InvalidArgumentException;
use LemurDB;
use LemurCms\PageBuilder\Domain\Contract\Clock;
use LemurCms\PageBuilder\Infrastructure\SystemClock;
use LemurCms\Support\Helpers\UuidHelper;

/**
 * Short-lived, revocable preview links bound to one site, page and revision.
 * Only the SHA-256 of the 256-bit token is stored; the raw token is returned once.
 */
final class PagePreviewTokens
{
    public const MIN_TTL = 60;
    public const MAX_TTL = 3600;
    public const DEFAULT_TTL = 600;
    private const MAX_ACTIVE_PER_PAGE = 50;

    private readonly Clock $clock;
    private readonly PageRevisionAuditLog $audit;

    public function __construct(private readonly LemurDB $db, private readonly string $siteId, ?Clock $clock = null)
    {
        if (trim($siteId) === '') {
            throw new InvalidArgumentException('A site ID is required for previews');
        }
        $this->clock = $clock ?? new SystemClock();
        $this->audit = new PageRevisionAuditLog($db, $siteId, $this->clock);
    }

    /** @return array{token: string, tokenId: string, revision: int, expiresAt: string} */
    public function issue(string $pageId, int $revisionNumber, string $actorId, int $ttlSeconds = self::DEFAULT_TTL): array
    {
        if ($pageId === '' || $revisionNumber < 1 || $actorId === ''
            || $ttlSeconds < self::MIN_TTL || $ttlSeconds > self::MAX_TTL) {
            throw new InvalidArgumentException('Invalid preview token request');
        }
        $prefix = $this->db->getPrefix();
        $pdo = $this->db->pdo();
        return $this->db->transaction(function () use ($pdo, $prefix, $pageId, $revisionNumber, $actorId, $ttlSeconds): array {
            $revision = $pdo->prepare("SELECT id FROM {$prefix}page_revisions WHERE page_id = ? AND site_id = ? AND revision = ?");
            $revision->execute([$pageId, $this->siteId, $revisionNumber]);
            $revisionId = $revision->fetchColumn();
            if ($revisionId === false) {
                throw new PageRevisionNotFound();
            }
            $now = $this->clock->now();
            $nowText = $now->format('Y-m-d H:i:s');
            $active = $pdo->prepare("SELECT COUNT(*) FROM {$prefix}page_preview_tokens
                WHERE site_id = ? AND page_id = ? AND revoked_at IS NULL AND expires_at > ?");
            $active->execute([$this->siteId, $pageId, $nowText]);
            if ((int) $active->fetchColumn() >= self::MAX_ACTIVE_PER_PAGE) {
                throw new PreviewTokenLimitReached();
            }
            $token = rtrim(strtr(base64_encode(random_bytes(32)), '+/', '-_'), '=');
            $tokenId = UuidHelper::v4();
            $expiresAt = $now->modify('+' . $ttlSeconds . ' seconds')->format('Y-m-d H:i:s');
            $pdo->prepare("INSERT INTO {$prefix}page_preview_tokens
                (id, site_id, page_id, revision_id, token_hash, created_by, expires_at, revoked_at, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, NULL, ?)")
                ->execute([$tokenId, $this->siteId, $pageId, $revisionId, hash('sha256', $token), $actorId, $expiresAt, $nowText]);
            $this->audit->record($pageId, 'preview_issue', 'success', $actorId, null, $revisionId, [
                'tokenId' => $tokenId, 'revision' => $revisionNumber, 'expiresAt' => $expiresAt,
            ]);
            return ['token' => $token, 'tokenId' => $tokenId, 'revision' => $revisionNumber, 'expiresAt' => $expiresAt];
        });
    }

    /**
     * Returns the bound revision for a valid token, or null for any invalid,
     * expired, revoked or foreign token, without revealing which.
     *
     * @return array{pageId: string, revision: int, snapshot: array<string, mixed>}|null
     */
    public function resolve(string $token): ?array
    {
        if (!preg_match('/^[A-Za-z0-9_-]{43}$/D', $token)) {
            return null;
        }
        $prefix = $this->db->getPrefix();
        $query = $this->db->pdo()->prepare("SELECT t.page_id, r.revision, r.snapshot
            FROM {$prefix}page_preview_tokens t
            JOIN {$prefix}page_revisions r ON r.id = t.revision_id AND r.page_id = t.page_id AND r.site_id = t.site_id
            WHERE t.token_hash = ? AND t.site_id = ? AND t.revoked_at IS NULL AND t.expires_at > ?");
        $query->execute([hash('sha256', $token), $this->siteId, $this->clock->now()->format('Y-m-d H:i:s')]);
        $row = $query->fetch(\PDO::FETCH_ASSOC);
        if ($row === false) {
            return null;
        }
        $snapshot = json_decode($row['snapshot'], true, 512, JSON_THROW_ON_ERROR);
        if (!is_array($snapshot)) {
            return null;
        }
        return ['pageId' => $row['page_id'], 'revision' => (int) $row['revision'], 'snapshot' => $snapshot];
    }

    /** Revokes one token, or every active token of the page when $tokenId is null. */
    public function revoke(string $pageId, string $actorId, ?string $tokenId = null): int
    {
        if ($pageId === '' || $actorId === '' || $tokenId === '') {
            throw new InvalidArgumentException('Invalid preview revocation request');
        }
        $prefix = $this->db->getPrefix();
        $pdo = $this->db->pdo();
        return $this->db->transaction(function () use ($pdo, $prefix, $pageId, $actorId, $tokenId): int {
            $now = $this->clock->now()->format('Y-m-d H:i:s');
            $sql = "UPDATE {$prefix}page_preview_tokens SET revoked_at = ?
                WHERE site_id = ? AND page_id = ? AND revoked_at IS NULL AND expires_at > ?";
            $params = [$now, $this->siteId, $pageId, $now];
            if ($tokenId !== null) {
                $sql .= ' AND id = ?';
                $params[] = $tokenId;
            }
            $update = $pdo->prepare($sql);
            $update->execute($params);
            $revoked = $update->rowCount();
            $this->audit->record($pageId, 'preview_revoke', 'success', $actorId, null, null, [
                'tokenId' => $tokenId, 'revoked' => $revoked,
            ]);
            return $revoked;
        });
    }
}
