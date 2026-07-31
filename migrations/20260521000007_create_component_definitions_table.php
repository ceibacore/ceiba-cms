<?php
declare(strict_types=1);
namespace LemurCms\Migrations;
use LemurCms\Migration\CmsBaseMigration;
use LemurCms\Migration\CmsColumnBlueprint;

class Migration_20260521000007_CreateComponentDefinitionsTable extends CmsBaseMigration
{
    public const VERSION     = '20260521000007';
    public const DESCRIPTION = 'Create Page Builder component_definitions table';

    public function up(): void
    {
        $this->schema->createTable('component_definitions', function (CmsColumnBlueprint $t) {
            $t->uuidId();
            $t->string('type', 100)->notNull();
            $t->string('label', 200)->notNull();
            $t->string('category', 100)->notNull()->default('layout');
            $t->string('icon', 100)->nullable();
            $t->json('default_props')->notNull();
            $t->json('schema')->notNull();
            $t->tinyInteger('is_container')->notNull()->default(0);
            $t->tinyInteger('accepts_loop')->notNull()->default(1);
            $t->timestamps();
            $t->uniqueIndex('type', 'uq_component_type');
            $t->index('category', 'idx_component_category');
        });
    }

    public function down(): void
    {
        $this->schema->dropTableIfExists('component_definitions');
    }
}
