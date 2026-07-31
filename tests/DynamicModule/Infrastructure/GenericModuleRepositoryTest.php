<?php
declare(strict_types=1);

namespace LemurCms\Tests\DynamicModule\Infrastructure;

use LemurCms\DynamicModule\Domain\Entity\ModuleDefinition;
use LemurCms\DynamicModule\Domain\Entity\ModuleField;
use LemurCms\DynamicModule\Infrastructure\DynamicTableManager;
use LemurCms\DynamicModule\Infrastructure\GenericModuleRepository;
use LemurCms\Support\Helpers\UuidHelper;
use LemurCms\Tests\TestCase;

class GenericModuleRepositoryTest extends TestCase
{
    private DynamicTableManager $tableManager;
    private GenericModuleRepository $repo;
    private ModuleDefinition $def;
    private string $table;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->tableManager = new DynamicTableManager($this->db);
        $this->repo = new GenericModuleRepository($this->db);
        
        // Let's create a test module definition
        $this->table = 'test_productos';
        
        // Clean up table if it already exists from a crashed run
        $this->dropTestTable();

        // Setup module definitions and modules rows so relations or schema fetching doesn't crash
        $moduleId = UuidHelper::v4();
        $defId = UuidHelper::v4();
        
        $this->db->query('modules')->insert([
            'id' => $moduleId,
            'name' => 'Test Productos',
            'slug' => $this->table,
            'is_active' => 1,
        ]);
        
        $fields = [
            new ModuleField(name: 'name', type: 'text', label: 'Name', required: true),
            new ModuleField(name: 'price', type: 'decimal', label: 'Price', required: true, rules: ['precision' => 10, 'scale' => 2]),
            new ModuleField(name: 'is_featured', type: 'boolean', label: 'Featured', required: false, default: false),
        ];
        
        $this->db->query('module_definitions')->insert([
            'id' => $defId,
            'module_id' => $moduleId,
            'fields_schema' => json_encode(array_map(fn($f) => $f->toArray(), $fields)),
            'icon' => 'box',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        $this->def = new ModuleDefinition(
            id: $defId,
            moduleId: $moduleId,
            moduleName: 'Test Productos',
            moduleSlug: $this->table,
            fields: $fields,
            icon: 'box'
        );

        $this->tableManager->createTable($this->def);
    }

    protected function tearDown(): void
    {
        $this->dropTestTable();
        
        // Clean up mock tables/definitions
        $this->db->query('module_definitions')->where(['id' => $this->def->id])->delete();
        $this->db->query('modules')->where(['id' => $this->def->moduleId])->delete();
        
        parent::tearDown();
    }

    private function dropTestTable(): void
    {
        $prefix = $this->db->getPrefix();
        $fullTable = $prefix . 'cms_' . $this->table;
        try {
            $this->db->pdo()->exec("DROP TABLE IF EXISTS `{$fullTable}`");
        } catch (\Throwable $e) {
            // Ignore
        }
    }

    public function testCreateAndFindById(): void
    {
        $id = UuidHelper::v4();
        $insertedId = $this->repo->create('cms_' . $this->table, [
            'id' => $id,
            'name' => 'Laptop Pro',
            'price' => 1299.99,
            'is_featured' => 1,
        ]);

        $this->assertEquals($id, $insertedId);

        $row = $this->repo->findById('cms_' . $this->table, $id);
        $this->assertNotNull($row);
        $this->assertEquals('Laptop Pro', $row['name']);
        $this->assertEquals(1299.99, (float) $row['price']);
        $this->assertEquals(1, (int) $row['is_featured']);
    }

    public function testListAndCountAndSoftDelete(): void
    {
        $id1 = UuidHelper::v4();
        $id2 = UuidHelper::v4();
        
        $this->repo->create('cms_' . $this->table, [
            'id' => $id1,
            'name' => 'Product A',
            'price' => 10.00,
            'is_featured' => 0,
        ]);

        $this->repo->create('cms_' . $this->table, [
            'id' => $id2,
            'name' => 'Product B',
            'price' => 20.00,
            'is_featured' => 1,
        ]);

        $count = $this->repo->count('cms_' . $this->table);
        $this->assertEquals(2, $count);

        $list = $this->repo->list('cms_' . $this->table);
        $this->assertCount(2, $list);

        // Test filtering by exact match
        $listFeatured = $this->repo->list('cms_' . $this->table, ['is_featured' => 1]);
        $this->assertCount(1, $listFeatured);
        $this->assertEquals('Product B', $listFeatured[0]['name']);

        // Test filtering by search query
        $listSearch = $this->repo->list('cms_' . $this->table, ['search' => 'Product A']);
        $this->assertCount(1, $listSearch);
        $this->assertEquals('Product A', $listSearch[0]['name']);

        // Soft delete one product
        $this->repo->delete('cms_' . $this->table, $id1);

        $countAfterDelete = $this->repo->count('cms_' . $this->table);
        $this->assertEquals(1, $countAfterDelete);

        $listAfterDelete = $this->repo->list('cms_' . $this->table);
        $this->assertCount(1, $listAfterDelete);
        $this->assertEquals('Product B', $listAfterDelete[0]['name']);
    }

    public function testUpdate(): void
    {
        $id = UuidHelper::v4();
        $this->repo->create('cms_' . $this->table, [
            'id' => $id,
            'name' => 'Initial Name',
            'price' => 50.00,
            'is_featured' => 0,
        ]);

        $this->repo->update('cms_' . $this->table, $id, [
            'name' => 'Updated Name',
            'price' => 75.50,
        ]);

        $row = $this->repo->findById('cms_' . $this->table, $id);
        $this->assertNotNull($row);
        $this->assertEquals('Updated Name', $row['name']);
        $this->assertEquals(75.50, (float) $row['price']);
    }
}
