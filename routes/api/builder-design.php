<?php

declare(strict_types=1);

// Visual builder v1: site design (tokens, breakpoints, classes), plan 04-B. Loaded by routes/api.php.

/** @var \CeibaCms\Http\Router $router */
/** @var array<string, mixed> $container */

$designApiController = $container['services']['designApiController'] ?? null;
if ($designApiController !== null) {
    $sendDesignJson = static function (array $response): void {
        header('Content-Type: application/json');
        header('Cache-Control: no-store, private, max-age=0');
        if (isset($response['data']['revision']) && ($response['success'] ?? false)) {
            header('ETag: "' . $response['data']['revision'] . '"');
        }
        http_response_code($response['status'] ?? 200);
        echo json_encode($response, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    };
    $designBody = static fn (): string => (string) file_get_contents('php://input');

    $router->get("{$builderPrefix}/design", fn () => $sendDesignJson($designApiController->show()), 'builder.design')->middleware('auth');
    $router->put("{$builderPrefix}/design", fn () => $sendDesignJson(
        $designApiController->saveDraft($designBody(), $_SERVER['HTTP_IF_MATCH'] ?? null)
    ), 'builder.design.save')->middleware('auth', 'csrf');
    $router->post("{$builderPrefix}/design/publish", fn () => $sendDesignJson(
        $designApiController->publish($designBody())
    ), 'builder.design.publish')->middleware('auth', 'csrf');
    $router->get("{$builderPrefix}/design/usages", fn () => $sendDesignJson($designApiController->usages(
        isset($_GET['class']) ? 'class' : 'token', (string) ($_GET['class'] ?? $_GET['token'] ?? '')
    )), 'builder.design.usages')->middleware('auth');
    $router->get("{$builderPrefix}/design/revisions/{revision}", fn (string $revision) => $sendDesignJson(
        $designApiController->revision((int) $revision)
    ), 'builder.design.revision')->middleware('auth');
}
