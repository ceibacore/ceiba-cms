<?php
declare(strict_types=1);
namespace LemurCms\Tests\Menu\Infrastructure;

use LemurCms\Menu\Infrastructure\LemurDbMenuRepository;
use PHPUnit\Framework\TestCase;

class LemurDbMenuRepositoryTest extends TestCase
{
    private \LemurDB $db;
    private LemurDbMenuRepository $repo;

    protected function setUp(): void
    {
        $this->db = new \LemurDB('localhost', 'cms_test', 'root', '', 'cms_');
        $this->repo = new LemurDbMenuRepository($this->db);
    }

    public function testGetMenuTreeReturnsArrayForValidSlug(): void
    {
        // Insert test menu
        $menuId = $this->db->query('menus')->insert(['name' => 'Test', 'slug' => 'test-menu', 'type' => 'main', 'status' => 1]);
        
        $result = $this->repo->getMenuTree('test-menu');
        
        $this->assertIsArray($result);
    }

    public function testGetMenuTreeReturnsEmptyForInvalidSlug(): void
    {
        $result = $this->repo->getMenuTree('nonexistent');
        $this->assertEmpty($result);
    }

    public function testSaveMenuItemReturnsId(): void
    {
        $menuId = $this->db->query('menus')->insert(['name' => 'Test', 'slug' => 'test', 'type' => 'main', 'status' => 1]);
        
        $id = $this->repo->saveMenuItem([
            'menu_id' => $menuId,
            'label' => 'Home',
            'url' => '/',
            'type' => 'link',
            'target' => '_self',
            'sort_order' => 0,
            'status' => 1,
        ]);
        
        $this->assertIsInt($id);
        $this->assertGreaterThan(0, $id);
    }

    public function testUpdateMenuItemModifiesData(): void
    {
        $menuId = $this->db->query('menus')->insert(['name' => 'Test', 'slug' => 'test', 'type' => 'main', 'status' => 1]);
        $itemId = $this->repo->saveMenuItem(['menu_id' => $menuId, 'label' => 'Old', 'sort_order' => 0, 'status' => 1]);
        
        $this->repo->updateMenuItem($itemId, ['label' => 'New']);
        
        $updated = $this->db->query('menu_items')->where(['id' => $itemId])->first();
        $this->assertEquals('New', $updated['label']);
    }

    public function testDeleteMenuItemRemovesData(): void
    {
        $menuId = $this->db->query('menus')->insert(['name' => 'Test', 'slug' => 'test', 'type' => 'main', 'status' => 1]);
        $itemId = $this->repo->saveMenuItem(['menu_id' => $menuId, 'label' => 'Delete', 'sort_order' => 0, 'status' => 1]);
        
        $this->repo->deleteMenuItem($itemId);
        
        $deleted = $this->db->query('menu_items')->where(['id' => $itemId])->first();
        $this->assertNull($deleted);
    }
}
