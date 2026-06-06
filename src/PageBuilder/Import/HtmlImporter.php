<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import;

use LemurCms\PageBuilder\Domain\Contract\UiFrameworkModuleInterface;
use LemurCms\PageBuilder\Domain\Service\UiFrameworkRegistry;
use LemurCms\PageBuilder\Import\Rules\FallbackRule;
use LemurCms\PageBuilder\Import\Rules\Generic\GenericDivRule;
use LemurCms\PageBuilder\Import\Rules\Generic\SpanRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\AnchorRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\BlockquoteRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\DetailsRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\DividerRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\FigureRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\HeadingRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\ImageRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\InlineTextRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\ListRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\ParagraphRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\PictureRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\SemanticSectionRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\TableRule;

/**
 * Converts an HTML string into a PageBuilder VDOM node tree.
 *
 * The importer is UI-framework agnostic: it only contains FallbackRule in its
 * core. All framework-specific rules (Bootstrap 5, Tailwind, etc.) are
 * injected via UiFrameworkRegistry or a UiFrameworkModuleInterface instance.
 *
 * Usage with registry (recommended):
 *   $importer = new HtmlImporter($uiFrameworkRegistry);
 *
 * Usage with a specific module (testing / embedding):
 *   $importer = new HtmlImporter(module: new Bootstrap5Module());
 *
 * Usage without any framework (legacy / fallback-only):
 *   $importer = new HtmlImporter();
 */
final class HtmlImporter
{
    private const MAX_HTML_SIZE = 524288; // 512 KB

    private RuleRegistry $registry;

    public function __construct(
        private readonly ?UiFrameworkRegistry $uiRegistry = null,
        private readonly ?UiFrameworkModuleInterface $module = null,
    ) {
        $this->registry = new RuleRegistry();
        $this->buildRegistry();
    }

    /**
     * Import HTML string into a PageBuilder node tree.
     *
     * @param  array<string, mixed> $options  Reserved for future use
     * @throws \InvalidArgumentException
     */
    public function import(string $html, array $options = []): ImportResult
    {
        if (strlen($html) > self::MAX_HTML_SIZE) {
            throw new \InvalidArgumentException('El HTML excede el límite permitido de 512 KB.');
        }

        $clean  = $this->sanitize($html);
        $dom    = $this->parse($clean);
        $engine = new RuleEngine($this->registry);
        $engine->resetCounters();

        $tree = [];
        $body = $dom->getElementsByTagName('body')->item(0);
        $root = $body ?? $dom->documentElement;

        if ($root !== null) {
            $tree = $engine->processChildren($root, 0);
        }

        $tree  = $this->mergeAdjacentHtml($tree);
        $total = $engine->getMappedCount() + $engine->getFallbackCount() + $engine->getIgnoredCount();
        $denom = $engine->getMappedCount() + $engine->getFallbackCount();

        $stats = [
            'total_elements'  => $total,
            'mapped'          => $engine->getMappedCount(),
            'fallback_html'   => $engine->getFallbackCount(),
            'ignored'         => $engine->getIgnoredCount(),
            'conversion_rate' => $denom > 0 ? round($engine->getMappedCount() / $denom * 100, 1) : 0.0,
        ];

        return new ImportResult($tree, $engine->getWarnings(), $stats);
    }

    // ── Private ────────────────────────────────────────────────────────────────

    private function sanitize(string $html): string
    {
        // Remove scripts, styles and HTML comments
        $html = preg_replace('/<script\b[^>]*>.*?<\/script>/si', '', $html);
        $html = preg_replace('/<style\b[^>]*>.*?<\/style>/si', '', $html);
        $html = preg_replace('/<!--.*?-->/si', '', $html);
        // Remove charset meta (can confuse libxml)
        $html = preg_replace('/<meta[^>]*charset[^>]*>/i', '', $html);
        return (string) $html;
    }

    private function parse(string $html): \DOMDocument
    {
        $dom = new \DOMDocument('1.0', 'UTF-8');
        libxml_use_internal_errors(true);

        // Wrap fragment in a full document to keep DOMDocument happy
        if (!str_contains(strtolower($html), '<html')) {
            $html = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>' . $html . '</body></html>';
        }

        $dom->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_NOERROR);
        libxml_clear_errors();
        libxml_use_internal_errors(false);

        return $dom;
    }

    /**
     * Merge adjacent leaf html nodes into one to reduce noise.
     *
     * @param  array[] $nodes
     * @return array[]
     */
    private function mergeAdjacentHtml(array $nodes): array
    {
        $result  = [];
        $pending = null;

        foreach ($nodes as $node) {
            // Merge adjacent fallback nodes (name=null, has _raw_html) to reduce noise
            if (($node['name'] ?? null) === null && isset($node['props']['_raw_html']) && empty($node['children'])) {
                if ($pending !== null) {
                    $pending['props']['_raw_html'] .= "\n" . ($node['props']['_raw_html'] ?? '');
                } else {
                    $pending = $node;
                }
            } else {
                if ($pending !== null) {
                    $result[]  = $pending;
                    $pending   = null;
                }
                $node['children'] = $this->mergeAdjacentHtml($node['children']);
                $result[]         = $node;
            }
        }

        if ($pending !== null) {
            $result[] = $pending;
        }

        return $result;
    }

    private function buildRegistry(): void
    {
        // Core rules are always active — HTML semantics without any framework
        foreach ($this->getCoreRules() as $rule) {
            $this->registry->register($rule);
        }

        // Framework-specific rules only fire when a module is active
        $activeModule = $this->module;
        if ($activeModule === null && $this->uiRegistry !== null && $this->uiRegistry->hasActive()) {
            $activeModule = $this->uiRegistry->getActiveModule();
        }
        if ($activeModule !== null) {
            foreach ($activeModule->getImportRules() as $rule) {
                $this->registry->register($rule);
            }
        }

        // FallbackRule is always last (priority 0) — never framework-specific
        $this->registry->register(new FallbackRule());
    }

    /**
     * Core rules: always active regardless of active UI framework module.
     * Generic + Semantic HTML rules that preserve full attribute fidelity.
     *
     * @return \LemurCms\PageBuilder\Import\Contract\RuleInterface[]
     */
    private function getCoreRules(): array
    {
        return [
            // Priority 100 — Generic elements
            new GenericDivRule(),
            new SpanRule(),
            // Priority 200 — Semantic HTML5
            new SemanticSectionRule(),
            new HeadingRule(),
            new ParagraphRule(),
            new ImageRule(),
            new PictureRule(),
            new FigureRule(),
            new DetailsRule(),
            new InlineTextRule(),
            new DividerRule(),
            new AnchorRule(),
            new BlockquoteRule(),
            new TableRule(),
            new ListRule(),
        ];
    }
}
