<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Import;

use LemurCms\PageBuilder\Domain\Service\BladeRenderer;
use LemurCms\PageBuilder\Domain\Service\LoopResolver;
use LemurCms\PageBuilder\Domain\Service\UiFrameworkRegistry;
use LemurCms\PageBuilder\Domain\Service\VariableInterpolator;
use LemurCms\PageBuilder\Frameworks\Bootstrap5\Bootstrap5Module;
use LemurCms\PageBuilder\Import\HtmlImporter;
use PHPUnit\Framework\TestCase;

/**
 * End-to-end test using the real example/index.html file.
 *
 * Covers:
 *  1. Import real HTML → VDOM node tree (JSON)
 *  2. Render VDOM → SSR HTML via BladeRenderer
 *  3. Extract a subtree and convert it to a reusable component (with bindings)
 *
 * Output artifacts are written to tests/_output/ for manual inspection.
 */
class IndexHtmlImportEndToEndTest extends TestCase
{
    private static string $outputDir;
    private static string $htmlPath;
    private static string $logPath;

    private HtmlImporter  $importer;
    private BladeRenderer $renderer;

    // ── Setup ─────────────────────────────────────────────────────────────────

    public static function setUpBeforeClass(): void
    {
        parent::setUpBeforeClass();
        self::$htmlPath  = dirname(__DIR__, 3) . '/example/index.html';
        self::$outputDir = dirname(__DIR__, 3) . '/tests/_output';
        self::$logPath   = self::$outputDir . '/pipeline.log';

        if (!is_dir(self::$outputDir)) {
            mkdir(self::$outputDir, 0755, true);
        }

        // Reset log for this run
        file_put_contents(self::$logPath, '');
    }

    private function log(string $message): void
    {
        file_put_contents(self::$logPath, $message . PHP_EOL, FILE_APPEND);
    }

    protected function setUp(): void
    {
        parent::setUp();

        $registry = new UiFrameworkRegistry();
        $registry->register(new Bootstrap5Module());
        $registry->setActive('bootstrap5');

        $this->importer = new HtmlImporter($registry);
        $this->renderer = new BladeRenderer(new LoopResolver(), new VariableInterpolator(), $registry);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 1. IMPORT → VDOM JSON
    // ─────────────────────────────────────────────────────────────────────────

    public function testExampleFileExists(): void
    {
        $this->assertFileExists(
            self::$htmlPath,
            'example/index.html must exist for this test'
        );
    }

    public function testImportProducesNodeTree(): array
    {
        $html   = file_get_contents(self::$htmlPath);
        $result = $this->importer->import($html);
        $data   = $result->toArray();

        // Tree must not be empty
        $this->assertNotEmpty($data['tree'], 'VDOM tree must not be empty');

        // Conversion happened — at least some Bootstrap components recognized
        $this->assertGreaterThan(0, $data['stats']['mapped'], 'At least some nodes should be mapped');

        // Every root node must have the required VDOM fields
        foreach ($data['tree'] as $node) {
            $this->assertArrayHasKey('id',       $node);
            $this->assertArrayHasKey('type',     $node);
            $this->assertArrayHasKey('props',    $node);
            $this->assertArrayHasKey('loop',     $node);
            $this->assertArrayHasKey('children', $node);
        }

        // Write JSON output for manual inspection
        $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        file_put_contents(self::$outputDir . '/index_vdom.json', $json);

        $this->log('[OUTPUT] VDOM tree → tests/_output/index_vdom.json');
        $this->log('[STATS]  ' . json_encode($data['stats']));
        $this->log('[WARNINGS] ' . count($data['warnings']) . ' conversion warnings');

        return $data['tree']; // pass tree to dependent tests
    }

    /**
     * @depends testImportProducesNodeTree
     */
    public function testTreeContainsExpectedBootstrapComponents(array $tree): array
    {
        $flat  = $this->flattenTree($tree);
        $types = array_column($flat, 'type');
        $names = array_column($flat, 'name');

        // The page has Bootstrap containers, rows, cols — now identified by `name`
        $this->assertContains('container', $names, 'Expected container nodes in index.html');
        $this->assertContains('row',       $names, 'Expected row nodes in index.html');
        $this->assertContains('col',       $names, 'Expected col nodes in index.html');

        // Headings now use real HTML tags as type
        $headingTypes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        $textOrHeadings = array_filter($types, fn($t) => in_array($t, $headingTypes));
        $this->assertNotEmpty($textOrHeadings, 'Expected heading nodes');

        return $tree;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 2. VDOM → SSR HTML
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * @depends testTreeContainsExpectedBootstrapComponents
     */
    public function testRenderSsrHtml(array $tree): array
    {
        $html = $this->renderer->renderPage($tree);

        // Must produce non-empty HTML
        $this->assertNotEmpty($html, 'SSR render must produce HTML output');

        // Must not contain raw PHP — output is pure HTML
        $this->assertStringNotContainsString('<?php', $html, 'Rendered HTML must not contain PHP tags');

        // Bootstrap structural wrappers must be present (partial class match)
        $this->assertStringContainsString('class="container', $html);
        $this->assertStringContainsString('<div class="row', $html);

        // Write SSR output for manual inspection
        file_put_contents(self::$outputDir . '/index_ssr.html', $html);
        $this->log('[OUTPUT] SSR HTML → tests/_output/index_ssr.html (' . strlen($html) . ' bytes)');

        return $tree;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 3. EXTRACT SUBTREE → REUSABLE COMPONENT
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * @depends testTreeContainsExpectedBootstrapComponents
     *
     * Demonstrates "Convert to Component":
     * Find the About section (bg-light), extract it as a subtree,
     * apply bindings to its text nodes, and save the result as a component JSON.
     */
    public function testExtractAboutSectionAsReusableComponent(array $tree): void
    {
        // ── Step 1: Find the "About" section in the tree ─────────────────────
        $aboutNode = $this->findNodeByClass($tree, 'bg-light');
        $this->assertNotNull($aboutNode, 'The "bg-light" About section must exist in the tree');

        // ── Step 2: Apply bindings to text nodes to make it a template ───────
        $componentTree = $this->applyComponentBindings($aboutNode, [
            // Map heading content → template variable (heading may be h1-h6 tags)
            'heading_title'      => fn($node) => in_array($node['type'], ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
                && str_contains((string) ($node['props']['class'] ?? ''), 'display-5'),
            // Map first lead paragraph → template variable
            'about_lead_text'    => fn($node) => $node['type'] === 'p'
                && str_contains((string) ($node['props']['class'] ?? ''), 'lead'),
            // Map body paragraph → template variable
            'about_body_text'    => fn($node) => $node['type'] === 'p'
                && str_contains((string) ($node['props']['class'] ?? ''), 'text-muted'),
        ]);

        // ── Step 3: Build the component definition JSON ───────────────────────
        $component = [
            'name'        => 'AboutSection',
            'slug'        => 'about-section',
            'category'    => 'sections',
            'description' => 'Sección Sobre Mí con título, párrafo principal y cuerpo configurables.',
            'props_schema' => [
                'heading_title'   => ['type' => 'text',     'label' => 'Título',             'default' => 'About Me'],
                'about_lead_text' => ['type' => 'textarea', 'label' => 'Párrafo principal',  'default' => ''],
                'about_body_text' => ['type' => 'textarea', 'label' => 'Cuerpo',             'default' => ''],
            ],
            'tree' => $componentTree,
        ];

        // ── Step 4: Validate the component JSON structure ─────────────────────
        $this->assertNotNull($component['tree'], 'Component tree must not be null');
        $this->assertSame('AboutSection', $component['name']);
        $this->assertArrayHasKey('props_schema', $component);
        $this->assertArrayHasKey('heading_title', $component['props_schema']);

        // Bindings must be present in the component tree
        $flat     = $this->flattenTree([$component['tree']]);
        $bound    = array_filter($flat, fn($n) => !empty($n['bindings']));
        $this->assertNotEmpty($bound, 'Component tree must have at least one node with bindings');

        // Verify a binding points to the expected variable
        $bindingValues = [];
        foreach ($bound as $n) {
            foreach ($n['bindings'] as $k => $v) {
                $bindingValues[] = $v;
            }
        }
        $this->assertContains('heading_title', $bindingValues, 'heading_title binding must be present');

        // ── Step 5: Write component JSON for manual inspection ────────────────
        $json = json_encode($component, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        file_put_contents(self::$outputDir . '/about_component.json', $json);
        $this->log('[OUTPUT] Component JSON → tests/_output/about_component.json');
    }

    /**
     * Verify all three output files were generated.
     *
     * @depends testRenderSsrHtml
     * @depends testExtractAboutSectionAsReusableComponent
     */
    public function testOutputFilesExist(): void
    {
        $this->assertFileExists(self::$outputDir . '/index_vdom.json',       'VDOM JSON output missing');
        $this->assertFileExists(self::$outputDir . '/index_ssr.html',        'SSR HTML output missing');
        $this->assertFileExists(self::$outputDir . '/about_component.json',  'Component JSON output missing');

        // VDOM JSON must be valid JSON
        $vdom = json_decode(file_get_contents(self::$outputDir . '/index_vdom.json'), true);
        $this->assertIsArray($vdom);
        $this->assertArrayHasKey('tree', $vdom);
        $this->assertArrayHasKey('stats', $vdom);

        // Component JSON must be valid JSON
        $comp = json_decode(file_get_contents(self::$outputDir . '/about_component.json'), true);
        $this->assertIsArray($comp);
        $this->assertArrayHasKey('tree', $comp);
        $this->assertArrayHasKey('props_schema', $comp);

        $this->log('[OK] All 3 output artifacts verified.');
        $this->assertTrue(true); // explicit assertion to avoid risky marking
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Helpers
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Flatten a recursive node tree into a single-level array for easier searching.
     *
     * @param  array[] $nodes
     * @return array[]
     */
    private function flattenTree(array $nodes): array
    {
        $result = [];
        foreach ($nodes as $node) {
            $result[] = $node;
            if (!empty($node['children'])) {
                foreach ($this->flattenTree($node['children']) as $child) {
                    $result[] = $child;
                }
            }
        }
        return $result;
    }

    /**
     * Find the first node whose props.class contains the given CSS class string.
     *
     * @param  array[] $nodes
     */
    private function findNodeByClass(array $nodes, string $cssClass): ?array
    {
        foreach ($nodes as $node) {
            $class = $node['props']['class'] ?? '';
            if (str_contains((string) $class, $cssClass)) {
                return $node;
            }
            if (!empty($node['children'])) {
                $found = $this->findNodeByClass($node['children'], $cssClass);
                if ($found !== null) {
                    return $found;
                }
            }
        }
        return null;
    }

    /**
     * Recursively walk a node subtree and apply bindings to nodes that match
     * one of the provided matcher callables.
     *
     * @param  array                      $node      Root node of the subtree
     * @param  array<string, callable>    $matchers  Map of variableName → callable(node): bool
     * @return array                                 The node tree with bindings applied
     */
    private function applyComponentBindings(array $node, array $matchers): array
    {
        foreach ($matchers as $variableName => $matches) {
            if ($matches($node)) {
                $node['bindings'] = array_merge(
                    $node['bindings'] ?? [],
                    ['content' => $variableName]
                );
                // Remove static content once bound
                unset($node['props']['content']);
            }
        }

        if (!empty($node['children'])) {
            $node['children'] = array_map(
                fn($child) => $this->applyComponentBindings($child, $matchers),
                $node['children']
            );
        }

        return $node;
    }
}
