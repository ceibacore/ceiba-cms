<?php
declare(strict_types=1);
namespace LemurCms\Menu\Presentation;

/**
 * File-based cache for menu data and rendered HTML.
 * Stores cache in storage/cache/menus/ directory.
 */
final class LemurMenuCache
{
    private readonly string $cacheDir;

    public function __construct(string $basePath = __DIR__ . '/../../..', private readonly int $ttl = 3600)
    {
        $this->cacheDir = $basePath . '/storage/cache/menus';
        if (!is_dir($this->cacheDir)) {
            mkdir($this->cacheDir, 0755, true);
        }
    }

    public function get(string $key): ?array
    {
        $file = $this->getFilePath($key);
        if (!file_exists($file)) return null;

        $data = @json_decode(file_get_contents($file), true, 512, JSON_THROW_ON_ERROR);
        if (!$data || ($data['expires'] ?? 0) < time()) {
            @unlink($file);
            return null;
        }

        return $data['value'] ?? null;
    }

    public function set(string $key, array $value): void
    {
        $file = $this->getFilePath($key);
        $data = [
            'value' => $value,
            'expires' => time() + $this->ttl,
            'created_at' => date('Y-m-d H:i:s'),
        ];
        file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    }

    public function getRendered(string $key): ?string
    {
        $file = $this->getFilePath($key . '_html');
        if (!file_exists($file)) return null;

        $data = @json_decode(file_get_contents($file), true);
        if (!$data || ($data['expires'] ?? 0) < time()) {
            @unlink($file);
            return null;
        }

        return $data['html'] ?? null;
    }

    public function setRendered(string $key, string $html): void
    {
        $file = $this->getFilePath($key . '_html');
        $data = [
            'html' => $html,
            'expires' => time() + $this->ttl,
            'created_at' => date('Y-m-d H:i:s'),
        ];
        file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    }

    public function forget(string $key): void
    {
        $file = $this->getFilePath($key);
        if (file_exists($file)) @unlink($file);
        
        $htmlFile = $this->getFilePath($key . '_html');
        if (file_exists($htmlFile)) @unlink($htmlFile);
    }

    public function flush(): void
    {
        $files = glob($this->cacheDir . '/*.json');
        foreach ($files as $file) {
            @unlink($file);
        }
    }

    private function getFilePath(string $key): string
    {
        $safe = preg_replace('/[^a-z0-9_-]/i', '_', $key);
        return $this->cacheDir . '/' . $safe . '.json';
    }
}
