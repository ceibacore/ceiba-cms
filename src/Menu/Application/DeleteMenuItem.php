<?php
declare(strict_types=1);
namespace CeibaCms\Menu\Application;

use CeibaCms\Menu\Domain\Repository\MenuRepositoryInterface;

final class DeleteMenuItem
{
    public function __construct(private MenuRepositoryInterface $repo) {}

    public function execute(string $id): void
    {
        $this->repo->deleteMenuItem($id);
    }
}
