<?php

declare(strict_types=1);

// Visual builder v1 API (editor). Loaded by routes/api.php, which defines $router and $container.

/** @var \CeibaCms\Http\Router $router */
/** @var array<string, mixed> $container */

// ── Visual Builder V1 API Routes ─────────────────────────────────────────────
/** @var \CeibaCms\PageBuilder\Presentation\Api\EditorApiController $editorApiController */
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
