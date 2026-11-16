<?php
declare(strict_types=1);

namespace CeibaCms\PageBuilder\Application;

use CeibaCms\PageBuilder\Domain\Repository\PageLayoutRepositoryInterface;

final class DeleteLayout
{
    public function __construct(private readonly PageLayoutRepositoryInterface $repo) {}

    public function execute(string $id): void
    {
        $this->repo->delete($id);
    }
}
