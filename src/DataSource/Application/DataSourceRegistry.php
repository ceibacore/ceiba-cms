<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Application;

use CeibaCms\DataSource\Domain\DataQuery;
use CeibaCms\DataSource\Domain\DataSourceAdapter;
use CeibaCms\DataSource\Domain\DataSourceDescriptor;
use CeibaCms\DataSource\Domain\DataSourceProvider;
use CeibaCms\DataSource\Domain\InvalidDataQuery;
use CeibaCms\DataSource\Domain\QueryContext;
use CeibaCms\DataSource\Domain\QueryResult;
use CeibaCms\DataSource\Domain\QueryValidator;

/**
 * Every data source a site can use (plan 07, D-1): adapters registered by the host plus those of providers (dynamic
 * modules). Queries are validated before the adapter runs and results are cut to public fields after it.
 */
final class DataSourceRegistry
{
    /** @var list<DataSourceAdapter> */
    private array $adapters = [];
    /** @var list<DataSourceProvider> */
    private array $providers = [];

    public function __construct(private readonly QueryValidator $validator = new QueryValidator()) {}

    public function register(DataSourceAdapter $adapter): void
    {
        $this->adapters[] = $adapter;
    }

    public function addProvider(DataSourceProvider $provider): void
    {
        $this->providers[] = $provider;
    }

    /** @return array<string, DataSourceDescriptor> */
    public function descriptors(QueryContext $context): array
    {
        $out = [];
        foreach ($this->resolved($context) as $id => [$descriptor]) {
            $out[$id] = $descriptor;
        }

        return $out;
    }

    public function descriptor(string $id, QueryContext $context): DataSourceDescriptor
    {
        return $this->entry($id, $context)[0];
    }

    public function query(DataQuery $query, QueryContext $context): QueryResult
    {
        [$descriptor, $adapter] = $this->entry($query->source, $context);
        $valid = $this->validator->validate($query, $descriptor, $context);
        $raw = $adapter->fetch($valid, $context);
        $items = array_map(fn (array $row) => $this->project($row, $descriptor), array_slice($raw['items'] ?? [], 0, $valid->pageSize));

        return new QueryResult(array_values($items), $valid->page, $valid->pageSize, isset($raw['total']) ? (int) $raw['total'] : null);
    }

    /** @return array<string, mixed>|null */
    public function single(string $sourceId, string $slug, QueryContext $context): ?array
    {
        [$descriptor, $adapter] = $this->entry($sourceId, $context);
        if (!$descriptor->has('single') || $descriptor->slugField === null) {
            throw new InvalidDataQuery('QUERY_SINGLE', 'source', "Source '{$sourceId}' has no single records.");
        }
        $row = $adapter->findBySlug($slug, $context);

        return $row === null ? null : $this->project($row, $descriptor);
    }

    /** @return array<string, mixed> only the public fields, plus `{relation}_label` of public relations */
    private function project(array $row, DataSourceDescriptor $descriptor): array
    {
        $out = [];
        foreach ($descriptor->publicFields() as $name => $field) {
            $out[$name] = $row[$name] ?? null;
            if ($field->type === 'relation') {
                $out["{$name}_label"] = $row["{$name}_label"] ?? null;
            }
        }

        return $out;
    }

    /** @return array{0: DataSourceDescriptor, 1: DataSourceAdapter} */
    private function entry(string $id, QueryContext $context): array
    {
        return $this->resolved($context)[$id] ?? throw new InvalidDataQuery('QUERY_SOURCE', 'source', "Unknown data source '{$id}'.");
    }

    /** @return array<string, array{0: DataSourceDescriptor, 1: DataSourceAdapter}> */
    private function resolved(QueryContext $context): array
    {
        $all = $this->adapters;
        foreach ($this->providers as $provider) {
            array_push($all, ...$provider->adapters($context));
        }
        $out = [];
        foreach ($all as $adapter) {
            try {
                $descriptor = $adapter->descriptor($context);
            } catch (\InvalidArgumentException) {
                continue; // a source that cannot describe itself (e.g. a module slug outside the id format) is left out
            }
            $out[$descriptor->id] ??= [$descriptor, $adapter]; // the host's own adapters win over generated ones
        }

        return $out;
    }
}
