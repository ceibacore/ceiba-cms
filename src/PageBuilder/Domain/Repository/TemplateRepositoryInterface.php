<?php
declare(strict_types=1);
namespace LemurCms\PageBuilder\Domain\Repository;

interface TemplateRepositoryInterface
{
    /** @return array[] */
    public function findAll(): array;

    public function findById(string $id): ?array;

    public function findByCategory(string $category): array;

    public function save(array $data): string;

    public function delete(string $id): void;
}
