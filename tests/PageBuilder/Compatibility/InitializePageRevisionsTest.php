<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Compatibility;

use LemurDB;
use LemurCms\Page\Application\InitializePageRevisions;
use PHPUnit\Framework\TestCase;

final class InitializePageRevisionsTest extends TestCase
{
    public function testBackfillPreservesPageAndCanResumeWithoutDuplicates(): void
    {
        $prefix = 'rev_' . bin2hex(random_bytes(4)) . '_';
        $db = LemurDB::getInstance([
            'driver' => 'sqlite', 'db' => ':memory:', 'prefix' => $prefix,
        ]);
        $pdo = $db->pdo();
        $pdo->exec("CREATE TABLE {$prefix}pages (id TEXT PRIMARY KEY, content TEXT, status TEXT, updated_at TEXT)");
        $pdo->exec("CREATE TABLE {$prefix}page_revision_heads (page_id TEXT PRIMARY KEY, draft_revision_id TEXT, published_revision_id TEXT, next_revision INTEGER, updated_at TEXT)");
        $pdo->exec("CREATE TABLE {$prefix}page_revisions (id TEXT PRIMARY KEY, page_id TEXT, site_id TEXT, revision INTEGER, schema_version INTEGER, snapshot TEXT, content_hash TEXT, author_id TEXT, reason TEXT, created_at TEXT, UNIQUE(page_id, revision))");
        $tree = '[{"_id":"campus01","type":"section","props":{"class":"home"},"children":[]}]';
        $insert = $pdo->prepare("INSERT INTO {$prefix}pages VALUES (?, ?, ?, ?)");
        $insert->execute(['page-draft', $tree, 'draft', '2026-11-07 12:00:00']);
        $insert->execute(['page-published', '[{"id":"hero","type":"div"}]', 'published', '2026-11-07 12:00:00']);

        $initializer = new InitializePageRevisions($db, 'tenant-one');
        self::assertSame(['processed' => 2, 'created' => 2, 'skipped' => 0, 'failed' => []], $initializer->execute(1));
        self::assertSame(['processed' => 2, 'created' => 0, 'skipped' => 2, 'failed' => []], $initializer->execute(1));
        self::assertSame($tree, $pdo->query("SELECT content FROM {$prefix}pages WHERE id='page-draft'")->fetchColumn());
        self::assertSame(2, (int) $pdo->query("SELECT COUNT(*) FROM {$prefix}page_revisions")->fetchColumn());
        self::assertSame('tenant-one', $pdo->query("SELECT site_id FROM {$prefix}page_revisions WHERE page_id='page-draft'")->fetchColumn());
        self::assertNotFalse($pdo->query("SELECT draft_revision_id FROM {$prefix}page_revision_heads WHERE page_id='page-draft'")->fetchColumn());
        self::assertNotFalse($pdo->query("SELECT published_revision_id FROM {$prefix}page_revision_heads WHERE page_id='page-published'")->fetchColumn());
    }
}
