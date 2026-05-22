<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Infrastructure;

use LemurCms\PageBuilder\Domain\Entity\PageLayout;
use LemurCms\PageBuilder\Infrastructure\LemurDbPageLayoutRepository;
use LemurCms\Tests\TestCase;

class LemurDbPageLayoutRepositoryTest extends TestCase
{
    private LemurDbPageLayoutRepository $repo;

    /** @var string[] IDs created during this test run, cleaned up in tearDown */
    private array $createdIds = [];

    protected function setUp(): void
    {
        parent::setUp();
        $this->repo = new LemurDbPageLayoutRepository($this->db);
    }

    protected function tearDown(): void
    {
        foreach ($this->createdIds as $id) {
            try {
                $this->repo->delete($id);
            } catch (\Throwable) {
                // ignore
            }
        }
        parent::tearDown();
    }

    private function save(array $overrides = []): string
    {
        $id = $this->repo->save(array_merge([
            'name'               => 'Test Layout ' . uniqid(),
            'description'        => 'Auto-generated',
            'menu_slug'          => 'test-menu',
            'footer_tree'        => [['type' => 'container', 'children' => []]],
            'palette'            => ['--bs-primary' => '#111'],
            'use_system_palette' => false,
            'is_active'          => true,
        ], $overrides));

        $this->createdIds[] = $id;
        return $id;
    }

    // ── save & findById ───────────────────────────────────────────────────────

    public function testSaveAndFindById(): void
    {
        $id = $this->save(['name' => 'Repo Test Layout']);

        $layout = $this->repo->findById($id);

        $this->assertInstanceOf(PageLayout::class, $layout);
        $this->assertSame($id, $layout->id);
        $this->assertSame('Repo Test Layout', $layout->name);
        $this->assertSame('test-menu', $layout->menuSlug);
        $this->assertFalse($layout->useSystemPalette);
        $this->assertSame(['--bs-primary' => '#111'], $layout->palette);
        $this->assertCount(1, $layout->footerTree);
    }

    public function testFindByIdReturnsNullForMissing(): void
    {
        $this->assertNull($this->repo->findById('nonexistent-id'));
    }

    // ── update ────────────────────────────────────────────────────────────────

    public function testUpdate(): void
    {
        $id = $this->save();

        $this->repo->update($id, [
            'name'               => 'Updated Name',
            'use_system_palette' => true,
            'is_active'          => false,
        ]);

        $layout = $this->repo->findById($id);

        $this->assertNotNull($layout);
        $this->assertSame('Updated Name', $layout->name);
        $this->assertTrue($layout->useSystemPalette);
        $this->assertFalse($layout->isActive);
    }

    // ── findAll ───────────────────────────────────────────────────────────────

    public function testFindAllReturnsOnlyActiveLayouts(): void
    {
        $activeId   = $this->save(['is_active' => true,  'name' => 'Active Layout']);
        $inactiveId = $this->save(['is_active' => false, 'name' => 'Inactive Layout']);

        $all = $this->repo->findAll();
        $ids = array_map(fn($l) => $l->id, $all);

        $this->assertContains($activeId, $ids);
        $this->assertNotContains($inactiveId, $ids);
    }

    public function testFindAllReturnsSortedByName(): void
    {
        $idZ = $this->save(['name' => 'ZZZ Layout', 'is_active' => true]);
        $idA = $this->save(['name' => 'AAA Layout', 'is_active' => true]);

        $all  = $this->repo->findAll();
        $names = array_map(fn($l) => $l->name, $all);

        $idxA = array_search('AAA Layout', $names);
        $idxZ = array_search('ZZZ Layout', $names);

        $this->assertNotFalse($idxA);
        $this->assertNotFalse($idxZ);
        $this->assertLessThan($idxZ, $idxA, 'AAA should appear before ZZZ');
    }

    // ── findDefault ───────────────────────────────────────────────────────────

    public function testFindDefaultReturnsAnActiveLayout(): void
    {
        $this->save(['is_active' => true, 'name' => 'Default Candidate']);

        $default = $this->repo->findDefault();

        $this->assertInstanceOf(PageLayout::class, $default);
        $this->assertTrue($default->isActive);
    }

    // ── delete ────────────────────────────────────────────────────────────────

    public function testDelete(): void
    {
        $id = $this->save();

        $this->repo->delete($id);

        // Remove from cleanup list since it's already deleted
        $this->createdIds = array_filter($this->createdIds, fn($i) => $i !== $id);

        $this->assertNull($this->repo->findById($id));
    }

    // ── JSON encoding round-trip ──────────────────────────────────────────────

    public function testFooterTreeRoundtrip(): void
    {
        $tree = [
            ['type' => 'container', 'props' => ['class' => 'footer-wrapper'], 'children' => [
                ['type' => 'text', 'props' => ['content' => '© 2026'], 'children' => []],
            ]],
        ];

        $id = $this->save(['footer_tree' => $tree]);

        $layout = $this->repo->findById($id);

        $this->assertIsArray($layout->footerTree);
        $this->assertCount(1, $layout->footerTree);
        $this->assertSame('container', $layout->footerTree[0]['type']);
    }
}
