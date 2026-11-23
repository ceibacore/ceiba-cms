<?php
declare(strict_types=1);

namespace CeibaCms\Tests\PageBuilder;

use CeibaCms\PageBuilder\Domain\Service\BladeRenderer;
use CeibaCms\PageBuilder\Domain\Service\LoopResolver;
use CeibaCms\PageBuilder\Domain\Service\UiFrameworkRegistry;
use CeibaCms\PageBuilder\Domain\Service\VariableInterpolator;
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Bootstrap5Module;
use PHPUnit\Framework\TestCase;

/**
 * The components of ComponentCatalogue::createDefault() render on the public site as the editor canvas draws them
 * (plan 03-D: what is published matches what was edited).
 */
final class CatalogueViewsTest extends TestCase
{
    private function render(array $node): string
    {
        $frameworks = new UiFrameworkRegistry();
        $frameworks->register(new Bootstrap5Module());
        $frameworks->setActive('bootstrap5');
        $html = (new BladeRenderer(new LoopResolver(), new VariableInterpolator(), $frameworks))->renderNode($node + ['children' => []]);
        return trim(preg_replace('/\s+</', '<', $html));
    }

    public function testHeadingUsesItsLevelAndEscapesTheText(): void
    {
        self::assertSame('<h1>A &lt;b&gt;</h1>', $this->render(['type' => 'heading', 'props' => ['text' => 'A <b>', 'level' => 1]]));
        self::assertSame('<h2>T</h2>', $this->render(['type' => 'heading', 'props' => ['text' => 'T']]));
        self::assertSame('<h6>T</h6>', $this->render(['type' => 'heading', 'props' => ['text' => 'T', 'level' => 9]]));
    }

    public function testButtonTakesTheCatalogueUrlAndDropsActiveSchemes(): void
    {
        self::assertSame('<a href="https://a.test" class="btn btn-primary">Go</a>',
            $this->render(['type' => 'button', 'props' => ['label' => 'Go', 'url' => 'https://a.test']]));
        self::assertSame('<a href="#" class="btn btn-primary">Go</a>',
            $this->render(['type' => 'button', 'props' => ['label' => 'Go', 'url' => " java\tscript:alert(1)"]]));
        self::assertStringContainsString('href="/x"', $this->render(['type' => 'button', 'props' => ['href' => '/x', 'url' => '/y']]));
    }

    public function testRowGutterNumbersBecomeBootstrapClasses(): void
    {
        self::assertStringStartsWith('<div class="row g-3">', $this->render(['type' => 'row', 'props' => ['gutter' => '3']]));
        self::assertStringStartsWith('<div class="row g-0">', $this->render(['type' => 'row', 'props' => []]));
    }

    public function testTextBlockKeepsLineBreaks(): void
    {
        self::assertSame("<p>One<br>\nTwo &amp;</p>", $this->render(['type' => 'text', 'props' => ['content' => "One\nTwo &"]]));
    }

    public function testSectionKeepsItsTagUnlessASemanticRuleSetsAnother(): void
    {
        self::assertSame('<section class="hero"><h1>Hi</h1></section>',
            $this->render(['type' => 'section', 'props' => ['class' => 'hero'], 'children' => [['type' => 'h1', 'props' => ['content' => 'Hi'], 'children' => []]]]));
        self::assertStringStartsWith('<main>', $this->render(['type' => 'section', 'props' => ['tag' => 'main']]));
    }
}
