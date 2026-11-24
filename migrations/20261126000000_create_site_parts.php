<?php
declare(strict_types=1);

namespace CeibaCms\Migrations;

use CeibaCms\Migration\CmsBaseMigration;
use CeibaCms\Migration\CmsColumnBlueprint;

/**
 * Plan 06 (Theme Builder): a site part (header, footer, 404) is a document of `pages` with its own kind, so it has
 * the drafts, revisions and editor of every page; its rules (where it applies) have a draft and a published copy.
 */
class Migration_20261126000000_CreateSiteParts extends CmsBaseMigration
{
    public const VERSION     = '20261126000000';
    public const DESCRIPTION = 'Add pages.kind and create site_part_rules';

    public function up(): void
    {
        $this->schema->addColumn('pages', 'kind', 'VARCHAR(20)', ['nullable' => false, 'default' => 'page', 'after' => 'status']);
        $this->schema->addIndex('pages', ['kind', 'status'], 'idx_pages_kind_status');
        $this->schema->createTable('site_part_rules', function (CmsColumnBlueprint $t): void {
            $t->uuidId('part_id');
            $t->json('draft_rules')->notNull();
            $t->json('published_rules')->nullable();
            $t->unsignedInteger('version')->notNull()->default(1);
            $t->string('updated_by', 191)->nullable();
            $t->datetime('updated_at')->notNull();
            $t->foreignKey('part_id', 'pages', 'id', 'CASCADE');
        });
    }

    public function down(): void
    {
        $this->schema->dropTableIfExists('site_part_rules');
        $this->schema->dropIndex('pages', 'idx_pages_kind_status');
        $this->schema->dropColumn('pages', 'kind');
    }
}
