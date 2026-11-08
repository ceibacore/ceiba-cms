<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Contract;

/**
 * Durable backup written before revisions are purged. Implementations must
 * only return after the data is persisted; any failure must throw so that
 * nothing is deleted.
 */
interface RevisionArchive
{
    /**
     * @param list<array<string, mixed>> $revisions Full revision rows including snapshots.
     * @return string Opaque archive reference for the audit trail (no secrets, no absolute paths).
     */
    public function archive(string $siteId, array $revisions): string;
}
