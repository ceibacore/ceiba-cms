<?php

declare(strict_types=1);

// Visual builder v1: site parts (header, footer, 404) and their rules, plan 06-C. Loaded by routes/api.php.

/** @var \CeibaCms\Http\Router $router */
/** @var array<string, mixed> $container */

$sitePartApiController = $container['services']['sitePartApiController'] ?? null;
if ($sitePartApiController !== null) {
    $sendSitePartJson = static function (array $response): void {
        header('Content-Type: application/json');
        header('Cache-Control: no-store, private, max-age=0');
        http_response_code($response['status'] ?? 200);
        unset($response['status']);
        echo json_encode($response, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    };
    $sitePartBody = static fn (): string => (string) file_get_contents('php://input');

    $router->get("{$builderPrefix}/site-parts", fn () => $sendSitePartJson($sitePartApiController->index()), 'builder.site-parts')->middleware('auth');
    $router->post("{$builderPrefix}/site-parts", fn () => $sendSitePartJson($sitePartApiController->store($sitePartBody())), 'builder.site-parts.store')
        ->middleware('auth', 'csrf');
    $router->put("{$builderPrefix}/site-parts/{id}/rules", fn (string $id) => $sendSitePartJson(
        $sitePartApiController->saveRules($id, $sitePartBody(), $_SERVER['HTTP_IF_MATCH'] ?? null)
    ), 'builder.site-parts.rules')->middleware('auth', 'csrf');
    $router->post("{$builderPrefix}/site-parts/impact", fn () => $sendSitePartJson($sitePartApiController->impact($sitePartBody())),
        'builder.site-parts.impact')->middleware('auth', 'csrf');
    $router->post("{$builderPrefix}/site-parts/publish", fn () => $sendSitePartJson(
        $sitePartApiController->publish($sitePartBody(), $_SERVER['HTTP_IDEMPOTENCY_KEY'] ?? null)
    ), 'builder.site-parts.publish')->middleware('auth', 'csrf');
}
