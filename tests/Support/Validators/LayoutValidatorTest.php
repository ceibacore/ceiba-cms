<?php
declare(strict_types=1);

namespace LemurCms\Tests\Support\Validators;

use LemurCms\Support\Validators\LayoutValidator;
use LemurCms\Support\Exceptions\InvalidMenuException;
use PHPUnit\Framework\TestCase;

class LayoutValidatorTest extends TestCase
{
    // ── Valid cases ─────────────────────────────────────────────────────────

    public function testPassesWithMinimalData(): void
    {
        LayoutValidator::validate(['name' => 'My Layout']);
        $this->addToAssertionCount(1);
    }

    public function testPassesWithAllOptionalFields(): void
    {
        LayoutValidator::validate([
            'name'               => 'Full Layout',
            'description'        => 'Desc',
            'menu_slug'          => 'main-nav',
            'footer_tree'        => [['id' => 'node-1', 'type' => 'text', 'children' => []]],
            'palette'            => ['--bs-primary' => '#000'],
            'use_system_palette' => false,
            'is_active'          => true,
        ]);
        $this->addToAssertionCount(1);
    }

    public function testPassesWithJsonStringPalette(): void
    {
        LayoutValidator::validate([
            'name'    => 'Palette Test',
            'palette' => json_encode(['primary' => '#fff']),
        ]);
        $this->addToAssertionCount(1);
    }

    public function testPassesWithJsonStringFooterTree(): void
    {
        LayoutValidator::validate([
            'name'        => 'Footer JSON',
            'footer_tree' => json_encode([['id' => 'node-1', 'type' => 'container', 'children' => []]]),
        ]);
        $this->addToAssertionCount(1);
    }

    // ── Invalid: name ───────────────────────────────────────────────────────

    public function testFailsWhenNameMissing(): void
    {
        $this->expectException(InvalidMenuException::class);
        $this->expectExceptionMessageMatches('/name.*required/i');

        LayoutValidator::validate([]);
    }

    public function testFailsWhenNameIsEmpty(): void
    {
        $this->expectException(InvalidMenuException::class);

        LayoutValidator::validate(['name' => '']);
    }

    public function testFailsWhenNameExceedsMaxLength(): void
    {
        $this->expectException(InvalidMenuException::class);
        $this->expectExceptionMessageMatches('/200/');

        LayoutValidator::validate(['name' => str_repeat('a', 201)]);
    }

    // ── Invalid: menu_slug ──────────────────────────────────────────────────

    public function testFailsWhenMenuSlugExceedsMaxLength(): void
    {
        $this->expectException(InvalidMenuException::class);
        $this->expectExceptionMessageMatches('/300/');

        LayoutValidator::validate(['name' => 'OK', 'menu_slug' => str_repeat('x', 301)]);
    }

    public function testFailsWhenMenuSlugIsNotString(): void
    {
        $this->expectException(InvalidMenuException::class);

        LayoutValidator::validate(['name' => 'OK', 'menu_slug' => 123]);
    }

    // ── Invalid: palette ────────────────────────────────────────────────────

    public function testFailsWhenPaletteIsMalformedJson(): void
    {
        $this->expectException(InvalidMenuException::class);
        $this->expectExceptionMessageMatches('/malformed JSON/i');

        LayoutValidator::validate(['name' => 'OK', 'palette' => '{bad json']);
    }

    public function testFailsWhenPaletteIsNotArrayOrString(): void
    {
        $this->expectException(InvalidMenuException::class);

        LayoutValidator::validate(['name' => 'OK', 'palette' => 99]);
    }

    // ── Invalid: footer_tree ────────────────────────────────────────────────

    public function testFailsWhenFooterTreeIsMalformedJson(): void
    {
        $this->expectException(InvalidMenuException::class);
        $this->expectExceptionMessageMatches('/malformed JSON/i');

        LayoutValidator::validate(['name' => 'OK', 'footer_tree' => '[{broken']);
    }
}
