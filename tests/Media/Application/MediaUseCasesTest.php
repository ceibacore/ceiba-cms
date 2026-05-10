<?php
declare(strict_types=1);
namespace LemurCms\Tests\Media\Application;

use LemurCms\Media\Application\DeleteMedia;
use LemurCms\Media\Application\ListMedia;
use LemurCms\Media\Application\FindMediaById;
use LemurCms\Media\Domain\MediaRepositoryInterface;
use PHPUnit\Framework\TestCase;

class DeleteMediaTest extends TestCase
{
    public function testExecuteDeletesMedia(): void
    {
        $repo = $this->createMock(MediaRepositoryInterface::class);
        $repo->expects($this->once())->method('delete')->with(1);

        $useCase = new DeleteMedia($repo);
        $useCase->execute(1);
    }
}

class ListMediaTest extends TestCase
{
    public function testExecuteReturnsPaginatedList(): void
    {
        $media = [['id' => 1, 'filename' => 'test.jpg']];
        
        $repo = $this->createMock(MediaRepositoryInterface::class);
        $repo->method('findAll')->willReturn($media);

        $useCase = new ListMedia($repo);
        $result = $useCase->execute(20, 0);

        $this->assertEquals($media, $result);
    }
}

class FindMediaByIdTest extends TestCase
{
    public function testExecuteReturnsMedia(): void
    {
        $media = ['id' => 1, 'filename' => 'test.jpg'];
        
        $repo = $this->createMock(MediaRepositoryInterface::class);
        $repo->method('findById')->willReturn($media);

        $useCase = new FindMediaById($repo);
        $result = $useCase->execute(1);

        $this->assertEquals($media, $result);
    }
}
