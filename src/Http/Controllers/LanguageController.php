<?php
declare(strict_types=1);

namespace LemurCms\Http\Controllers;

use LemurCms\Localization\Application\ListLanguages;
use LemurCms\Localization\Application\CreateLanguage;
use LemurCms\Localization\Application\UpdateLanguage;
use LemurCms\Localization\Application\DeleteLanguage;
use LemurCms\Localization\Application\ListTranslations;
use LemurCms\Localization\Application\UpdateTranslations;

class LanguageController extends BaseController
{
    public function __construct(
        private readonly ListLanguages $listLanguages,
        private readonly CreateLanguage $createLanguage,
        private readonly UpdateLanguage $updateLanguage,
        private readonly DeleteLanguage $deleteLanguage,
        private readonly ListTranslations $listTranslations,
        private readonly UpdateTranslations $updateTranslations
    ) {}

    public function index(): void
    {
        try {
            $languages = $this->listLanguages->execute();
            $this->success(['languages' => $languages, 'count' => count($languages)], 'Languages retrieved');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    public function store(): void
    {
        try {
            $data = $this->getRequest();
            $sourceLanguageId = $data['source_language_id'] ?? $this->getQueryParam('source_language_id');
            if (isset($data['source_language_id'])) {
                unset($data['source_language_id']);
            }
            $id = $this->createLanguage->execute($data, $sourceLanguageId ? (string)$sourceLanguageId : null);
            $this->success(['id' => $id], 'Language created', 201);
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    public function update(string $id): void
    {
        try {
            $data = $this->getRequest();
            $this->updateLanguage->execute($id, $data);
            $this->success([], 'Language updated');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    public function destroy(string $id): void
    {
        try {
            $this->deleteLanguage->execute($id);
            $this->success([], 'Language deleted');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    public function showTranslations(string $id): void
    {
        try {
            $translations = $this->listTranslations->execute($id);
            $this->success(['translations' => $translations, 'count' => count($translations)], 'Translations retrieved');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    public function saveTranslations(string $id): void
    {
        try {
            $data = $this->getRequest();
            $translations = $data['translations'] ?? [];
            if (!is_array($translations)) {
                throw new \InvalidArgumentException('Translations must be an array.');
            }
            $this->updateTranslations->execute($id, $translations);
            $this->success([], 'Translations updated');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }
}
