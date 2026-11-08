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
$router->aliasMiddleware('csrf', fn() => new \LemurCms\Http\Middleware\CsrfMiddleware());
$router->aliasMiddleware('permission', fn() => new \LemurCms\Http\Middleware\PermissionMiddleware($container['auth'], $container['db']));

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

// ── Template Routes ──────────────────────────────────────────────────────────
$templateController = new TemplateController(
    $container['useCases']['listTemplates'],
    $container['useCases']['getTemplateById'],
    $container['useCases']['createTemplate'],
    $container['useCases']['deleteTemplate'],
);

$router->get('/api/templates', fn() => $templateController->index(), 'template.index')->middleware('auth');
$router->post('/api/templates', fn() => $templateController->store(), 'template.store')->middleware('auth', 'csrf');
$router->get('/api/templates/{id}', fn($id) => $templateController->show($id), 'template.show')->middleware('auth');
$router->delete('/api/templates/{id}', fn($id) => $templateController->destroy($id), 'template.destroy')->middleware('auth', 'csrf');

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

// ── Visual Builder V1 API Routes ─────────────────────────────────────────────
/** @var \LemurCms\PageBuilder\Presentation\Api\EditorApiController $editorApiController */
$editorApiController = $container['presentation']['editorApiController'] ?? $container['services']['editorApiController'];
$builderPrefix = $editorApiController->prefix;

$router->get("{$builderPrefix}/capabilities", function () use ($editorApiController) {
    header('Content-Type: application/json');
    $res = $editorApiController->capabilities();
    http_response_code($res['status'] ?? 200);
    echo json_encode($res, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}, 'builder.capabilities')->middleware('auth');

$router->get("{$builderPrefix}/components", function () use ($editorApiController) {
    header('Content-Type: application/json');
    echo json_encode($editorApiController->components(), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}, 'builder.components')->middleware('auth');

$router->get("{$builderPrefix}/components/{name}/diagnose", function (string $name) use ($editorApiController) {
    header('Content-Type: application/json');
    echo json_encode($editorApiController->diagnoseComponent($name), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}, 'builder.components.diagnose')->middleware('auth');

$router->get("{$builderPrefix}/pages/{id}", function (string $id) use ($editorApiController) {
    header('Content-Type: application/json');
    $res = $editorApiController->showPage($id);
    if (isset($res['status'])) {
        http_response_code($res['status']);
    }
    echo json_encode($res, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}, 'builder.pages.show')->middleware('auth');

$router->post("{$builderPrefix}/pages/{id}/validate", function (string $id) use ($editorApiController) {
    header('Content-Type: application/json');
    $body = (string) file_get_contents('php://input');
    $res = $editorApiController->validatePage($id, $body);
    if (isset($res['status'])) {
        http_response_code($res['status']);
    }
    echo json_encode($res, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}, 'builder.pages.validate')->middleware('auth', 'csrf');

$router->put("{$builderPrefix}/pages/{id}/draft", function (string $id) use ($editorApiController) {
    header('Content-Type: application/json');
    $response = $editorApiController->saveDraft(
        $id,
        (string) file_get_contents('php://input'),
        $_SERVER['HTTP_IF_MATCH'] ?? null,
        isset($_GET['reason']) ? (string) $_GET['reason'] : null
    );
    http_response_code($response['status'] ?? 200);
    if (isset($response['data']['etag'])) {
        header('ETag: ' . $response['data']['etag']);
    }
    echo json_encode($response, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}, 'builder.pages.draft')->middleware('auth', 'csrf');

$router->get("{$builderPrefix}/pages/{id}/draft", function (string $id) use ($editorApiController) {
    header('Content-Type: application/json');
    $response = $editorApiController->showDraft($id);
    http_response_code($response['status'] ?? 200);
    if (isset($response['data']['etag'])) {
        header('ETag: ' . $response['data']['etag']);
    }
    echo json_encode($response, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}, 'builder.pages.draft.show')->middleware('auth');

$router->get("{$builderPrefix}/pages/{id}/history", function (string $id) use ($editorApiController) {
    header('Content-Type: application/json');
    $response = $editorApiController->draftHistory(
        $id,
        (int) ($_GET['limit'] ?? 20),
        (int) ($_GET['offset'] ?? 0)
    );
    http_response_code($response['status'] ?? 200);
    echo json_encode($response, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}, 'builder.pages.history')->middleware('auth');

$router->post("{$builderPrefix}/pages/{id}/publish-revision", function (string $id) use ($editorApiController) {
    header('Content-Type: application/json');
    $response = $editorApiController->publishRevision(
        $id,
        (string) file_get_contents('php://input'),
        $_SERVER['HTTP_IDEMPOTENCY_KEY'] ?? null
    );
    http_response_code($response['status'] ?? 200);
    echo json_encode($response, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}, 'builder.pages.publish-revision')->middleware('auth', 'csrf');

$router->post("{$builderPrefix}/pages/{id}/migrate", function (string $id) use ($editorApiController) {
    header('Content-Type: application/json');
    $res = $editorApiController->migratePage($id);
    if (isset($res['status'])) {
        http_response_code($res['status']);
    }
    echo json_encode($res, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}, 'builder.pages.migrate')->middleware('auth', 'csrf');

// ── Visual Builder V1 revision operations ────────────────────────────────────
/** @var \LemurCms\PageBuilder\Presentation\Api\RevisionApiController|null $revisionApiController */
$revisionApiController = $container['presentation']['revisionApiController'] ?? null;
if ($revisionApiController !== null) {
    $sendBuilderJson = static function (array $response, array $headers = []): void {
        header('Content-Type: application/json');
        foreach ($headers as $name => $value) {
            header($name . ': ' . $value);
        }
        if (isset($response['data']['etag'])) {
            header('ETag: ' . $response['data']['etag']);
        }
        http_response_code($response['status'] ?? 200);
        echo json_encode($response, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    };
    $requestBody = static fn (): string => (string) file_get_contents('php://input');
    $noStore = ['Cache-Control' => 'no-store, private, max-age=0'];

    $router->post("{$builderPrefix}/pages/{id}/restore", fn (string $id) => $sendBuilderJson(
        $revisionApiController->restore($id, $requestBody(), $_SERVER['HTTP_IF_MATCH'] ?? null)
    ), 'builder.pages.restore')->middleware('auth', 'csrf');

    $router->post("{$builderPrefix}/pages/{id}/reconcile", fn (string $id) => $sendBuilderJson(
        $revisionApiController->reconcile($id, $_SERVER['HTTP_IF_MATCH'] ?? null)
    ), 'builder.pages.reconcile')->middleware('auth', 'csrf');

    $router->post("{$builderPrefix}/pages/{id}/unpublish", fn (string $id) => $sendBuilderJson(
        $revisionApiController->unpublish($id, $_SERVER['HTTP_IDEMPOTENCY_KEY'] ?? null)
    ), 'builder.pages.unpublish')->middleware('auth', 'csrf');

    $router->get("{$builderPrefix}/pages/{id}/revisions/{revision}", fn (string $id, string $revision) => $sendBuilderJson(
        $revisionApiController->showRevision($id, ctype_digit($revision) ? (int) $revision : 0), $noStore
    ), 'builder.pages.revision')->middleware('auth');

    $router->put("{$builderPrefix}/pages/{id}/revisions/{revision}/pin", fn (string $id, string $revision) => $sendBuilderJson(
        $revisionApiController->setPin($id, ctype_digit($revision) ? (int) $revision : 0, true)
    ), 'builder.pages.revision.pin')->middleware('auth', 'csrf');

    $router->delete("{$builderPrefix}/pages/{id}/revisions/{revision}/pin", fn (string $id, string $revision) => $sendBuilderJson(
        $revisionApiController->setPin($id, ctype_digit($revision) ? (int) $revision : 0, false)
    ), 'builder.pages.revision.unpin')->middleware('auth', 'csrf');

    $router->post("{$builderPrefix}/pages/{id}/preview-tokens", fn (string $id) => $sendBuilderJson(
        $revisionApiController->issuePreview($id, $requestBody()), $noStore
    ), 'builder.pages.preview-tokens.issue')->middleware('auth', 'csrf');

    $router->delete("{$builderPrefix}/pages/{id}/preview-tokens", fn (string $id) => $sendBuilderJson(
        $revisionApiController->revokePreviews($id, null)
    ), 'builder.pages.preview-tokens.revoke-all')->middleware('auth', 'csrf');

    $router->delete("{$builderPrefix}/pages/{id}/preview-tokens/{tokenId}", fn (string $id, string $tokenId) => $sendBuilderJson(
        $revisionApiController->revokePreviews($id, $tokenId)
    ), 'builder.pages.preview-tokens.revoke')->middleware('auth', 'csrf');

    $router->get("{$builderPrefix}/pages/{id}/audit", fn (string $id) => $sendBuilderJson(
        $revisionApiController->auditTrail($id, (int) ($_GET['limit'] ?? 50), (int) ($_GET['offset'] ?? 0)), $noStore
    ), 'builder.pages.audit')->middleware('auth');

    // Public by design: access is granted only by the short-lived, revocable token.
    $router->get("{$builderPrefix}/preview/{token}", fn (string $token) => $sendBuilderJson(
        $revisionApiController->resolvePreview($token),
        \LemurCms\PageBuilder\Presentation\Api\RevisionApiController::PREVIEW_HEADERS
    ), 'builder.preview');
}

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
$importController = new \LemurCms\Http\Controllers\ImportController($container['uiFrameworkRegistry'] ?? null);
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

