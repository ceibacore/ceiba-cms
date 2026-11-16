<?php
declare(strict_types=1);
namespace CeibaCms\Auth\Application;
use CeibaCms\Auth\Domain\Repository\UserRepositoryInterface;
final class AuthenticateUser
{
    public function __construct(private readonly UserRepositoryInterface $repo) {}
    public function execute(string $email, string $password): ?array
    {
        $user = $this->repo->findByEmail($email);
        if ($user === null) return null;
        return password_verify($password, $user['password_hash']) ? $user : null;
    }
}
