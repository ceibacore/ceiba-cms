<?php
declare(strict_types=1);

// UI frameworks, integration ports and editor API controllers. Loaded in order by bootstrap.php (shared scope).

// ── UI Framework Registry ────────────────────────────────────────────────────
$uiFrameworkRegistry = new \CeibaCms\PageBuilder\Domain\Service\UiFrameworkRegistry();
$uiFrameworkRegistry->register(new \CeibaCms\PageBuilder\Frameworks\Bootstrap5\Bootstrap5Module());
// No default active module — activate explicitly per app: $uiFrameworkRegistry->setActive('bootstrap5');

$pageBuilderMetadataService = new \CeibaCms\PageBuilder\Domain\Service\PageBuilderMetadataService(
    $uiFrameworkRegistry,
    $templateRepository,
    $pageTemplateRepository,
    $htmlSemanticRulesProvider
);

$variableInterpolator = new \CeibaCms\PageBuilder\Domain\Service\VariableInterpolator();
$bladeRenderer        = new \CeibaCms\PageBuilder\Domain\Service\BladeRenderer($loopResolver, $variableInterpolator, $uiFrameworkRegistry);
$layoutRenderer       = new \CeibaCms\PageBuilder\Domain\Service\LayoutRenderer();
$reservedPathChecker  = new \CeibaCms\Routing\Domain\Service\ReservedPathChecker($reservedPathRepository);

$listReservedPaths   = new \CeibaCms\Routing\Application\ListReservedPaths($reservedPathRepository);
$addReservedPath     = new \CeibaCms\Routing\Application\AddReservedPath($reservedPathRepository);
$removeReservedPath  = new \CeibaCms\Routing\Application\RemoveReservedPath($reservedPathRepository);

$createDynamicModule = new \CeibaCms\DynamicModule\Application\CreateDynamicModule($db, $moduleDefinitionRepository, $dynamicTableManager);
$updateDynamicModule = new \CeibaCms\DynamicModule\Application\UpdateDynamicModule($db, $moduleDefinitionRepository, $dynamicTableManager);
$deleteDynamicModule = new \CeibaCms\DynamicModule\Application\DeleteDynamicModule($db, $moduleDefinitionRepository, $dynamicTableManager);
$getModuleDefinition = new \CeibaCms\DynamicModule\Application\GetModuleDefinition($moduleDefinitionRepository);
$listDynamicModules  = new \CeibaCms\DynamicModule\Application\ListDynamicModules($moduleDefinitionRepository);

$listLanguages      = new \CeibaCms\Localization\Application\ListLanguages($languageRepository);
$createLanguage     = new \CeibaCms\Localization\Application\CreateLanguage($db, $languageRepository, $translationRepository);
$updateLanguage     = new \CeibaCms\Localization\Application\UpdateLanguage($db, $languageRepository);
$deleteLanguage     = new \CeibaCms\Localization\Application\DeleteLanguage($db, $languageRepository, $translationRepository);
$listTranslations   = new \CeibaCms\Localization\Application\ListTranslations($translationRepository);
$updateTranslations = new \CeibaCms\Localization\Application\UpdateTranslations($translationRepository);

// ── Integration Ports & Adapters Instantiation ───────────────────────────────
$siteId = (string) \CeibaCms\Support\Infrastructure\EnvironmentGuard::get(
    'CMS_SITE_ID',
    \CeibaCms\Support\Infrastructure\EnvironmentGuard::get('DB_NAME', 'default')
);
$systemClock               = new \CeibaCms\PageBuilder\Infrastructure\SystemClock();
$cmsDocumentAuthorization  = new \CeibaCms\PageBuilder\Infrastructure\CmsDocumentAuthorization($siteId, $checkPermission);
$loopResolverContentSource = new \CeibaCms\PageBuilder\Infrastructure\LoopResolverContentSource($loopResolver);
$localMediaStorage         = new \CeibaCms\PageBuilder\Infrastructure\LocalMediaStorage(
    \CeibaCms\Support\Infrastructure\EnvironmentGuard::get('MEDIA_STORAGE_PATH', sys_get_temp_dir() . '/cms_media')
);
$syncJobDispatcher         = new \CeibaCms\PageBuilder\Infrastructure\SyncJobDispatcher();
$nullMailDelivery          = new \CeibaCms\PageBuilder\Infrastructure\NullMailDelivery();
$documentMigrator          = new \CeibaCms\PageBuilder\Domain\Document\DocumentMigrator();
$validatePageDocument      = new \CeibaCms\PageBuilder\Application\ValidatePageDocument(
    $siteId,
    $pageRepository,
    $mediaRepository,
    $cmsDocumentAuthorization
);
$migratePageDocument       = new \CeibaCms\PageBuilder\Application\MigratePageDocument(
    $siteId,
    $pageRepository,
    $cmsDocumentAuthorization,
    $documentMigrator
);
$componentCatalogue        = \CeibaCms\PageBuilder\Domain\Catalogue\ComponentCatalogue::createDefault();
$builderApiPrefix          = (string) \CeibaCms\Support\Infrastructure\EnvironmentGuard::get('BUILDER_API_PREFIX', '/api/builder/v1');
// CMS permission => editor capability. Each revision operation has its own permission.
$builderContextResolver    = static function () use ($siteId, $authManager, $checkPermission) {
    $actorId = $authManager->id();
    if ($actorId === null || !$authManager->check()) {
        return null;
    }
    $capabilities = [];
    foreach ([
        'pages.view' => 'pages.read', 'pages.update' => 'pages.update', 'pages.publish' => 'pages.publish',
        'pages.restore' => 'pages.restore', 'pages.unpublish' => 'pages.unpublish',
        'design.update' => 'design.update', 'design.publish' => 'design.publish',
    ] as $permission => $capability) {
        if ($checkPermission->execute($actorId, $permission)) {
            $capabilities[] = $capability;
        }
    }
    return new \CeibaCms\PageBuilder\Domain\Document\HostContext($siteId, (string) $actorId, 'es', $capabilities);
};
// Server errors are logged with the requestId returned to the client; never the payload.
$builderErrorReporter      = static function (string $requestId, \Throwable $error): void {
    error_log(sprintf('[ceiba-cms] %s %s: %s', $requestId, get_class($error), $error->getMessage()));
};
$revisionAuditLog          = new \CeibaCms\Page\Application\PageRevisionAuditLog($db, $siteId, $systemClock);
$savePageDraft             = new \CeibaCms\Page\Application\SavePageDraft($db, $siteId, $systemClock);
$restorePageRevision       = new \CeibaCms\Page\Application\RestorePageRevision($db, $siteId, $savePageDraft);
$publishPageRevision       = new \CeibaCms\Page\Application\PublishPageRevision($db, $siteId, $systemClock);
$unpublishPage             = new \CeibaCms\Page\Application\UnpublishPage($db, $siteId, $systemClock);
$reconcilePageContent      = new \CeibaCms\Page\Application\ReconcilePageContent($db, $siteId, $savePageDraft, $documentMigrator);
$createPage                = new \CeibaCms\Page\Application\CreatePage($db, $siteId, $treeNormalizer, $documentMigrator, $systemClock);
$publishPage               = new \CeibaCms\Page\Application\PublishPage($db, $siteId, $publishPageRevision);
$getPageWorkingRevision    = new \CeibaCms\Page\Application\GetPageWorkingRevision($db, $siteId);
$savePageContent           = new \CeibaCms\Page\Application\SavePageContent($savePageDraft, $treeNormalizer, $documentMigrator, $getPageWorkingRevision);
$pagePreviewTokens         = new \CeibaCms\Page\Application\PagePreviewTokens($db, $siteId, $systemClock);
$pinPageRevision           = new \CeibaCms\Page\Application\PinPageRevision($db, $siteId, $systemClock);
$revisionArchive           = new \CeibaCms\PageBuilder\Infrastructure\JsonLinesRevisionArchive(
    (string) \CeibaCms\Support\Infrastructure\EnvironmentGuard::get('REVISION_ARCHIVE_PATH', dirname(__DIR__) . '/storage/revision-archive')
);
$editorApiController       = new \CeibaCms\PageBuilder\Presentation\Api\EditorApiController(
    $builderApiPrefix,
    $siteId,
    $pageRepository,
    $mediaRepository,
    $cmsDocumentAuthorization,
    $documentMigrator,
    $validatePageDocument,
    $componentCatalogue,
    $builderContextResolver,
    $savePageDraft,
    $db,
    $publishPageRevision,
    $cmsDocumentAuthorization,
    $revisionAuditLog,
    $builderErrorReporter,
    true
);
$revisionApiController     = new \CeibaCms\PageBuilder\Presentation\Api\RevisionApiController(
    $siteId,
    $builderContextResolver,
    $cmsDocumentAuthorization,
    $revisionAuditLog,
    $restorePageRevision,
    $reconcilePageContent,
    $unpublishPage,
    $pagePreviewTokens,
    $pinPageRevision,
    $db,
    $builderErrorReporter
);
