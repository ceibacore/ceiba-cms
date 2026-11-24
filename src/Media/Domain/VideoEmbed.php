<?php

declare(strict_types=1);

namespace CeibaCms\Media\Domain;

/**
 * YouTube and Vimeo only (plan 05 D-2), loaded on click: the page makes no request to them before the visitor asks.
 * YouTube goes through its no-cookie domain and Vimeo with dnt=1. Same parser as editor/src/core/media/video.ts.
 */
final class VideoEmbed
{
    private function __construct(
        public readonly string $provider,
        public readonly string $id,
        public readonly string $embed,
        public readonly string $watch,
    ) {}

    public static function parse(mixed $url): ?self
    {
        if (!is_string($url) || strlen($url) > 300) {
            return null;
        }
        $url = trim($url);
        $youtube = '~^https?://(?:(?:www\.|m\.)?youtube(?:-nocookie)?\.com/(?:watch\?(?:.*&)?v=|embed/|shorts/|live/)|youtu\.be/)([A-Za-z0-9_-]{11})(?:[?&#/].*)?$~';
        if (preg_match($youtube, $url, $m) === 1) {
            return new self('youtube', $m[1], "https://www.youtube-nocookie.com/embed/{$m[1]}?autoplay=1&rel=0",
                "https://www.youtube.com/watch?v={$m[1]}");
        }
        if (preg_match('~^https?://(?:www\.)?(?:vimeo\.com/|player\.vimeo\.com/video/)([0-9]{6,12})(?:[?#/].*)?$~', $url, $m) === 1) {
            return new self('vimeo', $m[1], "https://player.vimeo.com/video/{$m[1]}?autoplay=1&dnt=1", "https://vimeo.com/{$m[1]}");
        }
        return null;
    }
}
