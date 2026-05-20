<?php
declare(strict_types=1);

namespace LemurCms\Http\Middleware;

use LemurDB;
use LemurCms\Auth\AuthManager;

class PermissionMiddleware implements MiddlewareInterface
{
    public function __construct(
        private readonly AuthManager $auth,
        private readonly LemurDB $db
    ) {}

    public function handle(\Closure $next, ...$params): mixed
    {
        if (!$this->auth->check()) {
            http_response_code(401);
            echo json_encode(['error' => 'Unauthorized']);
            return null;
        }

        $userId = $this->auth->id();
        $requiredPermission = $params[0] ?? null;

        if (!$requiredPermission) {
            return $next();
        }

        // SuperAdmin bypass
        if ($this->hasRole($userId, 'superadmin')) {
            return $next();
        }

        if (!$this->hasPermission($userId, $requiredPermission)) {
            http_response_code(403);
            echo json_encode(['error' => 'Forbidden: Requires permission ' . $requiredPermission]);
            return null;
        }

        return $next();
    }

    private function hasRole(string $userId, string $roleSlug): bool
    {
        $role = $this->db->query('roles')->where(['slug' => $roleSlug])->first();
        if (!$role) return false;

        return $this->db->query('access_roles')
            ->where(['access_id' => $userId, 'role_id' => $role['id']])
            ->exists();
    }

    private function hasPermission(string $userId, string $permissionSlug): bool
    {
        // Get the requested permission
        $permission = $this->db->query('permissions')->where(['slug' => $permissionSlug])->first();
        if (!$permission) return false;

        // Get user roles
        $userRoles = $this->db->query('access_roles')->where(['access_id' => $userId])->get();
        if (empty($userRoles)) return false;

        $roleIds = array_column($userRoles, 'role_id');

        // Check if any of the user's roles have this permission
        foreach ($roleIds as $roleId) {
            $hasPerm = $this->db->query('role_permissions')
                ->where(['role_id' => $roleId, 'permission_id' => $permission['id']])
                ->exists();
                
            if ($hasPerm) {
                return true;
            }
        }

        return false;
    }
}
