<?php
declare(strict_types=1);

namespace LemurCms\Tests\Page\Application;

use LemurDB;
use LemurCms\Page\Application\PageRevisionConflict;
use LemurCms\Page\Application\SavePageDraft;
use LemurCms\PageBuilder\Domain\Document\DocumentEnvelope;
use PHPUnit\Framework\TestCase;

final class SavePageDraftTest extends TestCase
{
    public function testSavesNewDraftAndLeavesPublishedPageUntouched(): void
    {
        [$db, $prefix] = $this->database();
        $tree = [['id' => 'headline', 'type' => 'h1', 'props' => ['content' => 'Draft'], 'children' => []]];
        $document = DocumentEnvelope::fromJson(json_encode([
            'schemaVersion' => 1, 'documentId' => 'page-1', 'revision' => 3,
            'root' => $tree, 'settings' => (object) [], 'resources' => [],
        ], JSON_THROW_ON_ERROR), 'page-1');

        $revision = (new SavePageDraft($db, 'site-1'))->execute($document, 2, 'actor-1');
        self::assertSame(3, $revision);
        self::assertSame('live-content', $db->pdo()->query("SELECT content FROM {$prefix}pages WHERE id='page-1'")->fetchColumn());
        self::assertSame(3, (int) $db->pdo()->query("SELECT revision FROM {$prefix}page_revisions WHERE revision=3")->fetchColumn());
        self::assertSame('live-revision', $db->pdo()->query("SELECT published_revision_id FROM {$prefix}page_revision_heads WHERE page_id='page-1'")->fetchColumn());
        $newId = $db->pdo()->query("SELECT id FROM {$prefix}page_revisions WHERE revision=3")->fetchColumn();
        self::assertMatchesRegularExpression('/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/D', $newId);
        self::assertSame($newId, $db->pdo()->query("SELECT draft_revision_id FROM {$prefix}page_revision_heads WHERE page_id='page-1'")->fetchColumn());
    }

    public function testConflictDoesNotWriteOrMoveTheHead(): void
    {
        [$db, $prefix] = $this->database();
        $document = self::document(2);
        try {
            (new SavePageDraft($db, 'site-1'))->execute($document, 1, 'actor-1');
            self::fail('Expected a revision conflict');
        } catch (PageRevisionConflict $conflict) {
            self::assertSame(2, $conflict->currentRevision);
        }
        self::assertSame(2, (int) $db->pdo()->query("SELECT COUNT(*) FROM {$prefix}page_revisions")->fetchColumn());
        self::assertSame('draft-2', $db->pdo()->query("SELECT draft_revision_id FROM {$prefix}page_revision_heads WHERE page_id='page-1'")->fetchColumn());
    }

    public function testFirstDraftBranchesFromThePublishedRevision(): void
    {
        [$db, $prefix] = $this->database(withDraft: false);
        $revision = (new SavePageDraft($db, 'site-1'))->execute(self::document(2), 1, 'actor-1');
        self::assertSame(2, $revision);

        $pdo = $db->pdo();
        $head = $pdo->query("SELECT * FROM {$prefix}page_revision_heads WHERE page_id='page-1'")->fetch(\PDO::FETCH_ASSOC);
        self::assertSame('live-revision', $head['published_revision_id']);
        self::assertSame($pdo->query("SELECT id FROM {$prefix}page_revisions WHERE revision=2")->fetchColumn(), $head['draft_revision_id']);
        self::assertSame(3, (int) $head['next_revision']);
        self::assertSame('live-content', $pdo->query("SELECT content FROM {$prefix}pages WHERE status='published'")->fetchColumn());
    }

    public function testFailureDuringHeadUpdateRollsBackSnapshotAndPointers(): void
    {
        [$db, $prefix] = $this->database();
        $pdo = $db->pdo();
        $pdo->exec("CREATE TRIGGER {$prefix}fail_head AFTER UPDATE ON {$prefix}page_revision_heads
            BEGIN SELECT RAISE(ABORT, 'simulated head failure'); END");
        try {
            (new SavePageDraft($db, 'site-1'))->execute(self::document(3), 2, 'actor-1');
            self::fail('Expected head update to fail');
        } catch (\PDOException $failure) {
            self::assertStringContainsString('simulated head failure', $failure->getMessage());
        }

        self::assertSame(2, (int) $pdo->query("SELECT COUNT(*) FROM {$prefix}page_revisions")->fetchColumn());
        $head = $pdo->query("SELECT * FROM {$prefix}page_revision_heads WHERE page_id='page-1'")->fetch(\PDO::FETCH_ASSOC);
        self::assertSame('draft-2', $head['draft_revision_id']);
        self::assertSame('live-revision', $head['published_revision_id']);
        self::assertSame(3, (int) $head['next_revision']);
    }

    private function database(bool $withDraft = true): array
    {
        $prefix = 'save_' . bin2hex(random_bytes(4)) . '_';
        $db = LemurDB::getInstance(['driver' => 'sqlite', 'db' => ':memory:', 'prefix' => $prefix]);
        $pdo = $db->pdo();
        $pdo->exec("CREATE TABLE {$prefix}pages (id TEXT PRIMARY KEY, content TEXT, status TEXT)");
        $pdo->exec("CREATE TABLE {$prefix}page_revisions (id TEXT PRIMARY KEY, page_id TEXT, site_id TEXT, revision INTEGER, schema_version INTEGER, snapshot TEXT, content_hash TEXT, author_id TEXT, reason TEXT, created_at TEXT, UNIQUE(page_id,revision))");
        $pdo->exec("CREATE TABLE {$prefix}page_revision_heads (page_id TEXT PRIMARY KEY, draft_revision_id TEXT, published_revision_id TEXT, next_revision INTEGER, updated_at TEXT)");
        $pdo->exec("INSERT INTO {$prefix}pages VALUES ('page-1','live-content','published')");
        if ($withDraft) {
            $pdo->exec("INSERT INTO {$prefix}page_revisions VALUES ('draft-2','page-1','site-1',2,0,'{}','hash',NULL,'initial','2026-11-07 10:00:00')");
        }
        $pdo->exec("INSERT INTO {$prefix}page_revisions VALUES ('live-revision','page-1','site-1',1,0,'{}','hash',NULL,'initial','2026-11-07 10:00:00')");
        $pdo->prepare("INSERT INTO {$prefix}page_revision_heads VALUES ('page-1',?,'live-revision',?,'2026-11-07 10:00:00')")
            ->execute([$withDraft ? 'draft-2' : null, $withDraft ? 3 : 2]);
        return [$db, $prefix];
    }

    private static function document(int $revision): DocumentEnvelope
    {
        return DocumentEnvelope::fromJson(json_encode([
            'schemaVersion' => 1, 'documentId' => 'page-1', 'revision' => $revision,
            'root' => [['id' => 'headline', 'type' => 'h1', 'children' => []]],
            'settings' => (object) [], 'resources' => [],
        ], JSON_THROW_ON_ERROR), 'page-1');
    }
}
