<?php

declare(strict_types=1);

/**
 * Lemur CMS Configuration
 * 
 * Configuración centralizada para toda la aplicación
 */

return [
    // ── Cache Configuration ──────────────────────────────────────────────────
    'cache' => [
        'driver' => 'file', // file|redis|memcached
        'ttl'    => 3600,   // segundos (1 hora)
        'path'   => __DIR__ . '/../storage/cache',
    ],

    // ── Menu Configuration ───────────────────────────────────────────────────
    'menu' => [
        'types' => ['main', 'footer', 'sidebar', 'mobile'],
        'default_type' => 'main',
        'max_depth' => 5,
        'cache_enabled' => true,
    ],

    // ── Page Configuration ───────────────────────────────────────────────────
    'page' => [
        'statuses' => ['draft', 'published', 'archived'],
        'default_status' => 'draft',
        'default_template' => 'default',
        'templates' => ['default', 'blank', 'full-width', 'sidebar'],
        'items_per_page' => 20,
    ],

    // ── Media Configuration ──────────────────────────────────────────────────
    'media' => [
        'disks' => ['local', 's3', 'azure'],
        'default_disk' => 'local',
        'path' => '/storage/uploads',
        'max_file_size' => 52428800, // 50MB
        'allowed_mimes' => [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
    ],

    // ── Auth Configuration ───────────────────────────────────────────────────
    'auth' => [
        'password_algorithm' => PASSWORD_BCRYPT,
        'session_lifetime' => 3600,
        'remember_lifetime' => 604800, // 7 días
        'default_role' => 'user',
        'admin_roles' => ['admin', 'super_admin'],
    ],

    // ── SEO Configuration ────────────────────────────────────────────────────
    'seo' => [
        'default_robots' => 'index,follow',
        'og_types' => ['website', 'article', 'product', 'profile'],
        'default_og_type' => 'website',
    ],

    // ── Database Configuration ───────────────────────────────────────────────
    'database' => [
        'driver'   => $_ENV['DB_DRIVER'] ?? 'mysql',
        'host'     => $_ENV['DB_HOST'] ?? 'localhost',
        'port'     => $_ENV['DB_PORT'] ?? 3306,
        'name'     => $_ENV['DB_NAME'] ?? 'lemur_cms',
        'username' => $_ENV['DB_USER'] ?? 'root',
        'password' => $_ENV['DB_PASS'] ?? '',
        'prefix'   => $_ENV['DB_PREFIX'] ?? 'cms_',
        'charset'  => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
    ],

    // ── Pagination Configuration ─────────────────────────────────────────────
    'pagination' => [
        'per_page' => 20,
        'max_links' => 5,
    ],

    // ── Logger Configuration ────────────────────────────────────────────────
    'logging' => [
        'enabled' => true,
        'path' => __DIR__ . '/../storage/logs',
        'level' => $_ENV['LOG_LEVEL'] ?? 'error',
    ],
];
