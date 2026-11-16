<?php
declare(strict_types=1);

namespace CeibaCms\Routing\Application;

use CeibaCms\Routing\Domain\Repository\ReservedPathRepositoryInterface;

final class RemoveReservedPath
{
    public function __construct(private readonly ReservedPathRepositoryInterface $repo) {}

    public function execute(string $id): void
    {
        $this->repo->delete($id);
    }
}
