<?php
declare(strict_types=1);
namespace LemurCms\Auth\Application;

use LemurCms\Auth\Domain\Repository\UserRepositoryInterface;

final class ChangePassword
{
    public function __construct(private UserRepositoryInterface $repo) {}

    public function execute(string $userId, string $newPassword): void
    {
        $user = $this->repo->findById($userId);
        if (!$user) return;
        $user['password_hash'] = password_hash($newPassword, PASSWORD_BCRYPT);
        $this->repo->save($user);
    }
}
