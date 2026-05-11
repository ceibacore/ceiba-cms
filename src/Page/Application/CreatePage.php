<?php
declare(strict_types=1);
namespace LemurCms\Page\Application;

use LemurCms\Page\Domain\Repository\PageRepositoryInterface;

final class CreatePage
{
    public function __construct(private PageRepositoryInterface $repo) {}

    public function execute(array $data): int
    {
        return $this->repo->save($data);
    }
}
