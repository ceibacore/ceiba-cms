#!/usr/bin/env php
<?php

declare(strict_types=1);

/**
 * Lemur CMS - CLI Entry Point
 * 
 * Usage: php bin/lemur <command> [options]
 */

// Cargar bootstrap
require_once __DIR__ . '/../bootstrap.php';

// Cargar clases CLI
require_once __DIR__ . '/CliKernel.php';
require_once __DIR__ . '/commands/Command.php';
require_once __DIR__ . '/commands/MigrateCommand.php';
require_once __DIR__ . '/commands/CacheClearCommand.php';
require_once __DIR__ . '/commands/CreateUserCommand.php';
require_once __DIR__ . '/commands/ListMigrationsCommand.php';

use LemurCms\CliKernel;
use LemurCms\Commands\MigrateCommand;
use LemurCms\Commands\CacheClearCommand;
use LemurCms\Commands\CreateUserCommand;
use LemurCms\Commands\ListMigrationsCommand;

// Crear kernel
$kernel = new CliKernel();

// Registrar comandos
$kernel->registerCommand('migrate', new MigrateCommand($container['db']->getPDO()));
$kernel->registerCommand('cache:clear', new CacheClearCommand($container['presentation']['menuCache']));
$kernel->registerCommand('user:create', new CreateUserCommand($container['repositories']['user']));
$kernel->registerCommand('migrate:list', new ListMigrationsCommand());

// Ejecutar
exit($kernel->run($argv));
