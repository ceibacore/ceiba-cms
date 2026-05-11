<?php
declare(strict_types=1);
namespace LemurCms\Page\Domain\Repository;
interface PageRepositoryInterface
{
    public function findBySlug(string $slug): ?array;
    public function findPublished(int $limit, int $offset): array;
    public function findById(int $id): ?array;
    public function save(array $data): int;
    public function delete(int $id): void;
    public function update(int $id, array $data): void;
    public function publish(int $id): void;
}
