<?php
declare(strict_types=1);

namespace LemurCms\Migrations;

use LemurCms\Migration\CmsBaseMigration;
use LemurCms\Migration\CmsColumnBlueprint;

final class Migration_20261107000001_CreatePagePublicationOutbox extends CmsBaseMigration
{
    public const VERSION = '20261107000001';
    public const DESCRIPTION = 'Create durable page publication outbox';

    public function up(): void
    {
        $this->schema->createTable('page_publication_outbox', function (CmsColumnBlueprint $table): void {
            $table->uuidId();
            $table->uuid('page_id')->notNull();
            $table->string('site_id', 191)->notNull();
            $table->uuid('revision_id')->notNull();
            $table->string('idempotency_key', 191)->notNull();
            $table->datetime('created_at')->notNull();
            $table->datetime('delivered_at')->nullable();
            $table->uniqueIndex(['site_id', 'idempotency_key'], 'uq_page_publication_attempt');
            $table->index(['delivered_at', 'created_at'], 'idx_page_publication_pending');
            $table->foreignKey('page_id', 'pages', 'id', 'CASCADE');
            $table->foreignKey('revision_id', 'page_revisions', 'id', 'RESTRICT');
        });
    }

    public function down(): void
    {
        $this->schema->dropTableIfExists('page_publication_outbox');
    }
}
