<?php
declare(strict_types=1);

namespace LemurCms\Menu\Domain\Repository;

interface MenuRepositoryInterface
{
    public function getMenuTree(string $slug): array;
    public function getActiveBanners(string $position): array;
    public function getActiveLogo(): ?array;
    public function getMegaMenuData(string $itemId): array;
    
    // Methods for create/update/delete operations
    public function saveMenuItem(array $data): string;
    public function updateMenuItem(string $id, array $data): void;
    public function deleteMenuItem(string $id): void;
    public function saveBanner(array $data): string;
    public function saveLogo(array $data): string;

    // Admin dashboard features (Roadmap Feature 4)
    public function getBanners(): array;
    public function getLogos(): array;
}
