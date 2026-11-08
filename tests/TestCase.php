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
        
        // Database-backed tests need explicit credentials (never hard-coded):
        // DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS and optionally DB_PREFIX.
        $host = getenv('DB_HOST');
        $user = getenv('DB_USER');
        if (!$host || !$user || getenv('DB_PASS') === false) {
            $this->markTestSkipped('Set DB_HOST, DB_PORT, DB_NAME, DB_USER and DB_PASS to run database tests.');
        }

        $this->db = \LemurDB::getInstance([
            'driver'   => 'mysql',
            'host'     => $host,
            'port'     => (int) (getenv('DB_PORT') ?: 3306),
            'db'       => getenv('DB_NAME') ?: 'cms_test',
            'username' => $user,
            'password' => (string) getenv('DB_PASS'),
            'prefix'   => getenv('DB_PREFIX') ?: 't_',
            'timeout'  => 5,
        ]);
    }

    protected function tearDown(): void
    {
        parent::tearDown();
        // Optional: Clean up test data
    }
}
