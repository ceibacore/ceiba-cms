<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Application;

/** Publishing would leave requests where parts of the same kind tie (plan 06 D-5); nothing was published. */
final class SitePartsInConflict extends \RuntimeException
{
    /** @param list<array{context: array<string, mixed>, parts: array<string, list<string>>}> $conflicts */
    public function __construct(public readonly array $conflicts)
    {
        parent::__construct('Site parts would tie');
    }
}
