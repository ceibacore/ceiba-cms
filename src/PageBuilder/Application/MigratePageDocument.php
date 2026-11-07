<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Application;

use LemurCms\Page\Domain\Repository\PageRepositoryInterface;
use LemurCms\PageBuilder\Domain\Contract\DocumentAuthorization;
use LemurCms\PageBuilder\Domain\Document\DocumentMigrator;
use LemurCms\PageBuilder\Domain\Document\HostContext;
use LemurCms\PageBuilder\Domain\Document\MigrationReport;
use RuntimeException;

/**
 * Coordinates page document migration with host authorization and dry-run safety.
 */
final class MigratePageDocument
{
    public function __construct(
        private readonly string $siteId,
        private readonly PageRepositoryInterface $pages,
        private readonly DocumentAuthorization $authorization,
        private readonly DocumentMigrator $migrator,
    ) {}

    /**
     * Non-destructive migration dry-run.
     * Computes the migration report, validates envelope compliance, and preserves snapshot.
     */
    public function dryRun(HostContext $context, string $pageId): MigrationReport
    {
        $this->authorize($context, $pageId);

        $page = $this->pages->findById($pageId);
        if ($page === null) {
            throw new RuntimeException('Page not found for migration');
        }

        $content = $page['content'] ?? [];
        return $this->migrator->migrate($content, $pageId);
    }

    /**
     * Executes migration, supporting dry-run (default) or explicit persistence.
     */
    public function execute(HostContext $context, string $pageId, bool $persist = false): MigrationReport
    {
        $report = $this->dryRun($context, $pageId);

        if (!$report->isSuccessful || !$persist) {
            return $report;
        }

        $migratedDocument = $report->migratedDocument;
        if ($migratedDocument === null) {
            return $report;
        }

        $this->pages->update($pageId, [
            'id'              => $pageId,
            'content'         => $migratedDocument->root(),
            'legacy_snapshot' => $report->originalSnapshot,
        ]);

        return $report;
    }

    private function authorize(HostContext $context, string $pageId): void
    {
        if ($context->siteId !== $this->siteId
            || !in_array('pages.update', $context->capabilities, true)
            || !$this->authorization->canUpdate($context, $pageId)) {
            throw new RuntimeException('Page unavailable for this operation');
        }
    }
}
