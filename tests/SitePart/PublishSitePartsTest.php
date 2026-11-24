<?php
declare(strict_types=1);

namespace CeibaCms\Tests\SitePart;

use CeibaCms\Page\Application\CreatePage;
use CeibaCms\Page\Application\PagePublicationKeyConflict;
use CeibaCms\Page\Application\PublishPageRevision;
use CeibaCms\SitePart\Application\PublicationGuard;
use CeibaCms\SitePart\Application\PublishSiteParts;
use CeibaCms\SitePart\Application\RulesConflict;
use CeibaCms\SitePart\Domain\SitePartRules;
use CeibaCms\SitePart\Infrastructure\SitePartStore;
use CeibaCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

final class PublishSitePartsTest extends TestCase
{
    private \CeibaDB $db;
    private SitePartStore $store;
    private array $changes;

    protected function setUp(): void
    {
        $this->db = RevisionSchema::create();
        $p = $this->db->getPrefix();
        $this->db->pdo()->exec("CREATE TABLE {$p}site_part_publication_locks (site_id TEXT PRIMARY KEY)");
        $this->db->pdo()->exec("CREATE TABLE {$p}site_part_publication_batches (id TEXT PRIMARY KEY, site_id TEXT, idempotency_key TEXT,
            request_hash TEXT, result TEXT, UNIQUE(site_id, idempotency_key))");
        $this->store = new SitePartStore($this->db, 'site-1');
        $create = new CreatePage($this->db, 'site-1');
        foreach (['header', 'footer'] as $kind) {
            $id = $create->execute(['kind' => $kind, 'title' => $kind, 'slug' => $kind]);
            $this->store->insertRules($id, SitePartRules::default(), null, '2026-01-01');
            $this->changes[] = ['id' => $id, 'revision' => 1, 'rulesVersion' => 1];
        }
    }

    private function service(bool $conflict = false): PublishSiteParts
    {
        $guard = new class($conflict) implements PublicationGuard {
            public function __construct(private bool $conflict) {}
            public function assertNoConflicts(array $changes): void
            {
                if ($this->conflict) {
                    throw new \RuntimeException('Conflict');
                }
            }
        };
        return new PublishSiteParts($this->db, 'site-1', $this->store,
            new PublishPageRevision($this->db, 'site-1'), $guard);
    }

    public function testPublishesDocumentsAndRulesTogetherAndReplaysTheSameKey(): void
    {
        $service = $this->service();
        $result = $service->execute($this->changes, 'batch', 'admin');
        self::assertCount(2, $result);
        self::assertCount(2, $this->store->published());
        self::assertSame($result, $service->execute(array_reverse($this->changes), 'batch', 'admin'));
        $this->expectException(PagePublicationKeyConflict::class);
        $service->execute([$this->changes[0]], 'batch', 'admin');
    }

    public function testConflictPreventsEveryPublication(): void
    {
        try {
            $this->service(true)->execute($this->changes, 'batch', 'admin');
            self::fail('Conflict was accepted');
        } catch (\RuntimeException $error) {
            self::assertSame('Conflict', $error->getMessage());
            self::assertSame([], $this->store->published());
            self::assertSame(0, (int) $this->db->pdo()->query('SELECT COUNT(*) FROM ' . $this->db->getPrefix() . 'site_part_publication_batches')->fetchColumn());
        }
    }

    public function testStaleRulesPreventEveryPublication(): void
    {
        $this->store->saveDraftRules($this->changes[1]['id'], SitePartRules::default(), 1, null, '2026-01-02');
        try {
            $this->service()->execute($this->changes, 'batch', 'admin');
            self::fail('Stale rules were accepted');
        } catch (RulesConflict $error) {
            self::assertSame(2, $error->currentVersion);
            self::assertSame([], $this->store->published());
        }
    }

    public function testSecondInvalidRevisionRollsBackFirstAndRules(): void
    {
        usort($this->changes, fn (array $a, array $b): int => strcmp($a['id'], $b['id']));
        $this->changes[1]['revision'] = 99;
        try {
            $this->service()->execute($this->changes, 'batch', 'admin');
            self::fail('Invalid revision was accepted');
        } catch (\CeibaCms\Page\Application\PageRevisionNotFound) {
            self::assertSame([], $this->store->published());
            self::assertSame(0, (int) $this->db->pdo()->query('SELECT COUNT(*) FROM ' . $this->db->getPrefix() . 'page_publication_outbox')->fetchColumn());
        }
    }
}
