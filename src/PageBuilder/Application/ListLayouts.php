<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Application;

use LemurCms\PageBuilder\Domain\Repository\PageLayoutRepositoryInterface;
use LemurCms\PageBuilder\Domain\Entity\PageLayout;

final class ListLayouts
{
    public function __construct(private readonly PageLayoutRepositoryInterface $repo) {}

    /** @return PageLayout[] */
    public function execute(): array
    {
        return $this->repo->findAll();
    }
}
