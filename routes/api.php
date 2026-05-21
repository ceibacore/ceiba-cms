<?php

declare(strict_types=1);

/**
 * API Routes - Lemur CMS
 * 
 * RESTful API endpoints para gestión de contenido
 */

use LemurCms\Http\Router;
use LemurCms\Http\Controllers\MenuController;
use LemurCms\Http\Controllers\PageController;
use LemurCms\Http\Controllers\PageRenderController;
use LemurCms\Http\Controllers\CacheController;
use LemurCms\Http\Controllers\TemplateController;
use LemurCms\Http\Controllers\ComponentDefinitionController;

$router = new Router();

// Inyectar container
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
