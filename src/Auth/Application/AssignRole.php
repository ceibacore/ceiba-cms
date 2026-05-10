<?php
declare(strict_types=1);
namespace LemurCms\Auth\Application;

use LemurCms\Auth\Domain\UserRepositoryInterface;

final class AssignRole
{
    public function __construct(private UserRepositoryInterface $repo) {}

    public function execute(int $userId, int $roleId): void
    {
        $this->repo->assignRole($userId, $roleId);
    }
}
