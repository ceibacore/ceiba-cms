<?php
declare(strict_types=1);
namespace LemurCms\Media\Application;
use LemurCms\Media\Domain\Repository\MediaRepositoryInterface;
final class StoreMedia
{
    public function __construct(private readonly MediaRepositoryInterface $repo) {}
    public function execute(array $data): string
    {
        return $this->repo->store($data);
    }
}
