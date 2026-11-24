<?php

declare(strict_types=1);

namespace CeibaCms\Tests\SitePart;

use CeibaCms\Page\Application\CreatePage;
use CeibaCms\Page\Application\PublishPageRevision;
use CeibaCms\SitePart\Application\BuildPublicationCandidates;
use CeibaCms\SitePart\Domain\InvalidRules;
use CeibaCms\SitePart\Domain\SitePartRules;
use CeibaCms\SitePart\Infrastructure\SitePartStore;
use CeibaCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

final class BuildPublicationCandidatesTest extends TestCase
{
    public function testPublishedRulesStayPublicUntilSelectedDraftIsPublished(): void
    {
        $db = RevisionSchema::create();
        $store = new SitePartStore($db, 'site-1');
        $create = new CreatePage($db, 'site-1');
        $header = $create->execute(['kind' => 'header', 'title' => 'Header', 'slug' => 'header']);
        $footer = $create->execute(['kind' => 'footer', 'title' => 'Footer', 'slug' => 'footer']);
        $store->insertRules($header, SitePartRules::default(), null, '2026-01-01');
        $store->insertRules($footer, SitePartRules::default(), null, '2026-01-01');
        (new PublishPageRevision($db, 'site-1'))->execute($header, 1, 'publish');
        $store->publishRules($header);
        $draft = SitePartRules::from(['include' => [['type' => 'home']]], 'header');
        $store->saveDraftRules($header, $draft, 1, null, '2026-01-02');
        $builder = new BuildPublicationCandidates($store);
        $candidates = $builder->build([$header, $footer]);
        self::assertCount(1, $candidates['current']);
        self::assertCount(2, $candidates['proposed']);
        $currentHeader = array_values(array_filter($candidates['current'], fn ($p) => $p->id === $header))[0];
        $proposedHeader = array_values(array_filter($candidates['proposed'], fn ($p) => $p->id === $header))[0];
        self::assertSame('site', $currentHeader->rules->include[0]['type']);
        self::assertSame('home', $proposedHeader->rules->include[0]['type']);
        self::assertSame('site', $store->published()[0]->rules->include[0]['type']);
    }

    public function testMissingOrOtherSitePartIsRejected(): void
    {
        $db = RevisionSchema::create();
        $id = (new CreatePage($db, 'site-1'))->execute(['kind' => 'header', 'title' => 'Header', 'slug' => 'header']);
        (new SitePartStore($db, 'site-1'))->insertRules($id, SitePartRules::default(), null, '2026-01-01');
        $this->expectException(InvalidRules::class);
        (new BuildPublicationCandidates(new SitePartStore($db, 'site-2')))->build([$id]);
    }
}
