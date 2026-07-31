<?php
declare(strict_types=1);

namespace LemurCms\Tests\Routing\Infrastructure;

use LemurCms\Routing\Infrastructure\LemurDbReservedPathRepository;
use LemurCms\Tests\TestCase;

class LemurDbReservedPathRepositoryTest extends TestCase
{
    private LemurDbReservedPathRepository $repo;

    /** @var string[] */
    private array $createdIds = [];

    protected function setUp(): void
    {
        parent::setUp();
        $this->repo = new LemurDbReservedPathRepository($this->db);
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

    private function insert(string $path, string $reason = 'test'): string
    {
        $id = $this->repo->save(['path' => $path, 'reason' => $reason]);
        $this->createdIds[] = $id;
        return $id;
    }

    // ── save & findById ───────────────────────────────────────────────────────

    public function testSaveAndFindById(): void
    {
        $id = $this->insert('test/private', 'Integration test');

        $row = $this->repo->findById($id);

        $this->assertNotNull($row);
        $this->assertSame($id, $row['id']);
        $this->assertSame('test/private', $row['path']);
        $this->assertSame('Integration test', $row['reason']);
    }

    public function testFindByIdReturnsNullForMissing(): void
    {
        $this->assertNull($this->repo->findById('nonexistent-uuid'));
    }

    // ── findByPath ────────────────────────────────────────────────────────────

    public function testFindByPath(): void
    {
        $id = $this->insert('reserved/test-path');

        $row = $this->repo->findByPath('reserved/test-path');

        $this->assertNotNull($row);
        $this->assertSame($id, $row['id']);
    }

    public function testFindByPathReturnsNullWhenNotFound(): void
    {
        $this->assertNull($this->repo->findByPath('path/that/does/not/exist-' . uniqid()));
    }

    // ── findAll ───────────────────────────────────────────────────────────────

    public function testFindAllReturnsSortedByPath(): void
    {
        $this->insert('zzz-path');
        $this->insert('aaa-path');

        $all   = $this->repo->findAll();
        $paths = array_column($all, 'path');

        $idxA = array_search('aaa-path', $paths);
        $idxZ = array_search('zzz-path', $paths);

        $this->assertNotFalse($idxA);
        $this->assertNotFalse($idxZ);
        $this->assertLessThan($idxZ, $idxA, 'aaa-path should sort before zzz-path');
    }

    // ── delete ────────────────────────────────────────────────────────────────

    public function testDelete(): void
    {
        $id = $this->insert('path/to/delete');

        $this->repo->delete($id);
        $this->createdIds = array_filter($this->createdIds, fn($i) => $i !== $id);

        $this->assertNull($this->repo->findById($id));
    }

    // ── deleteByPath ──────────────────────────────────────────────────────────

    public function testDeleteByPath(): void
    {
        $path = 'path/delete-by-path-' . uniqid();
        $id   = $this->insert($path);

        $this->repo->deleteByPath($path);
        $this->createdIds = array_filter($this->createdIds, fn($i) => $i !== $id);

        $this->assertNull($this->repo->findByPath($path));
    }

    // ── duplicate path returns same ID from AddReservedPath use case ──────────
    // (The repo itself does not deduplicate — that's the use case's responsibility)
    // We only test that a unique constraint / findByPath works.

    public function testSaveSamePathTwiceWouldCreateTwoRows(): void
    {
        // NOTE: The DB has a UNIQUE constraint on `path`, so the second insert
        // should throw (or at minimum, findByPath returns one result).
        $path = 'test/unique-path-' . uniqid();
        $id1  = $this->insert($path);

        $this->expectException(\Throwable::class);
        $this->insert($path); // Should violate UNIQUE constraint
    }
}
