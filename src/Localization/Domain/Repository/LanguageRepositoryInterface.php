<?php
declare(strict_types=1);

namespace LemurCms\Localization\Domain\Repository;

interface LanguageRepositoryInterface
{
    /**
     * Get all languages.
     *
     * @return array<array<string, mixed>>
     */
    public function all(): array;

    /**
     * Find a language by its ID.
     */
    public function find(string $id): ?array;

    /**
     * Find a language by its ISO code (e.g. 'es', 'en').
     */
    public function findByCode(string $code): ?array;

    /**
     * Create a new language. Returns the ID of the created language.
     */
    public function create(array $data): string;

    /**
     * Update a language by ID.
     */
    public function update(string $id, array $data): void;

    /**
     * Delete a language by ID.
     */
    public function delete(string $id): void;
}
