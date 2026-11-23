<?php

declare(strict_types=1);

// Templates, components and page builder metadata. Loaded by routes/api.php, which defines $router and $container.

use CeibaCms\Http\Controllers\TemplateController;
use CeibaCms\Http\Controllers\ComponentDefinitionController;
use CeibaCms\Http\Controllers\PageBuilderMetadataController;

/** @var \CeibaCms\Http\Router $router */
/** @var array<string, mixed> $container */

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
