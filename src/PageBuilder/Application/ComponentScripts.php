<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Application;

/**
 * Small scripts of the module's own components (plan 05-B/C), added to a page only when it uses them. Each one
 * enhances markup that already works without JavaScript, and guards against running twice.
 */
final class ComponentScripts
{
    /** Component (type or view name) => script file under Frameworks/Bootstrap5/scripts. */
    public const SCRIPTS = ['video' => 'video.js'];

    /** @param list<mixed> $tree @return string the scripts the tree needs, in a stable order */
    public static function for(array $tree): string
    {
        $used = [];
        self::collect($tree, $used);
        $code = [];
        foreach (self::SCRIPTS as $component => $file) {
            if (isset($used[$component])) {
                $code[] = trim((string) file_get_contents(dirname(__DIR__) . '/Frameworks/Bootstrap5/scripts/' . $file));
            }
        }
        return implode("\n", $code);
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
