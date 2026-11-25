<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Domain;

/**
 * A query against a registered source (plan 07, D-1/D-5): filters with enumerated operators, sort, search and a
 * page. No SQL, table names or expressions. Built from a document's `queries[]` entry or an API body.
 */
final class DataQuery
{
    /**
     * @param list<array{field: string, op: string, value: mixed}> $filters
     * @param list<array{field: string, direction: string}> $sort
     */
    public function __construct(
        public readonly string $source,
        public readonly array $filters = [],
        public readonly array $sort = [],
        public readonly ?string $search = null,
        public readonly int $page = 1,
        public readonly int $pageSize = 12,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        $source = $data['source'] ?? null;
        if (!is_string($source) || $source === '') {
            throw new InvalidDataQuery('QUERY_SOURCE', 'source', 'The query needs a source.');
        }
        $filters = [];
        foreach (self::list($data['filters'] ?? [], 'filters') as $i => $filter) {
            if (!is_array($filter) || !is_string($filter['field'] ?? null) || !is_string($filter['op'] ?? null)) {
                throw new InvalidDataQuery('QUERY_FILTER', "filters.{$i}", 'Each filter needs field and op.');
            }
            $filters[] = ['field' => $filter['field'], 'op' => $filter['op'], 'value' => $filter['value'] ?? null];
        }
        $sort = [];
        foreach (self::list($data['sort'] ?? [], 'sort') as $i => $entry) {
            $direction = strtolower((string) ($entry['direction'] ?? 'asc'));
            if (!is_array($entry) || !is_string($entry['field'] ?? null) || !in_array($direction, ['asc', 'desc'], true)) {
                throw new InvalidDataQuery('QUERY_SORT', "sort.{$i}", 'Each sort needs a field and asc or desc.');
            }
            $sort[] = ['field' => $entry['field'], 'direction' => $direction];
        }
        $search = isset($data['search']) && $data['search'] !== '' ? trim((string) $data['search']) : null;

        return new self($source, $filters, $sort, $search === '' ? null : mb_substr((string) $search, 0, 100),
            self::int($data['page'] ?? 1, 'page'), self::int($data['page_size'] ?? $data['pageSize'] ?? 12, 'page_size'));
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return ['source' => $this->source, 'filters' => $this->filters, 'sort' => $this->sort, 'search' => $this->search,
            'page' => $this->page, 'page_size' => $this->pageSize];
    }

    public function offset(): int
    {
        return ($this->page - 1) * $this->pageSize;
    }

    /** @return list<mixed> */
    private static function list(mixed $value, string $path): array
    {
        if (!is_array($value) || !array_is_list($value)) {
            throw new InvalidDataQuery('QUERY_SHAPE', $path, "{$path} must be a list.");
        }

        return $value;
    }

    private static function int(mixed $value, string $path): int
    {
        if (!is_int($value) && !(is_string($value) && ctype_digit($value))) {
            throw new InvalidDataQuery('QUERY_NUMBER', $path, "{$path} must be a whole number.");
        }

        return (int) $value;
    }
}
