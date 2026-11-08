<?php
declare(strict_types=1);

namespace LemurCms\Tests\Page\Application;

use LemurDB;
use LemurCms\Page\Application\RestorePageRevision;
use LemurCms\Page\Application\SavePageDraft;
use PHPUnit\Framework\TestCase;

final class RestorePageRevisionTest extends TestCase
{
    public function testRestoreCreatesNewDraftAndKeepsSourceAndPublication(): void
    {
        $prefix = 'restore_' . bin2hex(random_bytes(4)) . '_';
        $db = LemurDB::getInstance(['driver' => 'sqlite', 'db' => ':memory:', 'prefix' => $prefix]);
        $pdo = $db->pdo();
        $pdo->exec("CREATE TABLE {$prefix}pages (id TEXT PRIMARY KEY, content TEXT, status TEXT)");
        $pdo->exec("CREATE TABLE {$prefix}page_revisions (id TEXT PRIMARY KEY, page_id TEXT, site_id TEXT, revision INTEGER, schema_version INTEGER, snapshot TEXT, content_hash TEXT, author_id TEXT, reason TEXT, created_at TEXT, UNIQUE(page_id,revision))");
        $pdo->exec("CREATE TABLE {$prefix}page_revision_heads (page_id TEXT PRIMARY KEY, draft_revision_id TEXT, published_revision_id TEXT, next_revision INTEGER, updated_at TEXT)");
        $pdo->exec("CREATE TABLE {$prefix}media (id TEXT PRIMARY KEY)");
        $pdo->exec("INSERT INTO {$prefix}pages VALUES ('page-1','public-content','published')");
        $source = json_encode(['schemaVersion' => 1, 'documentId' => 'page-1', 'revision' => 1,
            'root' => [['id' => 'old', 'type' => 'h1', 'props' => ['content' => 'Old']]],
            'settings' => (object) [], 'resources' => []], JSON_THROW_ON_ERROR);
        $insert = $pdo->prepare("INSERT INTO {$prefix}page_revisions VALUES (?,?,?,?,?,?,?,?,?,?)");
        $insert->execute(['source', 'page-1', 'site-1', 1, 1, $source, hash('sha256', $source), 'actor', 'initial', '2026-11-07 10:00:00']);
        $insert->execute(['current', 'page-1', 'site-1', 2, 1, str_replace('Old', 'Current', $source), 'hash', 'actor', 'edit', '2026-11-07 11:00:00']);
        $pdo->exec("INSERT INTO {$prefix}page_revision_heads VALUES ('page-1','current','source',3,'2026-11-07 11:00:00')");
        \LemurCms\Tests\Support\RevisionSchema::upgradeMinimalFixture($db);

        $revision = (new RestorePageRevision($db, 'site-1', new SavePageDraft($db, 'site-1')))
            ->execute('page-1', 1, 2, 'actor');

        self::assertSame(3, $revision);
        self::assertSame('public-content', $pdo->query("SELECT content FROM {$prefix}pages")->fetchColumn());
        self::assertSame('source', $pdo->query("SELECT published_revision_id FROM {$prefix}page_revision_heads")->fetchColumn());
        self::assertSame($source, $pdo->query("SELECT snapshot FROM {$prefix}page_revisions WHERE id='source'")->fetchColumn());
        $restored = $pdo->query("SELECT snapshot, reason FROM {$prefix}page_revisions WHERE revision=3")->fetch();
        self::assertSame('restore', $restored['reason']);
        self::assertSame('Old', json_decode($restored['snapshot'], true)['root'][0]['props']['content']);
    }
}
