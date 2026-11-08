<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use InvalidArgumentException;

/**
 * Retention limits. Revisions referenced by a head (draft or published), pinned,
 * referenced by the outbox or by an active preview link are never purged.
 */
final class PageRevisionRetentionPolicy
{
    public function __construct(
        public readonly int $keepLatestPerPage = 50,
        public readonly int $minAgeDays = 90,
        public readonly int $deliveredOutboxDays = 30,
        public readonly int $maxRevisionsPerRun = 1000,
    ) {
        if ($keepLatestPerPage < 5 || $minAgeDays < 1 || $deliveredOutboxDays < 7
            || $maxRevisionsPerRun < 1 || $maxRevisionsPerRun > 5000) {
            throw new InvalidArgumentException('Retention policy is below the safe minimums');
        }
    }
}
