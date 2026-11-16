<?php
declare(strict_types=1);

namespace CeibaCms\PageBuilder\Domain\Contract;

use CeibaCms\PageBuilder\Domain\Document\HostContext;

interface JobDispatcher
{
    /** @param array<string, mixed> $payload */
    public function dispatch(HostContext $context, string $jobName, array $payload): void;
}
