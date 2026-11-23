<?php
declare(strict_types=1);

// Environment configuration. Loaded in order by bootstrap.php (shared scope).

// ── Environment Configuration ───────────────────────────────────────────────
require_once dirname(__DIR__) . '/src/Support/Infrastructure/EnvironmentGuard.php';
\CeibaCms\Support\Infrastructure\EnvironmentGuard::check();

require_once dirname(__DIR__) . '/src/Migration/CmsMigrationGenerator.php';
require_once dirname(__DIR__) . '/src/Migration/CmsSchemaBuilder.php';
require_once dirname(__DIR__) . '/src/Migration/CmsBaseMigration.php';
require_once dirname(__DIR__) . '/src/Migration/CmsColumnBlueprint.php';
require_once dirname(__DIR__) . '/src/Migration/CmsColumnDef.php';
require_once dirname(__DIR__) . '/src/Migration/GeneratorResult.php';
require_once dirname(__DIR__) . '/src/Migration/Dialect/CmsDialectInterface.php';
require_once dirname(__DIR__) . '/src/Migration/Dialect/MySQLDialect.php';
require_once dirname(__DIR__) . '/src/Migration/CmsMigrationRunner.php';
require_once dirname(__DIR__) . '/src/Seeder/CmsSeeder.php';
require_once dirname(__DIR__) . '/src/Seeder/CmsSeederRunner.php';
