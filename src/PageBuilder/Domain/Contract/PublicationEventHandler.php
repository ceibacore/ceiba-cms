<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Contract;

/**
 * Host side effects after publication (cache/CDN invalidation, search indexing,
 * webhooks). Delivery is at-least-once: implementations must be idempotent by
 * event ID and throw to request a retry.
 */
interface PublicationEventHandler
{
    public function handle(PublicationEvent $event): void;
}
