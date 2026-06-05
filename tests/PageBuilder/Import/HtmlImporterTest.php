<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Import;

use LemurCms\PageBuilder\Frameworks\Bootstrap5\Bootstrap5Module;
use LemurCms\PageBuilder\Import\HtmlImporter;
use LemurCms\PageBuilder\Import\ImportResult;
use PHPUnit\Framework\TestCase;

class HtmlImporterTest extends TestCase
{
    private HtmlImporter $importer;

    protected function setUp(): void
    {
        parent::setUp();
        $this->importer = new HtmlImporter(module: new Bootstrap5Module());
    }

    // ── Output structure ──────────────────────────────────────────────────────

    public function testImportReturnsImportResult(): void
    {
        $result = $this->importer->import('<div class="container"></div>');
        $this->assertInstanceOf(ImportResult::class, $result);
    }

    public function testToArrayContainsRequiredKeys(): void
    {
        $result = $this->importer->import('<p>Hola</p>');
        $arr    = $result->toArray();
        $this->assertArrayHasKey('tree', $arr);
        $this->assertArrayHasKey('warnings', $arr);
        $this->assertArrayHasKey('stats', $arr);
    }

    public function testEachNodeHasRequiredKeys(): void
    {
        $result = $this->importer->import('<div class="container"><p>Texto</p></div>');
        $tree   = $result->toArray()['tree'];
        $this->assertNotEmpty($tree);
        foreach ($tree as $node) {
            $this->assertArrayHasKey('id', $node);
            $this->assertArrayHasKey('type', $node);
            $this->assertArrayHasKey('props', $node);
            $this->assertArrayHasKey('loop', $node);
            $this->assertArrayHasKey('children', $node);
        }
    }

    public function testNodeIdsAreUniqueUuids(): void
    {
        $result = $this->importer->import('<div class="row"><div class="col-md-6"><p>A</p></div><div class="col-md-6"><p>B</p></div></div>');
        $ids    = $this->collectIds($result->toArray()['tree']);
        $this->assertCount(count($ids), array_unique($ids), 'All node IDs must be unique');
        foreach ($ids as $id) {
            $this->assertMatchesRegularExpression('/^[0-9a-f\-]{36}$/', $id, 'ID must be UUID format');
        }
    }

    // ── Bootstrap grid ────────────────────────────────────────────────────────

    public function testBootstrapGridConvertsCorrectly(): void
    {
        $html   = '<div class="container"><div class="row"><div class="col-md-8"><h1>Título</h1></div><div class="col-md-4"><p>Aside</p></div></div></div>';
        $result = $this->importer->import($html);
        $tree   = $result->toArray()['tree'];

        $this->assertCount(1, $tree);
        $this->assertSame('container', $tree[0]['type']);
        $this->assertCount(1, $tree[0]['children']);
        $this->assertSame('row', $tree[0]['children'][0]['type']);
        $cols = $tree[0]['children'][0]['children'];
        $this->assertCount(2, $cols);
        $this->assertSame('col', $cols[0]['type']);
        $this->assertSame(8, $cols[0]['props']['md']);
        $this->assertSame('text', $cols[0]['children'][0]['type']);
    }

    // ── Semantic elements ─────────────────────────────────────────────────────

    public function testSemanticHeaderAndFooter(): void
    {
        $html   = '<header class="navbar-dark"><nav class="navbar"></nav></header>';
        $result = $this->importer->import($html);
        $tree   = $result->toArray()['tree'];

        $this->assertSame('section', $tree[0]['type']);
        $this->assertStringContainsString('pb-semantic-header', $tree[0]['props']['class']);
        $this->assertSame('banner', $tree[0]['props']['role']);
    }

    public function testSemanticHeadingsH1ToH6(): void
    {
        $html   = '<h1>Uno</h1><h2>Dos</h2><h3>Tres</h3>';
        $result = $this->importer->import($html);
        $tree   = $result->toArray()['tree'];

        $this->assertCount(3, $tree);
        $this->assertSame('h1', $tree[0]['props']['tag']);
        $this->assertSame('h2', $tree[1]['props']['tag']);
        $this->assertSame('h3', $tree[2]['props']['tag']);
    }

    public function testHorizontalRuleBecomeDivider(): void
    {
        $result = $this->importer->import('<hr class="my-3">');
        $tree   = $result->toArray()['tree'];
        $this->assertSame('divider', $tree[0]['type']);
    }

    // ── Bootstrap components ──────────────────────────────────────────────────

    public function testCardComponentExtracted(): void
    {
        $html = '<div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Card Title</h5>
                        <p class="card-text">Some text.</p>
                        <a href="#" class="btn btn-primary">Go</a>
                    </div>
                 </div>';
        $result = $this->importer->import($html);
        $tree   = $result->toArray()['tree'];

        $this->assertSame('card', $tree[0]['type']);
        $this->assertSame('Card Title', $tree[0]['props']['title']);
        // The btn inside card-body is extracted as a child
        $this->assertNotEmpty($tree[0]['children']);
        $this->assertSame('button', $tree[0]['children'][0]['type']);
    }

    public function testAccordionWithTwoItems(): void
    {
        $html = '<div class="accordion" id="faq">
                    <div class="accordion-item">
                        <h2 class="accordion-header">Preg 1</h2>
                        <div class="accordion-collapse show">
                            <div class="accordion-body">Resp 1</div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">Preg 2</h2>
                        <div class="accordion-collapse">
                            <div class="accordion-body">Resp 2</div>
                        </div>
                    </div>
                 </div>';
        $result = $this->importer->import($html);
        $tree   = $result->toArray()['tree'];
        $this->assertSame('accordion', $tree[0]['type']);
        $this->assertCount(2, $tree[0]['children']);
        $this->assertSame('accordion_item', $tree[0]['children'][0]['type']);
    }

    public function testBreadcrumbExtracted(): void
    {
        $html   = '<ol class="breadcrumb"><li class="breadcrumb-item"><a href="/">Inicio</a></li><li class="breadcrumb-item active">Página</li></ol>';
        $result = $this->importer->import($html);
        $tree   = $result->toArray()['tree'];
        $this->assertSame('breadcrumb', $tree[0]['type']);
        $this->assertCount(2, $tree[0]['props']['items']);
    }

    // ── Security: sanitization ────────────────────────────────────────────────

    public function testScriptTagIsRemoved(): void
    {
        $html   = '<div class="container"><script>alert("xss")</script><p>Seguro</p></div>';
        $result = $this->importer->import($html);
        $json   = json_encode($result->toArray());
        $this->assertStringNotContainsString('alert', $json);
        $this->assertStringNotContainsString('<script', $json);
    }

    public function testStyleTagIsRemoved(): void
    {
        $html   = '<style>body{color:red}</style><h1>Título</h1>';
        $result = $this->importer->import($html);
        $json   = json_encode($result->toArray());
        $this->assertStringNotContainsString('<style', $json);
        $this->assertStringNotContainsString('body{color', $json);
    }

    public function testHtmlCommentsAreRemoved(): void
    {
        $html   = '<!-- comentario secreto --><p>Visible</p>';
        $result = $this->importer->import($html);
        $json   = json_encode($result->toArray());
        $this->assertStringNotContainsString('comentario secreto', $json);
    }

    // ── Max size validation ───────────────────────────────────────────────────

    public function testImportThrowsOnOversizedHtml(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->importer->import(str_repeat('a', 524289));
    }

    public function testImportAllowsMaxSizeHtml(): void
    {
        // 512 KB exactly — should not throw
        $html   = '<p>' . str_repeat('x', 524288 - 7) . '</p>';
        $result = $this->importer->import($html);
        $this->assertInstanceOf(ImportResult::class, $result);
    }

    // ── Stats ─────────────────────────────────────────────────────────────────

    public function testStatsCountsAreCorrecto(): void
    {
        $html   = '<div class="container"><h1>Título</h1><p>Párrafo</p><video src="/v.mp4"></video></div>';
        $result = $this->importer->import($html);
        $stats  = $result->toArray()['stats'];

        $this->assertArrayHasKey('total_elements', $stats);
        $this->assertArrayHasKey('mapped', $stats);
        $this->assertArrayHasKey('fallback_html', $stats);
        $this->assertArrayHasKey('ignored', $stats);
        $this->assertArrayHasKey('conversion_rate', $stats);

        // video → fallback_html
        $this->assertGreaterThan(0, $stats['fallback_html']);
        // container, h1, p → mapped
        $this->assertGreaterThan(0, $stats['mapped']);
        $this->assertGreaterThanOrEqual(0, $stats['conversion_rate']);
        $this->assertLessThanOrEqual(100, $stats['conversion_rate']);
    }

    public function testConversionRateIs100ForPureBootstrap(): void
    {
        $html   = '<div class="container"><div class="row"><div class="col-md-6"><h2>OK</h2></div></div></div>';
        $result = $this->importer->import($html);
        $stats  = $result->toArray()['stats'];
        $this->assertSame(0, $stats['fallback_html']);
        $this->assertSame(100.0, $stats['conversion_rate']);
    }

    // ── Warnings ─────────────────────────────────────────────────────────────

    public function testRelativeImagePathGeneratesWarning(): void
    {
        $result   = $this->importer->import('<img src="images/foto.jpg" alt="test">');
        $warnings = $result->toArray()['warnings'];
        $this->assertNotEmpty($warnings);
        $this->assertSame('warning', $warnings[0]['severity']);
    }

    public function testAbsoluteImagePathNoWarning(): void
    {
        $result   = $this->importer->import('<img src="/images/foto.jpg" alt="test">');
        $warnings = $result->toArray()['warnings'];
        $this->assertEmpty($warnings);
    }

    // ── Merge adjacent html nodes ─────────────────────────────────────────────

    public function testAdjacentHtmlNodesAreMerged(): void
    {
        // Two consecutive unknown elements should merge into one html node
        $html   = '<video src="/a.mp4"></video><video src="/b.mp4"></video>';
        $result = $this->importer->import($html);
        $tree   = $result->toArray()['tree'];
        $this->assertCount(1, $tree);
        $this->assertSame('html', $tree[0]['type']);
    }

    // ── Fragment vs full document ─────────────────────────────────────────────

    public function testFragmentImportWorks(): void
    {
        $result = $this->importer->import('<section><h1>Hi</h1></section>');
        $tree   = $result->toArray()['tree'];
        $this->assertNotEmpty($tree);
        $this->assertSame('section', $tree[0]['type']);
    }

    public function testFullDocumentImportExtractsBody(): void
    {
        $html   = '<!DOCTYPE html><html><head><title>Test</title></head><body><h1>Hola</h1></body></html>';
        $result = $this->importer->import($html);
        $tree   = $result->toArray()['tree'];
        $this->assertCount(1, $tree);
        $this->assertSame('text', $tree[0]['type']);
        $this->assertSame('h1', $tree[0]['props']['tag']);
    }

    public function testEmptyHtmlReturnsEmptyTree(): void
    {
        $result = $this->importer->import('');
        $this->assertEmpty($result->toArray()['tree']);
    }

    // ── Helper ───────────────────────────────────────────────────────────────

    private function collectIds(array $nodes): array
    {
        $ids = [];
        foreach ($nodes as $node) {
            $ids[] = $node['id'];
            if (!empty($node['children'])) {
                $ids = array_merge($ids, $this->collectIds($node['children']));
            }
        }
        return $ids;
    }
}
