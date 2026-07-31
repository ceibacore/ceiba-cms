<?php

declare(strict_types=1);

namespace LemurCms\PageBuilder\Application;

use LemurCms\PageBuilder\Domain\Repository\TemplateRepositoryInterface;

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
