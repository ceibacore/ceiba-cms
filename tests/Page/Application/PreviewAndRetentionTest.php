<?php
declare(strict_types=1);

namespace LemurCms\Tests\Page\Application;

use LemurCms\Page\Application\PagePreviewTokens;
use LemurCms\Page\Application\PageRevisionRetentionPolicy;
use LemurCms\Page\Application\PinPageRevision;
use LemurCms\Page\Application\PreviewTokenLimitReached;
use LemurCms\Page\Application\PublishPageRevision;
use LemurCms\Page\Application\PurgePageRevisions;
use LemurCms\Page\Application\SavePageDraft;
use LemurCms\PageBuilder\Domain\Contract\RevisionArchive;
use LemurCms\PageBuilder\Infrastructure\JsonLinesRevisionArchive;
use LemurCms\Tests\Support\FakeClock;
use LemurCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

final class PreviewAndRetentionTest extends TestCase
{
    private const LIVE = '[{"id":"hero","type":"h1","props":{"content":"Live"},"children":[]}]';
    private string $archiveDir = '';

    protected function tearDown(): void
    {
        if ($this->archiveDir !== '' && is_dir($this->archiveDir)) {
            $files = new \RecursiveIteratorIterator(
                new \RecursiveDirectoryIterator($this->archiveDir, \FilesystemIterator::SKIP_DOTS),
                \RecursiveIteratorIterator::CHILD_FIRST
            );
            foreach ($files as $file) {
                $file->isDir() ? rmdir($file->getPathname()) : unlink($file->getPathname());
            }
            rmdir($this->archiveDir);
        }
    }

    public function testPreviewTokenIsBoundShortLivedRevocableAndStoredHashed(): void
    {
        $clock = new FakeClock();
        $db = RevisionSchema::create();
        $p = $db->getPrefix();
        RevisionSchema::page($db, 'site-1', 'page-1', self::LIVE);
        (new SavePageDraft($db, 'site-1', $clock))->execute(RevisionSchema::envelope('page-1', 2, 'Unpublished draft'), 1, 'editor-1');
        $previews = new PagePreviewTokens($db, 'site-1', $clock);

        $issued = $previews->issue('page-1', 2, 'editor-1', 300);
        self::assertMatchesRegularExpression('/^[A-Za-z0-9_-]{43}$/D', $issued['token']);
        self::assertSame('2026-11-07 12:05:00', $issued['expiresAt']);
        $stored = $db->pdo()->query("SELECT token_hash FROM {$p}page_preview_tokens")->fetchColumn();
        self::assertSame(hash('sha256', $issued['token']), $stored);
        self::assertStringNotContainsString($issued['token'], json_encode($db->pdo()->query("SELECT * FROM {$p}page_preview_tokens")->fetchAll()));

        $resolved = $previews->resolve($issued['token']);
        self::assertSame('page-1', $resolved['pageId']);
        self::assertSame(2, $resolved['revision']);
        self::assertSame('Unpublished draft', $resolved['snapshot']['root'][0]['props']['content']);
        self::assertStringNotContainsString('Unpublished draft', $db->pdo()->query("SELECT content FROM {$p}pages")->fetchColumn());

        self::assertNull((new PagePreviewTokens($db, 'site-2', $clock))->resolve($issued['token']), 'Foreign site');
        self::assertNull($previews->resolve('not-a-token'));
        self::assertNull($previews->resolve(str_repeat('A', 43)));

        $clock->advance('+301 seconds');
        self::assertNull($previews->resolve($issued['token']), 'Expired');

        $second = $previews->issue('page-1', 1, 'editor-1');
        self::assertNotNull($previews->resolve($second['token']));
        self::assertSame(1, $previews->revoke('page-1', 'editor-1', $second['tokenId']));
        self::assertNull($previews->resolve($second['token']), 'Revoked');
        self::assertSame(0, $previews->revoke('page-1', 'editor-1'));
    }

    public function testPreviewRejectsInvalidRequestsAndCapsActiveLinks(): void
    {
        $db = RevisionSchema::create();
        RevisionSchema::page($db, 'site-1', 'page-1', self::LIVE);
        $previews = new PagePreviewTokens($db, 'site-1', new FakeClock());
        foreach ([[1, 59], [1, 3601], [99, 600]] as [$revision, $ttl]) {
            try {
                $previews->issue('page-1', $revision, 'editor-1', $ttl);
                self::fail('Expected rejection');
            } catch (\InvalidArgumentException|\RuntimeException) {
            }
        }
        for ($i = 0; $i < 50; $i++) {
            $previews->issue('page-1', 1, 'editor-1');
        }
        $this->expectException(PreviewTokenLimitReached::class);
        $previews->issue('page-1', 1, 'editor-1');
    }

    public function testRetentionArchivesBeforePurgingAndNeverTouchesProtectedRevisions(): void
    {
        $clock = new FakeClock('2026-01-01 00:00:00');
        $db = RevisionSchema::create();
        $p = $db->getPrefix();
        RevisionSchema::page($db, 'site-1', 'page-1', self::LIVE, 'draft');
        $save = new SavePageDraft($db, 'site-1', $clock);
        for ($revision = 2; $revision <= 12; $revision++) {
            $save->execute(RevisionSchema::envelope('page-1', $revision), $revision - 1, 'editor-1');
        }
        (new PublishPageRevision($db, 'site-1', $clock))->execute('page-1', 12, 'publish-12');
        $db->pdo()->exec("UPDATE {$p}page_revisions SET created_at = '2025-06-01 00:00:00'");
        (new PinPageRevision($db, 'site-1'))->execute('page-1', 3, true, 'admin-1');
        $clock->advance('+1 year');
        (new PagePreviewTokens($db, 'site-1', $clock))->issue('page-1', 4, 'editor-1');
        $policy = new PageRevisionRetentionPolicy(keepLatestPerPage: 5, minAgeDays: 30);

        $this->archiveDir = sys_get_temp_dir() . '/cms-archive-' . bin2hex(random_bytes(4));
        $purge = new PurgePageRevisions($db, 'site-1', new JsonLinesRevisionArchive($this->archiveDir), $clock);
        $dry = $purge->execute($policy);
        // Protected: 3 pinned, 4 active preview, 12 head + outbox, 8-12 latest five. Candidates: 1, 2, 5, 6, 7.
        self::assertSame(['dryRun' => true, 'candidates' => 5, 'purged' => 0, 'outboxPurged' => 0,
            'pages' => ['page-1' => 5], 'archive' => null], $dry);
        self::assertSame(12, (int) $db->pdo()->query("SELECT COUNT(*) FROM {$p}page_revisions")->fetchColumn());

        $real = $purge->execute($policy, false, 'ops-1');
        self::assertSame(5, $real['purged']);
        $remaining = $db->pdo()->query("SELECT revision FROM {$p}page_revisions ORDER BY revision")->fetchAll(\PDO::FETCH_COLUMN);
        self::assertSame([3, 4, 8, 9, 10, 11, 12], array_map('intval', $remaining));
        $archived = file($this->archiveDir . '/' . $real['archive'], FILE_IGNORE_NEW_LINES);
        self::assertSame([1, 2, 5, 6, 7], array_map(static fn ($line) => json_decode($line, true)['revision'], $archived));
        self::assertArrayHasKey('snapshot', json_decode($archived[0], true));
        self::assertSame('0600', substr(sprintf('%o', fileperms($this->archiveDir . '/' . $real['archive'])), -4));
        $audit = $db->pdo()->query("SELECT actor_id, details FROM {$p}page_revision_audit WHERE action='retention_purge'")->fetch(\PDO::FETCH_ASSOC);
        self::assertSame('ops-1', $audit['actor_id']);
        self::assertSame(5, json_decode($audit['details'], true)['purged']);
        self::assertSame(0, $purge->execute($policy, false)['purged'], 'Idempotent');
    }

    public function testArchiveFailureDeletesNothing(): void
    {
        $clock = new FakeClock('2026-01-01 00:00:00');
        $db = RevisionSchema::create();
        $p = $db->getPrefix();
        RevisionSchema::page($db, 'site-1', 'page-1', self::LIVE);
        $save = new SavePageDraft($db, 'site-1', $clock);
        for ($revision = 2; $revision <= 8; $revision++) {
            $save->execute(RevisionSchema::envelope('page-1', $revision), $revision - 1, 'editor-1');
        }
        $clock->advance('+1 year');
        $failing = new class implements RevisionArchive {
            public function archive(string $siteId, array $revisions): string
            {
                throw new \RuntimeException('storage offline');
            }
        };
        try {
            (new PurgePageRevisions($db, 'site-1', $failing, $clock))->execute(new PageRevisionRetentionPolicy(5, 30), false);
            self::fail('Expected archive failure');
        } catch (\RuntimeException $error) {
            self::assertSame('storage offline', $error->getMessage());
        }
        self::assertSame(8, (int) $db->pdo()->query("SELECT COUNT(*) FROM {$p}page_revisions")->fetchColumn());
    }

    public function testPolicyRejectsUnsafeLimitsAndPinIsAuditedAndScoped(): void
    {
        foreach ([[4, 30, 30], [5, 0, 30], [5, 30, 6]] as $args) {
            try {
                new PageRevisionRetentionPolicy(...$args);
                self::fail('Unsafe policy accepted');
            } catch (\InvalidArgumentException) {
            }
        }
        $db = RevisionSchema::create();
        RevisionSchema::page($db, 'site-1', 'page-1', self::LIVE);
        $pin = new PinPageRevision($db, 'site-1');
        self::assertTrue($pin->execute('page-1', 1, true, 'admin-1'));
        self::assertFalse($pin->execute('page-1', 1, true, 'admin-1'));
        self::assertTrue($pin->execute('page-1', 1, false, 'admin-1'));
        $this->expectException(\RuntimeException::class);
        (new PinPageRevision($db, 'site-2'))->execute('page-1', 1, true, 'admin-1');
    }
}
