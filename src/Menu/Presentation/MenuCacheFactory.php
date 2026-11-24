<?php

declare(strict_types=1);

namespace CeibaCms\Menu\Presentation;

/** Uses host-owned storage when configured, isolating each site's menu cache. */
final class MenuCacheFactory
{
    public static function create(string $fallbackBase, ?string $hostBase, string $siteId): CeibaMenuCache
    {
        if ($hostBase === null || trim($hostBase) === '') {
            return new CeibaMenuCache($fallbackBase);
        }
        if (trim($siteId) === '') {
            throw new \InvalidArgumentException('A site ID is required for the menu cache');
        }
        $base = rtrim($hostBase, '/\\') . '/' . hash('sha256', $siteId);
        return new CeibaMenuCache($base);
    }
}
