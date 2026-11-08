<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use InvalidArgumentException;
use LemurDB;
use LemurCms\PageBuilder\Domain\Contract\Clock;
use LemurCms\PageBuilder\Infrastructure\SystemClock;

/**
 * Operational counters for one site connection, suitable for health checks and
 * alerting (outbox lag, dead letters, conflicts, denials). No content or secrets.
 */
final class PageRevisionOperationalMetrics
{
    private readonly Clock $clock;

    public function __construct(private readonly LemurDB $db, private readonly string $siteId, ?Clock $clock = null)
    {
        if (trim($siteId) === '') {
            throw new InvalidArgumentException('A site ID is required for metrics');
        }
        $this->clock = $clock ?? new SystemClock();
    }

    /** @return array<string, int|null> */
    public function snapshot(int $windowHours = 24): array
    {
        if ($windowHours < 1 || $windowHours > 720) {
            throw new InvalidArgumentException('Window must be between 1 and 720 hours');
        }
        $p = $this->db->getPrefix();
        $now = $this->clock->now();
        $since = $now->modify('-' . $windowHours . ' hours')->format('Y-m-d H:i:s');

        $outbox = $this->row("SELECT
                SUM(CASE WHEN delivered_at IS NULL AND failed_at IS NULL THEN 1 ELSE 0 END) AS pending,
                SUM(CASE WHEN delivered_at IS NULL AND failed_at IS NULL AND attempts > 0 THEN 1 ELSE 0 END) AS retrying,
                SUM(CASE WHEN failed_at IS NOT NULL AND delivered_at IS NULL THEN 1 ELSE 0 END) AS dead_lettered,
                MIN(CASE WHEN delivered_at IS NULL AND failed_at IS NULL THEN created_at END) AS oldest_pending
            FROM {$p}page_publication_outbox WHERE site_id = ?", [$this->siteId]);
        $audit = $this->row("SELECT
                SUM(CASE WHEN result = 'conflict' THEN 1 ELSE 0 END) AS conflicts,
                SUM(CASE WHEN result = 'denied' THEN 1 ELSE 0 END) AS denied,
                SUM(CASE WHEN result = 'failed' THEN 1 ELSE 0 END) AS failed,
                SUM(CASE WHEN action IN ('save', 'autosave') AND result = 'success' THEN 1 ELSE 0 END) AS saves,
                SUM(CASE WHEN action = 'publish' AND result = 'success' THEN 1 ELSE 0 END) AS publications
            FROM {$p}page_revision_audit WHERE site_id = ? AND created_at >= ?", [$this->siteId, $since]);
        $revisions = $this->row("SELECT COUNT(*) AS total, SUM(CASE WHEN pinned = 1 THEN 1 ELSE 0 END) AS pinned
            FROM {$p}page_revisions WHERE site_id = ?", [$this->siteId]);

        $oldest = $outbox['oldest_pending'] ?? null;
        $lag = $oldest === null ? null
            : max(0, $now->getTimestamp() - (new \DateTimeImmutable((string) $oldest, $now->getTimezone()))->getTimestamp());

        return [
            'outboxPending' => (int) ($outbox['pending'] ?? 0),
            'outboxRetrying' => (int) ($outbox['retrying'] ?? 0),
            'outboxDeadLettered' => (int) ($outbox['dead_lettered'] ?? 0),
            'outboxOldestPendingSeconds' => $lag,
            'revisionsTotal' => (int) ($revisions['total'] ?? 0),
            'revisionsPinned' => (int) ($revisions['pinned'] ?? 0),
            'windowHours' => $windowHours,
            'saves' => (int) ($audit['saves'] ?? 0),
            'publications' => (int) ($audit['publications'] ?? 0),
            'conflicts' => (int) ($audit['conflicts'] ?? 0),
            'denied' => (int) ($audit['denied'] ?? 0),
            'failed' => (int) ($audit['failed'] ?? 0),
        ];
    }

    /** @param list<mixed> $params */
    private function row(string $sql, array $params): array
    {
        $query = $this->db->pdo()->prepare($sql);
        $query->execute($params);
        return $query->fetch(\PDO::FETCH_ASSOC) ?: [];
    }
}
