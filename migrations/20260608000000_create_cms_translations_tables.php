<?php
declare(strict_types=1);

namespace LemurCms\Migrations;

use LemurCms\Migration\CmsBaseMigration;
use LemurCms\Migration\CmsColumnBlueprint;

class Migration_20260608000000_CreateCmsTranslationsTables extends CmsBaseMigration
{
    public const VERSION     = '20260608000000';
    public const DESCRIPTION = 'Create languages and dynamic translations tables';

    public function up(): void
    {
        $this->schema->createTable('cms_languages', function (CmsColumnBlueprint $t) {
            $t->uuidId();
            $t->string('code', 10)->notNull();
            $t->string('label', 100)->notNull();
            $t->string('flag', 50)->nullable();
            $t->tinyInteger('is_active')->notNull()->default(1);
            $t->tinyInteger('is_default')->notNull()->default(0);
            $t->timestamps();
            $t->uniqueIndex('code', 'uq_cms_languages_code');
        });

        $this->schema->createTable('cms_translations', function (CmsColumnBlueprint $t) {
            $t->uuidId();
            $t->uuid('language_id')->notNull();
            $t->string('group', 100)->notNull()->default('*');
            $t->string('key', 255)->notNull();
            $t->text('value')->notNull();
            $t->timestamps();

            $t->foreignKey('language_id', 'cms_languages', 'id', 'CASCADE');
            $t->uniqueIndex(['language_id', 'group', 'key'], 'uq_cms_translations_key');
        });
    }

    public function down(): void
    {
        $this->schema->dropTableIfExists('cms_translations');
        $this->schema->dropTableIfExists('cms_languages');
    }
}
