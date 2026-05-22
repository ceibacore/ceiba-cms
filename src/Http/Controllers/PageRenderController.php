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
        private readonly GetLayoutById        $getLayoutById,
        private readonly GetDefaultLayout     $getDefaultLayout,
        private readonly LayoutRenderer       $layoutRenderer,
        private readonly GetNavbar            $getNavbar,
    ) {}

    public function show(string $slug): void
    {
        try {
            $page = $this->getPageBySlug->execute($slug);

            if ($page === null || ($page['status'] ?? '') !== 'published') {
                $this->render404();
                return;
            }

            // Resolve layout
            $layoutId = $page['layout_id'] ?? null;
            $layout   = ($layoutId ? $this->getLayoutById->execute($layoutId) : null)
                     ?? $this->getDefaultLayout->execute();

            $contentHtml = $this->bladeRenderer->renderPage($page['content'] ?? []);

            $footerHtml = '';
            $navbarHtml = '';

            if ($layout !== null) {
                if (!empty($layout->footerTree)) {
                    $footerHtml = $this->bladeRenderer->renderPage($layout->footerTree);
                }
                if ($layout->menuSlug !== null && $layout->menuSlug !== '') {
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

            $fullHtml = $this->layoutRenderer->render(
                $contentHtml,
                $navbarHtml,
                $footerHtml,
                $palette,
                $pageMeta,
                $useSystemPalette,
            );

            header('Content-Type: text/html; charset=UTF-8');
            echo $fullHtml;

        } catch (\Exception $e) {
            http_response_code(500);
            header('Content-Type: text/html; charset=UTF-8');
            echo "<h1>Error rendering page</h1><p>" . htmlspecialchars($e->getMessage()) . "</p>";
        }
    }

    private function render404(): void
    {
        http_response_code(404);
        header('Content-Type: text/html; charset=UTF-8');
        echo "<h1>404 — Page Not Found</h1>";
    }
}
