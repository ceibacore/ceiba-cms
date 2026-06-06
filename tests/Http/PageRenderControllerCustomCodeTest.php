<?php
declare(strict_types=1);

namespace LemurCms\Tests\Http;

use LemurCms\Auth\AuthManager;
use LemurCms\Http\Controllers\PageRenderController;
use LemurCms\Page\Application\GetPageBySlug;
use LemurCms\PageBuilder\Domain\Service\BladeRendererInterface;
use LemurCms\Settings\Domain\Repository\SettingsRepositoryInterface;
use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\MockObject\MockObject;

/**
 * Unit tests for the custom CSS/JS resolution logic inside PageRenderController.
 * Uses Reflection to call the private resolveCustomCode() method directly.
 *
 * NOTE: GetPageBySlug is declared final, so we build a real instance backed
 * by an anonymous stub repository that is never called during these tests.
 */
class PageRenderControllerCustomCodeTest extends TestCase
{
    /** @var AuthManager&MockObject */
    private AuthManager $authManager;

    /** @var SettingsRepositoryInterface&MockObject */
    private SettingsRepositoryInterface $settingsRepo;

    private PageRenderController $controller;
    private \ReflectionMethod $resolveMethod;

    protected function setUp(): void
    {
        parent::setUp();

        $this->authManager  = $this->createMock(AuthManager::class);
        $this->settingsRepo = $this->createMock(SettingsRepositoryInterface::class);

        // GetPageBySlug is final — cannot be mocked. Build a real instance
        // backed by an anonymous stub; resolveCustomCode() never calls it.
        $pageRepo = new class implements \LemurCms\Page\Domain\Repository\PageRepositoryInterface {
            public function findBySlug(string $slug): ?array { return null; }
            public function findById(string $id): ?array { return null; }
            public function findPublished(int $limit, int $offset): array { return []; }
            public function save(array $data): string { return ''; }
            public function update(string $id, array $data): void {}
            public function delete(string $id): void {}
            public function publish(string $id): void {}
        };
        $getPageBySlug = new GetPageBySlug($pageRepo);

        $bladeRenderer = $this->createMock(BladeRendererInterface::class);

        $this->controller = new PageRenderController(
            getPageBySlug:      $getPageBySlug,
            bladeRenderer:      $bladeRenderer,
            authManager:        $this->authManager,
            settingsRepository: $this->settingsRepo,
        );

        $this->resolveMethod = new \ReflectionMethod($this->controller, 'resolveCustomCode');
        $this->resolveMethod->setAccessible(true);
    }

    // ── No-session visitor ─────────────────────────────────────────────────

    public function testNoSessionUsesNoSessionGlobalCss(): void
    {
        $this->authManager->method('check')->willReturn(false);

        $this->settingsRepo->method('get')->willReturnMap([
            ['custom_css_global_no_session', '', '.body-ns { color: blue; }'],
            ['custom_js_global_no_session', '', ''],
        ]);

        [$css, $js] = $this->resolveMethod->invoke($this->controller, []);

        $this->assertStringContainsString('.body-ns { color: blue; }', $css);
    }

    public function testNoSessionUsesNoSessionPageCss(): void
    {
        $this->authManager->method('check')->willReturn(false);

        $this->settingsRepo->method('get')->willReturnMap([
            ['custom_css_global_no_session', '', ''],
            ['custom_js_global_no_session', '', ''],
        ]);

        $page = ['custom_css_no_session' => '.page-ns { font-size: 14px; }'];

        [$css, $js] = $this->resolveMethod->invoke($this->controller, $page);

        $this->assertStringContainsString('.page-ns { font-size: 14px; }', $css);
    }

    // ── Session visitor ────────────────────────────────────────────────────

    public function testSessionUsesSessionGlobalCss(): void
    {
        $this->authManager->method('check')->willReturn(true);

        $this->settingsRepo->method('get')->willReturnMap([
            ['custom_css_global_session', '', '.admin { display: none; }'],
            ['custom_js_global_session', '', ''],
        ]);

        [$css, $js] = $this->resolveMethod->invoke($this->controller, []);

        $this->assertStringContainsString('.admin { display: none; }', $css);
    }

    public function testSessionUsesSessionPageJs(): void
    {
        $this->authManager->method('check')->willReturn(true);

        $this->settingsRepo->method('get')->willReturnMap([
            ['custom_css_global_session', '', ''],
            ['custom_js_global_session', '', ''],
        ]);

        $page = ['custom_js_session' => 'window.isAdmin = true;'];

        [$css, $js] = $this->resolveMethod->invoke($this->controller, $page);

        $this->assertStringContainsString('window.isAdmin = true;', $js);
    }

    // ── Merging ────────────────────────────────────────────────────────────

    public function testGlobalAndPageCodeAreMerged(): void
    {
        $this->authManager->method('check')->willReturn(false);

        $this->settingsRepo->method('get')->willReturnMap([
            ['custom_css_global_no_session', '', '.global { color: red; }'],
            ['custom_js_global_no_session', '', 'var g = 1;'],
        ]);

        $page = [
            'custom_css_no_session' => '.page { color: blue; }',
            'custom_js_no_session'  => 'var p = 2;',
        ];

        [$css, $js] = $this->resolveMethod->invoke($this->controller, $page);

        $this->assertStringContainsString('.global { color: red; }', $css);
        $this->assertStringContainsString('.page { color: blue; }', $css);
        $this->assertStringContainsString('var g = 1;', $js);
        $this->assertStringContainsString('var p = 2;', $js);
    }

    // ── Empty / null guards ────────────────────────────────────────────────

    public function testReturnsEmptyStringsWhenNothingConfigured(): void
    {
        $this->authManager->method('check')->willReturn(false);

        $this->settingsRepo->method('get')->willReturnMap([
            ['custom_css_global_no_session', '', ''],
            ['custom_js_global_no_session', '', ''],
        ]);

        [$css, $js] = $this->resolveMethod->invoke($this->controller, []);

        $this->assertSame('', $css);
        $this->assertSame('', $js);
    }
}
