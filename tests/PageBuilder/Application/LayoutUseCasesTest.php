<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Application;

use LemurCms\PageBuilder\Application\CreateLayout;
use LemurCms\PageBuilder\Application\DeleteLayout;
use LemurCms\PageBuilder\Application\GetDefaultLayout;
use LemurCms\PageBuilder\Application\GetLayoutById;
use LemurCms\PageBuilder\Application\ListLayouts;
use LemurCms\PageBuilder\Application\UpdateLayout;
use LemurCms\PageBuilder\Domain\Entity\PageLayout;
use LemurCms\PageBuilder\Domain\Repository\PageLayoutRepositoryInterface;
use LemurCms\Support\Exceptions\InvalidMenuException;
use PHPUnit\Framework\TestCase;

class LayoutUseCasesTest extends TestCase
{
    private PageLayoutRepositoryInterface $repo;

    private PageLayout $sampleLayout;

    protected function setUp(): void
    {
        $this->repo = $this->createMock(PageLayoutRepositoryInterface::class);

        $this->sampleLayout = PageLayout::fromArray([
            'id'   => 'layout-uuid-1',
            'name' => 'Sample',
        ]);
    }

    // ── ListLayouts ─────────────────────────────────────────────────────────

    public function testListLayoutsReturnsAll(): void
    {
        $this->repo->expects($this->once())
            ->method('findAll')
            ->willReturn([$this->sampleLayout]);

        $result = (new ListLayouts($this->repo))->execute();

        $this->assertCount(1, $result);
        $this->assertSame('Sample', $result[0]->name);
    }

    public function testListLayoutsReturnsEmptyArray(): void
    {
        $this->repo->method('findAll')->willReturn([]);

        $result = (new ListLayouts($this->repo))->execute();

        $this->assertSame([], $result);
    }

    // ── GetLayoutById ────────────────────────────────────────────────────────

    public function testGetLayoutByIdReturnsLayout(): void
    {
        $this->repo->expects($this->once())
            ->method('findById')
            ->with('layout-uuid-1')
            ->willReturn($this->sampleLayout);

        $result = (new GetLayoutById($this->repo))->execute('layout-uuid-1');

        $this->assertNotNull($result);
        $this->assertSame('layout-uuid-1', $result->id);
    }

    public function testGetLayoutByIdReturnsNullWhenNotFound(): void
    {
        $this->repo->method('findById')->willReturn(null);

        $result = (new GetLayoutById($this->repo))->execute('nonexistent');

        $this->assertNull($result);
    }

    // ── GetDefaultLayout ─────────────────────────────────────────────────────

    public function testGetDefaultLayoutReturnsFirstActive(): void
    {
        $this->repo->expects($this->once())
            ->method('findDefault')
            ->willReturn($this->sampleLayout);

        $result = (new GetDefaultLayout($this->repo))->execute();

        $this->assertSame('Sample', $result->name);
    }

    public function testGetDefaultLayoutReturnsNullWhenNoneActive(): void
    {
        $this->repo->method('findDefault')->willReturn(null);

        $result = (new GetDefaultLayout($this->repo))->execute();

        $this->assertNull($result);
    }

    // ── CreateLayout ─────────────────────────────────────────────────────────

    public function testCreateLayoutCallsRepoSaveAndReturnsId(): void
    {
        $this->repo->expects($this->once())
            ->method('save')
            ->with($this->arrayHasKey('name'))
            ->willReturn('new-uuid');

        $id = (new CreateLayout($this->repo))->execute(['name' => 'New Layout']);

        $this->assertSame('new-uuid', $id);
    }

    public function testCreateLayoutThrowsOnInvalidData(): void
    {
        $this->repo->expects($this->never())->method('save');

        $this->expectException(InvalidMenuException::class);

        (new CreateLayout($this->repo))->execute(['description' => 'no name']);
    }

    // ── UpdateLayout ─────────────────────────────────────────────────────────

    public function testUpdateLayoutCallsRepoUpdate(): void
    {
        $this->repo->expects($this->once())
            ->method('update')
            ->with('layout-uuid-1', $this->arrayHasKey('name'));

        (new UpdateLayout($this->repo))->execute('layout-uuid-1', ['name' => 'Renamed']);
    }

    public function testUpdateLayoutThrowsOnInvalidData(): void
    {
        $this->repo->expects($this->never())->method('update');

        $this->expectException(InvalidMenuException::class);

        (new UpdateLayout($this->repo))->execute('layout-uuid-1', []);
    }

    // ── DeleteLayout ─────────────────────────────────────────────────────────

    public function testDeleteLayoutCallsRepoDelete(): void
    {
        $this->repo->expects($this->once())
            ->method('delete')
            ->with('layout-uuid-1');

        (new DeleteLayout($this->repo))->execute('layout-uuid-1');
    }
}
