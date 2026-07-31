<?php
declare(strict_types=1);

namespace LemurCms\Support\Translation;

use Illuminate\Translation\TranslationServiceProvider as BaseServiceProvider;

class TranslationServiceProvider extends BaseServiceProvider
{
    /**
     * Register the translation line loader.
     *
     * @return void
     */
    protected function registerLoader()
    {
        $this->app->singleton('translation.loader', function ($app) {
            $loader = new DatabaseTranslationLoader($app['files'], $app['path.lang']);
            
            try {
                $cmsContainer = \LemurCms\LemurCms::container();
                $translationRepo = $cmsContainer['repositories']['translation'] ?? null;
                if ($translationRepo) {
                    $loader->setTranslationRepository($translationRepo);
                }
            } catch (\Throwable $e) {
                // Silently fallback if CMS is not booted yet
            }

            return $loader;
        });
    }
}
