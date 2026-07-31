<?php
declare(strict_types=1);
namespace LemurCms\Page\Domain;

interface PageRepositoryInterface
{
    public function findBySlug(string $slug): ?array;
    public function findPublished(int $limit, int $offset): array;
    public function findById(int $id): ?array;
    public function save(array $data): int;
    public function delete(int $id): void;
}
