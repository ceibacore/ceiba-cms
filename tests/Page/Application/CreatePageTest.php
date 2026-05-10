<?php
declare(strict_types=1);
namespace LemurCms\Tests\Page\Application;

use LemurCms\Page\Application\CreatePage;
use LemurCms\Page\Domain\PageRepositoryInterface;
use PHPUnit\Framework\TestCase;

class CreatePageTest extends TestCase
{
    public function testExecuteReturnsId(): void
    {
        $repo = $this->createMock(PageRepositoryInterface::class);
        $repo->method('save')->willReturn(10);

        $useCase = new CreatePage($repo);
        $result = $useCase->execute(['title' => 'Test', 'slug' => 'test']);

        $this->assertEquals(10, $result);
    }
}
