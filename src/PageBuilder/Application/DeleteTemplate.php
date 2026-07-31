<?php

declare(strict_types=1);

namespace LemurCms\PageBuilder\Application;

use LemurCms\PageBuilder\Domain\Repository\TemplateRepositoryInterface;

final class DeleteTemplate
{
    public function __construct(private readonly TemplateRepositoryInterface $repo) {}

    public function execute(string $id): void
    {
        $this->repo->delete($id);
    }
}
