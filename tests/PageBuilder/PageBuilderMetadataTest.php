<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder;

use LemurCms\PageBuilder\Domain\Service\HtmlSemanticRulesProvider;
use LemurCms\PageBuilder\Domain\Service\PageBuilderMetadataService;
use LemurCms\PageBuilder\Domain\Service\UiFrameworkRegistry;
use LemurCms\PageBuilder\Domain\Repository\TemplateRepositoryInterface;
use LemurCms\PageBuilder\Domain\Repository\PageTemplateRepositoryInterface;
use LemurCms\Http\Controllers\PageBuilderMetadataController;
use LemurCms\Tests\TestCase;

class PageBuilderMetadataTest extends TestCase
{
    private HtmlSemanticRulesProvider $rulesProvider;

    protected function setUp(): void
    {
        parent::setUp();
        $this->rulesProvider = new HtmlSemanticRulesProvider();
    }

    public function testGetHtmlSemanticRulesForParagraph(): void
    {
        $rules = $this->rulesProvider->getRules('p');
        $this->assertSame('p', $rules['tag']);
        $this->assertSame('block', $rules['category']);
        $this->assertContains('strong', $rules['allowed_children']);
        $this->assertContains('div', $rules['disallowed_children']);
        $this->assertStringContainsString('No anides elementos de bloque', $rules['best_practices']);
    }

    public function testGetHtmlSemanticRulesFallback(): void
    {
        $rules = $this->rulesProvider->getRules('nonexistenttag');
        $this->assertSame('nonexistenttag', $rules['tag']);
        $this->assertSame('generic', $rules['category']);
        $this->assertContains('*', $rules['allowed_children']);
    }

    public function testGetNativeElementsCatalog(): void
    {
        $catalog = $this->rulesProvider->getNativeElementsCatalog();
        $this->assertIsArray($catalog);
        $this->assertNotEmpty($catalog);

        // Verify Estructura & Rejilla category
        $this->assertSame('Estructura & Rejilla', $catalog[0]['category']);
        $div = $catalog[0]['items'][0];
        $this->assertSame('div', $div['type']);
        $this->assertSame('Caja (Div)', $div['label']);
        $this->assertTrue($div['allows_children']);
        $this->assertContains('class', $div['recommended_props']);

        // Verify image void tag behavior
        $multimedia = array_values(array_filter($catalog, fn($cat) => $cat['category'] === 'Multimedia'))[0];
        $img = array_values(array_filter($multimedia['items'], fn($item) => $item['type'] === 'img'))[0];
        $this->assertFalse($img['allows_children']);
        $this->assertContains('src', $img['recommended_props']);
    }

    public function testMetadataServiceRetrievesAllMetadata(): void
    {
        $uiRegistry = new UiFrameworkRegistry();

        $templateRepoMock = $this->createMock(TemplateRepositoryInterface::class);
        $templateRepoMock->method('findAll')->willReturn([
            ['id' => 't1', 'name' => 'Custom Card']
        ]);

        $pageTemplateRepoMock = $this->createMock(PageTemplateRepositoryInterface::class);
        $pageTemplateRepoMock->method('findAll')->willReturn([
            ['id' => 'pt1', 'name' => 't_article', 'slots_definition' => ['main']]
        ]);

        $service = new PageBuilderMetadataService(
            $uiRegistry,
            $templateRepoMock,
            $pageTemplateRepoMock,
            $this->rulesProvider
        );

        $metadata = $service->getAllMetadata();

        $this->assertArrayHasKey('components', $metadata);
        $this->assertArrayHasKey('templates', $metadata);
        $this->assertArrayHasKey('page_templates', $metadata);
        $this->assertArrayHasKey('html_tags', $metadata);
        $this->assertArrayHasKey('native_elements', $metadata);

        $this->assertSame('Custom Card', $metadata['templates'][0]['name']);
        $this->assertSame('t_article', $metadata['page_templates'][0]['name']);
        $this->assertSame('p', $metadata['html_tags']['p']['tag']);
    }

    public function testPageBuilderMetadataControllerOutputsJson(): void
    {
        $uiRegistry = new UiFrameworkRegistry();

        $templateRepoMock = $this->createMock(TemplateRepositoryInterface::class);
        $templateRepoMock->method('findAll')->willReturn([]);

        $pageTemplateRepoMock = $this->createMock(PageTemplateRepositoryInterface::class);
        $pageTemplateRepoMock->method('findAll')->willReturn([]);

        $service = new PageBuilderMetadataService(
            $uiRegistry,
            $templateRepoMock,
            $pageTemplateRepoMock,
            $this->rulesProvider
        );

        $controller = new PageBuilderMetadataController($service);

        ob_start();
        $controller->index();
        $output = ob_get_clean();

        $response = json_decode($output, true);
        $this->assertTrue($response['success']);
        $this->assertSame('PageBuilder metadata, templates, and rules retrieved', $response['message']);
        $this->assertArrayHasKey('components', $response['data']);
        $this->assertArrayHasKey('html_tags', $response['data']);
        $this->assertArrayHasKey('native_elements', $response['data']);
        $this->assertSame('p', $response['data']['html_tags']['p']['tag']);
    }
}
