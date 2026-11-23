<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Application\Design;

use CeibaCms\PageBuilder\Domain\Style\SiteDesign;

/** Saves the site design as revision n + 1 when the editor stands on n (optimistic concurrency, like pages). */
final class SaveSiteDesignDraft
{
    public function __construct(private readonly SiteDesignStore $store) {}

    /** @param mixed $design decoded JSON @throws DesignRevisionConflict|\InvalidArgumentException */
    public function execute(mixed $design, int $expectedRevision, ?string $actorId): int
    {
        $valid = SiteDesign::validate($design);
        return $this->store->db()->transaction(function () use ($valid, $expectedRevision, $actorId): int {
            $head = $this->store->lockedHead();
            $current = $head['draft_revision'] ?? $head['published_revision'] ?? 0;
            if ($current !== $expectedRevision) {
                throw new DesignRevisionConflict($current);
            }
            $revision = $head['next_revision'];
            $this->store->insert($revision, $valid, $actorId);
            $this->store->moveHead($revision, $head['published_revision'], $revision + 1);
            return $revision;
        });
    }
}
