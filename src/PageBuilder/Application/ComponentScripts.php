<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Application;

/**
 * Scripts and CSS of the module's own components (plan 05-B/C), added to a page only when it uses them. Each one
 * enhances markup that already works without JavaScript, and guards against running twice.
 */
final class ComponentScripts
{
    /** Component (type or view name) => script file under Frameworks/Bootstrap5/behaviors ("scripts/" is git-ignored at the root). */
    public const SCRIPTS = ['video' => 'video.js', 'tabs' => 'tabs.js', 'disclosures' => 'accordion.js', 'slideshow' => 'carousel.js'];

    /** Components that need behaviors/components.css (layout of the no-JavaScript markup). */
    public const STYLED = ['video', 'disclosures', 'disclosure', 'slideshow', 'slide'];

    /** @param list<mixed> $tree @return string the scripts the tree needs, in a stable order */
    public static function for(array $tree): string
    {
        $used = self::used($tree);
        $code = [];
        foreach (self::SCRIPTS as $component => $file) {
            if (isset($used[$component])) {
                $code[] = trim((string) file_get_contents(dirname(__DIR__) . '/Frameworks/Bootstrap5/behaviors/' . $file));
            }
        }
        return implode("\n", $code);
    }

    /** @param list<mixed> $tree @return string the component CSS when the tree uses a component that needs it */
    public static function css(array $tree): string
    {
        return array_intersect_key(self::used($tree), array_flip(self::STYLED)) === [] ? ''
            : trim((string) file_get_contents(dirname(__DIR__) . '/Frameworks/Bootstrap5/behaviors/components.css'));
    }

    /** @param list<mixed> $tree @return array<string, true> */
    private static function used(array $tree): array
    {
        $used = [];
        self::collect($tree, $used);
        return $used;
    }

    /** @param list<mixed> $nodes @param array<string, true> $used */
    private static function collect(array $nodes, array &$used): void
    {
        foreach ($nodes as $node) {
            if (!is_array($node)) {
                continue;
            }
            foreach (['type', 'name'] as $key) {
                if (is_string($node[$key] ?? null)) {
                    $used[$node[$key]] = true;
                }
            }
            if (is_array($node['children'] ?? null)) {
                self::collect($node['children'], $used);
            }
        }
    }
}
