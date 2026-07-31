<?php
/**
 * PHPUnit Bootstrap File
 */
declare(strict_types=1);

// Load Composer autoloader
require_once __DIR__ . '/../vendor/autoload.php';

// Load LemurDB
require_once __DIR__ . '/../lemurdb/lemurdb.php';

// Load project PSR-4 autoloader if needed
$loader = new \Composer\Autoload\ClassLoader();
$loader->addPsr4('LemurCms\\Tests\\', __DIR__);
$loader->addPsr4('LemurCms\\', __DIR__ . '/../src');
$loader->register();
