<?php
declare(strict_types=1);
namespace LemurCms\Tests\Seo\Application;

use LemurCms\Seo\Application\UpsertSeo;
use LemurCms\Seo\Domain\Repository\SeoRepositoryInterface;
use PHPUnit\Framework\TestCase;

class UpsertSeoTest extends TestCase
{
    public function testExecuteCallsUpsert(): void
    {
        $repo = $this->createMock(SeoRepositoryInterface::class);
        $repo->expects($this->once())->method('upsert')
            ->with('page', 1, ['meta_title' => 'Test']);

        $useCase = new UpsertSeo($repo);
        $useCase->execute('page', 1, ['meta_title' => 'Test']);
    }
}
