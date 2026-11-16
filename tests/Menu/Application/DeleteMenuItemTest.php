<?php
declare(strict_types=1);
namespace CeibaCms\Tests\Menu\Application;

use CeibaCms\Menu\Application\DeleteMenuItem;
use CeibaCms\Menu\Domain\Repository\MenuRepositoryInterface;
use PHPUnit\Framework\TestCase;

class DeleteMenuItemTest extends TestCase
{
    public function testExecuteCallsDelete(): void
    {
        $repo = $this->createMock(MenuRepositoryInterface::class);
        $repo->expects($this->once())->method('deleteMenuItem')->with('test-id-1');

        $useCase = new DeleteMenuItem($repo);
        $useCase->execute('test-id-1');
    }
}
