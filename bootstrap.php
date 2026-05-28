<?php
declare(strict_types=1);

/**
 * Lemur CMS Bootstrap
 * 
 * Manual Dependency Injection setup.
 * Inyecta los adaptadores concretos en los casos de uso.
 */

// ── Environment Configuration ───────────────────────────────────────────────
require_once __DIR__ . '/src/Support/Infrastructure/EnvironmentGuard.php';
\LemurCms\Support\Infrastructure\EnvironmentGuard::check();

require_once __DIR__ . '/lemurdb/lemurdb.php';
require_once __DIR__ . '/src/Migration/CmsMigrationGenerator.php';
require_once __DIR__ . '/src/Migration/CmsSchemaBuilder.php';
require_once __DIR__ . '/src/Migration/CmsBaseMigration.php';
require_once __DIR__ . '/src/Migration/CmsColumnBlueprint.php';
require_once __DIR__ . '/src/Migration/CmsColumnDef.php';
require_once __DIR__ . '/src/Migration/GeneratorResult.php';
require_once __DIR__ . '/src/Migration/Dialect/CmsDialectInterface.php';
require_once __DIR__ . '/src/Migration/Dialect/MySQLDialect.php';
require_once __DIR__ . '/src/Migration/CmsMigrationRunner.php';
require_once __DIR__ . '/src/Seeder/CmsSeeder.php';
require_once __DIR__ . '/src/Seeder/CmsSeederRunner.php';

// ── Support Layer (Exceptions, Validators, Helpers, Infrastructure) ──────────
require_once __DIR__ . '/src/Support/Exceptions/ValidatorException.php';
require_once __DIR__ . '/src/Support/Exceptions/InvalidMenuException.php';
require_once __DIR__ . '/src/Support/Exceptions/PageNotFoundException.php';
require_once __DIR__ . '/src/Support/Exceptions/InvalidUserException.php';
require_once __DIR__ . '/src/Support/Exceptions/InvalidPermissionException.php';

require_once __DIR__ . '/src/Support/Validators/MenuValidator.php';
require_once __DIR__ . '/src/Support/Validators/PageValidator.php';
require_once __DIR__ . '/src/Support/Validators/UserValidator.php';

require_once __DIR__ . '/src/Support/Helpers/StringHelper.php';
require_once __DIR__ . '/src/Support/Helpers/DateHelper.php';
require_once __DIR__ . '/src/Support/Helpers/ArrayHelper.php';
require_once __DIR__ . '/src/Support/Helpers/UuidHelper.php';
require_once __DIR__ . '/src/Support/Helpers/FakeDataHelper.php';

// ── Auth Layer (Adapter Pattern for CMS Security) ─────────────────────────────
require_once __DIR__ . '/src/Auth/Contracts/AuthDriverInterface.php';
require_once __DIR__ . '/src/Auth/Drivers/SessionDriver.php';
require_once __DIR__ . '/src/Auth/AuthManager.php';

// ── HTTP Layer (Controllers, Router) ──────────────────────────────────────────
require_once __DIR__ . '/src/Http/Router.php';
require_once __DIR__ . '/src/Http/Controllers/BaseController.php';
require_once __DIR__ . '/src/Http/Controllers/MenuController.php';
require_once __DIR__ . '/src/Http/Controllers/PageController.php';
require_once __DIR__ . '/src/Http/Controllers/PageRenderController.php';
require_once __DIR__ . '/src/Http/Controllers/CacheController.php';

// ── Database Factories ───────────────────────────────────────────────────────
require_once __DIR__ . '/database/factories/Factory.php';
require_once __DIR__ . '/database/factories/MenuFactory.php';
require_once __DIR__ . '/database/factories/PageFactory.php';
require_once __DIR__ . '/database/factories/UserFactory.php';

// ── Domain Ports ─────────────────────────────────────────────────────────────
require_once __DIR__ . '/src/Menu/Domain/Repository/MenuRepositoryInterface.php';
require_once __DIR__ . '/src/Page/Domain/Repository/PageRepositoryInterface.php';
require_once __DIR__ . '/src/Seo/Domain/Repository/SeoRepositoryInterface.php';
require_once __DIR__ . '/src/Media/Domain/Repository/MediaRepositoryInterface.php';
require_once __DIR__ . '/src/Auth/Domain/Repository/UserRepositoryInterface.php';

// ── Application Use Cases ────────────────────────────────────────────────────
require_once __DIR__ . '/src/Menu/Application/GetMainNavbar.php';
require_once __DIR__ . '/src/Menu/Application/GetNavbar.php';
require_once __DIR__ . '/src/Menu/Application/CreateMenuItem.php';
require_once __DIR__ . '/src/Menu/Application/UpdateMenuItem.php';
require_once __DIR__ . '/src/Menu/Application/DeleteMenuItem.php';
require_once __DIR__ . '/src/Menu/Application/SaveBanner.php';
require_once __DIR__ . '/src/Menu/Application/SaveLogo.php';
require_once __DIR__ . '/src/Page/Application/GetPageBySlug.php';
require_once __DIR__ . '/src/Page/Application/GetPageById.php';
require_once __DIR__ . '/src/Page/Application/CreatePage.php';
require_once __DIR__ . '/src/Page/Application/UpdatePage.php';
require_once __DIR__ . '/src/Page/Application/PublishPage.php';
require_once __DIR__ . '/src/Page/Application/DeletePage.php';
require_once __DIR__ . '/src/Page/Application/ListPages.php';
require_once __DIR__ . '/src/Seo/Application/GetSeoForEntity.php';
require_once __DIR__ . '/src/Seo/Application/UpsertSeo.php';
require_once __DIR__ . '/src/Media/Application/StoreMedia.php';
require_once __DIR__ . '/src/Media/Application/DeleteMedia.php';
require_once __DIR__ . '/src/Media/Application/ListMedia.php';
require_once __DIR__ . '/src/Media/Application/FindMediaById.php';
require_once __DIR__ . '/src/Auth/Application/AuthenticateUser.php';
require_once __DIR__ . '/src/Auth/Application/CreateUser.php';
require_once __DIR__ . '/src/Auth/Application/AssignRole.php';
require_once __DIR__ . '/src/Auth/Application/CheckPermission.php';
require_once __DIR__ . '/src/Auth/Application/ChangePassword.php';

// ── Presentation Layer ───────────────────────────────────────────────────────
require_once __DIR__ . '/src/Menu/Presentation/LemurMenuRenderer.php';
require_once __DIR__ . '/src/Menu/Presentation/LemurMenuCache.php';
require_once __DIR__ . '/src/Menu/Presentation/LemurMenuBuilder.php';
require_once __DIR__ . '/src/Menu/Presentation/BannerRenderer.php';
require_once __DIR__ . '/src/Menu/Presentation/BreadcrumbBuilder.php';
require_once __DIR__ . '/src/Menu/Presentation/NotificationPresenter.php';

// ── Infrastructure Adapters ──────────────────────────────────────────────────
require_once __DIR__ . '/src/Menu/Infrastructure/LemurDbMenuRepository.php';
require_once __DIR__ . '/src/Page/Infrastructure/LemurDbPageRepository.php';
require_once __DIR__ . '/src/Seo/Infrastructure/LemurDbSeoRepository.php';
require_once __DIR__ . '/src/Media/Infrastructure/LemurDbMediaRepository.php';
require_once __DIR__ . '/src/Auth/Infrastructure/LemurDbUserRepository.php';

// ── PageBuilder Layer ────────────────────────────────────────────────────────
require_once __DIR__ . '/src/PageBuilder/Domain/Entity/LoopConfig.php';
require_once __DIR__ . '/src/PageBuilder/Domain/Entity/Node.php';
require_once __DIR__ . '/src/PageBuilder/Domain/Entity/ComponentDefinition.php';
require_once __DIR__ . '/src/PageBuilder/Domain/Repository/TemplateRepositoryInterface.php';
require_once __DIR__ . '/src/PageBuilder/Domain/Repository/ComponentDefinitionRepositoryInterface.php';
require_once __DIR__ . '/src/PageBuilder/Domain/Service/TreeValidator.php';
require_once __DIR__ . '/src/PageBuilder/Domain/Service/TreeNormalizer.php';
require_once __DIR__ . '/src/PageBuilder/Domain/Service/VariableInterpolator.php';
require_once __DIR__ . '/src/PageBuilder/Domain/Service/LoopResolverInterface.php';
require_once __DIR__ . '/src/PageBuilder/Domain/Service/DataProviderInterface.php';
require_once __DIR__ . '/src/PageBuilder/Domain/Service/LoopResolver.php';
require_once __DIR__ . '/src/PageBuilder/Domain/Service/BladeRendererInterface.php';
require_once __DIR__ . '/src/PageBuilder/Domain/Service/BladeRenderer.php';
require_once __DIR__ . '/src/PageBuilder/Application/ListTemplates.php';
require_once __DIR__ . '/src/PageBuilder/Application/GetTemplateById.php';
require_once __DIR__ . '/src/PageBuilder/Application/CreateTemplate.php';
require_once __DIR__ . '/src/PageBuilder/Application/DeleteTemplate.php';
require_once __DIR__ . '/src/PageBuilder/Application/ListComponentDefinitions.php';
require_once __DIR__ . '/src/PageBuilder/Infrastructure/LemurDbTemplateRepository.php';
require_once __DIR__ . '/src/PageBuilder/Infrastructure/LemurDbComponentDefinitionRepository.php';
require_once __DIR__ . '/src/PageBuilder/Domain/Entity/PageLayout.php';
require_once __DIR__ . '/src/PageBuilder/Domain/Repository/PageLayoutRepositoryInterface.php';
require_once __DIR__ . '/src/PageBuilder/Infrastructure/LemurDbPageLayoutRepository.php';
require_once __DIR__ . '/src/PageBuilder/Domain/Service/LayoutRenderer.php';
require_once __DIR__ . '/src/PageBuilder/Application/ListLayouts.php';
require_once __DIR__ . '/src/PageBuilder/Application/GetLayoutById.php';
require_once __DIR__ . '/src/PageBuilder/Application/GetDefaultLayout.php';
require_once __DIR__ . '/src/PageBuilder/Application/CreateLayout.php';
require_once __DIR__ . '/src/PageBuilder/Application/UpdateLayout.php';
require_once __DIR__ . '/src/PageBuilder/Application/DeleteLayout.php';
require_once __DIR__ . '/src/Support/Validators/TemplateValidator.php';
require_once __DIR__ . '/src/Support/Validators/LayoutValidator.php';
require_once __DIR__ . '/src/Routing/Domain/Repository/ReservedPathRepositoryInterface.php';
require_once __DIR__ . '/src/Routing/Infrastructure/LemurDbReservedPathRepository.php';
require_once __DIR__ . '/src/Routing/Domain/Service/ReservedPathChecker.php';
require_once __DIR__ . '/src/Routing/Application/ListReservedPaths.php';
require_once __DIR__ . '/src/Routing/Application/AddReservedPath.php';
require_once __DIR__ . '/src/Routing/Application/RemoveReservedPath.php';
require_once __DIR__ . '/src/Http/Controllers/TemplateController.php';
require_once __DIR__ . '/src/Http/Controllers/ComponentDefinitionController.php';
require_once __DIR__ . '/src/Http/Controllers/LayoutController.php';
require_once __DIR__ . '/src/Http/Controllers/ReservedPathController.php';
require_once __DIR__ . '/src/Http/Controllers/HomeController.php';
require_once __DIR__ . '/src/Http/Controllers/ImportController.php';

// ── Import Module ────────────────────────────────────────────────────────────
require_once __DIR__ . '/src/PageBuilder/Import/Contract/RuleInterface.php';
require_once __DIR__ . '/src/PageBuilder/Import/ImportWarning.php';
require_once __DIR__ . '/src/PageBuilder/Import/ImportResult.php';
require_once __DIR__ . '/src/PageBuilder/Import/ClassHelper.php';
require_once __DIR__ . '/src/PageBuilder/Import/RuleRegistry.php';
require_once __DIR__ . '/src/PageBuilder/Import/RuleEngine.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/FallbackRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Bootstrap/ContainerRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Bootstrap/RowRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Bootstrap/ColRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Bootstrap/CardRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Bootstrap/ButtonRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Bootstrap/ButtonGroupRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Bootstrap/ListGroupRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Bootstrap/AccordionRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Bootstrap/CarouselRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Bootstrap/CollapseRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Bootstrap/OffcanvasRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Bootstrap/ToastRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Bootstrap/TooltipRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Bootstrap/BreadcrumbRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Bootstrap/ScrollspyRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Semantic/SemanticSectionRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Semantic/HeadingRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Semantic/ParagraphRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Semantic/ImageRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Semantic/PictureRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Semantic/FigureRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Semantic/DetailsRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Semantic/InlineTextRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Semantic/DividerRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Semantic/AnchorRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Generic/GenericDivRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/Rules/Generic/SpanRule.php';
require_once __DIR__ . '/src/PageBuilder/Import/HtmlImporter.php';

// ── DynamicModule Layer ──────────────────────────────────────────────────────
require_once __DIR__ . '/src/DynamicModule/Domain/Entity/ModuleFieldType.php';
require_once __DIR__ . '/src/DynamicModule/Domain/Entity/ModuleField.php';
require_once __DIR__ . '/src/DynamicModule/Domain/Entity/ModuleDefinition.php';
require_once __DIR__ . '/src/DynamicModule/Domain/Repository/ModuleDefinitionRepositoryInterface.php';
require_once __DIR__ . '/src/DynamicModule/Domain/Repository/GenericModuleRepositoryInterface.php';
require_once __DIR__ . '/src/DynamicModule/Infrastructure/DynamicTableManager.php';
require_once __DIR__ . '/src/DynamicModule/Infrastructure/LemurDbModuleDefinitionRepository.php';
require_once __DIR__ . '/src/DynamicModule/Infrastructure/GenericModuleRepository.php';
require_once __DIR__ . '/src/DynamicModule/Application/CreateDynamicModule.php';
require_once __DIR__ . '/src/DynamicModule/Application/UpdateDynamicModule.php';
require_once __DIR__ . '/src/DynamicModule/Application/DeleteDynamicModule.php';
require_once __DIR__ . '/src/DynamicModule/Application/GetModuleDefinition.php';
require_once __DIR__ . '/src/DynamicModule/Application/ListDynamicModules.php';
require_once __DIR__ . '/src/DynamicModule/Infrastructure/DynamicModuleDataProvider.php';
require_once __DIR__ . '/src/DynamicModule/Infrastructure/ApiDataProvider.php';


// ── Database Connection ──────────────────────────────────────────────────────
$driver = \LemurCms\Support\Infrastructure\EnvironmentGuard::get('DB_CONNECTION', 'mysql');
if ($driver === 'mariadb') {
    $driver = 'mysql';
}
$db = \LemurDB::getInstance([
    'driver'   => $driver,
    'host'     => \LemurCms\Support\Infrastructure\EnvironmentGuard::get('DB_HOST', 'localhost'),
    'port'     => (int) \LemurCms\Support\Infrastructure\EnvironmentGuard::get('DB_PORT', 3306),
    'db'       => \LemurCms\Support\Infrastructure\EnvironmentGuard::get('DB_NAME', \LemurCms\Support\Infrastructure\EnvironmentGuard::get('DB_DATABASE', 'lemur_cms')),
    'username' => \LemurCms\Support\Infrastructure\EnvironmentGuard::get('DB_USER', \LemurCms\Support\Infrastructure\EnvironmentGuard::get('DB_USERNAME', 'root')),
    'password' => \LemurCms\Support\Infrastructure\EnvironmentGuard::get('DB_PASS', \LemurCms\Support\Infrastructure\EnvironmentGuard::get('DB_PASSWORD', '')),
    'prefix'   => \LemurCms\Support\Infrastructure\EnvironmentGuard::get('DB_PREFIX', 'cms_'),
]);

// ── Create Repositories (Dependency Injection) ───────────────────────────────
$menuRepository  = new \LemurCms\Menu\Infrastructure\LemurDbMenuRepository($db);
$pageRepository  = new \LemurCms\Page\Infrastructure\LemurDbPageRepository($db);
$seoRepository   = new \LemurCms\Seo\Infrastructure\LemurDbSeoRepository($db);
$mediaRepository = new \LemurCms\Media\Infrastructure\LemurDbMediaRepository($db);
$userRepository  = new \LemurCms\Auth\Infrastructure\LemurDbUserRepository($db);
$templateRepository = new \LemurCms\PageBuilder\Infrastructure\LemurDbTemplateRepository($db);
$componentDefinitionRepository = new \LemurCms\PageBuilder\Infrastructure\LemurDbComponentDefinitionRepository($db);
$pageLayoutRepository    = new \LemurCms\PageBuilder\Infrastructure\LemurDbPageLayoutRepository($db);
$reservedPathRepository  = new \LemurCms\Routing\Infrastructure\LemurDbReservedPathRepository($db);
$moduleDefinitionRepository = new \LemurCms\DynamicModule\Infrastructure\LemurDbModuleDefinitionRepository($db);
$genericModuleRepository    = new \LemurCms\DynamicModule\Infrastructure\GenericModuleRepository($db);
$dynamicTableManager        = new \LemurCms\DynamicModule\Infrastructure\DynamicTableManager($db);


// ── Create Use Cases ─────────────────────────────────────────────────────────
$menuCache             = new \LemurCms\Menu\Presentation\LemurMenuCache(__DIR__);
$menuRenderer          = new \LemurCms\Menu\Presentation\LemurMenuRenderer();
$bannerRenderer        = new \LemurCms\Menu\Presentation\BannerRenderer($menuRepository);
$breadcrumbBuilder     = new \LemurCms\Menu\Presentation\BreadcrumbBuilder();
$notificationPresenter = new \LemurCms\Menu\Presentation\NotificationPresenter();

$getMainNavbar    = new \LemurCms\Menu\Application\GetMainNavbar($menuRepository);
$getNavbar        = new \LemurCms\Menu\Application\GetNavbar($menuRepository, $menuRenderer, $menuCache);
$createMenuItem   = new \LemurCms\Menu\Application\CreateMenuItem($menuRepository);
$updateMenuItem   = new \LemurCms\Menu\Application\UpdateMenuItem($menuRepository);
$deleteMenuItem   = new \LemurCms\Menu\Application\DeleteMenuItem($menuRepository);
$saveBanner       = new \LemurCms\Menu\Application\SaveBanner($menuRepository);
$saveLogo         = new \LemurCms\Menu\Application\SaveLogo($menuRepository);

$getPageBySlug    = new \LemurCms\Page\Application\GetPageBySlug($pageRepository);
$getPageById      = new \LemurCms\Page\Application\GetPageById($pageRepository);
$treeNormalizer   = new \LemurCms\PageBuilder\Domain\Service\TreeNormalizer();
$createPage       = new \LemurCms\Page\Application\CreatePage($pageRepository, $treeNormalizer);
$updatePage       = new \LemurCms\Page\Application\UpdatePage($pageRepository, $treeNormalizer);
$publishPage      = new \LemurCms\Page\Application\PublishPage($pageRepository);
$deletePage       = new \LemurCms\Page\Application\DeletePage($pageRepository);
$listPages        = new \LemurCms\Page\Application\ListPages($pageRepository);

$getSeoForEntity  = new \LemurCms\Seo\Application\GetSeoForEntity($seoRepository);
$upsertSeo        = new \LemurCms\Seo\Application\UpsertSeo($seoRepository);

$storeMedia       = new \LemurCms\Media\Application\StoreMedia($mediaRepository);
$deleteMedia      = new \LemurCms\Media\Application\DeleteMedia($mediaRepository);
$listMedia        = new \LemurCms\Media\Application\ListMedia($mediaRepository);
$findMediaById    = new \LemurCms\Media\Application\FindMediaById($mediaRepository);

$authenticateUser = new \LemurCms\Auth\Application\AuthenticateUser($userRepository);
$createUser       = new \LemurCms\Auth\Application\CreateUser($userRepository);
$assignRole       = new \LemurCms\Auth\Application\AssignRole($userRepository);
$checkPermission  = new \LemurCms\Auth\Application\CheckPermission($userRepository);
$changePassword   = new \LemurCms\Auth\Application\ChangePassword($userRepository);

$listTemplates            = new \LemurCms\PageBuilder\Application\ListTemplates($templateRepository);
$getTemplateById          = new \LemurCms\PageBuilder\Application\GetTemplateById($templateRepository);
$createTemplate           = new \LemurCms\PageBuilder\Application\CreateTemplate($templateRepository);
$deleteTemplate           = new \LemurCms\PageBuilder\Application\DeleteTemplate($templateRepository);
$listComponentDefinitions = new \LemurCms\PageBuilder\Application\ListComponentDefinitions($componentDefinitionRepository);

$listLayouts      = new \LemurCms\PageBuilder\Application\ListLayouts($pageLayoutRepository);
$getLayoutById    = new \LemurCms\PageBuilder\Application\GetLayoutById($pageLayoutRepository);
$getDefaultLayout = new \LemurCms\PageBuilder\Application\GetDefaultLayout($pageLayoutRepository);
$createLayout     = new \LemurCms\PageBuilder\Application\CreateLayout($pageLayoutRepository);
$updateLayout     = new \LemurCms\PageBuilder\Application\UpdateLayout($pageLayoutRepository);
$deleteLayout     = new \LemurCms\PageBuilder\Application\DeleteLayout($pageLayoutRepository);

// ── Render Engine services ───────────────────────────────────────────────────
$loopResolver         = new \LemurCms\PageBuilder\Domain\Service\LoopResolver();

// Register Data Providers
$loopResolver->register('api', new \LemurCms\DynamicModule\Infrastructure\ApiDataProvider());
try {
    $activeModules = $moduleDefinitionRepository->listAll();
    foreach ($activeModules as $moduleDef) {
        $loopResolver->register(
            'module:' . $moduleDef->moduleSlug,
            new \LemurCms\DynamicModule\Infrastructure\DynamicModuleDataProvider(
                $moduleDef->tableName(),
                $genericModuleRepository
            )
        );
    }
} catch (\Throwable $e) {
    // Avoid blocking bootstrap if DB is not migrated or connection is pending
}

$variableInterpolator = new \LemurCms\PageBuilder\Domain\Service\VariableInterpolator();
$bladeRenderer        = new \LemurCms\PageBuilder\Domain\Service\BladeRenderer($loopResolver, $variableInterpolator);
$layoutRenderer       = new \LemurCms\PageBuilder\Domain\Service\LayoutRenderer();
$reservedPathChecker  = new \LemurCms\Routing\Domain\Service\ReservedPathChecker($reservedPathRepository);

$listReservedPaths   = new \LemurCms\Routing\Application\ListReservedPaths($reservedPathRepository);
$addReservedPath     = new \LemurCms\Routing\Application\AddReservedPath($reservedPathRepository);
$removeReservedPath  = new \LemurCms\Routing\Application\RemoveReservedPath($reservedPathRepository);

$createDynamicModule = new \LemurCms\DynamicModule\Application\CreateDynamicModule($db, $moduleDefinitionRepository, $dynamicTableManager);
$updateDynamicModule = new \LemurCms\DynamicModule\Application\UpdateDynamicModule($db, $moduleDefinitionRepository, $dynamicTableManager);
$deleteDynamicModule = new \LemurCms\DynamicModule\Application\DeleteDynamicModule($db, $moduleDefinitionRepository, $dynamicTableManager);
$getModuleDefinition = new \LemurCms\DynamicModule\Application\GetModuleDefinition($moduleDefinitionRepository);
$listDynamicModules  = new \LemurCms\DynamicModule\Application\ListDynamicModules($moduleDefinitionRepository);


// ── Export container (opcional: devolver un contenedor manual) ───────────────
return [
    'db'                 => $db,
    'auth'               => new \LemurCms\Auth\AuthManager(new \LemurCms\Auth\Drivers\SessionDriver($db)),
    'repositories' => [
        'menu'                => $menuRepository,
        'page'                => $pageRepository,
        'seo'                 => $seoRepository,
        'media'               => $mediaRepository,
        'user'                => $userRepository,
        'template'            => $templateRepository,
        'componentDefinition' => $componentDefinitionRepository,
        'pageLayout'          => $pageLayoutRepository,
        'reservedPath'        => $reservedPathRepository,
        'moduleDefinition'    => $moduleDefinitionRepository,
        'genericModule'       => $genericModuleRepository,
    ],
    'presentation' => [
        'menuCache'              => $menuCache,
        'menuRenderer'           => $menuRenderer,
        'bannerRenderer'         => $bannerRenderer,
        'breadcrumbBuilder'      => $breadcrumbBuilder,
        'notificationPresenter'  => $notificationPresenter,
    ],
    'services' => [
        'loopResolver'         => $loopResolver,
        'variableInterpolator' => $variableInterpolator,
        'bladeRenderer'        => $bladeRenderer,
        'layoutRenderer'       => $layoutRenderer,
    ],
    'loopResolver'  => $loopResolver,
    'bladeRenderer' => $bladeRenderer,
    'layoutRenderer'      => $layoutRenderer,
    'reservedPathChecker' => $reservedPathChecker,
    'useCases' => [
        // Menu
        'getMainNavbar'    => $getMainNavbar,
        'getNavbar'        => $getNavbar,
        'createMenuItem'   => $createMenuItem,
        'updateMenuItem'   => $updateMenuItem,
        'deleteMenuItem'   => $deleteMenuItem,
        'saveBanner'       => $saveBanner,
        'saveLogo'         => $saveLogo,
        // Page
        'getPageBySlug'    => $getPageBySlug,
        'getPageById'      => $getPageById,
        'createPage'       => $createPage,
        'updatePage'       => $updatePage,
        'publishPage'      => $publishPage,
        'deletePage'       => $deletePage,
        'listPages'        => $listPages,
        // Seo
        'getSeoForEntity'  => $getSeoForEntity,
        'upsertSeo'        => $upsertSeo,
        // Media
        'storeMedia'       => $storeMedia,
        'deleteMedia'      => $deleteMedia,
        'listMedia'        => $listMedia,
        'findMediaById'    => $findMediaById,
        // Auth
        'authenticateUser' => $authenticateUser,
        'createUser'       => $createUser,
        'assignRole'       => $assignRole,
        'checkPermission'  => $checkPermission,
        'changePassword'   => $changePassword,
        // PageBuilder
        'listTemplates'            => $listTemplates,
        'getTemplateById'          => $getTemplateById,
        'createTemplate'           => $createTemplate,
        'deleteTemplate'           => $deleteTemplate,
        'listComponentDefinitions' => $listComponentDefinitions,
        // Layout
        'listLayouts'      => $listLayouts,
        'getLayoutById'    => $getLayoutById,
        'getDefaultLayout' => $getDefaultLayout,
        'createLayout'     => $createLayout,
        'updateLayout'     => $updateLayout,
        'deleteLayout'     => $deleteLayout,
        // Routing
        'listReservedPaths'  => $listReservedPaths,
        'addReservedPath'    => $addReservedPath,
        'removeReservedPath' => $removeReservedPath,
        // DynamicModule
        'createDynamicModule' => $createDynamicModule,
        'updateDynamicModule' => $updateDynamicModule,
        'deleteDynamicModule' => $deleteDynamicModule,
        'getModuleDefinition' => $getModuleDefinition,
        'listDynamicModules'  => $listDynamicModules,
    ],
];
