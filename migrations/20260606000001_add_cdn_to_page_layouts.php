<?php
declare(strict_types=1);

namespace LemurCms\Migrations;

use LemurCms\Migration\CmsBaseMigration;

class Migration_20260606000001_AddCdnToPageLayouts extends CmsBaseMigration
{
    public const VERSION     = '20260606000001';
    public const DESCRIPTION = 'Add head_cdn and body_cdn columns to page_layouts table';

    public function up(): void
    {
        $this->schema->addColumn('page_layouts', 'head_cdn', 'TEXT', [
            'nullable' => true,
            'after'    => 'is_default',
        ]);
        $this->schema->addColumn('page_layouts', 'body_cdn', 'TEXT', [
            'nullable' => true,
            'after'    => 'head_cdn',
        ]);
    }

    public function down(): void
    {
        $this->schema->dropColumn('page_layouts', 'body_cdn');
        $this->schema->dropColumn('page_layouts', 'head_cdn');
    }
}
