<?php

declare(strict_types=1);

namespace LemurCms\Database\Factories;

class UserFactory extends Factory
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
                'name' => $fake->name() . ' ' . $fake->name(),
                'email' => str_replace('@example.com', '+' . $i . '@example.com', $fake->email()),
                'password_hash' => password_hash('Password123', PASSWORD_BCRYPT),
                'is_active' => 1,
                'created_at' => date('Y-m-d H:i:s', time() - rand(0, 2592000)),
            ];
        }

        return $result;
    }
}
