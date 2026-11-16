<?php
declare(strict_types=1);
namespace CeibaCms\Tests\Page\Application;

use CeibaCms\Page\Application\ListPages;
use CeibaCms\Page\Domain\Repository\PageRepositoryInterface;
use PHPUnit\Framework\TestCase;

class ListPagesTest extends TestCase
{
    public function testExecuteReturnsPaginatedList(): void
    {
        $pages = [['id' => 1, 'title' => 'Page 1']];
        
        $repo = $this->createMock(PageRepositoryInterface::class);
        $repo->method('findPublished')->willReturn($pages);

        $useCase = new ListPages($repo);
        $result = $useCase->execute(10, 0);

        $this->assertEquals($pages, $result);
    }
}
