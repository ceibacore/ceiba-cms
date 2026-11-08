<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use InvalidArgumentException;
use LemurDB;
use LemurCms\PageBuilder\Domain\Document\DocumentEnvelope;
use LemurCms\PageBuilder\Domain\Document\DocumentMigrator;
use RuntimeException;

/** Restores an immutable snapshot as a new draft revision. */
final class RestorePageRevision
{
    public function __construct(
        private readonly LemurDB $db,
        private readonly string $siteId,
        private readonly SavePageDraft $saveDraft,
    ) {}

    public function execute(string $pageId, int $sourceRevision, int $expectedRevision, string $actorId): int
    {
        if ($pageId === '' || $sourceRevision < 1 || $expectedRevision < 0 || $actorId === '') {
            throw new InvalidArgumentException('Invalid restore request');
        }
        $source = $this->db->query('page_revisions')->where([
            'page_id' => $pageId, 'site_id' => $this->siteId, 'revision' => $sourceRevision,
        ])->first();
        if ($source === null) {
            throw new RuntimeException('Source revision unavailable');
        }
        $snapshot = json_decode($source['snapshot'], false, 512, JSON_THROW_ON_ERROR);
        if (!is_object($snapshot) || !isset($snapshot->root) || !is_array($snapshot->root)) {
            throw new RuntimeException('Source revision has an invalid snapshot');
        }
        if ((int) $source['schema_version'] === 0) {
            $report = (new DocumentMigrator())->migrate($snapshot->root, $pageId);
            if (!$report->isSuccessful || $report->migratedDocument === null) {
                throw new RuntimeException('Legacy revision cannot be restored');
            }
            $snapshot = json_decode($report->migratedDocument->toJson(), false, 512, JSON_THROW_ON_ERROR);
        }
        $snapshot->schemaVersion = DocumentEnvelope::VERSION;
        $snapshot->documentId = $pageId;
        $snapshot->revision = $expectedRevision + 1;
        unset($snapshot->pageStatus);
        $document = DocumentEnvelope::fromJson(json_encode($snapshot, JSON_THROW_ON_ERROR));
        return $this->saveDraft->execute($document, $expectedRevision, $actorId, 'restore');
    }
}
