<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Frameworks\Bootstrap5;

use CeibaCms\PageBuilder\Domain\Style\StyleValues;

/**
 * Markup helpers of the Bootstrap 5 views (plan 05-B). The editor canvas builds the same markup
 * (editor/src/ui/canvas/components), and fixtures/components holds both to the same bytes: keep attribute order.
 */
final class Html
{
    public static function e(mixed $value): string
    {
        return htmlspecialchars(is_scalar($value) ? (string) $value : '', ENT_QUOTES, 'UTF-8');
    }

    /** Text with its line breaks as <br>. */
    public static function lines(mixed $value): string
    {
        return implode('<br>', array_map([self::class, 'e'], explode("\n", str_replace("\r", '', is_string($value) ? $value : ''))));
    }

    /** A link target without active schemes (javascript:, data:, vbscript:…); '' when unsafe. Same rule as safeUrl(). */
    public static function url(mixed $value): string
    {
        if (!is_string($value)) {
            return '';
        }
        $compact = (string) preg_replace('/[\x00-\x20\x7f]|\xc2[\x80-\x9f]/', '', $value);
        if (preg_match('/^([a-z][a-z0-9+.-]*):/i', $compact, $m) === 1 && !in_array(strtolower($m[1]), ['http', 'https', 'mailto', 'tel'], true)) {
            return '';
        }
        return trim($value);
    }

    /** ' name="value"' for each attribute that is not null, '' or false, in the given order. @param array<string, mixed> $attributes */
    public static function attrs(array $attributes): string
    {
        $out = '';
        foreach ($attributes as $name => $value) {
            if ($value === null || $value === '' || $value === false) {
                continue;
            }
            $out .= $value === true ? " {$name}" : " {$name}=\"" . self::e($value) . '"';
        }
        return $out;
    }

    /**
     * <img> of a resolved image slot (MediaPropsDecorator puts srcset/width/height/alt next to it), or '' without
     * a usable source. @param array<string, mixed> $item
     */
    public static function img(array $item, string $slot, string $class, string $sizes = '100vw'): string
    {
        $src = self::url($item[$slot] ?? null);
        if ($src === '') {
            return '';
        }
        $srcset = is_string($item['srcset'] ?? null) ? $item['srcset'] : '';
        $width = (int) ($item['width'] ?? 0);
        $height = (int) ($item['height'] ?? 0);
        // alt is always written: "" marks a decorative image.
        return '<img' . self::attrs(['src' => $src]) . ' alt="' . self::e(is_string($item['alt'] ?? null) ? $item['alt'] : '') . '"' . self::attrs([
            'srcset' => $srcset,
            'sizes' => $srcset !== '' ? $sizes : '', 'class' => $class, 'width' => $width > 0 ? $width : null,
            'height' => $height > 0 ? $height : null, 'loading' => 'lazy', 'decoding' => 'async',
        ]) . '>';
    }

    /** Integer prop limited to a range. */
    public static function int(mixed $value, int $default, int $min, int $max): int
    {
        $number = is_numeric($value) ? (int) $value : $default;
        return max($min, min($max, $number));
    }

    /** One of the allowed values, else the first. @param list<string> $allowed */
    public static function oneOf(mixed $value, array $allowed): string
    {
        return is_scalar($value) && in_array((string) $value, $allowed, true) ? (string) $value : $allowed[0];
    }

    /** background-image style for a resolved URL (same URL rule as the style compiler), or ''. */
    public static function backgroundImage(mixed $url): string
    {
        $css = StyleValues::assetUrl($url);
        return $css === null ? '' : 'background-image:' . $css;
    }
}
