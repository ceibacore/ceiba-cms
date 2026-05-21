<?php
declare(strict_types=1);

namespace LemurCms\Http\Controllers;

use LemurCms\Page\Application\GetPageBySlug;
use LemurCms\PageBuilder\Domain\Service\BladeRendererInterface;

class PageRenderController extends BaseController
{
    public function __construct(
        private readonly GetPageBySlug $getPageBySlug,
        private readonly BladeRendererInterface $bladeRenderer
    ) {}

    public function show(string $slug): void
    {
        try {
            $page = $this->getPageBySlug->execute($slug);
            if ($page === null || ($page['status'] ?? '') !== 'published') {
                http_response_code(404);
                header('Content-Type: text/html; charset=UTF-8');
                echo "<h1>Page Not Found</h1>";
                return;
            }

            $html = $this->bladeRenderer->renderPage($page['content'] ?? []);
            header('Content-Type: text/html; charset=UTF-8');
            echo $html;
        } catch (\Exception $e) {
            http_response_code(500);
            header('Content-Type: text/html; charset=UTF-8');
            echo "<h1>Error rendering page</h1><p>" . htmlspecialchars($e->getMessage()) . "</p>";
        }
    }
}
