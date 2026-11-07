<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Infrastructure;

use DateTimeImmutable;
use LemurCms\PageBuilder\Domain\Contract\Clock;

final class SystemClock implements Clock
{
    public function now(): DateTimeImmutable
    {
        return new DateTimeImmutable();
    }
}
