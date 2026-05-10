<?php
declare(strict_types=1);
namespace LemurCms\Tests\Media\Infrastructure;

use LemurCms\Media\Infrastructure\LemurDbMediaRepository;
use PHPUnit\Framework\TestCase;

class LemurDbMediaRepositoryTest extends TestCase
{
    private \LemurDB $db;
    private LemurDbMediaRepository $repo;

    protected function setUp(): void
    {
        $this->db = new \LemurDB('localhost', 'cms_test', 'root', '', 'cms_');
        $this->repo = new LemurDbMediaRepository($this->db);
    }

    public function testFindByIdReturnsMedia(): void
    {
        $id = $this->db->query('media')->insert([
            'disk' => 'local',
            'path' => '/uploads',
            'filename' => 'test.jpg',
            'mime_type' => 'image/jpeg',
            'size' => 1024,
        ]);

        $media = $this->repo->findById($id);
        
        $this->assertNotNull($media);
        $this->assertEquals('test.jpg', $media['filename']);
    }

    public function testStoreCreatesNewMedia(): void
    {
        $id = $this->repo->store([
            'disk' => 'local',
            'path' => '/uploads',
            'filename' => 'new.png',
            'mime_type' => 'image/png',
            'size' => 2048,
            'alt_text' => 'Test Image',
        ]);

        $this->assertIsInt($id);
        $this->assertGreaterThan(0, $id);
    }

    public function testFindAllReturnsPaginatedResults(): void
    {
        $this->db->query('media')->insert([
            'disk' => 'local',
            'path' => '/uploads',
            'filename' => 'file1.jpg',
            'mime_type' => 'image/jpeg',
            'size' => 1024,
        ]);

        $media = $this->repo->findAll(10, 0);
        
        $this->assertIsArray($media);
    }

    public function testDeleteRemovesMedia(): void
    {
        $id = $this->db->query('media')->insert([
            'disk' => 'local',
            'path' => '/uploads',
            'filename' => 'delete.jpg',
            'mime_type' => 'image/jpeg',
            'size' => 1024,
        ]);

        $this->repo->delete($id);

        $deleted = $this->repo->findById($id);
        $this->assertNull($deleted);
    }
}
