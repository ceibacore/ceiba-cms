<?php
declare(strict_types=1);

namespace LemurCms\Tests\Support;

use LemurDB;

/**
 * SQLite mirror of migration 20261107000000 (page revisions).
 * The MariaDB contract test applies the real migrations to catch drift.
 */
final class RevisionSchema
{
    public static function create(string $prefix = ''): LemurDB
    {
        $prefix = $prefix !== '' ? $prefix : 'rev_' . bin2hex(random_bytes(4)) . '_';
        $db = LemurDB::getInstance(['driver' => 'sqlite', 'db' => ':memory:', 'prefix' => $prefix]);
        self::install($db);
        return $db;
    }

    public static function install(LemurDB $db): void
    {
        $p = $db->getPrefix();
        $pdo = $db->pdo();
        $pdo->exec('PRAGMA foreign_keys = ON');
        $pdo->exec("CREATE TABLE {$p}pages (id TEXT PRIMARY KEY, title TEXT, slug TEXT UNIQUE, content TEXT,
            status TEXT NOT NULL DEFAULT 'draft', template TEXT, sort_order INTEGER NOT NULL DEFAULT 0,
            published_at TEXT, deleted_at TEXT, created_at TEXT, updated_at TEXT, layout_id TEXT, template_id TEXT,
            query_config TEXT, conditions TEXT, custom_css_with_session TEXT, custom_css_without_session TEXT,
            custom_js_with_session TEXT, custom_js_without_session TEXT)");
        $pdo->exec("CREATE TABLE {$p}media (id TEXT PRIMARY KEY, filename TEXT, path TEXT, mime_type TEXT, size INTEGER, created_at TEXT)");
        $pdo->exec("CREATE TABLE {$p}page_revisions (id TEXT PRIMARY KEY, page_id TEXT NOT NULL, site_id TEXT NOT NULL,
            revision INTEGER NOT NULL, schema_version INTEGER NOT NULL, snapshot TEXT NOT NULL, content_hash TEXT NOT NULL,
            author_id TEXT, reason TEXT NOT NULL DEFAULT 'edit', created_at TEXT NOT NULL, pinned INTEGER NOT NULL DEFAULT 0,
            UNIQUE(page_id, revision), FOREIGN KEY (page_id) REFERENCES {$p}pages(id) ON DELETE CASCADE)");
        $pdo->exec("CREATE TABLE {$p}page_revision_heads (page_id TEXT PRIMARY KEY REFERENCES {$p}pages(id) ON DELETE CASCADE,
            draft_revision_id TEXT UNIQUE REFERENCES {$p}page_revisions(id) ON DELETE SET NULL,
            published_revision_id TEXT UNIQUE REFERENCES {$p}page_revisions(id) ON DELETE SET NULL,
            next_revision INTEGER NOT NULL DEFAULT 1, updated_at TEXT NOT NULL, public_content_hash TEXT)");
        $pdo->exec("CREATE TABLE {$p}page_publication_outbox (sequence INTEGER PRIMARY KEY AUTOINCREMENT, id TEXT NOT NULL UNIQUE,
            page_id TEXT NOT NULL REFERENCES {$p}pages(id) ON DELETE CASCADE, site_id TEXT NOT NULL,
            revision_id TEXT NOT NULL REFERENCES {$p}page_revisions(id) ON DELETE RESTRICT,
            event_type TEXT NOT NULL DEFAULT 'published', idempotency_key TEXT NOT NULL, attempts INTEGER NOT NULL DEFAULT 0,
            available_at TEXT, locked_until TEXT, last_error TEXT, created_at TEXT NOT NULL, delivered_at TEXT, failed_at TEXT,
            UNIQUE(site_id, idempotency_key))");
        $pdo->exec("CREATE TABLE {$p}page_revision_audit (id INTEGER PRIMARY KEY AUTOINCREMENT, site_id TEXT NOT NULL, page_id TEXT NOT NULL,
            actor_id TEXT, action TEXT NOT NULL, result TEXT NOT NULL, source_revision_id TEXT, target_revision_id TEXT,
            details TEXT, request_id TEXT, created_at TEXT NOT NULL)");
        $pdo->exec("CREATE TABLE {$p}page_preview_tokens (id TEXT PRIMARY KEY,
            site_id TEXT NOT NULL, page_id TEXT NOT NULL REFERENCES {$p}pages(id) ON DELETE CASCADE,
            revision_id TEXT NOT NULL REFERENCES {$p}page_revisions(id) ON DELETE CASCADE,
            token_hash TEXT NOT NULL UNIQUE, created_by TEXT NOT NULL, expires_at TEXT NOT NULL, revoked_at TEXT, created_at TEXT NOT NULL)");
    }

    /**
     * Applies migration 20261107000002 to a minimal hand-written fixture schema and
     * sets each head's drift baseline to the page's current content, as the
     * initializer would have done.
     */
    public static function upgradeMinimalFixture(LemurDB $db): void
    {
        $p = $db->getPrefix();
        $pdo = $db->pdo();
        $columns = static function (string $table) use ($pdo): array {
            return array_column($pdo->query("PRAGMA table_info({$table})")->fetchAll(\PDO::FETCH_ASSOC), 'name');
        };
        $add = [
            'page_revision_heads' => ['public_content_hash' => 'TEXT'],
            'page_revisions' => ['pinned' => 'INTEGER NOT NULL DEFAULT 0'],
            'page_publication_outbox' => [
                'event_type' => "TEXT NOT NULL DEFAULT 'published'", 'attempts' => 'INTEGER NOT NULL DEFAULT 0',
                'available_at' => 'TEXT', 'locked_until' => 'TEXT', 'last_error' => 'TEXT', 'failed_at' => 'TEXT',
                'sequence' => 'INTEGER',
            ],
        ];
        foreach ($add as $table => $definitions) {
            $existing = $columns($p . $table);
            if ($existing === []) {
                continue;
            }
            foreach ($definitions as $column => $type) {
                if (!in_array($column, $existing, true)) {
                    $pdo->exec("ALTER TABLE {$p}{$table} ADD COLUMN {$column} {$type}");
                }
            }
        }
        if ($columns($p . 'page_publication_outbox') !== []) {
            $pdo->exec("UPDATE {$p}page_publication_outbox SET sequence = rowid WHERE sequence IS NULL");
            self::sequenceTrigger($db);
        }
        $pdo->exec("CREATE TABLE IF NOT EXISTS {$p}page_revision_audit (id INTEGER PRIMARY KEY AUTOINCREMENT, site_id TEXT NOT NULL, page_id TEXT NOT NULL,
            actor_id TEXT, action TEXT NOT NULL, result TEXT NOT NULL, source_revision_id TEXT, target_revision_id TEXT,
            details TEXT, request_id TEXT, created_at TEXT NOT NULL)");
        $pdo->exec("CREATE TABLE IF NOT EXISTS {$p}page_preview_tokens (id TEXT PRIMARY KEY, site_id TEXT NOT NULL, page_id TEXT NOT NULL,
            revision_id TEXT NOT NULL, token_hash TEXT NOT NULL UNIQUE, created_by TEXT NOT NULL, expires_at TEXT NOT NULL,
            revoked_at TEXT, created_at TEXT NOT NULL)");
        if ($columns($p . 'page_revision_heads') !== [] && $columns($p . 'pages') !== []) {
            foreach ($pdo->query("SELECT h.page_id, p.content FROM {$p}page_revision_heads h JOIN {$p}pages p ON p.id = h.page_id")
                ->fetchAll(\PDO::FETCH_ASSOC) as $row) {
                $pdo->prepare("UPDATE {$p}page_revision_heads SET public_content_hash = ? WHERE page_id = ?")
                    ->execute([\LemurCms\Page\Application\PublicContentFingerprint::of($row['content']), $row['page_id']]);
            }
        }
    }

    /** SQLite allows one AUTOINCREMENT per table; emulate MySQL's outbox sequence with rowid. */
    private static function sequenceTrigger(LemurDB $db): void
    {
        $p = $db->getPrefix();
        $db->pdo()->exec("CREATE TRIGGER IF NOT EXISTS {$p}outbox_sequence AFTER INSERT ON {$p}page_publication_outbox
            WHEN NEW.sequence IS NULL BEGIN UPDATE {$p}page_publication_outbox SET sequence = NEW.rowid WHERE rowid = NEW.rowid; END");
    }

    /**
     * Creates a page through the real CreatePage use case and returns the raw
     * public content it stored (canonical JSON of the first revision).
     */
    public static function page(LemurDB $db, string $siteId, string $id, string $content, string $status = 'published'): string
    {
        $tree = json_decode($content, true);
        (new \LemurCms\Page\Application\CreatePage($db, $siteId))->execute([
            'id' => $id, 'title' => 'Page ' . $id, 'slug' => 'slug-' . $id, 'status' => $status,
            'content' => is_array($tree) ? $tree : $content,
        ], 'fixture');
        return (string) $db->pdo()->query("SELECT content FROM {$db->getPrefix()}pages WHERE id = " . $db->pdo()->quote($id))->fetchColumn();
    }

    public static function envelope(string $pageId, int $revision, string $text = 'Draft'): \LemurCms\PageBuilder\Domain\Document\DocumentEnvelope
    {
        return \LemurCms\PageBuilder\Domain\Document\DocumentEnvelope::fromJson(json_encode([
            'schemaVersion' => 1, 'documentId' => $pageId, 'revision' => $revision,
            'root' => [['id' => 'headline', 'type' => 'h1', 'props' => ['content' => $text], 'children' => []]],
            'settings' => (object) [], 'resources' => [],
        ], JSON_THROW_ON_ERROR));
    }
}
