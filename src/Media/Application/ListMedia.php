<?php
declare(strict_types=1);
namespace CeibaCms\Media\Application;

use CeibaCms\Media\Domain\Repository\MediaRepositoryInterface;

final class ListMedia
{
    public function __construct(private MediaRepositoryInterface $repo) {}

    public function execute(int $limit = 20, int $offset = 0): array
    {
        return $this->repo->findAll($limit, $offset);
    }
}
