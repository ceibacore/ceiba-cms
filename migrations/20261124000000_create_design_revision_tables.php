<?php
declare(strict_types=1);

namespace CeibaCms\Migrations;

use CeibaCms\Migration\CmsBaseMigration;
use CeibaCms\Migration\CmsColumnBlueprint;

/**
 * Site design documents (plan 04-B): tokens, breakpoints and classes as immutable revisions per site, with a
 * draft and a published head, like page revisions.
 */
final class Migration_20261124000000_CreateDesignRevisionTables extends CmsBaseMigration
{
    public const VERSION = '20261124000000';
    public const DESCRIPTION = 'Create site design revision tables';

    public function up(): void
    {
        $this->schema->createTable('design_revisions', function (CmsColumnBlueprint $table): void {
            $table->uuidId();
            $table->string('site_id', 191)->notNull();
            $table->unsignedInteger('revision')->notNull();
            $table->json('snapshot')->notNull();
            $table->char('content_hash', 64)->notNull();
            $table->string('author_id', 191)->nullable();
            $table->datetime('created_at')->notNull();
            $table->uniqueIndex(['site_id', 'revision'], 'uq_design_revisions_number');
        });

        $this->schema->createTable('design_heads', function (CmsColumnBlueprint $table): void {
            $table->string('site_id', 191)->primary();
            $table->unsignedInteger('draft_revision')->nullable();
            $table->unsignedInteger('published_revision')->nullable();
            $table->unsignedInteger('next_revision')->notNull()->default(1);
            $table->datetime('updated_at')->notNull();
        });
    }

    public function down(): void
    {
        $this->schema->dropTable('design_heads');
        $this->schema->dropTable('design_revisions');
    }
}
