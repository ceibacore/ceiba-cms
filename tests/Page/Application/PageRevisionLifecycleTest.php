<?php
declare(strict_types=1);

namespace LemurCms\Tests\Page\Application;

use LemurCms\Page\Application\PagePublicationKeyConflict;
use LemurCms\Page\Application\PageRevisionAuditLog;
use LemurCms\Page\Application\PublicContentDrift;
use LemurCms\Page\Application\PublishPageRevision;
use LemurCms\Page\Application\ReconcilePageContent;
use LemurCms\Page\Application\RestorePageRevision;
use LemurCms\Page\Application\SavePageDraft;
use LemurCms\Page\Application\UnpublishPage;
use LemurCms\Tests\Support\FakeClock;
use LemurCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

final class PageRevisionLifecycleTest extends TestCase
{
    private const LIVE = '[{"id":"hero","type":"h1","props":{"content":"Live"},"children":[]}]';

    public function testOutOfBandWriteBlocksPublicationUntilReconciledAndNothingIsLost(): void
    {
        $db = RevisionSchema::create();
        $p = $db->getPrefix();
        RevisionSchema::page($db, 'site-1', 'page-1', self::LIVE);
        $save = new SavePageDraft($db, 'site-1');
        $publish = new PublishPageRevision($db, 'site-1');
        self::assertSame(2, $save->execute(RevisionSchema::envelope('page-1', 2, 'Editor draft'), 1, 'editor-1'));

        // Someone edits public content directly in the database.
        $external = '[{"id":"hero","type":"h1","props":{"content":"External edit"},"children":[]}]';
        $db->pdo()->prepare("UPDATE {$p}pages SET content = ? WHERE id = 'page-1'")->execute([$external]);

        try {
            $publish->execute('page-1', 2, 'publish-1', 'publisher-1');
            self::fail('Publishing over out-of-band content must be refused');
        } catch (PublicContentDrift) {
        }
        self::assertSame($external, $db->pdo()->query("SELECT content FROM {$p}pages WHERE id='page-1'")->fetchColumn());
        self::assertSame(1, (int) $db->pdo()->query("SELECT COUNT(*) FROM {$p}page_publication_outbox")->fetchColumn(), 'Only the creation event');

        $reconcile = new ReconcilePageContent($db, 'site-1', $save);
        self::assertSame(['reconciled' => true, 'revision' => 3], $reconcile->execute('page-1', 2, 'editor-1'));
        self::assertSame(['reconciled' => false, 'revision' => 3], $reconcile->execute('page-1', 3, 'editor-1'));
        $recovered = json_decode($db->pdo()->query("SELECT snapshot FROM {$p}page_revisions WHERE revision=3")->fetchColumn(), true);
        self::assertSame('External edit', $recovered['root'][0]['props']['content']);
        self::assertSame('reconcile', $db->pdo()->query("SELECT reason FROM {$p}page_revisions WHERE revision=3")->fetchColumn());
        self::assertStringContainsString('Editor draft', $db->pdo()->query("SELECT snapshot FROM {$p}page_revisions WHERE revision=2")->fetchColumn());

        self::assertSame(4, $save->execute(RevisionSchema::envelope('page-1', 4, 'Merged'), 3, 'editor-1'));
        $publish->execute('page-1', 4, 'publish-2', 'publisher-1');
        self::assertStringContainsString('Merged', $db->pdo()->query("SELECT content FROM {$p}pages WHERE id='page-1'")->fetchColumn());
    }

    public function testHeadWithoutBaselineFailsClosed(): void
    {
        $db = RevisionSchema::create();
        $p = $db->getPrefix();
        RevisionSchema::page($db, 'site-1', 'page-1', self::LIVE, 'draft');
        $db->pdo()->exec("UPDATE {$p}page_revision_heads SET public_content_hash = NULL");
        $this->expectException(PublicContentDrift::class);
        (new PublishPageRevision($db, 'site-1'))->execute('page-1', 1, 'k-1');
    }

    public function testUnpublishIsIdempotentKeepsHistoryAndAllowsRepublication(): void
    {
        $db = RevisionSchema::create();
        $p = $db->getPrefix();
        $content = RevisionSchema::page($db, 'site-1', 'page-1', self::LIVE);
        $initialId = $db->pdo()->query("SELECT published_revision_id FROM {$p}page_revision_heads")->fetchColumn();
        $unpublish = new UnpublishPage($db, 'site-1');

        self::assertSame($initialId, $unpublish->execute('page-1', 'unpublish-1', 'publisher-1'));
        self::assertSame($initialId, $unpublish->execute('page-1', 'unpublish-1', 'publisher-1'));
        self::assertNull($unpublish->execute('page-1', 'unpublish-2', 'publisher-1'));
        $head = $db->pdo()->query("SELECT * FROM {$p}page_revision_heads")->fetch(\PDO::FETCH_ASSOC);
        self::assertNull($head['published_revision_id']);
        self::assertSame($initialId, $head['draft_revision_id']);
        $page = $db->pdo()->query("SELECT status, published_at, content FROM {$p}pages")->fetch(\PDO::FETCH_ASSOC);
        self::assertSame(['status' => 'draft', 'published_at' => null, 'content' => $content], $page);
        self::assertSame(['published', 'unpublished'],
            $db->pdo()->query("SELECT event_type FROM {$p}page_publication_outbox ORDER BY sequence")->fetchAll(\PDO::FETCH_COLUMN));

        try {
            (new PublishPageRevision($db, 'site-1'))->execute('page-1', 1, 'unpublish-1');
            self::fail('A key used to unpublish cannot publish');
        } catch (PagePublicationKeyConflict) {
        }
        self::assertSame(2, (new SavePageDraft($db, 'site-1'))->execute(RevisionSchema::envelope('page-1', 2), 1, 'editor-1'));
        (new PublishPageRevision($db, 'site-1'))->execute('page-1', 2, 'publish-1', 'publisher-1');
        self::assertSame('published', $db->pdo()->query("SELECT status FROM {$p}pages")->fetchColumn());
    }

    public function testEveryMutationIsAuditedWithActorAndRolledBackWithIt(): void
    {
        $clock = new FakeClock();
        $db = RevisionSchema::create();
        $p = $db->getPrefix();
        RevisionSchema::page($db, 'site-1', 'page-1', self::LIVE);
        $save = new SavePageDraft($db, 'site-1', $clock);
        $save->execute(RevisionSchema::envelope('page-1', 2), 1, 'editor-1');
        $save->execute(RevisionSchema::envelope('page-1', 3), 2, 'editor-1', 'autosave');
        (new RestorePageRevision($db, 'site-1', $save))->execute('page-1', 1, 3, 'editor-2');
        (new PublishPageRevision($db, 'site-1', $clock))->execute('page-1', 4, 'publish-1', 'publisher-1');
        (new UnpublishPage($db, 'site-1', $clock))->execute('page-1', 'unpublish-1', 'publisher-2');

        $entries = array_reverse((new PageRevisionAuditLog($db, 'site-1'))->forPage('page-1'));
        self::assertSame(['create', 'save', 'autosave', 'restore', 'publish', 'unpublish'], array_column($entries, 'action'));
        self::assertSame(['fixture', 'editor-1', 'editor-1', 'editor-2', 'publisher-1', 'publisher-2'], array_column($entries, 'actorId'));
        self::assertSame(1, $entries[3]['details']->sourceRevision);
        self::assertSame(4, $entries[4]['details']->revision);
        self::assertStringNotContainsString('Live', json_encode($entries, JSON_THROW_ON_ERROR), 'Audit must not carry content');
        self::assertSame([], (new PageRevisionAuditLog($db, 'site-2'))->forPage('page-1'), 'Audit is scoped by site');

        $db->pdo()->exec("CREATE TRIGGER {$p}fail_audit BEFORE INSERT ON {$p}page_revision_audit BEGIN SELECT RAISE(ABORT, 'audit down'); END");
        try {
            $save->execute(RevisionSchema::envelope('page-1', 5), 4, 'editor-1');
            self::fail('Expected the audit failure to abort the save');
        } catch (\PDOException) {
        }
        self::assertSame(0, (int) $db->pdo()->query("SELECT COUNT(*) FROM {$p}page_revisions WHERE revision=5")->fetchColumn());
        self::assertSame(5, (int) $db->pdo()->query("SELECT next_revision FROM {$p}page_revision_heads")->fetchColumn());
    }

    public function testRejectsUnknownSaveReasonAndUnsupportedSchema(): void
    {
        $db = RevisionSchema::create();
        $p = $db->getPrefix();
        RevisionSchema::page($db, 'site-1', 'page-1', self::LIVE);
        try {
            (new SavePageDraft($db, 'site-1'))->execute(RevisionSchema::envelope('page-1', 2), 1, 'editor-1', 'publish');
            self::fail('Unknown reason accepted');
        } catch (\InvalidArgumentException) {
        }
        $db->pdo()->exec("UPDATE {$p}page_revisions SET schema_version = 0");
        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('Unsupported revision schema version');
        (new RestorePageRevision($db, 'site-1', new SavePageDraft($db, 'site-1')))->execute('page-1', 1, 1, 'editor-1');
    }

    public function testArchivedPageIsEditable(): void
    {
        $db = RevisionSchema::create();
        RevisionSchema::page($db, 'site-1', 'page-1', self::LIVE, 'archived');
        self::assertSame(2, (new SavePageDraft($db, 'site-1'))->execute(RevisionSchema::envelope('page-1', 2), 1, 'editor-1'));
    }
}
