<?php
declare(strict_types=1);
namespace LemurCms\Page\Application;

use LemurCms\Page\Domain\Repository\PageRepositoryInterface;

final class ListPages
{
    public function __construct(private PageRepositoryInterface $repo) {}

    public function execute(int $limit = 10, int $offset = 0): array
    {
        return $this->repo->findPublished($limit, $offset);
    }
}
