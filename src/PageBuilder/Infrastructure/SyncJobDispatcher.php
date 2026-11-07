<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Infrastructure;

use LemurCms\PageBuilder\Domain\Contract\JobDispatcher;
use LemurCms\PageBuilder\Domain\Document\HostContext;

final class SyncJobDispatcher implements JobDispatcher
{
    /** @var array<string, callable(HostContext, array<string, mixed>): void> */
    private array $handlers = [];

    /** @var list<array{context: HostContext, jobName: string, payload: array<string, mixed>}> */
    private array $dispatched = [];

    public function register(string $jobName, callable $handler): void
    {
        $this->handlers[$jobName] = $handler;
    }

    public function dispatch(HostContext $context, string $jobName, array $payload): void
    {
        $this->dispatched[] = [
            'context' => $context,
            'jobName' => $jobName,
            'payload' => $payload,
        ];

        if (isset($this->handlers[$jobName])) {
            ($this->handlers[$jobName])($context, $payload);
        }
    }

    /** @return list<array{context: HostContext, jobName: string, payload: array<string, mixed>}> */
    public function getDispatched(): array
    {
        return $this->dispatched;
    }
}
