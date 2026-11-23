<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Domain\Style;

use RuntimeException;

/**
 * Allowed style properties, states, token types and limits (plan 04). The single source of truth is
 * schemas/style-properties-v1.json; the editor mirrors it and its tests fail when they differ.
 */
final class StyleMatrix
{
    /** @var array<string, mixed>|null */
    private static ?array $data = null;

    /** @return array<string, mixed> */
    public static function data(): array
    {
        if (self::$data === null) {
            $json = file_get_contents(dirname(__DIR__, 4) . '/schemas/style-properties-v1.json');
            $data = is_string($json) ? json_decode($json, true) : null;
            if (!is_array($data)) {
                throw new RuntimeException('Style property matrix unavailable');
            }
            self::$data = $data;
        }
        return self::$data;
    }

    /** @return array<string, mixed>|null */
    public static function property(string $name): ?array
    {
        foreach (self::data()['properties'] as $spec) {
            if ($spec['name'] === $name) {
                return $spec;
            }
        }
        return null;
    }

    /** Position of a property in the canonical output order. */
    public static function order(string $name): int
    {
        foreach (self::data()['properties'] as $i => $spec) {
            if ($spec['name'] === $name) {
                return $i;
            }
        }
        return 0;
    }

    /** @return list<string> */
    public static function states(): array
    {
        return self::data()['states'];
    }

    /** @return list<string> */
    public static function tokenTypes(): array
    {
        return self::data()['tokenTypes'];
    }

    /** @return list<string> */
    public static function keywords(string $property): array
    {
        return self::data()['keywords'][$property] ?? [];
    }

    public static function limit(string $name): int
    {
        return (int) self::data()['limits'][$name];
    }
}
