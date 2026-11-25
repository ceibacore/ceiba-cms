<?php

declare(strict_types=1);

// Visual builder v1: data sources for query blocks and bindings, plan 07-C. Loaded by routes/api.php.

/** @var \CeibaCms\Http\Router $router */
/** @var array<string, mixed> $container */

$dataSourceApiController = $container['services']['dataSourceApiController'] ?? null;
if ($dataSourceApiController !== null) {
    $sendDataSourceJson = static function (array $response): void {
        header('Content-Type: application/json');
        header('Cache-Control: no-store, private, max-age=0');
        http_response_code($response['status'] ?? 200);
        unset($response['status']);
        echo json_encode($response, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    };
    $router->get("{$builderPrefix}/data-sources", fn () => $sendDataSourceJson($dataSourceApiController->index()), 'builder.data-sources')->middleware('auth');
    $router->get("{$builderPrefix}/data-sources/{id}/schema", fn (string $id) => $sendDataSourceJson($dataSourceApiController->schema(rawurldecode($id))),
        'builder.data-sources.schema')->middleware('auth');
    $router->get("{$builderPrefix}/data-sources/{id}/records", fn (string $id) => $sendDataSourceJson($dataSourceApiController->records(rawurldecode($id),
        (string) ($_GET['search'] ?? ''))), 'builder.data-sources.records')->middleware('auth');
    $router->post("{$builderPrefix}/data-sources/preview", fn () => $sendDataSourceJson($dataSourceApiController->preview((string) file_get_contents('php://input'))),
        'builder.data-sources.preview')->middleware('auth', 'csrf');
}
