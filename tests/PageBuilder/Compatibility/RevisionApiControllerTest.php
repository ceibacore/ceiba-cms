<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Compatibility;

use LemurCms\Media\Domain\Repository\MediaRepositoryInterface;
use LemurCms\Page\Application\ReconcilePageContent;
use LemurCms\Page\Application\PagePreviewTokens;
use LemurCms\Page\Application\PageRevisionAuditLog;
use LemurCms\Page\Application\PinPageRevision;
use LemurCms\Page\Application\PublishPageRevision;
use LemurCms\Page\Application\RestorePageRevision;
use LemurCms\Page\Application\SavePageDraft;
use LemurCms\Page\Application\UnpublishPage;
use LemurCms\Page\Infrastructure\LemurDbPageRepository;
use LemurCms\PageBuilder\Application\ValidatePageDocument;
use LemurCms\PageBuilder\Domain\Catalogue\ComponentCatalogue;
use LemurCms\PageBuilder\Domain\Contract\DocumentAuthorization;
use LemurCms\PageBuilder\Domain\Contract\PagePublicationAuthorization;
use LemurCms\PageBuilder\Domain\Contract\RevisionOperationAuthorization;
use LemurCms\PageBuilder\Domain\Document\DocumentMigrator;
use LemurCms\PageBuilder\Domain\Document\HostContext;
use LemurCms\PageBuilder\Presentation\Api\EditorApiController;
use LemurCms\PageBuilder\Presentation\Api\RevisionApiController;
use LemurCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

final class RevisionApiControllerTest extends TestCase
{
    private const LIVE = '[{"id":"hero","type":"h1","props":{"content":"Live"},"children":[]}]';
    private const ALL = ['pages.read', 'pages.update', 'pages.publish', 'pages.restore', 'pages.unpublish'];

    public function testRestoreRequiresIfMatchAndPermissionAndReportsConflicts(): void
    {
        $f = $this->fixture(self::ALL);
        self::assertSame(428, $f->api->restore('page-1', '{"sourceRevision":1}', null)['status']);
        self::assertSame(422, $f->api->restore('page-1', '{"sourceRevision":"1"}', '"1"')['status']);
        self::assertSame(404, $f->api->restore('page-1', '{"sourceRevision":99}', '"1"')['status']);
        self::assertSame(404, $f->api->restore('missing', '{"sourceRevision":1}', '"1"')['status']);

        $ok = $f->api->restore('page-1', '{"sourceRevision":1}', '"1"');
        self::assertSame(['revision' => 2, 'etag' => '"2"'], $ok['data']);
        $stale = $f->api->restore('page-1', '{"sourceRevision":1}', '"1"');
        self::assertSame(412, $stale['status']);
        self::assertSame('2', $stale['error']['fieldErrors']['currentRevision']);

        $denied = $this->fixture(['pages.read', 'pages.update'])->api->restore('page-1', '{"sourceRevision":1}', '"1"');
        self::assertSame(403, $denied['status']);
        $policyDenied = $this->fixture(self::ALL, policy: false);
        self::assertSame(403, $policyDenied->api->restore('page-1', '{"sourceRevision":1}', '"1"')['status']);
        $audit = (new PageRevisionAuditLog($policyDenied->db, 'site-1'))->forPage('page-1');
        self::assertSame(['restore', 'denied', 'actor-1'], [$audit[0]['action'], $audit[0]['result'], $audit[0]['actorId']]);
    }

    public function testUnpublishNeedsItsOwnPermissionAndIsIdempotent(): void
    {
        $withoutUnpublish = $this->fixture(['pages.read', 'pages.update', 'pages.publish']);
        self::assertSame(403, $withoutUnpublish->api->unpublish('page-1', 'k-1')['status']);

        $f = $this->fixture(self::ALL);
        self::assertSame(428, $f->api->unpublish('page-1', null)['status']);
        $first = $f->api->unpublish('page-1', 'k-1');
        self::assertTrue($first['data']['unpublished']);
        self::assertSame($first, $f->api->unpublish('page-1', 'k-1'));
        self::assertFalse($f->api->unpublish('page-1', 'k-2')['data']['unpublished']);
        self::assertSame('draft', $f->db->pdo()->query("SELECT status FROM {$f->db->getPrefix()}pages")->fetchColumn());
    }

    public function testDriftIsReportedAndReconcileRecoversIt(): void
    {
        $f = $this->fixture(self::ALL);
        $p = $f->db->getPrefix();
        self::assertTrue($f->editor->saveDraft('page-1', RevisionSchema::envelope('page-1', 2)->toJson(), '"1"')['success']);
        $f->db->pdo()->exec("UPDATE {$p}pages SET content = '[{\"id\":\"x\",\"type\":\"p\",\"props\":{\"content\":\"Legacy\"},\"children\":[]}]'");

        $drift = $f->editor->publishRevision('page-1', '{"revision":2}', 'pub-1');
        self::assertSame(409, $drift['status']);
        self::assertSame('PUBLIC_CONTENT_DRIFT', $drift['error']['code']);

        self::assertSame(428, $f->api->reconcile('page-1', null)['status']);
        $reconciled = $f->api->reconcile('page-1', '"2"');
        self::assertSame(['reconciled' => true, 'revision' => 3, 'etag' => '"3"'], $reconciled['data']);
        self::assertTrue($f->editor->publishRevision('page-1', '{"revision":3}', 'pub-2')['success']);
        self::assertStringContainsString('Legacy', $f->db->pdo()->query("SELECT content FROM {$p}pages")->fetchColumn());
    }

    public function testAutosaveIsRecordedAsWorkingRevisionAndUnknownReasonRejected(): void
    {
        $f = $this->fixture(self::ALL);
        $p = $f->db->getPrefix();
        $saved = $f->editor->saveDraft('page-1', RevisionSchema::envelope('page-1', 2)->toJson(), '"1"', 'autosave');
        self::assertSame(2, $saved['data']['revision']);
        self::assertSame('autosave', $f->db->pdo()->query("SELECT reason FROM {$p}page_revisions WHERE revision=2")->fetchColumn());
        self::assertStringContainsString('Live', $f->db->pdo()->query("SELECT content FROM {$p}pages")->fetchColumn(), 'Autosave never publishes');
        self::assertSame(422, $f->editor->saveDraft('page-1', RevisionSchema::envelope('page-1', 3)->toJson(), '"2"', 'publish')['status']);

        $conflict = $f->editor->saveDraft('page-1', RevisionSchema::envelope('page-1', 2)->toJson(), '"1"');
        self::assertSame(412, $conflict['status']);
        $audit = (new PageRevisionAuditLog($f->db, 'site-1'))->forPage('page-1');
        self::assertSame(['save', 'conflict', $conflict['error']['requestId']], [$audit[0]['action'], $audit[0]['result'], $audit[0]['requestId']]);
        $features = $f->editor->capabilities()['data']['features'];
        self::assertTrue($features['autosave'] && $features['revisionRestore'] && $features['unpublish'] && $features['previewLinks']);
    }

    public function testPreviewLifecycleOverHttpContract(): void
    {
        $f = $this->fixture(self::ALL);
        $issued = $f->api->issuePreview('page-1', '{"revision":1,"ttl":120}');
        self::assertSame(201, $issued['status']);
        $public = $f->api->resolvePreview($issued['data']['token']);
        self::assertSame(1, $public['data']['revision']);
        self::assertArrayNotHasKey('pageStatus', $public['data']['snapshot']);
        self::assertSame(404, $f->api->resolvePreview('forged')['status']);
        self::assertSame(422, $f->api->issuePreview('page-1', '{"revision":1,"ttl":"long"}')['status']);
        self::assertSame(422, $f->api->revokePreviews('page-1', '../etc')['status']);
        self::assertSame(1, $f->api->revokePreviews('page-1', $issued['data']['tokenId'])['data']['revoked']);
        self::assertSame(404, $f->api->resolvePreview($issued['data']['token'])['status']);
        self::assertSame('no-store, private, max-age=0', RevisionApiController::PREVIEW_HEADERS['Cache-Control']);
        self::assertStringContainsString('noindex', RevisionApiController::PREVIEW_HEADERS['X-Robots-Tag']);

        $readOnly = $this->fixture(['pages.read']);
        self::assertSame(403, $readOnly->api->issuePreview('page-1', '{"revision":1}')['status']);
        self::assertSame('Live', $readOnly->api->showRevision('page-1', 1)['data']['snapshot']['root'][0]['props']['content']);
        self::assertSame(404, $readOnly->api->showRevision('page-1', 7)['status']);
    }

    public function testPinsAndAuditRequirePublisherAndServerErrorsAreReportedWithoutLeaking(): void
    {
        $editorOnly = $this->fixture(['pages.read', 'pages.update']);
        self::assertSame(403, $editorOnly->api->setPin('page-1', 1, true)['status']);
        self::assertSame(403, $editorOnly->api->auditTrail('page-1')['status']);

        $f = $this->fixture(self::ALL);
        self::assertTrue($f->api->setPin('page-1', 1, true)['data']['changed']);
        self::assertSame('pin', $f->api->auditTrail('page-1')['data']['entries'][0]['action']);
        self::assertSame(422, $f->api->auditTrail('page-1', 500)['status']);

        $f->db->pdo()->exec("DROP TABLE {$f->db->getPrefix()}page_preview_tokens");
        $failure = $f->api->issuePreview('page-1', '{"revision":1}');
        self::assertSame(500, $failure['status']);
        self::assertSame('Unable to complete the revision operation', $failure['error']['message']);
        self::assertStringNotContainsString('page_preview_tokens', json_encode($failure));
        self::assertSame($failure['error']['requestId'], $f->reported[0][0]);
        self::assertInstanceOf(\PDOException::class, $f->reported[0][1]);
    }

    public function testRejectsContextFromAnotherSite(): void
    {
        $f = $this->fixture(self::ALL, site: 'site-2');
        self::assertSame(403, $f->api->unpublish('page-1', 'k')['status']);
        self::assertSame(403, $f->api->showRevision('page-1', 1)['status']);
    }

    private function fixture(array $capabilities, bool $policy = true, string $site = 'site-1'): object
    {
        $db = RevisionSchema::create();
        RevisionSchema::page($db, 'site-1', 'page-1', self::LIVE);
        $authorization = $this->createMock(RevisionOperationAuthorization::class);
        $authorization->method('canPerform')->willReturn($policy);
        $update = $this->createMock(DocumentAuthorization::class);
        $update->method('canUpdate')->willReturn(true);
        $publish = $this->createMock(PagePublicationAuthorization::class);
        $publish->method('canPublish')->willReturn(true);
        $context = static fn () => new HostContext($site, 'actor-1', 'es', $capabilities);
        $fixture = new \stdClass();
        $fixture->reported = [];
        $reporter = static function (string $requestId, \Throwable $error) use ($fixture): void {
            $fixture->reported[] = [$requestId, $error];
        };
        $save = new SavePageDraft($db, 'site-1');
        $audit = new PageRevisionAuditLog($db, 'site-1');
        $pages = new LemurDbPageRepository($db);
        $media = $this->createMock(MediaRepositoryInterface::class);
        $fixture->db = $db;
        $fixture->api = new RevisionApiController('site-1', $context, $authorization, $audit,
            new RestorePageRevision($db, 'site-1', $save), new ReconcilePageContent($db, 'site-1', $save),
            new UnpublishPage($db, 'site-1'), new PagePreviewTokens($db, 'site-1'), new PinPageRevision($db, 'site-1'),
            $db, $reporter);
        $fixture->editor = new EditorApiController('/api/builder/v1', 'site-1', $pages, $media, $update,
            new DocumentMigrator(), new ValidatePageDocument('site-1', $pages, $media, $update),
            ComponentCatalogue::createDefault(), $context, $save, $db, new PublishPageRevision($db, 'site-1'), $publish,
            $audit, $reporter, true);
        return $fixture;
    }
}
