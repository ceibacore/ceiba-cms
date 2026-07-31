<?php

declare(strict_types=1);

namespace LemurCms\Seeders;

use LemurCms\Seeder\CmsSeeder;
use LemurCms\Support\Helpers\UuidHelper;

class SystemTranslationsSeeder extends CmsSeeder
{
    public function run(): void
    {
        // 1. Create Default Languages
        $englishId = $this->firstOrCreate('languages',
            ['code' => 'en'],
            [
                'id' => UuidHelper::v4(),
                'label' => 'English',
                'is_active' => 1,
                'is_default' => 1,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
        );

        $spanishId = $this->firstOrCreate('languages',
            ['code' => 'es'],
            [
                'id' => UuidHelper::v4(),
                'label' => 'Español',
                'is_active' => 1,
                'is_default' => 0,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
        );

        $now = date('Y-m-d H:i:s');

        // 2. Load catalogs
        $englishCatalog = $this->getCatalogForLocale('en');
        $spanishCatalog = $this->getCatalogForLocale('es');

        // 3. Insert English Translations
        foreach ($englishCatalog as $group => $categories) {
            foreach ($categories as $category => $items) {
                foreach ($items as $key => $value) {
                    $compositeKey = "{$category}.{$key}";
                    $this->firstOrCreate('translations',
                        [
                            'language_id' => $englishId,
                            'group' => $group,
                            'key' => $compositeKey
                        ],
                        [
                            'id' => UuidHelper::v4(),
                            'value' => $value,
                            'created_at' => $now,
                            'updated_at' => $now
                        ]
                    );
                }
            }
        }

        // 4. Insert Spanish Translations
        foreach ($spanishCatalog as $group => $categories) {
            foreach ($categories as $category => $items) {
                foreach ($items as $key => $value) {
                    $compositeKey = "{$category}.{$key}";
                    $this->firstOrCreate('translations',
                        [
                            'language_id' => $spanishId,
                            'group' => $group,
                            'key' => $compositeKey
                        ],
                        [
                            'id' => UuidHelper::v4(),
                            'value' => $value,
                            'created_at' => $now,
                            'updated_at' => $now
                        ]
                    );
                }
            }
        }
    }

    /**
     * Load dynamic translations from directory lang/
     */
    private function getCatalogForLocale(string $locale): array
    {
        $dir = __DIR__ . '/lang/' . $locale;
        if (!is_dir($dir)) {
            return [];
        }

        $catalog = [];
        foreach (scandir($dir) as $file) {
            if ($file === '.' || $file === '..') {
                continue;
            }
            if (pathinfo($file, PATHINFO_EXTENSION) === 'php') {
                $group = pathinfo($file, PATHINFO_FILENAME);
                $catalog[$group] = include $dir . '/' . $file;
            }
        }

        return $catalog;
    }
}