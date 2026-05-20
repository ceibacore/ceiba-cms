<?php
declare(strict_types=1);

namespace LemurCms\Media\Domain\Repository;

interface MediaRepositoryInterface
{
    public function findById(string $id): ?array;
    public function store(array $data): string;
    public function delete(string $id): void;
    public function findAll(int $limit, int $offset): array;
}
