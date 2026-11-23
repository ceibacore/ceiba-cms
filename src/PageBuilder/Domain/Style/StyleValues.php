<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Domain\Style;

/**
 * Value grammar of plan 04, mirrored by editor/src/core/styles/values.ts (fixtures/styles keeps both identical).
 * Each method returns the normalized CSS text, or null when the value is not allowed.
 */
final class StyleValues
{
    private const FORBIDDEN = '/[;{}\\\\<>"\'`]|\/\*|url\(|expression|@import|!/i';
    private const LENGTH = '/^(-?)(\d+(?:\.\d+)?|\.\d+)(px|rem|em|%|vw|vh)$/';
    private const FRACTION = '/^(\d+(?:\.\d+)?|\.\d+)fr$/';
    private const HEX = '/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/';
    private const FUNCTION_COLOR = '/^(?:rgb|rgba|hsl|hsla)\([0-9.%, \/]{1,60}\)$/';
    private const GRID_COLUMN = '/^(?:auto|span (?:[1-9]|1[0-2])|(?:[1-9]|1[0-3]) \/ (?:[1-9]|1[0-3]|-1))$/';
    private const REPEAT = '/^repeat\(([1-9]|1[0-2]), ?(.+)\)$/';

    /** ASCII whitespace only, as in the editor (JS \s and trim() would also match Unicode spaces). */
    public static function collapse(string $raw): string
    {
        $value = (string) preg_replace('/^[ \t\n\r\f\v]+|[ \t\n\r\f\v]+$/', '', $raw);
        return (string) preg_replace('/[ \t\n\r\f\v]+/', ' ', $value);
    }

    public static function normalize(string $raw): ?string
    {
        $value = self::collapse($raw);
        return $value === '' || strlen($value) > StyleMatrix::limit('valueLength') || preg_match(self::FORBIDDEN, $value)
            ? null : $value;
    }

    public static function formatNumber(int|float $n): string
    {
        if (is_int($n) || (floor($n) === $n && abs($n) < 1e15)) {
            return (string) (int) $n;
        }
        return rtrim(rtrim(number_format($n, 4, '.', ''), '0'), '.');
    }

    public static function lengthPart(string $part, bool $auto = false, bool $negative = false): ?string
    {
        if ($part === '0') {
            return '0';
        }
        if ($part === 'auto') {
            return $auto ? 'auto' : null;
        }
        if (!preg_match(self::LENGTH, $part, $m) || ($m[1] === '-' && !$negative) || (float) $m[2] > StyleMatrix::limit('magnitude')) {
            return null;
        }
        return $part;
    }

    /** @param array<string, mixed> $spec */
    public static function length(string $value, array $spec): ?string
    {
        $parts = explode(' ', $value);
        if (count($parts) > ($spec['parts'] ?? 1)) {
            return null;
        }
        foreach ($parts as $part) {
            if (self::lengthPart($part, (bool) ($spec['auto'] ?? false), (bool) ($spec['negative'] ?? false)) === null) {
                return null;
            }
        }
        return $value;
    }

    public static function color(string $value): ?string
    {
        return $value === 'transparent' || $value === 'currentColor' || preg_match(self::HEX, $value)
            || preg_match(self::FUNCTION_COLOR, $value) ? $value : null;
    }

    private static function track(string $part): bool
    {
        if (in_array($part, ['auto', 'min-content', 'max-content'], true)) {
            return true;
        }
        if (preg_match(self::FRACTION, $part, $m)) {
            return (float) $m[1] <= 100;
        }
        return self::lengthPart($part) !== null;
    }

    public static function tracks(string $value): ?string
    {
        if (preg_match(self::REPEAT, $value, $m)) {
            return self::track($m[2]) ? "repeat({$m[1]}, {$m[2]})" : null;
        }
        $parts = explode(' ', $value);
        return count($parts) <= 12 && count(array_filter($parts, fn (string $p) => !self::track($p))) === 0 ? $value : null;
    }

    /** @param array<string, mixed> $spec */
    public static function inRange(int|float $n, array $spec): ?string
    {
        return is_finite((float) $n) && $n >= ($spec['min'] ?? 0) && $n <= ($spec['max'] ?? StyleMatrix::limit('magnitude'))
            ? self::formatNumber($n) : null;
    }

    /** A literal value of a property (token references are handled by the compiler). @param array<string, mixed> $spec */
    public static function literal(array $spec, mixed $raw): ?string
    {
        if (is_int($raw) || is_float($raw)) {
            if ($spec['kind'] === 'number' || $spec['kind'] === 'lineHeight') {
                return self::inRange($raw, $spec);
            }
            return $spec['kind'] === 'keyword' && $spec['name'] === 'fontWeight' ? self::literal($spec, self::formatNumber($raw)) : null;
        }
        if (!is_string($raw) || ($value = self::normalize($raw)) === null) {
            return null;
        }
        return match ($spec['kind']) {
            'keyword' => in_array($value, StyleMatrix::keywords($spec['name']), true) ? $value : null,
            'length' => self::length($value, $spec),
            'color' => self::color($value),
            'tracks' => self::tracks($value),
            'gridColumn' => preg_match(self::GRID_COLUMN, $value) ? $value : null,
            'lineHeight' => self::length($value, []),
            default => null,
        };
    }

    /** @param array<string, mixed> $spec */
    public static function acceptedTokenType(array $spec): ?string
    {
        return match ($spec['kind']) {
            'color' => 'color',
            'length' => 'length',
            default => $spec['tokenType'] ?? null,
        };
    }
}
