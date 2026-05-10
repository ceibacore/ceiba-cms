<?php
declare(strict_types=1);
namespace LemurCms\Tests\Auth\Infrastructure;

use LemurCms\Auth\Infrastructure\LemurDbUserRepository;
use PHPUnit\Framework\TestCase;

class LemurDbUserRepositoryTest extends TestCase
{
    private \LemurDB $db;
    private LemurDbUserRepository $repo;

    protected function setUp(): void
    {
        $this->db = new \LemurDB('localhost', 'cms_test', 'root', '', 'cms_');
        $this->repo = new LemurDbUserRepository($this->db);
    }

    public function testFindByEmailReturnsUser(): void
    {
        $this->db->query('users')->insert([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password_hash' => password_hash('password', PASSWORD_BCRYPT),
            'is_active' => 1,
        ]);

        $user = $this->repo->findByEmail('test@example.com');
        
        $this->assertNotNull($user);
        $this->assertEquals('Test User', $user['name']);
    }

    public function testFindByIdReturnsUser(): void
    {
        $id = $this->db->query('users')->insert([
            'name' => 'User 1',
            'email' => 'user1@example.com',
            'password_hash' => password_hash('pass', PASSWORD_BCRYPT),
            'is_active' => 1,
        ]);

        $user = $this->repo->findById($id);
        
        $this->assertNotNull($user);
        $this->assertEquals($id, $user['id']);
    }

    public function testSaveCreatesNewUser(): void
    {
        $id = $this->repo->save([
            'name' => 'New User',
            'email' => 'new@example.com',
            'password_hash' => password_hash('secure', PASSWORD_BCRYPT),
            'is_active' => 1,
        ]);

        $this->assertIsInt($id);
        $this->assertGreaterThan(0, $id);
    }

    public function testGetUserPermissionsReturnsArray(): void
    {
        $userId = $this->db->query('users')->insert([
            'name' => 'Perm User',
            'email' => 'perm@example.com',
            'password_hash' => password_hash('pass', PASSWORD_BCRYPT),
            'is_active' => 1,
        ]);

        $perms = $this->repo->getUserPermissions($userId);
        
        $this->assertIsArray($perms);
    }

    public function testAssignRoleCreatesAssignment(): void
    {
        $userId = $this->db->query('users')->insert([
            'name' => 'Role User',
            'email' => 'role@example.com',
            'password_hash' => password_hash('pass', PASSWORD_BCRYPT),
            'is_active' => 1,
        ]);

        $roleId = $this->db->query('roles')->insert([
            'name' => 'Admin',
            'slug' => 'admin',
        ]);

        $this->repo->assignRole($userId, $roleId);

        $assignment = $this->db->query('user_roles')->where(['user_id' => $userId, 'role_id' => $roleId])->first();
        $this->assertNotNull($assignment);
    }
}
