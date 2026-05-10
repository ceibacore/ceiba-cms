<?php
declare(strict_types=1);
namespace LemurCms\Tests\Page\Application;

use LemurCms\Page\Application\DeletePage;
use LemurCms\Page\Domain\PageRepositoryInterface;
use PHPUnit\Framework\TestCase;

class DeletePageTest extends TestCase
{
    public function testExecuteDeletesPage(): void
    {
        $repo = $this->createMock(PageRepositoryInterface::class);
        $repo->expects($this->once())->method('delete')->with(1);

        $useCase = new DeletePage($repo);
        $useCase->execute(1);
    }
}
