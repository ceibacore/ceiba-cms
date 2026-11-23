<?php
declare(strict_types=1);

namespace CeibaCms\Tests\PageBuilder\Design;

use CeibaCms\Page\Application\GetPageWorkingRevision;
use CeibaCms\Page\Application\SavePageDraft;
use CeibaCms\PageBuilder\Application\Design\FindDesignUsages;
use CeibaCms\PageBuilder\Application\Design\GetSiteDesign;
use CeibaCms\PageBuilder\Application\Design\PublishSiteDesign;
use CeibaCms\PageBuilder\Application\Design\SaveSiteDesignDraft;
use CeibaCms\PageBuilder\Application\Design\SiteDesignStore;
use CeibaCms\PageBuilder\Domain\Document\DocumentEnvelope;
use CeibaCms\PageBuilder\Domain\Document\HostContext;
use CeibaCms\PageBuilder\Presentation\Api\DesignApiController;
use CeibaCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

/** Pages using a token or a class are found in their working revision and in their public content (plan 04-D). */
final class FindDesignUsagesTest extends TestCase
{
    public function testTokensAndClassesAreFoundWhereverAPageStillNeedsThem(): void
    {
        $db = RevisionSchema::create();
        RevisionSchema::page($db, 'site-1', 'home', '[{"id":"a","type":"div","styles":{"classes":["hero"]},"children":[]}]');
        RevisionSchema::page($db, 'site-1', 'about', '[{"id":"b","type":"p","props":{"content":"x"},"children":[]}]');
        (new SavePageDraft($db, 'site-1'))->execute(DocumentEnvelope::fromJson(json_encode(['schemaVersion' => 1, 'documentId' => 'about',
            'revision' => 2, 'root' => [['id' => 'b', 'type' => 'p', 'styles' => ['base' => ['color' => ['token' => 'color.brand']]], 'children' => []]],
            'settings' => (object) [], 'resources' => []])), 1, 'admin');

        $find = new FindDesignUsages($db, new GetPageWorkingRevision($db, 'site-1'));
        self::assertSame([['pageId' => 'home', 'title' => 'Page home']], $find->execute('class', 'hero'), 'Public content');
        self::assertSame([['pageId' => 'about', 'title' => 'Page about']], $find->execute('token', 'color.brand'), 'Working draft');
        self::assertSame([], $find->execute('token', 'color'));
        self::assertSame([], $find->execute('class', 'card'));

        $store = new SiteDesignStore($db, 'site-1');
        $api = new DesignApiController('site-1', fn () => new HostContext('site-1', 'u', 'es', ['pages.read']),
            new GetSiteDesign($store), new SaveSiteDesignDraft($store), new PublishSiteDesign($store), $find);
        self::assertSame('about', $api->usages('token', 'color.brand')['data']['pages'][0]['pageId']);
        self::assertSame(422, $api->usages('layout', 'x')['status']);
    }
}
