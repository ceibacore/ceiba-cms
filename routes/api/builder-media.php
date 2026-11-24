<?php

declare(strict_types=1);

// Visual builder v1: media library (plan 05-A) and the public files of the local storage. Loaded by routes/api.php.

/** @var \CeibaCms\Http\Router $router */
/** @var array<string, mixed> $container */

$mediaApiController = $container['services']['mediaApiController'] ?? null;
if ($mediaApiController !== null) {
    $sendMediaJson = static function (array $response): void {
        header('Content-Type: application/json');
        header('Cache-Control: no-store, private, max-age=0');
        http_response_code($response['status'] ?? 200);
        echo json_encode($response, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    };

    $router->get("{$builderPrefix}/media", fn () => $sendMediaJson($mediaApiController->index(
        is_string($_GET['search'] ?? null) ? $_GET['search'] : '', (int) ($_GET['page'] ?? 1)
    )), 'builder.media')->middleware('auth');
    $router->get("{$builderPrefix}/media/settings", fn () => $sendMediaJson($mediaApiController->settings()), 'builder.media.settings')->middleware('auth');
    $router->get("{$builderPrefix}/media/resolve", fn () => $sendMediaJson($mediaApiController->resolve(
        is_string($_GET['ids'] ?? null) ? $_GET['ids'] : ''
    )), 'builder.media.resolve')->middleware('auth');
    $router->get("{$builderPrefix}/media/{id}/usages", fn (string $id) => $sendMediaJson($mediaApiController->usages($id)), 'builder.media.usages')->middleware('auth');
    $router->post("{$builderPrefix}/media", fn () => $sendMediaJson($mediaApiController->store(
        is_array($_FILES['file'] ?? null) ? $_FILES['file'] : null, $_POST
    )), 'builder.media.store')->middleware('auth', 'csrf');
    $router->patch("{$builderPrefix}/media/{id}", fn (string $id) => $sendMediaJson(
        $mediaApiController->update($id, (string) file_get_contents('php://input'))
    ), 'builder.media.update')->middleware('auth', 'csrf');
    $router->delete("{$builderPrefix}/media/{id}", fn (string $id) => $sendMediaJson($mediaApiController->destroy($id)), 'builder.media.delete')->middleware('auth', 'csrf');
}

// Files of LocalMediaStorage under MEDIA_PUBLIC_URL (default /cms-media). Hosts with their own disk serve their own.
$localMediaFiles = $container['services']['localMediaFiles'] ?? null;
if ($localMediaFiles !== null) {
    $router->get("{$localMediaFiles['prefix']}/{key}", static function (string $key) use ($localMediaFiles): void {
        $file = $localMediaFiles['storage']->absolutePath($localMediaFiles['siteId'], $key);
        $mime = $file === null ? null : \CeibaCms\Media\Domain\MediaTypes::detect($file);
        if ($file === null || $mime === null) {
            http_response_code(404);
            return;
        }
        header('Content-Type: ' . $mime);
        header('Content-Length: ' . filesize($file));
        header('X-Content-Type-Options: nosniff');
        header('Cache-Control: public, max-age=31536000, immutable');
        readfile($file);
    }, 'media.file');
}
