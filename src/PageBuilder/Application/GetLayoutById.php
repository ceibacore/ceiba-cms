<?php
declare(strict_types=1);

namespace CeibaCms\PageBuilder\Application;

use CeibaCms\PageBuilder\Domain\Repository\PageLayoutRepositoryInterface;
use CeibaCms\PageBuilder\Domain\Entity\PageLayout;

class GetLayoutById
{
    public function __construct(private readonly PageLayoutRepositoryInterface $repo) {}

    public function execute(string $id): ?PageLayout
    {
        return $this->repo->findById($id);
    }
}
