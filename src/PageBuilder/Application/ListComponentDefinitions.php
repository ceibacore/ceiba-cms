<?php

declare(strict_types=1);

namespace LemurCms\PageBuilder\Application;

use LemurCms\PageBuilder\Domain\Repository\ComponentDefinitionRepositoryInterface;

final class ListComponentDefinitions
{
    public function __construct(private readonly ComponentDefinitionRepositoryInterface $repo) {}

    /**
     * @return \LemurCms\PageBuilder\Domain\Entity\ComponentDefinition[]
     */
    public function execute(): array
    {
        return $this->repo->findAll();
    }
}
