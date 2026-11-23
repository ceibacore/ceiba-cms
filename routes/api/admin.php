<?php

declare(strict_types=1);

// Layouts, reserved paths, cache, import, settings and languages. Loaded by routes/api.php, which defines $router and $container.

use CeibaCms\Http\Controllers\LayoutController;
use CeibaCms\Http\Controllers\ReservedPathController;
use CeibaCms\Http\Controllers\CacheController;
use CeibaCms\Http\Controllers\SettingsController;
use CeibaCms\Http\Controllers\LanguageController;

/** @var \CeibaCms\Http\Router $router */
/** @var array<string, mixed> $container */

// ── Layout Routes ─────────────────────────────────────────────────────────────
$layoutController = new LayoutController(
    $container['useCases']['listLayouts'],
    $container['useCases']['getLayoutById'],
    $container['useCases']['createLayout'],
    $container['useCases']['updateLayout'],
    $container['useCases']['deleteLayout'],
);

$router->get('/api/layouts', fn() => $layoutController->index(), 'layout.index')->middleware('auth');
$router->post('/api/layouts', fn() => $layoutController->store(), 'layout.store')->middleware('auth', 'csrf');
$router->get('/api/layouts/{id}', fn($id) => $layoutController->show($id), 'layout.show')->middleware('auth');
$router->put('/api/layouts/{id}', fn($id) => $layoutController->update($id), 'layout.update')->middleware('auth', 'csrf');
$router->delete('/api/layouts/{id}', fn($id) => $layoutController->destroy($id), 'layout.destroy')->middleware('auth', 'csrf');

// ── Reserved Paths Routes ─────────────────────────────────────────────────────
$reservedController = new ReservedPathController(
    $container['useCases']['listReservedPaths'],
    $container['useCases']['addReservedPath'],
    $container['useCases']['removeReservedPath'],
    $container['reservedPathChecker'],
);

$router->get('/api/reserved-paths', fn() => $reservedController->index(), 'reserved.index')->middleware('auth');
$router->post('/api/reserved-paths', fn() => $reservedController->store(), 'reserved.store')->middleware('auth', 'csrf');
$router->delete('/api/reserved-paths/{id}', fn($id) => $reservedController->destroy($id), 'reserved.destroy')->middleware('auth', 'csrf');

// ── Cache Routes ─────────────────────────────────────────────────────────────
$cacheController = new CacheController($container['presentation']['menuCache']);

$router->post('/api/cache/clear', fn() => $cacheController->clear(), 'cache.clear')->middleware('auth', 'csrf');
$router->post('/api/cache/menus/{slug}/clear', fn($slug) => $cacheController->clearMenu($slug), 'cache.menu.clear')->middleware('auth', 'csrf');

// ── Import Routes ─────────────────────────────────────────────────────────────
$importController = new \CeibaCms\Http\Controllers\ImportController($container['uiFrameworkRegistry'] ?? null);
$router->post('/api/import/html', fn() => $importController->importHtml(), 'import.html')->middleware('auth', 'csrf');
$router->post('/api/import/html/preview', fn() => $importController->previewHtml(), 'import.html.preview')->middleware('auth', 'csrf');

// ── Settings Routes ───────────────────────────────────────────────────────────
$settingsController = new SettingsController(
    $container['repositories']['settings'],
);

$router->get('/api/settings', fn() => $settingsController->index(), 'settings.index')->middleware('auth');
$router->put('/api/settings', fn() => $settingsController->update(), 'settings.update')->middleware('auth', 'csrf');

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
$router->post('/api/languages', fn() => $languageController->store(), 'languages.store')->middleware('auth', 'csrf');
$router->put('/api/languages/{id}', fn($id) => $languageController->update($id), 'languages.update')->middleware('auth', 'csrf');
$router->delete('/api/languages/{id}', fn($id) => $languageController->destroy($id), 'languages.delete')->middleware('auth', 'csrf');
$router->get('/api/languages/{id}/translations', fn($id) => $languageController->showTranslations($id), 'languages.translations.show')->middleware('auth');
$router->put('/api/languages/{id}/translations', fn($id) => $languageController->saveTranslations($id), 'languages.translations.save')->middleware('auth', 'csrf');
