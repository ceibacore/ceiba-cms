<?php
declare(strict_types=1);

namespace LemurCms\DynamicModule\Infrastructure;

use LemurCms\PageBuilder\Domain\Service\DataProviderInterface;

final class ApiDataProvider implements DataProviderInterface
{
    private const CACHE_TTL = 300; // 5 minutes cache

    public function getData(array $options = []): iterable
    {
        $url = $options['url'] ?? '';
        if (empty($url) || !filter_var($url, FILTER_VALIDATE_URL)) {
            return [];
        }

        $cacheDir = sys_get_temp_dir() . '/lemur_cms_cache';
        if (!is_dir($cacheDir)) {
            @mkdir($cacheDir, 0777, true);
        }

        $cacheFile = $cacheDir . '/' . md5($url) . '.json';

        // Check cache validity
        if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < self::CACHE_TTL) {
            $cachedData = json_decode((string) file_get_contents($cacheFile), true);
            if (is_array($cachedData)) {
                return $cachedData;
            }
        }

        // Fetch fresh data
        $opts = [
            'http' => [
                'method' => 'GET',
                'header' => [
                    "User-Agent: LemurCMS/1.0",
                    "Accept: application/json"
                ],
                'timeout' => 5 // 5 seconds timeout
            ]
        ];

        $context = stream_context_create($opts);
        $response = @file_get_contents($url, false, $context);

        if ($response !== false) {
            $data = json_decode($response, true);
            if (is_array($data)) {
                @file_put_contents($cacheFile, $response);
                return $data;
            }
        }

        // Fallback to expired cache if request failed
        if (file_exists($cacheFile)) {
            $cachedData = json_decode((string) file_get_contents($cacheFile), true);
            if (is_array($cachedData)) {
                return $cachedData;
            }
        }

        return [];
    }
}
