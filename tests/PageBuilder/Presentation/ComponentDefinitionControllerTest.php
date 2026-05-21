<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Presentation;

use LemurCms\Http\Controllers\ComponentDefinitionController;
use LemurCms\PageBuilder\Application\ListComponentDefinitions;
use LemurCms\PageBuilder\Domain\Repository\ComponentDefinitionRepositoryInterface;
use LemurCms\PageBuilder\Domain\Entity\ComponentDefinition;
use PHPUnit\Framework\TestCase;

class TestComponentDefinitionController extends ComponentDefinitionController
{
    public ?array $lastJson = null;
    public ?int $lastStatus = null;

    protected function json(array $data, int $status = 200): void
    {
        $this->lastJson = $data;
        $this->lastStatus = $status;
    }
}

class ComponentDefinitionControllerTest extends TestCase
{
    public function testIndexReturnsCatalogue(): void
    {
        $repoMock = $this->createMock(ComponentDefinitionRepositoryInterface::class);
        $listComponentDefinitions = new ListComponentDefinitions($repoMock);

        $definitions = [
            new ComponentDefinition('1', 'container', 'Contenedor', 'layout', 'icon1', [], [], true, false),
            new ComponentDefinition('2', 'text', 'Texto', 'content', 'icon2', [], [], false, true),
        ];

        $repoMock
            ->expects($this->once())
            ->method('findAll')
            ->willReturn($definitions);

        $controller = new TestComponentDefinitionController($listComponentDefinitions);
        $controller->index();

        $this->assertEquals(200, $controller->lastStatus);
        $this->assertTrue($controller->lastJson['success']);
        $this->assertCount(2, $controller->lastJson['data']);
        $this->assertEquals('container', $controller->lastJson['data'][0]['type']);
        $this->assertEquals('text', $controller->lastJson['data'][1]['type']);
    }
}
