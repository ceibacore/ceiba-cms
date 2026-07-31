<?php
declare(strict_types=1);

namespace LemurCms\Http\Controllers;

use LemurCms\Page\Application\GetPageBySlug;

class HomeController extends BaseController
{
    /** Slug candidates tried in order for the home page. */
    private const HOME_SLUGS = ['home', 'inicio', 'index'];

    public function __construct(
        private readonly GetPageBySlug        $getPageBySlug,
        private readonly PageRenderController $pageRender,
    ) {}

    public function index(): void
    {
        foreach (self::HOME_SLUGS as $slug) {
            $page = $this->getPageBySlug->execute($slug);
            if ($page !== null && ($page['status'] ?? '') === 'published') {
                $this->pageRender->show($slug);
                return;
            }
        }

        // No home page configured — render a minimal welcome screen
        http_response_code(200);
        header('Content-Type: text/html; charset=UTF-8');
        echo <<<HTML
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bienvenido</title>
        </head>
        <body>
            <main style="font-family:sans-serif;max-width:640px;margin:4rem auto;text-align:center;">
                <h1>Sitio en construcción</h1>
                <p>Configura una página con slug <code>home</code> para mostrarla aquí.</p>
            </main>
        </body>
        </html>
        HTML;
    }
}
