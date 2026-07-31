<?php
declare(strict_types=1);
namespace LemurCms\Migrations;
use LemurCms\Migration\CmsBaseMigration;
use LemurCms\Migration\CmsColumnBlueprint;

class Migration_20260510000001_CreateMenuTables extends CmsBaseMigration
{
    public const VERSION     = '20260510000001';
    public const DESCRIPTION = 'Create CMS menu system tables';

    public function up(): void
    {
        $this->schema->createTable('menus', function (CmsColumnBlueprint $t) {
            $t->uuidId();
            $t->string('name', 100)->notNull();
            $t->string('slug', 100)->notNull();
            $t->enum('type', ['main','footer','sidebar','mobile'])->notNull()->default('main');
            $t->tinyInteger('status')->notNull()->default(1);
            $t->timestamps();
            $t->uniqueIndex('slug', 'uq_menus_slug');
        });
        $this->schema->createTable('menu_items', function (CmsColumnBlueprint $t) {
            $t->uuidId();
            $t->uuid('menu_id')->notNull();
            $t->uuid('parent_id')->nullable();
            $t->string('label', 200)->notNull();
            $t->string('url', 500)->nullable();
            $t->enum('type', ['link','dropdown','mega','button','divider'])->notNull()->default('link');
            $t->enum('target', ['_self','_blank'])->notNull()->default('_self');
            $t->string('icon', 100)->nullable();
            $t->string('css_class', 200)->nullable();
            $t->integer('sort_order')->notNull()->default(0);
            $t->tinyInteger('status')->notNull()->default(1);
            $t->foreignKey('menu_id', 'menus', 'id', 'CASCADE');
            $t->index(['menu_id','parent_id'], 'idx_menu_items_parent');
            $t->index('sort_order', 'idx_menu_items_sort');
        });
        $this->schema->createTable('logos', function (CmsColumnBlueprint $t) {
            $t->uuidId();
            $t->string('site_name', 200)->notNull();
            $t->string('image_url', 500)->nullable();
            $t->string('image_dark_url', 500)->nullable();
            $t->string('image_mobile_url', 500)->nullable();
            $t->string('alt_text', 200)->nullable();
            $t->string('link_url', 500)->notNull()->default('/');
            $t->smallInteger('width')->nullable();
            $t->smallInteger('height')->nullable();
            $t->tinyInteger('is_active')->notNull()->default(1);
        });
        $this->schema->createTable('banners', function (CmsColumnBlueprint $t) {
            $t->uuidId();
            $t->uuid('menu_id')->nullable();
            $t->enum('position', ['above','below'])->notNull()->default('above');
            $t->text('content')->notNull();
            $t->string('bg_color', 50)->nullable();
            $t->string('text_color', 50)->nullable();
            $t->string('link_url', 500)->nullable();
            $t->string('link_text', 200)->nullable();
            $t->tinyInteger('is_closeable')->notNull()->default(1);
            $t->datetime('start_at')->nullable();
            $t->datetime('end_at')->nullable();
            $t->integer('sort_order')->notNull()->default(0);
            $t->tinyInteger('status')->notNull()->default(1);
            $t->timestamps();
            $t->index(['position','status'], 'idx_banners_pos_status');
        });
        $this->schema->createTable('mega_sections', function (CmsColumnBlueprint $t) {
            $t->uuidId();
            $t->uuid('menu_item_id')->notNull();
            $t->string('title', 200)->nullable();
            $t->tinyInteger('col_span')->notNull()->default(1);
            $t->integer('sort_order')->notNull()->default(0);
            $t->foreignKey('menu_item_id', 'menu_items', 'id', 'CASCADE');
            $t->index('menu_item_id', 'idx_mega_sections_item');
        });
        $this->schema->createTable('mega_links', function (CmsColumnBlueprint $t) {
            $t->uuidId();
            $t->uuid('section_id')->notNull();
            $t->string('label', 200)->notNull();
            $t->string('url', 500)->notNull();
            $t->string('description', 500)->nullable();
            $t->string('icon', 100)->nullable();
            $t->tinyInteger('is_featured')->notNull()->default(0);
            $t->integer('sort_order')->notNull()->default(0);
            $t->foreignKey('section_id', 'mega_sections', 'id', 'CASCADE');
        });
    }

    public function down(): void
    {
        $this->schema->dropTableIfExists('mega_links');
        $this->schema->dropTableIfExists('mega_sections');
        $this->schema->dropTableIfExists('banners');
        $this->schema->dropTableIfExists('logos');
        $this->schema->dropTableIfExists('menu_items');
        $this->schema->dropTableIfExists('menus');
    }
}
