<?php
declare(strict_types=1);

namespace CeibaCms\PageBuilder\Application;

use CeibaCms\PageBuilder\Domain\Repository\PageLayoutRepositoryInterface;
use CeibaCms\PageBuilder\Domain\Entity\PageLayout;

final class ListLayouts
{
    public function __construct(private readonly PageLayoutRepositoryInterface $repo) {}

    /** @return PageLayout[] */
    public function execute(): array
    {
        return $this->repo->findAll();
    }
}
