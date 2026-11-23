<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Domain\Style;

/** Styled nodes of a document and the classes the renderer adds to them (mirrors editor/src/core/styles/collect.ts). */
final class StyledNodes
{
    /**
     * Nodes with a styles field, in document order (depth first).
     *
     * @param list<array<string, mixed>> $root
     * @return list<array{id: string, styles: array<string, mixed>}>
     */
    public static function collect(array $root): array
    {
        $out = [];
        $walk = function (array $nodes) use (&$walk, &$out): void {
            foreach ($nodes as $node) {
                if (!is_array($node)) {
                    continue;
                }
                $id = is_string($node['id'] ?? null) ? $node['id'] : (is_string($node['_id'] ?? null) ? $node['_id'] : '');
                if ($id !== '' && is_array($node['styles'] ?? null) && !array_is_list($node['styles'])) {
                    $out[] = ['id' => $id, 'styles' => $node['styles']];
                }
                $walk(is_array($node['children'] ?? null) ? $node['children'] : []);
            }
        };
        $walk($root);
        return $out;
    }

    /**
     * Site classes (known ones, in order) and the node's own class when it has declarations.
     *
     * @param array<string, mixed> $styles
     * @param array<string, mixed> $design
     * @return list<string>
     */
    public static function classNames(string $id, array $styles, array $design): array
    {
        $known = is_array($design['classes'] ?? null) ? $design['classes'] : [];
        $names = [];
        foreach (is_array($styles['classes'] ?? null) ? $styles['classes'] : [] as $class) {
            if (is_string($class) && array_key_exists($class, $known)) {
                $names[] = StyleCompiler::siteClass($class);
            }
        }
        $blocks = [$styles['base'] ?? null, ...array_values(is_array($styles['states'] ?? null) ? $styles['states'] : []),
            ...array_values(is_array($styles['breakpoints'] ?? null) ? $styles['breakpoints'] : [])];
        $hasOwn = count(array_filter($blocks, fn ($b) => is_array($b) && $b !== [])) > 0;
        if ($hasOwn && preg_match('/^[A-Za-z0-9_-]{1,64}$/', $id)) {
            $names[] = StyleCompiler::nodeClass($id);
        }
        return $names;
    }
}
