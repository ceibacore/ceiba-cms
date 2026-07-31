<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Application;

use LemurCms\PageBuilder\Domain\Repository\PageLayoutRepositoryInterface;
use LemurCms\PageBuilder\Domain\Entity\PageLayout;

class GetDefaultLayout
{
    public function __construct(private readonly PageLayoutRepositoryInterface $repo) {}

    public function execute(): ?PageLayout
    {
        return $this->repo->findDefault();
    }
}
