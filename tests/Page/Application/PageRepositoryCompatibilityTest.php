<?php
declare(strict_types=1);

namespace LemurCms\Tests\Page\Application;

use LemurCms\Page\Application\ListAdministrativePages;
use LemurCms\Page\Domain\Repository\PageRepositoryInterface;
use LemurCms\Page\Infrastructure\LemurDbPageRepository;
use LemurCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

final class PageRepositoryCompatibilityTest extends TestCase
{
    /** Hosts implement this 1.x interface; adding methods would break them at load time. */
    public function testPublicRepositoryContractIsUnchangedForHosts(): void
    {
        $methods = array_map(static fn (\ReflectionMethod $m) => $m->getName(),
            (new \ReflectionClass(PageRepositoryInterface::class))->getMethods());
        sort($methods);
        self::assertSame(['delete', 'findById', 'findBySlug', 'findPublished', 'publish', 'save', 'update'], $methods);
    }

    public function testAdministrativeSearchTreatsWildcardsLiterally(): void
    {
        $db = RevisionSchema::create();
        $insert = $db->pdo()->prepare("INSERT INTO {$db->getPrefix()}pages (id, title, slug, status, sort_order) VALUES (?, ?, ?, ?, ?)");
        $insert->execute(['p1', '100% Offer', 'offer', 'draft', 1]);
        $insert->execute(['p2', '100 Offers', 'offers', 'published', 2]);
        $insert->execute(['p3', 'snake_case', 'snake', 'draft', 3]);
        $insert->execute(['p4', 'snakeXcase', 'snake-x', 'draft', 4]);
        $insert->execute(['p5', 'Bang!', 'bang', 'archived', 5]);
        // sort_order must win over id: this row sorts first despite the highest id.
        $insert->execute(['p9', 'Zz first', 'zz', 'draft', 0]);
        $list = new ListAdministrativePages(new LemurDbPageRepository($db));

        $ids = static fn (array $rows) => array_column($rows, 'id');
        self::assertSame(['p1'], $ids($list->execute(null, '100%')));
        self::assertSame(['p3'], $ids($list->execute(null, 'snake_')));
        self::assertSame(['p5'], $ids($list->execute(null, 'g!')));
        self::assertSame(['p9', 'p1', 'p3', 'p4'], $ids($list->execute('draft')));
        self::assertSame(['p1', 'p3'], $ids($list->execute('draft', null, 2, 1)));
    }
}
