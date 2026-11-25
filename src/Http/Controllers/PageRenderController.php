<?php
declare(strict_types=1);

namespace CeibaCms\Http\Controllers;

use CeibaCms\Auth\AuthManager;
use CeibaCms\Menu\Application\GetNavbar;
use CeibaCms\Page\Application\GetPageBySlug;
use CeibaCms\PageBuilder\Application\CustomCode;
use CeibaCms\PageBuilder\Application\GetDefaultLayout;
use CeibaCms\PageBuilder\Application\GetLayoutById;
use CeibaCms\PageBuilder\Application\GetPageTemplateById;
use CeibaCms\PageBuilder\Application\PageAssembler;
use CeibaCms\PageBuilder\Domain\Service\BladeRendererInterface;
use CeibaCms\PageBuilder\Domain\Service\ConditionEngine;
use CeibaCms\PageBuilder\Domain\Service\LayoutRenderer;
use CeibaCms\Seo\Domain\Repository\SeoRepositoryInterface;
use CeibaCms\Settings\Domain\Repository\SettingsRepositoryInterface;
use CeibaCms\SitePart\Application\AssembleSitePage;
use CeibaCms\SitePart\Domain\RenderContext;

/**
 * Public page of the module's own HTTP adapter. Content, design CSS and custom code come from PageAssembler
 * (plan 04-B); with AssembleSitePage, the header, footer and 404 page come from the site parts (plan 06).
 */
class PageRenderController extends BaseController
{
    public function __construct(
        private readonly GetPageBySlug        $getPageBySlug,
        private readonly BladeRendererInterface $bladeRenderer,
        private readonly ?GetLayoutById       $getLayoutById = null,
        private readonly ?GetDefaultLayout    $getDefaultLayout = null,
        private readonly ?LayoutRenderer      $layoutRenderer = null,
        private readonly ?GetNavbar           $getNavbar = null,
        private readonly ?GetPageTemplateById $getPageTemplateById = null,
        private readonly ?ConditionEngine     $conditionEngine = null,
        private readonly ?AuthManager                     $authManager        = null,
        private readonly ?SettingsRepositoryInterface     $settingsRepository = null,
        private readonly ?SeoRepositoryInterface          $seoRepository      = null,
        private readonly ?PageAssembler                   $assembler          = null,
        private readonly ?AssembleSitePage                $sitePage           = null,
    ) {}

    public function show(string $slug, bool $isHome = false): void
    {
        try {
            $page = $this->getPageBySlug->execute($slug);
            if ($page === null || ($page['status'] ?? '') !== 'published') {
                $this->notFound($slug);
                return;
            }

            // 1. Conditions.
            if ($this->conditionEngine !== null && !empty($page['conditions'])) {
                $failed = $this->conditionEngine->evaluateConditions($page['conditions']);
                if ($failed !== null) {
                    PublicPageResponses::fallback($failed['fallback'] ?? []);
                    return;
                }
            }

            // 2. Context for loops and bindings (queries of the document arrive with plan 07-B).
            $context = [];

            $layout = null;
            if ($this->getLayoutById !== null && $this->getDefaultLayout !== null) {
                $layoutId = $page['layout_id'] ?? null;
                $layout = ($layoutId ? $this->getLayoutById->execute($layoutId) : null) ?? $this->getDefaultLayout->execute();
            }

            // 3. Page template and slots.
            $tree = $page['content'] ?? [];
            $templateId = $page['template_id'] ?? null;
            if ($templateId !== null && $this->getPageTemplateById !== null) {
                $template = $this->getPageTemplateById->execute($templateId);
                if ($template !== null && !empty($template['tree']) && method_exists($this->bladeRenderer, 'mergeTemplateAndPage')) {
                    $tree = $this->bladeRenderer->mergeTemplateAndPage($template['tree'], $tree);
                }
            }

            // 4. Content, design CSS and custom code (global + page, session-aware).
            $hasSession = $this->authManager !== null && $this->authManager->check();
            $lang = $this->settingsRepository?->get('site_language', 'es') ?? 'es';
            $requestPage = $page;
            $requestPage['layout_id'] = $layout?->id;
            $request = RenderContext::forPage($requestPage, $isHome ? '/' : '/' . $slug, $lang, $hasSession, $isHome);
            $assembled = $this->content(is_array($tree) ? $tree : [], $page, $request, $context, $this->footerTree($layout));

            $seo = ($this->seoRepository !== null && isset($page['id']))
                ? $this->seoRepository->findByEntity('page', (string) $page['id']) : null;
            header('Content-Type: text/html; charset=UTF-8');
            echo $this->document($assembled, $layout, PublicPageResponses::meta($page, $seo, $slug), $lang);
        } catch (\Exception $e) {
            http_response_code(500);
            header('Content-Type: text/html; charset=UTF-8');
            echo '<h1>Error rendering page</h1><p>' . htmlspecialchars($e->getMessage()) . '</p>';
        }
    }

    /** The 404 of the site part that applies (with the default layout), else the plain one. */
    private function notFound(string $slug): void
    {
        $lang = $this->settingsRepository?->get('site_language', 'es') ?? 'es';
        $layout = $this->getDefaultLayout?->execute();
        $hasSession = $this->authManager !== null && $this->authManager->check();
        $assembled = $this->sitePage?->notFound(RenderContext::notFound('/' . $slug, $lang, $hasSession, $layout?->id), $this->footerTree($layout));
        if ($assembled === null || $this->layoutRenderer === null) {
            PublicPageResponses::notFound();
            return;
        }
        http_response_code(404);
        header('Content-Type: text/html; charset=UTF-8');
        echo $this->document($assembled, $layout, PublicPageResponses::meta(['title' => '404'], null, $slug), $lang);
    }

    /** @return list<mixed> */
    private function footerTree(?object $layout): array
    {
        return $layout !== null && is_array($layout->footerTree ?? null) ? array_values($layout->footerTree) : [];
    }

    /** Full document: the header part, or the layout's menu when no header part applies. @param array<string, mixed> $assembled */
    private function document(array $assembled, ?object $layout, array $meta, string $lang): string
    {
        if ($this->layoutRenderer === null) {
            return $assembled['html'];
        }
        $navbarHtml = $assembled['header'] ?? '';
        if (($assembled['header'] ?? null) === null && $layout !== null && ($layout->menuSlug ?? '') !== '' && $this->getNavbar !== null) {
            try {
                $navbarHtml = $this->getNavbar->execute($layout->menuSlug);
            } catch (\Exception) {
                $navbarHtml = '';
            }
        }
        [$headCdn, $bodyCdn] = PublicPageResponses::cdns($layout, $this->settingsRepository);
        return $this->layoutRenderer->render($assembled['html'], $navbarHtml, $assembled['footer'], $layout?->palette ?? [], $meta,
            $layout?->useSystemPalette ?? true, $assembled['css'], $assembled['js'], $lang, $headCdn, $bodyCdn);
    }

    /** @param list<mixed> $footer @return array{html: string, header: ?string, footer: string, css: string, js: string} */
    private function content(array $tree, array $page, RenderContext $request, array $context, array $footer): array
    {
        if ($this->sitePage !== null) {
            return $this->sitePage->page($tree, $page, $request, $footer, $context);
        }
        if ($this->assembler !== null) {
            return ['header' => null] + $this->assembler->assemble($tree, $page, $request->hasSession, null, $context, $footer);
        }
        // Without the assembler (hosts wiring the controller by hand): no design CSS, custom code still applied.
        $code = (new CustomCode($this->settingsRepository))->resolve($page, $request->hasSession);
        return [
            'html' => $this->bladeRenderer->renderPage($tree, $context), 'header' => null,
            'css' => trim($code['globalCss'] . "\n" . $code['pageCss']),
            'js' => trim($code['globalJs'] . ";\n" . $code['pageJs'], ";\n"),
            'footer' => $footer === [] ? '' : $this->bladeRenderer->renderPage($footer, $context),
        ];
    }
}
