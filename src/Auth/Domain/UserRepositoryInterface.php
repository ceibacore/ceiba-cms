<?php
declare(strict_types=1);
namespace LemurCms\Auth\Domain;

interface UserRepositoryInterface
{
    public function findByEmail(string $email): ?array;
    public function findById(int $id): ?array;
    public function save(array $data): int;
    public function getUserPermissions(int $userId): array;
    public function assignRole(int $userId, int $roleId): void;
}
