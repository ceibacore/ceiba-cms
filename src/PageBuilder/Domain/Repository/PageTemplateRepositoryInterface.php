<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Repository;

interface PageTemplateRepositoryInterface
{
    public function findById(string $id): ?array;
    public function save(array $data): string;
    public function delete(string $id): void;
}
