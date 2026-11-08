<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use InvalidArgumentException;
use LemurDB;
use LemurCms\PageBuilder\Domain\Contract\Clock;

/** Pins a revision so retention never purges it (audit, legal hold, reference versions). */
final class PinPageRevision
{
    private readonly PageRevisionAuditLog $audit;

    public function __construct(private readonly LemurDB $db, private readonly string $siteId, ?Clock $clock = null)
    {
        $this->audit = new PageRevisionAuditLog($db, $siteId === '' ? '-' : $siteId, $clock);
    }

    /** @return bool True when the pin state changed. */
    public function execute(string $pageId, int $revisionNumber, bool $pinned, string $actorId): bool
    {
        if ($pageId === '' || $this->siteId === '' || $revisionNumber < 1 || $actorId === '') {
            throw new InvalidArgumentException('Invalid pin request');
        }
        $prefix = $this->db->getPrefix();
        $pdo = $this->db->pdo();
        return $this->db->transaction(function () use ($pdo, $prefix, $pageId, $revisionNumber, $pinned, $actorId): bool {
            $query = $pdo->prepare("SELECT id, pinned FROM {$prefix}page_revisions WHERE page_id = ? AND site_id = ? AND revision = ?");
            $query->execute([$pageId, $this->siteId, $revisionNumber]);
            $row = $query->fetch(\PDO::FETCH_ASSOC);
            if ($row === false) {
                throw new PageRevisionNotFound();
            }
            if ((bool) (int) $row['pinned'] === $pinned) {
                return false;
            }
            $pdo->prepare("UPDATE {$prefix}page_revisions SET pinned = ? WHERE id = ?")->execute([$pinned ? 1 : 0, $row['id']]);
            $this->audit->record($pageId, $pinned ? 'pin' : 'unpin', 'success', $actorId, null, $row['id'], [
                'revision' => $revisionNumber,
            ]);
            return true;
        });
    }
}
