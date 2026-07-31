<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Service;

use LemurCms\Auth\AuthManager;

final class ContextResolver
{
    public function __construct(private readonly AuthManager $auth) {}

    /**
     * Resolves a value that might contain context bindings like {{ request.query.category }}.
     * If the input is not a string, or doesn't have bindings, it returns it unchanged.
     */
    public function resolve(mixed $value, array $routeParams = []): mixed
    {
        if (!is_string($value)) {
            return $value;
        }

        // Check if the entire value is exactly a single binding, e.g. "{{ request.query.id }}"
        // This allows returning non-string resolved values (like integers or arrays)
        if (preg_match('/^\{\{\s*([^\s}]+)\s*\}\}$/', $value, $matches)) {
            return $this->resolvePath($matches[1], $routeParams);
        }

        // Otherwise, interpolate it into the string
        return preg_replace_callback('/\{\{\s*([^\s}]+)\s*\}\}/', function ($matches) use ($routeParams) {
            $resolved = $this->resolvePath($matches[1], $routeParams);
            return is_scalar($resolved) ? (string)$resolved : '';
        }, $value);
    }

    private function resolvePath(string $path, array $routeParams): mixed
    {
        if ($path === 'now') {
            return date('Y-m-d H:i:s');
        }
        if ($path === 'date.today') {
            return date('Y-m-d');
        }

        $parts = explode('.', $path);
        $scope = array_shift($parts);

        switch ($scope) {
            case 'request':
                $type = array_shift($parts);
                if ($type === 'query') {
                    return $this->getArrayPath($_GET, $parts);
                }
                if ($type === 'route') {
                    return $this->getArrayPath($routeParams, $parts);
                }
                return null;

            case 'auth':
                $type = array_shift($parts);
                if ($type === 'user') {
                    $user = $this->auth->user();
                    return $user ? $this->getArrayPath($user, $parts) : null;
                }
                return null;

            default:
                return null;
        }
    }

    private function getArrayPath(array $array, array $parts): mixed
    {
        $current = $array;
        foreach ($parts as $part) {
            if (is_array($current) && isset($current[$part])) {
                $current = $current[$part];
            } else {
                return null;
            }
        }
        return $current;
    }
}
