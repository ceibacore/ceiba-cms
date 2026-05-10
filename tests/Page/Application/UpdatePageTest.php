<?php
declare(strict_types=1);
namespace LemurCms\Tests\Page\Application;

use LemurCms\Page\Application\UpdatePage;
use LemurCms\Page\Domain\PageRepositoryInterface;
use PHPUnit\Framework\TestCase;

class UpdatePageTest extends TestCase
{
    public function testExecuteUpdatesExistingPage(): void
    {
        $repo = $this->createMock(PageRepositoryInterface::class);
        $repo->method('findById')->willReturn(['id' => 1, 'title' => 'Old']);
        $repo->expects($this->once())->method('save');

        $useCase = new UpdatePage($repo);
        $useCase->execute(1, ['title' => 'New']);
    }

    public function testExecuteDoesNothingForMissingPage(): void
    {
        $repo = $this->createMock(PageRepositoryInterface::class);
        $repo->method('findById')->willReturn(null);
        $repo->expects($this->never())->method('save');

        $useCase = new UpdatePage($repo);
        $useCase->execute(999, ['title' => 'Test']);
    }
}
