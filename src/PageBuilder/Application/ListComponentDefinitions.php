<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Application;

use CeibaCms\PageBuilder\Domain\Repository\ComponentDefinitionRepositoryInterface;

final class ListComponentDefinitions
{
    public function __construct(private readonly ComponentDefinitionRepositoryInterface $repo) {}

    /**
     * @return \CeibaCms\PageBuilder\Domain\Entity\ComponentDefinition[]
     */
    public function execute(): array
    {
        return $this->repo->findAll();
    }
}
