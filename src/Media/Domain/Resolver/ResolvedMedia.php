<?php

declare(strict_types=1);

namespace CeibaCms\Media\Domain\Resolver;

/** A media file as the public page sees it: its URL, its size and the variants for srcset (plan 05 D-1, D-4). */
final class ResolvedMedia
{
    /** @param list<array{url: string, width: int}> $variants smallest first */
    public function __construct(
        public readonly string $id,
        public readonly string $url,
        public readonly ?int $width,
        public readonly ?int $height,
        public readonly string $alt,
        public readonly array $variants = [],
    ) {}

    /** srcset value, or '' when there are fewer than two candidates. */
    public function srcset(): string
    {
        if (count($this->variants) < 2) {
            return '';
        }
        return implode(', ', array_map(fn (array $v): string => $v['url'] . ' ' . $v['width'] . 'w', $this->variants));
    }

    /** @return array{id: string, url: string, width: ?int, height: ?int, alt: string, srcset: string} */
    public function toArray(): array
    {
        return ['id' => $this->id, 'url' => $this->url, 'width' => $this->width, 'height' => $this->height,
            'alt' => $this->alt, 'srcset' => $this->srcset()];
    }
}
