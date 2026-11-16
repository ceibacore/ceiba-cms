<?php
declare(strict_types=1);
namespace CeibaCms\Migrations;
use CeibaCms\Migration\CmsBaseMigration;
use CeibaCms\Migration\CmsColumnBlueprint;

class Migration_20260522000010_CreateReservedPathsTable extends CmsBaseMigration
{
    public const VERSION     = '20260522000010';
    public const DESCRIPTION = 'Create reserved_paths table for public routing guard';

    public function up(): void
    {
        $this->schema->createTable('reserved_paths', function (CmsColumnBlueprint $t) {
            $t->uuidId();
            $t->string('path', 500)->notNull();
            $t->string('reason', 300)->nullable();
            $t->timestamps();
            $t->uniqueIndex('path', 'uq_reserved_paths');
        });
    }

    public function down(): void
    {
        $this->schema->dropTableIfExists('reserved_paths');
    }
}
