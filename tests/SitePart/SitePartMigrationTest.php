<?php
declare(strict_types=1);

namespace CeibaCms\Tests\SitePart;

use CeibaCms\Migration\CmsSchemaBuilder;
use CeibaCms\Migrations\Migration_20261126000000_CreateSiteParts;
use PHPUnit\Framework\TestCase;

require_once dirname(__DIR__, 2) . '/migrations/20261126000000_create_site_parts.php';

final class SitePartMigrationTest extends TestCase
{
    public function testMigrationScopesTablesAndForeignKeysToTheInstallation(): void
    {
        $up = new CmsSchemaBuilder('tenant_');
        (new Migration_20261126000000_CreateSiteParts($up))->up();
        $sql = implode("\n", $up->getSqlLog());
        self::assertStringContainsString("`kind` VARCHAR(20) NOT NULL DEFAULT 'page'", $sql);
        self::assertStringContainsString('`tenant_site_part_rules`', $sql);
        self::assertStringContainsString('REFERENCES `tenant_pages`(`id`) ON DELETE CASCADE', $sql);
        self::assertStringContainsString('CONSTRAINT `fk_tenant_site_part_rules_part_id`', $sql);
        self::assertStringContainsString('`published_rules` JSON NULL', $sql);

        $down = new CmsSchemaBuilder('tenant_');
        (new Migration_20261126000000_CreateSiteParts($down))->down();
        $sql = implode("\n", $down->getSqlLog());
        self::assertStringContainsString('DROP TABLE IF EXISTS `tenant_site_part_rules`', $sql);
        self::assertStringContainsString('DROP COLUMN `kind`', $sql);
    }
}
