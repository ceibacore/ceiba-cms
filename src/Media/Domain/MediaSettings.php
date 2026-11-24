<?php

declare(strict_types=1);

namespace CeibaCms\Media\Domain;

use CeibaCms\Settings\Domain\Repository\SettingsRepositoryInterface;

/**
 * Image options of a site (plan 05 D-4): the recommended variant widths offered (checked) on upload, the encoder
 * quality, whether WebP is offered by default, and the upload limits. Stored in the settings table.
 */
final class MediaSettings
{
    public const DEFAULT_WIDTHS = [480, 960, 1600];
    public const KEYS = ['widths' => 'media_variant_widths', 'quality' => 'media_quality', 'webp' => 'media_webp'];
    public const MIN_WIDTH = 64;
    public const MAX_WIDTH = 4096;
    public const MAX_WIDTHS = 6;
    /** Upload limits: 15 MB and 40 megapixels (GD needs about 5 bytes per pixel to decode). */
    public const MAX_BYTES = 15 * 1024 * 1024;
    public const MAX_PIXELS = 40_000_000;

    /** @param list<int> $widths */
    public function __construct(public readonly array $widths, public readonly int $quality, public readonly bool $webp) {}

    public static function defaults(): self
    {
        return new self(self::DEFAULT_WIDTHS, 82, true);
    }

    public static function from(?SettingsRepositoryInterface $settings): self
    {
        $defaults = self::defaults();
        if ($settings === null) {
            return $defaults;
        }
        $widths = self::widths(explode(',', (string) $settings->get(self::KEYS['widths'], '')));
        $quality = (int) $settings->get(self::KEYS['quality'], (string) $defaults->quality);
        $webp = $settings->get(self::KEYS['webp'], $defaults->webp ? '1' : '0');
        return new self($widths === [] ? $defaults->widths : $widths, $quality >= 40 && $quality <= 100 ? $quality : $defaults->quality, $webp !== '0');
    }

    /**
     * Valid widths, sorted and unique; anything else is dropped.
     * @param array<mixed> $values
     * @return list<int>
     */
    public static function widths(array $values): array
    {
        $widths = [];
        foreach ($values as $value) {
            $width = is_int($value) ? $value : (is_string($value) && ctype_digit(trim($value)) ? (int) trim($value) : 0);
            if ($width >= self::MIN_WIDTH && $width <= self::MAX_WIDTH) {
                $widths[$width] = $width;
            }
        }
        sort($widths);
        return array_slice(array_values($widths), 0, self::MAX_WIDTHS);
    }

    public function save(SettingsRepositoryInterface $settings): void
    {
        $settings->set(self::KEYS['widths'], implode(',', $this->widths));
        $settings->set(self::KEYS['quality'], (string) $this->quality);
        $settings->set(self::KEYS['webp'], $this->webp ? '1' : '0');
    }

    /** @return array{widths: list<int>, quality: int, webp: bool, maxBytes: int, maxPixels: int, accept: list<string>} */
    public function toArray(): array
    {
        return [
            'widths' => $this->widths, 'quality' => $this->quality, 'webp' => $this->webp,
            'maxBytes' => self::MAX_BYTES, 'maxPixels' => self::MAX_PIXELS, 'accept' => MediaTypes::IMAGES,
        ];
    }
}
