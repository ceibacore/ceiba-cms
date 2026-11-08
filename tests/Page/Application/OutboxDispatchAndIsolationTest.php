<?php
declare(strict_types=1);

namespace LemurCms\Tests\Page\Application;

use LemurCms\Page\Application\DispatchPagePublicationOutbox;
use LemurCms\Page\Application\PagePreviewTokens;
use LemurCms\Page\Application\PageRevisionConflict;
use LemurCms\Page\Application\PageRevisionOperationalMetrics;
use LemurCms\Page\Application\PublishPageRevision;
use LemurCms\Page\Application\RestorePageRevision;
use LemurCms\Page\Application\SavePageDraft;
use LemurCms\Page\Application\UnpublishPage;
use LemurCms\PageBuilder\Domain\Contract\PublicationEvent;
use LemurCms\PageBuilder\Domain\Contract\PublicationEventHandler;
use LemurCms\Tests\Support\FakeClock;
use LemurCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

final class OutboxDispatchAndIsolationTest extends TestCase
{
    private const LIVE = '[{"id":"hero","type":"h1","props":{"content":"Live"},"children":[]}]';

    public function testDeliversRetriesWithBackoffDeadLettersAndRequeues(): void
    {
        $clock = new FakeClock();
        $db = RevisionSchema::create();
        $p = $db->getPrefix();
        RevisionSchema::page($db, 'site-1', 'page-1', self::LIVE, 'draft');
        (new SavePageDraft($db, 'site-1', $clock))->execute(RevisionSchema::envelope('page-1', 2), 1, 'editor-1');
        (new PublishPageRevision($db, 'site-1', $clock))->execute('page-1', 2, 'publish-2', 'publisher-1');
        (new UnpublishPage($db, 'site-1', $clock))->execute('page-1', 'unpublish-1', 'publisher-1');

        $handler = new RecordingHandler(failuresBeforeSuccess: 2);
        $dispatcher = new DispatchPagePublicationOutbox($db, 'site-1', $handler, $clock, maxAttempts: 3,
            baseBackoffSeconds: 30, maxBackoffSeconds: 3600);

        // FIFO per page: 'unpublished' waits behind the failing 'published'.
        self::assertSame(['claimed' => 1, 'delivered' => 0, 'retrying' => 1, 'deadLettered' => 0], $dispatcher->execute());
        self::assertSame(['claimed' => 0, 'delivered' => 0, 'retrying' => 0, 'deadLettered' => 0], $dispatcher->execute(), 'Backoff and FIFO hold');
        $row = $db->pdo()->query("SELECT attempts, available_at, last_error, locked_until FROM {$p}page_publication_outbox ORDER BY sequence LIMIT 1")->fetch(\PDO::FETCH_ASSOC);
        self::assertSame(['attempts' => 1, 'available_at' => '2026-11-07 12:00:30', 'last_error' => 'RuntimeException: cdn unavailable', 'locked_until' => null],
            ['attempts' => (int) $row['attempts']] + array_slice($row, 1, null, true));

        $clock->advance('+30 seconds');
        self::assertSame(1, $dispatcher->execute()['retrying']);
        self::assertSame('2026-11-07 12:01:30', $db->pdo()->query("SELECT available_at FROM {$p}page_publication_outbox ORDER BY sequence LIMIT 1")->fetchColumn(), 'Doubles');

        $clock->advance('+60 seconds');
        self::assertSame(1, $dispatcher->execute()['delivered']);
        $handler->failuresBeforeSuccess = 0;
        self::assertSame(1, $dispatcher->execute()['delivered']);
        self::assertSame(['published', 'unpublished'], array_map(static fn (PublicationEvent $e) => $e->type, $handler->delivered));
        self::assertSame(3, $handler->delivered[0]->attempt);
        self::assertSame(0, (int) $db->pdo()->query("SELECT COUNT(*) FROM {$p}page_publication_outbox WHERE delivered_at IS NULL")->fetchColumn());

        // A permanently failing handler dead-letters after maxAttempts; the dead letter blocks
        // later events of the same page until an operator re-queues it.
        $db->pdo()->exec("UPDATE {$p}page_publication_outbox SET delivered_at = NULL, attempts = 0, available_at = NULL");
        $broken = new DispatchPagePublicationOutbox($db, 'site-1', new RecordingHandler(PHP_INT_MAX), $clock, maxAttempts: 2,
            baseBackoffSeconds: 1, maxBackoffSeconds: 1);
        $broken->execute();
        $clock->advance('+1 second');
        self::assertSame(1, $broken->execute()['deadLettered']);
        $clock->advance('+1 day');
        self::assertSame(0, $broken->execute()['claimed'], 'Dead letters are not retried and block the page');
        $metrics = (new PageRevisionOperationalMetrics($db, 'site-1', $clock))->snapshot();
        self::assertSame(1, $metrics['outboxDeadLettered']);
        self::assertSame(1, $metrics['outboxPending']);
        self::assertSame(1, $broken->requeueFailed());
        self::assertSame(2, (new PageRevisionOperationalMetrics($db, 'site-1', $clock))->snapshot()['outboxPending']);
    }

    public function testLeasePreventsConcurrentDeliveryAndExpiredLeaseIsRetried(): void
    {
        $clock = new FakeClock();
        $db = RevisionSchema::create();
        $p = $db->getPrefix();
        RevisionSchema::page($db, 'site-1', 'page-1', self::LIVE, 'draft');
        (new PublishPageRevision($db, 'site-1', $clock))->execute('page-1', 1, 'publish-1');
        // Simulate a worker that claimed the event and crashed.
        $db->pdo()->exec("UPDATE {$p}page_publication_outbox SET locked_until = '2026-11-07 12:02:00', attempts = 1");

        $handler = new RecordingHandler(0);
        $dispatcher = new DispatchPagePublicationOutbox($db, 'site-1', $handler, $clock);
        self::assertSame(0, $dispatcher->execute()['claimed']);
        $clock->advance('+3 minutes');
        self::assertSame(1, $dispatcher->execute()['delivered']);
        self::assertSame(2, $handler->delivered[0]->attempt);
    }

    public function testMetricsReportLagAndOutcomes(): void
    {
        $clock = new FakeClock();
        $db = RevisionSchema::create();
        RevisionSchema::page($db, 'site-1', 'page-1', self::LIVE, 'draft');
        $save = new SavePageDraft($db, 'site-1', $clock);
        $save->execute(RevisionSchema::envelope('page-1', 2), 1, 'editor-1');
        (new PublishPageRevision($db, 'site-1', $clock))->execute('page-1', 2, 'publish-2', 'publisher-1');
        (new \LemurCms\Page\Application\PageRevisionAuditLog($db, 'site-1', $clock))
            ->recordQuietly('page-1', 'save', 'conflict', 'editor-2');
        $clock->advance('+90 seconds');

        $metrics = (new PageRevisionOperationalMetrics($db, 'site-1', $clock))->snapshot();
        self::assertSame(1, $metrics['outboxPending']);
        self::assertSame(90, $metrics['outboxOldestPendingSeconds']);
        self::assertSame(1, $metrics['saves']);
        self::assertSame(1, $metrics['publications']);
        self::assertSame(1, $metrics['conflicts']);
        self::assertSame(2, $metrics['revisionsTotal']);
        self::assertSame(0, (new PageRevisionOperationalMetrics($db, 'site-2', $clock))->snapshot()['revisionsTotal']);
    }

    /** Two tenant connections in the same process, with identical page IDs. */
    public function testConsecutiveTenantsInOneProcessShareNothing(): void
    {
        $tenantA = RevisionSchema::create('tenant_a_' . bin2hex(random_bytes(3)) . '_');
        $tenantB = RevisionSchema::create('tenant_b_' . bin2hex(random_bytes(3)) . '_');
        self::assertNotSame($tenantA, $tenantB);
        self::assertNotSame($tenantA->pdo(), $tenantB->pdo());
        RevisionSchema::page($tenantA, 'site-a', 'page-1', self::LIVE, 'draft');
        RevisionSchema::page($tenantB, 'site-b', 'page-1', self::LIVE, 'draft');

        (new SavePageDraft($tenantA, 'site-a'))->execute(RevisionSchema::envelope('page-1', 2, 'Tenant A'), 1, 'actor-a');
        (new PublishPageRevision($tenantA, 'site-a'))->execute('page-1', 2, 'same-key', 'actor-a');
        (new SavePageDraft($tenantB, 'site-b'))->execute(RevisionSchema::envelope('page-1', 2, 'Tenant B'), 1, 'actor-b');
        (new PublishPageRevision($tenantB, 'site-b'))->execute('page-1', 2, 'same-key', 'actor-b');

        $content = static fn (\LemurDB $db) => $db->pdo()->query("SELECT content FROM {$db->getPrefix()}pages")->fetchColumn();
        self::assertStringContainsString('Tenant A', $content($tenantA));
        self::assertStringContainsString('Tenant B', $content($tenantB));
        $handlerA = new RecordingHandler(0);
        (new DispatchPagePublicationOutbox($tenantA, 'site-a', $handlerA))->execute();
        self::assertSame(['site-a'], array_map(static fn (PublicationEvent $e) => $e->siteId, $handlerA->delivered));
        self::assertSame(1, (int) $tenantB->pdo()->query("SELECT COUNT(*) FROM {$tenantB->getPrefix()}page_publication_outbox WHERE delivered_at IS NULL")->fetchColumn());
    }

    /** A host sharing one connection between logical sites must not cross them, even with valid IDs. */
    public function testForeignSiteCannotUseRevisionsOnSharedConnection(): void
    {
        $db = RevisionSchema::create();
        $p = $db->getPrefix();
        RevisionSchema::page($db, 'site-a', 'page-1', self::LIVE);
        (new SavePageDraft($db, 'site-a'))->execute(RevisionSchema::envelope('page-1', 2), 1, 'actor-a');

        $attempts = [
            'save' => fn () => (new SavePageDraft($db, 'site-b'))->execute(RevisionSchema::envelope('page-1', 3), 2, 'actor-b'),
            'publish' => fn () => (new PublishPageRevision($db, 'site-b'))->execute('page-1', 2, 'k', 'actor-b'),
            'restore' => fn () => (new RestorePageRevision($db, 'site-b', new SavePageDraft($db, 'site-b')))->execute('page-1', 1, 2, 'actor-b'),
            'preview' => fn () => (new PagePreviewTokens($db, 'site-b'))->issue('page-1', 2, 'actor-b'),
            'unpublish' => fn () => (new UnpublishPage($db, 'site-b'))->execute('page-1', 'k', 'actor-b'),
        ];
        foreach ($attempts as $name => $attempt) {
            try {
                $attempt();
                self::fail("Cross-site {$name} must fail");
            } catch (\RuntimeException $denied) {
                self::assertNotInstanceOf(PageRevisionConflict::class, $denied, $name);
            }
        }
        self::assertSame(2, (int) $db->pdo()->query("SELECT COUNT(*) FROM {$p}page_revisions")->fetchColumn());
        self::assertSame(['create:page-1'], $db->pdo()->query("SELECT idempotency_key FROM {$p}page_publication_outbox")->fetchAll(\PDO::FETCH_COLUMN));
        self::assertSame('published', $db->pdo()->query("SELECT status FROM {$p}pages")->fetchColumn());
    }
}

final class RecordingHandler implements PublicationEventHandler
{
    /** @var list<PublicationEvent> */
    public array $delivered = [];
    private array $failures = [];

    public function __construct(public int $failuresBeforeSuccess) {}

    public function handle(PublicationEvent $event): void
    {
        $this->failures[$event->id] = ($this->failures[$event->id] ?? 0) + 1;
        if ($this->failures[$event->id] <= $this->failuresBeforeSuccess) {
            throw new \RuntimeException("cdn\n unavailable");
        }
        $this->delivered[] = $event;
    }
}
