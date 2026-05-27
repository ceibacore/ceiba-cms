<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import;

use LemurCms\PageBuilder\Import\Rules\FallbackRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\AccordionRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\BreadcrumbRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\ButtonGroupRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\ButtonRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\CardRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\CarouselRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\CollapseRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\ColRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\ContainerRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\ListGroupRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\OffcanvasRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\RowRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\ScrollspyRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\ToastRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\TooltipRule;
use LemurCms\PageBuilder\Import\Rules\Generic\GenericDivRule;
use LemurCms\PageBuilder\Import\Rules\Generic\SpanRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\AnchorRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\DetailsRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\DividerRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\FigureRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\HeadingRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\ImageRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\InlineTextRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\ParagraphRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\PictureRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\SemanticSectionRule;

final class HtmlImporter
{
    private const MAX_HTML_SIZE = 524288; // 512 KB

    private RuleRegistry $registry;

    public function __construct()
    {
        $this->registry = new RuleRegistry();
        $this->registerDefaultRules();
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
            if ($node['type'] === 'html' && empty($node['children'])) {
                if ($pending !== null) {
                    $pending['props']['content'] .= "\n" . ($node['props']['content'] ?? '');
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

    private function registerDefaultRules(): void
    {
        // Priority 0 — Fallback (must be last in priority, always matches)
        $this->registry->register(new FallbackRule());

        // Priority 100 — Generic
        $this->registry->register(new GenericDivRule());
        $this->registry->register(new SpanRule());

        // Priority 200 — Semantic HTML5
        $this->registry->register(new SemanticSectionRule());
        $this->registry->register(new HeadingRule());
        $this->registry->register(new ParagraphRule());
        $this->registry->register(new ImageRule());
        $this->registry->register(new PictureRule());
        $this->registry->register(new FigureRule());
        $this->registry->register(new DetailsRule());
        $this->registry->register(new InlineTextRule());
        $this->registry->register(new DividerRule());
        $this->registry->register(new AnchorRule());

        // Priority 300 — Bootstrap components
        $this->registry->register(new ContainerRule());
        $this->registry->register(new RowRule());
        $this->registry->register(new ColRule());
        $this->registry->register(new CardRule());
        $this->registry->register(new ButtonRule());
        $this->registry->register(new ButtonGroupRule());
        $this->registry->register(new ListGroupRule());
        $this->registry->register(new AccordionRule());
        $this->registry->register(new CarouselRule());
        $this->registry->register(new CollapseRule());
        $this->registry->register(new OffcanvasRule());
        $this->registry->register(new ToastRule());
        $this->registry->register(new TooltipRule());
        $this->registry->register(new BreadcrumbRule());
        $this->registry->register(new ScrollspyRule());
    }
}
