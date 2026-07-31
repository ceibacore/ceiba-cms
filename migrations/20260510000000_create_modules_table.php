<?php
declare(strict_types=1);

namespace LemurCms\Migrations;

use LemurCms\Migration\CmsBaseMigration;
use LemurCms\Migration\CmsColumnBlueprint;

class Migration_20260510000000_CreateModulesTable extends CmsBaseMigration
{
    public const VERSION     = '20260510000000';
    public const DESCRIPTION = 'Create core modules table for dynamic activation';

    public function up(): void
    {
        $this->schema->createTable('modules', function (CmsColumnBlueprint $t) {
            $t->uuidId();
            $t->string('name', 150)->notNull();
            $t->string('slug', 150)->notNull();
            $t->string('description', 300)->nullable();
            $t->string('version', 50)->notNull()->default('1.0.0');
            $t->tinyInteger('is_active')->notNull()->default(1);
            $t->integer('sort_order')->notNull()->default(0);
            $t->timestamps();
            $t->uniqueIndex('slug', 'uq_modules_slug');
        });
    }

    public function down(): void
    {
        $this->schema->dropTableIfExists('modules');
    }
}
