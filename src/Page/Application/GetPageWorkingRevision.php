<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use LemurDB;

/**
 * The revision an editor should open: the working draft when one exists,
 * otherwise the published revision. 'revision' is the If-Match value for saves.
 */
final class GetPageWorkingRevision
{
    public function __construct(private readonly LemurDB $db, private readonly string $siteId) {}

    /**
     * @return array{revision: int, etag: string, root: list<mixed>, settings: array<string, mixed>,
     *   publishedRevision: ?int, hasUnpublishedChanges: bool, savedAt: string, reason: string}|null
     */
    public function execute(string $pageId): ?array
    {
        $prefix = $this->db->getPrefix();
        $query = $this->db->pdo()->prepare("SELECT w.revision, w.snapshot, w.created_at, w.reason, p.revision AS published_revision,
                h.draft_revision_id, h.published_revision_id
            FROM {$prefix}page_revision_heads h
            JOIN {$prefix}page_revisions w ON w.id = COALESCE(h.draft_revision_id, h.published_revision_id) AND w.site_id = ?
            LEFT JOIN {$prefix}page_revisions p ON p.id = h.published_revision_id
            WHERE h.page_id = ?");
        $query->execute([$this->siteId, $pageId]);
        $row = $query->fetch(\PDO::FETCH_ASSOC);
        if ($row === false) {
            return null;
        }
        $snapshot = json_decode($row['snapshot'], true, 512, JSON_THROW_ON_ERROR);
        $revision = (int) $row['revision'];
        return [
            'revision' => $revision,
            'etag' => '"' . $revision . '"',
            'root' => $snapshot['root'] ?? [],
            'settings' => $snapshot['settings'] ?? [],
            'publishedRevision' => $row['published_revision'] === null ? null : (int) $row['published_revision'],
            'hasUnpublishedChanges' => $row['draft_revision_id'] !== null && $row['draft_revision_id'] !== $row['published_revision_id'],
            'savedAt' => $row['created_at'],
            'reason' => $row['reason'],
        ];
    }
}
