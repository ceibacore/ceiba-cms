<?php
declare(strict_types=1);
namespace LemurCms\Media\Domain;

interface MediaRepositoryInterface
{
    public function findById(int $id): ?array;
    public function store(array $data): int;
    public function delete(int $id): void;
    public function findAll(int $limit, int $offset): array;
}
