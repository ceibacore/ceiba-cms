<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

/**
 * Fingerprint of the raw pages.content value last written or acknowledged by the
 * revision system. A mismatch means something wrote public content outside of
 * revisions (direct SQL, an external import).
 */
final class PublicContentFingerprint
{
    public static function of(mixed $rawContent): string
    {
        return hash('sha256', is_string($rawContent) ? $rawContent : '');
    }

    public static function matches(?string $expected, mixed $rawContent): bool
    {
        return $expected !== null && hash_equals($expected, self::of($rawContent));
    }
}
