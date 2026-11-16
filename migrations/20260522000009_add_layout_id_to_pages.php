<?php
declare(strict_types=1);
namespace CeibaCms\Migrations;
use CeibaCms\Migration\CmsBaseMigration;
use CeibaCms\Migration\CmsColumnBlueprint;

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
