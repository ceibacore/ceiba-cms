<?php
declare(strict_types=1);
namespace LemurCms\Page\Application;
use LemurCms\Page\Domain\Repository\PageRepositoryInterface;
final class GetPageBySlug
{
    public function __construct(private readonly PageRepositoryInterface $repo) {}
    public function execute(string $slug): ?array
    {
        return $this->repo->findBySlug($slug);
    }
}
