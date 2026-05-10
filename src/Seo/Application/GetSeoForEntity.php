<?php
declare(strict_types=1);
namespace LemurCms\Seo\Application;
use LemurCms\Seo\Domain\Repository\SeoRepositoryInterface;
final class GetSeoForEntity
{
    public function __construct(private readonly SeoRepositoryInterface $repo) {}
    public function execute(string $entityType, int $entityId): ?array
    {
        return $this->repo->findByEntity($entityType, $entityId);
    }
}
