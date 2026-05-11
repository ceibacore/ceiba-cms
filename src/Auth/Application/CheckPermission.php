<?php
declare(strict_types=1);
namespace LemurCms\Auth\Application;

use LemurCms\Auth\Domain\Repository\UserRepositoryInterface;

final class CheckPermission
{
    public function __construct(private UserRepositoryInterface $repo) {}

    public function execute(int $userId, string $permissionSlug): bool
    {
        $permissions = $this->repo->getUserPermissions($userId);
        return in_array($permissionSlug, array_column($permissions, 'slug'), true);
    }
}
