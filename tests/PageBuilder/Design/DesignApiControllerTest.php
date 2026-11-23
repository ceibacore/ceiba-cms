<?php
declare(strict_types=1);

namespace CeibaCms\Tests\PageBuilder\Design;

use CeibaCms\PageBuilder\Application\Design\GetSiteDesign;
use CeibaCms\PageBuilder\Application\Design\PublishSiteDesign;
use CeibaCms\PageBuilder\Application\Design\SaveSiteDesignDraft;
use CeibaCms\PageBuilder\Application\Design\SiteDesignStore;
use CeibaCms\PageBuilder\Domain\Document\HostContext;
use CeibaCms\PageBuilder\Domain\Style\SiteDesign;
use CeibaCms\PageBuilder\Presentation\Api\DesignApiController;
use CeibaCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

/** Site design API (plan 04-B): permissions of its own, If-Match, conflicts and validation errors with their path. */
final class DesignApiControllerTest extends TestCase
{
    private function api(array $capabilities, ?\CeibaDB $db = null): DesignApiController
    {
        $store = new SiteDesignStore($db ?? RevisionSchema::create(), 'site-1');
        return new DesignApiController('site-1', fn () => new HostContext('site-1', 'admin-1', 'es', $capabilities),
            new GetSiteDesign($store), new SaveSiteDesignDraft($store), new PublishSiteDesign($store));
    }

    public function testEditorsReadAndAdministratorsSaveAndPublish(): void
    {
        $db = RevisionSchema::create();
        $reader = $this->api(['pages.read'], $db);
        $admin = $this->api(['pages.read', 'design.update', 'design.publish'], $db);
        $json = json_encode(SiteDesign::defaults());

        self::assertSame(0, $reader->show()['data']['revision']);
        self::assertSame(403, $reader->saveDraft($json, '"0"')['status']);
        self::assertSame(403, $this->api([])->show()['status']);

        self::assertSame(428, $admin->saveDraft($json, null)['status']);
        self::assertSame(['revision' => 1, 'etag' => '"1"'], $admin->saveDraft($json, '"0"')['data']);
        $stale = $admin->saveDraft($json, '"0"');
        self::assertSame([412, 'REVISION_CONFLICT', '1'], [$stale['status'], $stale['error']['code'], $stale['error']['fieldErrors']['currentRevision']]);

        self::assertSame(403, $this->api(['pages.read', 'design.update'], $db)->publish('{"revision":1}')['status']);
        self::assertSame(1, $admin->publish('{"revision":1}')['data']['revision']);
        self::assertSame(404, $admin->publish('{"revision":7}')['status']);
        self::assertSame(422, $admin->publish('{}')['status']);
        self::assertSame(1, $reader->show()['data']['publishedRevision']);
        self::assertSame(1, $reader->revision(1)['data']['revision']);
        self::assertSame(404, $reader->revision(5)['status']);
    }

    public function testInvalidDesignsAreRefusedWithTheFieldThatFailed(): void
    {
        $admin = $this->api(['pages.read', 'design.update']);
        $bad = array_replace(SiteDesign::defaults(), ['breakpoints' => [['id' => 'md', 'minWidth' => 900], ['id' => 'sm', 'minWidth' => 500]]]);
        $response = $admin->saveDraft(json_encode($bad), '"0"');
        self::assertSame([422, 'VALIDATION_FAILED'], [$response['status'], $response['error']['code']]);
        self::assertSame(['design.breakpoints' => 'INVALID_BREAKPOINTS'], $response['error']['fieldErrors']);
        self::assertSame(422, $admin->saveDraft('{not json', '"0"')['status']);
    }
}
