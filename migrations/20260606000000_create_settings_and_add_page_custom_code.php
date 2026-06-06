<?php
declare(strict_types=1);

namespace LemurCms\Migrations;

use LemurCms\Migration\CmsBaseMigration;
use LemurCms\Migration\CmsColumnBlueprint;

class Migration_20260606000000_CreateSettingsAndAddPageCustomCode extends CmsBaseMigration
{
    public const VERSION     = '20260606000000';
    public const DESCRIPTION = 'Create settings table and add custom CSS/JS columns to pages for session-based injection';

    public function up(): void
    {
        // 1. Create settings table
        $this->schema->createTable('settings', function (CmsColumnBlueprint $t) {
            $t->string('key', 100)->primary();
            $t->text('value')->nullable();
            $t->timestamps();
        });

        // 2. Add custom CSS/JS columns to pages table
        $this->schema->addColumn('pages', 'custom_css_with_session', 'TEXT', [
            'nullable' => true,
            'after'    => 'conditions',
        ]);
        $this->schema->addColumn('pages', 'custom_css_without_session', 'TEXT', [
            'nullable' => true,
            'after'    => 'custom_css_with_session',
        ]);
        $this->schema->addColumn('pages', 'custom_js_with_session', 'TEXT', [
            'nullable' => true,
            'after'    => 'custom_css_without_session',
        ]);
        $this->schema->addColumn('pages', 'custom_js_without_session', 'TEXT', [
            'nullable' => true,
            'after'    => 'custom_js_with_session',
        ]);
    }

    public function down(): void
    {
        $this->schema->dropColumn('pages', 'custom_js_without_session');
        $this->schema->dropColumn('pages', 'custom_js_with_session');
        $this->schema->dropColumn('pages', 'custom_css_without_session');
        $this->schema->dropColumn('pages', 'custom_css_with_session');
        $this->schema->dropTableIfExists('settings');
    }
}
