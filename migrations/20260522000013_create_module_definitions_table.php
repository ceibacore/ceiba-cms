<?php
declare(strict_types=1);

namespace LemurCms\Migrations;

use LemurCms\Migration\CmsBaseMigration;
use LemurCms\Migration\CmsColumnBlueprint;

class Migration_20260522000013_CreateModuleDefinitionsTable extends CmsBaseMigration
{
    public const VERSION     = '20260522000013';
    public const DESCRIPTION = 'Create module_definitions table for storing dynamic field schemas';

    public function up(): void
    {
        $this->schema->createTable('module_definitions', function (CmsColumnBlueprint $t) {
            $t->uuidId();
            $t->char('module_id', 36)->notNull();
            $t->json('fields_schema')->notNull();
            $t->string('icon', 50)->nullable();
            $t->timestamps();
            $t->uniqueIndex('module_id', 'uq_module_definitions_module_id');
            $t->foreignKey('module_id', 'modules', 'id', 'CASCADE', 'fk_cms_module_definitions_module');
        });
    }

    public function down(): void
    {
        $this->schema->dropTableIfExists('module_definitions');
    }
}
