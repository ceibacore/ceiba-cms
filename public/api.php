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
$allowedOrigin = '';
if (isset($_SERVER['HTTP_ORIGIN'])) {
    $origin = $_SERVER['HTTP_ORIGIN'];
    $parsedOrigin = parse_url($origin, PHP_URL_HOST);
    $currentHost = $_SERVER['HTTP_HOST'] ?? '';
    
    // Validar origen: permitir solo localhost, dominios autorizados o el host actual.
    // Usar comparación exacta en vez de str_ends_with
    if ($parsedOrigin === 'localhost' || $parsedOrigin === '127.0.0.1' || $currentHost === $parsedOrigin) {
        $allowedOrigin = $origin;
    }
}

if ($allowedOrigin !== '') {
    header('Access-Control-Allow-Origin: ' . $allowedOrigin);
    header('Access-Control-Allow-Credentials: true');
} else {
    // Si no coincide o no es confiable, y necesitamos que funcione para públicos:
    // Solo podemos enviar * si no enviamos credenciales.
    if (!isset($_SERVER['HTTP_ORIGIN'])) {
        header('Access-Control-Allow-Origin: *');
    }
}

header('Vary: Origin');
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