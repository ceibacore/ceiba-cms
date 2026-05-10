<?php
declare(strict_types=1);
namespace LemurCms\Page\Application;

use LemurCms\Page\Domain\PageRepositoryInterface;

final class DeletePage
{
    public function __construct(private PageRepositoryInterface $repo) {}

    public function execute(int $id): void
    {
        $this->repo->delete($id);
    }
}
