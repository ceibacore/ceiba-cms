<?php
declare(strict_types=1);

namespace LemurCms\Support\Helpers;

/**
 * A lightweight alternative to Faker for generating fake data.
 */
class FakeDataHelper
{
    private static array $firstNames = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Jamie', 'Charlie', 'Avery', 'Parker'];
    private static array $lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    private static array $domains = ['example.com', 'test.com', 'demo.org', 'fake.net'];
    private static array $words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt'];

    public static function name(): string
    {
        return self::random(self::$firstNames) . ' ' . self::random(self::$lastNames);
    }

    public static function email(?string $name = null): string
    {
        $name = $name ? strtolower(str_replace(' ', '.', $name)) : strtolower(self::random(self::$firstNames));
        $randomNum = rand(10, 999) . substr(uniqid(), -4);
        $domain = self::random(self::$domains);
        return "{$name}{$randomNum}@{$domain}";
    }

    public static function sentence(int $wordCount = 6): string
    {
        $sentence = [];
        for ($i = 0; $i < $wordCount; $i++) {
            $sentence[] = self::random(self::$words);
        }
        return ucfirst(implode(' ', $sentence)) . '.';
    }

    public static function paragraph(int $sentenceCount = 3): string
    {
        $paragraphs = [];
        for ($i = 0; $i < $sentenceCount; $i++) {
            $paragraphs[] = self::sentence(rand(5, 12));
        }
        return implode(' ', $paragraphs);
    }

    public static function number(int $min = 0, int $max = 100): int
    {
        return rand($min, $max);
    }

    public static function random(array $items)
    {
        return $items[array_rand($items)];
    }

    /**
     * Generate an array of records using a callback definition.
     */
    public static function generate(int $count, callable $definition): array
    {
        $records = [];
        for ($i = 0; $i < $count; $i++) {
            $records[] = $definition($i);
        }
        return $records;
    }
}
