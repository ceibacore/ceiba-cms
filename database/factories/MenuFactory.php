<?php

declare(strict_types=1);

namespace LemurCms\Database\Factories;

class MenuFactory extends Factory
{
    /**
     * @return array<array<string, mixed>>
     */
    public function make(int $count = 1): array
    {
        $fake = $this->fake();
        $result = [];

        for ($i = 0; $i < $count; $i++) {
            $result[] = [
                'name' => 'Menu ' . $fake->name(),
                'slug' => 'menu-' . $fake->slug(),
                'type' => $fake->randomElement(['main', 'footer', 'sidebar', 'mobile']),
                'status' => 1,
            ];
        }

        return $result;
    }
}
