<?php
declare(strict_types=1);

namespace LemurCms\Menu\Infrastructure;

use LemurCms\Menu\Domain\Repository\MenuRepositoryInterface;
use LemurDB;
use LemurCms\Support\Helpers\UuidHelper;

/**
 * LemurDB adapter — concrete implementation of MenuRepositoryInterface.
 * Inject via constructor in your bootstrap.
 */
final class LemurDbMenuRepository implements MenuRepositoryInterface
{
    public function __construct(private readonly \LemurDB $db) {}

    public function getMenuTree(string $slug): array
    {
        $menu = $this->db->query('menus')->where(['slug' => $slug])->first();
        if (!$menu) return [];
        $items = $this->db->query('menu_items')->where(['menu_id' => $menu['id'], 'parent_id' => null])->orderBy('sort_order', 'ASC')->get();
        return array_map(fn($item) => $this->buildItemTree($item), $items);
    }

    public function getActiveBanners(string $position): array
    {
        $now = date('Y-m-d H:i:s');
        return $this->db->query('banners')
            ->where(['position' => $position, 'status' => 1])
            ->whereRaw('(start_at IS NULL OR start_at <= ?)', [$now])
            ->whereRaw('(end_at IS NULL OR end_at >= ?)', [$now])
            ->orderBy('sort_order', 'ASC')
            ->get();
    }

    public function getActiveLogo(): ?array
    {
        return $this->db->query('logos')->where(['is_active' => 1])->first();
    }

    public function getMegaMenuData(string $itemId): array
    {
        $sections = $this->db->query('mega_sections')->where(['menu_item_id' => $itemId])->orderBy('sort_order', 'ASC')->get();
        return array_map(fn($sec) => [
            'title' => $sec['title'],
            'col_span' => $sec['col_span'],
            'links' => $this->db->query('mega_links')->where(['section_id' => $sec['id']])->orderBy('sort_order', 'ASC')->get(),
        ], $sections);
    }

    public function saveMenuItem(array $data): string
    {
        $id = $data['id'] ?? null;
        if ($id) {
            unset($data['id']);
            $this->db->query('menu_items')->where(['id' => $id])->update($data);
            return $id;
        }
        
        $id = UuidHelper::v4();
        $data['id'] = $id;
        $this->db->query('menu_items')->insert($data);
        return $id;
    }

    public function updateMenuItem(string $id, array $data): void
    {
        $this->db->query('menu_items')->where(['id' => $id])->update($data);
    }

    public function deleteMenuItem(string $id): void
    {
        $this->db->query('menu_items')->where(['id' => $id])->delete();
    }

    public function saveBanner(array $data): string
    {
        $id = $data['id'] ?? null;
        if ($id) {
            unset($data['id']);
            $this->db->query('banners')->where(['id' => $id])->update($data);
            return $id;
        }

        $id = UuidHelper::v4();
        $data['id'] = $id;
        $this->db->query('banners')->insert($data);
        return $id;
    }

    public function saveLogo(array $data): string
    {
        $id = $data['id'] ?? null;
        if ($id) {
            unset($data['id']);
            $this->db->query('logos')->where(['id' => $id])->update($data);
            return $id;
        }

        $id = UuidHelper::v4();
        $data['id'] = $id;
        $this->db->query('logos')->insert($data);
        return $id;
    }

    public function getBanners(): array
    {
        return $this->db->query('banners')->orderBy('sort_order', 'ASC')->get();
    }

    public function getLogos(): array
    {
        return $this->db->query('logos')->get();
    }

    private function buildItemTree(array $item): array
    {
        $children = $this->db->query('menu_items')->where(['parent_id' => $item['id']])->orderBy('sort_order', 'ASC')->get();
        $result = $item;
        $result['children'] = array_map(fn($child) => $this->buildItemTree($child), $children);
        if ($item['type'] === 'mega') {
            $result['mega'] = ['sections' => $this->getMegaMenuData($item['id'])];
        }
        return $result;
    }
}
