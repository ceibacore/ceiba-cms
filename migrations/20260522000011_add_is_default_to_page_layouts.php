<?php
declare(strict_types=1);
namespace LemurCms\Migrations;
use LemurCms\Migration\CmsBaseMigration;

class Migration_20260522000011_AddIsDefaultToPageLayouts extends CmsBaseMigration
{
    public const VERSION     = '20260522000011';
    public const DESCRIPTION = 'Add is_default column to page_layouts table';

    public function up(): void
    {
        $this->schema->addColumn('page_layouts', 'is_default', 'TINYINT(1)', [
            'nullable' => false,
            'default'  => 0,
            'after'    => 'is_active',
        ]);
    }

    public function down(): void
    {
        $this->schema->dropColumn('page_layouts', 'is_default');
    }
}
