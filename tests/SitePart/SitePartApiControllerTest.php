<?php
declare(strict_types=1);

namespace CeibaCms\Tests\SitePart;

use CeibaCms\Page\Application\CreatePage;
use CeibaCms\Page\Application\GetPageWorkingRevision;
use CeibaCms\Page\Application\PublishPageRevision;
use CeibaCms\PageBuilder\Application\GetDefaultLayout;
use CeibaCms\PageBuilder\Application\GetLayoutById;
use CeibaCms\PageBuilder\Domain\Document\HostContext;
use CeibaCms\PageBuilder\Infrastructure\SystemClock;
use CeibaCms\SitePart\Application\BuildPublicationCandidates;
use CeibaCms\SitePart\Application\ContextConflictGuard;
use CeibaCms\SitePart\Application\HostRoutes;
use CeibaCms\SitePart\Application\ManageSiteParts;
use CeibaCms\SitePart\Application\PublishSiteParts;
use CeibaCms\SitePart\Infrastructure\PublishedPageContexts;
use CeibaCms\SitePart\Infrastructure\SitePartStore;
use CeibaCms\SitePart\Presentation\SitePartApiController;
use CeibaCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

/** Plan 06-C: the site parts contract of the editor, on the real use cases. */
final class SitePartApiControllerTest extends TestCase
{
    private \CeibaDB $db;

    protected function setUp(): void
    {
        $this->db = RevisionSchema::create();
        RevisionSchema::page($this->db, 'site-1', 'p-home', '[]');
        RevisionSchema::page($this->db, 'site-1', 'p-course', '[]');
    }

    /** @param list<string> $capabilities */
    private function api(array $capabilities = ['pages.read', 'pages.update', 'pages.publish']): SitePartApiController
    {
        $routes = new HostRoutes(['portal' => 'Student portal']);
        $store = new SitePartStore($this->db, 'site-1');
        $candidates = new BuildPublicationCandidates($store, $routes);
        $layouts = $this->createMock(GetLayoutById::class);
        $default = $this->createMock(GetDefaultLayout::class);
        $contexts = new PublishedPageContexts($this->db, 'site-1', $layouts, $default);
        $context = new HostContext('site-1', 'admin', 'es', $capabilities);
        return new SitePartApiController('site-1', fn () => $context,
            new ManageSiteParts($store, new CreatePage($this->db, 'site-1'), new GetPageWorkingRevision($this->db, 'site-1'), new SystemClock(), $routes),
            $candidates, $contexts,
            new PublishSiteParts($this->db, 'site-1', $store, new PublishPageRevision($this->db, 'site-1'), new ContextConflictGuard($candidates, $contexts)),
            $routes);
    }

    public function testPartsAreCreatedRuledImpactedAndPublishedTogether(): void
    {
        $api = $this->api();
        $header = $api->store('{"kind":"header","name":"Header"}')['data']['id'];
        $footer = $api->store('{"kind":"footer","name":"Footer"}')['data']['id'];
        self::assertSame(['Footer', 'Header'], array_column($api->index()['data']['parts'], 'name'));
        self::assertSame(['portal' => 'Student portal'], $api->index()['data']['routes']);

        self::assertSame(428, $api->saveRules($footer, '{}', null)['status']);
        $invalid = $api->saveRules($footer, '{"include":[{"type":"routes","names":["admin"]}]}', '"1"');
        self::assertSame([422, ['include.0.names.0' => 'UNKNOWN_ROUTE']], [$invalid['status'], $invalid['error']['fieldErrors']]);
        self::assertSame(2, $api->saveRules($footer, '{"include":[{"type":"path_prefix","value":"/slug-p-course"}]}', '"1"')['data']['version']);
        self::assertSame(412, $api->saveRules($footer, '{"include":[{"type":"site"}]}', '"1"')['status']);

        $impact = $api->impact(json_encode(['ids' => [$header, $footer]]))['data'];
        self::assertGreaterThan(0, $impact['total']);
        self::assertSame([], $impact['conflicts']);

        self::assertSame(428, $api->publish('{}', null)['status']);
        $changes = [['id' => $header, 'revision' => 1, 'rulesVersion' => 1], ['id' => $footer, 'revision' => 1, 'rulesVersion' => 2]];
        $published = $api->publish(json_encode(['changes' => $changes]), 'k-1');
        self::assertEqualsCanonicalizing([$header, $footer], array_keys($published['data']['revisions']));
        self::assertCount(2, (new SitePartStore($this->db, 'site-1'))->published());
        self::assertSame($published['data'], $api->publish(json_encode(['changes' => $changes]), 'k-1')['data'], 'retries are idempotent');
    }

    public function testATieIsRefusedWithTheContextsAndNothingIsPublished(): void
    {
        $api = $this->api();
        $a = $api->store('{"kind":"header","name":"A"}')['data']['id'];
        $b = $api->store('{"kind":"header","name":"B"}')['data']['id'];
        $refused = $api->publish(json_encode(['changes' => [['id' => $a, 'revision' => 1, 'rulesVersion' => 1],
            ['id' => $b, 'revision' => 1, 'rulesVersion' => 1]]]), 'k-tie');
        self::assertSame([409, 'SITE_PART_CONFLICT'], [$refused['status'], $refused['error']['code']]);
        self::assertNotSame([], $refused['conflicts']);
        self::assertSame([], (new SitePartStore($this->db, 'site-1'))->published());
        self::assertNotSame([], $api->impact(json_encode(['ids' => [$a, $b]]))['data']['conflicts']);
    }

    public function testEachOperationNeedsItsCapability(): void
    {
        $reader = $this->api(['pages.read']);
        self::assertTrue($reader->index()['success']);
        self::assertSame(403, $reader->store('{"kind":"header","name":"X"}')['status']);
        self::assertSame(403, $reader->publish('{"changes":[]}', 'k')['status']);
        self::assertSame(403, $this->api([])->index()['status']);
        self::assertSame(404, $this->api()->saveRules('missing', '{"include":[{"type":"site"}]}', '"1"')['status']);
        self::assertSame(422, $this->api()->store('{"kind":"single","name":"X"}')['status']);
    }
}
