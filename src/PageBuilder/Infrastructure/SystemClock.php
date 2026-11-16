<?php
declare(strict_types=1);

namespace CeibaCms\PageBuilder\Infrastructure;

use DateTimeImmutable;
use CeibaCms\PageBuilder\Domain\Contract\Clock;

final class SystemClock implements Clock
{
    public function now(): DateTimeImmutable
    {
        return new DateTimeImmutable();
    }
}
