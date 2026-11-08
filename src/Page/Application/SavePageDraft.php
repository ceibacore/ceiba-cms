<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use InvalidArgumentException;
use LemurDB;
use LemurCms\Media\Infrastructure\LemurDbMediaRepository;
use LemurCms\PageBuilder\Domain\Contract\Clock;
use LemurCms\PageBuilder\Domain\Document\DocumentEnvelope;
use LemurCms\PageBuilder\Domain\Document\DocumentWriteValidator;
use LemurCms\PageBuilder\Infrastructure\SystemClock;
use LemurCms\Support\Helpers\UuidHelper;
use LogicException;
use RuntimeException;

/** Saves a validated draft snapshot without changing the public page content. */
final class SavePageDraft
{
    /** Revision reason => audit action. */
    public const REASONS = [
        'edit' => 'save',
        'autosave' => 'autosave',
        'restore' => 'restore',
        'reconcile' => 'reconcile',
    ];

    private readonly Clock $clock;
    private readonly PageRevisionAuditLog $audit;

    public function __construct(private readonly LemurDB $db, private readonly string $siteId, ?Clock $clock = null)
    {
        $this->clock = $clock ?? new SystemClock();
        $this->audit = new PageRevisionAuditLog($db, $siteId === '' ? '-' : $siteId, $this->clock);
    }

    /** @param array<string, scalar|null> $auditDetails */
    public function execute(
        DocumentEnvelope $document,
        int $expectedRevision,
        string $actorId,
        ?string $reason = null,
        array $auditDetails = [],
    ): int {
        $reason ??= 'edit';
        // Validation runs inside appendInCurrentTransaction; an invalid request rolls back an empty transaction.
        return $this->db->transaction(
            fn (): int => $this->appendInCurrentTransaction($document, $expectedRevision, $actorId, $reason, $auditDetails)['revision']
        );
    }

    /**
     * @internal Appends a draft inside a transaction already opened on the site connection.
     * @param array<string, scalar|null> $auditDetails
     * @return array{id: string, revision: int, previousRevisionId: ?string}
     */
    public function appendInCurrentTransaction(
        DocumentEnvelope $document,
        int $expectedRevision,
        string $actorId,
        string $reason,
        array $auditDetails = [],
    ): array {
        $pdo = $this->db->pdo();
        if (!$pdo->inTransaction()) {
            throw new LogicException('appendInCurrentTransaction requires an open transaction');
        }
        $this->validateRequest($document, $expectedRevision, $actorId, $reason);
        $prefix = $this->db->getPrefix();
        $heads = $prefix . 'page_revision_heads';
        $revisions = $prefix . 'page_revisions';

        $head = self::lockHead($pdo, $heads, $document->documentId);
        if ($head === null) {
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
        $now = $this->clock->now()->format('Y-m-d H:i:s');
        $json = $document->toJson();
        $pdo->prepare("INSERT INTO {$revisions} (id,page_id,site_id,revision,schema_version,snapshot,content_hash,author_id,reason,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)")
            ->execute([$newId, $document->documentId, $this->siteId, $expectedRevision + 1, DocumentEnvelope::VERSION, $json, hash('sha256', $json), $actorId, $reason, $now]);
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
        $this->audit->record(
            $document->documentId,
            self::REASONS[$reason],
            'success',
            $actorId,
            $currentId,
            $newId,
            ['revision' => $expectedRevision + 1] + $auditDetails,
        );
        return ['id' => $newId, 'revision' => $expectedRevision + 1, 'previousRevisionId' => $currentId];
    }

    /**
     * @internal Locks the head row for the rest of the transaction.
     * @return array<string, mixed>|null
     */
    public static function lockHead(\PDO $pdo, string $headsTable, string $pageId): ?array
    {
        $sqlite = $pdo->getAttribute(\PDO::ATTR_DRIVER_NAME) === 'sqlite';
        if ($sqlite) {
            // Acquire SQLite's write lock before taking a read snapshot.
            $pdo->prepare("UPDATE {$headsTable} SET next_revision = next_revision WHERE page_id = ?")->execute([$pageId]);
        }
        $sql = "SELECT draft_revision_id, published_revision_id, next_revision, public_content_hash FROM {$headsTable} WHERE page_id = ?";
        $lock = $pdo->prepare($sqlite ? $sql : $sql . ' FOR UPDATE');
        $lock->execute([$pageId]);
        $head = $lock->fetch(\PDO::FETCH_ASSOC);
        return $head === false ? null : $head;
    }

    private function validateRequest(DocumentEnvelope $document, int $expectedRevision, string $actorId, string $reason): void
    {
        if ($this->siteId === '' || $actorId === '' || $expectedRevision < 0
            || $document->revision !== $expectedRevision + 1 || !array_key_exists($reason, self::REASONS)) {
            throw new InvalidArgumentException('Invalid draft revision request');
        }
        $media = new LemurDbMediaRepository($this->db);
        (new DocumentWriteValidator())->validate($document, fn (string $id): bool => $media->findById($id) !== null);
    }
}
