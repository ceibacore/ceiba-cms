<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Application;

/** The rules were changed by someone else since `$expected`; reload them (412 with the current version). */
final class RulesConflict extends \RuntimeException
{
    public function __construct(public readonly int $currentVersion)
    {
        parent::__construct('Site part rules have changed');
    }
}
