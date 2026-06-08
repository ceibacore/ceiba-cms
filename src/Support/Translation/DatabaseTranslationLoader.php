<?php
declare(strict_types=1);

namespace LemurCms\Support\Translation;

use Illuminate\Translation\FileLoader;
use Illuminate\Support\Facades\Cache;
use LemurCms\Localization\Domain\Repository\TranslationRepositoryInterface;

class DatabaseTranslationLoader extends FileLoader
{
    /**
     * @var TranslationRepositoryInterface|null
     */
    protected ?TranslationRepositoryInterface $translationRepo = null;

    public function setTranslationRepository(TranslationRepositoryInterface $translationRepo): void
    {
        $this->translationRepo = $translationRepo;
    }

    /**
     * Load the messages for the given locale.
     *
     * @param  string  $locale
     * @param  string  $group
     * @param  string  $namespace
     * @return array
     */
    public function load($locale, $group, $namespace = null)
    {
        // 1. Load from static files
        $fileTranslations = parent::load($locale, $group, $namespace);

        // We only override for default namespace
        if ($namespace !== null && $namespace !== '*') {
            return $fileTranslations;
        }

        // If repo is not set, return file translations
        if ($this->translationRepo === null) {
            return $fileTranslations;
        }

        // 2. Fetch from DB (cached indefinitely)
        $cacheKey = "locale.translations.{$locale}.{$group}";

        $dbTranslations = Cache::rememberForever($cacheKey, function () use ($locale, $group) {
            return $this->translationRepo->getTranslationsByLocaleAndGroup($locale, $group);
        });

        // 3. Merge (DB values override static file values)
        return array_merge($fileTranslations, $dbTranslations);
    }
}
