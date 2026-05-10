<?php
declare(strict_types=1);
namespace LemurCms\Migrations;
use LemurCms\Migration\CmsBaseMigration;
use LemurCms\Migration\CmsColumnBlueprint;

class Migration_20260510000005_CreateAuthTables extends CmsBaseMigration
{
    public const VERSION     = '20260510000005';
    public const DESCRIPTION = 'Create CMS auth: users, roles, permissions';

    public function up(): void
    {
        $this->schema->createTable('roles', function (CmsColumnBlueprint $t) {
            $t->id();
            $t->string('name', 100)->notNull();
            $t->string('slug', 100)->notNull();
            $t->timestamps();
            $t->uniqueIndex('slug', 'uq_roles_slug');
        });

        $this->schema->createTable('permissions', function (CmsColumnBlueprint $t) {
            $t->id();
            $t->string('name', 200)->notNull();
            $t->string('slug', 200)->notNull();
            $t->string('module', 100)->nullable();
            $t->uniqueIndex('slug', 'uq_permissions_slug');
        });

        $this->schema->createTable('role_permissions', function (CmsColumnBlueprint $t) {
            $t->unsignedInteger('role_id')->notNull();
            $t->unsignedInteger('permission_id')->notNull();
            $t->foreignKey('role_id', 'roles', 'id', 'CASCADE');
            $t->foreignKey('permission_id', 'permissions', 'id', 'CASCADE');
            $t->uniqueIndex(['role_id','permission_id'], 'uq_rp');
        });

        $this->schema->createTable('users', function (CmsColumnBlueprint $t) {
            $t->id();
            $t->string('name', 200)->notNull();
            $t->string('email', 300)->notNull();
            $t->string('password_hash', 255)->notNull();
            $t->tinyInteger('is_active')->notNull()->default(1);
            $t->datetime('last_login_at')->nullable();
            $t->softDeletes();
            $t->timestamps();
            $t->uniqueIndex('email', 'uq_users_email');
        });

        $this->schema->createTable('user_roles', function (CmsColumnBlueprint $t) {
            $t->unsignedInteger('user_id')->notNull();
            $t->unsignedInteger('role_id')->notNull();
            $t->foreignKey('user_id', 'users', 'id', 'CASCADE');
            $t->foreignKey('role_id', 'roles', 'id', 'CASCADE');
            $t->uniqueIndex(['user_id','role_id'], 'uq_ur');
        });
    }

    public function down(): void
    {
        $this->schema->dropTableIfExists('user_roles');
        $this->schema->dropTableIfExists('users');
        $this->schema->dropTableIfExists('role_permissions');
        $this->schema->dropTableIfExists('permissions');
        $this->schema->dropTableIfExists('roles');
    }
}
