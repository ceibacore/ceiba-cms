<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Application;

use CeibaCms\DataSource\Application\DynamicContent;
use CeibaCms\DataSource\Domain\QueryContext;

use CeibaCms\Media\Domain\MediaReferences;
use CeibaCms\Media\Domain\Resolver\MediaPropsDecorator;
use CeibaCms\Media\Domain\Resolver\MediaResolver;
use CeibaCms\PageBuilder\Application\Design\GetSiteDesign;
use CeibaCms\PageBuilder\Domain\Service\BladeRendererInterface;
use CeibaCms\PageBuilder\Domain\Style\StyleClassDecorator;
use CeibaCms\PageBuilder\Domain\Style\StyleCompiler;
use CeibaCms\PageBuilder\Domain\Style\StyledNodes;

/**
 * What a published page carries (plan 04-B), the same for every host and preview:
 * - html: the tree with its style classes and its {asset} references resolved by the host (plan 05-A);
 * - footer: the layout footer, drawn the same way (its styles, media and scripts join the page's);
 * - css: component CSS (plan 05-C), site design (compiled), global custom CSS, the page's own CSS (each may override
 *   the previous);
 * - js: scripts of the components used (plan 05-B), global custom JS, then the page's own JS.
 */
final class PageAssembler
{
    public function __construct(
        private readonly BladeRendererInterface $renderer,
        private readonly GetSiteDesign $designs,
        private readonly CustomCode $customCode,
        private readonly ?MediaResolver $media = null,
        private readonly ?DynamicContent $dynamic = null,
        /** @var (\Closure(): QueryContext)|null */
        private readonly ?\Closure $queryContext = null,
    ) {}

    /**
     * @param list<mixed> $tree page content (root nodes)
     * @param array<string, mixed> $page page row (custom code columns)
     * @param array<string, mixed>|null $design design to use; the published one when null
     * @param array<string, mixed> $context renderer context (loops, variables); `request_query` (the query string) and
     *        `record` (a record page, plan 07-D) feed the dynamic content of plan 07
     * @param list<mixed> $footer the footer tree (site part or layout), drawn with the same design, media and scripts
     * @param list<mixed> $header the header tree (site part, plan 06), drawn the same way
     * @return array{html: string, header: string, footer: string, css: string, js: string, diagnostics: list<array{path: string, code: string}>}
     */
    public function assemble(array $tree, array $page, bool $hasSession, ?array $design = null, array $context = [], array $footer = [], array $header = []): array
    {
        $design ??= $this->designs->published();
        if ($this->dynamic !== null && $this->queryContext !== null) {
            // Plan 07-B: run the queries of header, page and footer together and expand loops, states and bindings.
            $vars = is_array($context['record'] ?? null) ? ['record' => $context['record']] : [];
            [$header, $tree, $footer] = $this->dynamic->expand([$header, $tree, $footer],
                is_array($context['request_query'] ?? null) ? $context['request_query'] : [], ($this->queryContext)(), $vars);
            unset($context['request_query']);
        }
        $all = [...$header, ...$tree, ...$footer];
        $resolved = $this->media?->resolve([...MediaReferences::collect($all), ...MediaReferences::inValues($design)]) ?? [];
        $assets = array_map(fn ($media) => $media->url, $resolved);
        $compiled = StyleCompiler::compile($design, StyledNodes::collect($all), $assets);
        $code = $this->customCode->resolve($page, $hasSession);
        $components = ComponentScripts::css($all);
        $css = array_filter([
            $components === '' ? '' : "/* cms:components */\n" . $components,
            $compiled->css === '' ? '' : "/* cms:design */\n" . $compiled->css,
            $code['globalCss'] === '' ? '' : "/* cms:global */\n" . $code['globalCss'],
            $code['pageCss'] === '' ? '' : "/* cms:page */\n" . $code['pageCss'],
        ]);
        // The module's component scripts first, so the site's and the page's own code can build on them.
        $js = array_filter([ComponentScripts::for($all), $code['globalJs'], $code['pageJs']]);
        $draw = fn (array $nodes): string => $nodes === [] ? ''
            : $this->renderer->renderPage((new MediaPropsDecorator($resolved))->apply(StyleClassDecorator::apply($nodes, $design)), $context);
        return [
            'html' => $draw($tree),
            'header' => $draw($header),
            'footer' => $draw($footer),
            'css' => implode("\n", $css),
            'js' => implode(";\n", $js),
            'diagnostics' => $compiled->diagnostics,
        ];
    }
}
