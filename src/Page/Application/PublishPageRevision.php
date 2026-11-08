<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use InvalidArgumentException;
use LemurDB;
use LemurCms\PageBuilder\Domain\Contract\Clock;
use LemurCms\PageBuilder\Infrastructure\SystemClock;
use LemurCms\Support\Helpers\UuidHelper;
use RuntimeException;

/**
 * Publishes the requested draft and records cache invalidation in one transaction.
 *
 * Refuses to overwrite public content that changed outside the revision system
 * (PublicContentDrift); the operator reconciles it into a draft first.
 */
final class PublishPageRevision
{
    private readonly Clock $clock;
    private readonly PageRevisionAuditLog $audit;

    public function __construct(private readonly LemurDB $db, private readonly string $siteId, ?Clock $clock = null)
    {
        $this->clock = $clock ?? new SystemClock();
        $this->audit = new PageRevisionAuditLog($db, $siteId === '' ? '-' : $siteId, $this->clock);
    }

    public function execute(string $pageId, int $revisionNumber, string $idempotencyKey, ?string $actorId = null): string
    {
        if ($pageId === '' || $this->siteId === '' || $revisionNumber < 1
            || $idempotencyKey === '' || strlen($idempotencyKey) > 191) {
            throw new InvalidArgumentException('Invalid publication request');
        }
        $pdo = $this->db->pdo();
        $prefix = $this->db->getPrefix();
        return $this->db->transaction(function () use ($pdo, $prefix, $pageId, $revisionNumber, $idempotencyKey, $actorId): string {
            $outbox = $prefix . 'page_publication_outbox';
            $heads = $prefix . 'page_revision_heads';
            $pages = $prefix . 'pages';
            $sqlite = $pdo->getAttribute(\PDO::ATTR_DRIVER_NAME) === 'sqlite';
            $head = SavePageDraft::lockHead($pdo, $heads, $pageId);
            if ($head === null) {
                throw new RuntimeException('Page revision head unavailable');
            }
            $attempt = $pdo->prepare("SELECT page_id, revision_id, event_type FROM {$outbox} WHERE site_id = ? AND idempotency_key = ?");
            $attempt->execute([$this->siteId, $idempotencyKey]);
            $previous = $attempt->fetch(\PDO::FETCH_ASSOC);
            $revision = $this->revision($pdo, $prefix, $pageId, $revisionNumber);
            if ($previous !== false) {
                if ($previous['page_id'] !== $pageId || $previous['revision_id'] !== $revision['id']
                    || ($previous['event_type'] ?? 'published') !== 'published') {
                    throw new PagePublicationKeyConflict();
                }
                return $revision['id'];
            }
            if ($head['published_revision_id'] === $revision['id']) {
                return $revision['id'];
            }
            if ($head['draft_revision_id'] !== $revision['id']) {
                $current = $pdo->prepare("SELECT revision FROM {$prefix}page_revisions WHERE id = ? AND page_id = ? AND site_id = ?");
                $current->execute([$head['draft_revision_id'] ?? $head['published_revision_id'], $pageId, $this->siteId]);
                $currentRevision = $current->fetchColumn();
                if ($currentRevision === false) {
                    throw new RuntimeException('Current page revision unavailable for this site');
                }
                throw new PageRevisionConflict((int) $currentRevision);
            }
            $pageSql = "SELECT content FROM {$pages} WHERE id = ?";
            $pageQuery = $pdo->prepare($sqlite ? $pageSql : $pageSql . ' FOR UPDATE');
            $pageQuery->execute([$pageId]);
            $page = $pageQuery->fetch(\PDO::FETCH_ASSOC);
            if ($page === false) {
                throw new RuntimeException('Page unavailable');
            }
            if (!PublicContentFingerprint::matches($head['public_content_hash'] ?? null, $page['content'])) {
                throw new PublicContentDrift();
            }
            $snapshot = json_decode($revision['snapshot'], false, 512, JSON_THROW_ON_ERROR);
            if (!is_object($snapshot) || !is_array($snapshot->root ?? null)) {
                throw new RuntimeException('Revision snapshot is invalid');
            }
            $content = json_encode($snapshot->root, JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES);
            $now = $this->clock->now()->format('Y-m-d H:i:s');
            // The page row is locked above; rowCount() is not checked because MySQL reports
            // changed rows, not matched rows, for an identical republication.
            $pdo->prepare("UPDATE {$pages} SET content = ?, status = 'published', published_at = ? WHERE id = ?")
                ->execute([$content, $now, $pageId]);
            $pdo->prepare("UPDATE {$heads} SET published_revision_id = ?, public_content_hash = ?, updated_at = ? WHERE page_id = ?")
                ->execute([$revision['id'], PublicContentFingerprint::of($content), $now, $pageId]);
            $pdo->prepare("INSERT INTO {$outbox} (id,page_id,site_id,revision_id,idempotency_key,created_at,delivered_at,event_type,attempts) VALUES (?,?,?,?,?,?,NULL,'published',0)")
                ->execute([UuidHelper::v4(), $pageId, $this->siteId, $revision['id'], $idempotencyKey, $now]);
            $this->audit->record($pageId, 'publish', 'success', $actorId, $head['published_revision_id'], $revision['id'], [
                'revision' => $revisionNumber,
            ]);
            return $revision['id'];
        });
    }

    private function revision(\PDO $pdo, string $prefix, string $pageId, int $number): array
    {
        $query = $pdo->prepare("SELECT id, snapshot FROM {$prefix}page_revisions WHERE page_id = ? AND site_id = ? AND revision = ?");
        $query->execute([$pageId, $this->siteId, $number]);
        return $query->fetch(\PDO::FETCH_ASSOC) ?: throw new PageRevisionNotFound();
    }
}
