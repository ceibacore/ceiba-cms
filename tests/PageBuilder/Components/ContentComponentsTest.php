<?php
declare(strict_types=1);

namespace CeibaCms\Tests\PageBuilder\Components;

use CeibaCms\Media\Domain\VideoEmbed;
use CeibaCms\PageBuilder\Application\ComponentScripts;
use CeibaCms\PageBuilder\Domain\Catalogue\ComponentCatalogue;
use PHPUnit\Framework\TestCase;

/** Plan 05-B: video links, nodes inside a card, component scripts only where used, catalogue entries. */
final class ContentComponentsTest extends TestCase
{
    public function testOnlyYouTubeAndVimeoLinksBecomeVideos(): void
    {
        foreach (['https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://youtu.be/dQw4w9WgXcQ', 'https://www.youtube.com/shorts/dQw4w9WgXcQ',
            'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ', 'https://m.youtube.com/watch?feature=x&v=dQw4w9WgXcQ'] as $url) {
            self::assertSame('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0', VideoEmbed::parse($url)?->embed, $url);
        }
        self::assertSame('https://vimeo.com/76979871', VideoEmbed::parse('https://player.vimeo.com/video/76979871')?->watch);
        foreach (['https://youtube.com.evil.test/watch?v=dQw4w9WgXcQ', 'javascript:alert(1)//youtu.be/dQw4w9WgXcQ',
            'https://youtu.be/dQw4w9WgXc', 'https://vimeo.com/abc', 'ftp://youtu.be/dQw4w9WgXcQ', 42] as $url) {
            self::assertNull(VideoEmbed::parse($url));
        }
    }

    public function testNodesPlacedInACardGoInsideItsBodyBeforeTheLink(): void
    {
        $html = ComponentFixturesTest::render([['id' => 'c', 'type' => 'card', 'props' => ['title' => 'T', 'linkLabel' => 'Go', 'linkUrl' => '/go'],
            'children' => [['id' => 'p', 'type' => 'text', 'props' => ['content' => 'Inside'], 'children' => []]]]], []);
        self::assertSame('<div class="card"><div class="card-body"><h3 class="card-title h5">T</h3><p>Inside</p><a href="/go" class="btn btn-primary">Go</a></div></div>', $html);
    }

    public function testScriptsAreAddedOnlyForTheComponentsAPageUses(): void
    {
        self::assertSame('', ComponentScripts::for([['id' => 'a', 'type' => 'text', 'children' => []]]));
        $script = ComponentScripts::for([['id' => 'a', 'type' => 'container', 'children' => [['id' => 'v', 'type' => 'video']]]]);
        self::assertStringContainsString('window.__cmsVideo', $script);
        self::assertStringContainsString('youtube-nocookie', $script);
    }

    public function testTheCatalogueOffersEachContentComponentWithItsControls(): void
    {
        $catalogue = ComponentCatalogue::createDefault();
        foreach (['divider', 'spacer', 'list', 'quote', 'card', 'gallery', 'video'] as $name) {
            self::assertTrue($catalogue->has($name), $name);
            self::assertNotSame([], $catalogue->get($name)->editorControls, $name);
        }
        self::assertSame('lines', $catalogue->get('list')->editorControls['items']['type']);
        self::assertSame('media_list', $catalogue->get('gallery')->editorControls['items']['type']);
        self::assertTrue($catalogue->get('card')->isContainer);
    }
}
