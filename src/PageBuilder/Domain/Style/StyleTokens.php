<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Domain\Style;

/** Design tokens (plan 04), mirrored by editor/src/core/styles/tokens.ts. */
final class StyleTokens
{
    private const TOKEN_ID = '/^[a-z][a-z0-9-]*(?:\.[a-z0-9-]+)*$/';
    private const FAMILY = '/^[A-Za-z0-9 -]{1,60}$/';
    private const DURATION = '/^\d{1,5}(?:ms|s)$/';

    /** CSS custom property of a token: dots become underscores (ids never contain "_"). */
    public static function variable(string $id): string
    {
        return '--cms-t-' . str_replace('.', '_', $id);
    }

    /** @return list<string> */
    private static function splitTop(string $value, string $separator): array
    {
        $out = [];
        $depth = 0;
        $current = '';
        foreach (str_split($value) as $char) {
            if ($char === '(') {
                $depth++;
            }
            if ($char === ')') {
                $depth--;
            }
            if ($char === $separator && $depth === 0) {
                $out[] = trim($current);
                $current = '';
            } else {
                $current .= $char;
            }
        }
        $out[] = trim($current);
        return $out;
    }

    private static function shadow(string $value): ?string
    {
        $shadows = self::splitTop($value, ',');
        if (count($shadows) > 3) {
            return null;
        }
        foreach ($shadows as $one) {
            $parts = array_values(array_filter(self::splitTop($one, ' '), fn (string $p) => $p !== ''));
            if (($parts[0] ?? null) === 'inset') {
                array_shift($parts);
            }
            $last = $parts[count($parts) - 1] ?? '';
            $lengths = StyleValues::color($last) !== null && StyleValues::lengthPart($last, false, true) === null
                ? array_slice($parts, 0, -1) : $parts;
            if (count($lengths) < 2 || count($lengths) > 4) {
                return null;
            }
            foreach ($lengths as $p) {
                if (str_ends_with($p, '%') || StyleValues::lengthPart($p, false, true) === null) {
                    return null;
                }
            }
        }
        return $value;
    }

    public static function literal(string $type, string $raw): ?string
    {
        if ($type === 'fontFamily') {
            $families = array_map([StyleValues::class, 'collapse'], explode(',', $raw));
            if (count($families) > 8 || count(array_filter($families, fn (string $f) => !preg_match(self::FAMILY, $f))) > 0) {
                return null;
            }
            return implode(', ', array_map(fn (string $f) => str_contains($f, ' ') ? "\"{$f}\"" : $f, $families));
        }
        $value = StyleValues::normalize($raw);
        if ($value === null) {
            return null;
        }
        return match ($type) {
            'color' => StyleValues::color($value),
            'length' => StyleValues::lengthPart($value),
            'fontWeight' => in_array($value, StyleMatrix::keywords('fontWeight'), true) ? $value : null,
            'shadow' => self::shadow($value),
            'duration' => preg_match(self::DURATION, $value) ? $value : null,
            default => null,
        };
    }

    /**
     * Validates the tokens of a design and returns the usable ones (id => [type, ref]) and the :root rule.
     *
     * @param array<array-key, mixed> $tokens
     * @param list<array{path: string, code: string}> $diagnostics
     * @return array{table: array<string, array{type: string, ref: string}>, root: string}
     */
    public static function resolve(array $tokens, array &$diagnostics): array
    {
        $ids = array_map('strval', array_keys($tokens));
        sort($ids, SORT_STRING);
        if (count($ids) > StyleMatrix::limit('tokens')) {
            $diagnostics[] = ['path' => 'design.tokens', 'code' => 'LIMIT'];
            return ['table' => [], 'root' => ''];
        }
        $resolve = function (string $id, array $seen) use (&$resolve, $tokens): array|string|null {
            $token = $tokens[$id] ?? null;
            if (!is_array($token) || !preg_match(self::TOKEN_ID, $id) || strlen($id) > 64
                || !is_string($token['type'] ?? null) || !in_array($token['type'], StyleMatrix::tokenTypes(), true)) {
                return null;
            }
            $value = $token['value'] ?? null;
            if (is_string($value)) {
                $css = self::literal($token['type'], $value);
                return $css === null ? null : ['type' => $token['type'], 'css' => $css];
            }
            $target = is_array($value) ? ($value['token'] ?? null) : null;
            if (!is_string($target)) {
                return null;
            }
            if (in_array($target, $seen, true)) {
                return 'cycle';
            }
            $resolved = $resolve($target, [...$seen, $target]);
            if (!is_array($resolved)) {
                return $resolved;
            }
            return $resolved['type'] === $token['type'] ? ['type' => $token['type'], 'css' => 'var(' . self::variable($target) . ')'] : 'type';
        };
        $table = [];
        $declarations = [];
        foreach ($ids as $id) {
            if (!preg_match(self::TOKEN_ID, $id) || strlen($id) > 64) {
                $diagnostics[] = ['path' => "design.tokens.{$id}", 'code' => 'INVALID_ID'];
                continue;
            }
            $resolved = $resolve($id, [$id]);
            if ($resolved === 'cycle' || $resolved === 'type') {
                $diagnostics[] = ['path' => "design.tokens.{$id}", 'code' => $resolved === 'cycle' ? 'TOKEN_CYCLE' : 'TOKEN_TYPE'];
            } elseif ($resolved === null) {
                $diagnostics[] = ['path' => "design.tokens.{$id}", 'code' => 'INVALID_VALUE'];
            } else {
                $table[$id] = ['type' => $resolved['type'], 'ref' => 'var(' . self::variable($id) . ')'];
                $declarations[] = self::variable($id) . ':' . $resolved['css'];
            }
        }
        return ['table' => $table, 'root' => $declarations === [] ? '' : ':root{' . implode(';', $declarations) . '}'];
    }
}
