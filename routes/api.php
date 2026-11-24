<?php

declare(strict_types=1);

// HTTP adapter of the module: builds the router and loads each group of routes from routes/api/, in order.
// The public catch-all (routes/api/public.php) MUST stay last.

use CeibaCms\Http\Router;

$container = require __DIR__ . '/../bootstrap.php';

$router = new Router();
$router->aliasMiddleware('auth', fn() => new \CeibaCms\Http\Middleware\AuthMiddleware($container['auth']));
$router->aliasMiddleware('csrf', fn() => new \CeibaCms\Http\Middleware\CsrfMiddleware());
$router->aliasMiddleware('permission', fn() => new \CeibaCms\Http\Middleware\PermissionMiddleware($container['auth'], $container['db']));

foreach (['menus', 'pages', 'catalogue', 'builder', 'builder-revisions', 'builder-preview', 'builder-design', 'builder-media', 'builder-site-parts', 'admin', 'public'] as $group) {
    require __DIR__ . "/api/{$group}.php";
}

return $router;
