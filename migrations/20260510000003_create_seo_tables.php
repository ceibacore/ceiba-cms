<?php
declare(strict_types=1);
namespace LemurCms\Migrations;
use LemurCms\Migration\CmsBaseMigration;
use LemurCms\Migration\CmsColumnBlueprint;

class Migration_20260510000003_CreateSeoTables extends CmsBaseMigration
{
    public const VERSION     = '20260510000003';
    public const DESCRIPTION = 'Create CMS SEO metadata tables';

    public function up(): void
    {
        $this->schema->createTable('seo', function (CmsColumnBlueprint $t) {
            $t->id();
            $t->string('entity_type', 100)->notNull();
            $t->unsignedInteger('entity_id')->notNull();
            $t->string('meta_title', 200)->nullable();
            $t->string('meta_description', 500)->nullable();
            $t->string('canonical_url', 500)->nullable();
            $t->string('og_title', 200)->nullable();
            $t->string('og_description', 500)->nullable();
            $t->string('og_image', 500)->nullable();
            $t->string('robots', 100)->nullable()->default('index,follow');
            $t->json('schema_json')->nullable();
            $t->timestamps();
            $t->uniqueIndex(['entity_type','entity_id'], 'uq_seo_entity');
        });
    }

    public function down(): void
    {
        $this->schema->dropTableIfExists('seo');
    }
}
