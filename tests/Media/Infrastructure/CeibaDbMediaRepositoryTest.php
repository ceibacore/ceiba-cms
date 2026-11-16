<?php
declare(strict_types=1);
namespace CeibaCms\Tests\Media\Infrastructure;

use CeibaCms\Media\Infrastructure\CeibaDbMediaRepository;
use CeibaCms\Support\Helpers\UuidHelper;
use CeibaCms\Tests\TestCase;

class CeibaDbMediaRepositoryTest extends TestCase
{
    private CeibaDbMediaRepository $repo;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repo = new CeibaDbMediaRepository($this->db);
    }

    public function testFindByIdReturnsMedia(): void
    {
        $id = $this->repo->store([
            'disk'      => 'local',
            'path'      => '/uploads',
            'filename'  => 'test.jpg',
            'mime_type' => 'image/jpeg',
            'size'      => 1024,
        ]);

        $media = $this->repo->findById($id);

        $this->assertNotNull($media);
        $this->assertEquals('test.jpg', $media['filename']);
    }

    public function testStoreCreatesNewMedia(): void
    {
        $id = $this->repo->store([
            'disk'      => 'local',
            'path'      => '/uploads',
            'filename'  => 'new.png',
            'mime_type' => 'image/png',
            'size'      => 2048,
            'alt_text'  => 'Test Image',
        ]);

        $this->assertIsString($id);
        $this->assertNotEmpty($id);
    }

    public function testFindAllReturnsPaginatedResults(): void
    {
        $this->repo->store([
            'disk'      => 'local',
            'path'      => '/uploads',
            'filename'  => 'file1.jpg',
            'mime_type' => 'image/jpeg',
            'size'      => 1024,
        ]);

        $media = $this->repo->findAll(10, 0);

        $this->assertIsArray($media);
    }

    public function testDeleteRemovesMedia(): void
    {
        $id = $this->repo->store([
            'disk'      => 'local',
            'path'      => '/uploads',
            'filename'  => 'delete.jpg',
            'mime_type' => 'image/jpeg',
            'size'      => 1024,
        ]);

        $this->repo->delete($id);

        $deleted = $this->repo->findById($id);
        $this->assertNull($deleted);
    }
}
