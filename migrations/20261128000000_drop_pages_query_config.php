<?php
declare(strict_types=1);

namespace CeibaCms\Migrations;

use CeibaCms\Migration\CmsBaseMigration;

/** Plan 07 (D-3): page queries live in the document (`queries[]`) and run through the data source registry. */
final class Migration_20261128000000_DropPagesQueryConfig extends CmsBaseMigration
{
    public const VERSION = '20261128000000';
    public const DESCRIPTION = 'Drop pages.query_config (replaced by document queries)';

    public function up(): void
    {
        $this->schema->dropColumn('pages', 'query_config');
    }

    public function down(): void
    {
        $this->schema->addColumn('pages', 'query_config', 'JSON', ['nullable' => true, 'after' => 'template_id']);
    }
}
