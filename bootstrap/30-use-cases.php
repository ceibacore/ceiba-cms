<?php
declare(strict_types=1);

// Use cases and render engine. Loaded in order by bootstrap.php (shared scope).

// ── Create Use Cases ─────────────────────────────────────────────────────────
$menuCache             = new \CeibaCms\Menu\Presentation\CeibaMenuCache(dirname(__DIR__));
$menuRenderer          = new \CeibaCms\Menu\Presentation\CeibaMenuRenderer();
$bannerRenderer        = new \CeibaCms\Menu\Presentation\BannerRenderer($menuRepository);
$breadcrumbBuilder     = new \CeibaCms\Menu\Presentation\BreadcrumbBuilder();
$notificationPresenter = new \CeibaCms\Menu\Presentation\NotificationPresenter();

$getMainNavbar    = new \CeibaCms\Menu\Application\GetMainNavbar($menuRepository);
$getNavbar        = new \CeibaCms\Menu\Application\GetNavbar($menuRepository, $menuRenderer, $menuCache);
$createMenuItem   = new \CeibaCms\Menu\Application\CreateMenuItem($menuRepository);
$updateMenuItem   = new \CeibaCms\Menu\Application\UpdateMenuItem($menuRepository);
$deleteMenuItem   = new \CeibaCms\Menu\Application\DeleteMenuItem($menuRepository);
$saveBanner       = new \CeibaCms\Menu\Application\SaveBanner($menuRepository);
$saveLogo         = new \CeibaCms\Menu\Application\SaveLogo($menuRepository);

$getPageBySlug    = new \CeibaCms\Page\Application\GetPageBySlug($pageRepository);
$getPageById      = new \CeibaCms\Page\Application\GetPageById($pageRepository);
$treeNormalizer   = new \CeibaCms\PageBuilder\Domain\Service\TreeNormalizer();
$updatePage       = new \CeibaCms\Page\Application\UpdatePage($pageRepository);
// createPage and publishPage are versioned and are wired with the revision services below.
$deletePage       = new \CeibaCms\Page\Application\DeletePage($pageRepository);
$listPages        = new \CeibaCms\Page\Application\ListPages($pageRepository);

$getSeoForEntity  = new \CeibaCms\Seo\Application\GetSeoForEntity($seoRepository);
$upsertSeo        = new \CeibaCms\Seo\Application\UpsertSeo($seoRepository);

$storeMedia       = new \CeibaCms\Media\Application\StoreMedia($mediaRepository);
$deleteMedia      = new \CeibaCms\Media\Application\DeleteMedia($mediaRepository);
$listMedia        = new \CeibaCms\Media\Application\ListMedia($mediaRepository);
$findMediaById    = new \CeibaCms\Media\Application\FindMediaById($mediaRepository);

$authenticateUser = new \CeibaCms\Auth\Application\AuthenticateUser($userRepository);
$createUser       = new \CeibaCms\Auth\Application\CreateUser($userRepository);
$assignRole       = new \CeibaCms\Auth\Application\AssignRole($userRepository);
$checkPermission  = new \CeibaCms\Auth\Application\CheckPermission($userRepository);
$changePassword   = new \CeibaCms\Auth\Application\ChangePassword($userRepository);

$listTemplates            = new \CeibaCms\PageBuilder\Application\ListTemplates($templateRepository);
$getTemplateById          = new \CeibaCms\PageBuilder\Application\GetTemplateById($templateRepository);
$createTemplate           = new \CeibaCms\PageBuilder\Application\CreateTemplate($templateRepository);
$deleteTemplate           = new \CeibaCms\PageBuilder\Application\DeleteTemplate($templateRepository);
$listComponentDefinitions = new \CeibaCms\PageBuilder\Application\ListComponentDefinitions($componentDefinitionRepository);

// V2 Page Templates
$pageTemplateRepository   = new \CeibaCms\PageBuilder\Infrastructure\CeibaDbPageTemplateRepository($db);
$getPageTemplateById      = new \CeibaCms\PageBuilder\Application\GetPageTemplateById($pageTemplateRepository);
$listPageTemplates        = new \CeibaCms\PageBuilder\Application\ListPageTemplates($pageTemplateRepository);

$htmlSemanticRulesProvider = new \CeibaCms\PageBuilder\Domain\Service\HtmlSemanticRulesProvider();

// V2 Engine Services
$authManager              = new \CeibaCms\Auth\AuthManager(new \CeibaCms\Auth\Drivers\SessionDriver($db));
$conditionEngine          = new \CeibaCms\PageBuilder\Domain\Service\ConditionEngine($authManager, $db);
$contextResolver          = new \CeibaCms\PageBuilder\Domain\Service\ContextResolver($authManager);
$queryEngine              = new \CeibaCms\PageBuilder\Domain\Service\QueryEngine($db, $contextResolver);

$listLayouts      = new \CeibaCms\PageBuilder\Application\ListLayouts($pageLayoutRepository);
$getLayoutById    = new \CeibaCms\PageBuilder\Application\GetLayoutById($pageLayoutRepository);
$getDefaultLayout = new \CeibaCms\PageBuilder\Application\GetDefaultLayout($pageLayoutRepository);
$createLayout     = new \CeibaCms\PageBuilder\Application\CreateLayout($pageLayoutRepository);
$updateLayout     = new \CeibaCms\PageBuilder\Application\UpdateLayout($pageLayoutRepository);
$deleteLayout     = new \CeibaCms\PageBuilder\Application\DeleteLayout($pageLayoutRepository);

// ── Render Engine services ───────────────────────────────────────────────────
$loopResolver         = new \CeibaCms\PageBuilder\Domain\Service\LoopResolver();

// Register Data Providers
$loopResolver->register('api', new \CeibaCms\DynamicModule\Infrastructure\ApiDataProvider());
try {
    $activeModules = $moduleDefinitionRepository->listAll();
    foreach ($activeModules as $moduleDef) {
        $loopResolver->register(
            'module:' . $moduleDef->moduleSlug,
            new \CeibaCms\DynamicModule\Infrastructure\DynamicModuleDataProvider(
                $moduleDef->tableName(),
                $genericModuleRepository
            )
        );
    }
} catch (\Throwable $e) {
    // Avoid blocking bootstrap if DB is not migrated or connection is pending
}
