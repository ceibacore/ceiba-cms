<?php

declare(strict_types=1);

namespace LemurCms\Tests\Http;

use LemurCms\Http\Controllers\ImportController;
use LemurCms\PageBuilder\Domain\Service\UiFrameworkRegistry;
use LemurCms\PageBuilder\Frameworks\Bootstrap5\Bootstrap5Module;
use PHPUnit\Framework\TestCase;

class TestImportController extends ImportController
{
    public array $mockedRequest = [];

    protected function getRequest(): array
    {
        return $this->mockedRequest;
    }
}

class ImportControllerTest extends TestCase
{
    private UiFrameworkRegistry $uiRegistry;
    private TestImportController $controller;

    protected function setUp(): void
    {
        parent::setUp();
        $this->uiRegistry = new UiFrameworkRegistry();
        $this->uiRegistry->register(new Bootstrap5Module());
        $this->uiRegistry->setActive('bootstrap5');
        $this->controller = new TestImportController($this->uiRegistry);
    }

    public function testImportHtmlSuccess(): void
    {
        $this->controller->mockedRequest = [
            'html' => '<div class="container"><button class="btn btn-primary">Hello</button></div>',
            'options' => []
        ];

        ob_start();
        $this->controller->importHtml();
        $output = ob_get_clean();

        $response = json_decode($output, true);

        $this->assertTrue($response['success']);
        $this->assertEquals('HTML importado correctamente.', $response['message']);
        $this->assertIsArray($response['data']['tree']);
        $this->assertCount(1, $response['data']['tree']);
        
        $node = $response['data']['tree'][0];
        $this->assertEquals('container', $node['name']);
        $this->assertCount(1, $node['children']);
        $this->assertEquals('button', $node['children'][0]['name']);
    }

    public function testImportHtmlValidationError(): void
    {
        $this->controller->mockedRequest = [
            'html' => '',
        ];

        ob_start();
        $this->controller->importHtml();
        $output = ob_get_clean();

        $response = json_decode($output, true);

        $this->assertFalse($response['success']);
        $this->assertEquals('El campo html es requerido.', $response['message']);
    }

    public function testImportHtmlExceedsLimit(): void
    {
        $largeHtml = str_repeat('<div>Hello</div>', 40000); // Exceeds 512KB limit

        $this->controller->mockedRequest = [
            'html' => $largeHtml,
        ];

        ob_start();
        $this->controller->importHtml();
        $output = ob_get_clean();

        $response = json_decode($output, true);

        $this->assertFalse($response['success']);
        $this->assertEquals('El HTML excede el límite permitido de 512 KB.', $response['message']);
    }

    public function testPreviewHtmlBehavesSameAsImport(): void
    {
        $this->controller->mockedRequest = [
            'html' => '<div>Preview Text</div>',
        ];

        ob_start();
        $this->controller->previewHtml();
        $output = ob_get_clean();

        $response = json_decode($output, true);

        $this->assertTrue($response['success']);
        $this->assertEquals('HTML importado correctamente.', $response['message']);
        $this->assertIsArray($response['data']['tree']);
    }
}
