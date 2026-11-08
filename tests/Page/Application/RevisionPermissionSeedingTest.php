<?php
declare(strict_types=1);

namespace LemurCms\Tests\Page\Application;

use LemurDB;
use LemurCms\Seeders\SystemPermissionsSeeder;
use LemurCms\Seeders\SystemRolesSeeder;
use PHPUnit\Framework\TestCase;

final class RevisionPermissionSeedingTest extends TestCase
{
    public function testRevisionDutiesAreSeparateAndEditorsCannotPublishOrWithdraw(): void
    {
        $prefix = 'seed_' . bin2hex(random_bytes(4)) . '_';
        $db = LemurDB::getInstance(['driver' => 'sqlite', 'db' => ':memory:', 'prefix' => $prefix]);
        $pdo = $db->pdo();
        $pdo->exec("CREATE TABLE {$prefix}modules (id TEXT PRIMARY KEY, slug TEXT, is_active INTEGER)");
        $pdo->exec("CREATE TABLE {$prefix}permissions (id TEXT PRIMARY KEY, module_id TEXT, slug TEXT UNIQUE, name TEXT)");
        $pdo->exec("CREATE TABLE {$prefix}roles (id TEXT PRIMARY KEY, slug TEXT UNIQUE, name TEXT)");
        $pdo->exec("CREATE TABLE {$prefix}role_permissions (role_id TEXT, permission_id TEXT, PRIMARY KEY (role_id, permission_id))");
        $pdo->exec("INSERT INTO {$prefix}modules VALUES ('m-pages', 'pages', 1)");

        (new SystemPermissionsSeeder($db, $prefix))->run();
        (new SystemPermissionsSeeder($db, $prefix))->run(); // idempotent
        (new SystemRolesSeeder($db, $prefix))->run();

        $slugs = $pdo->query("SELECT slug FROM {$prefix}permissions ORDER BY slug")->fetchAll(\PDO::FETCH_COLUMN);
        self::assertSame(['pages.create', 'pages.delete', 'pages.publish', 'pages.restore', 'pages.unpublish', 'pages.update', 'pages.view'], $slugs);
        $granted = static fn (string $role) => $pdo->query("SELECT p.slug FROM {$prefix}role_permissions rp
            JOIN {$prefix}roles r ON r.id = rp.role_id JOIN {$prefix}permissions p ON p.id = rp.permission_id
            WHERE r.slug = '{$role}' ORDER BY p.slug")->fetchAll(\PDO::FETCH_COLUMN);
        self::assertSame(['pages.create', 'pages.delete', 'pages.restore', 'pages.update', 'pages.view'], $granted('editor'));
        self::assertContains('pages.unpublish', $granted('admin'));
        self::assertContains('pages.restore', $granted('admin'));
    }
}
