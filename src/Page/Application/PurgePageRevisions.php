<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use InvalidArgumentException;
use LemurDB;
use LemurCms\PageBuilder\Domain\Contract\Clock;
use LemurCms\PageBuilder\Domain\Contract\RevisionArchive;
use LemurCms\PageBuilder\Infrastructure\SystemClock;

/**
 * Applies the retention policy for one site connection.
 *
 * Dry-run by default. A real run archives every candidate (with snapshot) before
 * deleting; if the archive fails nothing is deleted. Protection predicates are
 * re-checked inside the delete transaction to tolerate concurrent pins/edits.
 * Invoke from an authorized maintenance command, never from a web request.
 */
final class PurgePageRevisions
{
    private readonly Clock $clock;
    private readonly PageRevisionAuditLog $audit;

    public function __construct(
        private readonly LemurDB $db,
        private readonly string $siteId,
        private readonly RevisionArchive $archive,
        ?Clock $clock = null,
    ) {
        if (trim($siteId) === '') {
            throw new InvalidArgumentException('A site ID is required for retention');
        }
        $this->clock = $clock ?? new SystemClock();
        $this->audit = new PageRevisionAuditLog($db, $siteId, $this->clock);
    }

    /**
     * @return array{dryRun: bool, candidates: int, purged: int, outboxPurged: int, pages: array<string, int>, archive: ?string}
     */
    public function execute(PageRevisionRetentionPolicy $policy, bool $dryRun = true, string $actorId = 'system:retention'): array
    {
        $now = $this->clock->now();
        $nowText = $now->format('Y-m-d H:i:s');
        $outboxPurged = 0;
        if (!$dryRun) {
            // Only delivered events; pending and dead-lettered events are operational evidence.
            $delete = $this->db->pdo()->prepare("DELETE FROM {$this->table('page_publication_outbox')}
                WHERE site_id = ? AND delivered_at IS NOT NULL AND delivered_at < ?");
            $delete->execute([$this->siteId, $now->modify('-' . $policy->deliveredOutboxDays . ' days')->format('Y-m-d H:i:s')]);
            $outboxPurged = $delete->rowCount();
        }
        $cutoff = $now->modify('-' . $policy->minAgeDays . ' days')->format('Y-m-d H:i:s');
        $candidates = $this->candidates($policy, $cutoff, $nowText, $dryRun);
        $pages = [];
        foreach ($candidates as $row) {
            $pages[$row['page_id']] = ($pages[$row['page_id']] ?? 0) + 1;
        }
        $result = ['dryRun' => $dryRun, 'candidates' => count($candidates), 'purged' => 0,
            'outboxPurged' => $outboxPurged, 'pages' => $pages, 'archive' => null];
        if ($dryRun || $candidates === []) {
            return $result;
        }

        $reference = $this->archive->archive($this->siteId, $candidates);
        $result['archive'] = $reference;
        $result['purged'] = $this->db->transaction(function () use ($candidates, $nowText, $reference, $actorId): int {
            $delete = $this->db->pdo()->prepare("DELETE FROM {$this->table('page_revisions')}
                WHERE id = ? AND site_id = ? AND pinned = 0 AND {$this->protectionPredicate($this->table('page_revisions'))}");
            $deleted = 0;
            $perPage = [];
            foreach ($candidates as $row) {
                $delete->execute([$row['id'], $this->siteId, $nowText]);
                if ($delete->rowCount() === 1) {
                    $deleted++;
                    $perPage[$row['page_id']][] = (int) $row['revision'];
                }
            }
            foreach ($perPage as $pageId => $numbers) {
                $this->audit->record((string) $pageId, 'retention_purge', 'success', $actorId, null, null, [
                    'purged' => count($numbers), 'fromRevision' => min($numbers), 'toRevision' => max($numbers),
                    'archive' => substr($reference, 0, 200),
                ]);
            }
            return $deleted;
        });
        return $result;
    }

    /** @return list<array<string, mixed>> */
    private function candidates(PageRevisionRetentionPolicy $policy, string $cutoff, string $now, bool $dryRun): array
    {
        $revisions = $this->table('page_revisions');
        $columns = $dryRun ? 'r.id, r.page_id, r.revision, r.created_at'
            : 'r.id, r.page_id, r.site_id, r.revision, r.schema_version, r.snapshot, r.content_hash, r.author_id, r.reason, r.created_at';
        // Integers are validated by the policy and inlined: SQLite compares a bound
        // (text) parameter with COUNT(*) as text, which never matches.
        $limit = $policy->maxRevisionsPerRun;
        $keep = $policy->keepLatestPerPage;
        $query = $this->db->pdo()->prepare("SELECT {$columns} FROM {$revisions} r
            WHERE r.site_id = ? AND r.pinned = 0 AND r.created_at < ? AND {$this->protectionPredicate('r')}
              AND (SELECT COUNT(*) FROM {$revisions} newer WHERE newer.page_id = r.page_id AND newer.revision > r.revision) >= {$keep}
            ORDER BY r.page_id, r.revision LIMIT {$limit}");
        $query->execute([$this->siteId, $cutoff, $now]);
        return $query->fetchAll(\PDO::FETCH_ASSOC);
    }

    /** Expects one positional parameter: the current time (for active preview links). */
    private function protectionPredicate(string $alias): string
    {
        $col = $alias . '.id';
        return "{$col} NOT IN (SELECT draft_revision_id FROM {$this->table('page_revision_heads')} WHERE draft_revision_id IS NOT NULL)
            AND {$col} NOT IN (SELECT published_revision_id FROM {$this->table('page_revision_heads')} WHERE published_revision_id IS NOT NULL)
            AND NOT EXISTS (SELECT 1 FROM {$this->table('page_publication_outbox')} o WHERE o.revision_id = {$col})
            AND NOT EXISTS (SELECT 1 FROM {$this->table('page_preview_tokens')} t
                WHERE t.revision_id = {$col} AND t.revoked_at IS NULL AND t.expires_at > ?)";
    }

    private function table(string $name): string
    {
        return $this->db->getPrefix() . $name;
    }
}
