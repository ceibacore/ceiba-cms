<?php
declare(strict_types=1);

namespace CeibaCms\DynamicModule\Application;

use CeibaCms\DynamicModule\Domain\Repository\ModuleDefinitionRepositoryInterface;

final class ListDynamicModules
{
    public function __construct(private readonly ModuleDefinitionRepositoryInterface $repo) {}

    public function execute(): array
    {
        $all = $this->repo->listAll();
        return array_map(fn($def) => $def->toArray(), $all);
    }
}
