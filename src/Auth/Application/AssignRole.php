<?php
declare(strict_types=1);
namespace LemurCms\Auth\Application;

use LemurCms\Auth\Domain\Repository\UserRepositoryInterface;

final class AssignRole
{
    public function __construct(private UserRepositoryInterface $repo) {}

    public function execute(string $userId, string $roleId): void
    {
        $this->repo->assignRole($userId, $roleId);
    }
}
