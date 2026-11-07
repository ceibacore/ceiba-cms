<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Contract;

use LemurCms\PageBuilder\Domain\Document\HostContext;

interface JobDispatcher
{
    /** @param array<string, mixed> $payload */
    public function dispatch(HostContext $context, string $jobName, array $payload): void;
}
