<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Compatibility;

use LemurCms\Migration\CmsSchemaBuilder;
use LemurCms\Migrations\Migration_20261107000000_CreatePageRevisionTables;
use PHPUnit\Framework\TestCase;

require_once dirname(__DIR__, 3) . '/migrations/20261107000000_create_page_revision_tables.php';

final class PageRevisionMigrationTest extends TestCase
{
    public function testMigrationIsAdditivePrefixedAndRollbackDropsOnlyNewTables(): void
    {
        $schema = new CmsSchemaBuilder('tenant_cms_');
        $migration = new Migration_20261107000000_CreatePageRevisionTables($schema);
        $migration->up();
        $up = implode("\n", $schema->getSqlLog());

        self::assertStringContainsString('tenant_cms_page_revisions', $up);
        self::assertStringContainsString('tenant_cms_page_revision_heads', $up);
        self::assertStringContainsString('snapshot', $up);
        self::assertStringContainsString('content_hash', $up);
        self::assertStringContainsString('fk_page_revision_heads_page', $up);
        self::assertStringNotContainsString('ALTER TABLE', $up);
        self::assertStringNotContainsString('UPDATE tenant_cms_pages', $up);

        $rollbackSchema = new CmsSchemaBuilder('tenant_cms_');
        (new Migration_20261107000000_CreatePageRevisionTables($rollbackSchema))->down();
        $down = implode("\n", $rollbackSchema->getSqlLog());
        self::assertStringContainsString('tenant_cms_page_revision_heads', $down);
        self::assertStringContainsString('tenant_cms_page_revisions', $down);
        self::assertStringNotContainsString('tenant_cms_pages', $down);
    }
}
