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
 * Withdraws the public revision without deleting history. Public content is kept
 * in storage but the page leaves the public listing (status draft). The withdrawn
 * revision becomes the working draft when none exists, so editing can continue.
 * Idempotent per (site, key); emits an 'unpublished' outbox event for invalidation.
 */
final class UnpublishPage
{
    private readonly Clock $clock;
    private readonly PageRevisionAuditLog $audit;

    public function __construct(private readonly LemurDB $db, private readonly string $siteId, ?Clock $clock = null)
    {
        $this->clock = $clock ?? new SystemClock();
        $this->audit = new PageRevisionAuditLog($db, $siteId === '' ? '-' : $siteId, $this->clock);
    }

    /** @return string|null Withdrawn revision ID, or null when the page was not published. */
    public function execute(string $pageId, string $idempotencyKey, string $actorId): ?string
    {
        if ($pageId === '' || $this->siteId === '' || $actorId === ''
            || $idempotencyKey === '' || strlen($idempotencyKey) > 191) {
            throw new InvalidArgumentException('Invalid unpublish request');
        }
        $pdo = $this->db->pdo();
        $prefix = $this->db->getPrefix();
        return $this->db->transaction(function () use ($pdo, $prefix, $pageId, $idempotencyKey, $actorId): ?string {
            $heads = $prefix . 'page_revision_heads';
            $outbox = $prefix . 'page_publication_outbox';
            $head = SavePageDraft::lockHead($pdo, $heads, $pageId);
            if ($head === null) {
                throw new RuntimeException('Page revision head unavailable');
            }
            $attempt = $pdo->prepare("SELECT page_id, revision_id, event_type FROM {$outbox} WHERE site_id = ? AND idempotency_key = ?");
            $attempt->execute([$this->siteId, $idempotencyKey]);
            $previous = $attempt->fetch(\PDO::FETCH_ASSOC);
            if ($previous !== false) {
                if ($previous['page_id'] !== $pageId || $previous['event_type'] !== 'unpublished') {
                    throw new PagePublicationKeyConflict();
                }
                return $previous['revision_id'];
            }
            $publishedId = $head['published_revision_id'];
            if ($publishedId === null) {
                return null;
            }
            $owned = $pdo->prepare("SELECT id FROM {$prefix}page_revisions WHERE id = ? AND page_id = ? AND site_id = ?");
            $owned->execute([$publishedId, $pageId, $this->siteId]);
            if ($owned->fetchColumn() === false) {
                throw new RuntimeException('Published revision unavailable for this site');
            }
            $page = $pdo->prepare("SELECT id FROM {$prefix}pages WHERE id = ?");
            $page->execute([$pageId]);
            if ($page->fetchColumn() === false) {
                throw new RuntimeException('Page unavailable');
            }
            $now = $this->clock->now()->format('Y-m-d H:i:s');
            $pdo->prepare("UPDATE {$prefix}pages SET status = 'draft', published_at = NULL WHERE id = ?")->execute([$pageId]);
            $pdo->prepare("UPDATE {$heads} SET published_revision_id = NULL,
                    draft_revision_id = COALESCE(draft_revision_id, ?), updated_at = ? WHERE page_id = ?")
                ->execute([$publishedId, $now, $pageId]);
            $pdo->prepare("INSERT INTO {$outbox} (id,page_id,site_id,revision_id,idempotency_key,created_at,delivered_at,event_type,attempts) VALUES (?,?,?,?,?,?,NULL,'unpublished',0)")
                ->execute([UuidHelper::v4(), $pageId, $this->siteId, $publishedId, $idempotencyKey, $now]);
            $this->audit->record($pageId, 'unpublish', 'success', $actorId, $publishedId, null);
            return $publishedId;
        });
    }
}
