<?php
declare(strict_types=1);

namespace LemurCms\Tests\Localization;

use PHPUnit\Framework\TestCase;

class TranslationLoaderTest extends TestCase
{
    public function testLoaderIsDefined(): void
    {
        if (!class_exists(\Illuminate\Translation\FileLoader::class)) {
            $this->markTestSkipped('Illuminate Translation is not installed in standalone environment.');
        }

        $this->assertTrue(class_exists(\LemurCms\Support\Translation\DatabaseTranslationLoader::class));
        $this->assertTrue(class_exists(\LemurCms\Support\Translation\TranslationServiceProvider::class));
    }

    public function testDatabaseTranslationLoaderExtendsFileLoader(): void
    {
        if (!class_exists(\Illuminate\Translation\FileLoader::class)) {
            $this->markTestSkipped('Illuminate Translation is not installed in standalone environment.');
        }

        $filesMock = $this->createMock(\Illuminate\Filesystem\Filesystem::class);
        $repoMock = $this->createMock(\LemurCms\Localization\Domain\Repository\TranslationRepositoryInterface::class);

        $loader = new \LemurCms\Support\Translation\DatabaseTranslationLoader($filesMock, 'path/to/lang');
        $loader->setTranslationRepository($repoMock);

        $this->assertInstanceOf(\Illuminate\Translation\FileLoader::class, $loader);
    }
}
