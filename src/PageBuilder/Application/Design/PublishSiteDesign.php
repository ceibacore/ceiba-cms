<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Application\Design;

use InvalidArgumentException;

/** Publishes an exact design revision: every page renders with it from then on. Republishing is a no-op. */
final class PublishSiteDesign
{
    public function __construct(private readonly SiteDesignStore $store) {}

    /** @throws InvalidArgumentException when the revision does not exist */
    public function execute(int $revision): int
    {
        return $this->store->db()->transaction(function () use ($revision): int {
            $head = $this->store->lockedHead();
            if ($revision < 1 || $this->store->snapshot($revision) === null) {
                throw new InvalidArgumentException('Design revision unavailable');
            }
            if ($head['published_revision'] !== $revision) {
                $this->store->moveHead($head['draft_revision'], $revision, $head['next_revision']);
            }
            return $revision;
        });
    }
}
