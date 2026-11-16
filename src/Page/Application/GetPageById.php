<?php
declare(strict_types=1);
namespace CeibaCms\Page\Application;

use CeibaCms\Page\Domain\Repository\PageRepositoryInterface;

final class GetPageById
{
    public function __construct(private readonly PageRepositoryInterface $repo) {}

    public function execute(string $id): ?array
    {
        return $this->repo->findById($id);
    }
}
