<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Compatibility;

use LemurDB;
use LemurCms\Migration\CmsMigrationGenerator;
use LemurCms\Migration\CmsMigrationRunner;
use LemurCms\Migration\CmsSchemaBuilder;
use LemurCms\Migrations\Migration_20261107000000_CreatePageRevisionTables;
use LemurCms\Page\Application\CreatePage;
use LemurCms\Page\Application\DispatchPagePublicationOutbox;
use LemurCms\Page\Application\PagePreviewTokens;
use LemurCms\Page\Application\PageRevisionAuditLog;
use LemurCms\Page\Application\PageRevisionConflict;
use LemurCms\Page\Application\PageRevisionOperationalMetrics;
use LemurCms\Page\Application\PageRevisionRetentionPolicy;
use LemurCms\Page\Application\PublicContentDrift;
use LemurCms\Page\Application\PublishPageRevision;
use LemurCms\Page\Application\PurgePageRevisions;
use LemurCms\Page\Application\SavePageDraft;
use LemurCms\Page\Application\UnpublishPage;
use LemurCms\Page\Application\ReconcilePageContent;
use LemurCms\Page\Infrastructure\LemurDbPageRepository;
use LemurCms\PageBuilder\Domain\Contract\PublicationEvent;
use LemurCms\PageBuilder\Domain\Contract\PublicationEventHandler;
use LemurCms\PageBuilder\Domain\Contract\RevisionArchive;
use LemurCms\Tests\Support\FakeClock;
use LemurCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

/**
 * Contract test against a real MariaDB/MySQL server using the real migrations.
 * Opt-in: set CMS_CONTRACT_DB_HOST, CMS_CONTRACT_DB_PORT, CMS_CONTRACT_DB_NAME,
 * CMS_CONTRACT_DB_USER and CMS_CONTRACT_DB_PASS. Each run uses a fresh table prefix.
 */
final class MariaDbRevisionContractTest extends TestCase
{
    private static ?LemurDB $db = null;
    private static string $prefix = '';

    public static function setUpBeforeClass(): void
    {
        if (!getenv('CMS_CONTRACT_DB_HOST')) {
            return;
        }
        self::$prefix = 'ct_' . bin2hex(random_bytes(3)) . '_';
        self::$db = LemurDB::getInstance(self::config(self::$prefix));
        (new CmsMigrationRunner(new CmsMigrationGenerator(dirname(__DIR__, 3) . '/migrations', self::$prefix), self::$db, self::$prefix))->up();
    }

    public static function tearDownAfterClass(): void
    {
        if (self::$db === null) {
            return;
        }
        $pdo = self::$db->pdo();
        $tables = $pdo->query("SHOW TABLES LIKE '" . self::$prefix . "%'")->fetchAll(\PDO::FETCH_COLUMN);
        $pdo->exec('SET FOREIGN_KEY_CHECKS=0');
        foreach ($tables as $table) {
            $pdo->exec("DROP TABLE `{$table}`");
        }
        $pdo->exec('SET FOREIGN_KEY_CHECKS=1');
    }

    protected function setUp(): void
    {
        if (self::$db === null) {
            self::markTestSkipped('Set CMS_CONTRACT_DB_* to run the MariaDB contract test');
        }
    }

    public function testMigrationsCreateTheOperationalSchema(): void
    {
        $columns = static fn (string $table) => self::$db->pdo()->query(
            "SELECT COLUMN_NAME, EXTRA, IS_NULLABLE FROM information_schema.COLUMNS
             WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = '" . self::$prefix . $table . "'"
        )->fetchAll(\PDO::FETCH_UNIQUE);
        $outbox = $columns('page_publication_outbox');
        self::assertStringContainsString('auto_increment', $outbox['sequence']['EXTRA']);
        self::assertSame('NO', $outbox['attempts']['IS_NULLABLE']);
        self::assertArrayHasKey('public_content_hash', $columns('page_revision_heads'));
        self::assertSame('NO', $columns('page_revisions')['pinned']['IS_NULLABLE']);
        self::assertStringContainsString('auto_increment', $columns('page_revision_audit')['id']['EXTRA']);
        self::assertArrayHasKey('token_hash', $columns('page_preview_tokens'));
    }

    public function testFullLifecycleOnMariaDb(): void
    {
        $db = self::$db;
        $p = self::$prefix;
        $this->page('mdb-1', '[{"id":"hero","type":"h1","props":{"content":"Live"},"children":[]}]');
        $save = new SavePageDraft($db, 'site-1');
        $publish = new PublishPageRevision($db, 'site-1');

        self::assertSame(2, $save->execute(RevisionSchema::envelope('mdb-1', 2, 'Draft'), 1, 'editor-1'));
        try {
            $save->execute(RevisionSchema::envelope('mdb-1', 2, 'Stale'), 1, 'editor-2');
            self::fail('Expected conflict');
        } catch (PageRevisionConflict $conflict) {
            self::assertSame(2, $conflict->currentRevision);
        }
        // Out-of-band write straight to the public content.
        $db->pdo()->exec("UPDATE {$p}pages SET content = '[{\"id\":\"hero\",\"type\":\"h1\",\"props\":{\"content\":\"External\"},\"children\":[]}]' WHERE id = 'mdb-1'");
        try {
            $publish->execute('mdb-1', 2, 'mdb-pub-1', 'publisher-1');
            self::fail('Expected drift');
        } catch (PublicContentDrift) {
        }
        self::assertSame(['reconciled' => true, 'revision' => 3], (new ReconcilePageContent($db, 'site-1', $save))->execute('mdb-1', 2, 'editor-1'));
        $publish->execute('mdb-1', 3, 'mdb-pub-2', 'publisher-1');

        // Regression: MySQL rowCount() reports changed rows; an identical republication must not fail.
        $identical = json_decode($db->pdo()->query("SELECT snapshot FROM {$p}page_revisions WHERE page_id='mdb-1' AND revision=3")->fetchColumn());
        $identical->revision = 4;
        $save->execute(\LemurCms\PageBuilder\Domain\Document\DocumentEnvelope::fromJson(json_encode($identical)), 3, 'editor-1');
        $publish->execute('mdb-1', 4, 'mdb-pub-3', 'publisher-1');
        self::assertSame(4, (int) $db->pdo()->query("SELECT r.revision FROM {$p}page_revision_heads h JOIN {$p}page_revisions r ON r.id = h.published_revision_id WHERE h.page_id='mdb-1'")->fetchColumn());

        self::assertNotNull((new UnpublishPage($db, 'site-1'))->execute('mdb-1', 'mdb-unpub-1', 'publisher-1'));
        self::assertSame('draft', $db->pdo()->query("SELECT status FROM {$p}pages WHERE id='mdb-1'")->fetchColumn());

        $previews = new PagePreviewTokens($db, 'site-1');
        $token = $previews->issue('mdb-1', 2, 'editor-1');
        self::assertSame(2, $previews->resolve($token['token'])['revision']);
        self::assertNull((new PagePreviewTokens($db, 'site-2'))->resolve($token['token']));

        $actions = array_column(array_reverse((new PageRevisionAuditLog($db, 'site-1'))->forPage('mdb-1')), 'action');
        self::assertSame(['create', 'save', 'reconcile', 'publish', 'save', 'publish', 'unpublish', 'preview_issue'], $actions);
    }

    public function testHeadRowLockSerializesWritersAcrossConnections(): void
    {
        $this->page('mdb-lock', '[]');
        $other = new \PDO(sprintf('mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4', getenv('CMS_CONTRACT_DB_HOST'),
            (int) getenv('CMS_CONTRACT_DB_PORT'), getenv('CMS_CONTRACT_DB_NAME')),
            getenv('CMS_CONTRACT_DB_USER'), getenv('CMS_CONTRACT_DB_PASS'), [\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION]);
        $other->beginTransaction();
        $other->query("SELECT * FROM " . self::$prefix . "page_revision_heads WHERE page_id = 'mdb-lock' FOR UPDATE")->fetchAll();

        self::$db->pdo()->exec('SET SESSION innodb_lock_wait_timeout = 1');
        try {
            (new SavePageDraft(self::$db, 'site-1'))->execute(RevisionSchema::envelope('mdb-lock', 2), 1, 'editor-1');
            self::fail('Writer must wait for the head lock');
        } catch (\PDOException $wait) {
            self::assertStringContainsString('Lock wait timeout', $wait->getMessage());
        } finally {
            $other->rollBack();
            self::$db->pdo()->exec('SET SESSION innodb_lock_wait_timeout = 50');
        }
        self::assertSame(1, (int) self::$db->pdo()->query("SELECT COUNT(*) FROM " . self::$prefix . "page_revisions WHERE page_id='mdb-lock'")->fetchColumn());
        self::assertSame(2, (new SavePageDraft(self::$db, 'site-1'))->execute(RevisionSchema::envelope('mdb-lock', 2), 1, 'editor-1'));
    }

    public function testRetentionAndFifoDispatchOnMariaDb(): void
    {
        $db = self::$db;
        $p = self::$prefix;
        $clock = new FakeClock('2026-01-01 00:00:00');
        $this->page('mdb-ret', '[]', 'draft');
        $save = new SavePageDraft($db, 'site-1', $clock);
        for ($revision = 2; $revision <= 9; $revision++) {
            $save->execute(RevisionSchema::envelope('mdb-ret', $revision), $revision - 1, 'editor-1');
        }
        (new PublishPageRevision($db, 'site-1', $clock))->execute('mdb-ret', 9, 'mdb-ret-pub');
        (new UnpublishPage($db, 'site-1', $clock))->execute('mdb-ret', 'mdb-ret-unpub', 'publisher-1');
        $clock->advance('+1 year');
        $archived = [];
        $archive = new class ($archived) implements RevisionArchive {
            public function __construct(public array &$rows) {}
            public function archive(string $siteId, array $revisions): string
            {
                $this->rows = $revisions;
                return 'memory';
            }
        };
        $result = (new PurgePageRevisions($db, 'site-1', $archive, $clock))->execute(new PageRevisionRetentionPolicy(5, 30), false);
        // 9 revisions, latest five (5-9) kept, 9 also head/outbox => 1-4 purged.
        self::assertSame(4, $result['purged']);
        self::assertSame([1, 2, 3, 4], array_map('intval', array_column($archived, 'revision')));
        self::assertSame([5, 6, 7, 8, 9], array_map('intval', $db->pdo()->query(
            "SELECT revision FROM {$p}page_revisions WHERE page_id='mdb-ret' ORDER BY revision")->fetchAll(\PDO::FETCH_COLUMN)));

        $handler = new class implements PublicationEventHandler {
            public array $types = [];
            public function handle(PublicationEvent $event): void
            {
                $this->types[] = $event->pageId . ':' . $event->type;
            }
        };
        $dispatcher = new DispatchPagePublicationOutbox($db, 'site-1', $handler, $clock);
        for ($i = 0; $i < 6 && $dispatcher->execute()['claimed'] > 0; $i++) {
        }
        $mine = array_values(array_filter($handler->types, static fn ($t) => str_starts_with($t, 'mdb-ret:')));
        self::assertSame(['mdb-ret:published', 'mdb-ret:unpublished'], $mine);
        $metrics = (new PageRevisionOperationalMetrics($db, 'site-1', $clock))->snapshot();
        self::assertSame(0, $metrics['outboxPending']);
    }

    public function testRevisionMigrationRollsBackOnlyItsTablesAndReapplies(): void
    {
        $p = self::$prefix;
        $pdo = self::$db->pdo();
        $this->page('mdb-rb', '[]');
        $run = static function (string $direction) use ($pdo, $p): void {
            $schema = new CmsSchemaBuilder($p);
            (new Migration_20261107000000_CreatePageRevisionTables($schema))->{$direction}();
            $pdo->exec('SET FOREIGN_KEY_CHECKS=0');
            foreach ($schema->getSqlLog() as $sql) {
                $pdo->exec($sql);
            }
            $pdo->exec('SET FOREIGN_KEY_CHECKS=1');
        };
        $revisionTables = ['page_revisions', 'page_revision_heads', 'page_publication_outbox', 'page_revision_audit', 'page_preview_tokens'];
        $existing = static fn () => $pdo->query("SHOW TABLES LIKE '{$p}page%'")->fetchAll(\PDO::FETCH_COLUMN);

        $run('down');
        foreach ($revisionTables as $table) {
            self::assertNotContains($p . $table, $existing());
        }
        self::assertSame(1, (int) $pdo->query("SELECT COUNT(*) FROM {$p}pages WHERE id = 'mdb-rb'")->fetchColumn());
        $run('up');
        foreach ($revisionTables as $table) {
            self::assertContains($p . $table, $existing());
        }
        // Pages created after re-applying are versioned again end to end.
        $this->page('mdb-rb-2', '[]');
        (new SavePageDraft(self::$db, 'site-1'))->execute(RevisionSchema::envelope('mdb-rb-2', 2), 1, 'editor-1');
        self::assertNotNull((new \LemurCms\Page\Application\PublishPage(self::$db, 'site-1', new PublishPageRevision(self::$db, 'site-1')))->execute('mdb-rb-2', 'publisher-1'));
    }

    public function testAdministrativeSearchEscapesWildcardsOnMariaDb(): void
    {
        $insert = self::$db->pdo()->prepare("INSERT INTO " . self::$prefix . "pages (id, title, slug, status, sort_order, created_at, updated_at)
            VALUES (?, ?, ?, 'draft', 0, NOW(), NOW())");
        $insert->execute(['like-1', 'Zeta 100% real', 'like-1']);
        $insert->execute(['like-2', 'Zeta 1000 real', 'like-2']);
        $insert->execute(['like-3', 'Zeta a_b', 'like-3']);
        $insert->execute(['like-4', 'Zeta axb', 'like-4']);
        $insert->execute(['like-5', "Zeta it's back\\slash!", 'like-5']);
        $list = new \LemurCms\Page\Application\ListAdministrativePages(new LemurDbPageRepository(self::$db));
        $ids = static fn (array $rows) => array_column($rows, 'id');
        self::assertSame(['like-1'], $ids($list->execute(null, '100%')));
        self::assertSame(['like-3'], $ids($list->execute(null, 'a_b')));
        self::assertSame(['like-5'], $ids($list->execute(null, 'back\\slash!')));
        self::assertSame(['like-5'], $ids($list->execute(null, "it's")));
    }

    private function page(string $id, string $content, string $status = 'published'): void
    {
        (new CreatePage(self::$db, 'site-1'))->execute(
            ['id' => $id, 'title' => 'Page ' . $id, 'slug' => $id, 'status' => $status, 'content' => json_decode($content, true)],
            'fixture',
        );
    }

    private static function config(string $prefix): array
    {
        return ['driver' => 'mysql', 'host' => getenv('CMS_CONTRACT_DB_HOST'), 'port' => (int) (getenv('CMS_CONTRACT_DB_PORT') ?: 3306),
            'db' => getenv('CMS_CONTRACT_DB_NAME'), 'username' => getenv('CMS_CONTRACT_DB_USER'),
            'password' => getenv('CMS_CONTRACT_DB_PASS'), 'prefix' => $prefix];
    }
}
