<?php
declare(strict_types=1);
namespace LemurCms\Tests\Page\Infrastructure;

use LemurCms\Page\Infrastructure\LemurDbPageRepository;
use PHPUnit\Framework\TestCase;

class LemurDbPageRepositoryTest extends TestCase
{
    private \LemurDB $db;
    private LemurDbPageRepository $repo;

    protected function setUp(): void
    {
        $this->db = new \LemurDB('localhost', 'cms_test', 'root', '', 'cms_');
        $this->repo = new LemurDbPageRepository($this->db);
    }

    public function testFindBySlugReturnsPublishedPage(): void
    {
        $this->db->query('pages')->insert([
            'title' => 'Test Page',
            'slug' => 'test-page',
            'content' => json_encode([]),
            'status' => 'published',
        ]);

        $page = $this->repo->findBySlug('test-page');
        
        $this->assertNotNull($page);
        $this->assertEquals('test-page', $page['slug']);
    }

    public function testFindBySlugReturnsNullForDraft(): void
    {
        $this->db->query('pages')->insert([
            'title' => 'Draft Page',
            'slug' => 'draft-page',
            'content' => json_encode([]),
            'status' => 'draft',
        ]);

        $page = $this->repo->findBySlug('draft-page');
        
        $this->assertNull($page);
    }

    public function testSaveCreatesNewPage(): void
    {
        $id = $this->repo->save([
            'title' => 'New Page',
            'slug' => 'new-page',
            'content' => json_encode([]),
            'status' => 'draft',
        ]);

        $this->assertIsInt($id);
        $this->assertGreaterThan(0, $id);
    }

    public function testSaveUpdatesExistingPage(): void
    {
        $id = $this->repo->save([
            'title' => 'Old Title',
            'slug' => 'update-page',
            'content' => json_encode([]),
            'status' => 'draft',
        ]);

        $this->repo->save([
            'id' => $id,
            'title' => 'New Title',
            'slug' => 'update-page',
            'status' => 'draft',
        ]);

        $page = $this->repo->findById($id);
        $this->assertEquals('New Title', $page['title']);
    }

    public function testFindPublishedReturnsPaginatedResults(): void
    {
        $this->db->query('pages')->insert([
            'title' => 'Page 1',
            'slug' => 'page-1',
            'content' => json_encode([]),
            'status' => 'published',
            'sort_order' => 1,
        ]);

        $pages = $this->repo->findPublished(10, 0);
        
        $this->assertIsArray($pages);
        $this->assertGreaterThan(0, count($pages));
    }

    public function testDeleteRemovesPage(): void
    {
        $id = $this->repo->save([
            'title' => 'Delete Page',
            'slug' => 'delete-page',
            'status' => 'draft',
        ]);

        $this->repo->delete($id);

        $deleted = $this->repo->findById($id);
        $this->assertNull($deleted);
    }
}
