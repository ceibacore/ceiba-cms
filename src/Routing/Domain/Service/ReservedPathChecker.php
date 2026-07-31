<?php
declare(strict_types=1);

namespace LemurCms\Routing\Domain\Service;

use LemurCms\Routing\Domain\Repository\ReservedPathRepositoryInterface;

/**
 * Determines whether a given URL path is reserved (i.e. must NOT be
 * intercepted by the CMS catch-all router).
 *
 * Two sources are combined:
 *   1. STATIC_RESERVED — hardcoded list of always-reserved prefixes / paths.
 *   2. Dynamic DB entries managed via the admin UI.
 *
 * Matching is prefix-based for static entries: registering "api" blocks
 * "api", "api/v1", "api/anything/deeply/nested".
 * Dynamic entries are matched exactly.
 */
final class ReservedPathChecker
{
    /**
     * Always-reserved path prefixes — regardless of DB configuration.
     * These protect the Laravel/application layer from being shadowed.
     */
    private const STATIC_RESERVED = [
        'api',
        'admin',
        'dashboard',
        'login',
        'logout',
        'register',
        'password',
        'oauth',
        '_debugbar',
        '_ignition',
        'telescope',
        'horizon',
        'livewire',
        'sanctum',
    ];

    public function __construct(
        private readonly ReservedPathRepositoryInterface $repo,
    ) {}

    /**
     * Returns true when the CMS must NOT handle this path.
     */
    public function isReserved(string $path): bool
    {
        $path = ltrim(trim($path), '/');

        // 1. Static prefix check
        foreach (self::STATIC_RESERVED as $reserved) {
            if ($path === $reserved || str_starts_with($path, $reserved . '/')) {
                return true;
            }
        }

        // 2. Dynamic DB exact match
        return $this->repo->findByPath($path) !== null;
    }

    /** @return string[] Static entries only */
    public function staticPaths(): array
    {
        return self::STATIC_RESERVED;
    }
}
