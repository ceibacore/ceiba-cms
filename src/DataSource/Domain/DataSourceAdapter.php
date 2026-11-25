<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Domain;

/**
 * Port for one data source (plan 07). The host or the module implements it; it receives only validated queries.
 * It may return extra columns: the registry keeps only public fields.
 */
interface DataSourceAdapter
{
    public function descriptor(QueryContext $context): DataSourceDescriptor;

    /** @return array{items: list<array<string, mixed>>, total: ?int} */
    public function fetch(DataQuery $query, QueryContext $context): array;

    /** One record by its slug (sources with the `single` capability), or null. */
    public function findBySlug(string $slug, QueryContext $context): ?array;
}
