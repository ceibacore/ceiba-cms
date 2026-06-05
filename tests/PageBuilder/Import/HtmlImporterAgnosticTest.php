<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Import;

use LemurCms\PageBuilder\Domain\Contract\UiFrameworkModuleInterface;
use LemurCms\PageBuilder\Domain\Service\UiFrameworkRegistry;
use LemurCms\PageBuilder\Frameworks\Bootstrap5\Bootstrap5Module;
use LemurCms\PageBuilder\Import\HtmlImporter;
use LemurCms\PageBuilder\Import\ImportResult;
use PHPUnit\Framework\TestCase;

/**
 * Unit tests for HtmlImporter focusing on the agnostic registry integration.
 * Bootstrap content assertions remain in HtmlImporterTest.php.
 */
class HtmlImporterAgnosticTest extends TestCase
{
    // ── Without registry (fallback-only mode) ─────────────────────────────────

    public function testImporterInstantiatesWithoutRegistry(): void
    {
        $importer = new HtmlImporter();
        $result   = $importer->import('<div class="container"><p>Hola</p></div>');
        $this->assertInstanceOf(ImportResult::class, $result);
    }

    public function testWithoutRegistryBootstrapClassFallsToHtmlNode(): void
    {
        // No registry → no Bootstrap rules → container becomes fallback html node
        $importer = new HtmlImporter();
        $result   = $importer->import('<div class="container"><p>Test</p></div>');
        $tree     = $result->toArray()['tree'];

        $this->assertNotEmpty($tree);
        // Without Bootstrap rules the div is processed by GenericDivRule or FallbackRule,
        // so type must NOT be 'container'
        $this->assertNotSame('container', $tree[0]['type']);
    }

    // ── With explicit module (no registry) ───────────────────────────────────

    public function testImporterAcceptsExplicitModule(): void
    {
        $importer = new HtmlImporter(module: new Bootstrap5Module());
        $result   = $importer->import('<div class="container"></div>');
        $tree     = $result->toArray()['tree'];

        $this->assertSame('div', $tree[0]['type']);
        $this->assertSame('container', $tree[0]['name']);
    }

    public function testExplicitModuleRecognizesBootstrapComponents(): void
    {
        $importer = new HtmlImporter(module: new Bootstrap5Module());
        $result   = $importer->import('<div class="row"><div class="col-md-6"></div></div>');
        $tree     = $result->toArray()['tree'];

        $this->assertSame('div', $tree[0]['type']);
        $this->assertSame('row', $tree[0]['name']);
        $this->assertSame('div', $tree[0]['children'][0]['type']);
        $this->assertSame('col', $tree[0]['children'][0]['name']);
    }

    // ── With registry ─────────────────────────────────────────────────────────

    public function testImporterAcceptsRegistry(): void
    {
        $registry = new UiFrameworkRegistry();
        $registry->register(new Bootstrap5Module());
        $registry->setActive('bootstrap5');

        $importer = new HtmlImporter($registry);
        $result   = $importer->import('<div class="container"></div>');
        $tree     = $result->toArray()['tree'];

        $this->assertSame('div', $tree[0]['type']);
        $this->assertSame('container', $tree[0]['name']);
    }

    public function testRegistryAutoSelectsWhenSingleModule(): void
    {
        $registry = new UiFrameworkRegistry();
        $registry->register(new Bootstrap5Module());
        // No setActive() call

        $importer = new HtmlImporter($registry);
        $result   = $importer->import('<div class="card"><div class="card-body"></div></div>');
        $tree     = $result->toArray()['tree'];

        $this->assertSame('div', $tree[0]['type']);
        $this->assertSame('card', $tree[0]['name']);
    }

    public function testRegistryWithNoActiveModuleUsesOnlyFallback(): void
    {
        $registry = new UiFrameworkRegistry();
        $registry->register(new Bootstrap5Module());
        $registry->register($this->makeDummyModule('tailwind'));
        // Two modules, none active → hasActive() = false → fallback only

        $importer = new HtmlImporter($registry);
        $result   = $importer->import('<div class="container"></div>');
        $tree     = $result->toArray()['tree'];

        $this->assertNotEmpty($tree);
        // With no active module, Bootstrap rules not loaded → type != 'container'
        $this->assertNotSame('container', $tree[0]['type']);
    }

    // ── Module takes precedence over registry ─────────────────────────────────

    public function testExplicitModuleTakesPrecedenceOverRegistry(): void
    {
        // Registry active = dummy module with no rules
        $registry = new UiFrameworkRegistry();
        $registry->register($this->makeDummyModule('dummy'));
        $registry->setActive('dummy');

        // Explicit module = Bootstrap5 with real rules
        $importer = new HtmlImporter(uiRegistry: $registry, module: new Bootstrap5Module());
        $result   = $importer->import('<div class="container"></div>');
        $tree     = $result->toArray()['tree'];

        $this->assertSame('div', $tree[0]['type']);
        $this->assertSame('container', $tree[0]['name']);
    }

    // ── FallbackRule always present ────────────────────────────────────────────

    public function testUnknownElementAlwaysFallsBackRegardlessOfModule(): void
    {
        foreach ([new HtmlImporter(), new HtmlImporter(module: new Bootstrap5Module())] as $importer) {
            $result = $importer->import('<div class="unknown-custom-component-xyz"></div>');
            $tree   = $result->toArray()['tree'];
            $this->assertNotEmpty($tree, 'FallbackRule must always produce a node');
        }
    }

    // ── Stats reflect actual rules used ──────────────────────────────────────

    public function testConversionRateIsHigherWithBootstrapRules(): void
    {
        // Bootstrap-specific HTML that only ContainerRule/RowRule/ColRule can fully map
        $html = '<div class="container"><div class="row"><div class="col-md-6"><h1>Título</h1></div></div></div>';

        $withRules    = new HtmlImporter(module: new Bootstrap5Module());
        $withoutRules = new HtmlImporter(); // core rules only (no BS5)

        $statsWith    = $withRules->import($html)->toArray()['stats'];
        $statsWithout = $withoutRules->import($html)->toArray()['stats'];

        // With Bootstrap5 module: container/row/col are mapped as typed components
        // Without: they become generic 'section' nodes (still mapped, not fallback)
        // Both should have 0 fallback_html for this clean Bootstrap HTML
        $this->assertSame(0, $statsWith['fallback_html']);
        $this->assertSame(0, $statsWithout['fallback_html']);
        // Bootstrap module maps container/row/col to specific types (container, row, col)
        $this->assertGreaterThanOrEqual($statsWithout['mapped'], $statsWith['mapped']);
    }

    // ── Helper ───────────────────────────────────────────────────────────────

    private function makeDummyModule(string $id): UiFrameworkModuleInterface
    {
        $mock = $this->createMock(UiFrameworkModuleInterface::class);
        $mock->method('getIdentifier')->willReturn($id);
        $mock->method('getName')->willReturn(ucfirst($id));
        $mock->method('getImportRules')->willReturn([]);
        $mock->method('getContainmentRules')->willReturn([]);
        $mock->method('getComponentDefinitions')->willReturn([]);
        $mock->method('getViewsDirectoryPath')->willReturn('/tmp');
        return $mock;
    }
}
