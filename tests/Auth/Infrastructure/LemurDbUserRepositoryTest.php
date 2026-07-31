<?php
declare(strict_types=1);
namespace LemurCms\Tests\Auth\Infrastructure;

use LemurCms\Auth\Infrastructure\LemurDbUserRepository;
use LemurCms\Support\Helpers\UuidHelper;
use LemurCms\Tests\TestCase;

class LemurDbUserRepositoryTest extends TestCase
{
    private LemurDbUserRepository $repo;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repo = new LemurDbUserRepository($this->db);
    }

    public function testFindByEmailReturnsUser(): void
    {
        $id = UuidHelper::v4();
        $this->db->query('access')->insert([
            'id'            => $id,
            'name'          => 'Test User',
            'email'         => 'test_' . $id . '@example.com',
            'password_hash' => password_hash('password', PASSWORD_BCRYPT),
            'is_active'     => 1,
        ]);

        $user = $this->repo->findByEmail('test_' . $id . '@example.com');

        $this->assertNotNull($user);
        $this->assertEquals('Test User', $user['name']);
    }

    public function testFindByIdReturnsUser(): void
    {
        $id = UuidHelper::v4();
        $this->db->query('access')->insert([
            'id'            => $id,
            'name'          => 'User 1',
            'email'         => 'user1_' . $id . '@example.com',
            'password_hash' => password_hash('pass', PASSWORD_BCRYPT),
            'is_active'     => 1,
        ]);

        $user = $this->repo->findById($id);

        $this->assertNotNull($user);
        $this->assertEquals($id, $user['id']);
    }

    public function testSaveCreatesNewUser(): void
    {
        $uid = UuidHelper::v4();
        $id = $this->repo->save([
            'name'          => 'New User',
            'email'         => 'new_' . $uid . '@example.com',
            'password_hash' => password_hash('secure', PASSWORD_BCRYPT),
            'is_active'     => 1,
        ]);

        $this->assertIsString($id);
        $this->assertNotEmpty($id);
    }

    public function testGetUserPermissionsReturnsArray(): void
    {
        $uid = UuidHelper::v4();
        $userId = $this->repo->save([
            'name'          => 'Perm User',
            'email'         => 'perm_' . $uid . '@example.com',
            'password_hash' => password_hash('pass', PASSWORD_BCRYPT),
            'is_active'     => 1,
        ]);

        $perms = $this->repo->getUserPermissions($userId);

        $this->assertIsArray($perms);
    }

    public function testAssignRoleCreatesAssignment(): void
    {
        $uid = UuidHelper::v4();
        $userId = $this->repo->save([
            'name'          => 'Role User',
            'email'         => 'role_' . $uid . '@example.com',
            'password_hash' => password_hash('pass', PASSWORD_BCRYPT),
            'is_active'     => 1,
        ]);

        $roleId = UuidHelper::v4();
        $this->db->query('roles')->insert([
            'id'   => $roleId,
            'name' => 'Admin',
            'slug' => 'admin_' . $uid,
        ]);

        $this->repo->assignRole($userId, $roleId);

        $assignment = $this->db->query('access_roles')
            ->where(['access_id' => $userId, 'role_id' => $roleId])
            ->first();
        $this->assertNotNull($assignment);
    }
}
