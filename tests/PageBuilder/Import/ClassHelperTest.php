<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Import;

use LemurCms\PageBuilder\Import\ClassHelper;
use PHPUnit\Framework\TestCase;

class ClassHelperTest extends TestCase
{
    // ── Helpers ──────────────────────────────────────────────────────────────

    private function el(string $html): \DOMElement
    {
        $dom = new \DOMDocument();
        libxml_use_internal_errors(true);
        $dom->loadHTML('<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>' . $html . '</body></html>');
        libxml_clear_errors();
        libxml_use_internal_errors(false);
        return $dom->getElementsByTagName('body')->item(0)->firstChild;
    }

    // ── classes() ────────────────────────────────────────────────────────────

    public function testClassesReturnsEmptyArrayWhenNoClass(): void
    {
        $el = $this->el('<div></div>');
        $this->assertSame([], ClassHelper::classes($el));
    }

    public function testClassesReturnsTrimmedTokens(): void
    {
        $el = $this->el('<div class="  foo   bar  baz  "></div>');
        $this->assertSame(['foo', 'bar', 'baz'], ClassHelper::classes($el));
    }

    // ── hasClass() ───────────────────────────────────────────────────────────

    public function testHasClassTrue(): void
    {
        $el = $this->el('<div class="container row"></div>');
        $this->assertTrue(ClassHelper::hasClass($el, 'row'));
    }

    public function testHasClassFalse(): void
    {
        $el = $this->el('<div class="container row"></div>');
        $this->assertFalse(ClassHelper::hasClass($el, 'col'));
    }

    // ── hasAnyClass() ────────────────────────────────────────────────────────

    public function testHasAnyClassReturnsTrueOnFirstMatch(): void
    {
        $el = $this->el('<div class="btn btn-primary"></div>');
        $this->assertTrue(ClassHelper::hasAnyClass($el, 'btn-secondary', 'btn-primary', 'btn-danger'));
    }

    public function testHasAnyClassReturnsFalseWhenNoneMatch(): void
    {
        $el = $this->el('<div class="row"></div>');
        $this->assertFalse(ClassHelper::hasAnyClass($el, 'container', 'container-fluid'));
    }

    // ── hasPrefixedClass() ───────────────────────────────────────────────────

    public function testHasPrefixedClass(): void
    {
        $el = $this->el('<div class="col-md-6"></div>');
        $this->assertTrue(ClassHelper::hasPrefixedClass($el, 'col-'));
        $this->assertFalse(ClassHelper::hasPrefixedClass($el, 'row-'));
    }

    // ── extraClasses() ───────────────────────────────────────────────────────

    public function testExtraClassesExcludesGivenList(): void
    {
        $el     = $this->el('<div class="card shadow mb-3"></div>');
        $extras = ClassHelper::extraClasses($el, ['card']);
        $this->assertSame('shadow mb-3', $extras);
    }

    public function testExtraClassesReturnsEmptyWhenAllExcluded(): void
    {
        $el = $this->el('<div class="btn btn-primary"></div>');
        $this->assertSame('', ClassHelper::extraClasses($el, ['btn', 'btn-primary']));
    }

    // ── colBreakpoints() ─────────────────────────────────────────────────────

    public function testColBreakpointsParsesFull(): void
    {
        $el = $this->el('<div class="col-sm-4 col-lg-8"></div>');
        $this->assertSame(['sm' => 4, 'lg' => 8], ClassHelper::colBreakpoints($el));
    }

    public function testColBreakpointsPlainColMapsToXs12(): void
    {
        $el = $this->el('<div class="col"></div>');
        $this->assertSame(['xs' => 12], ClassHelper::colBreakpoints($el));
    }

    public function testColBreakpointsShorthandWithNumber(): void
    {
        $el = $this->el('<div class="col-6"></div>');
        $this->assertSame(['xs' => 6], ClassHelper::colBreakpoints($el));
    }

    // ── btnVariant() ─────────────────────────────────────────────────────────

    public function testBtnVariantExtractsVariant(): void
    {
        $el = $this->el('<button class="btn btn-danger"></button>');
        $this->assertSame('danger', ClassHelper::btnVariant($el));
    }

    public function testBtnVariantExtractsOutlineVariant(): void
    {
        $el = $this->el('<button class="btn btn-outline-success"></button>');
        $this->assertSame('outline-success', ClassHelper::btnVariant($el));
    }

    public function testBtnVariantDefaultsPrimary(): void
    {
        $el = $this->el('<button class="btn"></button>');
        $this->assertSame('primary', ClassHelper::btnVariant($el));
    }

    // ── btnSize() ────────────────────────────────────────────────────────────

    public function testBtnSizeSmall(): void
    {
        $el = $this->el('<button class="btn btn-primary btn-sm"></button>');
        $this->assertSame('sm', ClassHelper::btnSize($el));
    }

    public function testBtnSizeLarge(): void
    {
        $el = $this->el('<button class="btn btn-primary btn-lg"></button>');
        $this->assertSame('lg', ClassHelper::btnSize($el));
    }

    public function testBtnSizeDefaultEmpty(): void
    {
        $el = $this->el('<button class="btn btn-primary"></button>');
        $this->assertSame('', ClassHelper::btnSize($el));
    }
}
