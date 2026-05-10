<?php
declare(strict_types=1);

/**
 * Generate Lemur CMS schema
 * 
 * php bin/generate-schema.php
 */

require_once __DIR__ . '/../lemurdb/lemurdb.php';
require_once __DIR__ . '/../src/Migration/CmsMigrationGenerator.php';
require_once __DIR__ . '/../src/Migration/CmsSchemaBuilder.php';
require_once __DIR__ . '/../src/Migration/CmsBaseMigration.php';
require_once __DIR__ . '/../src/Migration/CmsColumnBlueprint.php';
require_once __DIR__ . '/../src/Migration/CmsColumnDef.php';
require_once __DIR__ . '/../src/Migration/GeneratorResult.php';
require_once __DIR__ . '/../src/Migration/Dialect/CmsDialectInterface.php';
require_once __DIR__ . '/../src/Migration/Dialect/MySQLDialect.php';

$generator = new \LemurCms\Migration\CmsMigrationGenerator(
    __DIR__ . '/../migrations',
    prefix: 'cms_'
);

$result = $generator->generate(__DIR__ . '/../storage/schema.sql');

if ($result->success) {
    echo "✓ Schema generated: " . $result->outputFile . "\n";
    echo "✓ Migrations: " . count($result->migrations) . "\n";
} else {
    echo "✗ Errors:\n";
    foreach ($result->errors as $err) {
        echo "  {$err['version']}: {$err['message']}\n";
    }
    exit(1);
}
