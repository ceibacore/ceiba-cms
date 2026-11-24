<?php

declare(strict_types=1);

namespace CeibaCms\Tests\SitePart;

use CeibaCms\SitePart\Domain\DetectSitePartConflicts;
use CeibaCms\SitePart\Domain\RenderContext;
use CeibaCms\SitePart\Domain\SitePart;
use CeibaCms\SitePart\Domain\SitePartRules;
use PHPUnit\Framework\TestCase;

final class DetectSitePartConflictsTest extends TestCase
{
    public function testReportsOnlyTiesThatActuallyWinInEachContext(): void
    {
        $rules = SitePartRules::default();
        $specific = SitePartRules::from(['include' => [['type' => 'pages', 'ids' => ['page-1']]]], 'header');
        $parts = [new SitePart('a', 'header', 'A', $rules), new SitePart('b', 'header', 'B', $rules),
            new SitePart('c', 'header', 'C', $specific)];
        $pageOne = new RenderContext('/one', 'page-1');
        $pageTwo = new RenderContext('/two', 'page-2');
        $result = DetectSitePartConflicts::inContexts($parts, [$pageOne, $pageTwo]);
        self::assertCount(1, $result);
        self::assertSame($pageTwo, $result[0]['context']);
        self::assertSame(['header' => ['a', 'b']], $result[0]['conflicts']);
    }
}
