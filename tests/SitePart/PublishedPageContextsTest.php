<?php

declare(strict_types=1);

namespace CeibaCms\Tests\SitePart;

use CeibaCms\Page\Application\CreatePage;
use CeibaCms\PageBuilder\Application\GetDefaultLayout;
use CeibaCms\PageBuilder\Application\GetLayoutById;
use CeibaCms\PageBuilder\Domain\Entity\PageLayout;
use CeibaCms\SitePart\Infrastructure\PublishedPageContexts;
use CeibaCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

final class PublishedPageContextsTest extends TestCase
{
    public function testListsOnlyPublishedPagesOfThisSiteWithEffectiveLayoutAndHome(): void
    {
        $db = RevisionSchema::create();
        $create = new CreatePage($db, 'site-a');
        $home = $create->execute(['title' => 'Home', 'slug' => 'home', 'status' => 'published', 'layout_id' => 'missing']);
        $create->execute(['title' => 'Draft', 'slug' => 'draft']);
        $create->execute(['title' => 'Part', 'slug' => '__part', 'kind' => 'header', 'status' => 'published']);
        (new CreatePage($db, 'site-b'))->execute(['title' => 'Other', 'slug' => 'other', 'status' => 'published']);
        $default = $this->createMock(GetDefaultLayout::class);
        $default->method('execute')->willReturn(new PageLayout('default', 'Default', null, null, [], [], true, true));
        $layouts = $this->createMock(GetLayoutById::class);
        $layouts->expects(self::once())->method('execute')->with('missing')->willReturn(null);
        $contexts = (new PublishedPageContexts($db, 'site-a', $layouts, $default))->list();
        self::assertSame([
            ['path' => '/home', 'pageId' => $home, 'layoutId' => 'default', 'isHome' => false],
            ['path' => '/', 'pageId' => $home, 'layoutId' => 'default', 'isHome' => true],
        ], $contexts);
    }
}
