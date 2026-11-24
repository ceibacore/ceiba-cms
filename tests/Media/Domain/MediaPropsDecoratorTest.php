<?php
declare(strict_types=1);

namespace CeibaCms\Tests\Media\Domain;

use CeibaCms\Media\Domain\Resolver\MediaPropsDecorator;
use CeibaCms\Media\Domain\Resolver\ResolvedMedia;
use CeibaCms\Media\Infrastructure\CeibaDbMediaResolver;
use PHPUnit\Framework\TestCase;

final class MediaPropsDecoratorTest extends TestCase
{
    private function media(): array
    {
        return ['m1' => new ResolvedMedia('m1', '/m/hero-1600.webp', 1600, 900, 'Library alt', [
            ['url' => '/m/hero-480.webp', 'width' => 480], ['url' => '/m/hero-1600.webp', 'width' => 1600],
        ])];
    }

    public function testImageSlotsGetUrlSrcsetSizeAndAlt(): void
    {
        $tree = (new MediaPropsDecorator($this->media()))->apply([
            ['id' => 'a', 'type' => 'image', 'props' => ['src' => ['asset' => 'm1'], 'alt' => ''], 'children' => [
                ['id' => 'b', 'type' => 'card', 'props' => ['image' => ['asset' => 'm1', 'alt' => 'Use alt'], 'link' => ['asset' => 'm1']]],
            ]],
        ]);
        self::assertSame(['src' => '/m/hero-1600.webp', 'alt' => 'Library alt', 'srcset' => '/m/hero-480.webp 480w, /m/hero-1600.webp 1600w',
            'width' => 1600, 'height' => 900], $tree[0]['props']);
        self::assertSame('Use alt', $tree[0]['children'][0]['props']['alt']);
        self::assertSame('/m/hero-1600.webp', $tree[0]['children'][0]['props']['link']);
    }

    public function testNodeAltAndSizeWinAndDecorativeAndUnknownAssetsAreKept(): void
    {
        $tree = (new MediaPropsDecorator($this->media()))->apply([
            ['id' => 'a', 'type' => 'image', 'props' => ['src' => ['asset' => 'm1'], 'alt' => 'Node alt', 'width' => 300]],
            ['id' => 'b', 'type' => 'image', 'props' => ['src' => ['asset' => 'm1', 'alt' => '']]],
            ['id' => 'c', 'type' => 'image', 'props' => ['src' => ['asset' => 'gone'], 'alt' => 'x']],
        ]);
        self::assertSame(['Node alt', 300], [$tree[0]['props']['alt'], $tree[0]['props']['width']]);
        self::assertArrayNotHasKey('height', $tree[0]['props']);
        self::assertSame('', $tree[1]['props']['alt']);
        self::assertSame(['src' => '', 'alt' => 'x'], $tree[2]['props']);
    }

    public function testRowsBecomeTheLargestVariantOrTheOriginal(): void
    {
        $row = ['id' => 'm1', 'path' => 'a b.jpg', 'alt_text' => 'A', 'width' => 2000, 'height' => 1000, 'conversions' => json_encode(
            ['variants' => [['width' => 960, 'height' => 480, 'path' => 'v960.webp'], ['width' => 480, 'height' => 240, 'path' => 'v480.webp']]]
        )];
        $media = CeibaDbMediaResolver::media($row, '/cms-media/');
        self::assertSame(['/cms-media/v960.webp', 960, 480], [$media->url, $media->width, $media->height]);
        self::assertSame('/cms-media/v480.webp 480w, /cms-media/v960.webp 960w', $media->srcset());
        $plain = CeibaDbMediaResolver::media([...$row, 'conversions' => null], 'https://cdn.test');
        self::assertSame(['https://cdn.test/a%20b.jpg', 2000, 1000, ''], [$plain->url, $plain->width, $plain->height, $plain->srcset()]);
    }
}
