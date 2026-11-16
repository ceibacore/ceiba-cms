<?php
/**
 * PHPUnit Bootstrap File
 */
declare(strict_types=1);

// Load Composer autoloader
require_once __DIR__ . '/../vendor/autoload.php';

// Load CeibaDB

// Load project PSR-4 autoloader if needed
$loader = new \Composer\Autoload\ClassLoader();
$loader->addPsr4('CeibaCms\\Tests\\', __DIR__);
$loader->addPsr4('CeibaCms\\', __DIR__ . '/../src');
$loader->register();
