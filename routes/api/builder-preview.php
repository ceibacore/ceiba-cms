<?php

declare(strict_types=1);

// Visual builder v1: publication state and server preview (plan 03-D). Loaded by routes/api.php.

use CeibaCms\PageBuilder\Presentation\Api\EditorPreviewController;

/** @var \CeibaCms\Http\Router $router */
/** @var array<string, mixed> $container */
/** @var \CeibaCms\PageBuilder\Presentation\Api\EditorApiController $editorApiController */
/** @var \CeibaCms\PageBuilder\Presentation\Api\RevisionApiController|null $revisionApiController */

if ($revisionApiController !== null && isset($container['useCases']['getPageWorkingRevision'])) {
    $editorPreviewController = new EditorPreviewController(
        $editorApiController,
        $revisionApiController,
        $container['useCases']['getPageWorkingRevision'],
        $container['bladeRenderer'],
    );
    $sendPreviewJson = static function (array $response): void {
        header('Content-Type: application/json');
        header('Cache-Control: no-store, private, max-age=0');
        http_response_code($response['status'] ?? 200);
        echo json_encode($response, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    };

    $router->get("{$builderPrefix}/pages/{id}/status", fn (string $id) => $sendPreviewJson(
        $editorPreviewController->status($id)
    ), 'builder.pages.status')->middleware('auth');

    $router->get("{$builderPrefix}/pages/{id}/revisions/{revision}/render", fn (string $id, string $revision) => $sendPreviewJson(
        $editorPreviewController->render($id, (int) $revision)
    ), 'builder.pages.revision.render')->middleware('auth');
}
