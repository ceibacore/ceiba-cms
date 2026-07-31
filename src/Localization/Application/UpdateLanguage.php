<?php
declare(strict_types=1);

namespace LemurCms\Localization\Application;

use LemurCms\Localization\Domain\Repository\LanguageRepositoryInterface;
use LemurDB;

final class UpdateLanguage
{
    public function __construct(
        private readonly LemurDB $db,
        private readonly LanguageRepositoryInterface $languageRepo
    ) {}

    public function execute(string $id, array $data): void
    {
        $this->db->transaction(function () use ($id, $data) {
            if (isset($data['is_default']) && (int)$data['is_default'] === 1) {
                $languages = $this->languageRepo->all();
                foreach ($languages as $lang) {
                    if ($lang['id'] !== $id && $lang['is_default'] == 1) {
                        $this->languageRepo->update($lang['id'], ['is_default' => 0]);
                    }
                }
            }

            $this->languageRepo->update($id, $data);
        });
    }
}
