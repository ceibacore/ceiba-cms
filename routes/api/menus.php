<?php

declare(strict_types=1);

// Menus. Loaded by routes/api.php, which defines $router and $container.

use CeibaCms\Http\Controllers\MenuController;

/** @var \CeibaCms\Http\Router $router */
/** @var array<string, mixed> $container */

// ── Menu Routes ──────────────────────────────────────────────────────────────
$menuController = new MenuController(
    $container['useCases']['getNavbar'],
    $container['useCases']['createMenuItem'],
    $container['useCases']['updateMenuItem'],
    $container['useCases']['deleteMenuItem'],
);

$router->get('/api/menus/{slug}', fn($slug) => $menuController->show($slug), 'menu.show')->middleware('auth');
$router->post('/api/menus/items', fn() => $menuController->store(), 'menu.store')->middleware('auth', 'csrf');
$router->put('/api/menus/items/{id}', fn($id) => $menuController->update($id), 'menu.update')->middleware('auth', 'csrf');
$router->delete('/api/menus/items/{id}', fn($id) => $menuController->destroy($id), 'menu.delete')->middleware('auth', 'csrf');
