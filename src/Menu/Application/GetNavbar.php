<?php
declare(strict_types=1);
namespace CeibaCms\Menu\Application;

use CeibaCms\Menu\Domain\Repository\MenuRepositoryInterface;
use CeibaCms\Menu\Presentation\CeibaMenuRenderer;
use CeibaCms\Menu\Presentation\CeibaMenuCache;

/**
 * Renders navbar HTML with caching.
 * Returns cached HTML if available, otherwise generates and caches.
 */
class GetNavbar
{
    public function __construct(
        private MenuRepositoryInterface $repo,
        private CeibaMenuRenderer $renderer,
        private CeibaMenuCache $cache,
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
        $renderer = new CeibaMenuRenderer($activeUrl);
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
