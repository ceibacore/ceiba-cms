<?php
declare(strict_types=1);
namespace LemurCms\Migrations;
use LemurCms\Migration\CmsBaseMigration;
use LemurCms\Migration\CmsColumnBlueprint;

class Migration_20260510000005_CreateAccessTables extends CmsBaseMigration
{
    public const VERSION     = '20260510000005';
    public const DESCRIPTION = 'Create CMS access and permissions tables (replaces users)';

    public function up(): void
    {
        $this->schema->createTable('access', function (CmsColumnBlueprint $t) {
            $t->uuidId();
            $t->string('external_id', 255)->nullable();
            $t->string('short_id', 12)->nullable();
            $t->string('name', 200)->notNull();
            $t->string('email', 300)->notNull();
            $t->string('password_hash', 255)->nullable();
            $t->tinyInteger('is_active')->notNull()->default(1);
            $t->datetime('last_login_at')->nullable();
            $t->softDeletes();
            $t->timestamps();
            $t->uniqueIndex('email', 'uq_access_email');
            $t->index('external_id', 'idx_access_external');
        });

        $this->schema->createTable('roles', function (CmsColumnBlueprint $t) {
            $t->uuidId();
            $t->string('name', 100)->notNull();
            $t->string('slug', 100)->notNull();
            $t->timestamps();
            $t->uniqueIndex('slug', 'uq_roles_slug');
        });

        $this->schema->createTable('permissions', function (CmsColumnBlueprint $t) {
            $t->uuidId();
            $t->uuid('module_id')->notNull();
            $t->string('name', 200)->notNull();
            $t->string('slug', 200)->notNull();
            $t->uniqueIndex('slug', 'uq_permissions_slug');
            $t->foreignKey('module_id', 'modules', 'id', 'CASCADE');
            $t->index('module_id', 'idx_permissions_module');
        });

        $this->schema->createTable('role_permissions', function (CmsColumnBlueprint $t) {
            $t->uuid('role_id')->notNull();
            $t->uuid('permission_id')->notNull();
            $t->foreignKey('role_id', 'roles', 'id', 'CASCADE');
            $t->foreignKey('permission_id', 'permissions', 'id', 'CASCADE');
            $t->uniqueIndex(['role_id', 'permission_id'], 'uq_rp');
        });

        $this->schema->createTable('access_roles', function (CmsColumnBlueprint $t) {
            $t->uuid('access_id')->notNull();
            $t->uuid('role_id')->notNull();
            $t->foreignKey('access_id', 'access', 'id', 'CASCADE');
            $t->foreignKey('role_id', 'roles', 'id', 'CASCADE');
            $t->uniqueIndex(['access_id', 'role_id'], 'uq_ar');
        });
    }

    public function down(): void
    {
        $this->schema->dropTableIfExists('access_roles');
        $this->schema->dropTableIfExists('role_permissions');
        $this->schema->dropTableIfExists('permissions');
        $this->schema->dropTableIfExists('roles');
        $this->schema->dropTableIfExists('access');
    }
}
