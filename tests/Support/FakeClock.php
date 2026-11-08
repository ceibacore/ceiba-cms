<?php
declare(strict_types=1);

namespace LemurCms\Tests\Support;

use DateTimeImmutable;
use LemurCms\PageBuilder\Domain\Contract\Clock;

final class FakeClock implements Clock
{
    private DateTimeImmutable $now;

    public function __construct(string $now = '2026-11-07 12:00:00')
    {
        $this->now = new DateTimeImmutable($now);
    }

    public function now(): DateTimeImmutable
    {
        return $this->now;
    }

    public function advance(string $modifier): void
    {
        $this->now = $this->now->modify($modifier);
    }
}
