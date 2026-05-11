<?php
declare(strict_types=1);
namespace LemurCms\Migrations;
use LemurCms\Migration\CmsBaseMigration;
use LemurCms\Migration\CmsColumnBlueprint;

class Migration_20260510000004_CreateMediaTables extends CmsBaseMigration
{
    public const VERSION     = '20260510000004';
    public const DESCRIPTION = 'Create CMS media library tables';

    public function up(): void
    {
        $this->schema->createTable('media', function (CmsColumnBlueprint $t) {
            $t->uuidId();
            $t->string('disk', 50)->notNull()->default('local');
            $t->string('path', 500)->notNull();
            $t->string('filename', 300)->notNull();
            $t->string('mime_type', 100)->notNull();
            $t->bigInteger('size')->notNull()->default(0);
            $t->string('alt_text', 300)->nullable();
            $t->string('title', 300)->nullable();
            $t->json('conversions')->nullable();
            $t->timestamps();
            $t->index('mime_type', 'idx_media_mime');
        });
    }

    public function down(): void
    {
        $this->schema->dropTableIfExists('media');
    }
}
