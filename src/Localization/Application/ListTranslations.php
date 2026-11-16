<?php
declare(strict_types=1);

namespace CeibaCms\Localization\Application;

use CeibaCms\Localization\Domain\Repository\TranslationRepositoryInterface;

final class ListTranslations
{
    public function __construct(private readonly TranslationRepositoryInterface $translationRepo) {}

    public function execute(string $languageId): array
    {
        return $this->translationRepo->getTranslationsForLanguage($languageId);
    }
}
