<?php
declare(strict_types=1);
namespace LemurCms\Migrations;
use LemurCms\Migration\CmsBaseMigration;
use LemurCms\Migration\CmsColumnBlueprint;

class Migration_20260522000009_AddLayoutIdToPages extends CmsBaseMigration
{
    public const VERSION     = '20260522000009';
    public const DESCRIPTION = 'Add layout_id column to pages table';

    public function up(): void
    {
        $this->schema->addColumn('pages', 'layout_id', 'CHAR(36)', [
            'nullable' => true,
            'after'    => 'template',
        ]);
    }

    public function down(): void
    {
        $this->schema->dropColumn('pages', 'layout_id');
    }
}
