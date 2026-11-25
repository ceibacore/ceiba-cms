<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Domain\Binding;

/**
 * The closed list of transforms a binding may apply (plan 07, D-4). Unknown names are ignored by the validator of the
 * editor and return the value unchanged here; nothing runs code from the document.
 */
final class ValueTransforms
{
    public const NAMES = ['date', 'number', 'currency', 'upper', 'lower', 'truncate', 'strip'];

    /** @param array<string, mixed> $args */
    public static function apply(string $name, mixed $value, array $args, string $locale): mixed
    {
        if ($value === null || $value === '') {
            return $value;
        }

        return match ($name) {
            'date' => self::date((string) $value, (string) ($args['format'] ?? 'd/m/Y')),
            'number' => number_format((float) $value, max(0, min(6, (int) ($args['decimals'] ?? 0))), self::dec($locale), self::thousands($locale)),
            'currency' => trim(number_format((float) $value, max(0, min(4, (int) ($args['decimals'] ?? 2))), self::dec($locale), self::thousands($locale))
                . ' ' . preg_replace('/[^A-Z]/', '', strtoupper((string) ($args['code'] ?? '')))),
            'upper' => mb_strtoupper((string) $value),
            'lower' => mb_strtolower((string) $value),
            'truncate' => self::truncate(self::text($value), max(1, min(1000, (int) ($args['length'] ?? 120)))),
            'strip' => self::text($value),
            default => $value,
        };
    }

    /** Data never becomes a template: `{{` in a value is broken so the renderer cannot interpolate it later. */
    public static function inert(string $value): string
    {
        return str_replace(['{{', '}}'], ['{ {', '} }'], $value);
    }

    public static function text(mixed $value): string
    {
        return trim(preg_replace('/\s+/u', ' ', html_entity_decode(strip_tags((string) $value), ENT_QUOTES | ENT_HTML5, 'UTF-8')) ?? '');
    }

    private static function date(string $value, string $format): string
    {
        $format = preg_replace('/[^dDjlNSwzWFmMntLoYyaABgGhHisuveIOPpTZcrU \/.,:\-]/', '', $format) ?: 'd/m/Y';
        try {
            return (new \DateTimeImmutable($value))->format($format);
        } catch (\Exception) {
            return $value;
        }
    }

    private static function truncate(string $text, int $length): string
    {
        return mb_strlen($text) <= $length ? $text : rtrim(mb_substr($text, 0, $length)) . '…';
    }

    private static function dec(string $locale): string
    {
        return str_starts_with($locale, 'en') ? '.' : ',';
    }

    private static function thousands(string $locale): string
    {
        return str_starts_with($locale, 'en') ? ',' : '.';
    }
}
