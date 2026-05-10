<?php
declare(strict_types=1);
namespace LemurCms\Menu\Domain;

interface MenuRepositoryInterface
{
    public function getMenuTree(string $slug): array;
    public function getActiveBanners(string $position): array;
    public function getActiveLogo(): ?array;
    public function getMegaMenuData(int $itemId): array;
    
    // Additional methods for new use cases
    public function saveMenuItem(array $data): int;
    public function updateMenuItem(int $id, array $data): void;
    public function deleteMenuItem(int $id): void;
    public function saveBanner(array $data): int;
    public function saveLogo(array $data): int;
}
