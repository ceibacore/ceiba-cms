<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use InvalidArgumentException;
use LemurDB;
use LemurCms\Media\Infrastructure\LemurDbMediaRepository;
use LemurCms\PageBuilder\Domain\Document\DocumentEnvelope;
use LemurCms\PageBuilder\Domain\Document\DocumentWriteValidator;
use LemurCms\Support\Helpers\UuidHelper;
use RuntimeException;

/** Saves a validated draft snapshot without changing the public page content. */
final class SavePageDraft
{
    public function __construct(private readonly LemurDB $db, private readonly string $siteId) {}

    public function execute(DocumentEnvelope $document, int $expectedRevision, string $actorId, ?string $reason = null): int
    {
        if ($this->siteId === '' || $actorId === '' || $expectedRevision < 0 || $document->revision !== $expectedRevision + 1) {
            throw new InvalidArgumentException('Invalid draft revision request');
        }
        $media = new LemurDbMediaRepository($this->db);
        (new DocumentWriteValidator())->validate($document, fn (string $id): bool => $media->findById($id) !== null);
        $pdo = $this->db->pdo();
        $prefix = $this->db->getPrefix();
        $heads = $prefix . 'page_revision_heads';
        $revisions = $prefix . 'page_revisions';

        return $this->db->transaction(function () use ($pdo, $heads, $revisions, $document, $expectedRevision, $actorId, $reason): int {
            $sqlite = $pdo->getAttribute(\PDO::ATTR_DRIVER_NAME) === 'sqlite';
            if ($sqlite) {
                // Acquire SQLite's write lock before taking a read snapshot.
                $pdo->prepare("UPDATE {$heads} SET next_revision = next_revision WHERE page_id = ?")
                    ->execute([$document->documentId]);
            }
            $sql = "SELECT draft_revision_id, published_revision_id, next_revision FROM {$heads} WHERE page_id = ?";
            $lock = $pdo->prepare($sqlite ? $sql : $sql . ' FOR UPDATE');
            $lock->execute([$document->documentId]);
            $head = $lock->fetch(\PDO::FETCH_ASSOC);
            if (!$head) {
                throw new RuntimeException('Page revision head is not initialized');
            }
            $draftId = $head['draft_revision_id'];
            $currentId = $draftId ?? $head['published_revision_id'];
            $current = 0;
            if ($currentId !== null) {
                $currentStmt = $pdo->prepare("SELECT revision FROM {$revisions} WHERE id = ? AND page_id = ? AND site_id = ?");
                $currentStmt->execute([$currentId, $document->documentId, $this->siteId]);
                $number = $currentStmt->fetchColumn();
                if ($number === false) {
                    throw new RuntimeException('Page revision unavailable for this site');
                }
                $current = (int) $number;
            }
            if ($current !== $expectedRevision) {
                throw new PageRevisionConflict($current);
            }
            if ((int) $head['next_revision'] !== $document->revision) {
                throw new RuntimeException('Page revision sequence is inconsistent');
            }
            $newId = UuidHelper::v4();
            $now = date('Y-m-d H:i:s');
            $pdo->prepare("INSERT INTO {$revisions} (id,page_id,site_id,revision,schema_version,snapshot,content_hash,author_id,reason,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)")
                ->execute([$newId, $document->documentId, $this->siteId, $expectedRevision + 1, 1, $document->toJson(), hash('sha256', $document->toJson()), $actorId, $reason ?? 'edit', $now]);
            $pointerCondition = $draftId === null ? 'draft_revision_id IS NULL' : 'draft_revision_id = ?';
            $update = $pdo->prepare("UPDATE {$heads} SET draft_revision_id = ?, next_revision = ?, updated_at = ? WHERE page_id = ? AND {$pointerCondition}");
            $params = [$newId, $expectedRevision + 2, $now, $document->documentId];
            if ($draftId !== null) {
                $params[] = $draftId;
            }
            $update->execute($params);
            if ($update->rowCount() !== 1) {
                throw new PageRevisionConflict($current);
            }
            return $expectedRevision + 1;
        });
    }
}
