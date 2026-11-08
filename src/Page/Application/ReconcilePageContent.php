<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use InvalidArgumentException;
use LemurDB;
use LemurCms\PageBuilder\Domain\Document\DocumentEnvelope;
use LemurCms\PageBuilder\Domain\Document\DocumentMigrator;
use RuntimeException;

/**
 * Integrity recovery: when pages.content was changed outside the revision system
 * (direct SQL, external import), preserves that content as a new draft revision
 * and makes it the drift baseline again, atomically.
 *
 * Nothing is overwritten: the previous draft stays in history and can be restored.
 */
final class ReconcilePageContent
{
    public function __construct(
        private readonly LemurDB $db,
        private readonly string $siteId,
        private readonly SavePageDraft $saveDraft,
        private readonly DocumentMigrator $migrator = new DocumentMigrator(),
    ) {}

    /** @return array{reconciled: bool, revision: int} */
    public function execute(string $pageId, int $expectedRevision, string $actorId): array
    {
        if ($pageId === '' || $this->siteId === '' || $expectedRevision < 0 || $actorId === '') {
            throw new InvalidArgumentException('Invalid reconcile request');
        }
        $pdo = $this->db->pdo();
        $prefix = $this->db->getPrefix();
        return $this->db->transaction(function () use ($pdo, $prefix, $pageId, $expectedRevision, $actorId): array {
            $head = SavePageDraft::lockHead($pdo, $prefix . 'page_revision_heads', $pageId);
            if ($head === null) {
                throw new RuntimeException('Page revision head is not initialized');
            }
            $sql = "SELECT content FROM {$prefix}pages WHERE id = ?";
            $query = $pdo->prepare($pdo->getAttribute(\PDO::ATTR_DRIVER_NAME) === 'sqlite' ? $sql : $sql . ' FOR UPDATE');
            $query->execute([$pageId]);
            $page = $query->fetch(\PDO::FETCH_ASSOC);
            if ($page === false) {
                throw new RuntimeException('Page unavailable');
            }
            if (PublicContentFingerprint::matches($head['public_content_hash'] ?? null, $page['content'])) {
                return ['reconciled' => false, 'revision' => $expectedRevision];
            }
            $raw = is_string($page['content']) ? $page['content'] : '[]';
            $report = $this->migrator->migrate($raw, $pageId);
            if (!$report->isSuccessful || $report->migratedDocument === null) {
                throw new RuntimeException('Public content cannot be reconciled automatically');
            }
            $snapshot = json_decode($report->migratedDocument->toJson(), false, 512, JSON_THROW_ON_ERROR);
            $snapshot->schemaVersion = DocumentEnvelope::VERSION;
            $snapshot->documentId = $pageId;
            $snapshot->revision = $expectedRevision + 1;
            $document = DocumentEnvelope::fromJson(json_encode($snapshot, JSON_THROW_ON_ERROR));
            $fingerprint = PublicContentFingerprint::of($page['content']);
            $result = $this->saveDraft->appendInCurrentTransaction($document, $expectedRevision, $actorId, 'reconcile', [
                'publicContentHash' => substr($fingerprint, 0, 16),
            ]);
            $pdo->prepare("UPDATE {$prefix}page_revision_heads SET public_content_hash = ? WHERE page_id = ?")
                ->execute([$fingerprint, $pageId]);
            return ['reconciled' => true, 'revision' => $result['revision']];
        });
    }
}
