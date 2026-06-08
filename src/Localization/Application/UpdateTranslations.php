<?php
declare(strict_types=1);

namespace LemurCms\Localization\Application;

use LemurCms\Localization\Domain\Repository\TranslationRepositoryInterface;

final class UpdateTranslations
{
    public function __construct(private readonly TranslationRepositoryInterface $translationRepo) {}

    public function execute(string $languageId, array $translations): void
    {
        $this->translationRepo->updateTranslationsForLanguage($languageId, $translations);
    }
}
