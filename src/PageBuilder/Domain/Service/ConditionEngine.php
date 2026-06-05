<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Service;

use LemurDB;
use LemurCms\Auth\AuthManager;

final class ConditionEngine
{
    public function __construct(
        private readonly AuthManager $auth,
        private readonly LemurDB $db
    ) {}

    /**
     * Evaluates a list of conditions.
     * Returns the failing condition if any, or null if all pass.
     */
    public function evaluateConditions(array $conditions): ?array
    {
        foreach ($conditions as $condition) {
            if (!$this->evaluateCondition($condition)) {
                return $condition;
            }
        }
        return null;
    }

    public function evaluateCondition(array $condition): bool
    {
        $type     = $condition['type'] ?? '';
        $operator = $condition['operator'] ?? '';
        $params   = $condition['params'] ?? [];

        switch ($type) {
            case 'auth':
                return $this->evaluateAuth($operator);
            case 'role':
                return $this->evaluateRole($operator, $params);
            case 'permission':
                return $this->evaluatePermission($operator, $params);
            case 'request':
                return $this->evaluateRequest($operator, $params);
            case 'date_range':
                return $this->evaluateDateRange($operator, $params);
            case 'feature_flag':
                return $this->evaluateFeatureFlag($operator, $params);
            default:
                return true; // Unknown/custom fallback is pass by default
        }
    }

    private function evaluateAuth(string $operator): bool
    {
        $isAuthed = $this->auth->check();
        if ($operator === 'is_authenticated') {
            return $isAuthed;
        }
        if ($operator === 'is_guest') {
            return !$isAuthed;
        }
        return true;
    }

    private function evaluateRole(string $operator, array $params): bool
    {
        if (!$this->auth->check()) {
            return $operator === 'not_has_role';
        }
        $userId = $this->auth->id();
        $roles  = (array) ($params['roles'] ?? $params['role'] ?? []);

        // SuperAdmin bypass
        if ($this->hasRole($userId, 'superadmin')) {
            return $operator !== 'not_has_role';
        }

        $hasAny = false;
        foreach ($roles as $role) {
            if ($this->hasRole($userId, $role)) {
                $hasAny = true;
                break;
            }
        }

        if ($operator === 'has_role') {
            return $hasAny;
        }
        if ($operator === 'not_has_role') {
            return !$hasAny;
        }
        if ($operator === 'has_any_role') {
            return $hasAny;
        }
        return true;
    }

    private function evaluatePermission(string $operator, array $params): bool
    {
        if (!$this->auth->check()) {
            return $operator === 'not_has_permission';
        }
        $userId     = $this->auth->id();
        $permission = $params['permission'] ?? '';

        if (empty($permission)) {
            return true;
        }

        // SuperAdmin bypass
        if ($this->hasRole($userId, 'superadmin')) {
            return $operator !== 'not_has_permission';
        }

        $hasPerm = $this->hasPermission($userId, $permission);
        if ($operator === 'has_permission') {
            return $hasPerm;
        }
        if ($operator === 'not_has_permission') {
            return !$hasPerm;
        }
        return true;
    }

    private function evaluateRequest(string $operator, array $params): bool
    {
        $paramName = $params['param'] ?? '';
        $expected  = $params['value'] ?? null;

        if ($operator === 'has_param') {
            return isset($_GET[$paramName]) || isset($_POST[$paramName]);
        }
        if ($operator === 'param_equals') {
            $val = $_GET[$paramName] ?? $_POST[$paramName] ?? null;
            return (string)$val === (string)$expected;
        }
        if ($operator === 'has_header') {
            $header = 'HTTP_' . strtoupper(str_replace('-', '_', $paramName));
            return isset($_SERVER[$header]);
        }
        return true;
    }

    private function evaluateDateRange(string $operator, array $params): bool
    {
        $now  = time();
        $from = isset($params['from']) ? strtotime($params['from']) : false;
        $to   = isset($params['to']) ? strtotime($params['to']) : false;

        if ($operator === 'is_before') {
            return $to !== false && $now < $to;
        }
        if ($operator === 'is_after') {
            return $from !== false && $now > $from;
        }
        if ($operator === 'is_between') {
            $afterFrom  = ($from === false || $now >= $from);
            $beforeTo   = ($to === false || $now <= $to);
            return $afterFrom && $beforeTo;
        }
        return true;
    }

    private function evaluateFeatureFlag(string $operator, array $params): bool
    {
        $flag = $params['flag'] ?? '';
        $isEnabled = (bool)($_ENV['FEATURE_FLAG_' . strtoupper($flag)] ?? false);

        if ($operator === 'is_enabled') {
            return $isEnabled;
        }
        if ($operator === 'is_disabled') {
            return !$isEnabled;
        }
        return true;
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
        $permission = $this->db->query('permissions')->where(['slug' => $permissionSlug])->first();
        if (!$permission) return false;

        $userRoles = $this->db->query('access_roles')->where(['access_id' => $userId])->get();
        if (empty($userRoles)) return false;

        $roleIds = array_column($userRoles, 'role_id');
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
