<?php
declare(strict_types=1);
namespace LemurCms\Migrations;
use LemurCms\Migration\CmsBaseMigration;
use LemurCms\Migration\CmsColumnBlueprint;

class Migration_20260522000008_CreatePageLayoutsTable extends CmsBaseMigration
{
    public const VERSION     = '20260522000008';
    public const DESCRIPTION = 'Create page_layouts table for CMS layout system';

    public function up(): void
    {
        $this->schema->createTable('page_layouts', function (CmsColumnBlueprint $t) {
            $t->uuidId();
            $t->string('name', 200)->notNull();
            $t->text('description')->nullable();
            $t->string('menu_slug', 300)->nullable();
            $t->json('footer_tree')->nullable();
            $t->json('palette')->nullable();
            $t->tinyInteger('use_system_palette')->notNull()->default(1);
            $t->tinyInteger('is_active')->notNull()->default(1);
            $t->timestamps();
            $t->index('is_active', 'idx_page_layouts_active');
        });
    }

    public function down(): void
    {
        $this->schema->dropTableIfExists('page_layouts');
    }
}
