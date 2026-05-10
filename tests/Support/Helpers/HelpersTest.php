<?php

declare(strict_types=1);

namespace LemurCms\Tests\Support\Helpers;

use LemurCms\Support\Helpers\StringHelper;
use LemurCms\Support\Helpers\DateHelper;
use LemurCms\Support\Helpers\ArrayHelper;
use PHPUnit\Framework\TestCase;

class HelpersTest extends TestCase
{
    // ── StringHelper ────────────────────────────────────────────────────────

    public function testSlugifyConvertsToLowercase(): void
    {
        $this->assertEquals('hello-world', StringHelper::slugify('Hello World'));
    }

    public function testSlugifyRemovesSpecialChars(): void
    {
        $this->assertEquals('hello-world', StringHelper::slugify('Hello, World!'));
    }

    public function testSlugifyHandlesMultipleSpaces(): void
    {
        $this->assertEquals('hello-world', StringHelper::slugify('Hello    World'));
    }

    public function testSlugifyRemovesLeadingTrailingDashes(): void
    {
        $this->assertEquals('hello-world', StringHelper::slugify('--hello-world--'));
    }

    public function testSanitizeUrlPreservesRelativePaths(): void
    {
        $this->assertEquals('/about', StringHelper::sanitizeUrl('/about'));
    }

    public function testSanitizeUrlValidatesAbsoluteUrls(): void
    {
        $url = 'https://example.com/page';
        $this->assertEquals($url, StringHelper::sanitizeUrl($url));
    }

    public function testHtmlTruncatePreservesShortText(): void
    {
        $text = 'Hello World';
        $this->assertEquals($text, StringHelper::htmlTruncate($text, 20));
    }

    public function testHtmlTruncateTruncatesLongText(): void
    {
        $text = 'This is a very long text that should be truncated';
        $result = StringHelper::htmlTruncate($text, 10);
        $this->assertTrue(strlen(strip_tags($result)) <= 10 + 3); // +3 for "..."
    }

    public function testHashIdGeneratesConsistentHash(): void
    {
        $id = 123;
        $hash = StringHelper::hashId($id);
        $this->assertEquals($id, StringHelper::unhashId($hash));
    }

    // ── DateHelper ──────────────────────────────────────────────────────────

    public function testNowReturnsCurrentDate(): void
    {
        $now = DateHelper::now();
        $this->assertMatchesRegularExpression('/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/', $now);
    }

    public function testIsFutureDetectsFutureDate(): void
    {
        $future = date('Y-m-d H:i:s', time() + 86400);
        $this->assertTrue(DateHelper::isFuture($future));
    }

    public function testIsPastDetectsPastDate(): void
    {
        $past = date('Y-m-d H:i:s', time() - 86400);
        $this->assertTrue(DateHelper::isPast($past));
    }

    public function testAddDaysAddsCorrectDays(): void
    {
        $date = '2026-05-10 00:00:00';
        $result = DateHelper::addDays($date, 5);
        $this->assertStringContainsString('2026-05-15', $result);
    }

    public function testDaysDifferenceBetweenDates(): void
    {
        $date1 = '2026-05-10';
        $date2 = '2026-05-15';
        $diff = DateHelper::daysDifference($date1, $date2);
        $this->assertEquals(5, $diff);
    }

    // ── ArrayHelper ─────────────────────────────────────────────────────────

    public function testGetReturnsSimpleValue(): void
    {
        $array = ['name' => 'John'];
        $this->assertEquals('John', ArrayHelper::get($array, 'name'));
    }

    public function testGetReturnsDotNotationValue(): void
    {
        $array = ['user' => ['name' => 'John']];
        $this->assertEquals('John', ArrayHelper::get($array, 'user.name'));
    }

    public function testGetReturnsDefaultWhenMissing(): void
    {
        $array = ['name' => 'John'];
        $this->assertEquals('Unknown', ArrayHelper::get($array, 'age', 'Unknown'));
    }

    public function testSetSimpleValue(): void
    {
        $array = [];
        ArrayHelper::set($array, 'name', 'John');
        $this->assertEquals('John', $array['name']);
    }

    public function testSetDotNotationValue(): void
    {
        $array = [];
        ArrayHelper::set($array, 'user.name', 'John');
        $this->assertEquals('John', $array['user']['name']);
    }

    public function testOnlyFiltersArray(): void
    {
        $array = ['name' => 'John', 'age' => 30, 'email' => 'john@example.com'];
        $result = ArrayHelper::only($array, ['name', 'email']);
        $this->assertEquals(['name' => 'John', 'email' => 'john@example.com'], $result);
    }

    public function testExceptExcludesKeys(): void
    {
        $array = ['name' => 'John', 'age' => 30, 'email' => 'john@example.com'];
        $result = ArrayHelper::except($array, ['age']);
        $this->assertArrayNotHasKey('age', $result);
        $this->assertArrayHasKey('name', $result);
    }

    public function testGroupByGroupsArray(): void
    {
        $array = [
            ['type' => 'admin', 'name' => 'John'],
            ['type' => 'user', 'name' => 'Jane'],
            ['type' => 'admin', 'name' => 'Bob'],
        ];
        $result = ArrayHelper::groupBy($array, 'type');
        $this->assertCount(2, $result['admin']);
        $this->assertCount(1, $result['user']);
    }

    public function testKeyByMapsArray(): void
    {
        $array = [
            ['id' => 1, 'name' => 'John'],
            ['id' => 2, 'name' => 'Jane'],
        ];
        $result = ArrayHelper::keyBy($array, 'id');
        $this->assertEquals('John', $result[1]['name']);
        $this->assertEquals('Jane', $result[2]['name']);
    }
}
