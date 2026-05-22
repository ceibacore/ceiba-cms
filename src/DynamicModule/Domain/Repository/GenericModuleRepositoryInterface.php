<?php
declare(strict_types=1);

namespace LemurCms\DynamicModule\Domain\Repository;

interface GenericModuleRepositoryInterface
{
    public function list(string $table, array $filters = [], array $sort = [], int $limit = 50, int $offset = 0): array;
    public function findById(string $table, string $id): ?array;
    public function create(string $table, array $data): string;
    public function update(string $table, string $id, array $data): void;
    public function delete(string $table, string $id): void;
    public function forceDelete(string $table, string $id): void;
    public function count(string $table, array $filters = []): int;
}
