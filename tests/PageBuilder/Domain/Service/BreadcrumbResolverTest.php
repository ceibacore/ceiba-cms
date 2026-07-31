<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Domain\Service;

use LemurCms\Page\Domain\Repository\PageRepositoryInterface;
use LemurCms\PageBuilder\Domain\Service\BreadcrumbResolver;
use PHPUnit\Framework\TestCase;

class BreadcrumbResolverTest extends TestCase
{
    private $mockPageRepo;
    private BreadcrumbResolver $resolver;

    protected function setUp(): void
    {
        parent::setUp();
        $this->mockPageRepo = $this->createMock(PageRepositoryInterface::class);
        $this->resolver = new BreadcrumbResolver($this->mockPageRepo);
    }

    public function testResolveReturnsEmptyForUnknownPage(): void
    {
        $this->mockPageRepo
            ->expects($this->once())
            ->method('findById')
            ->with('unknown-id')
            ->willReturn(null);

        $result = $this->resolver->resolve('unknown-id');
        $this->assertSame([], $result);
    }

    public function testResolveReturnsEmptyForRootSlug(): void
    {
        $this->mockPageRepo
            ->expects($this->once())
            ->method('findById')
            ->with('page-1')
            ->willReturn(['id' => 'page-1', 'slug' => '/', 'title' => 'Home']);

        $result = $this->resolver->resolve('page-1');
        $this->assertSame([], $result);
    }

    public function testResolveReturnsSingleSegment(): void
    {
        $this->mockPageRepo
            ->expects($this->once())
            ->method('findById')
            ->with('page-2')
            ->willReturn(['id' => 'page-2', 'slug' => 'about-us', 'title' => 'About']);

        $result = $this->resolver->resolve('page-2');

        $this->assertCount(1, $result);
        $this->assertSame('About Us', $result[0]['label']);
        $this->assertSame('/about-us', $result[0]['url']);
    }

    public function testResolveReturnsMultipleSegments(): void
    {
        $this->mockPageRepo
            ->expects($this->once())
            ->method('findById')
            ->with('page-3')
            ->willReturn(['id' => 'page-3', 'slug' => 'blog/tutorials/php-basics', 'title' => 'PHP Basics']);

        $result = $this->resolver->resolve('page-3');

        $this->assertCount(3, $result);
        $this->assertSame('Blog', $result[0]['label']);
        $this->assertSame('/blog', $result[0]['url']);
        $this->assertSame('Tutorials', $result[1]['label']);
        $this->assertSame('/blog/tutorials', $result[1]['url']);
        $this->assertSame('Php Basics', $result[2]['label']);
        $this->assertSame('/blog/tutorials/php-basics', $result[2]['url']);
    }
}
