<?php
declare(strict_types=1);
namespace LemurCms\Auth\Application;

use LemurCms\Auth\Domain\Repository\UserRepositoryInterface;

final class CreateUser
{
    public function __construct(private UserRepositoryInterface $repo) {}

    public function execute(array $data): string
    {
        $data['password_hash'] = password_hash($data['password'] ?? '', PASSWORD_BCRYPT);
        unset($data['password']);
        return $this->repo->save($data);
    }
}
