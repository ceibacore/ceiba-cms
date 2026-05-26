<?php

declare(strict_types=1);

namespace LemurCms;

/**
 * Public entry point for Lemur CMS.
 *
 * Allows host applications to configure CMS programmatically
 * without relying on framework-specific bootstrapping.
 *
 * Usage:
 *   \LemurCms\LemurCms::boot([
 *       'DB_DRIVER'   => 'mysql',
 *       'DB_HOST'     => '127.0.0.1',
 *       'DB_PORT'     => '3306',
 *       'DB_NAME'     => 'tenant_db',
 *       'DB_USER'     => 'db_user',
 *       'DB_PASS'     => 'secret',
 *       'DB_PREFIX'   => 'cms_',
 *   ]);
 */
final class LemurCms
{
    private function __construct() {}

    /**
     * Configure CMS from a key-value array instead of relying solely on environment variables.
     * Writes values to both $_ENV and putenv() for maximum compatibility.
     *
     * @param array<string, string|int> $config
     */
    public static function boot(array $config = []): void
    {
        foreach ($config as $key => $value) {
            $value = (string) $value;
            putenv("{$key}={$value}");
            $_ENV[$key] = $value;
        }
    }
}
