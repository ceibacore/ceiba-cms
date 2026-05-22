<?php
declare(strict_types=1);
namespace LemurCms\Migrations;
use LemurCms\Migration\CmsBaseMigration;

class Migration_20260522000012_AddIsDefaultToMenus extends CmsBaseMigration
{
    public const VERSION     = '20260522000012';
    public const DESCRIPTION = 'Add is_default column to menus table';

    public function up(): void
    {
        $this->schema->addColumn('menus', 'is_default', 'TINYINT(1)', [
            'nullable' => false,
            'default'  => 0,
            'after'    => 'status',
        ]);
    }

    public function down(): void
    {
        $this->schema->dropColumn('menus', 'is_default');
    }
}
