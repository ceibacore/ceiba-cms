<?php
declare(strict_types=1);

namespace LemurCms\Settings\Domain\Repository;

interface SettingsRepositoryInterface
{
    /**
     * Get a setting value by its key.
     */
    public function get(string $key, ?string $default = null): ?string;

    /**
     * Set/save a setting value.
     */
    public function set(string $key, ?string $value): void;

    /**
     * Get all settings as an associative array.
     *
     * @return array<string, ?string>
     */
    public function all(): array;
}
