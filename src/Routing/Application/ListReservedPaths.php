<?php
declare(strict_types=1);

namespace LemurCms\Routing\Application;

use LemurCms\Routing\Domain\Repository\ReservedPathRepositoryInterface;

final class ListReservedPaths
{
    public function __construct(private readonly ReservedPathRepositoryInterface $repo) {}

    public function execute(): array
    {
        return $this->repo->findAll();
    }
}
