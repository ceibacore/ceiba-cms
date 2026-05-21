<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Infrastructure;

use LemurCms\PageBuilder\Domain\Entity\ComponentDefinition;
use LemurCms\PageBuilder\Infrastructure\LemurDbComponentDefinitionRepository;
use LemurCms\Support\Helpers\UuidHelper;
use LemurCms\Tests\TestCase;

class LemurDbComponentDefinitionRepositoryTest extends TestCase
{
    private LemurDbComponentDefinitionRepository $repo;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repo = new LemurDbComponentDefinitionRepository($this->db);
    }

    public function testSaveAndFindComponentDefinition(): void
    {
        $type = 'custom-btn-' . UuidHelper::v4();
        $definition = new ComponentDefinition(
            id: '',
            type: $type,
            label: 'Custom Button',
            category: 'interactive',
            icon: 'button-icon',
            defaultProps: ['color' => 'blue'],
            schema: ['color' => 'string'],
            isContainer: false,
            acceptsLoop: true
        );

        $id = $this->repo->save($definition);
        $this->assertIsString($id);

        $found = $this->repo->findByType($type);
        $this->assertNotNull($found);
        $this->assertEquals($type, $found->type);
        $this->assertEquals('Custom Button', $found->label);
        $this->assertEquals('interactive', $found->category);
        $this->assertEquals(['color' => 'blue'], $found->defaultProps);
        $this->assertEquals(['color' => 'string'], $found->schema);
        $this->assertFalse($found->isContainer);
        $this->assertTrue($found->acceptsLoop);

        // Find all
        $all = $this->repo->findAll();
        $this->assertGreaterThanOrEqual(1, count($all));

        // Find by category
        $byCat = $this->repo->findByCategory('interactive');
        $this->assertGreaterThanOrEqual(1, count($byCat));

        // Delete
        $this->repo->delete($id);
        $deleted = $this->repo->findByType($type);
        $this->assertNull($deleted);
    }
}
