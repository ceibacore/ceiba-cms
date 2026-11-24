<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Domain;

/** Kinds of site parts (plan 06 D-2). single, archive and search arrive with public content URLs (plan 07). */
final class SitePartKind
{
    public const HEADER = 'header';
    public const FOOTER = 'footer';
    public const NOT_FOUND = 'not_found';
    public const ALL = [self::HEADER, self::FOOTER, self::NOT_FOUND];

    public static function valid(mixed $kind): bool
    {
        return is_string($kind) && in_array($kind, self::ALL, true);
    }
}
