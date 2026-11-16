<?php
declare(strict_types=1);

namespace CeibaCms\DynamicModule\Application;

use CeibaCms\DynamicModule\Domain\Entity\ModuleDefinition;
use CeibaCms\DynamicModule\Domain\Repository\ModuleDefinitionRepositoryInterface;

final class GetModuleDefinition
{
    public function __construct(private readonly ModuleDefinitionRepositoryInterface $repo) {}

    public function execute(string $identifier, string $type = 'id'): ?ModuleDefinition
    {
        if ($type === 'slug') {
            return $this->repo->findBySlug($identifier);
        }
        if ($type === 'module_id') {
            return $this->repo->findByModuleId($identifier);
        }
        return $this->repo->findById($identifier);
    }
}
