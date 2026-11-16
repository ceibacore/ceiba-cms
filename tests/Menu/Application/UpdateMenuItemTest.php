<?php
declare(strict_types=1);
namespace CeibaCms\Tests\Menu\Application;

use CeibaCms\Menu\Application\UpdateMenuItem;
use CeibaCms\Menu\Domain\Repository\MenuRepositoryInterface;
use PHPUnit\Framework\TestCase;

class UpdateMenuItemTest extends TestCase
{
    public function testExecuteCallsRepository(): void
    {
        $repo = $this->createMock(MenuRepositoryInterface::class);
        $repo->expects($this->once())->method('updateMenuItem')->with('test-id-1', ['label' => 'Updated']);

        $useCase = new UpdateMenuItem($repo);
        $useCase->execute('test-id-1', ['label' => 'Updated']);
    }
}
