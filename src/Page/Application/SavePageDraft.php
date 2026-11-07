<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use InvalidArgumentException;
use LemurDB;
use LemurCms\PageBuilder\Domain\Document\DocumentEnvelope;
use LemurCms\PageBuilder\Domain\Document\DocumentWriteValidator;
use LemurCms\Support\Helpers\UuidHelper;
use RuntimeException;

final class PageRevisionConflict extends RuntimeException
{
    public function __construct(public readonly int $currentRevision)
    {
        parent::__construct('Page draft revision has changed');
    }
}

/** Saves a validated draft snapshot without changing the public page content. */
final class SavePageDraft
{
    public function __construct(private readonly LemurDB $db, private readonly string $siteId) {}

    public function execute(DocumentEnvelope $document, int $expectedRevision, string $actorId, ?string $reason = null): int
    {
        if ($this->siteId === '' || $actorId === '' || $expectedRevision < 0 || $document->revision !== $expectedRevision + 1) {
            throw new InvalidArgumentException('Invalid draft revision request');
        }
        (new DocumentWriteValidator())->validate($document, static fn (): bool => true);
        $pdo = $this->db->pdo();
        $prefix = $this->db->getPrefix();
        $pages = $prefix . 'pages';
        $heads = $prefix . 'page_revision_heads';
        $revisions = $prefix . 'page_revisions';

        return $this->db->transaction(function () use ($pdo, $pages, $heads, $revisions, $document, $expectedRevision, $actorId, $reason): int {
            $page = $this->db->query('pages')->where(['id' => $document->documentId])->first();
            if ($page === null) {
                throw new RuntimeException('Page unavailable');
            }
            $lock = $pdo->prepare("SELECT draft_revision_id FROM {$heads} WHERE page_id = ? FOR UPDATE");
            $lock->execute([$document->documentId]);
            $head = $lock->fetch(\PDO::FETCH_ASSOC);
            if (!$head) {
                throw new RuntimeException('Page revision head is not initialized');
            }
            $draftId = $head['draft_revision_id'];
            $current = 0;
            if ($draftId !== null) {
                $currentStmt = $pdo->prepare("SELECT revision FROM {$revisions} WHERE id = ? AND page_id = ? AND site_id = ?");
                $currentStmt->execute([$draftId, $document->documentId, $this->siteId]);
                $current = (int) ($currentStmt->fetchColumn() ?: 0);
            }
            if ($current !== $expectedRevision) {
                throw new PageRevisionConflict($current);
            }
            $newId = UuidHelper::v4();
            $now = date('Y-m-d H:i:s');
            $pdo->prepare("INSERT INTO {$revisions} (id,page_id,site_id,revision,schema_version,snapshot,content_hash,author_id,reason,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)")
                ->execute([$newId, $document->documentId, $this->siteId, $expectedRevision + 1, 1, $document->toJson(), hash('sha256', $document->toJson()), $actorId, $reason ?? 'edit', $now]);
            $update = $pdo->prepare("UPDATE {$heads} SET draft_revision_id = ?, next_revision = ?, updated_at = ? WHERE page_id = ? AND draft_revision_id <=> ?");
            $update->execute([$newId, $expectedRevision + 2, $now, $document->documentId, $draftId]);
            if ($update->rowCount() !== 1) {
                throw new PageRevisionConflict($current);
            }
            return $expectedRevision + 1;
        });
    }
}
