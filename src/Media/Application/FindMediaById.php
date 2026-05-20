<?php
declare(strict_types=1);
namespace LemurCms\Media\Application;

use LemurCms\Media\Domain\Repository\MediaRepositoryInterface;

final class FindMediaById
{
    public function __construct(private MediaRepositoryInterface $repo) {}

    public function execute(string $id): ?array
    {
        return $this->repo->findById($id);
    }
}
