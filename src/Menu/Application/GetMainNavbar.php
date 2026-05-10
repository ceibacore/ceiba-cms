<?php
declare(strict_types=1);
namespace LemurCms\Menu\Application;
use LemurCms\Menu\Domain\Repository\MenuRepositoryInterface;
final class GetMainNavbar
{
    public function __construct(private readonly MenuRepositoryInterface $repo) {}
    public function execute(string $currentUrl): array
    {
        return [
            'menu'    => $this->repo->getMenuTree('main'),
            'logo'    => $this->repo->getActiveLogo(),
            'above'   => $this->repo->getActiveBanners('above'),
            'below'   => $this->repo->getActiveBanners('below'),
            'current' => $currentUrl,
        ];
    }
}
