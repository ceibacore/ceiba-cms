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
$allowedOrigin = '*';
if (isset($_SERVER['HTTP_ORIGIN'])) {
    $origin = $_SERVER['HTTP_ORIGIN'];
    // Validar origen: permitir solo localhost, dominios autorizados en variables de entorno, o el host actual
    $parsedOrigin = parse_url($origin, PHP_URL_HOST);
    $currentHost = $_SERVER['HTTP_HOST'] ?? '';
    
    // Si coincide con localhost, 127.0.0.1, o el host de la petición actual, permitirlo
    if ($parsedOrigin === 'localhost' || $parsedOrigin === '127.0.0.1' || str_ends_with($currentHost, $parsedOrigin ?? '')) {
        $allowedOrigin = $origin;
    }
}

header('Access-Control-Allow-Origin: ' . $allowedOrigin);
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Cargar router
$router = require __DIR__ . '/../routes/api.php';

// Despachar request
$router->dispatch();
