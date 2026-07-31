<?php
declare(strict_types=1);
namespace LemurCms\Tests\Page\Infrastructure;

use LemurCms\Page\Infrastructure\LemurDbPageRepository;
use LemurCms\Support\Helpers\UuidHelper;
use LemurCms\Tests\TestCase;

class LemurDbPageRepositoryTest extends TestCase
{
    private LemurDbPageRepository $repo;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repo = new LemurDbPageRepository($this->db);
    }

    public function testFindBySlugReturnsPublishedPage(): void
    {
        $slug = 'test-page-' . UuidHelper::v4();
        $id = UuidHelper::v4();
        $this->db->query('pages')->insert([
            'id'      => $id,
            'title'   => 'Test Page',
            'slug'    => $slug,
            'content' => json_encode([]),
            'status'  => 'published',
        ]);

        $page = $this->repo->findBySlug($slug);

        $this->assertNotNull($page);
        $this->assertEquals($slug, $page['slug']);
    }

    public function testFindBySlugReturnsNullForDraft(): void
    {
        $slug = 'draft-page-' . UuidHelper::v4();
        $id = UuidHelper::v4();
        $this->db->query('pages')->insert([
            'id'      => $id,
            'title'   => 'Draft Page',
            'slug'    => $slug,
            'content' => json_encode([]),
            'status'  => 'draft',
        ]);

        $page = $this->repo->findBySlug($slug);

        $this->assertNull($page);
    }

    public function testSaveCreatesNewPage(): void
    {
        $slug = 'new-page-' . UuidHelper::v4();
        $id = $this->repo->save([
            'title'   => 'New Page',
            'slug'    => $slug,
            'content' => json_encode([]),
            'status'  => 'draft',
        ]);

        $this->assertIsString($id);
        $this->assertNotEmpty($id);
    }

    public function testSaveUpdatesExistingPage(): void
    {
        $slug = 'update-page-' . UuidHelper::v4();
        $id = $this->repo->save([
            'title'   => 'Old Title',
            'slug'    => $slug,
            'content' => json_encode([]),
            'status'  => 'draft',
        ]);

        $this->repo->save([
            'id'     => $id,
            'title'  => 'New Title',
            'slug'   => $slug,
            'status' => 'draft',
        ]);

        $page = $this->repo->findById($id);
        $this->assertEquals('New Title', $page['title']);
    }

    public function testFindPublishedReturnsPaginatedResults(): void
    {
        $slug = 'page-pub-' . UuidHelper::v4();
        $id = UuidHelper::v4();
        $this->db->query('pages')->insert([
            'id'         => $id,
            'title'      => 'Page 1',
            'slug'       => $slug,
            'content'    => json_encode([]),
            'status'     => 'published',
            'sort_order' => 1,
        ]);

        $pages = $this->repo->findPublished(10, 0);

        $this->assertIsArray($pages);
        $this->assertGreaterThan(0, count($pages));
    }

    public function testDeleteRemovesPage(): void
    {
        $slug = 'delete-page-' . UuidHelper::v4();
        $id = $this->repo->save([
            'title'  => 'Delete Page',
            'slug'   => $slug,
            'status' => 'draft',
        ]);

        $this->repo->delete($id);

        $deleted = $this->repo->findById($id);
        $this->assertNull($deleted);
    }
}
