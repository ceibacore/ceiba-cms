<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Domain;

/** Samples supplied page contexts and page-less paths; the caller must supply every relevant page context. */
final class RuleContextMatrix
{
    private const MAX_CONTEXTS = 100000;

    /**
     * @param list<SitePart> $parts
     * @param list<array{path: string, pageId: string, layoutId: ?string, isHome: bool}> $pages
     * @return iterable<RenderContext>
     */
    public static function generate(array $parts, array $pages): iterable
    {
        [$paths, $layouts, $routes, $locales] = self::dimensions($parts);
        $count = 0;
        foreach ($pages as $page) {
            foreach (self::variants($page['path'], $page['pageId'], $page['layoutId'], $page['isHome'], false, $routes, $locales) as $context) {
                if (++$count > self::MAX_CONTEXTS) {
                    throw new \LengthException('Too many contexts to validate safely');
                }
                yield $context;
            }
        }
        // Host routes and future paths may use any layout. Include 404 requests independently of page requests.
        foreach ($paths as $path) {
            foreach ($layouts as $layout) {
                foreach ([false, true] as $notFound) {
                    foreach (self::variants($path, null, $layout, false, $notFound, $routes, $locales) as $context) {
                        if (++$count > self::MAX_CONTEXTS) {
                            throw new \LengthException('Too many contexts to validate safely');
                        }
                        yield $context;
                    }
                }
            }
        }
    }

    private static function dimensions(array $parts): array
    {
        $prefixes = ['/'];
        $layouts = [];
        $routes = [];
        $locales = ['und'];
        foreach ($parts as $part) {
            foreach ([...$part->rules->include, ...$part->rules->exclude] as $target) {
                if ($target['type'] === 'path_prefix') $prefixes[] = $target['value'];
                if ($target['type'] === 'layouts') array_push($layouts, ...$target['ids']);
                if ($target['type'] === 'routes') array_push($routes, ...$target['names']);
            }
            array_push($locales, ...$part->rules->locales);
        }
        $segments = [];
        foreach ($prefixes as $prefix) array_push($segments, ...explode('/', trim($prefix, '/')));
        $probe = '__cms_probe';
        while (in_array($probe, $segments, true)) $probe .= '_';
        $paths = ['/'];
        foreach (array_unique($prefixes) as $prefix) {
            $paths[] = $prefix;
            $paths[] = rtrim($prefix, '/') . '/' . $probe;
        }
        $languages = [];
        foreach ($locales as $locale) {
            if (preg_match('/^[a-z]{2}/', $locale, $match)) $languages[] = $match[0];
        }
        foreach (array_unique($languages) as $language) {
            $locales[] = $language;
            $locales[] = self::otherRegion($language, $locales);
        }
        return [array_values(array_unique($paths)), [null, ...array_values(array_unique($layouts))],
            [null, ...array_values(array_unique($routes))], array_values(array_unique($locales))];
    }

    private static function otherRegion(string $language, array $locales): string
    {
        foreach (range('A', 'Z') as $first) {
            foreach (range('A', 'Z') as $second) {
                $value = $language . '-' . $first . $second;
                if (!in_array($value, $locales, true)) return $value;
            }
        }
        return $language;
    }

    private static function variants(string $path, ?string $pageId, ?string $layoutId, bool $isHome, bool $notFound,
        array $routes, array $locales): iterable
    {
        foreach ($routes as $route) foreach ($locales as $locale) foreach ([false, true] as $session) {
            yield new RenderContext($path, $pageId, $isHome, $layoutId, $locale, $session, $route, $notFound);
        }
    }
}
