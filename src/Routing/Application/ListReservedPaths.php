<?php
declare(strict_types=1);

namespace CeibaCms\Routing\Application;

use CeibaCms\Routing\Domain\Repository\ReservedPathRepositoryInterface;

final class ListReservedPaths
{
    public function __construct(private readonly ReservedPathRepositoryInterface $repo) {}

    public function execute(): array
    {
        return $this->repo->findAll();
    }
}
