<?php
declare(strict_types=1);

namespace CeibaCms\Tests\SitePart;

use CeibaCms\Page\Application\CreatePage;
use CeibaCms\Page\Application\GetPageWorkingRevision;
use CeibaCms\Page\Application\PublishPageRevision;
use CeibaCms\PageBuilder\Application\GetDefaultLayout;
use CeibaCms\PageBuilder\Application\GetLayoutById;
use CeibaCms\PageBuilder\Domain\Entity\PageLayout;
use CeibaCms\PageBuilder\Infrastructure\SystemClock;
use CeibaCms\SitePart\Application\BuildPublicationCandidates;
use CeibaCms\SitePart\Application\ContextConflictGuard;
use CeibaCms\SitePart\Application\ManageSiteParts;
use CeibaCms\SitePart\Application\MigrateLayoutsToParts;
use CeibaCms\SitePart\Application\PublishSiteParts;
use CeibaCms\SitePart\Infrastructure\PublishedPageContexts;
use CeibaCms\SitePart\Infrastructure\SitePartStore;
use CeibaCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

/** Plan 06 D-3: layouts become site parts with the rule «pages with this layout»; the layouts stay as they are. */
final class MigrateLayoutsToPartsTest extends TestCase
{
    private \CeibaDB $db;
    private SitePartStore $store;
    private MigrateLayoutsToParts $migrate;

    protected function setUp(): void
    {
        $this->db = RevisionSchema::create();
        $this->store = new SitePartStore($this->db, 'site-1');
        $manage = new ManageSiteParts($this->store, new CreatePage($this->db, 'site-1'), new GetPageWorkingRevision($this->db, 'site-1'), new SystemClock());
        $contexts = new PublishedPageContexts($this->db, 'site-1', $this->createMock(GetLayoutById::class), $this->createMock(GetDefaultLayout::class));
        $publish = new PublishSiteParts($this->db, 'site-1', $this->store, new PublishPageRevision($this->db, 'site-1'),
            new ContextConflictGuard(new BuildPublicationCandidates($this->store), $contexts));
        $this->migrate = new MigrateLayoutsToParts($manage, $this->store, $publish);
    }

    /** @return list<PageLayout> */
    private static function layouts(): array
    {
        $footer = [['id' => 'f1', 'type' => 'text', 'props' => ['content' => 'Footer text'], 'children' => []]];
        return [
            new PageLayout('l-main', 'Main', null, 'main', $footer, [], true, true),
            new PageLayout('l-bare', 'Bare', null, null, [], [], true, false),
        ];
    }

    public function testFootersAndMenusBecomeDraftPartsOncePerLayout(): void
    {
        $dry = $this->migrate->execute(self::layouts(), 'admin', false, true);
        self::assertCount(2, $dry['created']);
        self::assertSame([], $this->store->all(), 'a dry run creates nothing');

        $report = $this->migrate->execute(self::layouts(), 'admin');
        self::assertSame([['l-main', 'footer'], ['l-main', 'header']], array_map(fn ($c) => [$c['layoutId'], $c['kind']], $report['created']));
        self::assertSame(['EMPTY', 'EMPTY'], array_column($report['skipped'], 'reason'));
        self::assertNotSame([], $report['notes']);
        $parts = $this->store->all();
        self::assertSame(['Footer · Main', 'Header · Main'], array_column($parts, 'name'));
        self::assertSame([['type' => 'layouts', 'ids' => ['l-main']]], $parts[0]['rules']['include']);
        self::assertSame('draft', $parts[0]['status']);
        self::assertSame([], $this->store->published());

        $again = $this->migrate->execute(self::layouts(), 'admin');
        self::assertSame([], $again['created']);
        self::assertSame(['ALREADY_MIGRATED', 'ALREADY_MIGRATED'], array_values(array_filter(array_column($again['skipped'], 'reason'), fn ($r) => $r !== 'EMPTY')));
    }

    public function testPublishingMakesTheMigratedPartsVisible(): void
    {
        $report = $this->migrate->execute(self::layouts(), 'admin', true);
        self::assertTrue($report['published']);
        $published = $this->store->published();
        self::assertCount(2, $published);
        $header = array_values(array_filter($published, fn ($p) => $p->kind === 'header'))[0];
        self::assertSame('site_menu', $header->tree[0]['type']);
        self::assertSame('main', $header->tree[0]['props']['slug']);
    }
}
