<?php
declare(strict_types=1);

// Database connection and repositories. Loaded in order by bootstrap.php (shared scope).

// ── Database Connection ──────────────────────────────────────────────────────
$driver = \CeibaCms\Support\Infrastructure\EnvironmentGuard::get('DB_CONNECTION', 'mysql');
if ($driver === 'mariadb') {
    $driver = 'mysql';
}
$db = \CeibaDB::getInstance([
    'driver'   => $driver,
    'host'     => \CeibaCms\Support\Infrastructure\EnvironmentGuard::get('DB_HOST', 'localhost'),
    'port'     => (int) \CeibaCms\Support\Infrastructure\EnvironmentGuard::get('DB_PORT', 3306),
    'db'       => \CeibaCms\Support\Infrastructure\EnvironmentGuard::get('DB_NAME', \CeibaCms\Support\Infrastructure\EnvironmentGuard::get('DB_DATABASE', 'ceiba_cms')),
    'username' => \CeibaCms\Support\Infrastructure\EnvironmentGuard::get('DB_USER', \CeibaCms\Support\Infrastructure\EnvironmentGuard::get('DB_USERNAME', 'root')),
    'password' => \CeibaCms\Support\Infrastructure\EnvironmentGuard::get('DB_PASS', \CeibaCms\Support\Infrastructure\EnvironmentGuard::get('DB_PASSWORD', '')),
    'prefix'   => \CeibaCms\Support\Infrastructure\EnvironmentGuard::get('DB_PREFIX', 'cms_'),
]);

// ── Create Repositories (Dependency Injection) ───────────────────────────────
$menuRepository  = new \CeibaCms\Menu\Infrastructure\CeibaDbMenuRepository($db);
$pageRepository  = new \CeibaCms\Page\Infrastructure\CeibaDbPageRepository($db);
$seoRepository   = new \CeibaCms\Seo\Infrastructure\CeibaDbSeoRepository($db);
$mediaRepository = new \CeibaCms\Media\Infrastructure\CeibaDbMediaRepository($db);
$userRepository  = new \CeibaCms\Auth\Infrastructure\CeibaDbUserRepository($db);
$templateRepository = new \CeibaCms\PageBuilder\Infrastructure\CeibaDbTemplateRepository($db);
$componentDefinitionRepository = new \CeibaCms\PageBuilder\Infrastructure\CeibaDbComponentDefinitionRepository($db);
$pageLayoutRepository    = new \CeibaCms\PageBuilder\Infrastructure\CeibaDbPageLayoutRepository($db);
$reservedPathRepository  = new \CeibaCms\Routing\Infrastructure\CeibaDbReservedPathRepository($db);
$moduleDefinitionRepository = new \CeibaCms\DynamicModule\Infrastructure\CeibaDbModuleDefinitionRepository($db);
$genericModuleRepository    = new \CeibaCms\DynamicModule\Infrastructure\GenericModuleRepository($db);
$dynamicTableManager        = new \CeibaCms\DynamicModule\Infrastructure\DynamicTableManager($db);
$settingsRepository         = new \CeibaCms\Settings\Infrastructure\CeibaDbSettingsRepository($db);
$languageRepository         = new \CeibaCms\Localization\Infrastructure\CeibaDbLanguageRepository($db);
$translationRepository      = new \CeibaCms\Localization\Infrastructure\CeibaDbTranslationRepository($db);
