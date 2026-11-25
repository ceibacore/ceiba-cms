<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Domain;

/**
 * Checks a query against its source before anything runs (plan 07, D-1): every field must be public and known,
 * every operator allowed for its type, every value of that type, and page and size within the limits. Returns the
 * query with normalised values; throws InvalidDataQuery on the first problem.
 */
final class QueryValidator
{
    public const MAX_FILTERS = 10;
    public const MAX_SORTS = 3;
    public const MAX_IN_VALUES = 50;
    public const MAX_OFFSET = 10000;

    public function validate(DataQuery $query, DataSourceDescriptor $source, QueryContext $context): DataQuery
    {
        if (count($query->filters) > self::MAX_FILTERS) {
            throw new InvalidDataQuery('QUERY_LIMIT', 'filters', 'Too many filters.');
        }
        $filters = [];
        foreach ($query->filters as $i => $filter) {
            $field = $source->publicField($filter['field'])
                ?? throw new InvalidDataQuery('QUERY_FIELD', "filters.{$i}.field", "Unknown field '{$filter['field']}'.");
            if (!in_array($filter['op'], $field->operators(), true)) {
                throw new InvalidDataQuery('QUERY_OPERATOR', "filters.{$i}.op", "Operator '{$filter['op']}' is not allowed on '{$field->name}'.");
            }
            $filters[] = ['field' => $field->name, 'op' => $filter['op'], 'value' => $this->value($field, $filter['op'], $filter['value'], "filters.{$i}.value")];
        }

        if (count($query->sort) > self::MAX_SORTS) {
            throw new InvalidDataQuery('QUERY_LIMIT', 'sort', 'Too many sort fields.');
        }
        foreach ($query->sort as $i => $sort) {
            $field = $source->publicField($sort['field']);
            if ($field === null || !$field->isSortable()) {
                throw new InvalidDataQuery('QUERY_SORT', "sort.{$i}.field", "Cannot sort by '{$sort['field']}'.");
            }
        }
        $sort = $query->sort !== [] ? $query->sort : ($source->defaultSort !== null ? [$source->defaultSort] : []);

        if ($query->search !== null && (!$source->has('search') || $source->searchableFields() === [])) {
            throw new InvalidDataQuery('QUERY_SEARCH', 'search', "Source '{$source->id}' cannot be searched.");
        }
        $maxSize = min($source->maxPageSize, $context->maxPageSize);
        if ($query->pageSize < 1 || $query->pageSize > $maxSize) {
            throw new InvalidDataQuery('QUERY_PAGE_SIZE', 'page_size', "Page size must be between 1 and {$maxSize}.");
        }
        if ($query->page < 1 || ($query->page > 1 && !$source->has('pagination'))) {
            throw new InvalidDataQuery('QUERY_PAGE', 'page', 'Invalid page.');
        }
        if ($query->offset() > self::MAX_OFFSET) {
            throw new InvalidDataQuery('QUERY_PAGE', 'page', 'The page is too far.');
        }

        return new DataQuery($source->id, $filters, $sort, $query->search, $query->page, $query->pageSize);
    }

    private function value(FieldDescriptor $field, string $op, mixed $value, string $path): mixed
    {
        if ($op === 'is_null' || $op === 'not_null') {
            return null;
        }
        if ($op === 'in') {
            if (!is_array($value) || !array_is_list($value) || $value === [] || count($value) > self::MAX_IN_VALUES) {
                throw new InvalidDataQuery('QUERY_VALUE', $path, "'in' needs a list of 1 to " . self::MAX_IN_VALUES . ' values.');
            }

            return array_map(fn ($v) => $this->scalar($field, $v, $path), $value);
        }

        return $this->scalar($field, $value, $path);
    }

    private function scalar(FieldDescriptor $field, mixed $value, string $path): mixed
    {
        $fail = fn () => throw new InvalidDataQuery('QUERY_VALUE', $path, "Invalid value for '{$field->name}' ({$field->type}).");
        if (!is_scalar($value)) {
            $fail();
        }

        return match ($field->type) {
            'number' => filter_var($value, FILTER_VALIDATE_INT) !== false ? (int) $value : $fail(),
            'decimal' => is_numeric($value) ? (string) $value : $fail(),
            'boolean' => ($b = filter_var($value, FILTER_VALIDATE_BOOL, FILTER_NULL_ON_FAILURE)) !== null ? $b : $fail(),
            'date' => $this->date((string) $value, 'Y-m-d') ?? $fail(),
            'datetime' => $this->date((string) $value, 'Y-m-d H:i:s') ?? $fail(),
            'select' => $field->options === [] || in_array((string) $value, $field->options, true) ? (string) $value : $fail(),
            default => mb_strlen((string) $value) <= 255 ? (string) $value : $fail(),
        };
    }

    private function date(string $value, string $format): ?string
    {
        try {
            return (new \DateTimeImmutable($value))->format($format);
        } catch (\Exception) {
            return null;
        }
    }
}
