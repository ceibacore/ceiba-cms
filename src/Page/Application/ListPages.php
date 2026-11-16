<?php
declare(strict_types=1);
namespace CeibaCms\Page\Application;

use CeibaCms\Page\Domain\Repository\PageRepositoryInterface;

final class ListPages
{
    public function __construct(private PageRepositoryInterface $repo) {}

    public function execute(int $limit = 10, int $offset = 0): array
    {
        return $this->repo->findPublished($limit, $offset);
    }
}
