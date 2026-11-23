<?php

declare(strict_types=1);

// Pages. Loaded by routes/api.php, which defines $router and $container.

use CeibaCms\Http\Controllers\PageController;

/** @var \CeibaCms\Http\Router $router */
/** @var array<string, mixed> $container */

// ── Page Routes ──────────────────────────────────────────────────────────────
$pageController = new PageController(
    $container['useCases']['listPages'],
    $container['useCases']['getPageById'],
    $container['useCases']['createPage'],
    $container['useCases']['updatePage'],
    $container['useCases']['deletePage'],
    $container['useCases']['publishPage'],
    static fn (): ?string => ($id = $container['auth']->id()) === null ? null : (string) $id,
);

$router->get('/api/pages', fn() => $pageController->index(), 'page.index')->middleware('auth');
$router->post('/api/pages', fn() => $pageController->store(), 'page.store')->middleware('auth', 'csrf');
$router->get('/api/pages/{id}', fn($id) => $pageController->show($id), 'page.show')->middleware('auth');
$router->put('/api/pages/{id}', fn($id) => $pageController->update($id), 'page.update')->middleware('auth', 'csrf');
$router->patch('/api/pages/{id}', fn($id) => $pageController->update($id), 'page.patch')->middleware('auth', 'csrf');
$router->delete('/api/pages/{id}', fn($id) => $pageController->destroy($id), 'page.delete')->middleware('auth', 'csrf');
$router->post('/api/pages/{id}/publish', fn($id) => $pageController->publish($id), 'page.publish')->middleware('auth', 'csrf', 'permission:pages.publish');
