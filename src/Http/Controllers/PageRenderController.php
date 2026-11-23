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
use CeibaCms\PageBuilder\Domain\Service\QueryEngine;
use CeibaCms\Seo\Domain\Repository\SeoRepositoryInterface;
use CeibaCms\Settings\Domain\Repository\SettingsRepositoryInterface;

/**
 * Public page of the module's own HTTP adapter. Content, design CSS and custom code come from PageAssembler
 * (plan 04-B), the same pieces every host uses.
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
        private readonly ?QueryEngine         $queryEngine = null,
        private readonly ?AuthManager                     $authManager        = null,
        private readonly ?SettingsRepositoryInterface     $settingsRepository = null,
        private readonly ?SeoRepositoryInterface          $seoRepository      = null,
        private readonly ?PageAssembler                   $assembler          = null,
    ) {}

    public function show(string $slug): void
    {
        try {
            $page = $this->getPageBySlug->execute($slug);
            if ($page === null || ($page['status'] ?? '') !== 'published') {
                PublicPageResponses::notFound();
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

            // 2. Dynamic queries and context.
            $context = [];
            if ($this->queryEngine !== null && !empty($page['query_config'])) {
                $context = $this->queryEngine->executeQueries($page['query_config'], ['slug' => $slug]);
            }

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
            [$contentHtml, $css, $js] = $this->content(is_array($tree) ? $tree : [], $page, $hasSession, $context);

            $footerHtml = '';
            $navbarHtml = '';
            if ($layout !== null) {
                if (!empty($layout->footerTree)) {
                    $footerHtml = $this->bladeRenderer->renderPage($layout->footerTree, $context);
                }
                if ($layout->menuSlug !== null && $layout->menuSlug !== '' && $this->getNavbar !== null) {
                    try {
                        $navbarHtml = $this->getNavbar->execute($layout->menuSlug);
                    } catch (\Exception) {
                        $navbarHtml = '';
                    }
                }
            }

            $seo = ($this->seoRepository !== null && isset($page['id']))
                ? $this->seoRepository->findByEntity('page', (string) $page['id']) : null;
            $lang = $this->settingsRepository?->get('site_language', 'es') ?? 'es';
            [$headCdn, $bodyCdn] = PublicPageResponses::cdns($layout, $this->settingsRepository);

            $fullHtml = $this->layoutRenderer === null ? $contentHtml : $this->layoutRenderer->render(
                $contentHtml, $navbarHtml, $footerHtml, $layout?->palette ?? [], PublicPageResponses::meta($page, $seo, $slug),
                $layout?->useSystemPalette ?? true, $css, $js, $lang, $headCdn, $bodyCdn,
            );

            header('Content-Type: text/html; charset=UTF-8');
            echo $fullHtml;
        } catch (\Exception $e) {
            http_response_code(500);
            header('Content-Type: text/html; charset=UTF-8');
            echo '<h1>Error rendering page</h1><p>' . htmlspecialchars($e->getMessage()) . '</p>';
        }
    }

    /** @return array{0: string, 1: string, 2: string} html, css, js */
    private function content(array $tree, array $page, bool $hasSession, array $context): array
    {
        if ($this->assembler !== null) {
            $assembled = $this->assembler->assemble($tree, $page, $hasSession, null, $context);
            return [$assembled['html'], $assembled['css'], $assembled['js']];
        }
        // Without the assembler (hosts wiring the controller by hand): no design CSS, custom code still applied.
        $code = (new CustomCode($this->settingsRepository))->resolve($page, $hasSession);
        return [
            $this->bladeRenderer->renderPage($tree, $context),
            trim($code['globalCss'] . "\n" . $code['pageCss']),
            trim($code['globalJs'] . ";\n" . $code['pageJs'], ";\n"),
        ];
    }
}
