<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use RuntimeException;

final class PageRevisionConflict extends RuntimeException
{
    public function __construct(public readonly int $currentRevision)
    {
        parent::__construct('Page draft revision has changed');
    }
}
