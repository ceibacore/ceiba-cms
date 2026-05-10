<?php
declare(strict_types=1);
namespace LemurCms\Menu\Infrastructure;
use LemurCms\Menu\Domain\MenuRepositoryInterface;
use LemurDB;
/**
 * LemurDB adapter — concrete implementation of MenuRepositoryInterface.
 * Inject via constructor in your bootstrap.
 */
final class LemurDbMenuRepository implements MenuRepositoryInterface
{
    public function __construct(private readonly \LemurDB $db) {}

    public function getMenuTree(string $slug): array
    {
        $menu = $this->db->query('cms_menus')->where(['slug' => $slug])->first();
        if (!$menu) return [];
        $items = $this->db->query('cms_menu_items')->where(['menu_id' => $menu['id'], 'parent_id' => null])->orderBy('sort_order', 'ASC')->get();
        return array_map(fn($item) => $this->buildItemTree($item), $items);
    }

    public function getActiveBanners(string $position): array
    {
        $now = date('Y-m-d H:i:s');
        return $this->db->query('cms_banners')
            ->where(['position' => $position, 'status' => 1])
            ->whereRaw('(start_at IS NULL OR start_at <= ?)', [$now])
            ->whereRaw('(end_at IS NULL OR end_at >= ?)', [$now])
            ->orderBy('sort_order', 'ASC')
            ->get();
    }

    public function getActiveLogo(): ?array
    {
        return $this->db->query('cms_logos')->where(['is_active' => 1])->first();
    }

    public function getMegaMenuData(int $itemId): array
    {
        $sections = $this->db->query('cms_mega_sections')->where(['menu_item_id' => $itemId])->orderBy('sort_order', 'ASC')->get();
        return array_map(fn($sec) => [
            'title' => $sec['title'],
            'col_span' => $sec['col_span'],
            'links' => $this->db->query('cms_mega_links')->where(['section_id' => $sec['id']])->orderBy('sort_order', 'ASC')->get(),
        ], $sections);
    }

    public function saveMenuItem(array $data): int
    {
        if (!empty($data['id'])) {
            $this->db->query('cms_menu_items')->where(['id' => $data['id']])->update($data);
            return $data['id'];
        }
        return $this->db->query('cms_menu_items')->insert($data);
    }

    public function updateMenuItem(int $id, array $data): void
    {
        $this->db->query('cms_menu_items')->where(['id' => $id])->update($data);
    }

    public function deleteMenuItem(int $id): void
    {
        $this->db->query('cms_menu_items')->where(['id' => $id])->delete();
    }

    public function saveBanner(array $data): int
    {
        if (!empty($data['id'])) {
            $this->db->query('cms_banners')->where(['id' => $data['id']])->update($data);
            return $data['id'];
        }
        return $this->db->query('cms_banners')->insert($data);
    }

    public function saveLogo(array $data): int
    {
        if (!empty($data['id'])) {
            $this->db->query('cms_logos')->where(['id' => $data['id']])->update($data);
            return $data['id'];
        }
        return $this->db->query('cms_logos')->insert($data);
    }

    private function buildItemTree(array $item): array
    {
        $children = $this->db->query('cms_menu_items')->where(['parent_id' => $item['id']])->orderBy('sort_order', 'ASC')->get();
        $result = $item;
        $result['children'] = array_map(fn($child) => $this->buildItemTree($child), $children);
        if ($item['type'] === 'mega') {
            $result['mega'] = ['sections' => $this->getMegaMenuData($item['id'])];
        }
        return $result;
    }
}
