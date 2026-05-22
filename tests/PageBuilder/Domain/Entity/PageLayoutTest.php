<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Domain\Entity;

use LemurCms\PageBuilder\Domain\Entity\PageLayout;
use PHPUnit\Framework\TestCase;

class PageLayoutTest extends TestCase
{
    public function testFromArrayWithMinimalData(): void
    {
        $layout = PageLayout::fromArray(['name' => 'Default']);

        $this->assertSame('', $layout->id);
        $this->assertSame('Default', $layout->name);
        $this->assertNull($layout->description);
        $this->assertNull($layout->menuSlug);
        $this->assertSame([], $layout->footerTree);
        $this->assertSame([], $layout->palette);
        $this->assertTrue($layout->useSystemPalette);
        $this->assertTrue($layout->isActive);
    }

    public function testFromArrayWithFullData(): void
    {
        $layout = PageLayout::fromArray([
            'id'                 => 'abc-123',
            'name'               => 'Landing',
            'description'        => 'A landing layout',
            'menu_slug'          => 'main-nav',
            'footer_tree'        => [['type' => 'text', 'props' => [], 'children' => []]],
            'palette'            => ['--bs-primary' => '#e94560'],
            'use_system_palette' => false,
            'is_active'          => true,
        ]);

        $this->assertSame('abc-123', $layout->id);
        $this->assertSame('Landing', $layout->name);
        $this->assertSame('A landing layout', $layout->description);
        $this->assertSame('main-nav', $layout->menuSlug);
        $this->assertCount(1, $layout->footerTree);
        $this->assertSame(['--bs-primary' => '#e94560'], $layout->palette);
        $this->assertFalse($layout->useSystemPalette);
        $this->assertTrue($layout->isActive);
    }

    public function testFromArrayDecodesJsonStrings(): void
    {
        $layout = PageLayout::fromArray([
            'name'               => 'Json Test',
            'footer_tree'        => json_encode([['type' => 'container', 'children' => []]]),
            'palette'            => json_encode(['--bs-primary' => '#fff']),
            'use_system_palette' => '0',
            'is_active'          => '1',
        ]);

        $this->assertIsArray($layout->footerTree);
        $this->assertCount(1, $layout->footerTree);
        $this->assertSame(['--bs-primary' => '#fff'], $layout->palette);
        $this->assertFalse($layout->useSystemPalette);
        $this->assertTrue($layout->isActive);
    }

    public function testFromArrayThrowsWhenNameMissing(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessageMatches('/name/i');

        PageLayout::fromArray(['id' => 'x']);
    }

    public function testToArrayRoundtrip(): void
    {
        $data = [
            'id'                 => 'uuid-001',
            'name'               => 'Roundtrip',
            'description'        => 'desc',
            'menu_slug'          => 'slug',
            'footer_tree'        => [['type' => 'row', 'children' => []]],
            'palette'            => ['--bs-secondary' => '#ccc'],
            'use_system_palette' => false,
            'is_active'          => true,
        ];

        $arr = PageLayout::fromArray($data)->toArray();

        $this->assertSame('uuid-001', $arr['id']);
        $this->assertSame('Roundtrip', $arr['name']);
        $this->assertSame('desc', $arr['description']);
        $this->assertSame('slug', $arr['menu_slug']);
        $this->assertSame([['type' => 'row', 'children' => []]], $arr['footer_tree']);
        $this->assertSame(['--bs-secondary' => '#ccc'], $arr['palette']);
        $this->assertFalse($arr['use_system_palette']);
        $this->assertTrue($arr['is_active']);
    }
}
