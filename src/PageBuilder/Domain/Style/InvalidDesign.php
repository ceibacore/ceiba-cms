<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Domain\Style;

use InvalidArgumentException;

/** A design with compiler diagnostics; the first one is in the message, all of them in $diagnostics. */
final class InvalidDesign extends InvalidArgumentException
{
    /** @param list<array{path: string, code: string}> $diagnostics */
    public function __construct(public readonly string $path, public readonly string $reason, public readonly array $diagnostics)
    {
        parent::__construct("Invalid design at {$path}: {$reason}");
    }
}
