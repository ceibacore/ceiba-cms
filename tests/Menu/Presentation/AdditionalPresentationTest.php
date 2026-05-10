<?php

declare(strict_types=1);

namespace LemurCms\Tests\Menu\Presentation;

use LemurCms\Menu\Presentation\BannerRenderer;
use LemurCms\Menu\Presentation\BreadcrumbBuilder;
use LemurCms\Menu\Presentation\NotificationPresenter;
use PHPUnit\Framework\TestCase;

class AdditionalPresentationTest extends TestCase
{
    // ── BannerRenderer ───────────────────────────────────────────────────────

    private function createMockBannerRepository()
    {
        $repo = $this->createMock(\LemurCms\Menu\Domain\MenuRepositoryInterface::class);
        $repo->method('getActiveBanners')->willReturn([
            [
                'id' => 1,
                'content' => 'Special Offer!',
                'bg_color' => '#FFD700',
                'text_color' => '#000000',
                'link_url' => '/offer',
                'link_text' => 'Learn More',
                'is_closeable' => true,
                'start_at' => null,
                'end_at' => null,
            ]
        ]);
        return $repo;
    }

    public function testBannerRendererRendersWithContainer(): void
    {
        $repo = $this->createMockBannerRepository();
        $renderer = new BannerRenderer($repo);
        
        $html = $renderer->render('above');
        
        $this->assertStringContainsString('banners-above', $html);
        $this->assertStringContainsString('Special Offer!', $html);
    }

    public function testBannerRendererIncludesLink(): void
    {
        $repo = $this->createMockBannerRepository();
        $renderer = new BannerRenderer($repo);
        
        $html = $renderer->render('above');
        
        $this->assertStringContainsString('/offer', $html);
        $this->assertStringContainsString('Learn More', $html);
    }

    public function testBannerRendererEmptyWhenNoBanners(): void
    {
        $repo = $this->createMock(\LemurCms\Menu\Domain\MenuRepositoryInterface::class);
        $repo->method('getActiveBanners')->willReturn([]);
        
        $renderer = new BannerRenderer($repo);
        $html = $renderer->render('above');
        
        $this->assertEquals('', $html);
    }

    public function testBannerRendererScheduledFiltersExpired(): void
    {
        $repo = $this->createMock(\LemurCms\Menu\Domain\MenuRepositoryInterface::class);
        $now = date('Y-m-d H:i:s');
        $tomorrow = date('Y-m-d H:i:s', time() + 86400);
        
        $repo->method('getActiveBanners')->willReturn([
            [
                'id' => 1,
                'content' => 'Expired',
                'start_at' => $tomorrow,
                'end_at' => null,
                'bg_color' => '#FFF',
                'text_color' => '#000',
                'is_closeable' => true,
                'link_url' => null,
                'link_text' => null,
            ]
        ]);
        
        $renderer = new BannerRenderer($repo);
        $html = $renderer->renderScheduled('above');
        
        $this->assertEquals('', $html);
    }

    // ── BreadcrumbBuilder ────────────────────────────────────────────────────

    public function testBreadcrumbBuilderAddItem(): void
    {
        $builder = new BreadcrumbBuilder();
        $builder->home()->add('About', '/about');
        
        $this->assertEquals(2, $builder->count());
    }

    public function testBreadcrumbBuilderRenderHasNav(): void
    {
        $builder = new BreadcrumbBuilder();
        $builder->home()->add('Products', '/products');
        
        $html = $builder->render();
        
        $this->assertStringContainsString('<nav', $html);
        $this->assertStringContainsString('breadcrumb', $html);
    }

    public function testBreadcrumbBuilderCurrentMarkedActive(): void
    {
        $builder = new BreadcrumbBuilder();
        $builder->home()->add('About', '/about')->current('Details');
        
        $html = $builder->render();
        
        $this->assertStringContainsString('aria-current="page"', $html);
    }

    public function testBreadcrumbBuilderToArray(): void
    {
        $builder = new BreadcrumbBuilder();
        $builder->home()->add('Contact', '/contact');
        
        $arr = $builder->toArray();
        
        $this->assertCount(2, $arr);
        $this->assertEquals('Home', $arr[0]['label']);
        $this->assertEquals('Contact', $arr[1]['label']);
    }

    public function testBreadcrumbBuilderToJson(): void
    {
        $builder = new BreadcrumbBuilder();
        $builder->add('Test', '/test');
        
        $json = $builder->toJson();
        $decoded = json_decode($json, true);
        
        $this->assertIsArray($decoded);
        $this->assertEquals('Test', $decoded[0]['label']);
    }

    public function testBreadcrumbBuilderReset(): void
    {
        $builder = new BreadcrumbBuilder();
        $builder->home()->add('About', '/about');
        $this->assertEquals(2, $builder->count());
        
        $builder->reset();
        $this->assertEquals(0, $builder->count());
    }

    public function testBreadcrumbBuilderIcon(): void
    {
        $builder = new BreadcrumbBuilder();
        $builder->home('/', 'bi bi-house');
        
        $html = $builder->render();
        
        $this->assertStringContainsString('bi bi-house', $html);
    }

    // ── NotificationPresenter ────────────────────────────────────────────────

    public function testNotificationPresenterSuccess(): void
    {
        $session = [];
        $presenter = new NotificationPresenter($session);
        
        $presenter->success('Operation successful');
        
        $this->assertTrue($presenter->hasType('success'));
        $this->assertEquals(1, $presenter->count());
    }

    public function testNotificationPresenterError(): void
    {
        $session = [];
        $presenter = new NotificationPresenter($session);
        
        $presenter->error('Something went wrong');
        
        $this->assertTrue($presenter->hasType('error'));
    }

    public function testNotificationPresenterWarning(): void
    {
        $session = [];
        $presenter = new NotificationPresenter($session);
        
        $presenter->warning('Be careful');
        
        $this->assertTrue($presenter->hasType('warning'));
    }

    public function testNotificationPresenterInfo(): void
    {
        $session = [];
        $presenter = new NotificationPresenter($session);
        
        $presenter->info('FYI');
        
        $this->assertTrue($presenter->hasType('info'));
    }

    public function testNotificationPresenterRender(): void
    {
        $session = [];
        $presenter = new NotificationPresenter($session);
        $presenter->success('Done!');
        
        $html = $presenter->render(false);
        
        $this->assertStringContainsString('alert-success', $html);
        $this->assertStringContainsString('Done!', $html);
    }

    public function testNotificationPresenterFlashClearOnRender(): void
    {
        $session = [];
        $presenter = new NotificationPresenter($session);
        $presenter->success('Done!');
        
        $this->assertEquals(1, $presenter->count());
        $presenter->render(true);
        $this->assertEquals(0, $presenter->count());
    }

    public function testNotificationPresenterOfType(): void
    {
        $session = [];
        $presenter = new NotificationPresenter($session);
        $presenter->success('OK')->error('Bad')->success('Good');
        
        $successes = $presenter->ofType('success');
        
        $this->assertCount(2, $successes);
    }

    public function testNotificationPresenterAll(): void
    {
        $session = [];
        $presenter = new NotificationPresenter($session);
        $presenter->success('OK')->error('Bad');
        
        $all = $presenter->all();
        
        $this->assertCount(2, $all);
    }

    public function testNotificationPresenterInvalidType(): void
    {
        $session = [];
        $presenter = new NotificationPresenter($session);
        
        $this->expectException(\InvalidArgumentException::class);
        $presenter->add('invalid', 'message');
    }

    public function testNotificationPresenterWithTitle(): void
    {
        $session = [];
        $presenter = new NotificationPresenter($session);
        $presenter->success('Check email', 'Email Sent');
        
        $html = $presenter->render(false);
        
        $this->assertStringContainsString('Email Sent', $html);
        $this->assertStringContainsString('Check email', $html);
    }

    public function testNotificationPresenterSessionPersistence(): void
    {
        $session = [];
        $presenter = new NotificationPresenter($session);
        $presenter->success('Message 1');
        
        $this->assertNotEmpty($session['notifications']);
        
        $presenter2 = new NotificationPresenter($session);
        $this->assertEquals(1, $presenter2->count());
    }
}
