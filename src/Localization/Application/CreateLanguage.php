<?php
declare(strict_types=1);

namespace CeibaCms\Localization\Application;

use CeibaCms\Localization\Domain\Repository\LanguageRepositoryInterface;
use CeibaCms\Localization\Domain\Repository\TranslationRepositoryInterface;
use CeibaDB;

final class CreateLanguage
{
    public function __construct(
        private readonly CeibaDB $db,
        private readonly LanguageRepositoryInterface $languageRepo,
        private readonly TranslationRepositoryInterface $translationRepo
    ) {}

    public function execute(array $data, ?string $sourceLanguageId = null): string
    {
        if (empty($data['code'])) {
            throw new \InvalidArgumentException('Language code is required.');
        }
        if (empty($data['label'])) {
            throw new \InvalidArgumentException('Language label is required.');
        }

        return $this->db->transaction(function () use ($data, $sourceLanguageId) {
            // If the new language is default, unmark other defaults
            if (isset($data['is_default']) && (int)$data['is_default'] === 1) {
                $languages = $this->languageRepo->all();
                foreach ($languages as $lang) {
                    if ($lang['is_default'] == 1) {
                        $this->languageRepo->update($lang['id'], ['is_default' => 0]);
                    }
                }
            }

            // Create language
            $languageId = $this->languageRepo->create($data);

            // Clone translations from source language if provided
            if ($sourceLanguageId) {
                $sourceTranslations = $this->translationRepo->getTranslationsForLanguage($sourceLanguageId);
                if (!empty($sourceTranslations)) {
                    $translationsToClone = array_map(fn($trans) => [
                        'group' => $trans['group'],
                        'key' => $trans['key'],
                        'value' => $trans['value'],
                    ], $sourceTranslations);
                    $this->translationRepo->updateTranslationsForLanguage($languageId, $translationsToClone);
                }
            }

            return $languageId;
        });
    }
}
