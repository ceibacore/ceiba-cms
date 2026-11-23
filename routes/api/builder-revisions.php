<?php

declare(strict_types=1);

// Visual builder v1 revision operations. Loaded by routes/api.php, which defines $router and $container.

/** @var \CeibaCms\Http\Router $router */
/** @var array<string, mixed> $container */

// ── Visual Builder V1 revision operations ────────────────────────────────────
/** @var \CeibaCms\PageBuilder\Presentation\Api\RevisionApiController|null $revisionApiController */
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
        \CeibaCms\PageBuilder\Presentation\Api\RevisionApiController::PREVIEW_HEADERS
    ), 'builder.preview');
}
