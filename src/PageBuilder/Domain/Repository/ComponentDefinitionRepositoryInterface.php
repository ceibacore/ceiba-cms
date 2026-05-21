<?php
declare(strict_types=1);
namespace LemurCms\PageBuilder\Domain\Repository;

use LemurCms\PageBuilder\Domain\Entity\ComponentDefinition;

interface ComponentDefinitionRepositoryInterface
{
    /** @return ComponentDefinition[] */
    public function findAll(): array;

    public function findByType(string $type): ?ComponentDefinition;

    public function findByCategory(string $category): array;

    public function save(ComponentDefinition $definition): string;

    public function delete(string $id): void;
}
