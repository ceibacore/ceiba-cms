<?php
declare(strict_types=1);

namespace LemurCms\Routing\Application;

use LemurCms\Routing\Domain\Repository\ReservedPathRepositoryInterface;

final class RemoveReservedPath
{
    public function __construct(private readonly ReservedPathRepositoryInterface $repo) {}

    public function execute(string $id): void
    {
        $this->repo->delete($id);
    }
}
