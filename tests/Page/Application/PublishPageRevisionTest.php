<?php
declare(strict_types=1);

namespace LemurCms\Tests\Page\Application;

use LemurDB;
use LemurCms\Page\Application\PageRevisionConflict;
use LemurCms\Page\Application\PublishPageRevision;
use PHPUnit\Framework\TestCase;

final class PublishPageRevisionTest extends TestCase
{
    public function testPublishesExactDraftOnceAndRollsBackOnOutboxFailure(): void
    {
        $prefix = 'publish_' . bin2hex(random_bytes(4)) . '_';
        $db = LemurDB::getInstance(['driver' => 'sqlite', 'db' => ':memory:', 'prefix' => $prefix]);
        $pdo = $db->pdo();
        $pdo->exec("CREATE TABLE {$prefix}pages (id TEXT PRIMARY KEY, content TEXT, status TEXT, published_at TEXT)");
        $pdo->exec("CREATE TABLE {$prefix}page_revision_heads (page_id TEXT PRIMARY KEY, draft_revision_id TEXT, published_revision_id TEXT, next_revision INTEGER, updated_at TEXT)");
        $pdo->exec("CREATE TABLE {$prefix}page_revisions (id TEXT PRIMARY KEY, page_id TEXT, site_id TEXT, revision INTEGER, snapshot TEXT)");
        $pdo->exec("CREATE TABLE {$prefix}page_publication_outbox (id TEXT PRIMARY KEY, page_id TEXT, site_id TEXT, revision_id TEXT, idempotency_key TEXT, created_at TEXT, delivered_at TEXT, UNIQUE(site_id,idempotency_key))");
        $pdo->exec("INSERT INTO {$prefix}pages VALUES ('p','[]','draft',NULL)");
        $pdo->exec("INSERT INTO {$prefix}page_revision_heads VALUES ('p','r2','r1',3,'2026-11-07 10:00:00')");
        $snapshot = json_encode((object) ['root' => [(object) ['id' => 'title', 'type' => 'h1']]], JSON_THROW_ON_ERROR);
        $pdo->prepare("INSERT INTO {$prefix}page_revisions VALUES ('r1','p','site',1,?)")->execute([$snapshot]);
        $pdo->prepare("INSERT INTO {$prefix}page_revisions VALUES ('r2','p','site',2,?)")->execute([$snapshot]);
        $pdo->prepare("INSERT INTO {$prefix}page_revisions VALUES ('r3','p','site',3,?)")->execute([$snapshot]);
        $publish = new PublishPageRevision($db, 'site');

        try {
            $publish->execute('p', 3, 'stale-attempt');
            self::fail('Expected revision conflict');
        } catch (PageRevisionConflict $conflict) {
            self::assertSame(2, $conflict->currentRevision);
        }
        self::assertSame(0, (int) $pdo->query("SELECT COUNT(*) FROM {$prefix}page_publication_outbox")->fetchColumn());

        $pdo->exec("CREATE TRIGGER fail_outbox BEFORE INSERT ON {$prefix}page_publication_outbox BEGIN SELECT RAISE(ABORT, 'outbox unavailable'); END");
        try {
            $publish->execute('p', 2, 'attempt-1');
            self::fail('Expected outbox failure');
        } catch (\PDOException) {
            self::assertSame('[]', $pdo->query("SELECT content FROM {$prefix}pages")->fetchColumn());
            self::assertSame('r1', $pdo->query("SELECT published_revision_id FROM {$prefix}page_revision_heads")->fetchColumn());
        }
        $pdo->exec('DROP TRIGGER fail_outbox');
        self::assertSame('r2', $publish->execute('p', 2, 'attempt-1'));
        self::assertSame('r2', $publish->execute('p', 2, 'attempt-1'));
        self::assertSame(1, (int) $pdo->query("SELECT COUNT(*) FROM {$prefix}page_publication_outbox")->fetchColumn());
        self::assertSame('published', $pdo->query("SELECT status FROM {$prefix}pages")->fetchColumn());
        self::assertSame('title', json_decode($pdo->query("SELECT content FROM {$prefix}pages")->fetchColumn(), true)[0]['id']);

        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('Idempotency key belongs to another publication');
        $publish->execute('p', 3, 'attempt-1');
    }
}
