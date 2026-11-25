<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Infrastructure;

use CeibaCms\DataSource\Domain\DataQuery;
use CeibaDB;

/**
 * Runs a validated query on a dynamic module table (plan 07-A). Field names were checked against the module's
 * public fields by QueryValidator, so they are safe column names; values are always bound. Soft-deleted rows never
 * appear, and the id breaks ties so pages never repeat or skip a record.
 */
final class ModuleQueryRunner
{
    public function __construct(private readonly CeibaDB $db) {}

    /**
     * @param list<string> $searchFields
     * @return array{items: list<array<string, mixed>>, total: int}
     */
    public function run(string $table, DataQuery $query, array $searchFields): array
    {
        $rows = $this->filtered($table, $query, $searchFields);
        foreach ($query->sort as $sort) {
            $rows->orderBy($sort['field'], strtoupper($sort['direction']));
        }
        $rows->orderBy('id', 'ASC')->limit($query->pageSize, $query->offset());

        return ['items' => $rows->get(), 'total' => $this->filtered($table, $query, $searchFields)->count()];
    }

    public function findBy(string $table, string $field, string $value): ?array
    {
        return $this->db->query($table)->whereNull('deleted_at')->where($field, '=', $value)->first();
    }

    /** @param list<string> $searchFields */
    private function filtered(string $table, DataQuery $query, array $searchFields): mixed
    {
        $q = $this->db->query($table)->whereNull('deleted_at');
        foreach ($query->filters as $filter) {
            $field = $filter['field'];
            $value = $filter['value'];
            match ($filter['op']) {
                'eq' => $q->where($field, '=', $value),
                'neq' => $q->where($field, '!=', $value),
                'gt' => $q->where($field, '>', $value),
                'gte' => $q->where($field, '>=', $value),
                'lt' => $q->where($field, '<', $value),
                'lte' => $q->where($field, '<=', $value),
                'in' => $q->whereIn($field, $value),
                'contains' => $q->whereRaw("`{$field}` LIKE ? ESCAPE '!'", ['%' . self::escapeLike((string) $value) . '%']),
                'starts_with' => $q->whereRaw("`{$field}` LIKE ? ESCAPE '!'", [self::escapeLike((string) $value) . '%']),
                'is_null' => $q->whereNull($field),
                'not_null' => $q->whereNotNull($field),
            };
        }
        if ($query->search !== null && $searchFields !== []) {
            $sql = implode(' OR ', array_map(fn (string $f) => "`{$f}` LIKE ? ESCAPE '!'", $searchFields));
            $q->whereRaw("({$sql})", array_fill(0, count($searchFields), '%' . self::escapeLike($query->search) . '%'));
        }

        return $q;
    }

    private static function escapeLike(string $value): string
    {
        return strtr($value, ['!' => '!!', '%' => '!%', '_' => '!_']); // ESCAPE '!' works in MySQL/MariaDB and SQLite
    }
}
