<?php
declare(strict_types=1);
namespace CeibaCms\Tests\Seo\Infrastructure;

use CeibaCms\Seo\Infrastructure\CeibaDbSeoRepository;
use CeibaCms\Support\Helpers\UuidHelper;
use CeibaCms\Tests\TestCase;

class CeibaDbSeoRepositoryTest extends TestCase
{
    private CeibaDbSeoRepository $repo;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repo = new CeibaDbSeoRepository($this->db);
    }

    public function testFindByEntityReturnsData(): void
    {
        $entityId = rand(1000, 9999);
        $this->repo->upsert('page', $entityId, [
            'meta_title'       => 'Test Title',
            'meta_description' => 'Test Description',
        ]);

        $seo = $this->repo->findByEntity('page', $entityId);

        $this->assertNotNull($seo);
        $this->assertEquals('Test Title', $seo['meta_title']);
    }

    public function testFindByEntityReturnsNullForMissing(): void
    {
        $seo = $this->repo->findByEntity('page', 99999999);
        $this->assertNull($seo);
    }

    public function testUpsertCreatesNewEntry(): void
    {
        $entityId = rand(1000, 9999);
        $this->repo->upsert('product', $entityId, [
            'meta_title' => 'Product Title',
            'robots'     => 'index,follow',
        ]);

        $seo = $this->repo->findByEntity('product', $entityId);
        $this->assertNotNull($seo);
        $this->assertEquals('Product Title', $seo['meta_title']);
    }

    public function testUpsertUpdatesExistingEntry(): void
    {
        $entityId = rand(1000, 9999);
        $this->repo->upsert('page', $entityId, ['meta_title' => 'Old Title']);
        $this->repo->upsert('page', $entityId, ['meta_title' => 'New Title']);

        $seo = $this->repo->findByEntity('page', $entityId);
        $this->assertEquals('New Title', $seo['meta_title']);
    }
}
