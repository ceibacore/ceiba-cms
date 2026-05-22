<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Repository;

use LemurCms\PageBuilder\Domain\Entity\PageLayout;

interface PageLayoutRepositoryInterface
{
    /** @return PageLayout[] */
    public function findAll(): array;

    public function findById(string $id): ?PageLayout;

    /** Returns the first active layout (used as fallback when a page has no layout set). */
    public function findDefault(): ?PageLayout;

    /** Insert or update. Returns the layout id. */
    public function save(array $data): string;

    public function update(string $id, array $data): void;

    public function delete(string $id): void;
}
