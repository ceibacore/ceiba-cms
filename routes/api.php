<?php

declare(strict_types=1);

use LemurCms\Http\Router;
use LemurCms\Http\Controllers\MenuController;
use LemurCms\Http\Controllers\PageController;
use LemurCms\Http\Controllers\PageRenderController;
use LemurCms\Http\Controllers\HomeController;
use LemurCms\Http\Controllers\LayoutController;
use LemurCms\Http\Controllers\ReservedPathController;
use LemurCms\Http\Controllers\CacheController;
use LemurCms\Http\Controllers\TemplateController;
use LemurCms\Http\Controllers\ComponentDefinitionController;

$router = new Router();

$container = require __DIR__ . '/../bootstrap.php';

// ── Menu Routes ──────────────────────────────────────────────────────────────
$menuController = new MenuController(
    $container['useCases']['getNavbar'],
    $container['useCases']['createMenuItem'],
    $container['useCases']['updateMenuItem'],
    $container['useCases']['deleteMenuItem'],
);

$router->get('/api/menus/{slug}', fn($slug) => $menuController->show($slug), 'menu.show');
$router->post('/api/menus/items', fn() => $menuController->store(), 'menu.store');
$router->put('/api/menus/items/{id}', fn($id) => $menuController->update($id), 'menu.update');
$router->delete('/api/menus/items/{id}', fn($id) => $menuController->destroy($id), 'menu.delete');

// ── Page Routes ──────────────────────────────────────────────────────────────
$pageController = new PageController(
    $container['useCases']['listPages'],
    $container['useCases']['getPageById'],
    $container['useCases']['createPage'],
    $container['useCases']['updatePage'],
    $container['useCases']['deletePage'],
    $container['useCases']['publishPage'],
);

$router->get('/api/pages', fn() => $pageController->index(), 'page.index');
$router->post('/api/pages', fn() => $pageController->store(), 'page.store');
$router->get('/api/pages/{id}', fn($id) => $pageController->show($id), 'page.show');
$router->put('/api/pages/{id}', fn($id) => $pageController->update($id), 'page.update');
$router->patch('/api/pages/{id}', fn($id) => $pageController->update($id), 'page.patch');
$router->delete('/api/pages/{id}', fn($id) => $pageController->destroy($id), 'page.delete');
$router->post('/api/pages/{id}/publish', fn($id) => $pageController->publish($id), 'page.publish');

// ── Template Routes ──────────────────────────────────────────────────────────
$templateController = new TemplateController(
    $container['useCases']['listTemplates'],
    $container['useCases']['getTemplateById'],
    $container['useCases']['createTemplate'],
    $container['useCases']['deleteTemplate'],
);

$router->get('/api/templates', fn() => $templateController->index(), 'template.index');
$router->post('/api/templates', fn() => $templateController->store(), 'template.store');
$router->get('/api/templates/{id}', fn($id) => $templateController->show($id), 'template.show');
$router->delete('/api/templates/{id}', fn($id) => $templateController->destroy($id), 'template.destroy');

// ── Component Routes ─────────────────────────────────────────────────────────
$componentController = new ComponentDefinitionController(
    $container['useCases']['listComponentDefinitions'],
);

$router->get('/api/components', fn() => $componentController->index(), 'component.index');

// ── Layout Routes ─────────────────────────────────────────────────────────────
$layoutController = new LayoutController(
    $container['useCases']['listLayouts'],
    $container['useCases']['getLayoutById'],
    $container['useCases']['createLayout'],
    $container['useCases']['updateLayout'],
    $container['useCases']['deleteLayout'],
);

$router->get('/api/layouts', fn() => $layoutController->index(), 'layout.index');
$router->post('/api/layouts', fn() => $layoutController->store(), 'layout.store');
$router->get('/api/layouts/{id}', fn($id) => $layoutController->show($id), 'layout.show');
$router->put('/api/layouts/{id}', fn($id) => $layoutController->update($id), 'layout.update');
$router->delete('/api/layouts/{id}', fn($id) => $layoutController->destroy($id), 'layout.destroy');

// ── Reserved Paths Routes ─────────────────────────────────────────────────────
$reservedController = new ReservedPathController(
    $container['useCases']['listReservedPaths'],
    $container['useCases']['addReservedPath'],
    $container['useCases']['removeReservedPath'],
    $container['reservedPathChecker'],
);

$router->get('/api/reserved-paths', fn() => $reservedController->index(), 'reserved.index');
$router->post('/api/reserved-paths', fn() => $reservedController->store(), 'reserved.store');
$router->delete('/api/reserved-paths/{id}', fn($id) => $reservedController->destroy($id), 'reserved.destroy');

// ── Cache Routes ─────────────────────────────────────────────────────────────
$cacheController = new CacheController($container['presentation']['menuCache']);

$router->post('/api/cache/clear', fn() => $cacheController->clear(), 'cache.clear');
$router->post('/api/cache/menus/{slug}/clear', fn($slug) => $cacheController->clearMenu($slug), 'cache.menu.clear');

// ── Public Routing — Home ────────────────────────────────────────────────────
$pageRenderController = new PageRenderController(
    $container['useCases']['getPageBySlug'],
    $container['bladeRenderer'],
    $container['useCases']['getLayoutById'],
    $container['useCases']['getDefaultLayout'],
    $container['layoutRenderer'],
    $container['useCases']['getNavbar'],
);

$homeController = new HomeController(
    $container['useCases']['getPageBySlug'],
    $pageRenderController,
);

$router->get('/', fn() => $homeController->index(), 'home');

// ── Public Routing — Catch-all (MUST BE LAST) ────────────────────────────────
$router->get('/{path}', function (string $path) use ($pageRenderController, $container) {
    /** @var \LemurCms\Routing\Domain\Service\ReservedPathChecker $checker */
    $checker = $container['reservedPathChecker'];
    if ($checker->isReserved($path)) {
        http_response_code(404);
        echo "<h1>404 — Not Found</h1>";
        return;
    }
    $pageRenderController->show($path);
}, 'page.public');

return $router;


// ── Menu Routes ──────────────────────────────────────────────────────────────
$menuController = new MenuController(
    $container['useCases']['getNavbar'],
    $container['useCases']['createMenuItem'],
    $container['useCases']['updateMenuItem'],
    $container['useCases']['deleteMenuItem'],
);

$router->get('/api/menus/{slug}', fn($slug) => $menuController->show($slug), 'menu.show');
$router->post('/api/menus/items', fn() => $menuController->store(), 'menu.store');
$router->put('/api/menus/items/{id}', fn($id) => $menuController->update($id), 'menu.update');
$router->delete('/api/menus/items/{id}', fn($id) => $menuController->destroy($id), 'menu.delete');

// ── Page Routes ──────────────────────────────────────────────────────────────
$pageController = new PageController(
    $container['useCases']['listPages'],
    $container['useCases']['getPageById'],
    $container['useCases']['createPage'],
    $container['useCases']['updatePage'],
    $container['useCases']['deletePage'],
    $container['useCases']['publishPage'],
);

$router->get('/api/pages', fn() => $pageController->index(), 'page.index');
$router->post('/api/pages', fn() => $pageController->store(), 'page.store');
$router->get('/api/pages/{id}', fn($id) => $pageController->show($id), 'page.show');
$router->put('/api/pages/{id}', fn($id) => $pageController->update($id), 'page.update');
$router->patch('/api/pages/{id}', fn($id) => $pageController->update($id), 'page.patch');
$router->delete('/api/pages/{id}', fn($id) => $pageController->destroy($id), 'page.delete');
$router->post('/api/pages/{id}/publish', fn($id) => $pageController->publish($id), 'page.publish');

$pageRenderController = new PageRenderController(
    $container['useCases']['getPageBySlug'],
    $container['bladeRenderer']
);

$router->get('/pages/{slug}', fn($slug) => $pageRenderController->show($slug), 'page.render');

// ── Template Routes ──────────────────────────────────────────────────────────
$templateController = new TemplateController(
    $container['useCases']['listTemplates'],
    $container['useCases']['getTemplateById'],
    $container['useCases']['createTemplate'],
    $container['useCases']['deleteTemplate'],
);

$router->get('/api/templates', fn() => $templateController->index(), 'template.index');
$router->post('/api/templates', fn() => $templateController->store(), 'template.store');
$router->get('/api/templates/{id}', fn($id) => $templateController->show($id), 'template.show');
$router->delete('/api/templates/{id}', fn($id) => $templateController->destroy($id), 'template.destroy');

// ── Component Routes ─────────────────────────────────────────────────────────
$componentController = new ComponentDefinitionController(
    $container['useCases']['listComponentDefinitions'],
);

$router->get('/api/components', fn() => $componentController->index(), 'component.index');

// ── Cache Routes ─────────────────────────────────────────────────────────────
$cacheController = new CacheController($container['presentation']['menuCache']);

$router->post('/api/cache/clear', fn() => $cacheController->clear(), 'cache.clear');
$router->post('/api/cache/menus/{slug}/clear', fn($slug) => $cacheController->clearMenu($slug), 'cache.menu.clear');

return $router;
