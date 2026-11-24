<?php
declare(strict_types=1);

namespace CeibaCms\Migrations;

use CeibaCms\Migration\CmsBaseMigration;

/** Plan 05-A: image size of the original, for width/height on <img> (no layout shift) and for the variants. */
class Migration_20261125000000_AddMediaDimensions extends CmsBaseMigration
{
    public const VERSION     = '20261125000000';
    public const DESCRIPTION = 'Add width and height to media';

    public function up(): void
    {
        $this->schema->addColumn('media', 'width', 'INT', ['nullable' => true, 'after' => 'size']);
        $this->schema->addColumn('media', 'height', 'INT', ['nullable' => true, 'after' => 'width']);
        $this->schema->addIndex('media', 'created_at', 'idx_media_created');
    }

    public function down(): void
    {
        $this->schema->dropIndex('media', 'idx_media_created');
        $this->schema->dropColumn('media', 'height');
        $this->schema->dropColumn('media', 'width');
    }
}
