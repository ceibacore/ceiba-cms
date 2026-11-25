<?php
declare(strict_types=1);

namespace CeibaCms\Tests\DataSource;

use CeibaCms\DynamicModule\Domain\Entity\ModuleDefinition;
use CeibaCms\DynamicModule\Domain\Repository\ModuleDefinitionRepositoryInterface;

/** Module definitions for tests, without the modules tables. */
final class InMemoryDefinitions implements ModuleDefinitionRepositoryInterface
{
    /** @param list<ModuleDefinition> $definitions */
    public function __construct(private array $definitions) {}

    public function findById(string $id): ?ModuleDefinition
    {
        return array_values(array_filter($this->definitions, fn ($d) => $d->id === $id))[0] ?? null;
    }

    public function findBySlug(string $slug): ?ModuleDefinition
    {
        return array_values(array_filter($this->definitions, fn ($d) => $d->moduleSlug === $slug))[0] ?? null;
    }

    public function findByModuleId(string $moduleId): ?ModuleDefinition
    {
        return array_values(array_filter($this->definitions, fn ($d) => $d->moduleId === $moduleId))[0] ?? null;
    }

    public function save(ModuleDefinition $definition): void
    {
        $this->definitions[] = $definition;
    }

    public function delete(string $id): void
    {
        $this->definitions = array_values(array_filter($this->definitions, fn ($d) => $d->id !== $id));
    }

    public function listAll(): array
    {
        return $this->definitions;
    }
}
