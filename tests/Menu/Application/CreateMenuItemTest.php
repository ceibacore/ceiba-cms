<?php
declare(strict_types=1);
namespace CeibaCms\Tests\Menu\Application;

use CeibaCms\Menu\Application\CreateMenuItem;
use CeibaCms\Menu\Domain\Repository\MenuRepositoryInterface;
use PHPUnit\Framework\TestCase;

class CreateMenuItemTest extends TestCase
{
    public function testExecuteReturnsId(): void
    {
        $repo = $this->createMock(MenuRepositoryInterface::class);
        $repo->method('saveMenuItem')->willReturn('test-uuid-1234');

        $useCase = new CreateMenuItem($repo);
        $result = $useCase->execute(['menu_id' => 1, 'label' => 'Home']);

        $this->assertIsString($result);
        $this->assertNotEmpty($result);
    }
}
