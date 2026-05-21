<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Presentation;

use LemurCms\Http\Controllers\TemplateController;
use LemurCms\PageBuilder\Application\ListTemplates;
use LemurCms\PageBuilder\Application\GetTemplateById;
use LemurCms\PageBuilder\Application\CreateTemplate;
use LemurCms\PageBuilder\Application\DeleteTemplate;
use LemurCms\PageBuilder\Domain\Repository\TemplateRepositoryInterface;
use PHPUnit\Framework\TestCase;

class TestTemplateController extends TemplateController
{
    public ?array $mockRequestData = null;
    public ?array $lastJson = null;
    public ?int $lastStatus = null;

    protected function getRequest(): array
    {
        return $this->mockRequestData ?? parent::getRequest();
    }

    protected function json(array $data, int $status = 200): void
    {
        $this->lastJson = $data;
        $this->lastStatus = $status;
    }
}

class TemplateControllerTest extends TestCase
{
    private $repoMock;
    private TestTemplateController $controller;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repoMock = $this->createMock(TemplateRepositoryInterface::class);

        $listTemplates = new ListTemplates($this->repoMock);
        $getTemplateById = new GetTemplateById($this->repoMock);
        $createTemplate = new CreateTemplate($this->repoMock);
        $deleteTemplate = new DeleteTemplate($this->repoMock);

        $this->controller = new TestTemplateController(
            $listTemplates,
            $getTemplateById,
            $createTemplate,
            $deleteTemplate
        );
    }

    public function testIndexReturnsTemplates(): void
    {
        $templates = [
            ['id' => 'tpl-1', 'name' => 'Template 1', 'tree' => []],
            ['id' => 'tpl-2', 'name' => 'Template 2', 'tree' => []],
        ];

        $this->repoMock
            ->expects($this->once())
            ->method('findAll')
            ->willReturn($templates);

        $this->controller->index();

        $this->assertEquals(200, $this->controller->lastStatus);
        $this->assertTrue($this->controller->lastJson['success']);
        $this->assertEquals($templates, $this->controller->lastJson['data']['templates']);
        $this->assertEquals(2, $this->controller->lastJson['data']['count']);
    }

    public function testShowReturnsTemplateWhenFound(): void
    {
        $template = ['id' => 'tpl-1', 'name' => 'Template 1', 'tree' => []];

        $this->repoMock
            ->expects($this->once())
            ->method('findById')
            ->with('tpl-1')
            ->willReturn($template);

        $this->controller->show('tpl-1');

        $this->assertEquals(200, $this->controller->lastStatus);
        $this->assertTrue($this->controller->lastJson['success']);
        $this->assertEquals($template, $this->controller->lastJson['data']);
    }

    public function testShowReturns404WhenNotFound(): void
    {
        $this->repoMock
            ->expects($this->once())
            ->method('findById')
            ->with('nonexistent')
            ->willReturn(null);

        $this->controller->show('nonexistent');

        $this->assertEquals(404, $this->controller->lastStatus);
        $this->assertFalse($this->controller->lastJson['success']);
        $this->assertEquals('Template not found', $this->controller->lastJson['message']);
    }

    public function testStoreSavesTemplateWhenValid(): void
    {
        $validData = [
            'name' => 'New Template',
            'tree' => [
                ['id' => 'node-1', 'type' => 'container']
            ]
        ];

        $this->controller->mockRequestData = $validData;

        $this->repoMock
            ->expects($this->once())
            ->method('save')
            ->with($validData)
            ->willReturn('new-tpl-uuid');

        $this->controller->store();

        $this->assertEquals(201, $this->controller->lastStatus);
        $this->assertTrue($this->controller->lastJson['success']);
        $this->assertEquals(['id' => 'new-tpl-uuid'], $this->controller->lastJson['data']);
    }

    public function testStoreReturnsErrorWhenInvalid(): void
    {
        // Missing name and tree
        $invalidData = [
            'description' => 'No name'
        ];

        $this->controller->mockRequestData = $invalidData;

        $this->repoMock
            ->expects($this->never())
            ->method('save');

        $this->controller->store();

        $this->assertEquals(400, $this->controller->lastStatus);
        $this->assertFalse($this->controller->lastJson['success']);
        $this->assertStringContainsString('Template name is required', $this->controller->lastJson['message']);
    }

    public function testDestroyDeletesTemplate(): void
    {
        $this->repoMock
            ->expects($this->once())
            ->method('delete')
            ->with('tpl-1');

        $this->controller->destroy('tpl-1');

        $this->assertEquals(200, $this->controller->lastStatus);
        $this->assertTrue($this->controller->lastJson['success']);
        $this->assertEquals('Template deleted', $this->controller->lastJson['message']);
    }
}
