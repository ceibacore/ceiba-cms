<?php
declare(strict_types=1);

namespace LemurCms\Http\Middleware;

class CsrfMiddleware implements MiddlewareInterface
{
    private const CSRF_SESSION_KEY = '_cms_csrf_token';

    public function __construct()
    {
        if (session_status() === PHP_SESSION_NONE && !headers_sent()) {
            session_start();
        }
    }

    /**
     * Generate or return existing CSRF token
     */
    public static function getToken(): string
    {
        if (session_status() === PHP_SESSION_NONE && !headers_sent()) {
            session_start();
        }

        if (empty($_SESSION[self::CSRF_SESSION_KEY])) {
            $_SESSION[self::CSRF_SESSION_KEY] = bin2hex(random_bytes(32));
        }

        return $_SESSION[self::CSRF_SESSION_KEY];
    }

    public function handle(\Closure $next, ...$params): mixed
    {
        $method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');

        // Only validate mutating HTTP methods
        if (in_array($method, ['POST', 'PUT', 'PATCH', 'DELETE'], true)) {
            $sessionToken = $_SESSION[self::CSRF_SESSION_KEY] ?? '';

            // Retrieve token from POST payload or headers
            $inputToken = $_POST['_csrf_token']
                ?? $_SERVER['HTTP_X_CSRF_TOKEN']
                ?? $_SERVER['HTTP_X_XSRF_TOKEN']
                ?? '';

            if (empty($sessionToken) || empty($inputToken) || !hash_equals($sessionToken, (string)$inputToken)) {
                http_response_code(403);
                header('Content-Type: application/json');
                echo json_encode([
                    'error' => 'CSRF Token Mismatch or Missing',
                    'code'  => 403
                ]);
                return null;
            }
        }

        return $next();
    }
}