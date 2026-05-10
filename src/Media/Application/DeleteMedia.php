<?php
declare(strict_types=1);
namespace LemurCms\Media\Application;

use LemurCms\Media\Domain\MediaRepositoryInterface;

final class DeleteMedia
{
    public function __construct(private MediaRepositoryInterface $repo) {}

    public function execute(int $id): void
    {
        $this->repo->delete($id);
    }
}
