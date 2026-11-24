<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Application;

use CeibaCms\PageBuilder\Application\PageAssembler;
use CeibaCms\SitePart\Domain\RenderContext;
use CeibaCms\SitePart\Domain\SitePart;
use CeibaCms\SitePart\Domain\SitePartKind;
use CeibaCms\SitePart\Domain\SitePartResolver;
use CeibaCms\SitePart\Infrastructure\SitePartStore;

/**
 * A public page with its site parts (plan 06-B): the published header and footer that apply to the request are
 * assembled with the page (same design, media, scripts). Without a header part, `header` is null and the host keeps
 * the layout's menu; without a footer part, the layout's footer tree is used. Pages without parts render as before.
 */
final class AssembleSitePage
{
    /** @param (\Closure(string): string)|null $siteMenu menu slug => navigation markup, for the site_menu component */
    public function __construct(
        private readonly PageAssembler $assembler,
        private readonly SitePartStore $store,
        private readonly ?\Closure $siteMenu = null,
    ) {}

    /**
     * @param list<mixed> $tree page content
     * @param array<string, mixed> $page page row
     * @param list<mixed> $layoutFooter the layout's footer tree (fallback)
     * @param array<string, mixed> $context renderer context
     * @param list<SitePart>|null $parts parts to use instead of the published ones (previews of drafts)
     * @return array{html: string, header: ?string, footer: string, css: string, js: string, parts: array<string, mixed>}
     */
    public function page(array $tree, array $page, RenderContext $request, array $layoutFooter = [], array $context = [],
        ?array $parts = null, ?array $design = null): array
    {
        $resolution = SitePartResolver::resolve($parts ?? $this->store->published(), $request);
        $header = $resolution->part(SitePartKind::HEADER);
        $footer = $resolution->part(SitePartKind::FOOTER);
        // Views get the menu renderer through the context, never through props (a document cannot inject markup).
        $context = $this->siteMenu === null ? $context : ['siteMenu' => $this->siteMenu] + $context;
        $assembled = $this->assembler->assemble($tree, $page, $request->hasSession, $design, $context,
            $footer !== null ? $footer->tree : $layoutFooter, $header?->tree ?? []);
        return ['html' => $assembled['html'], 'header' => $header === null ? null : $assembled['header'],
            'footer' => $assembled['footer'], 'css' => $assembled['css'], 'js' => $assembled['js'], 'parts' => $resolution->toArray()];
    }

    /**
     * The 404 page from the published 404 part that applies, with its header and footer; null when none applies
     * (the host keeps its own 404). Custom code is the site's (no page row).
     * @param list<mixed> $layoutFooter
     * @param list<SitePart>|null $parts
     * @return array{html: string, header: ?string, footer: string, css: string, js: string, parts: array<string, mixed>}|null
     */
    public function notFound(RenderContext $request, array $layoutFooter = [], ?array $parts = null, ?array $design = null): ?array
    {
        $parts ??= $this->store->published();
        $part = SitePartResolver::resolve($parts, $request)->part(SitePartKind::NOT_FOUND);
        return $part === null ? null : $this->page($part->tree, [], $request, $layoutFooter, [], $parts, $design);
    }
}
