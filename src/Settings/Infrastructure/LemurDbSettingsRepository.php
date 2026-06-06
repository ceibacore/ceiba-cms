<?php
declare(strict_types=1);

namespace LemurCms\Settings\Infrastructure;

use LemurCms\Settings\Domain\Repository\SettingsRepositoryInterface;
use LemurDB;

final class LemurDbSettingsRepository implements SettingsRepositoryInterface
{
    public function __construct(private readonly \LemurDB $db) {}

    public function get(string $key, ?string $default = null): ?string
    {
        $res = $this->db->query('settings')->where(['key' => $key])->first();
        return $res !== null ? $res['value'] : $default;
    }

    public function set(string $key, ?string $value): void
    {
        $exists = $this->db->query('settings')->where(['key' => $key])->first();
        if ($exists) {
            $this->db->query('settings')->where(['key' => $key])->update(['value' => $value]);
        } else {
            $this->db->query('settings')->insert(['key' => $key, 'value' => $value]);
        }
    }

    public function all(): array
    {
        $rows = $this->db->query('settings')->get();
        $settings = [];
        foreach ($rows as $row) {
            if (isset($row['key'])) {
                $settings[$row['key']] = $row['value'] ?? null;
            }
        }
        return $settings;
    }
}
