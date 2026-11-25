<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Domain;

/** Kinds of site parts (plan 06 D-2); single, archive and search draw the public pages of a data source (plan 07-D). */
final class SitePartKind
{
    public const HEADER = 'header';
    public const FOOTER = 'footer';
    public const NOT_FOUND = 'not_found';
    public const SINGLE = 'single';
    public const ARCHIVE = 'archive';
    public const SEARCH = 'search';
    public const ALL = [self::HEADER, self::FOOTER, self::NOT_FOUND, self::SINGLE, self::ARCHIVE, self::SEARCH];
    /** The kind that draws each kind of content page (RenderContext::$content). */
    public const FOR_CONTENT = ['record' => self::SINGLE, 'archive' => self::ARCHIVE, 'search' => self::SEARCH];

    public static function valid(mixed $kind): bool
    {
        return is_string($kind) && in_array($kind, self::ALL, true);
    }
}
