<?php
declare(strict_types=1);
namespace CeibaCms\Menu\Application;

use CeibaCms\Menu\Domain\Repository\MenuRepositoryInterface;

final class SaveLogo
{
    public function __construct(private MenuRepositoryInterface $repo) {}

    public function execute(array $data): int
    {
        return $this->repo->saveLogo($data);
    }
}
