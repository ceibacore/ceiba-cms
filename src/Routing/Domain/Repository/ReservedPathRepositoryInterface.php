<?php
declare(strict_types=1);

namespace LemurCms\Routing\Domain\Repository;

interface ReservedPathRepositoryInterface
{
    /** @return array[] */
    public function findAll(): array;

    public function findById(string $id): ?array;

    public function findByPath(string $path): ?array;

    /** Insert and return the new id. */
    public function save(array $data): string;

    public function delete(string $id): void;

    public function deleteByPath(string $path): void;
}
