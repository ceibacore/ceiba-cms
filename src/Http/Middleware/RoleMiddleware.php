<?php
declare(strict_types=1);

namespace LemurCms\Http\Middleware;

use LemurDB;
use LemurCms\Auth\AuthManager;

class RoleMiddleware implements MiddlewareInterface
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
        $requiredRole = $params[0] ?? null;

        if (!$requiredRole) {
            return $next();
        }

        // Check if user has the SuperAdmin role (bypass)
        $isSuperAdmin = $this->hasRole($userId, 'superadmin');
        if ($isSuperAdmin) {
            return $next();
        }

        // Check required role
        if (!$this->hasRole($userId, $requiredRole)) {
            http_response_code(403);
            echo json_encode(['error' => 'Forbidden: Requires role ' . $requiredRole]);
            return null;
        }

        return $next();
    }

    private function hasRole(string $userId, string $roleSlug): bool
    {
        $role = $this->db->query('roles')->where(['slug' => $roleSlug])->first();
        if (!$role) {
            return false;
        }

        return $this->db->query('access_roles')
            ->where(['access_id' => $userId, 'role_id' => $role['id']])
            ->exists();
    }
}
