<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Contract;

/** Durable publication event delivered at least once. Handlers deduplicate by $id. */
final class PublicationEvent
{
    public const PUBLISHED = 'published';
    public const UNPUBLISHED = 'unpublished';

    public function __construct(
        public readonly string $id,
        public readonly string $siteId,
        public readonly string $pageId,
        public readonly string $revisionId,
        public readonly string $type,
        public readonly string $occurredAt,
        public readonly int $attempt,
    ) {}
}
