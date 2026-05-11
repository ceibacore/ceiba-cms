<?php
declare(strict_types=1);
namespace LemurCms\Menu\Domain\Repository;

interface MenuRepositoryInterface
{
    public function getMenuTree(string $slug): array;
    public function getActiveBanners(string $position): array;
    public function getActiveLogo(): ?array;
    public function getMegaMenuData(int $itemId): array;
    
    // Methods for create/update/delete operations
    public function saveMenuItem(array $data): int;
    public function updateMenuItem(int $id, array $data): void;
    public function deleteMenuItem(int $id): void;
    public function saveBanner(array $data): int;
    public function saveLogo(array $data): int;
}
