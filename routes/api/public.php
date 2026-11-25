<?php

declare(strict_types=1);

// Public routing (home and catch-all, which MUST stay last). Loaded by routes/api.php, which defines $router and $container.

use CeibaCms\Http\Controllers\PageRenderController;
use CeibaCms\Http\Controllers\HomeController;

/** @var \CeibaCms\Http\Router $router */
/** @var array<string, mixed> $container */

// ── Public Routing — Home ────────────────────────────────────────────────────
$pageRenderController = new PageRenderController(
    $container['useCases']['getPageBySlug'],
    $container['bladeRenderer'],
    $container['useCases']['getLayoutById'],
    $container['useCases']['getDefaultLayout'],
    $container['layoutRenderer'],
    $container['useCases']['getNavbar'],
    $container['useCases']['getPageTemplateById'],
    $container['conditionEngine'],
    $container['auth'],
    $container['repositories']['settings'],
    $container['repositories']['seo'],
    $container['services']['pageAssembler'] ?? null,
    $container['services']['assembleSitePage'] ?? null,
);

$homeController = new HomeController(
    $container['useCases']['getPageBySlug'],
    $pageRenderController,
);

$router->get('/', fn() => $homeController->index(), 'home');

// ── Public Routing — Catch-all (MUST BE LAST) ────────────────────────────────
$router->get('/{path}', function (string $path) use ($pageRenderController, $container) {
    /** @var \CeibaCms\Routing\Domain\Service\ReservedPathChecker $checker */
    $checker = $container['reservedPathChecker'];
    if ($checker->isReserved($path)) {
        http_response_code(404);
        echo "<h1>404 — Not Found</h1>";
        return;
    }
    $pageRenderController->show($path);
}, 'page.public');
