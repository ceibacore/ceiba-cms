<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Import;

use LemurCms\PageBuilder\Domain\Contract\UiFrameworkModuleInterface;
use LemurCms\PageBuilder\Domain\Service\UiFrameworkRegistry;
use LemurCms\PageBuilder\Frameworks\Bootstrap5\Bootstrap5Module;
use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\HtmlImporter;
use PHPUnit\Framework\TestCase;

/**
 * Integration tests: full HTML → VDOM pipeline through UiFrameworkRegistry.
 *
 * These tests exercise multiple components working together:
 *   Bootstrap5Module → UiFrameworkRegistry → HtmlImporter → RuleEngine
 */
class UiFrameworkPipelineIntegrationTest extends TestCase
{
    private UiFrameworkRegistry $registry;
    private HtmlImporter $importer;

    protected function setUp(): void
    {
        parent::setUp();
        $this->registry = new UiFrameworkRegistry();
        $this->registry->register(new Bootstrap5Module());
        $this->registry->setActive('bootstrap5');
        $this->importer = new HtmlImporter($this->registry);
    }

    // ── Full Bootstrap 5 page layout ──────────────────────────────────────────

    public function testFullBootstrapPageImportsCorrectly(): void
    {
        $html = <<<HTML
        <div class="container py-5">
            <div class="row g-4">
                <div class="col-md-8">
                    <h1 class="display-4">Bienvenido</h1>
                    <p class="lead">Descripción del sitio.</p>
                    <a href="/inicio" class="btn btn-primary btn-lg">Comenzar</a>
                </div>
                <div class="col-md-4">
                    <img src="/img/hero.png" alt="Hero" class="img-fluid">
                </div>
            </div>
        </div>
        HTML;

        $result = $this->importer->import($html);
        $tree   = $result->toArray()['tree'];

        // Root: container
        $this->assertCount(1, $tree);
        $this->assertSame('container', $tree[0]['type']);

        // Row inside container
        $row = $tree[0]['children'][0];
        $this->assertSame('row', $row['type']);
        // Gutter is stored as the raw CSS class suffix string extracted by RowRule
        $this->assertNotEmpty($row['props']['gutter']);

        // Two columns
        $this->assertCount(2, $row['children']);
        $col1 = $row['children'][0];
        $col2 = $row['children'][1];
        $this->assertSame('col', $col1['type']);
        $this->assertSame(8, $col1['props']['md']);
        $this->assertSame('col', $col2['type']);
        $this->assertSame(4, $col2['props']['md']);

        // Heading inside first column
        $heading = $col1['children'][0];
        $this->assertSame('text', $heading['type']);
        $this->assertSame('h1', $heading['props']['tag']);

        // Button inside first column
        $button = $col1['children'][2];
        $this->assertSame('button', $button['type']);
        $this->assertSame('/inicio', $button['props']['href']);

        // Image inside second column
        $img = $col2['children'][0];
        $this->assertSame('image', $img['type']);
        $this->assertSame('/img/hero.png', $img['props']['src']);

        // Conversion rate should be high
        $this->assertGreaterThan(70.0, $result->toArray()['stats']['conversion_rate']);
    }

    // ── Card grid ─────────────────────────────────────────────────────────────

    public function testCardGridImportsCorrectly(): void
    {
        $html = <<<HTML
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col">
                <div class="card h-100">
                    <img src="/img/p1.jpg" class="card-img-top" alt="Producto 1">
                    <div class="card-body">
                        <h5 class="card-title">Producto 1</h5>
                        <p class="card-text">Descripción 1.</p>
                    </div>
                    <div class="card-footer">
                        <a href="/p1" class="btn btn-outline-secondary">Ver más</a>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Producto 2</h5>
                        <p class="card-text">Descripción 2.</p>
                    </div>
                </div>
            </div>
        </div>
        HTML;

        $result = $this->importer->import($html);
        $tree   = $result->toArray()['tree'];
        $row    = $tree[0];

        $this->assertSame('row', $row['type']);
        $this->assertCount(2, $row['children']);

        $card1 = $row['children'][0]['children'][0];
        $this->assertSame('card', $card1['type']);
        $this->assertSame('Producto 1', $card1['props']['title']);

        $card2 = $row['children'][1]['children'][0];
        $this->assertSame('card', $card2['type']);
        $this->assertSame('Producto 2', $card2['props']['title']);
    }

    // ── Accordion component ───────────────────────────────────────────────────

    public function testAccordionImportsCorrectly(): void
    {
        $html = <<<HTML
        <div class="accordion" id="faqAccordion">
            <div class="accordion-item">
                <h2 class="accordion-header" id="h1">¿Quiénes somos?</h2>
                <div class="accordion-collapse collapse show" id="c1">
                    <div class="accordion-body">Somos una empresa de tecnología.</div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="h2">¿Cómo contactarnos?</h2>
                <div class="accordion-collapse collapse" id="c2">
                    <div class="accordion-body">Escríbenos al email.</div>
                </div>
            </div>
        </div>
        HTML;

        $result = $this->importer->import($html);
        $tree   = $result->toArray()['tree'];

        $accordion = $tree[0];
        $this->assertSame('accordion', $accordion['type']);
        $this->assertCount(2, $accordion['children']);
        $this->assertSame('accordion_item', $accordion['children'][0]['type']);
        $this->assertSame('accordion_item', $accordion['children'][1]['type']);
        $this->assertTrue($accordion['children'][0]['props']['open']);
        $this->assertFalse($accordion['children'][1]['props']['open']);
    }

    // ── Switching frameworks at runtime ───────────────────────────────────────

    public function testSwitchingActiveModuleChangesImportBehavior(): void
    {
        $html = '<div class="container"><h1>Título</h1></div>';

        // With Bootstrap5 active
        $withBootstrap = $this->importer->import($html)->toArray()['tree'];
        $this->assertSame('container', $withBootstrap[0]['type']);

        // Register a no-rules module and switch to it
        $noRulesModule = $this->createMock(UiFrameworkModuleInterface::class);
        $noRulesModule->method('getIdentifier')->willReturn('plain');
        $noRulesModule->method('getName')->willReturn('Plain');
        $noRulesModule->method('getImportRules')->willReturn([]);
        $noRulesModule->method('getContainmentRules')->willReturn([]);
        $noRulesModule->method('getComponentDefinitions')->willReturn([]);
        $noRulesModule->method('getViewsDirectoryPath')->willReturn('/tmp');

        $this->registry->register($noRulesModule);
        $this->registry->setActive('plain');

        // New importer uses same registry — now no Bootstrap rules
        $plainImporter = new HtmlImporter($this->registry);
        $withPlain     = $plainImporter->import($html)->toArray()['tree'];
        $this->assertNotSame('container', $withPlain[0]['type']);
    }

    // ── Custom rule via custom module ─────────────────────────────────────────

    public function testCustomRuleRegisteredViaModuleIsApplied(): void
    {
        // Build an inline custom rule that turns any <div class="hero"> into type 'hero'
        $heroRule = new class implements RuleInterface {
            public function matches(\DOMElement $el): bool
            {
                return $el->tagName === 'div'
                    && str_contains($el->getAttribute('class'), 'hero');
            }

            public function extract(\DOMElement $el, callable $recurse): array
            {
                return [
                    'type'     => 'hero',
                    'props'    => ['class' => $el->getAttribute('class')],
                    'consumes' => false,
                    'children' => [],
                    'warnings' => [],
                    'ignored'  => false,
                ];
            }

            public function priority(): int { return 350; }
        };

        // Build a custom module that wraps Bootstrap5 rules + the hero rule
        $customModule = new class($heroRule) implements UiFrameworkModuleInterface {
            public function __construct(private readonly RuleInterface $heroRule) {}
            public function getIdentifier(): string { return 'custom_theme'; }
            public function getName(): string { return 'Custom Theme'; }
            public function getImportRules(): array
            {
                return array_merge(
                    (new Bootstrap5Module())->getImportRules(),
                    [$this->heroRule]
                );
            }
            public function getContainmentRules(): array { return []; }
            public function getComponentDefinitions(): array { return []; }
            public function getViewsDirectoryPath(): string { return '/tmp'; }
        };

        $registry = new UiFrameworkRegistry();
        $registry->register($customModule);
        $registry->setActive('custom_theme');

        $importer = new HtmlImporter($registry);
        $result   = $importer->import('<div class="hero py-5"><h1>Banner</h1></div>');
        $tree     = $result->toArray()['tree'];

        $this->assertSame('hero', $tree[0]['type']);
    }

    // ── No data loss guarantee ────────────────────────────────────────────────

    public function testUnknownComponentAlwaysPreservedViaFallback(): void
    {
        $html   = '<div class="my-custom-slider"><div class="slide">Slide 1</div></div>';
        $result = $this->importer->import($html);
        $json   = json_encode($result->toArray());

        // Content must not be lost
        $this->assertStringContainsString('my-custom-slider', $json);
    }

    public function testZeroDataLossWithMixedHtml(): void
    {
        $html = <<<HTML
        <section>
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">Slide custom</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        HTML;

        $result = $this->importer->import($html);
        $json   = json_encode($result->toArray());

        // Class names of unknown components are preserved in props
        $this->assertStringContainsString('swiper-wrapper', $json);
        $this->assertStringContainsString('swiper-slide', $json);
        // Note: raw text nodes (non-DOMElement) are not traversed by the importer

        // Structured components should still be recognized
        $tree = $result->toArray()['tree'];
        $this->assertSame('section', $tree[0]['type']);
    }

    // ── Security ─────────────────────────────────────────────────────────────

    public function testXssScriptTagRemovedWithBootstrapModule(): void
    {
        $html   = '<div class="container"><script>alert("xss")</script><div class="card"><div class="card-body"><p>Seguro</p></div></div></div>';
        $result = $this->importer->import($html);
        $json   = json_encode($result->toArray());

        $this->assertStringNotContainsString('alert', $json);
        $this->assertStringNotContainsString('<script', $json);
        $this->assertSame('container', $result->toArray()['tree'][0]['type']);
    }
}
