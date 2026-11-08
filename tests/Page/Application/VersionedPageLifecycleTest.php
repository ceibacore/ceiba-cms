<?php
declare(strict_types=1);

namespace LemurCms\Tests\Page\Application;

use InvalidArgumentException;
use LemurCms\Page\Application\CreatePage;
use LemurCms\Page\Application\GetPageWorkingRevision;
use LemurCms\Page\Application\PageNotFound;
use LemurCms\Page\Application\PageRevisionAuditLog;
use LemurCms\Page\Application\PageRevisionConflict;
use LemurCms\Page\Application\PublishPage;
use LemurCms\Page\Application\PublishPageRevision;
use LemurCms\Page\Application\SavePageContent;
use LemurCms\Page\Application\SavePageDraft;
use LemurCms\Page\Application\UnpublishPage;
use LemurCms\Page\Application\UpdatePage;
use LemurCms\Page\Infrastructure\LemurDbPageRepository;
use LemurCms\Tests\Support\FakeClock;
use LemurCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

/** Every content change is a revision: create, edit, autosave, publish, unpublish. */
final class VersionedPageLifecycleTest extends TestCase
{
    private const TREE = [['_id' => 'campus01', 'type' => 'section', 'props' => ['class' => 'hero'], 'children' => [
        ['_id' => 'campus02', 'type' => 'h1', 'props' => ['content' => 'Hola'], 'children' => []],
    ]]];

    public function testCreateVersionsTheFirstRevisionAtomically(): void
    {
        $db = RevisionSchema::create();
        $p = $db->getPrefix();
        $id = (new CreatePage($db, 'site-1', clock: new FakeClock()))->execute(
            ['title' => 'Inicio', 'slug' => 'inicio', 'content' => self::TREE], 'editor-1');

        self::assertMatchesRegularExpression('/^[0-9a-f-]{36}$/', $id);
        $head = $db->pdo()->query("SELECT * FROM {$p}page_revision_heads")->fetch(\PDO::FETCH_ASSOC);
        $revision = $db->pdo()->query("SELECT * FROM {$p}page_revisions")->fetch(\PDO::FETCH_ASSOC);
        self::assertSame($revision['id'], $head['draft_revision_id']);
        self::assertNull($head['published_revision_id']);
        self::assertSame(2, (int) $head['next_revision']);
        self::assertSame(['create', 'editor-1', 1], [$revision['reason'], $revision['author_id'], (int) $revision['schema_version']]);
        $page = $db->pdo()->query("SELECT status, content, published_at, created_at FROM {$p}pages")->fetch(\PDO::FETCH_ASSOC);
        self::assertSame(['draft', null, '2026-11-07 12:00:00'], [$page['status'], $page['published_at'], $page['created_at']]);
        self::assertSame(json_decode($revision['snapshot'], true)['root'], json_decode($page['content'], true));
        self::assertSame(hash('sha256', $page['content']), $head['public_content_hash']);
        self::assertSame(0, (int) $db->pdo()->query("SELECT COUNT(*) FROM {$p}page_publication_outbox")->fetchColumn());
        self::assertSame('create', (new PageRevisionAuditLog($db, 'site-1'))->forPage($id)[0]['action']);

        $working = (new GetPageWorkingRevision($db, 'site-1'))->execute($id);
        self::assertSame(1, $working['revision']);
        self::assertSame('"1"', $working['etag']);
        self::assertTrue($working['hasUnpublishedChanges']);
        self::assertNull($working['publishedRevision']);
        self::assertSame('Hola', $working['root'][0]['children'][0]['props']['content']);
    }

    public function testCreatePublishedEmitsEventAndInvalidContentLeavesNothing(): void
    {
        $db = RevisionSchema::create();
        $p = $db->getPrefix();
        $id = (new CreatePage($db, 'site-1'))->execute(['id' => 'home', 'title' => 'Home', 'slug' => 'home', 'status' => 'published', 'content' => self::TREE]);
        self::assertSame('home', $id);
        self::assertSame(['published', 'create:home'], $db->pdo()->query("SELECT event_type, idempotency_key FROM {$p}page_publication_outbox")->fetch(\PDO::FETCH_NUM));
        self::assertFalse((new GetPageWorkingRevision($db, 'site-1'))->execute('home')['hasUnpublishedChanges']);

        foreach ([
            ['id' => '../x', 'title' => 'X', 'slug' => 'x'],
            ['title' => 'X', 'slug' => 'x', 'status' => 'live'],
            ['title' => 'X', 'slug' => 'x', 'content' => [['type' => 'p', 'id' => 'a'], ['type' => 'p', 'id' => 'a']]],
        ] as $invalid) {
            try {
                (new CreatePage($db, 'site-1'))->execute($invalid);
                self::fail('Invalid page accepted');
            } catch (InvalidArgumentException) {
            }
        }
        // Duplicate slug fails inside the transaction: no orphan revision or head.
        try {
            (new CreatePage($db, 'site-1'))->execute(['title' => 'Dup', 'slug' => 'home']);
            self::fail('Duplicate slug accepted');
        } catch (\PDOException) {
        }
        self::assertSame([1, 1, 1], array_map(static fn (string $t) => (int) $db->pdo()->query("SELECT COUNT(*) FROM {$p}{$t}")->fetchColumn(),
            ['pages', 'page_revisions', 'page_revision_heads']));
    }

    public function testEditAutosavePublishAndUnpublishFlow(): void
    {
        $db = RevisionSchema::create();
        $p = $db->getPrefix();
        $id = (new CreatePage($db, 'site-1'))->execute(['title' => 'Inicio', 'slug' => 'inicio', 'content' => self::TREE]);
        $save = new SavePageContent(new SavePageDraft($db, 'site-1'));
        $tree = self::TREE;
        $tree[0]['children'][0]['props']['content'] = 'Autoguardado';
        self::assertSame(2, $save->execute($id, $tree, 1, 'editor-1', 'autosave'));
        $tree[0]['children'][0]['props']['content'] = 'Final';
        self::assertSame(3, $save->execute($id, $tree, 2, 'editor-1'));
        try {
            $save->execute($id, $tree, 2, 'editor-2');
            self::fail('Stale save accepted');
        } catch (PageRevisionConflict $conflict) {
            self::assertSame(3, $conflict->currentRevision);
        }
        self::assertSame(['autosave', 'edit'], $db->pdo()->query("SELECT reason FROM {$p}page_revisions WHERE revision > 1 ORDER BY revision")->fetchAll(\PDO::FETCH_COLUMN));
        self::assertStringContainsString('Hola', $db->pdo()->query("SELECT content FROM {$p}pages")->fetchColumn(), 'Drafts never publish');

        $publish = new PublishPage($db, 'site-1', new PublishPageRevision($db, 'site-1'));
        self::assertNotNull($publish->execute($id, 'publisher-1'));
        self::assertNull($publish->execute($id, 'publisher-1'), 'Nothing new to publish');
        $page = $db->pdo()->query("SELECT status, content, published_at FROM {$p}pages")->fetch(\PDO::FETCH_ASSOC);
        self::assertSame('published', $page['status']);
        self::assertStringContainsString('Final', $page['content']);
        self::assertNotNull($page['published_at']);
        self::assertFalse((new GetPageWorkingRevision($db, 'site-1'))->execute($id)['hasUnpublishedChanges']);

        (new UnpublishPage($db, 'site-1'))->execute($id, 'unpub-1', 'publisher-1');
        self::assertSame('draft', $db->pdo()->query("SELECT status FROM {$p}pages")->fetchColumn());
        self::assertNotNull($publish->execute($id, 'publisher-1'), 'The withdrawn revision can be published again');
        self::assertSame('published', $db->pdo()->query("SELECT status FROM {$p}pages")->fetchColumn());
        self::assertSame(['published', 'unpublished', 'published'],
            $db->pdo()->query("SELECT event_type FROM {$p}page_publication_outbox ORDER BY sequence")->fetchAll(\PDO::FETCH_COLUMN));
    }

    public function testSaveContentRejectsInvalidInputAndPublishReportsMissingPage(): void
    {
        $db = RevisionSchema::create();
        $id = (new CreatePage($db, 'site-1'))->execute(['title' => 'Inicio', 'slug' => 'inicio']);
        $save = new SavePageContent(new SavePageDraft($db, 'site-1'));
        foreach ([[self::TREE, 'publish'], [[['type' => 'p', 'id' => 'a'], ['type' => 'p', 'id' => 'a']], 'edit']] as [$tree, $reason]) {
            try {
                $save->execute($id, $tree, 1, 'editor-1', $reason);
                self::fail('Invalid save accepted');
            } catch (InvalidArgumentException) {
            }
        }
        self::assertSame(2, $save->execute($id, '<p>HTML body</p>', 1, 'editor-1'), 'HTML bodies are versioned too');
        $deduplicating = new SavePageContent(new SavePageDraft($db, 'site-1'), working: new GetPageWorkingRevision($db, 'site-1'));
        self::assertSame(2, $deduplicating->execute($id, '<p>HTML body</p>', 2, 'editor-1'), 'Identical content adds no revision');
        self::assertSame(2, (int) $db->pdo()->query("SELECT MAX(revision) FROM {$db->getPrefix()}page_revisions")->fetchColumn());
        self::assertSame(3, $deduplicating->execute($id, '<p>Changed</p>', 2, 'editor-1'));
        try {
            $deduplicating->execute($id, '<p>Changed</p>', 2, 'editor-2');
            self::fail('A stale revision must conflict even with identical content');
        } catch (PageRevisionConflict) {
        }
        $this->expectException(PageNotFound::class);
        (new PublishPage($db, 'site-1', new PublishPageRevision($db, 'site-1')))->execute('missing');
    }

    public function testUpdateChangesMetadataOnlyAndGuardsPublicationState(): void
    {
        $db = RevisionSchema::create();
        $p = $db->getPrefix();
        $repo = new LemurDbPageRepository($db);
        $update = new UpdatePage($repo);
        $draft = (new CreatePage($db, 'site-1'))->execute(['title' => 'Borrador', 'slug' => 'borrador']);
        $live = (new CreatePage($db, 'site-1'))->execute(['title' => 'Vivo', 'slug' => 'vivo', 'status' => 'published']);

        $update->execute($draft, ['title' => 'Renombrado', 'custom_css_with_session' => '.a{}', 'status' => 'draft']);
        self::assertSame('Renombrado', $db->pdo()->query("SELECT title FROM {$p}pages WHERE id = '{$draft}'")->fetchColumn());
        $update->execute($draft, ['status' => 'archived']);
        self::assertSame('archived', $db->pdo()->query("SELECT status FROM {$p}pages WHERE id = '{$draft}'")->fetchColumn());
        $update->execute($live, ['title' => 'Vivo 2', 'status' => 'published']);

        foreach ([
            [$draft, ['content' => []]],
            [$draft, ['status' => 'published']],
            [$live, ['status' => 'draft']],
            [$draft, ['published_at' => '2026-01-01 00:00:00']],
            [$draft, ['id' => 'other']],
        ] as [$pageId, $data]) {
            try {
                $update->execute($pageId, $data);
                self::fail('Forbidden update accepted: ' . json_encode($data));
            } catch (InvalidArgumentException) {
            }
        }
        self::assertSame('published', $db->pdo()->query("SELECT status FROM {$p}pages WHERE id = '{$live}'")->fetchColumn());
        $this->expectException(PageNotFound::class);
        $update->execute('missing', ['title' => 'X']);
    }
}
