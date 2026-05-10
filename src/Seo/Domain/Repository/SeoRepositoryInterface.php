<?php
declare(strict_types=1);
namespace LemurCms\Seo\Domain\Repository;
interface SeoRepositoryInterface
{
    public function findByEntity(string $entityType, int $entityId): ?array;
    public function upsert(string $entityType, int $entityId, array $data): void;
}
