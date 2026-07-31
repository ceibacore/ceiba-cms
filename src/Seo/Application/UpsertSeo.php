<?php
declare(strict_types=1);
namespace LemurCms\Seo\Application;

use LemurCms\Seo\Domain\Repository\SeoRepositoryInterface;

final class UpsertSeo
{
    public function __construct(private SeoRepositoryInterface $repo) {}

    public function execute(string $entityType, string|int $entityId, array $data): void
    {
        $this->repo->upsert($entityType, $entityId, $data);
    }
}
