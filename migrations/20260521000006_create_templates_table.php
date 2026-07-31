<?php
declare(strict_types=1);
namespace LemurCms\Migrations;
use LemurCms\Migration\CmsBaseMigration;
use LemurCms\Migration\CmsColumnBlueprint;

class Migration_20260521000006_CreateTemplatesTable extends CmsBaseMigration
{
    public const VERSION     = '20260521000006';
    public const DESCRIPTION = 'Create Page Builder templates table';

    public function up(): void
    {
        $this->schema->createTable('templates', function (CmsColumnBlueprint $t) {
            $t->uuidId();
            $t->string('name', 200)->notNull();
            $t->text('description')->nullable();
            $t->json('tree')->notNull();
            $t->string('thumbnail', 500)->nullable();
            $t->string('category', 100)->nullable()->default('general');
            $t->tinyInteger('is_active')->notNull()->default(1);
            $t->timestamps();
            $t->index('category', 'idx_templates_category');
            $t->index('is_active', 'idx_templates_active');
        });
    }

    public function down(): void
    {
        $this->schema->dropTableIfExists('templates');
    }
}
