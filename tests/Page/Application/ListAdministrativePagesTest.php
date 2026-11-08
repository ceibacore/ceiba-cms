<?php
declare(strict_types=1);

namespace LemurCms\Tests\Page\Application;

use InvalidArgumentException;
use LemurCms\Page\Application\ListAdministrativePages;
use LemurCms\Page\Domain\Repository\AdministrativePageReaderInterface;
use PHPUnit\Framework\TestCase;

final class ListAdministrativePagesTest extends TestCase
{
    public function testPassesStatusSearchAndBoundedPaginationToRepository(): void
    {
        $pages = [['id' => 'draft-1', 'status' => 'draft']];
        $repo = $this->createMock(AdministrativePageReaderInterface::class);
        $repo->expects(self::once())->method('findAdministrative')->with('draft', 'Home', 20, 40)->willReturn($pages);
        self::assertSame($pages, (new ListAdministrativePages($repo))->execute('draft', 'Home', 20, 40));
    }

    public function testRejectsInvalidStatusAndPagination(): void
    {
        $repo = $this->createMock(AdministrativePageReaderInterface::class);
        $repo->expects(self::never())->method('findAdministrative');
        foreach ([['deleted', null, 10, 0], [null, null, 201, 0], [null, null, 10, -1]] as $args) {
            try {
                (new ListAdministrativePages($repo))->execute(...$args);
                self::fail('Expected invalid administrative query to be rejected');
            } catch (InvalidArgumentException) {
                self::assertTrue(true);
            }
        }
    }
}
