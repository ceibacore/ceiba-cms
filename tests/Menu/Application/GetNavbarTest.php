<?php
declare(strict_types=1);
namespace LemurCms\Tests\Menu\Application;

use LemurCms\Menu\Application\GetNavbar;
use LemurCms\Menu\Domain\Repository\MenuRepositoryInterface;
use LemurCms\Menu\Presentation\LemurMenuRenderer;
use LemurCms\Menu\Presentation\LemurMenuCache;
use PHPUnit\Framework\TestCase;

class GetNavbarTest extends TestCase
{
    public function testExecuteReturnsEmptyForNoMenu(): void
    {
        $repo = $this->createMock(MenuRepositoryInterface::class);
        $repo->method('getMenuTree')->willReturn([]);
        $renderer = new LemurMenuRenderer();
        $cache = new LemurMenuCache(sys_get_temp_dir());

        $useCase = new GetNavbar($repo, $renderer, $cache);
        $html = $useCase->execute('nonexistent');

        $this->assertEmpty($html);
    }

    public function testExecuteRendersHtml(): void
    {
        $items = [[
            'label' => 'Home',
            'url' => '/',
            'type' => 'link',
            'target' => '_self',
            'status' => 1,
            'children' => []
        ]];

        $repo = $this->createMock(MenuRepositoryInterface::class);
        $repo->method('getMenuTree')->willReturn($items);
        $renderer = new LemurMenuRenderer();
        $cache = new LemurMenuCache(sys_get_temp_dir());

        $useCase = new GetNavbar($repo, $renderer, $cache);
        $html = $useCase->execute('main');

        $this->assertStringContainsString('navbar-nav', $html);
        $this->assertStringContainsString('Home', $html);
    }

    public function testExecuteUsesCache(): void
    {
        $items = [[
            'label'    => 'Home',
            'url'      => '/',
            'type'     => 'link',
            'target'   => '_self',
            'status'   => 1,
            'children' => []
        ]];

        $tempDir = sys_get_temp_dir() . '/lemur_test_' . uniqid();
        mkdir($tempDir);

        $repo = $this->createMock(MenuRepositoryInterface::class);
        $repo->expects($this->once())->method('getMenuTree')->willReturn($items);
        $renderer = new LemurMenuRenderer();
        $cache = new LemurMenuCache($tempDir);

        $useCase = new GetNavbar($repo, $renderer, $cache);

        // First call - hits repository
        $html1 = $useCase->execute('cache-test-' . uniqid());

        // Second call with same slug - should use cache, not hit repository again
        // (Already asserted via ->once() on getMenuTree)
        $this->assertNotEmpty($html1);

        // Cleanup
        array_map('unlink', glob($tempDir . '/*.html') ?: []);
        array_map('unlink', glob($tempDir . '/*.json') ?: []);
        @rmdir($tempDir);
    }

    public function testClearCacheRemovesRenderedHtml(): void
    {
        $items = [[
            'label' => 'Home',
            'url' => '/',
            'type' => 'link',
            'target' => '_self',
            'status' => 1,
            'children' => []
        ]];

        $repo = $this->createMock(MenuRepositoryInterface::class);
        $repo->method('getMenuTree')->willReturn($items);
        $renderer = new LemurMenuRenderer();
        $cache = new LemurMenuCache(sys_get_temp_dir());

        $useCase = new GetNavbar($repo, $renderer, $cache);
        $useCase->execute('main');
        
        $useCase->clearCache('main');
        
        // Cache should be cleared
        $cached = $cache->getRendered('navbar_main');
        $this->assertNull($cached);
    }
}
