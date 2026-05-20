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

// ── Database Connection ──────────────────────────────────────────────────────
$db = \LemurDB::getInstance([
    'driver'   => 'mysql',
    'host'     => \LemurCms\Support\Infrastructure\EnvironmentGuard::get('DB_HOST', 'localhost'),
    'port'     => (int) \LemurCms\Support\Infrastructure\EnvironmentGuard::get('DB_PORT', 3306),
    'db'       => \LemurCms\Support\Infrastructure\EnvironmentGuard::get('DB_NAME', 'lemur_cms'),
    'username' => \LemurCms\Support\Infrastructure\EnvironmentGuard::get('DB_USER', 'root'),
    'password' => \LemurCms\Support\Infrastructure\EnvironmentGuard::get('DB_PASS', ''),
    'prefix'   => \LemurCms\Support\Infrastructure\EnvironmentGuard::get('DB_PREFIX', 'cms_'),
]);

// ── Create Repositories (Dependency Injection) ───────────────────────────────
$menuRepository  = new \LemurCms\Menu\Infrastructure\LemurDbMenuRepository($db);
$pageRepository  = new \LemurCms\Page\Infrastructure\LemurDbPageRepository($db);
$seoRepository   = new \LemurCms\Seo\Infrastructure\LemurDbSeoRepository($db);
$mediaRepository = new \LemurCms\Media\Infrastructure\LemurDbMediaRepository($db);
$userRepository  = new \LemurCms\Auth\Infrastructure\LemurDbUserRepository($db);

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
$createPage       = new \LemurCms\Page\Application\CreatePage($pageRepository);
$updatePage       = new \LemurCms\Page\Application\UpdatePage($pageRepository);
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

// ── Export container (opcional: devolver un contenedor manual) ───────────────
return [
    'db'                 => $db,
    'auth'               => new \LemurCms\Auth\AuthManager(new \LemurCms\Auth\Drivers\SessionDriver($db)),
    'repositories' => [
        'menu'   => $menuRepository,
        'page'   => $pageRepository,
        'seo'    => $seoRepository,
        'media'  => $mediaRepository,
        'user'   => $userRepository,
    ],
    'presentation' => [
        'menuCache'              => $menuCache,
        'menuRenderer'           => $menuRenderer,
        'bannerRenderer'         => $bannerRenderer,
        'breadcrumbBuilder'      => $breadcrumbBuilder,
        'notificationPresenter'  => $notificationPresenter,
    ],
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
    ],
];
