<?php
declare(strict_types=1);

namespace LemurCms\DynamicModule\Infrastructure;

use LemurCms\DynamicModule\Domain\Entity\ModuleDefinition;
use LemurCms\DynamicModule\Domain\Repository\ModuleDefinitionRepositoryInterface;
use LemurDB;

final class LemurDbModuleDefinitionRepository implements ModuleDefinitionRepositoryInterface
{
    public function __construct(private readonly LemurDB $db) {}

    public function findById(string $id): ?ModuleDefinition
    {
        $def = $this->db->query('module_definitions')->where(['id' => $id])->first();
        if (!$def) {
            return null;
        }
        $module = $this->db->query('modules')->where(['id' => $def['module_id']])->first();
        if (!$module) {
            return null;
        }
        return $this->hydrate($def, $module);
    }

    public function findBySlug(string $slug): ?ModuleDefinition
    {
        $module = $this->db->query('modules')->where(['slug' => $slug])->first();
        if (!$module) {
            return null;
        }
        $def = $this->db->query('module_definitions')->where(['module_id' => $module['id']])->first();
        if (!$def) {
            return null;
        }
        return $this->hydrate($def, $module);
    }

    public function findByModuleId(string $moduleId): ?ModuleDefinition
    {
        $def = $this->db->query('module_definitions')->where(['module_id' => $moduleId])->first();
        if (!$def) {
            return null;
        }
        $module = $this->db->query('modules')->where(['id' => $moduleId])->first();
        if (!$module) {
            return null;
        }
        return $this->hydrate($def, $module);
    }

    public function save(ModuleDefinition $definition): void
    {
        $defData = [
            'module_id'     => $definition->moduleId,
            'fields_schema' => json_encode(array_map(fn($f) => $f->toArray(), $definition->fields)),
            'icon'          => $definition->icon,
            'updated_at'    => date('Y-m-d H:i:s'),
        ];

        $exists = $this->db->query('module_definitions')->where(['id' => $definition->id])->first();
        if ($exists) {
            $this->db->query('module_definitions')->where(['id' => $definition->id])->update($defData);
        } else {
            $defData['id'] = $definition->id;
            $defData['created_at'] = date('Y-m-d H:i:s');
            $this->db->query('module_definitions')->insert($defData);
        }
    }

    public function delete(string $id): void
    {
        $this->db->query('module_definitions')->where(['id' => $id])->delete();
    }

    public function listAll(): array
    {
        $defs = $this->db->query('module_definitions')->get();
        $results = [];
        foreach ($defs as $def) {
            $module = $this->db->query('modules')->where(['id' => $def['module_id']])->first();
            if ($module) {
                $results[] = $this->hydrate($def, $module);
            }
        }
        return $results;
    }

    private function hydrate(array $def, array $module): ModuleDefinition
    {
        return ModuleDefinition::fromArray([
            'id'            => $def['id'],
            'module_id'     => $def['module_id'],
            'module_name'   => $module['name'],
            'module_slug'   => $module['slug'],
            'description'   => $module['description'] ?? null,
            'fields_schema' => $def['fields_schema'],
            'icon'          => $def['icon'],
        ]);
    }
}
