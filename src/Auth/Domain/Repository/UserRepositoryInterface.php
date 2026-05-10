<?php
declare(strict_types=1);
namespace LemurCms\Auth\Domain\Repository;
interface UserRepositoryInterface
{
    public function findByEmail(string $email): ?array;
    public function findById(int $id): ?array;
    public function save(array $data): int;
    public function getUserPermissions(int $userId): array;
}
