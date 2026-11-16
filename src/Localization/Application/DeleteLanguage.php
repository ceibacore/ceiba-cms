<?php
declare(strict_types=1);

namespace CeibaCms\Localization\Application;

use CeibaCms\Localization\Domain\Repository\LanguageRepositoryInterface;
use CeibaCms\Localization\Domain\Repository\TranslationRepositoryInterface;
use CeibaDB;

final class DeleteLanguage
{
    public function __construct(
        private readonly CeibaDB $db,
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
