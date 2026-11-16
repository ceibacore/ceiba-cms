<?php
declare(strict_types=1);
namespace CeibaCms\Menu\Application;

use CeibaCms\Menu\Domain\Repository\MenuRepositoryInterface;

final class UpdateMenuItem
{
    public function __construct(private MenuRepositoryInterface $repo) {}

    public function execute(string $id, array $data): void
    {
        $this->repo->updateMenuItem($id, $data);
    }
}
