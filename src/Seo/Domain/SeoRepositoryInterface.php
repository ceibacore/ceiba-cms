<?php
declare(strict_types=1);
namespace CeibaCms\Seo\Domain;

interface SeoRepositoryInterface
{
    public function findByEntity(string $entityType, string|int $entityId): ?array;
    public function upsert(string $entityType, string|int $entityId, array $data): void;
}
