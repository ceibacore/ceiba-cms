<?php
declare(strict_types=1);

namespace LemurCms\Localization\Infrastructure;

use LemurCms\Localization\Domain\Repository\TranslationRepositoryInterface;
use LemurDB;
use LemurCms\Support\Helpers\UuidHelper;

final class LemurDbTranslationRepository implements TranslationRepositoryInterface
{
    public function __construct(private readonly \LemurDB $db) {}

    public function getTranslationsForLanguage(string $languageId): array
    {
        return $this->db->query('translations')
            ->where(['language_id' => $languageId])
            ->orderBy('group', 'ASC')
            ->orderBy('key', 'ASC')
            ->get();
    }

    public function updateTranslationsForLanguage(string $languageId, array $translations): void
    {
        $language = $this->db->query('languages')->where(['id' => $languageId])->first();
        if (!$language) {
            return;
        }
        $locale = $language['code'];
        $now = date('Y-m-d H:i:s');

        // We run in a transaction to be safe
        $this->db->transaction(function (\LemurDB $db) use ($languageId, $translations, $now) {
            foreach ($translations as $item) {
                $group = $item['group'] ?? '*';
                $key = $item['key'];
                $value = $item['value'];

                $existing = $db->query('translations')
                    ->where(['language_id' => $languageId, 'group' => $group, 'key' => $key])
                    ->first();

                if ($existing) {
                    $db->query('translations')
                        ->where(['id' => $existing['id']])
                        ->update(['value' => $value, 'updated_at' => $now]);
                } else {
                    $db->query('translations')->insert([
                        'id' => UuidHelper::v4(),
                        'language_id' => $languageId,
                        'group' => $group,
                        'key' => $key,
                        'value' => $value,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ]);
                }
            }
        });

        // Invalidate cache
        $groups = array_unique(array_column($translations, 'group'));
        foreach ($groups as $group) {
            $cacheKey = "locale.translations.{$locale}.{$group}";
            if (class_exists(\Illuminate\Support\Facades\Cache::class)) {
                \Illuminate\Support\Facades\Cache::forget($cacheKey);
            }
        }
    }

    public function getTranslation(string $locale, string $group, string $key): ?string
    {
        $language = $this->db->query('languages')->where(['code' => $locale])->first();
        if (!$language) {
            return null;
        }

        $row = $this->db->query('translations')
            ->where(['language_id' => $language['id'], 'group' => $group, 'key' => $key])
            ->first();

        return $row !== null ? $row['value'] : null;
    }

    public function getTranslationsByLocaleAndGroup(string $locale, string $group): array
    {
        $language = $this->db->query('languages')->where(['code' => $locale])->first();
        if (!$language) {
            return [];
        }

        $rows = $this->db->query('translations')
            ->where(['language_id' => $language['id'], 'group' => $group])
            ->get();

        $translations = [];
        foreach ($rows as $row) {
            $translations[$row['key']] = $row['value'];
        }
        return $translations;
    }

    public function deleteTranslationsForLanguage(string $languageId): void
    {
        $language = $this->db->query('languages')->where(['id' => $languageId])->first();
        if ($language) {
            $locale = $language['code'];
            $rows = $this->db->query('translations')->where(['language_id' => $languageId])->get();
            $groups = array_unique(array_column($rows, 'group'));

            $this->db->query('translations')->where(['language_id' => $languageId])->delete();

            foreach ($groups as $group) {
                $cacheKey = "locale.translations.{$locale}.{$group}";
                if (class_exists(\Illuminate\Support\Facades\Cache::class)) {
                    \Illuminate\Support\Facades\Cache::forget($cacheKey);
                }
            }
        }
    }
}
