<?php
declare(strict_types=1);

namespace CeibaCms\Migrations;

use CeibaCms\Migration\CmsBaseMigration;
use CeibaCms\Migration\CmsColumnBlueprint;

/** Coordinates publication batches per site and remembers idempotent results. */
final class Migration_20261127000000_CreateSitePartPublicationBatches extends CmsBaseMigration
{
    public const VERSION = '20261127000000';
    public const DESCRIPTION = 'Create site part publication locks and batches';

    public function up(): void
    {
        $this->schema->createTable('site_part_publication_locks', static function (CmsColumnBlueprint $t): void {
            $t->string('site_id', 191)->primary();
        });
        $this->schema->createTable('site_part_publication_batches', static function (CmsColumnBlueprint $t): void {
            $t->uuidId('id');
            $t->string('site_id', 191)->notNull();
            $t->string('idempotency_key', 191)->notNull();
            $t->char('request_hash', 64)->notNull();
            $t->json('result')->notNull();
            $t->uniqueIndex(['site_id', 'idempotency_key'], 'uq_site_part_batch_key');
        });
    }

    public function down(): void
    {
        $this->schema->dropTableIfExists('site_part_publication_batches');
        $this->schema->dropTableIfExists('site_part_publication_locks');
    }
}
