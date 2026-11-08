<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use InvalidArgumentException;
use LemurDB;
use LemurCms\PageBuilder\Domain\Contract\Clock;
use LemurCms\PageBuilder\Domain\Contract\PublicationEvent;
use LemurCms\PageBuilder\Domain\Contract\PublicationEventHandler;
use LemurCms\PageBuilder\Infrastructure\SystemClock;
use Throwable;

/**
 * Delivers publication outbox events to the host handler for one site connection.
 *
 * - Claims each event with a lease, so concurrent workers never deliver the same
 *   event at the same time; a crashed worker's lease expires and is retried.
 * - Strict FIFO per page by sequence: an event waits while an earlier event of the
 *   same page is undelivered (pending, leased or dead-lettered), so consumers never
 *   apply 'unpublished' before the preceding 'published'.
 * - Failures back off exponentially; after maxAttempts the event is dead-lettered
 *   (failed_at) and kept for the operator, never silently dropped. A dead letter
 *   blocks later events of the same page until it is re-queued.
 * - The handler runs outside any database transaction.
 */
final class DispatchPagePublicationOutbox
{
    private readonly Clock $clock;

    public function __construct(
        private readonly LemurDB $db,
        private readonly string $siteId,
        private readonly PublicationEventHandler $handler,
        ?Clock $clock = null,
        private readonly int $maxAttempts = 8,
        private readonly int $leaseSeconds = 120,
        private readonly int $baseBackoffSeconds = 30,
        private readonly int $maxBackoffSeconds = 3600,
    ) {
        if (trim($siteId) === '' || $maxAttempts < 1 || $maxAttempts > 50 || $leaseSeconds < 10
            || $baseBackoffSeconds < 1 || $maxBackoffSeconds < $baseBackoffSeconds) {
            throw new InvalidArgumentException('Invalid outbox dispatcher configuration');
        }
        $this->clock = $clock ?? new SystemClock();
    }

    /** @return array{claimed: int, delivered: int, retrying: int, deadLettered: int} */
    public function execute(int $batchSize = 50): array
    {
        if ($batchSize < 1 || $batchSize > 500) {
            throw new InvalidArgumentException('Batch size must be between 1 and 500');
        }
        $table = $this->db->getPrefix() . 'page_publication_outbox';
        $pdo = $this->db->pdo();
        $now = $this->now();
        $due = $pdo->prepare("SELECT o.id FROM {$table} o
            WHERE o.site_id = ? AND o.delivered_at IS NULL AND o.failed_at IS NULL
              AND (o.available_at IS NULL OR o.available_at <= ?) AND (o.locked_until IS NULL OR o.locked_until < ?)
              AND NOT EXISTS (SELECT 1 FROM {$table} prior WHERE prior.site_id = o.site_id AND prior.page_id = o.page_id
                  AND prior.delivered_at IS NULL AND prior.sequence < o.sequence)
            ORDER BY o.sequence LIMIT {$batchSize}");
        $due->execute([$this->siteId, $now, $now]);
        $stats = ['claimed' => 0, 'delivered' => 0, 'retrying' => 0, 'deadLettered' => 0];

        foreach ($due->fetchAll(\PDO::FETCH_COLUMN) as $id) {
            $now = $this->now();
            $lease = $this->clock->now()->modify('+' . $this->leaseSeconds . ' seconds')->format('Y-m-d H:i:s');
            $claim = $pdo->prepare("UPDATE {$table} SET locked_until = ?, attempts = attempts + 1
                WHERE id = ? AND site_id = ? AND delivered_at IS NULL AND failed_at IS NULL
                  AND (locked_until IS NULL OR locked_until < ?)");
            $claim->execute([$lease, $id, $this->siteId, $now]);
            if ($claim->rowCount() !== 1) {
                continue; // Another worker owns it.
            }
            $stats['claimed']++;
            $row = $pdo->prepare("SELECT id, site_id, page_id, revision_id, event_type, created_at, attempts FROM {$table} WHERE id = ?");
            $row->execute([$id]);
            $event = $row->fetch(\PDO::FETCH_ASSOC);
            try {
                $this->handler->handle(new PublicationEvent(
                    $event['id'], $event['site_id'], $event['page_id'], $event['revision_id'],
                    $event['event_type'] ?? PublicationEvent::PUBLISHED, $event['created_at'], (int) $event['attempts'],
                ));
                $pdo->prepare("UPDATE {$table} SET delivered_at = ?, locked_until = NULL, last_error = NULL WHERE id = ? AND locked_until = ?")
                    ->execute([$this->now(), $id, $lease]);
                $stats['delivered']++;
            } catch (Throwable $error) {
                $attempts = (int) $event['attempts'];
                $message = substr(get_class($error) . ': ' . preg_replace('/\s+/', ' ', $error->getMessage()), 0, 500);
                if ($attempts >= $this->maxAttempts) {
                    $pdo->prepare("UPDATE {$table} SET failed_at = ?, locked_until = NULL, last_error = ? WHERE id = ? AND locked_until = ?")
                        ->execute([$this->now(), $message, $id, $lease]);
                    $stats['deadLettered']++;
                } else {
                    $delay = min($this->maxBackoffSeconds, $this->baseBackoffSeconds * (2 ** ($attempts - 1)));
                    $available = $this->clock->now()->modify('+' . $delay . ' seconds')->format('Y-m-d H:i:s');
                    $pdo->prepare("UPDATE {$table} SET available_at = ?, locked_until = NULL, last_error = ? WHERE id = ? AND locked_until = ?")
                        ->execute([$available, $message, $id, $lease]);
                    $stats['retrying']++;
                }
            }
        }
        return $stats;
    }

    /** Operator action: re-queues dead-lettered events (all, or one by ID). */
    public function requeueFailed(?string $eventId = null): int
    {
        $table = $this->db->getPrefix() . 'page_publication_outbox';
        $sql = "UPDATE {$table} SET failed_at = NULL, attempts = 0, available_at = NULL, locked_until = NULL
            WHERE site_id = ? AND failed_at IS NOT NULL AND delivered_at IS NULL";
        $params = [$this->siteId];
        if ($eventId !== null) {
            $sql .= ' AND id = ?';
            $params[] = $eventId;
        }
        $update = $this->db->pdo()->prepare($sql);
        $update->execute($params);
        return $update->rowCount();
    }

    private function now(): string
    {
        return $this->clock->now()->format('Y-m-d H:i:s');
    }
}
