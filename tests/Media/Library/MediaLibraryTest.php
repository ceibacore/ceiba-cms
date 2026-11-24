<?php
declare(strict_types=1);

namespace CeibaCms\Tests\Media\Library;

use CeibaCms\Media\Application\Library\MediaInUse;
use CeibaCms\Media\Domain\MediaSettings;
use CeibaCms\Media\Infrastructure\CeibaDbMediaResolver;
use CeibaCms\Page\Application\SavePageDraft;
use CeibaCms\PageBuilder\Application\Design\SaveSiteDesignDraft;
use CeibaCms\PageBuilder\Domain\Document\DocumentEnvelope;
use CeibaCms\PageBuilder\Domain\Style\InvalidDesign;
use CeibaCms\PageBuilder\Domain\Style\SiteDesign;
use CeibaCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

/** Plan 05-A: search, describe, references checked on save, and no deletion while something uses the file. */
final class MediaLibraryTest extends TestCase
{
    private MediaFixture $media;

    protected function setUp(): void
    {
        $this->media = new MediaFixture();
    }

    protected function tearDown(): void
    {
        $this->media->cleanUp();
    }

    private function upload(string $name, string $alt = ''): string
    {
        return $this->media->upload->execute($this->media->context, $this->media->image(200, 100), $name, ['alt' => $alt, 'widths' => ''], MediaSettings::defaults());
    }

    private function draft(string $pageId, array $root, int $revision): void
    {
        (new SavePageDraft($this->media->db, 'site-1'))->execute(DocumentEnvelope::fromJson(json_encode([
            'schemaVersion' => 1, 'documentId' => $pageId, 'revision' => $revision, 'root' => $root,
            'settings' => (object) [], 'resources' => [],
        ], JSON_THROW_ON_ERROR)), $revision - 1, 'admin', 'edit');
    }

    public function testSearchFindsByNameOrAltAndDescribeChangesTheAlt(): void
    {
        $sea = $this->upload('sea.jpg', 'Blue water');
        $this->upload('forest.jpg');
        self::assertSame(2, $this->media->library->search('', 1)['total']);
        self::assertSame([$sea], array_column($this->media->library->search('water', 1)['items'], 'id'));
        self::assertSame([], $this->media->library->search('100%', 1)['items'], 'LIKE wildcards are literal');
        self::assertSame('Mar', $this->media->library->describe($sea, ' <b>Mar</b> ')['alt']);
        self::assertNull($this->media->library->describe('missing', 'x'));
    }

    public function testAPageReferenceMustExistAndBlocksDeletionUntilRemoved(): void
    {
        $id = $this->upload('hero.jpg');
        RevisionSchema::page($this->media->db, 'site-1', 'p1', '[]');
        try {
            $this->draft('p1', [['id' => 'i', 'type' => 'image', 'props' => ['src' => ['asset' => 'nope']]]], 2);
            self::fail('Unknown asset accepted');
        } catch (\InvalidArgumentException) {
        }
        $this->draft('p1', [['id' => 'i', 'type' => 'image', 'props' => ['src' => ['asset' => $id]]]], 2);
        self::assertSame([['pageId' => 'p1', 'title' => 'Page p1']], $this->media->usages->execute($id)['pages']);
        try {
            $this->media->library->remove($this->media->context, $id);
            self::fail('Deleted while used');
        } catch (MediaInUse $inUse) {
            self::assertSame('p1', $inUse->usages['pages'][0]['pageId']);
        }
        $this->draft('p1', [], 3);
        self::assertTrue($this->media->library->remove($this->media->context, $id));
        self::assertSame([], $this->media->storedFiles());
        self::assertFalse($this->media->library->remove($this->media->context, $id));
    }

    public function testTheSiteDesignMayUseAnAssetAsBackgroundAndThatAlsoBlocksDeletion(): void
    {
        $id = $this->upload('bg.jpg');
        $design = array_replace(SiteDesign::defaults(), ['classes' => ['banner' => ['styles' => ['base' => ['backgroundImage' => ['asset' => $id]]]]]]);
        (new SaveSiteDesignDraft($this->media->designs))->execute($design, 0, 'admin');
        self::assertTrue($this->media->usages->execute($id)['design']);
        $this->expectException(MediaInUse::class);
        $this->media->library->remove($this->media->context, $id);
    }

    public function testADesignWithAnUnknownAssetIsRefused(): void
    {
        $design = array_replace(SiteDesign::defaults(), ['classes' => ['banner' => ['styles' => ['base' => ['backgroundImage' => ['asset' => 'ghost']]]]]]);
        $this->expectException(InvalidDesign::class);
        (new SaveSiteDesignDraft($this->media->designs))->execute($design, 0, 'admin');
    }

    public function testTheResolverReturnsOnlyKnownIds(): void
    {
        $id = $this->upload('a.jpg', 'Alt');
        $resolved = (new CeibaDbMediaResolver($this->media->db, '/m'))->resolve([$id, 'gone', "x' OR 1=1 --"]);
        self::assertSame([$id], array_keys($resolved));
        self::assertSame('Alt', $resolved[$id]->alt);
    }
}
