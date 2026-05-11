<?php
declare(strict_types=1);
namespace LemurCms\Auth\Domain\Repository;
interface UserRepositoryInterface
{
    public function findByEmail(string $email): ?array;
    public function findById(int $id): ?array;
    public function save(array $data): int;
    public function update(int $id, array $data): void;
    public function delete(int $id): void;
    public function getUserPermissions(int $userId): array;
    public function assignRole(int $userId, int $roleId): void;
    public function checkPermission(int $userId, string $permission): bool;
    public function changePassword(int $userId, string $newPassword): void;
}
