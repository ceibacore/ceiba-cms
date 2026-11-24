<?php

declare(strict_types=1);

namespace CeibaCms\Media\Infrastructure\Images;

use CeibaCms\Media\Domain\MediaSettings;

/** What the uploader chose in the media dialog (plan 05 D-4): widths, optimize, WebP; quality comes from the site. */
final class VariantRequest
{
    /** @param list<int> $widths */
    public function __construct(
        public readonly array $widths,
        public readonly bool $optimize,
        public readonly bool $webp,
        public readonly int $quality,
    ) {}

    /** @param array<string, mixed> $input form fields: widths (list or "480,960"), optimize, webp */
    public static function fromInput(array $input, MediaSettings $settings): self
    {
        $widths = $input['widths'] ?? $settings->widths;
        $widths = is_string($widths) ? explode(',', $widths) : (is_array($widths) ? $widths : []);
        $flag = fn (string $key, bool $default): bool => array_key_exists($key, $input)
            ? in_array($input[$key], [true, 1, '1', 'true', 'on'], true) : $default;
        return new self(MediaSettings::widths($widths), $flag('optimize', true), $flag('webp', $settings->webp), $settings->quality);
    }

    public function wantsVariants(): bool
    {
        return $this->widths !== [] || $this->optimize || $this->webp;
    }
}
