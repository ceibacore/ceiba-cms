<?php
declare(strict_types=1);

namespace LemurCms\Http\Middleware;

/**
 * Interface MiddlewareInterface
 */
interface MiddlewareInterface
{
    /**
     * Handle an incoming request.
     * 
     * @param \Closure $next The next middleware or the final controller action in the pipeline.
     * @param mixed ...$params Additional parameters required by the middleware (e.g. role name).
     * @return mixed
     */
    public function handle(\Closure $next, ...$params): mixed;
}
