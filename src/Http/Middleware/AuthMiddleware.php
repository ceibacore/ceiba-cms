<?php
declare(strict_types=1);

namespace LemurCms\Http\Middleware;

use LemurCms\Auth\AuthManager;

class AuthMiddleware implements MiddlewareInterface
{
    public function __construct(private readonly AuthManager $auth) {}

    public function handle(\Closure $next, ...$params): mixed
    {
        if (!$this->auth->check()) {
            http_response_code(401);
            echo json_encode(['error' => 'Unauthorized']);
            return null; // Stop pipeline
        }

        return $next();
    }
}
