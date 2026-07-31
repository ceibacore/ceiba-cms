<?php
declare(strict_types=1);

namespace LemurCms\Http\Middleware;

use LemurDB;

class ModuleMiddleware implements MiddlewareInterface
{
    public function __construct(private readonly LemurDB $db) {}

    public function handle(\Closure $next, ...$params): mixed
    {
        $moduleSlug = $params[0] ?? null;

        if (!$moduleSlug) {
            return $next();
        }

        $module = $this->db->query('modules')->where(['slug' => $moduleSlug])->first();

        // If module doesn't exist or is inactive, block access
        if (!$module || (int)$module['is_active'] !== 1) {
            http_response_code(404); // Using 404 so users don't even know it exists if disabled
            echo json_encode(['error' => 'Module Not Found or Inactive']);
            return null;
        }

        return $next();
    }
}
