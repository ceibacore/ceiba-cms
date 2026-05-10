<?php
declare(strict_types=1);
namespace LemurCms\Tests\Seo\Infrastructure;

use LemurCms\Seo\Infrastructure\LemurDbSeoRepository;
use PHPUnit\Framework\TestCase;

class LemurDbSeoRepositoryTest extends TestCase
{
    private \LemurDB $db;
    private LemurDbSeoRepository $repo;

    protected function setUp(): void
    {
        $this->db = new \LemurDB('localhost', 'cms_test', 'root', '', 'cms_');
        $this->repo = new LemurDbSeoRepository($this->db);
    }

    public function testFindByEntityReturnsData(): void
    {
        $this->db->query('seo')->insert([
            'entity_type' => 'page',
            'entity_id' => 1,
            'meta_title' => 'Test Title',
            'meta_description' => 'Test Description',
        ]);

        $seo = $this->repo->findByEntity('page', 1);
        
        $this->assertNotNull($seo);
        $this->assertEquals('Test Title', $seo['meta_title']);
    }

    public function testFindByEntityReturnsNullForMissing(): void
    {
        $seo = $this->repo->findByEntity('page', 999);
        $this->assertNull($seo);
    }

    public function testUpsertCreatesNewEntry(): void
    {
        $this->repo->upsert('product', 5, [
            'meta_title' => 'Product Title',
            'robots' => 'index,follow',
        ]);

        $seo = $this->repo->findByEntity('product', 5);
        $this->assertNotNull($seo);
        $this->assertEquals('Product Title', $seo['meta_title']);
    }

    public function testUpsertUpdatesExistingEntry(): void
    {
        $this->repo->upsert('page', 2, ['meta_title' => 'Old Title']);
        $this->repo->upsert('page', 2, ['meta_title' => 'New Title']);

        $seo = $this->repo->findByEntity('page', 2);
        $this->assertEquals('New Title', $seo['meta_title']);
    }
}
