<?php
declare(strict_types=1);
namespace LemurCms\Migrations;
use LemurCms\Migration\CmsBaseMigration;
use LemurCms\Migration\CmsColumnBlueprint;

class Migration_20260510000002_CreatePageTables extends CmsBaseMigration
{
    public const VERSION     = '20260510000002';
    public const DESCRIPTION = 'Create CMS page builder tables';

    public function up(): void
    {
        $this->schema->createTable('pages', function (CmsColumnBlueprint $t) {
            $t->uuidId();
            $t->string('title', 300)->notNull();
            $t->string('slug', 300)->notNull();
            $t->json('content')->nullable();
            $t->enum('status', ['draft','published','archived'])->notNull()->default('draft');
            $t->string('template', 100)->nullable()->default('default');
            $t->integer('sort_order')->notNull()->default(0);
            $t->datetime('published_at')->nullable();
            $t->softDeletes();
            $t->timestamps();
            $t->uniqueIndex('slug', 'uq_pages_slug');
            $t->index('status', 'idx_pages_status');
        });
    }

    public function down(): void
    {
        $this->schema->dropTableIfExists('pages');
    }
}
