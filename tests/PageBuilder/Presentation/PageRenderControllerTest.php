<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Presentation;

use LemurCms\Http\Controllers\PageRenderController;
use LemurCms\Page\Application\GetPageBySlug;
use LemurCms\Page\Domain\Repository\PageRepositoryInterface;
use LemurCms\PageBuilder\Domain\Service\BladeRendererInterface;
use PHPUnit\Framework\TestCase;

class PageRenderControllerTest extends TestCase
{
    private $pageRepoMock;
    private $bladeRendererMock;
    private PageRenderController $controller;

    protected function setUp(): void
    {
        parent::setUp();
        // Reset response code to 200 for test isolation
        http_response_code(200);

        $this->pageRepoMock = $this->createMock(PageRepositoryInterface::class);
        $this->bladeRendererMock = $this->createMock(BladeRendererInterface::class);

        $getPageBySlug = new GetPageBySlug($this->pageRepoMock);

        $this->controller = new PageRenderController(
            $getPageBySlug,
            $this->bladeRendererMock
        );
    }

    public function testShowReturns404WhenPageNotFound(): void
    {
        $this->pageRepoMock
            ->expects($this->once())
            ->method('findBySlug')
            ->with('nonexistent')
            ->willReturn(null);

        ob_start();
        $this->controller->show('nonexistent');
        $output = ob_get_clean();

        $this->assertEquals(404, http_response_code());
        $this->assertStringContainsString('Page Not Found', $output);
    }

    public function testShowReturns404WhenPageIsDraft(): void
    {
        $page = [
            'id' => 'page-1',
            'title' => 'My Draft Page',
            'slug' => 'my-draft',
            'status' => 'draft',
            'content' => []
        ];

        $this->pageRepoMock
            ->expects($this->once())
            ->method('findBySlug')
            ->with('my-draft')
            ->willReturn($page);

        ob_start();
        $this->controller->show('my-draft');
        $output = ob_get_clean();

        $this->assertEquals(404, http_response_code());
        $this->assertStringContainsString('Page Not Found', $output);
    }

    public function testShowReturns200AndHtmlWhenPageIsPublished(): void
    {
        $page = [
            'id' => 'page-2',
            'title' => 'My Published Page',
            'slug' => 'my-published',
            'status' => 'published',
            'content' => [
                ['type' => 'text', 'props' => ['content' => 'Hello']]
            ]
        ];

        $this->pageRepoMock
            ->expects($this->once())
            ->method('findBySlug')
            ->with('my-published')
            ->willReturn($page);

        $this->bladeRendererMock
            ->expects($this->once())
            ->method('renderPage')
            ->with($page['content'])
            ->willReturn('<p>Hello</p>');

        ob_start();
        $this->controller->show('my-published');
        $output = ob_get_clean();

        $this->assertEquals(200, http_response_code());
        $this->assertEquals('<p>Hello</p>', $output);
    }

    public function testShowReturns500WhenRendererThrowsException(): void
    {
        $page = [
            'id' => 'page-3',
            'title' => 'Broken Page',
            'slug' => 'broken',
            'status' => 'published',
            'content' => []
        ];

        $this->pageRepoMock
            ->expects($this->once())
            ->method('findBySlug')
            ->with('broken')
            ->willReturn($page);

        $this->bladeRendererMock
            ->expects($this->once())
            ->method('renderPage')
            ->willThrowException(new \RuntimeException('Render engine failed'));

        ob_start();
        $this->controller->show('broken');
        $output = ob_get_clean();

        $this->assertEquals(500, http_response_code());
        $this->assertStringContainsString('Error rendering page', $output);
        $this->assertStringContainsString('Render engine failed', $output);
    }
}
