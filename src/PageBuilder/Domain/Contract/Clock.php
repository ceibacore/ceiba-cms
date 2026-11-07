<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Contract;

use DateTimeImmutable;

interface Clock
{
    public function now(): DateTimeImmutable;
}
