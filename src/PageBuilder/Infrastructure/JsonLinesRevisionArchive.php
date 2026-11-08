<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Infrastructure;

use InvalidArgumentException;
use LemurCms\PageBuilder\Domain\Contract\RevisionArchive;
use RuntimeException;

/**
 * Local reference archive: one JSON Lines file per purge run, per site directory.
 * Written to a temporary file, flushed to disk, then atomically renamed.
 * Hosts with object storage should provide their own RevisionArchive.
 */
final class JsonLinesRevisionArchive implements RevisionArchive
{
    public function __construct(private readonly string $directory)
    {
        if (trim($directory) === '') {
            throw new InvalidArgumentException('An archive directory is required');
        }
    }

    public function archive(string $siteId, array $revisions): string
    {
        if (trim($siteId) === '' || $revisions === []) {
            throw new InvalidArgumentException('A site ID and at least one revision are required');
        }
        // Site directory is derived from the ID but cannot traverse or collide.
        $siteDir = preg_replace('/[^A-Za-z0-9_-]/', '_', substr($siteId, 0, 40)) . '-' . substr(hash('sha256', $siteId), 0, 12);
        $dir = rtrim($this->directory, '/\\') . DIRECTORY_SEPARATOR . $siteDir;
        if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
            throw new RuntimeException('Revision archive directory unavailable');
        }
        $name = 'revisions-' . gmdate('Ymd\THis\Z') . '-' . bin2hex(random_bytes(6)) . '.jsonl';
        $final = $dir . DIRECTORY_SEPARATOR . $name;
        $temp = $final . '.tmp';
        $handle = @fopen($temp, 'xb');
        if ($handle === false) {
            throw new RuntimeException('Revision archive file unavailable');
        }
        try {
            @chmod($temp, 0600);
            foreach ($revisions as $revision) {
                $line = json_encode($revision, JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "\n";
                if (fwrite($handle, $line) !== strlen($line)) {
                    throw new RuntimeException('Revision archive write failed');
                }
            }
            if (!fflush($handle) || !fsync($handle)) {
                throw new RuntimeException('Revision archive flush failed');
            }
        } catch (\Throwable $error) {
            fclose($handle);
            @unlink($temp);
            throw $error instanceof RuntimeException ? $error : new RuntimeException('Revision archive write failed', 0, $error);
        }
        fclose($handle);
        if (!@rename($temp, $final)) {
            @unlink($temp);
            throw new RuntimeException('Revision archive commit failed');
        }
        return $siteDir . '/' . $name;
    }
}
