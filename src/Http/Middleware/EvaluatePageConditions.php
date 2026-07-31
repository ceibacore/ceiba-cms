<?php
declare(strict_types=1);

namespace LemurCms\Http\Middleware;

use LemurCms\PageBuilder\Domain\Service\ConditionEngine;

class EvaluatePageConditions implements MiddlewareInterface
{
    public function __construct(private readonly ConditionEngine $conditionEngine) {}

    public function handle(\Closure $next, ...$params): mixed
    {
        // If a page array is passed via request/params context
        $page = $params[0] ?? null;

        if (is_array($page) && !empty($page['conditions'])) {
            $failed = $this->conditionEngine->evaluateConditions($page['conditions']);
            if ($failed !== null) {
                $fallback = $failed['fallback'] ?? [];
                $action = $fallback['action'] ?? 'abort';
                switch ($action) {
                    case 'redirect':
                        header('Location: ' . ($fallback['to'] ?? '/'));
                        return null;
                    case 'json':
                        http_response_code($fallback['status'] ?? 401);
                        header('Content-Type: application/json');
                        echo json_encode($fallback['body'] ?? ['error' => 'Unauthorized']);
                        return null;
                    case 'abort':
                    default:
                        http_response_code($fallback['status'] ?? 403);
                        header('Content-Type: text/html; charset=UTF-8');
                        echo "<h1>" . htmlspecialchars($fallback['message'] ?? 'Acceso Denegado') . "</h1>";
                        return null;
                }
            }
        }

        return $next();
    }
}
