<?php
declare(strict_types=1);

namespace CeibaCms\PageBuilder\Domain\Contract;

use DateTimeImmutable;

interface Clock
{
    public function now(): DateTimeImmutable;
}
