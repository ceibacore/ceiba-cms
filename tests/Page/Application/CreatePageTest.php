<?php
declare(strict_types=1);
namespace LemurCms\Tests\Page\Application;

use LemurCms\Page\Application\CreatePage;
use LemurCms\Page\Domain\Repository\PageRepositoryInterface;
use PHPUnit\Framework\TestCase;

class CreatePageTest extends TestCase
{
    public function testExecuteReturnsId(): void
    {
        $repo = $this->createMock(PageRepositoryInterface::class);
        $repo->method('save')->willReturn('test-uuid-1234');

        $useCase = new CreatePage($repo);
        $result = $useCase->execute(['title' => 'Test', 'slug' => 'test']);

        $this->assertIsString($result);
        $this->assertNotEmpty($result);
    }
}
