<?php
declare(strict_types=1);

namespace LemurCms\Auth\Domain\Repository;

interface UserRepositoryInterface
{
    public function findByEmail(string $email): ?array;
    public function findById(string $id): ?array;
    public function save(array $data): string;
    public function update(string $id, array $data): void;
    public function delete(string $id): void;
    public function getUserPermissions(string $userId): array;
    public function assignRole(string $userId, string $roleId): void;
    public function checkPermission(string $userId, string $permission): bool;
    public function changePassword(string $userId, string $newPassword): void;
}
