<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use LemurDB;
use LemurCms\Support\Helpers\UuidHelper;

/**
 * Publishes the page's current working draft. A page without unpublished
 * changes is left as is. Concurrent edits surface as PageRevisionConflict.
 */
final class PublishPage
{
    public function __construct(
        private readonly LemurDB $db,
        private readonly string $siteId,
        private readonly PublishPageRevision $publishRevision,
    ) {}

    /** @return string|null Published revision ID, or null when there was nothing to publish. */
    public function execute(string $id, ?string $actorId = null): ?string
    {
        $prefix = $this->db->getPrefix();
        $query = $this->db->pdo()->prepare("SELECT h.draft_revision_id, h.published_revision_id, r.revision
            FROM {$prefix}page_revision_heads h
            LEFT JOIN {$prefix}page_revisions r ON r.id = h.draft_revision_id AND r.site_id = ?
            WHERE h.page_id = ?");
        $query->execute([$this->siteId, $id]);
        $head = $query->fetch(\PDO::FETCH_ASSOC);
        if ($head === false) {
            throw new PageNotFound();
        }
        if ($head['draft_revision_id'] === null || $head['draft_revision_id'] === $head['published_revision_id']) {
            return null;
        }
        if ($head['revision'] === null) {
            throw new PageRevisionNotFound();
        }
        // A fresh key per request: retries of the same draft are no-ops because the
        // draft is already the published revision.
        return $this->publishRevision->execute($id, (int) $head['revision'], 'publish:' . UuidHelper::v4(), $actorId);
    }
}
