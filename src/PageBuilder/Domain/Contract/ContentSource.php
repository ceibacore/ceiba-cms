<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Contract;

use LemurCms\PageBuilder\Domain\Document\HostContext;

interface ContentSource
{
    /**
     * @param array<string, mixed> $options
     * @return iterable<mixed>
     */
    public function fetch(HostContext $context, string $source, array $options = []): iterable;
}
