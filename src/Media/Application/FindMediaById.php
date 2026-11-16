<?php
declare(strict_types=1);
namespace CeibaCms\Media\Application;

use CeibaCms\Media\Domain\Repository\MediaRepositoryInterface;

final class FindMediaById
{
    public function __construct(private MediaRepositoryInterface $repo) {}

    public function execute(string $id): ?array
    {
        return $this->repo->findById($id);
    }
}
