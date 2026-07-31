<?php
declare(strict_types=1);

namespace LemurCms\DynamicModule\Application;

use LemurCms\DynamicModule\Domain\Entity\ModuleDefinition;
use LemurCms\DynamicModule\Domain\Repository\ModuleDefinitionRepositoryInterface;

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
