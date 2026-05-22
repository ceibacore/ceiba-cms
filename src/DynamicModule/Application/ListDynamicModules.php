<?php
declare(strict_types=1);

namespace LemurCms\DynamicModule\Application;

use LemurCms\DynamicModule\Domain\Repository\ModuleDefinitionRepositoryInterface;

final class ListDynamicModules
{
    public function __construct(private readonly ModuleDefinitionRepositoryInterface $repo) {}

    public function execute(): array
    {
        $all = $this->repo->listAll();
        return array_map(fn($def) => $def->toArray(), $all);
    }
}
