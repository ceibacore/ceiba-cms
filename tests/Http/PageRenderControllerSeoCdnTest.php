<?php
declare(strict_types=1);

namespace LemurCms\Tests\Http;

use LemurCms\Http\Controllers\PageRenderController;
use LemurCms\Page\Application\GetPageBySlug;
use LemurCms\Page\Domain\Repository\PageRepositoryInterface;
use LemurCms\PageBuilder\Domain\Service\BladeRendererInterface;
use LemurCms\PageBuilder\Domain\Service\LayoutRenderer;
use LemurCms\PageBuilder\Application\GetLayoutById;
use LemurCms\PageBuilder\Application\GetDefaultLayout;
use LemurCms\Seo\Domain\Repository\SeoRepositoryInterface;
use LemurCms\Settings\Domain\Repository\SettingsRepositoryInterface;
use LemurCms\PageBuilder\Domain\Entity\PageLayout;
use LemurCms\Menu\Application\GetNavbar;
use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\MockObject\MockObject;

class PageRenderControllerSeoCdnTest extends TestCase
{
    /** @var PageRepositoryInterface&MockObject */
    private PageRepositoryInterface $pageRepo;

    /** @var BladeRendererInterface&MockObject */
    private BladeRendererInterface $bladeRenderer;

    /** @var GetLayoutById&MockObject */
    private GetLayoutById $getLayoutById;

    /** @var GetDefaultLayout&MockObject */
    private GetDefaultLayout $getDefaultLayout;

    /** @var GetNavbar&MockObject */
    private GetNavbar $getNavbar;

    /** @var SettingsRepositoryInterface&MockObject */
    private SettingsRepositoryInterface $settingsRepo;

    /** @var SeoRepositoryInterface&MockObject */
    private SeoRepositoryInterface $seoRepo;

    private LayoutRenderer $layoutRenderer;

    protected function setUp(): void
    {
        parent::setUp();
        http_response_code(200);

        $this->pageRepo = $this->createMock(PageRepositoryInterface::class);
        $this->bladeRenderer = $this->createMock(BladeRendererInterface::class);
        $this->getLayoutById = $this->createMock(GetLayoutById::class);
        $this->getDefaultLayout = $this->createMock(GetDefaultLayout::class);
        $this->getNavbar = $this->createMock(GetNavbar::class);
        $this->settingsRepo = $this->createMock(SettingsRepositoryInterface::class);
        $this->seoRepo = $this->createMock(SeoRepositoryInterface::class);
        $this->layoutRenderer = new LayoutRenderer();
    }

    public function testShowRendersDefaultBootstrapCdnWhenLayoutHasNoCdns(): void
    {
        $page = [
            'id'               => 'test-page-id-1',
            'title'            => 'Page Title',
            'meta_description' => 'Page Description',
            'slug'             => 'test-slug',
            'status'           => 'published',
            'content'          => [],
            'layout_id'        => 'layout-1',
        ];

        $layout = PageLayout::fromArray([
            'id'                 => 'layout-1',
            'name'               => 'Default Layout',
            'menu_slug'          => 'main-menu',
            'footer_tree'        => [],
            'palette'            => [],
            'use_system_palette' => true,
            'is_active'          => true,
            'head_cdn'           => null,
            'body_cdn'           => null,
        ]);

        $this->pageRepo->method('findBySlug')->willReturn($page);
        $this->getLayoutById->method('execute')->willReturn($layout);
        $this->bladeRenderer->method('renderPage')->willReturn('<div>Page Content</div>');
        $this->settingsRepo->method('get')->willReturnCallback(function($key, $default = null) {
            if ($key === 'site_language') {
                return 'es';
            }
            return $default;
        });

        $controller = new PageRenderController(
            getPageBySlug:      new GetPageBySlug($this->pageRepo),
            bladeRenderer:      $this->bladeRenderer,
            getLayoutById:      $this->getLayoutById,
            getDefaultLayout:   $this->getDefaultLayout,
            layoutRenderer:      $this->layoutRenderer,
            getNavbar:          $this->getNavbar,
            settingsRepository: $this->settingsRepo,
            seoRepository:      $this->seoRepo
        );

        ob_start();
        $controller->show('test-slug');
        $output = ob_get_clean();

        $this->assertStringContainsString('<html lang="es">', $output);
        // Should contain default Bootstrap stylesheets
        $this->assertStringContainsString('cdn.jsdelivr.net/npm/bootstrap', $output);
        $this->assertStringContainsString('bootstrap.min.css', $output);
        $this->assertStringContainsString('bootstrap.bundle.min.js', $output);
        $this->assertStringContainsString('<div>Page Content</div>', $output);
    }

    public function testShowRendersCustomLayoutCdnsAndLanguage(): void
    {
        $page = [
            'id'               => 'test-page-id-2',
            'title'            => 'Page Title',
            'meta_description' => 'Page Description',
            'slug'             => 'test-slug',
            'status'           => 'published',
            'content'          => [],
            'layout_id'        => 'layout-2',
        ];

        $layout = PageLayout::fromArray([
            'id'                 => 'layout-2',
            'name'               => 'Custom Framework Layout',
            'menu_slug'          => 'main-menu',
            'footer_tree'        => [],
            'palette'            => [],
            'use_system_palette' => true,
            'is_active'          => true,
            'head_cdn'           => '<script src="https://cdn.tailwindcss.com"></script>',
            'body_cdn'           => '<script src="https://unpkg.com/alpinejs" defer></script>',
        ]);

        $this->pageRepo->method('findBySlug')->willReturn($page);
        $this->getLayoutById->method('execute')->willReturn($layout);
        $this->bladeRenderer->method('renderPage')->willReturn('<div>Tailwind Page</div>');
        $this->settingsRepo->method('get')->willReturnCallback(function($key, $default = null) {
            if ($key === 'site_language') {
                return 'en';
            }
            return $default;
        });

        $controller = new PageRenderController(
            getPageBySlug:      new GetPageBySlug($this->pageRepo),
            bladeRenderer:      $this->bladeRenderer,
            getLayoutById:      $this->getLayoutById,
            getDefaultLayout:   $this->getDefaultLayout,
            layoutRenderer:      $this->layoutRenderer,
            getNavbar:          $this->getNavbar,
            settingsRepository: $this->settingsRepo,
            seoRepository:      $this->seoRepo
        );

        ob_start();
        $controller->show('test-slug');
        $output = ob_get_clean();

        $this->assertStringContainsString('<html lang="en">', $output);
        // Should contain custom layout CDNs
        $this->assertStringContainsString('https://cdn.tailwindcss.com', $output);
        $this->assertStringContainsString('https://unpkg.com/alpinejs', $output);
        // Should NOT contain default Bootstrap CDN stylesheet
        $this->assertStringNotContainsString('cdn.jsdelivr.net/npm/bootstrap', $output);
    }

    public function testShowRendersRichPolymorphicSeoMetadata(): void
    {
        $page = [
            'id'               => 'test-page-id-3',
            'title'            => 'Fallback Title',
            'meta_description' => 'Fallback Description',
            'slug'             => 'test-slug',
            'status'           => 'published',
            'content'          => [],
            'layout_id'        => 'layout-3',
        ];

        $layout = PageLayout::fromArray([
            'id'                 => 'layout-3',
            'name'               => 'SEO Test Layout',
            'menu_slug'          => 'main-menu',
            'footer_tree'        => [],
            'palette'            => [],
            'use_system_palette' => true,
            'is_active'          => true,
            'head_cdn'           => null,
            'body_cdn'           => null,
        ]);

        $seoRecord = [
            'id'               => 'seo-record-uuid',
            'entity_type'      => 'page',
            'entity_id'        => 'test-page-id-3',
            'meta_title'       => 'SEO Meta Title Override',
            'meta_description' => 'SEO Meta Description Override',
            'canonical_url'    => 'https://example.com/canonical',
            'og_title'         => 'OpenGraph Override Title',
            'og_description'   => 'OpenGraph Override Description',
            'og_image'         => 'https://example.com/og.png',
            'robots'           => 'noindex,nofollow',
            'schema_json'      => json_encode([
                '@context' => 'https://schema.org',
                '@type'    => 'WebPage',
                'name'     => 'SEO Page'
            ]),
        ];

        $this->pageRepo->method('findBySlug')->willReturn($page);
        $this->getLayoutById->method('execute')->willReturn($layout);
        $this->bladeRenderer->method('renderPage')->willReturn('<div>Page SEO Content</div>');
        $this->seoRepo->method('findByEntity')->willReturn($seoRecord);
        $this->settingsRepo->method('get')->willReturnCallback(function($key, $default = null) {
            if ($key === 'site_language') {
                return 'es';
            }
            return $default;
        });

        $controller = new PageRenderController(
            getPageBySlug:      new GetPageBySlug($this->pageRepo),
            bladeRenderer:      $this->bladeRenderer,
            getLayoutById:      $this->getLayoutById,
            getDefaultLayout:   $this->getDefaultLayout,
            layoutRenderer:      $this->layoutRenderer,
            getNavbar:          $this->getNavbar,
            settingsRepository: $this->settingsRepo,
            seoRepository:      $this->seoRepo
        );

        ob_start();
        $controller->show('test-slug');
        $output = ob_get_clean();

        // Title Override
        $this->assertStringContainsString('<title>SEO Meta Title Override</title>', $output);
        // Meta Description Override
        $this->assertStringContainsString('<meta name="description" content="SEO Meta Description Override">', $output);
        // Canonical Link
        $this->assertStringContainsString('<link rel="canonical" href="https://example.com/canonical">', $output);
        // Robots Metadata
        $this->assertStringContainsString('<meta name="robots" content="noindex,nofollow">', $output);
        // OpenGraph Title & Description
        $this->assertStringContainsString('<meta property="og:title" content="OpenGraph Override Title">', $output);
        $this->assertStringContainsString('<meta property="og:description" content="OpenGraph Override Description">', $output);
        $this->assertStringContainsString('<meta property="og:image" content="https://example.com/og.png">', $output);
        // Schema JSON-LD unescaped
        $this->assertStringContainsString('<script type="application/ld+json">', $output);
        $this->assertStringContainsString('"@context":"https:\/\/schema.org"', $output);
        $this->assertStringContainsString('"@type":"WebPage"', $output);
    }

    public function testShowRendersGlobalSettingsCdnWhenLayoutHasNoCdns(): void
    {
        $page = [
            'id'               => 'test-page-id-4',
            'title'            => 'Page Title',
            'meta_description' => 'Page Description',
            'slug'             => 'test-slug',
            'status'           => 'published',
            'content'          => [],
            'layout_id'        => 'layout-4',
        ];

        $layout = PageLayout::fromArray([
            'id'                 => 'layout-4',
            'name'               => 'SEO Test Layout',
            'menu_slug'          => 'main-menu',
            'footer_tree'        => [],
            'palette'            => [],
            'use_system_palette' => true,
            'is_active'          => true,
            'head_cdn'           => null,
            'body_cdn'           => null,
        ]);

        $this->pageRepo->method('findBySlug')->willReturn($page);
        $this->getLayoutById->method('execute')->willReturn($layout);
        $this->bladeRenderer->method('renderPage')->willReturn('<div>Page Content</div>');

        // settingsRepo mock needs to return custom global CDNs
        $this->settingsRepo->method('get')->willReturnMap([
            ['site_language', 'es', 'es'],
            ['global_head_cdn', null, '<link rel="stylesheet" href="https://example.com/global-styles.css">'],
            ['global_body_cdn', null, '<script src="https://example.com/global-scripts.js"></script>'],
        ]);

        $controller = new PageRenderController(
            getPageBySlug:      new GetPageBySlug($this->pageRepo),
            bladeRenderer:      $this->bladeRenderer,
            getLayoutById:      $this->getLayoutById,
            getDefaultLayout:   $this->getDefaultLayout,
            layoutRenderer:      $this->layoutRenderer,
            getNavbar:          $this->getNavbar,
            settingsRepository: $this->settingsRepo,
            seoRepository:      $this->seoRepo
        );

        ob_start();
        $controller->show('test-slug');
        $output = ob_get_clean();

        // Should contain global settings CDNs
        $this->assertStringContainsString('<link rel="stylesheet" href="https://example.com/global-styles.css">', $output);
        $this->assertStringContainsString('<script src="https://example.com/global-scripts.js"></script>', $output);
        // Should NOT contain default Bootstrap CDN stylesheet
        $this->assertStringNotContainsString('cdn.jsdelivr.net/npm/bootstrap', $output);
    }
}
