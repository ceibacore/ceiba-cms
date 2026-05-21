<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Infrastructure;

use LemurCms\PageBuilder\Infrastructure\LemurDbTemplateRepository;
use LemurCms\Support\Helpers\UuidHelper;
use LemurCms\Tests\TestCase;

class LemurDbTemplateRepositoryTest extends TestCase
{
    private LemurDbTemplateRepository $repo;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repo = new LemurDbTemplateRepository($this->db);
    }

    public function testSaveAndFindTemplate(): void
    {
        $id = $this->repo->save([
            'name' => 'Header Section',
            'description' => 'A clean header',
            'tree' => ['id' => '1', 'type' => 'container', 'children' => []],
            'thumbnail' => 'header.png',
            'category' => 'header',
            'is_active' => true,
        ]);

        $this->assertIsString($id);

        $template = $this->repo->findById($id);
        $this->assertNotNull($template);
        $this->assertEquals('Header Section', $template['name']);
        $this->assertEquals('header', $template['category']);
        $this->assertTrue($template['is_active']);
        $this->assertIsArray($template['tree']);
        $this->assertEquals('container', $template['tree']['type']);

        // Update
        $this->repo->save([
            'id' => $id,
            'name' => 'Updated Header Section',
            'is_active' => false,
        ]);

        $updated = $this->repo->findById($id);
        $this->assertEquals('Updated Header Section', $updated['name']);
        $this->assertFalse($updated['is_active']);

        // Find all
        $all = $this->repo->findAll();
        $this->assertGreaterThanOrEqual(1, count($all));

        // Find by category
        $byCat = $this->repo->findByCategory('header');
        $this->assertGreaterThanOrEqual(1, count($byCat));

        // Delete
        $this->repo->delete($id);
        $deleted = $this->repo->findById($id);
        $this->assertNull($deleted);
    }
}
