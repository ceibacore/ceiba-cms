<?php
declare(strict_types=1);

namespace LemurCms\Migrations;

use LemurCms\Migration\CmsBaseMigration;
use LemurCms\Migration\CmsColumnBlueprint;

/**
 * Versioned page content: immutable revision snapshots, draft/published heads,
 * publication outbox, audit trail and preview links.
 */
final class Migration_20261107000000_CreatePageRevisionTables extends CmsBaseMigration
{
    public const VERSION = '20261107000000';
    public const DESCRIPTION = 'Create page revision, outbox, audit and preview tables';

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
            $table->string('author_id', 191)->nullable();
            $table->string('reason', 32)->notNull()->default('edit');
            $table->tinyInteger('pinned')->notNull()->default(0);
            $table->datetime('created_at')->notNull();
            $table->uniqueIndex(['page_id', 'revision'], 'uq_page_revisions_number');
            $table->index(['site_id', 'page_id', 'revision'], 'idx_page_revisions_site_page');
            $table->foreignKey('page_id', 'pages', 'id', 'CASCADE');
        });

        $this->schema->createTable('page_revision_heads', function (CmsColumnBlueprint $table): void {
            $table->uuidId('page_id');
            $table->uuid('draft_revision_id')->nullable();
            $table->uuid('published_revision_id')->nullable();
            $table->unsignedInteger('next_revision')->notNull()->default(1);
            // SHA-256 of the raw pages.content last written by the revision system.
            $table->char('public_content_hash', 64)->nullable();
            $table->datetime('updated_at')->notNull();
            $table->uniqueIndex('draft_revision_id', 'uq_page_revision_draft');
            $table->uniqueIndex('published_revision_id', 'uq_page_revision_published');
            $table->foreignKey('page_id', 'pages', 'id', 'CASCADE');
            $table->foreignKey('draft_revision_id', 'page_revisions', 'id', 'SET NULL');
            $table->foreignKey('published_revision_id', 'page_revisions', 'id', 'SET NULL');
        });

        // sequence gives a total order for per-page FIFO delivery.
        $this->schema->createTable('page_publication_outbox', function (CmsColumnBlueprint $table): void {
            $table->id('sequence');
            $table->uuid('id')->notNull();
            $table->uuid('page_id')->notNull();
            $table->string('site_id', 191)->notNull();
            $table->uuid('revision_id')->notNull();
            $table->string('event_type', 32)->notNull()->default('published');
            $table->string('idempotency_key', 191)->notNull();
            $table->unsignedInteger('attempts')->notNull()->default(0);
            $table->datetime('available_at')->nullable();
            $table->datetime('locked_until')->nullable();
            $table->string('last_error', 500)->nullable();
            $table->datetime('created_at')->notNull();
            $table->datetime('delivered_at')->nullable();
            $table->datetime('failed_at')->nullable();
            $table->uniqueIndex('id', 'uq_page_publication_id');
            $table->uniqueIndex(['site_id', 'idempotency_key'], 'uq_page_publication_attempt');
            $table->index(['failed_at', 'delivered_at', 'available_at'], 'idx_page_publication_due');
            $table->index(['page_id', 'sequence'], 'idx_page_publication_page');
            $table->foreignKey('page_id', 'pages', 'id', 'CASCADE');
            $table->foreignKey('revision_id', 'page_revisions', 'id', 'RESTRICT');
        });

        // No foreign key to pages: the audit trail must survive page deletion.
        $this->schema->createTable('page_revision_audit', function (CmsColumnBlueprint $table): void {
            $table->id();
            $table->string('site_id', 191)->notNull();
            $table->uuid('page_id')->notNull();
            $table->string('actor_id', 191)->nullable();
            $table->string('action', 32)->notNull();
            $table->string('result', 16)->notNull();
            $table->uuid('source_revision_id')->nullable();
            $table->uuid('target_revision_id')->nullable();
            $table->text('details')->nullable();
            $table->string('request_id', 64)->nullable();
            $table->datetime('created_at')->notNull();
            $table->index(['site_id', 'page_id', 'created_at'], 'idx_page_revision_audit_page');
            $table->index(['site_id', 'action', 'result', 'created_at'], 'idx_page_revision_audit_outcome');
        });

        $this->schema->createTable('page_preview_tokens', function (CmsColumnBlueprint $table): void {
            $table->uuidId();
            $table->string('site_id', 191)->notNull();
            $table->uuid('page_id')->notNull();
            $table->uuid('revision_id')->notNull();
            $table->char('token_hash', 64)->notNull();
            $table->string('created_by', 191)->notNull();
            $table->datetime('expires_at')->notNull();
            $table->datetime('revoked_at')->nullable();
            $table->datetime('created_at')->notNull();
            $table->uniqueIndex('token_hash', 'uq_page_preview_token_hash');
            $table->index(['site_id', 'page_id', 'expires_at'], 'idx_page_preview_tokens_page');
            $table->foreignKey('page_id', 'pages', 'id', 'CASCADE');
            $table->foreignKey('revision_id', 'page_revisions', 'id', 'CASCADE');
        });
    }

    public function down(): void
    {
        $this->schema->dropTableIfExists('page_preview_tokens');
        $this->schema->dropTableIfExists('page_revision_audit');
        $this->schema->dropTableIfExists('page_publication_outbox');
        $this->schema->dropTableIfExists('page_revision_heads');
        $this->schema->dropTableIfExists('page_revisions');
    }
}
