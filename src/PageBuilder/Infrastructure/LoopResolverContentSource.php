<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Infrastructure;

use LemurCms\PageBuilder\Domain\Contract\ContentSource;
use LemurCms\PageBuilder\Domain\Document\HostContext;
use LemurCms\PageBuilder\Domain\Service\LoopResolverInterface;

final class LoopResolverContentSource implements ContentSource
{
    public function __construct(private readonly LoopResolverInterface $loopResolver) {}

    public function fetch(HostContext $context, string $source, array $options = []): iterable
    {
        return $this->loopResolver->resolve($source, $options);
    }
}
