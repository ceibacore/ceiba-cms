<?php
declare(strict_types=1);
namespace LemurCms\Tests;

use PHPUnit\Framework\TestCase as PHPUnitTestCase;

abstract class TestCase extends PHPUnitTestCase
{
    protected \LemurDB $db;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Initialize test database connection
        // Configure with environment or defaults
        $host = getenv('DB_HOST') ?: '127.0.0.1';
        $port = (int) (getenv('DB_PORT') ?: 3307);
        $name = getenv('DB_NAME') ?: 'cms_test';
        $user = getenv('DB_USER') ?: 'manager';
        $pass = getenv('DB_PASS') ?: 'Manager2026x';
        $prefix = getenv('DB_PREFIX') ?: 'cms_';

        $this->db = \LemurDB::getInstance([
            'driver'   => 'mysql',
            'host'     => $host,
            'port'     => $port,
            'db'       => $name,
            'username' => $user,
            'password' => $pass,
            'prefix'   => $prefix,
        ]);
    }

    protected function tearDown(): void
    {
        parent::tearDown();
        // Optional: Clean up test data
    }
}
