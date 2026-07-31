<?php
declare(strict_types=1);

namespace LemurCms\Http\Controllers;

use LemurCms\Page\Application\GetPageBySlug;
use LemurCms\PageBuilder\Application\GetLayoutById;
use LemurCms\PageBuilder\Application\GetDefaultLayout;
use LemurCms\PageBuilder\Domain\Service\BladeRendererInterface;
use LemurCms\PageBuilder\Domain\Service\LayoutRenderer;
use LemurCms\Menu\Application\GetNavbar;
use LemurCms\Auth\AuthManager;
use LemurCms\Settings\Domain\Repository\SettingsRepositoryInterface;
use LemurCms\Seo\Domain\Repository\SeoRepositoryInterface;
use LemurCms\PageBuilder\Application\GetPageTemplateById;

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
        private readonly ?\LemurCms\PageBuilder\Domain\Service\ConditionEngine $conditionEngine = null,
        private readonly ?\LemurCms\PageBuilder\Domain\Service\QueryEngine $queryEngine = null,
        private readonly ?AuthManager                     $authManager        = null,
        private readonly ?SettingsRepositoryInterface     $settingsRepository = null,
        private readonly ?SeoRepositoryInterface          $seoRepository      = null,
    ) {}

    public function show(string $slug): void
    {
        try {
            $page = $this->getPageBySlug->execute($slug);

            if ($page === null || ($page['status'] ?? '') !== 'published') {
                $this->render404();
                return;
            }

            // 1. Evaluate Conditions (V2)
            if ($this->conditionEngine !== null && !empty($page['conditions'])) {
                $failed = $this->conditionEngine->evaluateConditions($page['conditions']);
                if ($failed !== null) {
                    $this->handleFallback($failed['fallback'] ?? []);
                    return;
                }
            }

            // 2. Resolve Dynamic Queries & Context (V2)
            $context = [];
            if ($this->queryEngine !== null && !empty($page['query_config'])) {
                $routeParams = ['slug' => $slug];
                $context = $this->queryEngine->executeQueries($page['query_config'], $routeParams);
            }

            // Resolve layout
            $layout = null;
            if ($this->getLayoutById !== null && $this->getDefaultLayout !== null) {
                $layoutId = $page['layout_id'] ?? null;
                $layout   = ($layoutId ? $this->getLayoutById->execute($layoutId) : null)
                         ?? $this->getDefaultLayout->execute();
            }

            // 3. Resolve Page Templates & Slots (V2)
            $vdomTree = $page['content'] ?? [];
            $templateId = $page['template_id'] ?? null;
            if ($templateId !== null && $this->getPageTemplateById !== null) {
                $template = $this->getPageTemplateById->execute($templateId);
                if ($template !== null && !empty($template['tree'])) {
                    if (method_exists($this->bladeRenderer, 'mergeTemplateAndPage')) {
                        $vdomTree = $this->bladeRenderer->mergeTemplateAndPage($template['tree'], $vdomTree);
                    }
                }
            }

            $contentHtml = $this->bladeRenderer->renderPage($vdomTree, $context);

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

            $palette          = $layout?->palette ?? [];
            $useSystemPalette = $layout?->useSystemPalette ?? true;

            // Resolve SEO Metadata from polymorphic table
            $seoData = null;
            if ($this->seoRepository !== null && isset($page['id'])) {
                $seoData = $this->seoRepository->findByEntity('page', (string)$page['id']);
            }

            $pageMeta = [
                'title'            => $seoData['meta_title']       ?? $page['title']            ?? '',
                'description'      => $seoData['meta_description'] ?? $page['meta_description']   ?? '',
                'slug'             => $page['slug']                ?? $slug,
                'canonical_url'    => $seoData['canonical_url']    ?? null,
                'robots'           => $seoData['robots']           ?? 'index,follow',
                'og_title'         => $seoData['og_title']         ?? null,
                'og_description'   => $seoData['og_description']   ?? null,
                'og_image'         => $seoData['og_image']         ?? null,
                'schema_json'      => $seoData['schema_json']      ?? null,
            ];

            // Resolve Language from Settings
            $lang = 'es';
            if ($this->settingsRepository !== null) {
                $lang = $this->settingsRepository->get('site_language', 'es') ?? 'es';
            }

            // Resolve CDN Assets from Layout (with Global Fallbacks)
            $layoutHeadCdn = $layout?->headCdn ?? null;
            $layoutBodyCdn = $layout?->bodyCdn ?? null;

            $globalHeadCdn = null;
            $globalBodyCdn = null;
            if ($this->settingsRepository !== null) {
                $globalHeadCdn = $this->settingsRepository->get('global_head_cdn', null);
                $globalBodyCdn = $this->settingsRepository->get('global_body_cdn', null);
            }

            $headCdn = ($layoutHeadCdn !== null && trim($layoutHeadCdn) !== '') ? $layoutHeadCdn : $globalHeadCdn;
            $bodyCdn = ($layoutBodyCdn !== null && trim($layoutBodyCdn) !== '') ? $layoutBodyCdn : $globalBodyCdn;

            // 4. Resolve Custom CSS/JS (session-aware, global + page-level)
            [$customCss, $customJs] = $this->resolveCustomCode($page);

            if ($this->layoutRenderer !== null) {
                $fullHtml = $this->layoutRenderer->render(
                    $contentHtml,
                    $navbarHtml,
                    $footerHtml,
                    $palette,
                    $pageMeta,
                    $useSystemPalette,
                    $customCss,
                    $customJs,
                    $lang,
                    $headCdn,
                    $bodyCdn,
                );
            } else {
                $fullHtml = $contentHtml;
            }

            header('Content-Type: text/html; charset=UTF-8');
            echo $fullHtml;

        } catch (\Exception $e) {
            http_response_code(500);
            header('Content-Type: text/html; charset=UTF-8');
            echo "<h1>Error rendering page</h1><p>" . htmlspecialchars($e->getMessage()) . "</p>";
        }
    }

    /**
     * Resolve and merge custom CSS/JS for the current request.
     *
     * Priority order (all appended, later overrides earlier):
     *   1. Global CSS/JS (no-session or with-session depending on visitor state)
     *   2. Page-level CSS/JS (no-session or with-session depending on visitor state)
     *
     * @param array $page The page record from the database.
     * @return array{0: string, 1: string} [$css, $js]
     */
    private function resolveCustomCode(array $page): array
    {
        if ($this->settingsRepository === null) {
            return ['', ''];
        }

        $hasSession = $this->authManager !== null && $this->authManager->check();

        // ── Global custom code ──────────────────────────────────────────────
        if ($hasSession) {
            $globalCss = $this->settingsRepository->get('custom_css_global_session', '');
            $globalJs  = $this->settingsRepository->get('custom_js_global_session', '');
        } else {
            $globalCss = $this->settingsRepository->get('custom_css_global_no_session', '');
            $globalJs  = $this->settingsRepository->get('custom_js_global_no_session', '');
        }

        // ── Page-level custom code ──────────────────────────────────────────
        if ($hasSession) {
            $pageCss = $page['custom_css_session']    ?? '';
            $pageJs  = $page['custom_js_session']     ?? '';
        } else {
            $pageCss = $page['custom_css_no_session'] ?? '';
            $pageJs  = $page['custom_js_no_session']  ?? '';
        }

        // Merge: global first, then page-level so page styles can override
        $mergedCss = trim(($globalCss ?? '') . "\n" . ($pageCss ?? ''));
        $mergedJs  = trim(($globalJs  ?? '') . "\n" . ($pageJs  ?? ''));

        return [$mergedCss, $mergedJs];
    }

    private function handleFallback(array $fallback): void
    {
        $action = $fallback['action'] ?? 'abort';
        switch ($action) {
            case 'redirect':
                header('Location: ' . ($fallback['to'] ?? '/'));
                break;
            case 'json':
                http_response_code($fallback['status'] ?? 401);
                header('Content-Type: application/json');
                echo json_encode($fallback['body'] ?? ['error' => 'Unauthorized']);
                break;
            case 'abort':
            default:
                http_response_code($fallback['status'] ?? 403);
                header('Content-Type: text/html; charset=UTF-8');
                echo "<h1>" . htmlspecialchars($fallback['message'] ?? 'Acceso Denegado') . "</h1>";
                break;
        }
    }

    private function render404(): void
    {
        http_response_code(404);
        header('Content-Type: text/html; charset=UTF-8');
        echo "<h1>404 — Page Not Found</h1>";
    }
}
