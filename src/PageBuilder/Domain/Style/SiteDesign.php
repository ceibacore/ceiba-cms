<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Domain\Style;

use InvalidArgumentException;

/** Site design document (plan 04): breakpoints, tokens and classes. */
final class SiteDesign
{
    public const SCHEMA_VERSION = 1;

    /** Bootstrap 5 breakpoints and nothing else (plan 04 D-3). @return array<string, mixed> */
    public static function defaults(): array
    {
        return [
            'schemaVersion' => self::SCHEMA_VERSION,
            'breakpoints' => [
                ['id' => 'sm', 'minWidth' => 576], ['id' => 'md', 'minWidth' => 768],
                ['id' => 'lg', 'minWidth' => 992], ['id' => 'xl', 'minWidth' => 1200],
            ],
            'tokens' => [],
            'classes' => [],
        ];
    }

    /**
     * A design that may be stored: known keys only and no compiler diagnostics (an invalid token, class or
     * breakpoint is refused, never silently dropped).
     *
     * @param mixed $design decoded JSON
     * @return array<string, mixed>
     */
    public static function validate(mixed $design): array
    {
        if (!is_array($design) || array_diff(array_keys($design), ['schemaVersion', 'breakpoints', 'tokens', 'classes']) !== []
            || ($design['schemaVersion'] ?? null) !== self::SCHEMA_VERSION
            || !is_array($design['breakpoints'] ?? null) || !is_array($design['tokens'] ?? null) || !is_array($design['classes'] ?? null)) {
            throw new InvalidArgumentException('Invalid design document');
        }
        // Asset references are checked for shape here; whether the files exist is checked by the caller (plan 05-A).
        $assets = array_fill_keys(\CeibaCms\Media\Domain\MediaReferences::inValues($design['classes']), '/asset');
        $diagnostics = StyleCompiler::compile($design, [], $assets)->diagnostics;
        if ($diagnostics !== []) {
            $first = $diagnostics[0];
            throw new InvalidDesign($first['path'], $first['code'], $diagnostics);
        }
        return $design;
    }

    public static function hash(array $design): string
    {
        return hash('sha256', json_encode($design, JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
    }
}
