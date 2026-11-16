<?php
declare(strict_types=1);

namespace CeibaCms\PageBuilder\Domain\Contract;

use CeibaCms\PageBuilder\Domain\Document\HostContext;

interface ContentSource
{
    /**
     * @param array<string, mixed> $options
     * @return iterable<mixed>
     */
    public function fetch(HostContext $context, string $source, array $options = []): iterable;
}
