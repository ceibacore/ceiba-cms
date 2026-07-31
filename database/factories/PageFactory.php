<?php

declare(strict_types=1);

namespace LemurCms\Database\Factories;

class PageFactory extends Factory
{
    /**
     * @return array<array<string, mixed>>
     */
    public function make(int $count = 1): array
    {
        $fake = $this->fake();
        $result = [];

        for ($i = 0; $i < $count; $i++) {
            $title = $fake->words(rand(2, 5));
            $result[] = [
                'title' => $title,
                'slug' => strtolower(str_replace(' ', '-', $title)),
                'content' => json_encode([
                    'html' => $fake->paragraph(),
                ]),
                'status' => $fake->randomElement(['draft', 'published', 'archived']),
                'template' => $fake->randomElement(['default', 'blank', 'full-width', 'sidebar']),
                'sort_order' => $i,
                'created_at' => date('Y-m-d H:i:s', time() - rand(0, 2592000)),
            ];
        }

        return $result;
    }
}
