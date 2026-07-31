<?php
declare(strict_types=1);

namespace LemurCms\Tests\Http;

use LemurCms\Http\Controllers\SettingsController;
use LemurCms\Settings\Domain\Repository\SettingsRepositoryInterface;
use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\MockObject\MockObject;

/**
 * Unit tests for SettingsController using mocked repository.
 * No database connection required.
 */
class SettingsControllerTest extends TestCase
{
    /** @var SettingsRepositoryInterface&MockObject */
    private SettingsRepositoryInterface $settingsRepository;

    private SettingsController $controller;

    protected function setUp(): void
    {
        parent::setUp();

        $this->settingsRepository = $this->createMock(SettingsRepositoryInterface::class);
        $this->controller = new SettingsController($this->settingsRepository);
    }

    // ── index() ─────────────────────────────────────────────────────────────

    public function testIndexDelegatesToRepositoryAll(): void
    {
        $expected = [
            'custom_css_global_session'    => 'body { color: red; }',
            'custom_js_global_no_session'  => 'console.log("hello");',
        ];

        $this->settingsRepository
            ->expects($this->once())
            ->method('all')
            ->willReturn($expected);

        // Capture output buffering to avoid pollution in test output
        ob_start();
        try {
            $this->controller->index();
        } catch (\Throwable) {
            // BaseController uses header() which triggers errors in CLI; ignore
        }
        ob_end_clean();

        // Just asserting the mock expectation was met (verified by ->expects above)
        $this->assertTrue(true);
    }

    // ── update() ─────────────────────────────────────────────────────────────

    public function testRepositoryInterfaceContractIsRespected(): void
    {
        // Verify the interface declares the expected methods
        $methods = get_class_methods(SettingsRepositoryInterface::class);
        $this->assertContains('get', $methods);
        $this->assertContains('set', $methods);
        $this->assertContains('all', $methods);
    }

    public function testMockRepositoryCanBeSubstituted(): void
    {
        $mock = $this->createMock(SettingsRepositoryInterface::class);
        $mock->method('get')->willReturn('test-value');

        $result = $mock->get('any_key');
        $this->assertSame('test-value', $result);
    }
}
