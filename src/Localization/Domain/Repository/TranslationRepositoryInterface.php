<?php
declare(strict_types=1);

namespace LemurCms\Localization\Domain\Repository;

interface TranslationRepositoryInterface
{
    /**
     * Get all translations for a given language ID.
     *
     * @return array<array<string, mixed>>
     */
    public function getTranslationsForLanguage(string $languageId): array;

    /**
     * Update translations for a language using key-value or array pairs.
     *
     * @param string $languageId
     * @param array<array{group: string, key: string, value: string}> $translations
     */
    public function updateTranslationsForLanguage(string $languageId, array $translations): void;

    /**
     * Get a specific translation by locale, group, and key.
     */
    public function getTranslation(string $locale, string $group, string $key): ?string;

    /**
     * Get translations by locale code and group.
     *
     * @return array<string, string> Key-value pairs
     */
    public function getTranslationsByLocaleAndGroup(string $locale, string $group): array;

    /**
     * Delete all translations for a language ID.
     */
    public function deleteTranslationsForLanguage(string $languageId): void;

    /**
     * Get ALL translations for a locale code as flat key=>value pairs.
     * Returns merged result across all groups.
     *
     * @return array<string, string>
     */
    public function getAllTranslationsByLocale(string $locale): array;

    /**
     * Get the default language code from cms_languages.
     */
    public function getDefaultLocale(): ?string;
}
