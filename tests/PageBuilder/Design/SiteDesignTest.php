<?php
declare(strict_types=1);

namespace CeibaCms\Tests\PageBuilder\Design;

use CeibaCms\PageBuilder\Application\Design\DesignRevisionConflict;
use CeibaCms\PageBuilder\Application\Design\GetSiteDesign;
use CeibaCms\PageBuilder\Application\Design\PublishSiteDesign;
use CeibaCms\PageBuilder\Application\Design\SaveSiteDesignDraft;
use CeibaCms\PageBuilder\Application\Design\SiteDesignStore;
use CeibaCms\PageBuilder\Domain\Style\InvalidDesign;
use CeibaCms\PageBuilder\Domain\Style\SiteDesign;
use CeibaCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

/** Site design revisions (plan 04-B): defaults, drafts with If-Match, validation and publication per site. */
final class SiteDesignTest extends TestCase
{
    /** @return array{GetSiteDesign, SaveSiteDesignDraft, PublishSiteDesign, \CeibaDB} */
    private function fixture(string $site = 'site-1', ?\CeibaDB $db = null): array
    {
        $db ??= RevisionSchema::create();
        $store = new SiteDesignStore($db, $site);
        return [new GetSiteDesign($store), new SaveSiteDesignDraft($store), new PublishSiteDesign($store), $db];
    }

    private function design(string $primary): array
    {
        return array_replace(SiteDesign::defaults(), [
            'tokens' => ['color.primary' => ['type' => 'color', 'value' => $primary]],
            'classes' => ['hero' => ['styles' => ['base' => ['color' => ['token' => 'color.primary']]]]],
        ]);
    }

    public function testANewSiteHasTheBootstrapBreakpointsAndNothingElse(): void
    {
        [$get] = $this->fixture();
        $working = $get->working();
        self::assertSame([0, null, false], [$working['revision'], $working['publishedRevision'], $working['hasUnpublishedChanges']]);
        self::assertSame([576, 768, 992, 1200], array_column($working['design']['breakpoints'], 'minWidth'));
        self::assertSame(SiteDesign::defaults(), $get->published());
    }

    public function testDraftsNeedTheCurrentRevisionAndPublishingIsExplicit(): void
    {
        [$get, $save, $publish] = $this->fixture();
        self::assertSame(1, $save->execute($this->design('#111111'), 0, 'admin'));
        self::assertSame(2, $save->execute($this->design('#222222'), 1, 'admin'));
        try {
            $save->execute($this->design('#333333'), 1, 'admin');
            self::fail('A stale draft must be refused');
        } catch (DesignRevisionConflict $conflict) {
            self::assertSame(2, $conflict->currentRevision);
        }
        self::assertSame([2, null, true], [$get->working()['revision'], $get->working()['publishedRevision'], $get->working()['hasUnpublishedChanges']]);
        self::assertSame(SiteDesign::defaults(), $get->published(), 'Drafts never reach the public site');

        self::assertSame(1, $publish->execute(1));
        self::assertSame('#111111', $get->published()['tokens']['color.primary']['value']);
        self::assertSame(2, $publish->execute(2));
        self::assertSame(2, $publish->execute(2), 'Republishing is a no-op');
        self::assertFalse($get->working()['hasUnpublishedChanges']);
        self::assertSame('#111111', $get->revision(1)['tokens']['color.primary']['value']);
        $this->expectException(\InvalidArgumentException::class);
        $publish->execute(9);
    }

    public function testInvalidDesignsAreRefusedWithThePathOfTheFirstProblem(): void
    {
        [, $save] = $this->fixture();
        try {
            $save->execute(array_replace(SiteDesign::defaults(), ['tokens' => ['a' => ['type' => 'color', 'value' => 'red;}']]]), 0, 'admin');
            self::fail('An invalid token must be refused');
        } catch (InvalidDesign $invalid) {
            self::assertSame(['design.tokens.a', 'INVALID_VALUE'], [$invalid->path, $invalid->reason]);
        }
        foreach ([null, [], ['schemaVersion' => 2] + SiteDesign::defaults(), SiteDesign::defaults() + ['extra' => 1]] as $bad) {
            try {
                $save->execute($bad, 0, 'admin');
                self::fail('Malformed designs must be refused');
            } catch (\InvalidArgumentException) {
                self::addToAssertionCount(1);
            }
        }
    }

    public function testEachSiteHasItsOwnDesign(): void
    {
        [$get, $save, $publish, $db] = $this->fixture('site-1');
        [$other] = $this->fixture('site-2', $db);
        $save->execute($this->design('#111111'), 0, 'admin');
        $publish->execute(1);
        self::assertSame(0, $other->working()['revision']);
        self::assertSame(SiteDesign::defaults(), $other->published());
        self::assertNull($other->revision(1));
    }
}
