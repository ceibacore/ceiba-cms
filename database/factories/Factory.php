<?php

declare(strict_types=1);

namespace LemurCms\Database\Factories;

abstract class Factory
{
    protected array $data = [];

    abstract public function make(int $count = 1): array;

    protected function fake()
    {
        return new class {
            public function name(): string
            {
                $names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
                return $names[array_rand($names)];
            }

            public function email(): string
            {
                return strtolower($this->word() . '@example.com');
            }

            public function word(): string
            {
                $words = ['admin', 'user', 'editor', 'author', 'guest', 'test', 'demo', 'sample'];
                return $words[array_rand($words)];
            }

            public function words(int $count = 3): string
            {
                $wordList = ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', 'Consectetur', 'Adipiscing', 'Elit'];
                $selected = array_rand(array_flip($wordList), min($count, count($wordList)));
                return is_array($selected) ? implode(' ', $selected) : $selected;
            }

            public function sentence(): string
            {
                return $this->words(rand(5, 10)) . '.';
            }

            public function paragraph(): string
            {
                $sentences = [];
                for ($i = 0; $i < rand(3, 6); $i++) {
                    $sentences[] = $this->sentence();
                }
                return implode(' ', $sentences);
            }

            public function slug(): string
            {
                $word = $this->word();
                return strtolower(str_replace(' ', '-', $word));
            }

            public function url(): string
            {
                return 'https://example.com/' . $this->slug();
            }

            public function boolean(): bool
            {
                return (bool)rand(0, 1);
            }

            public function randomElement(array $array): mixed
            {
                return $array[array_rand($array)];
            }
        };
    }
}
