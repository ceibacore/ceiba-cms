<?php
declare(strict_types=1);

namespace LemurCms\Localization\Application;

use LemurCms\Localization\Domain\Repository\LanguageRepositoryInterface;

final class ListLanguages
{
    public function __construct(private readonly LanguageRepositoryInterface $languageRepo) {}

    public function execute(): array
    {
        return $this->languageRepo->all();
    }
}
