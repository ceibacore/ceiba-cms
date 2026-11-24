<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Application;

/** Rejects a prospective publication if it would introduce a resolution conflict. */
interface PublicationGuard
{
    /** @param list<array{id: string, revision: int, rulesVersion: int}> $changes */
    public function assertNoConflicts(array $changes): void;
}
