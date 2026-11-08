<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Compatibility;

use LemurCms\Migration\CmsSchemaBuilder;
use LemurCms\Migrations\Migration_20261107000000_CreatePageRevisionTables;
use PHPUnit\Framework\TestCase;

require_once dirname(__DIR__, 3) . '/migrations/20261107000000_create_page_revision_tables.php';
require_once dirname(__DIR__, 3) . '/migrations/20260522000013_create_module_definitions_table.php';

final class PageRevisionMigrationTest extends TestCase
{
    public function testCreatesPrefixedRevisionTablesWithoutTouchingPages(): void
    {
        $schema = new CmsSchemaBuilder('tenant_cms_');
        (new Migration_20261107000000_CreatePageRevisionTables($schema))->up();
        $up = implode("\n", $schema->getSqlLog());

        foreach (['page_revisions', 'page_revision_heads', 'page_publication_outbox', 'page_revision_audit', 'page_preview_tokens'] as $table) {
            self::assertStringContainsString("`tenant_cms_{$table}`", $up);
        }
        self::assertStringContainsString('`sequence` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY', $up);
        self::assertStringContainsString('`site_id`, `idempotency_key`', $up);
        self::assertStringContainsString('`public_content_hash` CHAR(64) NULL', $up);
        self::assertStringContainsString('`pinned` TINYINT(1) NOT NULL DEFAULT 0', $up);
        self::assertStringContainsString('fk_tenant_cms_page_publication_outbox_revision_id', $up);
        self::assertStringNotContainsString('ALTER TABLE', $up);
        self::assertStringNotContainsString('UPDATE tenant_cms_pages', $up);
        // Every constraint name carries the table prefix (constraint names are global per database).
        preg_match_all('/CONSTRAINT `([^`]+)`/', $up, $constraints);
        self::assertNotEmpty($constraints[1]);
        foreach ($constraints[1] as $name) {
            self::assertStringStartsWith('fk_tenant_cms_', $name);
        }

        $rollback = new CmsSchemaBuilder('tenant_cms_');
        (new Migration_20261107000000_CreatePageRevisionTables($rollback))->down();
        $down = implode("\n", $rollback->getSqlLog());
        self::assertSame(5, substr_count($down, 'DROP TABLE IF EXISTS'));
        self::assertStringNotContainsString('`tenant_cms_pages`', $down);
    }

    public function testModuleDefinitionConstraintIsPrefixedSoInstallationsCanShareADatabase(): void
    {
        $names = [];
        foreach (['site_a_', 'site_b_'] as $prefix) {
            $schema = new CmsSchemaBuilder($prefix);
            (new \LemurCms\Migrations\Migration_20260522000013_CreateModuleDefinitionsTable($schema))->up();
            preg_match_all('/CONSTRAINT `([^`]+)`/', implode("\n", $schema->getSqlLog()), $match);
            $names = [...$names, ...$match[1]];
        }
        self::assertSame(['fk_site_a_module_definitions_module_id', 'fk_site_b_module_definitions_module_id'], $names);
    }
}
