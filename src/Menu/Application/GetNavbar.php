<?php
declare(strict_types=1);
namespace LemurCms\Menu\Application;

use LemurCms\Menu\Domain\MenuRepositoryInterface;
use LemurCms\Menu\Presentation\LemurMenuRenderer;
use LemurCms\Menu\Presentation\LemurMenuCache;

/**
 * Renders navbar HTML with caching.
 * Returns cached HTML if available, otherwise generates and caches.
 */
final class GetNavbar
{
    public function __construct(
        private MenuRepositoryInterface $repo,
        private LemurMenuRenderer $renderer,
        private LemurMenuCache $cache,
    ) {}

    public function execute(string $menuSlug, string $activeUrl = ''): string
    {
        $cacheKey = 'navbar_' . $menuSlug;
        
        // Try cache first
        $cached = $this->cache->getRendered($cacheKey);
        if ($cached) return $cached;

        // Get menu tree from repository
        $tree = $this->repo->getMenuTree($menuSlug);
        if (empty($tree)) return '';

        // Render with Bootstrap 5
        $renderer = new LemurMenuRenderer($activeUrl);
        $html = $renderer->render($tree);

        // Cache the rendered HTML
        $this->cache->setRendered($cacheKey, $html);

        return $html;
    }

    public function clearCache(string $menuSlug): void
    {
        $this->cache->forget('navbar_' . $menuSlug);
    }
}
