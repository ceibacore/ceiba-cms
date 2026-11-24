<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Domain;

/** Rules refused: `$path` points at the value (include.2.ids), `$reason` is a stable code for the editor. */
final class InvalidRules extends \InvalidArgumentException
{
    public function __construct(public readonly string $path, public readonly string $reason)
    {
        parent::__construct("Invalid site part rules at {$path}: {$reason}");
    }
}
