<?php
declare(strict_types=1);
namespace LemurCms\Menu\Application;

use LemurCms\Menu\Domain\Repository\MenuRepositoryInterface;

final class DeleteMenuItem
{
    public function __construct(private MenuRepositoryInterface $repo) {}

    public function execute(string $id): void
    {
        $this->repo->deleteMenuItem($id);
    }
}
