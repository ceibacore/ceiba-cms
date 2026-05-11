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
        return $this->db->query('cms_users')->where(['email' => $email])->first();
    }

    public function findById(int $id): ?array
    {
        return $this->db->query('cms_users')->where(['id' => $id])->first();
    }

    public function save(array $data): int
    {
        $id = $data['id'] ?? null;
        if ($id) {
            unset($data['id']);
            $this->db->query('cms_users')->where(['id' => $id])->update($data);
            return $id;
        }
        return $this->db->query('cms_users')->insert($data);
    }

    public function getUserPermissions(int $userId): array
    {
        $roles = $this->db->query('cms_user_roles')->where(['user_id' => $userId])->get();
        $permissions = [];
        foreach ($roles as $role) {
            $perms = $this->db->query('cms_role_permissions')->where(['role_id' => $role['role_id']])->get();
            foreach ($perms as $perm) {
                $permData = $this->db->query('cms_permissions')->where(['id' => $perm['permission_id']])->first();
                if ($permData) $permissions[] = $permData;
            }
        }
        return $permissions;
    }

    public function assignRole(int $userId, int $roleId): void
    {
        $exists = $this->db->query('cms_user_roles')->where(['user_id' => $userId, 'role_id' => $roleId])->first();
        if (!$exists) {
            $this->db->query('cms_user_roles')->insert(['user_id' => $userId, 'role_id' => $roleId]);
        }
    }

    public function update(int $id, array $data): void
    {
        $this->db->query('cms_users')->where(['id' => $id])->update($data);
    }

    public function delete(int $id): void
    {
        $this->db->query('cms_users')->where(['id' => $id])->delete();
    }

    public function checkPermission(int $userId, string $permission): bool
    {
        $perms = $this->getUserPermissions($userId);
        foreach ($perms as $perm) {
            if ($perm['name'] === $permission) {
                return true;
            }
        }
        return false;
    }

    public function changePassword(int $userId, string $newPassword): void
    {
        $this->db->query('cms_users')->where(['id' => $userId])->update(['password_hash' => password_hash($newPassword, PASSWORD_BCRYPT)]);
    }
}
