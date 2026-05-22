<?php
declare(strict_types=1);

namespace LemurCms\DynamicModule\Infrastructure;

use LemurCms\DynamicModule\Domain\Repository\GenericModuleRepositoryInterface;
use LemurDB;

final class GenericModuleRepository implements GenericModuleRepositoryInterface
{
    public function __construct(private readonly LemurDB $db) {}

    public function list(string $table, array $filters = [], array $sort = [], int $limit = 50, int $offset = 0): array
    {
        $prefix = $this->db->getPrefix();
        $mainTablePrefixed = $prefix . $table;

        $query = $this->db->query($table);
        
        // Exclude soft deleted records
        $query->whereRaw("`{$mainTablePrefixed}`.`deleted_at` IS NULL");

        // Parse relations for joins
        $slug = str_starts_with($table, 'cms_') ? substr($table, 4) : $table;
        
        // Find module definition
        $defRow = $this->db->query('module_definitions')
            ->join($prefix . 'modules', "`{$prefix}module_definitions`.`module_id` = `{$prefix}modules`.`id`")
            ->select(["`{$prefix}module_definitions`.*", "`{$prefix}modules`.`slug` as module_slug"])
            ->where(["{$prefix}modules.slug" => $slug])
            ->first();

        $selects = ["`{$mainTablePrefixed}`.*"];
        $relations = [];

        if ($defRow && isset($defRow['fields_schema'])) {
            $schema = json_decode($defRow['fields_schema'], true);
            if (is_array($schema)) {
                foreach ($schema as $f) {
                    if (isset($f['type']) && $f['type'] === 'relation' && !empty($f['relationTarget'])) {
                        $relations[] = $f;
                    }
                }
            }
        }

        foreach ($relations as $f) {
            $fieldName = $f['name'];
            $relationTargetSlug = $f['relationTarget'];
            
            // Determine target table
            // Check if target module is dynamic (exists in module_definitions)
            $targetDef = $this->db->query('module_definitions')
                ->join($prefix . 'modules', "`{$prefix}module_definitions`.`module_id` = `{$prefix}modules`.`id`")
                ->where(["{$prefix}modules.slug" => $relationTargetSlug])
                ->first();

            $targetTable = $targetDef ? "cms_" . $relationTargetSlug : $relationTargetSlug;
            $targetTablePrefixed = $prefix . $targetTable;
            
            $labelCol = $this->getLabelColumn($relationTargetSlug);
            
            $query->leftJoin(
                "`{$targetTablePrefixed}`",
                "`{$mainTablePrefixed}`.`{$fieldName}` = `{$targetTablePrefixed}`.`id`"
            );
            
            $selects[] = "`{$targetTablePrefixed}`.`{$labelCol}` AS `{$fieldName}_label`";
        }

        $query->select($selects);

        // Apply filters
        foreach ($filters as $col => $val) {
            if ($val === null || $val === '') {
                continue;
            }
            if ($col === 'search' && !empty($val)) {
                // Search across all searchable text columns
                $searchFields = [];
                if ($defRow && isset($defRow['fields_schema'])) {
                    $schema = json_decode($defRow['fields_schema'], true) ?? [];
                    foreach ($schema as $sf) {
                        if (($sf['isSearchable'] ?? true) && in_array($sf['type'], ['text', 'textarea', 'richtext'])) {
                            $searchFields[] = $sf['name'];
                        }
                    }
                }
                
                if (!empty($searchFields)) {
                    $orConditions = [];
                    $bindParams = [];
                    foreach ($searchFields as $sf) {
                        $orConditions[] = "`{$mainTablePrefixed}`.`{$sf}` LIKE ?";
                        $bindParams[] = "%{$val}%";
                    }
                    $query->whereRaw("(" . implode(" OR ", $orConditions) . ")", $bindParams);
                }
            } else {
                // Exact match
                $query->where(["{$mainTablePrefixed}.{$col}" => $val]);
            }
        }

        // Apply sorting
        if (!empty($sort)) {
            $col = $sort['column'] ?? 'created_at';
            $dir = $sort['direction'] ?? 'DESC';
            $query->orderBy("`{$mainTablePrefixed}`.`{$col}`", $dir);
        } else {
            $query->orderBy("`{$mainTablePrefixed}`.`created_at`", 'DESC');
        }

        // Apply limit and offset
        $query->limit($limit, $offset);

        return $query->get();
    }

    public function findById(string $table, string $id): ?array
    {
        $prefix = $this->db->getPrefix();
        $mainTablePrefixed = $prefix . $table;

        $query = $this->db->query($table);
        $query->whereRaw("`{$mainTablePrefixed}`.`deleted_at` IS NULL");
        $query->where(["{$mainTablePrefixed}.id" => $id]);

        // Parse relations for joins
        $slug = str_starts_with($table, 'cms_') ? substr($table, 4) : $table;
        
        // Find module definition
        $defRow = $this->db->query('module_definitions')
            ->join($prefix . 'modules', "`{$prefix}module_definitions`.`module_id` = `{$prefix}modules`.`id`")
            ->select(["`{$prefix}module_definitions`.*", "`{$prefix}modules`.`slug` as module_slug"])
            ->where(["{$prefix}modules.slug" => $slug])
            ->first();

        $selects = ["`{$mainTablePrefixed}`.*"];
        $relations = [];

        if ($defRow && isset($defRow['fields_schema'])) {
            $schema = json_decode($defRow['fields_schema'], true);
            if (is_array($schema)) {
                foreach ($schema as $f) {
                    if (isset($f['type']) && $f['type'] === 'relation' && !empty($f['relationTarget'])) {
                        $relations[] = $f;
                    }
                }
            }
        }

        foreach ($relations as $f) {
            $fieldName = $f['name'];
            $relationTargetSlug = $f['relationTarget'];
            
            $targetDef = $this->db->query('module_definitions')
                ->join($prefix . 'modules', "`{$prefix}module_definitions`.`module_id` = `{$prefix}modules`.`id`")
                ->where(["{$prefix}modules.slug" => $relationTargetSlug])
                ->first();

            $targetTable = $targetDef ? "cms_" . $relationTargetSlug : $relationTargetSlug;
            $targetTablePrefixed = $prefix . $targetTable;
            
            $labelCol = $this->getLabelColumn($relationTargetSlug);
            
            $query->leftJoin(
                "`{$targetTablePrefixed}`",
                "`{$mainTablePrefixed}`.`{$fieldName}` = `{$targetTablePrefixed}`.`id`"
            );
            
            $selects[] = "`{$targetTablePrefixed}`.`{$labelCol}` AS `{$fieldName}_label`";
        }

        $query->select($selects);
        return $query->first();
    }

    public function create(string $table, array $data): string
    {
        if (empty($data['id'])) {
            $data['id'] = \LemurCms\Support\Helpers\UuidHelper::v4();
        }
        $data['created_at'] = date('Y-m-d H:i:s');
        $data['updated_at'] = date('Y-m-d H:i:s');
        $data['deleted_at'] = null;

        $this->db->query($table)->insert($data);
        return $data['id'];
    }

    public function update(string $table, string $id, array $data): void
    {
        unset($data['id']);
        unset($data['created_at']);
        $data['updated_at'] = date('Y-m-d H:i:s');

        $this->db->query($table)->where(['id' => $id])->update($data);
    }

    public function delete(string $table, string $id): void
    {
        $this->db->query($table)->where(['id' => $id])->update([
            'deleted_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);
    }

    public function forceDelete(string $table, string $id): void
    {
        $this->db->query($table)->where(['id' => $id])->delete();
    }

    public function count(string $table, array $filters = []): int
    {
        $prefix = $this->db->getPrefix();
        $mainTablePrefixed = $prefix . $table;

        $query = $this->db->query($table);
        $query->whereRaw("`{$mainTablePrefixed}`.`deleted_at` IS NULL");

        foreach ($filters as $col => $val) {
            if ($val === null || $val === '') {
                continue;
            }
            if ($col === 'search') {
                $slug = str_starts_with($table, 'cms_') ? substr($table, 4) : $table;
                $defRow = $this->db->query('module_definitions')
                    ->join($prefix . 'modules', "`{$prefix}module_definitions`.`module_id` = `{$prefix}modules`.`id`")
                    ->where(["{$prefix}modules.slug" => $slug])
                    ->first();
                $searchFields = [];
                if ($defRow && isset($defRow['fields_schema'])) {
                    $schema = json_decode($defRow['fields_schema'], true) ?? [];
                    foreach ($schema as $sf) {
                        if (($sf['isSearchable'] ?? true) && in_array($sf['type'], ['text', 'textarea', 'richtext'])) {
                            $searchFields[] = $sf['name'];
                        }
                    }
                }
                
                if (!empty($searchFields)) {
                    $orConditions = [];
                    $bindParams = [];
                    foreach ($searchFields as $sf) {
                        $orConditions[] = "`{$mainTablePrefixed}`.`{$sf}` LIKE ?";
                        $bindParams[] = "%{$val}%";
                    }
                    $query->whereRaw("(" . implode(" OR ", $orConditions) . ")", $bindParams);
                }
            } else {
                $query->where(["{$mainTablePrefixed}.{$col}" => $val]);
            }
        }

        $res = $query->select("COUNT(*) as aggregate")->first();
        return (int) ($res['aggregate'] ?? 0);
    }

    private function getLabelColumn(string $slug): string
    {
        $prefix = $this->db->getPrefix();
        
        $def = $this->db->query('module_definitions')
            ->join($prefix . 'modules', "`{$prefix}module_definitions`.`module_id` = `{$prefix}modules`.`id`")
            ->select(["`{$prefix}module_definitions`.`fields_schema`"])
            ->where(["{$prefix}modules.slug" => $slug])
            ->first();

        if ($def && isset($def['fields_schema'])) {
            $fields = json_decode($def['fields_schema'], true) ?? [];
            foreach ($fields as $f) {
                if (($f['name'] === 'name' || $f['name'] === 'title') && $f['type'] === 'text') {
                    return $f['name'];
                }
            }
            foreach ($fields as $f) {
                if ($f['type'] === 'text') {
                    return $f['name'];
                }
            }
        }

        if ($slug === 'users') {
            return 'name';
        }
        if ($slug === 'pages') {
            return 'title';
        }
        if ($slug === 'media') {
            return 'filename';
        }

        return 'name';
    }
}
