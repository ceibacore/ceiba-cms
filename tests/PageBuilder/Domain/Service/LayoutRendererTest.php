<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Domain\Service;

use LemurCms\PageBuilder\Domain\Service\LayoutRenderer;
use PHPUnit\Framework\TestCase;

class LayoutRendererTest extends TestCase
{
    private LayoutRenderer $renderer;

    protected function setUp(): void
    {
        $this->renderer = new LayoutRenderer();
    }

    public function testRendersBasicStructure(): void
    {
        $html = $this->renderer->render(
            contentHtml: '<p>Hello</p>',
            navbarHtml:  '<nav>Nav</nav>',
            footerHtml:  '<div>Footer</div>',
            palette:     [],
            pageMeta:    ['title' => 'Test Page'],
        );

        $this->assertStringContainsString('<!DOCTYPE html>', $html);
        $this->assertStringContainsString('<title>Test Page</title>', $html);
        $this->assertStringContainsString('<p>Hello</p>', $html);
        $this->assertStringContainsString('<nav>Nav</nav>', $html);
        $this->assertStringContainsString('<div>Footer</div>', $html);
        $this->assertStringContainsString('<main id="main-content">', $html);
        $this->assertStringContainsString('<header role="banner">', $html);
        $this->assertStringContainsString('<footer role="contentinfo">', $html);
    }

    public function testRendersDescriptionMeta(): void
    {
        $html = $this->renderer->render(
            contentHtml: '',
            navbarHtml:  '',
            footerHtml:  '',
            palette:     [],
            pageMeta:    ['title' => 'T', 'description' => 'A nice page'],
        );

        $this->assertStringContainsString('<meta name="description" content="A nice page">', $html);
    }

    public function testDoesNotRenderDescriptionMetaWhenEmpty(): void
    {
        $html = $this->renderer->render('', '', '', [], ['title' => 'T']);

        $this->assertStringNotContainsString('meta name="description"', $html);
    }

    public function testInjectsPaletteWhenSystemPaletteDisabled(): void
    {
        $html = $this->renderer->render(
            contentHtml:      '',
            navbarHtml:       '',
            footerHtml:       '',
            palette:          ['primary' => '#e94560', 'secondary' => '#ccc'],
            pageMeta:         ['title' => 'T'],
            useSystemPalette: false,
        );

        $this->assertStringContainsString('<style>:root {', $html);
        $this->assertStringContainsString('--lemur-primary: #e94560;', $html);
        $this->assertStringContainsString('--lemur-secondary: #ccc;', $html);
    }

    public function testDoesNotInjectPaletteWhenSystemPaletteEnabled(): void
    {
        $html = $this->renderer->render(
            contentHtml:      '',
            navbarHtml:       '',
            footerHtml:       '',
            palette:          ['primary' => '#e94560'],
            pageMeta:         ['title' => 'T'],
            useSystemPalette: true,
        );

        $this->assertStringNotContainsString('<style>', $html);
    }

    public function testDoesNotInjectPaletteWhenPaletteIsEmpty(): void
    {
        $html = $this->renderer->render(
            contentHtml:      '',
            navbarHtml:       '',
            footerHtml:       '',
            palette:          [],
            pageMeta:         ['title' => 'T'],
            useSystemPalette: false,
        );

        $this->assertStringNotContainsString('<style>', $html);
    }

    public function testEscapesTitleAndDescription(): void
    {
        $html = $this->renderer->render(
            contentHtml: '',
            navbarHtml:  '',
            footerHtml:  '',
            palette:     [],
            pageMeta:    [
                'title'       => '<script>alert(1)</script>',
                'description' => '" onload="evil()',
            ],
        );

        $this->assertStringNotContainsString('<script>', $html);
        $this->assertStringContainsString('&lt;script&gt;', $html);
        $this->assertStringNotContainsString('" onload="', $html);
    }
}
