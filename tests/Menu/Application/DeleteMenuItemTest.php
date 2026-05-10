<?php
declare(strict_types=1);
namespace LemurCms\Tests\Menu\Application;

use LemurCms\Menu\Application\DeleteMenuItem;
use LemurCms\Menu\Domain\MenuRepositoryInterface;
use PHPUnit\Framework\TestCase;

class DeleteMenuItemTest extends TestCase
{
    public function testExecuteCallsDelete(): void
    {
        $repo = $this->createMock(MenuRepositoryInterface::class);
        $repo->expects($this->once())->method('deleteMenuItem')->with(1);

        $useCase = new DeleteMenuItem($repo);
        $useCase->execute(1);
    }
}
