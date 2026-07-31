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
use LemurCms\Http\Controllers\PageBuilderMetadataController;
use LemurCms\Http\Controllers\SettingsController;
use LemurCms\Http\Controllers\LanguageController;

$container = require __DIR__ . '/../bootstrap.php';

$router = new Router();
$router->aliasMiddleware('auth', fn() => new \LemurCms\Http\Middleware\AuthMiddleware($container['auth']));

// ── Menu Routes ──────────────────────────────────────────────────────────────
$menuController = new MenuController(
    $container['useCases']['getNavbar'],
    $container['useCases']['createMenuItem'],
    $container['useCases']['updateMenuItem'],
    $container['useCases']['deleteMenuItem'],
);

$router->get('/api/menus/{slug}', fn($slug) => $menuController->show($slug), 'menu.show')->middleware('auth');
$router->post('/api/menus/items', fn() => $menuController->store(), 'menu.store')->middleware('auth');
$router->put('/api/menus/items/{id}', fn($id) => $menuController->update($id), 'menu.update')->middleware('auth');
$router->delete('/api/menus/items/{id}', fn($id) => $menuController->destroy($id), 'menu.delete')->middleware('auth');

// ── Page Routes ──────────────────────────────────────────────────────────────
$pageController = new PageController(
    $container['useCases']['listPages'],
    $container['useCases']['getPageById'],
    $container['useCases']['createPage'],
    $container['useCases']['updatePage'],
    $container['useCases']['deletePage'],
    $container['useCases']['publishPage'],
);

$router->get('/api/pages', fn() => $pageController->index(), 'page.index')->middleware('auth');
$router->post('/api/pages', fn() => $pageController->store(), 'page.store')->middleware('auth');
$router->get('/api/pages/{id}', fn($id) => $pageController->show($id), 'page.show')->middleware('auth');
$router->put('/api/pages/{id}', fn($id) => $pageController->update($id), 'page.update')->middleware('auth');
$router->patch('/api/pages/{id}', fn($id) => $pageController->update($id), 'page.patch')->middleware('auth');
$router->delete('/api/pages/{id}', fn($id) => $pageController->destroy($id), 'page.delete')->middleware('auth');
$router->post('/api/pages/{id}/publish', fn($id) => $pageController->publish($id), 'page.publish')->middleware('auth');

// ── Template Routes ──────────────────────────────────────────────────────────
$templateController = new TemplateController(
    $container['useCases']['listTemplates'],
    $container['useCases']['getTemplateById'],
    $container['useCases']['createTemplate'],
    $container['useCases']['deleteTemplate'],
);

$router->get('/api/templates', fn() => $templateController->index(), 'template.index')->middleware('auth');
$router->post('/api/templates', fn() => $templateController->store(), 'template.store')->middleware('auth');
$router->get('/api/templates/{id}', fn($id) => $templateController->show($id), 'template.show')->middleware('auth');
$router->delete('/api/templates/{id}', fn($id) => $templateController->destroy($id), 'template.destroy')->middleware('auth');

// ── Component Routes ─────────────────────────────────────────────────────────
$componentController = new ComponentDefinitionController(
    $container['useCases']['listComponentDefinitions'],
);

$router->get('/api/components', fn() => $componentController->index(), 'component.index')->middleware('auth');

// ── PageBuilder Metadata / Rules Routes ──────────────────────────────────────
$pageBuilderMetadataController = new PageBuilderMetadataController(
    $container['pageBuilderMetadataService']
);

$router->get('/api/pagebuilder/rules', fn() => $pageBuilderMetadataController->rules(), 'pagebuilder.rules')->middleware('auth');

// ── Layout Routes ─────────────────────────────────────────────────────────────
$layoutController = new LayoutController(
    $container['useCases']['listLayouts'],
    $container['useCases']['getLayoutById'],
    $container['useCases']['createLayout'],
    $container['useCases']['updateLayout'],
    $container['useCases']['deleteLayout'],
);

$router->get('/api/layouts', fn() => $layoutController->index(), 'layout.index')->middleware('auth');
$router->post('/api/layouts', fn() => $layoutController->store(), 'layout.store')->middleware('auth');
$router->get('/api/layouts/{id}', fn($id) => $layoutController->show($id), 'layout.show')->middleware('auth');
$router->put('/api/layouts/{id}', fn($id) => $layoutController->update($id), 'layout.update')->middleware('auth');
$router->delete('/api/layouts/{id}', fn($id) => $layoutController->destroy($id), 'layout.destroy')->middleware('auth');

// ── Reserved Paths Routes ─────────────────────────────────────────────────────
$reservedController = new ReservedPathController(
    $container['useCases']['listReservedPaths'],
    $container['useCases']['addReservedPath'],
    $container['useCases']['removeReservedPath'],
    $container['reservedPathChecker'],
);

$router->get('/api/reserved-paths', fn() => $reservedController->index(), 'reserved.index')->middleware('auth');
$router->post('/api/reserved-paths', fn() => $reservedController->store(), 'reserved.store')->middleware('auth');
$router->delete('/api/reserved-paths/{id}', fn($id) => $reservedController->destroy($id), 'reserved.destroy')->middleware('auth');

// ── Cache Routes ─────────────────────────────────────────────────────────────
$cacheController = new CacheController($container['presentation']['menuCache']);

$router->post('/api/cache/clear', fn() => $cacheController->clear(), 'cache.clear')->middleware('auth');
$router->post('/api/cache/menus/{slug}/clear', fn($slug) => $cacheController->clearMenu($slug), 'cache.menu.clear')->middleware('auth');

// ── Import Routes ─────────────────────────────────────────────────────────────
$importController = new \LemurCms\Http\Controllers\ImportController($container['uiFrameworkRegistry'] ?? null);
$router->post('/api/import/html', fn() => $importController->importHtml(), 'import.html')->middleware('auth');
$router->post('/api/import/html/preview', fn() => $importController->previewHtml(), 'import.html.preview')->middleware('auth');

// ── Settings Routes ───────────────────────────────────────────────────────────
$settingsController = new SettingsController(
    $container['repositories']['settings'],
);

$router->get('/api/settings', fn() => $settingsController->index(), 'settings.index')->middleware('auth');
$router->put('/api/settings', fn() => $settingsController->update(), 'settings.update')->middleware('auth');

// ── Language & Translation Routes ─────────────────────────────────────────────
$languageController = new LanguageController(
    $container['useCases']['listLanguages'],
    $container['useCases']['createLanguage'],
    $container['useCases']['updateLanguage'],
    $container['useCases']['deleteLanguage'],
    $container['useCases']['listTranslations'],
    $container['useCases']['updateTranslations'],
);

$router->get('/api/languages', fn() => $languageController->index(), 'languages.index')->middleware('auth');
$router->post('/api/languages', fn() => $languageController->store(), 'languages.store')->middleware('auth');
$router->put('/api/languages/{id}', fn($id) => $languageController->update($id), 'languages.update')->middleware('auth');
$router->delete('/api/languages/{id}', fn($id) => $languageController->destroy($id), 'languages.delete')->middleware('auth');
$router->get('/api/languages/{id}/translations', fn($id) => $languageController->showTranslations($id), 'languages.translations.show')->middleware('auth');
$router->put('/api/languages/{id}/translations', fn($id) => $languageController->saveTranslations($id), 'languages.translations.save')->middleware('auth');

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
    $container['queryEngine'],
    $container['auth'],
    $container['repositories']['settings'],
    $container['repositories']['seo'],
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

