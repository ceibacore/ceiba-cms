<?php
declare(strict_types=1);
namespace LemurCms\Tests\Page\Application;

use LemurCms\Page\Application\PublishPage;
use LemurCms\Page\Domain\PageRepositoryInterface;
use PHPUnit\Framework\TestCase;

class PublishPageTest extends TestCase
{
    public function testExecutePublishesPage(): void
    {
        $page = ['id' => 1, 'title' => 'Test', 'status' => 'draft'];
        
        $repo = $this->createMock(PageRepositoryInterface::class);
        $repo->method('findById')->willReturn($page);
        $repo->expects($this->once())->method('save')->with(
            $this->callback(fn($data) => $data['status'] === 'published' && isset($data['published_at']))
        );

        $useCase = new PublishPage($repo);
        $useCase->execute(1);
    }
}
