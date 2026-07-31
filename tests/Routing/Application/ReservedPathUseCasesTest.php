<?php
declare(strict_types=1);

namespace LemurCms\Tests\Routing\Application;

use LemurCms\Routing\Application\AddReservedPath;
use LemurCms\Routing\Application\ListReservedPaths;
use LemurCms\Routing\Application\RemoveReservedPath;
use LemurCms\Routing\Domain\Repository\ReservedPathRepositoryInterface;
use PHPUnit\Framework\TestCase;

class ReservedPathUseCasesTest extends TestCase
{
    private ReservedPathRepositoryInterface $repo;

    protected function setUp(): void
    {
        $this->repo = $this->createMock(ReservedPathRepositoryInterface::class);
    }

    // ── ListReservedPaths ────────────────────────────────────────────────────

    public function testListReturnsAllFromRepo(): void
    {
        $entries = [
            ['id' => 'a', 'path' => 'blog/private', 'reason' => 'Locked'],
            ['id' => 'b', 'path' => 'members',       'reason' => null],
        ];

        $this->repo->expects($this->once())
            ->method('findAll')
            ->willReturn($entries);

        $result = (new ListReservedPaths($this->repo))->execute();

        $this->assertCount(2, $result);
        $this->assertSame('blog/private', $result[0]['path']);
    }

    // ── AddReservedPath ──────────────────────────────────────────────────────

    public function testAddSavesNormalisedPath(): void
    {
        $this->repo->method('findByPath')->willReturn(null);

        $this->repo->expects($this->once())
            ->method('save')
            ->with($this->callback(function ($data) {
                return $data['path'] === 'private/section' && $data['reason'] === 'test';
            }))
            ->willReturn('new-uuid');

        $id = (new AddReservedPath($this->repo))->execute('/private/section', 'test');

        $this->assertSame('new-uuid', $id);
    }

    public function testAddStripsLeadingSlash(): void
    {
        $this->repo->method('findByPath')->willReturn(null);

        $this->repo->expects($this->once())
            ->method('save')
            ->with($this->arrayHasKey('path'))
            ->willReturnCallback(function ($data) {
                $this->assertSame('already/clean', $data['path']);
                return 'uuid';
            });

        (new AddReservedPath($this->repo))->execute('already/clean');
    }

    public function testAddDeduplicatesExistingPath(): void
    {
        $existing = ['id' => 'existing-id', 'path' => 'dupe', 'reason' => ''];

        $this->repo->expects($this->once())
            ->method('findByPath')
            ->with('dupe')
            ->willReturn($existing);

        $this->repo->expects($this->never())->method('save');

        $id = (new AddReservedPath($this->repo))->execute('dupe');

        $this->assertSame('existing-id', $id);
    }

    public function testAddThrowsOnEmptyPath(): void
    {
        $this->repo->expects($this->never())->method('save');

        $this->expectException(\InvalidArgumentException::class);

        (new AddReservedPath($this->repo))->execute('');
    }

    public function testAddThrowsOnSlashOnlyPath(): void
    {
        $this->repo->expects($this->never())->method('save');

        $this->expectException(\InvalidArgumentException::class);

        (new AddReservedPath($this->repo))->execute('/');
    }

    // ── RemoveReservedPath ───────────────────────────────────────────────────

    public function testRemoveCallsRepoDelete(): void
    {
        $this->repo->expects($this->once())
            ->method('delete')
            ->with('the-uuid');

        (new RemoveReservedPath($this->repo))->execute('the-uuid');
    }
}
