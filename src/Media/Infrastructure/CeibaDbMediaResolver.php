<?php

declare(strict_types=1);

namespace CeibaCms\Media\Infrastructure;

use CeibaCms\Media\Domain\MediaReferences;
use CeibaCms\Media\Domain\Resolver\MediaResolver;
use CeibaCms\Media\Domain\Resolver\ResolvedMedia;

/**
 * MediaResolver over the module's media table: public URL = base URL + stored path. The variants recorded on
 * upload (conversions.variants) become the srcset; the main URL is the largest variant, else the original.
 */
final class CeibaDbMediaResolver implements MediaResolver
{
    public function __construct(private readonly \CeibaDB $db, private readonly string $baseUrl) {}

    public function resolve(array $ids): array
    {
        $ids = array_values(array_filter(array_unique($ids), fn ($id) => is_string($id) && MediaReferences::validId($id)));
        if ($ids === []) {
            return [];
        }
        $marks = implode(',', array_fill(0, count($ids), '?'));
        $statement = $this->db->pdo()->prepare(
            "SELECT id, path, alt_text, width, height, conversions FROM {$this->db->getPrefix()}media WHERE id IN ({$marks})"
        );
        $statement->execute($ids);
        $resolved = [];
        foreach ($statement->fetchAll(\PDO::FETCH_ASSOC) as $row) {
            $resolved[(string) $row['id']] = self::media($row, $this->baseUrl);
        }
        return $resolved;
    }

    /** @param array<string, mixed> $row */
    public static function media(array $row, string $baseUrl): ResolvedMedia
    {
        $url = fn (string $path): string => rtrim($baseUrl, '/') . '/' . implode('/', array_map('rawurlencode', explode('/', ltrim($path, '/'))));
        $conversions = is_string($row['conversions'] ?? null) ? json_decode($row['conversions'], true) : null;
        $variants = [];
        foreach (is_array($conversions['variants'] ?? null) ? $conversions['variants'] : [] as $variant) {
            if (is_array($variant) && is_string($variant['path'] ?? null) && is_int($variant['width'] ?? null) && $variant['width'] > 0) {
                $variants[$variant['width']] = ['url' => $url($variant['path']), 'width' => $variant['width'],
                    'height' => is_int($variant['height'] ?? null) ? $variant['height'] : null];
            }
        }
        ksort($variants);
        $largest = $variants === [] ? null : end($variants);
        $width = isset($row['width']) ? (int) $row['width'] : null;
        $height = isset($row['height']) ? (int) $row['height'] : null;
        return new ResolvedMedia(
            (string) $row['id'],
            $largest['url'] ?? $url((string) $row['path']),
            $largest['width'] ?? ($width ?: null),
            $largest !== null ? ($largest['height'] ?? null) : ($height ?: null),
            (string) ($row['alt_text'] ?? ''),
            array_values(array_map(fn (array $v): array => ['url' => $v['url'], 'width' => $v['width']], $variants)),
        );
    }
}
