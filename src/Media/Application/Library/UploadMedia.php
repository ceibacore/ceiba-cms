<?php

declare(strict_types=1);

namespace CeibaCms\Media\Application\Library;

use CeibaCms\Media\Domain\MediaSettings;
use CeibaCms\Media\Domain\MediaTypes;
use CeibaCms\Media\Domain\Repository\MediaRepositoryInterface;
use CeibaCms\Media\Infrastructure\Images\GdImageVariants;
use CeibaCms\Media\Infrastructure\Images\VariantRequest;
use CeibaCms\PageBuilder\Domain\Contract\MediaStorage;
use CeibaCms\PageBuilder\Domain\Document\HostContext;

/**
 * Stores an uploaded image (plan 05-A, D-4): the type comes from the content (SVG and anything that is not a
 * JPEG, PNG, GIF or WebP is refused), size and pixel count are limited, the original is kept, and the variants the
 * uploader chose (widths, optimize, WebP) are written next to it and recorded in conversions.variants.
 */
final class UploadMedia
{
    public function __construct(
        private readonly MediaStorage $storage,
        private readonly MediaRepositoryInterface $media,
        private readonly GdImageVariants $variants,
    ) {}

    /** @param array<string, mixed> $input alt, widths, optimize, webp */
    public function execute(HostContext $context, string $file, string $clientName, array $input, MediaSettings $settings): string
    {
        [$mime, $width, $height, $size] = self::inspect($file);
        $request = VariantRequest::fromInput($input, $settings);
        $workDir = sys_get_temp_dir() . '/cms-variants-' . bin2hex(random_bytes(6));
        if (!mkdir($workDir, 0700) && !is_dir($workDir)) {
            throw new \RuntimeException('Unable to prepare the variants');
        }
        $written = [];
        try {
            $path = $this->write($context, $file, $mime, $written);
            $variants = [];
            foreach ($this->variants->generate($file, $mime, $width, $height, $request, $workDir) as $variant) {
                $variants[] = ['width' => $variant['width'], 'height' => $variant['height'], 'mime' => $variant['mime'],
                    'size' => (int) filesize($variant['file']), 'path' => $this->write($context, $variant['file'], $variant['mime'], $written)];
            }
            return $this->media->store([
                'disk' => 'local', 'path' => $path, 'filename' => self::filename($clientName, $mime), 'mime_type' => $mime,
                'size' => $size, 'alt_text' => self::alt($input['alt'] ?? null), 'title' => self::filename($clientName, $mime),
                'width' => $width, 'height' => $height,
                'conversions' => json_encode(['variants' => $variants, 'options' => [
                    'widths' => $request->widths, 'optimize' => $request->optimize, 'webp' => $request->webp, 'quality' => $request->quality,
                ]], JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES),
                'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s'),
            ]);
        } catch (\Throwable $error) {
            foreach ($written as $key) {
                $this->storage->delete($context, $key);
            }
            throw $error;
        } finally {
            array_map('unlink', glob($workDir . '/*') ?: []);
            @rmdir($workDir);
        }
    }

    /** @return array{string, int, int, int} mime, width, height, bytes */
    public static function inspect(string $file): array
    {
        $size = is_file($file) ? (int) filesize($file) : 0;
        if ($size <= 0 || $size > MediaSettings::MAX_BYTES) {
            throw new InvalidUpload('SIZE', 'The file is empty or larger than the limit');
        }
        $mime = MediaTypes::detect($file);
        if ($mime === null) {
            throw new InvalidUpload('TYPE', 'Only JPEG, PNG, GIF and WebP images are accepted');
        }
        $info = @getimagesize($file);
        if ($info === false || $info[0] < 1 || $info[1] < 1 || $info[0] * $info[1] > MediaSettings::MAX_PIXELS) {
            throw new InvalidUpload('DIMENSIONS', 'The image cannot be read or has too many pixels');
        }
        return [$mime, (int) $info[0], (int) $info[1], $size];
    }

    /** @param list<string> $written */
    private function write(HostContext $context, string $file, string $mime, array &$written): string
    {
        $stream = fopen($file, 'rb');
        if ($stream === false) {
            throw new \RuntimeException('Unable to read the upload');
        }
        try {
            return $written[] = $this->storage->write($context, $stream, $mime);
        } finally {
            fclose($stream);
        }
    }

    public static function filename(string $clientName, string $mime): string
    {
        $base = pathinfo(str_replace('\\', '/', $clientName), PATHINFO_FILENAME);
        $base = trim((string) preg_replace('/[^\p{L}\p{N}._ -]+/u', '', $base), ' .-');
        return mb_substr($base === '' ? 'image' : $base, 0, 120) . '.' . MediaTypes::EXTENSIONS[$mime];
    }

    public static function alt(mixed $alt): ?string
    {
        if (!is_string($alt)) {
            return null;
        }
        $alt = trim((string) preg_replace('/\s+/u', ' ', strip_tags($alt)));
        return $alt === '' ? null : mb_substr($alt, 0, 300);
    }
}
