<?php
declare(strict_types=1);
namespace LemurCms\Page\Application;

use LemurCms\Page\Domain\Repository\PageRepositoryInterface;

final class DeletePage
{
    public function __construct(private PageRepositoryInterface $repo) {}

    public function execute(string $id): void
    {
        $this->repo->delete($id);
    }
}
