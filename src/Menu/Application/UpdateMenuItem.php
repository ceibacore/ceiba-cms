<?php
declare(strict_types=1);
namespace LemurCms\Menu\Application;

use LemurCms\Menu\Domain\MenuRepositoryInterface;

final class UpdateMenuItem
{
    public function __construct(private MenuRepositoryInterface $repo) {}

    public function execute(int $id, array $data): void
    {
        $this->repo->updateMenuItem($id, $data);
    }
}
