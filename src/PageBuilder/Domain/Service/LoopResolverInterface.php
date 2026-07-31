<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Service;

interface LoopResolverInterface
{
    public function register(string $name, DataProviderInterface $provider): void;
    public function resolve(string $source, array $options = []): iterable;
}
