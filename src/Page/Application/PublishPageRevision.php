<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use InvalidArgumentException;
use LemurDB;
use LemurCms\Support\Helpers\UuidHelper;
use RuntimeException;

/** Publishes the requested draft and records cache invalidation in one transaction. */
final class PublishPageRevision
{
    public function __construct(private readonly LemurDB $db, private readonly string $siteId) {}

    public function execute(string $pageId, int $revisionNumber, string $idempotencyKey): string
    {
        if ($pageId === '' || $this->siteId === '' || $revisionNumber < 1
            || $idempotencyKey === '' || strlen($idempotencyKey) > 191) {
            throw new InvalidArgumentException('Invalid publication request');
        }
        $pdo = $this->db->pdo();
        $prefix = $this->db->getPrefix();
        return $this->db->transaction(function () use ($pdo, $prefix, $pageId, $revisionNumber, $idempotencyKey): string {
            $outbox = $prefix . 'page_publication_outbox';
            $heads = $prefix . 'page_revision_heads';
            $sqlite = $pdo->getAttribute(\PDO::ATTR_DRIVER_NAME) === 'sqlite';
            if ($sqlite) {
                $pdo->prepare("UPDATE {$heads} SET next_revision = next_revision WHERE page_id = ?")->execute([$pageId]);
            }
            $sql = "SELECT draft_revision_id, published_revision_id FROM {$heads} WHERE page_id = ?";
            $headQuery = $pdo->prepare($sqlite ? $sql : $sql . ' FOR UPDATE');
            $headQuery->execute([$pageId]);
            $head = $headQuery->fetch(\PDO::FETCH_ASSOC);
            if ($head === false) {
                throw new RuntimeException('Page revision head unavailable');
            }
            $attempt = $pdo->prepare("SELECT page_id, revision_id FROM {$outbox} WHERE site_id = ? AND idempotency_key = ?");
            $attempt->execute([$this->siteId, $idempotencyKey]);
            $previous = $attempt->fetch(\PDO::FETCH_ASSOC);
            $revision = $this->revision($pdo, $prefix, $pageId, $revisionNumber);
            if ($previous !== false) {
                if ($previous['page_id'] !== $pageId || $previous['revision_id'] !== $revision['id']) {
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
            $snapshot = json_decode($revision['snapshot'], false, 512, JSON_THROW_ON_ERROR);
            if (!is_object($snapshot) || !is_array($snapshot->root ?? null)) {
                throw new RuntimeException('Revision snapshot is invalid');
            }
            $content = json_encode($snapshot->root, JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES);
            $now = date('Y-m-d H:i:s');
            $pages = $prefix . 'pages';
            $pageUpdate = $pdo->prepare("UPDATE {$pages} SET content = ?, status = 'published', published_at = ? WHERE id = ?");
            $pageUpdate->execute([$content, $now, $pageId]);
            if ($pageUpdate->rowCount() !== 1) {
                throw new RuntimeException('Page unavailable');
            }
            $pdo->prepare("UPDATE {$heads} SET published_revision_id = ?, updated_at = ? WHERE page_id = ?")
                ->execute([$revision['id'], $now, $pageId]);
            $pdo->prepare("INSERT INTO {$outbox} (id,page_id,site_id,revision_id,idempotency_key,created_at,delivered_at) VALUES (?,?,?,?,?,?,NULL)")
                ->execute([UuidHelper::v4(), $pageId, $this->siteId, $revision['id'], $idempotencyKey, $now]);
            return $revision['id'];
        });
    }

    private function revision(\PDO $pdo, string $prefix, string $pageId, int $number): array
    {
        $query = $pdo->prepare("SELECT id, snapshot FROM {$prefix}page_revisions WHERE page_id = ? AND site_id = ? AND revision = ?");
        $query->execute([$pageId, $this->siteId, $number]);
        return $query->fetch(\PDO::FETCH_ASSOC) ?: throw new RuntimeException('Revision unavailable for this site');
    }
}
