<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Domain;

/**
 * What the host knows about the request being drawn (plan 06): the module never reads globals. `notFound` is a
 * request with no page; `routeName` is a route the host registered as a condition (or null).
 */
final class RenderContext
{
    public readonly string $path;

    public function __construct(
        string $path,
        public readonly ?string $pageId = null,
        public readonly bool $isHome = false,
        public readonly ?string $layoutId = null,
        public readonly string $locale = 'es',
        public readonly bool $hasSession = false,
        public readonly ?string $routeName = null,
        public readonly bool $notFound = false,
    ) {
        $path = '/' . trim((string) parse_url($path, PHP_URL_PATH), '/');
        $this->path = $path;
    }

    public static function forPage(array $page, string $path, string $locale, bool $hasSession, bool $isHome = false): self
    {
        return new self($path, isset($page['id']) ? (string) $page['id'] : null, $isHome,
            isset($page['layout_id']) && $page['layout_id'] !== '' ? (string) $page['layout_id'] : null, $locale, $hasSession);
    }

    public static function notFound(string $path, string $locale, bool $hasSession): self
    {
        return new self($path, null, false, null, $locale, $hasSession, null, true);
    }
}
