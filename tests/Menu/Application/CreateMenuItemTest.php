<?php
declare(strict_types=1);
namespace LemurCms\Tests\Menu\Application;

use LemurCms\Menu\Application\CreateMenuItem;
use LemurCms\Menu\Domain\MenuRepositoryInterface;
use PHPUnit\Framework\TestCase;

class CreateMenuItemTest extends TestCase
{
    public function testExecuteReturnsId(): void
    {
        $repo = $this->createMock(MenuRepositoryInterface::class);
        $repo->method('saveMenuItem')->willReturn(42);

        $useCase = new CreateMenuItem($repo);
        $result = $useCase->execute(['menu_id' => 1, 'label' => 'Home']);

        $this->assertEquals(42, $result);
    }
}
