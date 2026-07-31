<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Application;

use LemurCms\PageBuilder\Domain\Repository\PageTemplateRepositoryInterface;

final class ListPageTemplates
{
    public function __construct(private readonly PageTemplateRepositoryInterface $repo) {}

    /**
     * @return array[]
     */
    public function execute(): array
    {
        return $this->repo->findAll();
    }
}
