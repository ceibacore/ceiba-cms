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
        $host = getenv('DB_HOST') ?: 'localhost';
        $name = getenv('DB_NAME') ?: 'cms_test';
        $user = getenv('DB_USER') ?: 'root';
        $pass = getenv('DB_PASS') ?: '';
        $prefix = getenv('DB_PREFIX') ?: 'cms_';

        $this->db = new \LemurDB($host, $name, $user, $pass, $prefix);
    }

    protected function tearDown(): void
    {
        parent::tearDown();
        // Optional: Clean up test data
    }
}
