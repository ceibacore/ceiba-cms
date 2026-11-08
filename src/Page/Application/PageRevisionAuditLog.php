<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use InvalidArgumentException;
use LemurDB;
use LemurCms\PageBuilder\Domain\Contract\Clock;
use LemurCms\PageBuilder\Infrastructure\SystemClock;
use Throwable;

/**
 * Append-only audit trail for revision operations.
 *
 * record() uses the site connection; when called inside a mutation transaction
 * the entry commits or rolls back with the change. Details never carry content.
 */
final class PageRevisionAuditLog
{
    public const ACTIONS = [
        'create', 'save', 'autosave', 'restore', 'reconcile', 'publish', 'unpublish',
        'pin', 'unpin', 'preview_issue', 'preview_revoke', 'retention_purge',
    ];
    public const RESULTS = ['success', 'denied', 'conflict', 'failed'];
    private const MAX_DETAILS_BYTES = 2000;

    private readonly Clock $clock;

    public function __construct(private readonly LemurDB $db, private readonly string $siteId, ?Clock $clock = null)
    {
        if (trim($siteId) === '') {
            throw new InvalidArgumentException('A site ID is required for auditing');
        }
        $this->clock = $clock ?? new SystemClock();
    }

    /** @param array<string, scalar|null> $details */
    public function record(
        string $pageId,
        string $action,
        string $result,
        ?string $actorId,
        ?string $sourceRevisionId = null,
        ?string $targetRevisionId = null,
        array $details = [],
        ?string $requestId = null,
    ): void {
        if ($pageId === '' || !in_array($action, self::ACTIONS, true) || !in_array($result, self::RESULTS, true)) {
            throw new InvalidArgumentException('Invalid audit entry');
        }
        foreach ($details as $key => $value) {
            if (!is_string($key) || strlen($key) > 64 || !(is_scalar($value) || $value === null)) {
                throw new InvalidArgumentException('Audit details must be a flat map of scalars');
            }
        }
        $encoded = $details === [] ? null : json_encode($details, JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        if ($encoded !== null && strlen($encoded) > self::MAX_DETAILS_BYTES) {
            throw new InvalidArgumentException('Audit details are too large');
        }
        if ($requestId !== null && !preg_match('/^[A-Za-z0-9_.:-]{1,64}$/D', $requestId)) {
            $requestId = null;
        }
        $this->db->pdo()->prepare("INSERT INTO {$this->db->getPrefix()}page_revision_audit
            (site_id, page_id, actor_id, action, result, source_revision_id, target_revision_id, details, request_id, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
            ->execute([
                $this->siteId, $pageId, $actorId === null ? null : substr($actorId, 0, 191),
                $action, $result, $sourceRevisionId, $targetRevisionId, $encoded, $requestId,
                $this->clock->now()->format('Y-m-d H:i:s'),
            ]);
    }

    /**
     * Records denied, conflicting or failed attempts outside the mutation transaction.
     * Never throws: an audit outage must not hide the original response.
     *
     * @param array<string, scalar|null> $details
     */
    public function recordQuietly(
        string $pageId,
        string $action,
        string $result,
        ?string $actorId,
        array $details = [],
        ?string $requestId = null,
    ): bool {
        try {
            if ($this->db->pdo()->inTransaction()) {
                return false;
            }
            $this->record($pageId, $action, $result, $actorId, null, null, $details, $requestId);
            return true;
        } catch (Throwable) {
            return false;
        }
    }

    /** @return list<array<string, mixed>> */
    public function forPage(string $pageId, int $limit = 50, int $offset = 0): array
    {
        if ($pageId === '' || $limit < 1 || $limit > 100 || $offset < 0) {
            throw new InvalidArgumentException('Invalid audit query');
        }
        $query = $this->db->pdo()->prepare("SELECT id, actor_id, action, result, source_revision_id, target_revision_id,
            details, request_id, created_at FROM {$this->db->getPrefix()}page_revision_audit
            WHERE site_id = ? AND page_id = ? ORDER BY id DESC LIMIT {$limit} OFFSET {$offset}");
        $query->execute([$this->siteId, $pageId]);
        return array_map(static fn (array $row): array => [
            'id' => (int) $row['id'],
            'actorId' => $row['actor_id'],
            'action' => $row['action'],
            'result' => $row['result'],
            'sourceRevisionId' => $row['source_revision_id'],
            'targetRevisionId' => $row['target_revision_id'],
            'details' => $row['details'] === null ? (object) [] : json_decode($row['details'], false, 8, JSON_THROW_ON_ERROR),
            'requestId' => $row['request_id'],
            'createdAt' => $row['created_at'],
        ], $query->fetchAll(\PDO::FETCH_ASSOC));
    }
}
