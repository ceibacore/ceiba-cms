<?php

declare(strict_types=1);

namespace CeibaCms\Media\Domain;

/**
 * Media references of a page tree (plan 05 D-1): every {"asset": "<id>"} value in a node's props or styles, at any
 * depth. The same scan serves validation on save, the usages check before deleting, and URL resolution on render.
 */
final class MediaReferences
{
    private const MAX_ID_LENGTH = 64;

    /**
     * @param list<mixed> $tree root nodes
     * @return list<string> asset ids in document order, each once
     */
    public static function collect(array $tree): array
    {
        $ids = [];
        self::nodes($tree, $ids);
        return array_keys($ids);
    }

    /**
     * References inside any value (for example the site design's classes).
     * @param array<int|string, mixed> $values
     * @return list<string>
     */
    public static function inValues(array $values): array
    {
        $ids = [];
        self::values($values, $ids, 0);
        return array_keys($ids);
    }

    /** True for a well-formed reference: {"asset": "<id>"} plus, optionally, a per-use "alt". */
    public static function isReference(mixed $value): bool
    {
        return is_array($value) && is_string($value['asset'] ?? null) && self::validId($value['asset'])
            && array_diff(array_keys($value), ['asset', 'alt']) === [];
    }

    public static function validId(string $id): bool
    {
        return $id !== '' && strlen($id) <= self::MAX_ID_LENGTH && preg_match('/^[A-Za-z0-9_-]+$/', $id) === 1;
    }

    /** @param array<int|string, mixed> $nodes @param array<string, true> $ids */
    private static function nodes(array $nodes, array &$ids): void
    {
        foreach ($nodes as $node) {
            if (!is_array($node)) {
                continue;
            }
            foreach (['props', 'styles'] as $field) {
                if (is_array($node[$field] ?? null)) {
                    self::values($node[$field], $ids, 0);
                }
            }
            if (is_array($node['children'] ?? null)) {
                self::nodes($node['children'], $ids);
            }
        }
    }

    /** @param array<int|string, mixed> $values @param array<string, true> $ids */
    private static function values(array $values, array &$ids, int $depth): void
    {
        if ($depth > 12) {
            return;
        }
        if (self::isReference($values)) {
            $ids[$values['asset']] = true;
            return;
        }
        foreach ($values as $value) {
            if (is_array($value)) {
                self::values($value, $ids, $depth + 1);
            }
        }
    }
}
