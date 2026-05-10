<?php

declare(strict_types=1);

/**
 * API Entry Point - Lemur CMS
 * 
 * Punto de entrada para todas las rutas API
 * 
 * Usage:
 * GET  /api/menus/main
 * POST /api/menus/items
 * GET  /api/pages
 * POST /api/cache/clear
 */

// Configurar headers CORS y seguridad
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Cargar router
$router = require __DIR__ . '/routes/api.php';

// Despachar request
$router->dispatch();
