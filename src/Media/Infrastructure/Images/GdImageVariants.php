<?php

declare(strict_types=1);

namespace CeibaCms\Media\Infrastructure\Images;

use CeibaCms\Media\Domain\MediaSettings;
use CeibaCms\Media\Domain\MediaTypes;
use RuntimeException;

/**
 * Image variants with GD (plan 05 D-4): one file per requested width smaller than the original (never upscaled)
 * plus one at the original width, re-encoded at the site quality, as WebP when asked. Metadata (EXIF, ICC) is dropped by the re-encode. The original is left untouched.
 */
final class GdImageVariants
{
    public static function available(): bool
    {
        return function_exists('imagecreatefromstring') && function_exists('imagewebp');
    }

    /**
     * @return list<array{width: int, height: int, mime: string, file: string}> temporary files, smallest first
     */
    public function generate(string $source, string $mime, int $width, int $height, VariantRequest $request, string $workDir): array
    {
        if (!$request->wantsVariants() || !MediaTypes::resizable($mime) || !self::available()) {
            return [];
        }
        if ($width * $height > MediaSettings::MAX_PIXELS) {
            throw new RuntimeException('Image is too large to process');
        }
        $image = @imagecreatefromstring((string) file_get_contents($source));
        if ($image === false) {
            throw new RuntimeException('Image could not be decoded');
        }
        $targets = array_values(array_filter($request->widths, fn (int $w): bool => $w < $width));
        // Always a copy at the original width, so the largest screens never get a smaller image.
        $targets[] = $width;
        $outMime = $request->webp ? 'image/webp' : $mime;
        $variants = [];
        try {
            foreach (array_unique($targets) as $target) {
                $targetHeight = max(1, (int) round($height * $target / $width));
                $copy = $target === $width ? $image : imagescale($image, $target, $targetHeight, IMG_BICUBIC);
                if ($copy === false) {
                    throw new RuntimeException('Image could not be resized');
                }
                $file = $workDir . '/' . bin2hex(random_bytes(8)) . '.' . MediaTypes::EXTENSIONS[$outMime];
                self::encode($copy, $outMime, $request->quality, $file);
                if ($copy !== $image) {
                    imagedestroy($copy);
                }
                $variants[] = ['width' => $target, 'height' => $targetHeight, 'mime' => $outMime, 'file' => $file];
            }
        } finally {
            imagedestroy($image);
        }
        usort($variants, fn (array $a, array $b): int => $a['width'] <=> $b['width']);
        return $variants;
    }

    private static function encode(\GdImage $image, string $mime, int $quality, string $file): void
    {
        $ok = match ($mime) {
            'image/webp' => imagewebp(self::withAlpha($image), $file, $quality),
            'image/png' => imagepng(self::withAlpha($image), $file, 9),
            default => imagejpeg($image, $file, $quality),
        };
        if (!$ok) {
            throw new RuntimeException('Image could not be encoded');
        }
    }

    private static function withAlpha(\GdImage $image): \GdImage
    {
        imagealphablending($image, false);
        imagesavealpha($image, true);
        return $image;
    }
}
