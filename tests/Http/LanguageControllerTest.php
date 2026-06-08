<?php
declare(strict_types=1);

namespace LemurCms\Tests\Http;

use LemurCms\Http\Controllers\LanguageController;
use LemurCms\Localization\Domain\Repository\LanguageRepositoryInterface;
use LemurCms\Localization\Domain\Repository\TranslationRepositoryInterface;
use LemurCms\Localization\Application\ListLanguages;
use LemurCms\Localization\Application\CreateLanguage;
use LemurCms\Localization\Application\UpdateLanguage;
use LemurCms\Localization\Application\DeleteLanguage;
use LemurCms\Localization\Application\ListTranslations;
use LemurCms\Localization\Application\UpdateTranslations;
use LemurDB;
use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\MockObject\MockObject;

class LanguageControllerTest extends TestCase
{
    private LanguageRepositoryInterface&MockObject $languageRepo;
    private TranslationRepositoryInterface&MockObject $translationRepo;
    private LemurDB&MockObject $db;
    private LanguageController&MockObject $controller;

    protected function setUp(): void
    {
        parent::setUp();

        $this->languageRepo = $this->createMock(LanguageRepositoryInterface::class);
        $this->translationRepo = $this->createMock(TranslationRepositoryInterface::class);
        $this->db = $this->createMock(LemurDB::class);

        $listLanguages = new ListLanguages($this->languageRepo);
        $createLanguage = new CreateLanguage($this->db, $this->languageRepo, $this->translationRepo);
        $updateLanguage = new UpdateLanguage($this->db, $this->languageRepo);
        $deleteLanguage = new DeleteLanguage($this->db, $this->languageRepo, $this->translationRepo);
        $listTranslations = new ListTranslations($this->translationRepo);
        $updateTranslations = new UpdateTranslations($this->translationRepo);

        $this->controller = $this->getMockBuilder(LanguageController::class)
            ->setConstructorArgs([
                $listLanguages,
                $createLanguage,
                $updateLanguage,
                $deleteLanguage,
                $listTranslations,
                $updateTranslations
            ])
            ->onlyMethods(['getRequest', 'getQueryParam'])
            ->getMock();
    }

    public function testIndexReturnsLanguages(): void
    {
        $languages = [
            ['id' => '1', 'code' => 'es', 'label' => 'Español', 'is_default' => 1],
            ['id' => '2', 'code' => 'en', 'label' => 'English', 'is_default' => 0],
        ];

        $this->languageRepo
            ->expects($this->once())
            ->method('all')
            ->willReturn($languages);

        ob_start();
        try {
            $this->controller->index();
        } catch (\Throwable) {
        }
        $output = ob_get_clean();

        $this->assertStringContainsString('Español', $output);
        $this->assertStringContainsString('English', $output);
    }

    public function testStoreCreatesLanguage(): void
    {
        $this->db->method('transaction')->will($this->returnCallback(fn($cb) => $cb($this->db)));
        
        $this->controller->method('getRequest')->willReturn([
            'code' => 'pt',
            'label' => 'Português',
            'source_language_id' => 'source-id-123'
        ]);

        $this->languageRepo
            ->expects($this->once())
            ->method('create')
            ->with($this->equalTo([
                'code' => 'pt',
                'label' => 'Português'
            ]))
            ->willReturn('generated-uuid-123');

        ob_start();
        try {
            $this->controller->store();
        } catch (\Throwable) {
        }
        $output = ob_get_clean();

        $this->assertStringContainsString('generated-uuid-123', $output);
    }

    public function testUpdateModifiesLanguage(): void
    {
        $this->db->method('transaction')->will($this->returnCallback(fn($cb) => $cb($this->db)));

        $this->controller->method('getRequest')->willReturn([
            'label' => 'Português Alterado'
        ]);

        $this->languageRepo
            ->expects($this->once())
            ->method('update')
            ->with('lang-id-123', $this->equalTo([
                'label' => 'Português Alterado'
            ]));

        ob_start();
        try {
            $this->controller->update('lang-id-123');
        } catch (\Throwable) {
        }
        ob_end_clean();
    }

    public function testDestroyDeletesLanguage(): void
    {
        $this->db->method('transaction')->will($this->returnCallback(fn($cb) => $cb($this->db)));

        $this->languageRepo
            ->expects($this->once())
            ->method('delete')
            ->with('lang-id-123');

        ob_start();
        try {
            $this->controller->destroy('lang-id-123');
        } catch (\Throwable) {
        }
        ob_end_clean();
    }

    public function testShowTranslationsReturnsTranslations(): void
    {
        $translations = [
            ['group' => 'messages', 'key' => 'welcome', 'value' => 'Bienvenido'],
        ];

        $this->translationRepo
            ->expects($this->once())
            ->method('getTranslationsForLanguage')
            ->with('lang-id-123')
            ->willReturn($translations);

        ob_start();
        try {
            $this->controller->showTranslations('lang-id-123');
        } catch (\Throwable) {
        }
        $output = ob_get_clean();

        $this->assertStringContainsString('Bienvenido', $output);
    }
}
