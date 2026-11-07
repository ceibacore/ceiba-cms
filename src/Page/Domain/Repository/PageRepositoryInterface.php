<?php
declare(strict_types=1);

namespace LemurCms\Page\Domain\Repository;

interface PageRepositoryInterface
{
    public function findBySlug(string $slug): ?array;
    public function findPublished(int $limit, int $offset): array;
    /** @return array<int, array<string, mixed>> */
    public function findAdministrative(?string $status, ?string $search, int $limit, int $offset): array;
    public function findById(string $id): ?array;
    public function save(array $data): string;
    public function delete(string $id): void;
    public function update(string $id, array $data): void;
    public function publish(string $id): void;
}
