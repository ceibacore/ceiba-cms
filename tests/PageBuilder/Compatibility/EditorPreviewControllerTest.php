<?php
declare(strict_types=1);

namespace CeibaCms\Tests\PageBuilder\Compatibility;

use CeibaCms\Media\Domain\Repository\MediaRepositoryInterface;
use CeibaCms\Page\Application\GetPageWorkingRevision;
use CeibaCms\Page\Application\PagePreviewTokens;
use CeibaCms\Page\Application\PageRevisionAuditLog;
use CeibaCms\Page\Application\PinPageRevision;
use CeibaCms\Page\Application\PublishPageRevision;
use CeibaCms\Page\Application\ReconcilePageContent;
use CeibaCms\Page\Application\RestorePageRevision;
use CeibaCms\Page\Application\SavePageDraft;
use CeibaCms\Page\Application\UnpublishPage;
use CeibaCms\Page\Infrastructure\CeibaDbPageRepository;
use CeibaCms\PageBuilder\Application\ValidatePageDocument;
use CeibaCms\PageBuilder\Domain\Catalogue\ComponentCatalogue;
use CeibaCms\PageBuilder\Domain\Contract\DocumentAuthorization;
use CeibaCms\PageBuilder\Domain\Contract\PagePublicationAuthorization;
use CeibaCms\PageBuilder\Domain\Contract\RevisionOperationAuthorization;
use CeibaCms\PageBuilder\Domain\Document\DocumentMigrator;
use CeibaCms\PageBuilder\Domain\Document\HostContext;
use CeibaCms\PageBuilder\Domain\Service\BladeRendererInterface;
use CeibaCms\PageBuilder\Presentation\Api\EditorApiController;
use CeibaCms\PageBuilder\Presentation\Api\EditorPreviewController;
use CeibaCms\PageBuilder\Presentation\Api\RevisionApiController;
use CeibaCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

final class EditorPreviewControllerTest extends TestCase
{
    private const LIVE = '[{"id":"hero","type":"h1","props":{"content":"Live"},"children":[]}]';

    public function testStatusReportsWorkingAndPublishedRevisions(): void
    {
        [$preview, $editor] = $this->fixture(['pages.read', 'pages.update', 'pages.publish']);
        self::assertSame(['revision' => 1, 'publishedRevision' => 1, 'hasUnpublishedChanges' => false],
            $preview->status('page-1')['data']);

        $editor->saveDraft('page-1', RevisionSchema::envelope('page-1', 2)->toJson(), '"1"');
        self::assertSame(['revision' => 2, 'publishedRevision' => 1, 'hasUnpublishedChanges' => true],
            $preview->status('page-1')['data']);

        $editor->publishRevision('page-1', '{"revision":2}', 'k-1');
        self::assertSame(['revision' => 2, 'publishedRevision' => 2, 'hasUnpublishedChanges' => false],
            $preview->status('page-1')['data']);
    }

    public function testRenderDrawsAStoredRevisionWithTheServerRenderer(): void
    {
        [$preview] = $this->fixture(['pages.read', 'pages.update']);
        $rendered = $preview->render('page-1', 1);
        self::assertSame(['revision' => 1, 'html' => '<h1>Live</h1>', 'css' => ''], $rendered['data']);
        self::assertSame(404, $preview->render('page-1', 9)['status']);
    }

    public function testAccessRulesAreTheEditorOnes(): void
    {
        [$preview] = $this->fixture([]);
        self::assertSame(403, $preview->status('page-1')['status']);
        self::assertSame(403, $preview->render('page-1', 1)['status']);
        [$preview] = $this->fixture(['pages.read']);
        self::assertSame(404, $preview->status('missing')['status']);
    }

    /** @param list<string> $capabilities @return array{EditorPreviewController, EditorApiController} */
    private function fixture(array $capabilities): array
    {
        $db = RevisionSchema::create();
        RevisionSchema::page($db, 'site-1', 'page-1', self::LIVE);
        $context = static fn () => new HostContext('site-1', 'actor-1', 'es', $capabilities);
        $allow = $this->createMock(RevisionOperationAuthorization::class);
        $allow->method('canPerform')->willReturn(true);
        $update = $this->createMock(DocumentAuthorization::class);
        $update->method('canUpdate')->willReturn(true);
        $publish = $this->createMock(PagePublicationAuthorization::class);
        $publish->method('canPublish')->willReturn(true);
        $renderer = new class implements BladeRendererInterface {
            public function renderPage(array $tree, array $data = []): string
            {
                return implode('', array_map(fn (array $node) => $this->renderNode($node), $tree));
            }
            public function renderNode(array $node, array $context = []): string
            {
                return "<{$node['type']}>" . htmlspecialchars((string) ($node['props']['content'] ?? '')) . "</{$node['type']}>";
            }
        };
        $save = new SavePageDraft($db, 'site-1');
        $audit = new PageRevisionAuditLog($db, 'site-1');
        $pages = new CeibaDbPageRepository($db);
        $media = $this->createMock(MediaRepositoryInterface::class);
        $editor = new EditorApiController('/api/builder/v1', 'site-1', $pages, $media, $update, new DocumentMigrator(),
            new ValidatePageDocument('site-1', $pages, $media, $update), ComponentCatalogue::createDefault(), $context,
            $save, $db, new PublishPageRevision($db, 'site-1'), $publish, $audit, null, true);
        $revisions = new RevisionApiController('site-1', $context, $allow, $audit, new RestorePageRevision($db, 'site-1', $save),
            new ReconcilePageContent($db, 'site-1', $save), new UnpublishPage($db, 'site-1'), new PagePreviewTokens($db, 'site-1'),
            new PinPageRevision($db, 'site-1'), $db, null);
        return [new EditorPreviewController($editor, $revisions, new GetPageWorkingRevision($db, 'site-1'), $renderer), $editor];
    }
}
