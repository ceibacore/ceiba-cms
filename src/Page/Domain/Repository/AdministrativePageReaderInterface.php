<?php
declare(strict_types=1);

namespace LemurCms\Page\Domain\Repository;

/**
 * Administrative read model including drafts. Kept separate from
 * PageRepositoryInterface so hosts implementing that 1.x contract do not break.
 */
interface AdministrativePageReaderInterface
{
    /** @return array<int, array<string, mixed>> */
    public function findAdministrative(?string $status, ?string $search, int $limit, int $offset): array;
}
