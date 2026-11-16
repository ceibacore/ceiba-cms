<?php
declare(strict_types=1);

namespace CeibaCms\PageBuilder\Application;

use CeibaCms\PageBuilder\Domain\Repository\PageLayoutRepositoryInterface;
use CeibaCms\PageBuilder\Domain\Entity\PageLayout;

class GetDefaultLayout
{
    public function __construct(private readonly PageLayoutRepositoryInterface $repo) {}

    public function execute(): ?PageLayout
    {
        return $this->repo->findDefault();
    }
}
