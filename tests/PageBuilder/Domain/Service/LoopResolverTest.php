<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Domain\Service;

use LemurCms\PageBuilder\Domain\Service\LoopResolver;
use LemurCms\PageBuilder\Domain\Service\DataProviderInterface;
use PHPUnit\Framework\TestCase;

class LoopResolverTest extends TestCase
{
    public function testResolveReturnsEmptyForUnknownSource(): void
    {
        $resolver = new LoopResolver();
        $result = $resolver->resolve('nonexistent');
        $this->assertEmpty($result);
    }

    public function testResolveReturnsDataProviderData(): void
    {
        $mockProvider = $this->createMock(DataProviderInterface::class);
        $mockProvider->method('getData')->willReturn(['item1', 'item2', 'item3']);

        $resolver = new LoopResolver();
        $resolver->register('test_source', $mockProvider);

        $result = $resolver->resolve('test_source');
        $this->assertEquals(['item1', 'item2', 'item3'], $result);
    }

    public function testResolveAppliesLimitAndOffset(): void
    {
        $mockProvider = $this->createMock(DataProviderInterface::class);
        $mockProvider->method('getData')->willReturn(['a', 'b', 'c', 'd', 'e']);

        $resolver = new LoopResolver();
        $resolver->register('letters', $mockProvider);

        // Limit only
        $limitResult = $resolver->resolve('letters', ['limit' => 2]);
        $this->assertEquals(['a', 'b'], $limitResult);

        // Offset only
        $offsetResult = $resolver->resolve('letters', ['offset' => 2]);
        $this->assertEquals(['c', 'd', 'e'], $offsetResult);

        // Offset & Limit
        $bothResult = $resolver->resolve('letters', ['offset' => 1, 'limit' => 3]);
        $this->assertEquals(['b', 'c', 'd'], $bothResult);
    }
}
