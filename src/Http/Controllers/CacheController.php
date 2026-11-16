<?php

declare(strict_types=1);

namespace CeibaCms\Http\Controllers;

class CacheController extends BaseController
{
    public function __construct(private \CeibaCms\Menu\Presentation\CeibaMenuCache $cache)
    {
    }

    public function clear(): void
    {
        try {
            $this->cache->flush();
            $this->success([], 'Cache cleared');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    public function clearMenu(string $slug): void
    {
        try {
            $key = 'navbar_' . $slug;
            $this->cache->forget($key);
            $this->success([], "Menu cache cleared for: $slug");
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }
}
