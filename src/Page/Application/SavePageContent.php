<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use InvalidArgumentException;
use LemurCms\PageBuilder\Domain\Document\DocumentEnvelope;
use LemurCms\PageBuilder\Domain\Document\DocumentMigrator;
use LemurCms\PageBuilder\Domain\Service\TreeNormalizer;

/**
 * Host-facing save: converts an editor tree (or HTML body) into the canonical
 * document and stores it as the next draft revision with optimistic concurrency.
 * Saving content identical to the current working revision creates nothing and
 * returns that revision, so metadata-only form submits do not add revisions.
 */
final class SavePageContent
{
    public function __construct(
        private readonly SavePageDraft $saveDraft,
        private readonly TreeNormalizer $normalizer = new TreeNormalizer(),
        private readonly DocumentMigrator $migrator = new DocumentMigrator(),
        private readonly ?GetPageWorkingRevision $working = null,
    ) {}

    /** @param array<int, mixed>|string $content */
    public function execute(string $pageId, array|string $content, int $expectedRevision, string $actorId, string $reason = 'edit'): int
    {
        if (!in_array($reason, ['edit', 'autosave'], true)) {
            throw new InvalidArgumentException('Save reason must be edit or autosave');
        }
        $report = $this->migrator->migrate($this->normalizer->preparePageContent($content), $pageId);
        if (!$report->isSuccessful || $report->migratedDocument === null) {
            throw new InvalidArgumentException('Invalid page content');
        }
        $snapshot = json_decode($report->migratedDocument->toJson(), false, 512, JSON_THROW_ON_ERROR);
        $snapshot->revision = $expectedRevision + 1;
        $current = $this->working?->execute($pageId);
        if ($current !== null && $current['revision'] === $expectedRevision
            && json_encode($current['root'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)
                === json_encode($snapshot->root, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)) {
            return $expectedRevision;
        }
        return $this->saveDraft->execute(
            DocumentEnvelope::fromJson(json_encode($snapshot, JSON_THROW_ON_ERROR)),
            $expectedRevision,
            $actorId,
            $reason,
        );
    }
}
