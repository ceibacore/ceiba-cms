<?php

declare(strict_types=1);

namespace CeibaCms\Media\Domain;

/** File types the media library accepts, detected from the content, never from the name or the client. */
final class MediaTypes
{
    /** SVG is refused until there is a sanitizer (plan 05, out of scope). */
    public const IMAGES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    public const EXTENSIONS = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/gif' => 'gif', 'image/webp' => 'webp'];

    /** MIME type of the file by its content, or null when it is not an accepted image. */
    public static function detect(string $path): ?string
    {
        $mime = is_file($path) ? (new \finfo(FILEINFO_MIME_TYPE))->file($path) : false;
        return is_string($mime) && in_array($mime, self::IMAGES, true) ? $mime : null;
    }

    /** Variants can be made from these (an animated GIF would lose its frames). */
    public static function resizable(string $mime): bool
    {
        return in_array($mime, ['image/jpeg', 'image/png', 'image/webp'], true);
    }
}
