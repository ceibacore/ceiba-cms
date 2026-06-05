<?php
declare(strict_types=1);

namespace LemurCms\Http\Controllers;

use LemurCms\Page\Application\GetPageBySlug;
use LemurCms\PageBuilder\Application\GetLayoutById;
use LemurCms\PageBuilder\Application\GetDefaultLayout;
use LemurCms\PageBuilder\Domain\Service\BladeRendererInterface;
use LemurCms\PageBuilder\Domain\Service\LayoutRenderer;
use LemurCms\Menu\Application\GetNavbar;

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

            $pageMeta = [
                'title'       => $page['title'] ?? '',
                'description' => $page['meta_description'] ?? '',
                'slug'        => $page['slug'] ?? $slug,
            ];

            if ($this->layoutRenderer !== null) {
                $fullHtml = $this->layoutRenderer->render(
                    $contentHtml,
                    $navbarHtml,
                    $footerHtml,
                    $palette,
                    $pageMeta,
                    $useSystemPalette,
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
