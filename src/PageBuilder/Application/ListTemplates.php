<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Application;

use CeibaCms\PageBuilder\Domain\Repository\TemplateRepositoryInterface;

final class ListTemplates
{
    public function __construct(private readonly TemplateRepositoryInterface $repo) {}

    /**
     * @return array[]
     */
    public function execute(): array
    {
        return $this->repo->findAll();
    }
}
