<?php
declare(strict_types=1);
namespace LemurCms\Menu\Domain\Repository;
interface MenuRepositoryInterface
{
    public function getMenuTree(string $slug): array;
    public function getActiveBanners(string $position): array;
    public function getActiveLogo(): ?array;
    public function getMegaMenuData(int $itemId): array;
}
