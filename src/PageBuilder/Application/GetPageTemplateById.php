<?php
declare(strict_types=1);

namespace CeibaCms\PageBuilder\Application;

use CeibaCms\PageBuilder\Domain\Repository\PageTemplateRepositoryInterface;

final class GetPageTemplateById
{
    public function __construct(private readonly PageTemplateRepositoryInterface $repo) {}

    public function execute(string $id): ?array
    {
        return $this->repo->findById($id);
    }
}
