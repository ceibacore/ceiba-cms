<?php

declare(strict_types=1);

namespace LemurCms\Http;

class Router
{
    /**
     * @var array<string, array<string, array{handler: callable, middlewares: array<string>}>>
     */
    private array $routes = [];

    /**
     * @var array<string, string>
     */
    private array $routeNames = [];

    /**
     * Global middleware aliases mapper.
     * @var array<string, callable>
     */
    private array $middlewareAliases = [];

    public function aliasMiddleware(string $alias, callable $resolver): self
    {
        $this->middlewareAliases[$alias] = $resolver;
        return $this;
    }

    public function get(string $path, callable $handler, string $name = ''): self
    {
        return $this->addRoute('GET', $path, $handler, $name);
    }

    public function post(string $path, callable $handler, string $name = ''): self
    {
        return $this->addRoute('POST', $path, $handler, $name);
    }

    public function put(string $path, callable $handler, string $name = ''): self
    {
        return $this->addRoute('PUT', $path, $handler, $name);
    }

    public function patch(string $path, callable $handler, string $name = ''): self
    {
        return $this->addRoute('PATCH', $path, $handler, $name);
    }

    public function delete(string $path, callable $handler, string $name = ''): self
    {
        return $this->addRoute('DELETE', $path, $handler, $name);
    }

    private string $lastAddedMethod = '';
    private string $lastAddedPath = '';

    private function addRoute(string $method, string $path, callable $handler, string $name): self
    {
        if (!isset($this->routes[$method])) {
            $this->routes[$method] = [];
        }

        $this->routes[$method][$path] = [
            'handler' => $handler,
            'middlewares' => []
        ];

        $this->lastAddedMethod = $method;
        $this->lastAddedPath = $path;

        if ($name) {
            $this->routeNames[$name] = $path;
        }

        return $this;
    }

    public function middleware(string ...$middlewares): self
    {
        if ($this->lastAddedMethod && $this->lastAddedPath) {
            $this->routes[$this->lastAddedMethod][$this->lastAddedPath]['middlewares'] = array_merge(
                $this->routes[$this->lastAddedMethod][$this->lastAddedPath]['middlewares'],
                $middlewares
            );
        }
        return $this;
    }

    public function dispatch(string $method = null, string $path = null): void
    {
        $method = $method ?? $_SERVER['REQUEST_METHOD'];
        $path = $path ?? parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        if (!isset($this->routes[$method])) {
            http_response_code(404);
            echo json_encode(['error' => 'Not Found']);
            return;
        }

        foreach ($this->routes[$method] as $route => $routeData) {
            if ($this->matchRoute($route, $path, $params)) {
                $this->runPipeline($routeData['middlewares'], $routeData['handler'], $params);
                return;
            }
        }

        http_response_code(404);
        echo json_encode(['error' => 'Not Found']);
    }

    private function runPipeline(array $middlewares, callable $handler, array $params): void
    {
        // Convert handler to the final step of the pipeline
        $pipeline = function() use ($handler, $params) {
            return call_user_func_array($handler, $params);
        };

        // Wrap backwards
        foreach (array_reverse($middlewares) as $middlewareDefinition) {
            $parts = explode(':', $middlewareDefinition, 2);
            $alias = $parts[0];
            $middlewareParams = isset($parts[1]) ? explode(',', $parts[1]) : [];

            if (isset($this->middlewareAliases[$alias])) {
                $resolver = $this->middlewareAliases[$alias];
                $middlewareInstance = $resolver();
                
                $next = $pipeline;
                $pipeline = function() use ($middlewareInstance, $next, $middlewareParams) {
                    return $middlewareInstance->handle($next, ...$middlewareParams);
                };
            }
        }

        // Execute
        $pipeline();
    }

    private function matchRoute(string $route, string $path, array &$params): bool
    {
        $pattern = preg_replace_callback('/{(\w+)}/', fn($m) => '(?P<' . $m[1] . '>\d+)', $route);
        $pattern = '#^' . $pattern . '$#';

        if (preg_match($pattern, $path, $matches)) {
            $params = array_filter($matches, fn($k) => is_string($k), ARRAY_FILTER_USE_KEY);
            return true;
        }

        return false;
    }

    public function url(string $name, array $params = []): string
    {
        $path = $this->routeNames[$name] ?? '';

        foreach ($params as $key => $value) {
            $path = str_replace('{' . $key . '}', $value, $path);
        }

        return $path;
    }
}
