<?php
declare(strict_types=1);
namespace CeibaCms\Page\Application;
use CeibaCms\Page\Domain\Repository\PageRepositoryInterface;
final class GetPageBySlug
{
    public function __construct(private readonly PageRepositoryInterface $repo) {}
    public function execute(string $slug): ?array
    {
        return $this->repo->findBySlug($slug);
    }
}
