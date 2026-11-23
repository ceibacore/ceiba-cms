<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Domain\Style;

/**
 * Adds the style classes of each styled node (its site classes and its own cms-n-<id>) to props.class before the
 * tree is rendered. Every Bootstrap 5 view already honours props.class, so the renderer itself is not touched.
 */
final class StyleClassDecorator
{
    /**
     * @param list<mixed> $tree
     * @param array<string, mixed> $design
     * @return list<mixed>
     */
    public static function apply(array $tree, array $design): array
    {
        return array_map(fn ($node) => is_array($node) ? self::node($node, $design) : $node, $tree);
    }

    /** @param array<string, mixed> $node @param array<string, mixed> $design @return array<string, mixed> */
    private static function node(array $node, array $design): array
    {
        $id = is_string($node['id'] ?? null) ? $node['id'] : (is_string($node['_id'] ?? null) ? $node['_id'] : '');
        if ($id !== '' && is_array($node['styles'] ?? null) && !array_is_list($node['styles'])) {
            $names = StyledNodes::classNames($id, $node['styles'], $design);
            if ($names !== []) {
                $props = is_array($node['props'] ?? null) ? $node['props'] : [];
                $existing = is_string($props['class'] ?? null) ? trim($props['class']) : '';
                $props['class'] = trim($existing . ' ' . implode(' ', $names));
                $node['props'] = $props;
            }
        }
        if (is_array($node['children'] ?? null)) {
            $node['children'] = self::apply($node['children'], $design);
        }
        return $node;
    }
}
