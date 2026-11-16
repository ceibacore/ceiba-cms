<?php
declare(strict_types=1);
namespace CeibaCms\Auth\Application;

use CeibaCms\Auth\Domain\Repository\UserRepositoryInterface;

final class CheckPermission
{
    public function __construct(private UserRepositoryInterface $repo) {}

    public function execute(string $userId, string $permissionSlug): bool
    {
        return $this->repo->checkPermission($userId, $permissionSlug);
    }
}
