<?php
declare(strict_types=1);

namespace LemurCms\Auth\Infrastructure;

use LemurCms\Auth\Domain\Repository\UserRepositoryInterface;
use LemurDB;

/**
 * LemurDB adapter — concrete implementation of UserRepositoryInterface.
 * Inject via constructor in your bootstrap.
 */
final class LemurDbUserRepository implements UserRepositoryInterface
{
    public function __construct(private readonly \LemurDB $db) {}

    public function findByEmail(string $email): ?array
    {
        return $this->db->query('access')->where(['email' => $email])->first();
    }

    public function findById(string $id): ?array
    {
        return $this->db->query('access')->where(['id' => $id])->first();
    }

    public function save(array $data): string
    {
        $id = $data['id'] ?? null;
        if ($id) {
            unset($data['id']);
            $this->db->query('access')->where(['id' => $id])->update($data);
            return $id;
        }
        
        // Generate UUID if not present
        $id = \LemurCms\Support\Helpers\UuidHelper::v4();
        $data['id'] = $id;
        $this->db->query('access')->insert($data);
        return $id;
    }

    public function getUserPermissions(string $userId): array
    {
        $roles = $this->db->query('access_roles')->where(['access_id' => $userId])->get();
        $permissions = [];
        foreach ($roles as $role) {
            $perms = $this->db->query('role_permissions')->where(['role_id' => $role['role_id']])->get();
            foreach ($perms as $perm) {
                $permData = $this->db->query('permissions')->where(['id' => $perm['permission_id']])->first();
                if ($permData) {
                    $permissions[] = $permData;
                }
            }
        }
        return $permissions;
    }

    public function assignRole(string $userId, string $roleId): void
    {
        $exists = $this->db->query('access_roles')->where(['access_id' => $userId, 'role_id' => $roleId])->first();
        if (!$exists) {
            $this->db->query('access_roles')->insert(['access_id' => $userId, 'role_id' => $roleId]);
        }
    }

    public function update(string $id, array $data): void
    {
        $this->db->query('access')->where(['id' => $id])->update($data);
    }

    public function delete(string $id): void
    {
        $this->db->query('access')->where(['id' => $id])->delete();
    }

    public function checkPermission(string $userId, string $permission): bool
    {
        $perms = $this->getUserPermissions($userId);
        foreach ($perms as $perm) {
            if ($perm['slug'] === $permission || $perm['name'] === $permission) {
                return true;
            }
        }
        return false;
    }

    public function changePassword(string $userId, string $newPassword): void
    {
        $this->db->query('access')->where(['id' => $userId])->update([
            'password_hash' => password_hash($newPassword, PASSWORD_BCRYPT)
        ]);
    }
}
