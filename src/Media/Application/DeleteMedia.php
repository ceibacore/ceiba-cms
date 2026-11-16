<?php
declare(strict_types=1);
namespace CeibaCms\Media\Application;

use CeibaCms\Media\Domain\Repository\MediaRepositoryInterface;

final class DeleteMedia
{
    public function __construct(private MediaRepositoryInterface $repo) {}

    public function execute(string $id): void
    {
        $this->repo->delete($id);
    }
}
