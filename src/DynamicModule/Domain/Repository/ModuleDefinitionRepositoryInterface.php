<?php
declare(strict_types=1);

namespace LemurCms\DynamicModule\Domain\Repository;

use LemurCms\DynamicModule\Domain\Entity\ModuleDefinition;

interface ModuleDefinitionRepositoryInterface
{
    public function findById(string $id): ?ModuleDefinition;
    public function findBySlug(string $slug): ?ModuleDefinition;
    public function findByModuleId(string $moduleId): ?ModuleDefinition;
    public function save(ModuleDefinition $definition): void;
    public function delete(string $id): void;
    public function listAll(): array;
}
