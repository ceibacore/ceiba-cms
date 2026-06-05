<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Service;

use LemurDB;
use LemurCms\Support\Exceptions\SecurityException;

final class QueryEngine
{
    private array $allowedModels = [];

    public function __construct(
        private readonly LemurDB $db,
        private readonly ContextResolver $contextResolver,
        array $allowedModels = []
    ) {
        $this->allowedModels = !empty($allowedModels) ? $allowedModels : [
            'Article' => 'articles',
            'Product' => 'products',
        ];
    }

    /**
     * Executes queries defined in page query config.
     * Returns an array mapping contextKey => resolvedData.
     */
    public function executeQueries(array $queryConfigs, array $routeParams = []): array
    {
        $context = [];
        foreach ($queryConfigs as $config) {
            $contextKey = $config['context_key'] ?? null;
            if ($contextKey === null) {
                continue;
            }
            $context[$contextKey] = $this->executeQuery($config, $routeParams);
        }
        return $context;
    }

    public function executeQuery(array $config, array $routeParams = []): array
    {
        $model = $config['model'] ?? '';
        if (!isset($this->allowedModels[$model])) {
            throw new SecurityException("Model '{$model}' is not whitelisted for dynamic queries.");
        }

        $tableName = $this->allowedModels[$model];
        $query     = $this->db->query($tableName);

        // 1. Select
        if (!empty($config['select'])) {
            $query->select($config['select']);
        }

        // 2. Filters
        if (!empty($config['filters']) && is_array($config['filters'])) {
            foreach ($config['filters'] as $filter) {
                $field    = $filter['field'] ?? null;
                $operator = $filter['operator'] ?? 'equals';
                $value    = $filter['value'] ?? null;

                if ($field === null) {
                    continue;
                }

                // Resolve bindings in filter values
                $resolvedValue = $this->contextResolver->resolve($value, $routeParams);

                $this->applyFilter($query, $field, $operator, $resolvedValue);
            }
        }

        // 3. Sort
        if (!empty($config['sort']) && is_array($config['sort'])) {
            foreach ($config['sort'] as $sortOption) {
                $field     = $sortOption['field'] ?? null;
                $direction = $sortOption['direction'] ?? 'asc';
                if ($field !== null) {
                    $query->orderBy($field, $direction);
                }
            }
        }

        // 4. Pagination / Limit
        $paginate = $config['paginate'] ?? [];
        if (isset($paginate['enabled']) && $paginate['enabled']) {
            $perPage = (int) ($paginate['per_page'] ?? 15);
            $param   = $paginate['param'] ?? 'page';
            $page    = (int) ($_GET[$param] ?? 1);
            if ($page < 1) {
                $page = 1;
            }
            $offset = ($page - 1) * $perPage;
            $query->limit($perPage, $offset);
        } elseif (isset($config['limit']) && $config['limit'] !== null) {
            $limit = (int) $config['limit'];
            $query->limit($limit);
        }

        return $query->get();
    }

    private function applyFilter(mixed $query, string $field, string $operator, mixed $value): void
    {
        $quotedField = "`" . str_replace("`", "``", $field) . "`";

        switch ($operator) {
            case 'equals':
                $query->where([$field => $value]);
                break;
            case 'not_equals':
                $query->whereRaw("{$quotedField} != ?", [$value]);
                break;
            case 'contains':
                $query->like($field, '%' . $value . '%');
                break;
            case 'not_contains':
                $query->whereRaw("{$quotedField} NOT LIKE ?", ['%' . $value . '%']);
                break;
            case 'starts_with':
                $query->like($field, $value . '%');
                break;
            case 'ends_with':
                $query->like($field, '%' . $value);
                break;
            case 'greater_than':
                $query->whereRaw("{$quotedField} > ?", [$value]);
                break;
            case 'less_than':
                $query->whereRaw("{$quotedField} < ?", [$value]);
                break;
            case 'greater_equal':
                $query->whereRaw("{$quotedField} >= ?", [$value]);
                break;
            case 'less_equal':
                $query->whereRaw("{$quotedField} <= ?", [$value]);
                break;
            case 'is_null':
                $query->whereRaw("{$quotedField} IS NULL");
                break;
            case 'is_not_null':
                $query->whereRaw("{$quotedField} IS NOT NULL");
                break;
        }
    }
}
