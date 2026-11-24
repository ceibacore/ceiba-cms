<?php

declare(strict_types=1);

namespace CeibaCms\Tests\SitePart;

use CeibaCms\SitePart\Application\SitePartImpact;
use CeibaCms\SitePart\Domain\RenderContext;
use CeibaCms\SitePart\Domain\SitePart;
use CeibaCms\SitePart\Domain\SitePartRules;
use PHPUnit\Framework\TestCase;

final class SitePartImpactTest extends TestCase
{
    public function testCountsChangesPaginatesAndReportsConflictsOutsideThePage(): void
    {
        $site = SitePartRules::default();
        $onlyOne = SitePartRules::from(['include' => [['type' => 'pages', 'ids' => ['page-1']]]], 'header');
        $current = [new SitePart('old', 'header', 'Old', $site)];
        $proposed = [new SitePart('old', 'header', 'Old', $site), new SitePart('new', 'header', 'New', $site),
            new SitePart('specific', 'header', 'Specific', $onlyOne)];
        $contexts = [new RenderContext('/one', 'page-1'), new RenderContext('/two', 'page-2')];
        $impact = (new SitePartImpact())->compare($current, $proposed, $contexts, 0, 1);
        self::assertSame(2, $impact['total']);
        self::assertCount(1, $impact['changes']);
        self::assertSame('page-1', $impact['changes'][0]['context']['pageId']);
        self::assertSame('specific', $impact['changes'][0]['after']['parts']['header']);
        self::assertSame('page-2', $impact['conflicts'][0]['context']['pageId']);
        self::assertSame(['header' => ['new', 'old']], $impact['conflicts'][0]['parts']);
        $next = (new SitePartImpact())->compare($current, $proposed, $contexts, 1, 1);
        self::assertSame('page-2', $next['changes'][0]['context']['pageId']);
    }

    public function testRejectsInvalidPagination(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        (new SitePartImpact())->compare([], [], [], 0, 201);
    }
}
