<?php
declare(strict_types=1);

namespace LemurCms\Migrations;

use LemurCms\Migration\CmsBaseMigration;
use LemurCms\Migration\CmsColumnBlueprint;

class Migration_20260605000000_V2ArchitectureUpdate extends CmsBaseMigration
{
    public const VERSION     = '20260605000000';
    public const DESCRIPTION = 'Add page templates, query engine configs, and access conditions for V2';

    public function up(): void
    {
        // 1. Create page_templates table
        $this->schema->createTable('page_templates', function (CmsColumnBlueprint $t) {
            $t->uuidId();
            $t->string('name', 200)->notNull();
            $t->text('description')->nullable();
            $t->json('tree')->notNull();
            $t->json('slots_definition')->nullable();
            $t->string('thumbnail', 500)->nullable();
            $t->timestamps();
            $t->uniqueIndex('name', 'uq_page_templates_name');
        });

        // 2. Add columns to pages table
        $this->schema->addColumn('pages', 'template_id', 'CHAR(36)', [
            'nullable' => true,
            'after'    => 'status',
        ]);
        $this->schema->addColumn('pages', 'query_config', 'JSON', [
            'nullable' => true,
            'after'    => 'template_id',
        ]);
        $this->schema->addColumn('pages', 'conditions', 'JSON', [
            'nullable' => true,
            'after'    => 'query_config',
        ]);
    }

    public function down(): void
    {
        $this->schema->dropColumn('pages', 'conditions');
        $this->schema->dropColumn('pages', 'query_config');
        $this->schema->dropColumn('pages', 'template_id');
        $this->schema->dropTableIfExists('page_templates');
    }
}
