<?php
declare(strict_types=1);

namespace LemurCms\Localization\Application;

use LemurCms\Localization\Domain\Repository\LanguageRepositoryInterface;
use LemurCms\Localization\Domain\Repository\TranslationRepositoryInterface;
use LemurDB;

final class DeleteLanguage
{
    public function __construct(
        private readonly LemurDB $db,
        private readonly LanguageRepositoryInterface $languageRepo,
        private readonly TranslationRepositoryInterface $translationRepo
    ) {}

    public function execute(string $id): void
    {
        $this->db->transaction(function () use ($id) {
            // Delete translations first
            $this->translationRepo->deleteTranslationsForLanguage($id);

            // Delete language
            $this->languageRepo->delete($id);
        });
    }
}
