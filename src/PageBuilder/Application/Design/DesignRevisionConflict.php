<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Application\Design;

use RuntimeException;

/** The site design changed since the editor loaded it (If-Match is stale). */
final class DesignRevisionConflict extends RuntimeException
{
    public function __construct(public readonly int $currentRevision)
    {
        parent::__construct('Design revision has changed');
    }
}
