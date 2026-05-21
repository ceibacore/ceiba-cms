<?php
declare(strict_types=1);
namespace LemurCms\Tests\Menu\Infrastructure;

use LemurCms\Menu\Infrastructure\LemurDbMenuRepository;
use LemurCms\Support\Helpers\UuidHelper;
use LemurCms\Tests\TestCase;

class LemurDbMenuRepositoryTest extends TestCase
{
    private LemurDbMenuRepository $repo;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repo = new LemurDbMenuRepository($this->db);
    }

    private function createMenu(string $slug): string
    {
        $id = UuidHelper::v4();
        $this->db->query('menus')->insert([
            'id'     => $id,
            'name'   => 'Test',
            'slug'   => $slug,
            'type'   => 'main',
            'status' => 1,
        ]);
        return $id;
    }

    public function testGetMenuTreeReturnsArrayForValidSlug(): void
    {
        $slug = 'test-menu-' . UuidHelper::v4();
        $this->createMenu($slug);

        $result = $this->repo->getMenuTree($slug);

        $this->assertIsArray($result);
    }

    public function testGetMenuTreeReturnsEmptyForInvalidSlug(): void
    {
        $result = $this->repo->getMenuTree('nonexistent-' . UuidHelper::v4());
        $this->assertEmpty($result);
    }

    public function testSaveMenuItemReturnsId(): void
    {
        $menuId = $this->createMenu('test-' . UuidHelper::v4());

        $id = $this->repo->saveMenuItem([
            'menu_id'    => $menuId,
            'label'      => 'Home',
            'url'        => '/',
            'type'       => 'link',
            'target'     => '_self',
            'sort_order' => 0,
            'status'     => 1,
        ]);

        $this->assertIsString($id);
        $this->assertNotEmpty($id);
    }

    public function testUpdateMenuItemModifiesData(): void
    {
        $menuId = $this->createMenu('test-' . UuidHelper::v4());
        $itemId = $this->repo->saveMenuItem([
            'menu_id'    => $menuId,
            'label'      => 'Old',
            'sort_order' => 0,
            'status'     => 1,
        ]);

        $this->repo->updateMenuItem($itemId, ['label' => 'New']);

        $updated = $this->db->query('menu_items')->where(['id' => $itemId])->first();
        $this->assertEquals('New', $updated['label']);
    }

    public function testDeleteMenuItemRemovesData(): void
    {
        $menuId = $this->createMenu('test-' . UuidHelper::v4());
        $itemId = $this->repo->saveMenuItem([
            'menu_id'    => $menuId,
            'label'      => 'Delete',
            'sort_order' => 0,
            'status'     => 1,
        ]);

        $this->repo->deleteMenuItem($itemId);

        $deleted = $this->db->query('menu_items')->where(['id' => $itemId])->first();
        $this->assertNull($deleted);
    }
}
