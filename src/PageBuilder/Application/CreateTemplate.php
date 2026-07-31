<?php

declare(strict_types=1);

namespace LemurCms\PageBuilder\Application;

use LemurCms\PageBuilder\Domain\Repository\TemplateRepositoryInterface;

final class CreateTemplate
{
    public function __construct(private readonly TemplateRepositoryInterface $repo) {}

    public function execute(array $data): string
    {
        return $this->repo->save($data);
    }
}
