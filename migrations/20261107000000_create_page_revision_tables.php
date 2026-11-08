<?php
declare(strict_types=1);

namespace LemurCms\Migrations;

use LemurCms\Migration\CmsBaseMigration;
use LemurCms\Migration\CmsColumnBlueprint;

final class Migration_20261107000000_CreatePageRevisionTables extends CmsBaseMigration
{
    public const VERSION = '20261107000000';
    public const DESCRIPTION = 'Create additive page revision snapshot and head tables';

    public function up(): void
    {
        $this->schema->createTable('page_revisions', function (CmsColumnBlueprint $table): void {
            $table->uuidId();
            $table->uuid('page_id')->notNull();
            $table->string('site_id', 191)->notNull();
            $table->unsignedInteger('revision')->notNull();
            $table->unsignedInteger('schema_version')->notNull();
            $table->json('snapshot')->notNull();
            $table->char('content_hash', 64)->notNull();
            $table->uuid('author_id')->nullable();
            $table->string('reason', 32)->notNull()->default('edit');
            $table->datetime('created_at')->notNull();
            $table->uniqueIndex(['page_id', 'revision'], 'uq_page_revisions_number');
            $table->index(['site_id', 'page_id', 'revision'], 'idx_page_revisions_site_page');
        });

        $this->schema->createTable('page_revision_heads', function (CmsColumnBlueprint $table): void {
            $table->uuidId('page_id');
            $table->uuid('draft_revision_id')->nullable();
            $table->uuid('published_revision_id')->nullable();
            $table->unsignedInteger('next_revision')->notNull()->default(1);
            $table->datetime('updated_at')->notNull();
            $table->uniqueIndex('draft_revision_id', 'uq_page_revision_draft');
            $table->uniqueIndex('published_revision_id', 'uq_page_revision_published');
            $table->foreignKey('page_id', 'pages', 'id', 'CASCADE');
            $table->foreignKey('draft_revision_id', 'page_revisions', 'id', 'SET NULL');
            $table->foreignKey('published_revision_id', 'page_revisions', 'id', 'SET NULL');
        });
    }

    public function down(): void
    {
        $this->schema->dropTableIfExists('page_revision_heads');
        $this->schema->dropTableIfExists('page_revisions');
    }
}
