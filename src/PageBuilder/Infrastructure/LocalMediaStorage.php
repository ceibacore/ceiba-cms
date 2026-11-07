<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Infrastructure;

use InvalidArgumentException;
use LemurCms\PageBuilder\Domain\Contract\MediaStorage;
use LemurCms\PageBuilder\Domain\Document\HostContext;
use RuntimeException;

final class LocalMediaStorage implements MediaStorage
{
    public function __construct(private readonly string $baseDirectory) {}

    public function write(HostContext $context, mixed $stream, string $mimeType): string
    {
        if (!is_resource($stream)) {
            throw new InvalidArgumentException('Stream must be a valid resource');
        }
        $siteDir = $this->resolveSiteDirectory($context->siteId);
        if (!is_dir($siteDir) && !mkdir($siteDir, 0755, true) && !is_dir($siteDir)) {
            throw new RuntimeException("Unable to create site directory: {$siteDir}");
        }

        $extension = $this->guessExtension($mimeType);
        $filename = bin2hex(random_bytes(16)) . ($extension !== '' ? '.' . $extension : '');
        $destination = $siteDir . DIRECTORY_SEPARATOR . $filename;

        $target = fopen($destination, 'wb');
        if ($target === false) {
            throw new RuntimeException("Unable to open destination file: {$destination}");
        }
        stream_copy_to_stream($stream, $target);
        fclose($target);

        return $filename;
    }

    public function delete(HostContext $context, string $storageKey): void
    {
        $safeKey = basename($storageKey);
        if ($safeKey === '' || $safeKey !== $storageKey) {
            throw new InvalidArgumentException('Invalid storage key');
        }
        $filePath = $this->resolveSiteDirectory($context->siteId) . DIRECTORY_SEPARATOR . $safeKey;
        if (file_exists($filePath)) {
            unlink($filePath);
        }
    }

    private function resolveSiteDirectory(string $siteId): string
    {
        $safeSiteId = preg_replace('/[^a-zA-Z0-9_-]/', '_', $siteId);
        return rtrim($this->baseDirectory, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $safeSiteId;
    }

    private function guessExtension(string $mimeType): string
    {
        return match (strtolower(trim($mimeType))) {
            'image/jpeg', 'image/jpg' => 'jpg',
            'image/png' => 'png',
            'image/gif' => 'gif',
            'image/webp' => 'webp',
            'image/svg+xml' => 'svg',
            'application/pdf' => 'pdf',
            default => '',
        };
    }
}
