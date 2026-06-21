<?php
declare(strict_types=1);
namespace LemurCms\Tests\Menu\Presentation;

use LemurCms\Menu\Presentation\LemurMenuRenderer;
use LemurCms\Menu\Presentation\LemurMenuCache;
use LemurCms\Menu\Presentation\LemurMenuBuilder;
use PHPUnit\Framework\TestCase;

class LemurMenuRendererTest extends TestCase
{
    public function testRenderReturnsEmptyForNoItems(): void
    {
        $renderer = new LemurMenuRenderer();
        $html = $renderer->render([]);
        $this->assertEmpty($html);
    }

    public function testRenderGeneratesNavbarUl(): void
    {
        $renderer = new LemurMenuRenderer();
        $items = [['label' => 'Home', 'url' => '/', 'type' => 'link', 'target' => '_self', 'status' => 1]];
        $html = $renderer->render($items);
        
        $this->assertStringContainsString('<ul class="navbar-nav">', $html);
        $this->assertStringContainsString('</ul>', $html);
    }

    public function testRenderIncludesLink(): void
    {
        $renderer = new LemurMenuRenderer();
        $items = [['label' => 'Home', 'url' => '/', 'type' => 'link', 'target' => '_self', 'status' => 1, 'children' => []]];
        $html = $renderer->render($items);
        
        $this->assertStringContainsString('href="/"', $html);
        $this->assertStringContainsString('Home', $html);
    }

    public function testRenderHighlightsActiveLink(): void
    {
        $renderer = new LemurMenuRenderer('/about');
        $items = [['label' => 'About', 'url' => '/about', 'type' => 'link', 'target' => '_self', 'status' => 1, 'children' => []]];
        $html = $renderer->render($items);
        
        $this->assertStringContainsString('active', $html);
    }

    public function testRenderDropdown(): void
    {
        $renderer = new LemurMenuRenderer();
        $items = [[
            'label' => 'Services',
            'url' => '#',
            'type' => 'dropdown',
            'target' => '_self',
            'status' => 1,
            'children' => [
                ['label' => 'Web Design', 'url' => '/web-design', 'type' => 'link', 'target' => '_self', 'status' => 1],
            ]
        ]];
        $html = $renderer->render($items);
        
        $this->assertStringContainsString('dropdown', $html);
        $this->assertStringContainsString('dropdown-menu', $html);
    }

    public function testRenderIcon(): void
    {
        $renderer = new LemurMenuRenderer();
        $items = [[
            'label' => 'Home',
            'url' => '/',
            'type' => 'link',
            'target' => '_self',
            'status' => 1,
            'icon' => 'bi bi-house',
            'children' => []
        ]];
        $html = $renderer->render($items);
        
        $this->assertStringContainsString('bi bi-house', $html);
    }
}

class LemurMenuCacheTest extends TestCase
{
    private string $tempDir;
    private LemurMenuCache $cache;

    protected function setUp(): void
    {
        $this->tempDir = sys_get_temp_dir() . '/lemur_menu_cache_' . uniqid();
        mkdir($this->tempDir);
        $this->cache = new LemurMenuCache($this->tempDir, 3600);
    }

    protected function tearDown(): void
    {
        $files = glob($this->tempDir . '/*.json');
        foreach ($files as $file) @unlink($file);
        @rmdir($this->tempDir);
    }

    public function testSetAndGetData(): void
    {
        $data = ['label' => 'Home', 'url' => '/'];
        $this->cache->set('test_menu', $data);
        
        $cached = $this->cache->get('test_menu');
        $this->assertEquals($data, $cached);
    }

    public function testGetReturnsNullForMissing(): void
    {
        $cached = $this->cache->get('nonexistent');
        $this->assertNull($cached);
    }

    public function testForgetRemovesData(): void
    {
        $this->cache->set('test', ['data' => 'value']);
        $this->cache->forget('test');
        
        $cached = $this->cache->get('test');
        $this->assertNull($cached);
    }

    public function testSetAndGetRenderedHtml(): void
    {
        $html = '<ul class="navbar-nav"><li>Home</li></ul>';
        $this->cache->setRendered('navbar', $html);
        
        $cached = $this->cache->getRendered('navbar');
        $this->assertEquals($html, $cached);
    }
}

class LemurMenuBuilderTest extends TestCase
{
    public function testBuilderCreatesMenu(): void
    {
        $builder = new LemurMenuBuilder();
        $menus = $builder
            ->menu('main', 'Main Menu')
            ->item('/', 'Home')
            ->build();

        $this->assertArrayHasKey('main', $menus);
        $this->assertEquals('Main Menu', $menus['main']['name']);
    }

    public function testBuilderAddsItems(): void
    {
        $builder = new LemurMenuBuilder();
        $menus = $builder
            ->menu('main', 'Main Menu')
            ->item('/', 'Home')
            ->item('/about', 'About')
            ->build();

        $this->assertCount(2, $menus['main']['items']);
    }

    public function testBuilderAddsDropdown(): void
    {
        $builder = new LemurMenuBuilder();
        $menus = $builder
            ->menu('main', 'Main Menu')
            ->dropdown('Services', [
                ['url' => '/design', 'label' => 'Design'],
                ['url' => '/dev', 'label' => 'Development'],
            ])
            ->build();

        $this->assertEquals('dropdown', $menus['main']['items'][0]['type']);
        $this->assertCount(2, $menus['main']['items'][0]['children']);
    }

    public function testBuilderThrowsIfNoMenu(): void
    {
        $this->expectException(\LogicException::class);
        
        $builder = new LemurMenuBuilder();
        $builder->item('/', 'Home')->build();
    }
}

// Alias class to satisfy PHPUnit file discovery
class MenuPresentationTest extends \PHPUnit\Framework\TestCase {
    public function test_dummy(): void
    {
        $this->assertTrue(true);
    }
}
