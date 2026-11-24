<?php

declare(strict_types=1);

namespace CeibaCms\Media\Domain\Resolver;

use CeibaCms\Media\Domain\MediaReferences;

/**
 * Replaces the {"asset"} references of node props with what the views draw (plan 05 D-1): the URL, and for an
 * image slot ("src" or "image") also srcset, width, height and alt next to it when the node does not set them.
 * Alt text: the one of this use ("" = decorative), else the node's, else the library's. Unknown assets become an empty string.
 */
final class MediaPropsDecorator
{
    private const IMAGE_SLOTS = ['src', 'image'];

    /** @param array<string, ResolvedMedia> $media */
    public function __construct(private readonly array $media) {}

    /** @param list<mixed> $tree @return list<mixed> */
    public function apply(array $tree): array
    {
        return array_map(fn ($node) => is_array($node) ? $this->node($node) : $node, $tree);
    }

    /** @param array<string, mixed> $node @return array<string, mixed> */
    private function node(array $node): array
    {
        if (is_array($node['props'] ?? null)) {
            $node['props'] = $this->props($node['props'], 0);
        }
        if (is_array($node['children'] ?? null)) {
            $node['children'] = $this->apply($node['children']);
        }
        return $node;
    }

    /** @param array<int|string, mixed> $props @return array<int|string, mixed> */
    private function props(array $props, int $depth): array
    {
        foreach ($props as $key => $value) {
            if (!is_array($value)) {
                continue;
            }
            if (!MediaReferences::isReference($value)) {
                $props[$key] = $depth < 8 ? $this->props($value, $depth + 1) : $value;
                continue;
            }
            $media = $this->media[$value['asset']] ?? null;
            $props[$key] = $media?->url ?? '';
            if ($media !== null && in_array($key, self::IMAGE_SLOTS, true)) {
                $props = $this->imageAttributes($props, $media, is_string($value['alt'] ?? null) ? $value['alt'] : null);
            }
        }
        return $props;
    }

    /** @param array<int|string, mixed> $props @return array<int|string, mixed> */
    private function imageAttributes(array $props, ResolvedMedia $media, ?string $useAlt): array
    {
        $nodeAlt = is_string($props['alt'] ?? null) ? trim($props['alt']) : '';
        // An alt of "" on the use marks the image as decorative.
        $props['alt'] = $useAlt !== null ? trim($useAlt) : ($nodeAlt !== '' ? $nodeAlt : $media->alt);
        if (!isset($props['srcset']) && $media->srcset() !== '') {
            $props['srcset'] = $media->srcset();
        }
        if (empty($props['width']) && empty($props['height']) && $media->width !== null && $media->height !== null) {
            $props['width'] = $media->width;
            $props['height'] = $media->height;
        }
        return $props;
    }
}
