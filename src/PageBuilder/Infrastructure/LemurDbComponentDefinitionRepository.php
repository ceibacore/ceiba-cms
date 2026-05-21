<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Infrastructure;

use LemurCms\PageBuilder\Domain\Repository\ComponentDefinitionRepositoryInterface;
use LemurCms\PageBuilder\Domain\Entity\ComponentDefinition;
use LemurDB;
use LemurCms\Support\Helpers\UuidHelper;

final class LemurDbComponentDefinitionRepository implements ComponentDefinitionRepositoryInterface
{
    public function __construct(private readonly \LemurDB $db) {}

    public function findAll(): array
    {
        $rows = $this->db->query('component_definitions')->orderBy('type', 'ASC')->get();
        return array_map(fn($row) => ComponentDefinition::fromArray($row), $rows);
    }

    public function findByType(string $type): ?ComponentDefinition
    {
        $row = $this->db->query('component_definitions')->where(['type' => $type])->first();
        if ($row === null) {
            return null;
        }
        return ComponentDefinition::fromArray($row);
    }

    public function findByCategory(string $category): array
    {
        $rows = $this->db->query('component_definitions')->where(['category' => $category])->orderBy('type', 'ASC')->get();
        return array_map(fn($row) => ComponentDefinition::fromArray($row), $rows);
    }

    public function save(ComponentDefinition $definition): string
    {
        $data = $definition->toArray();
        $id = $data['id'] ?: null;

        // Convert array components to json string for DB
        $data['default_props'] = json_encode($data['default_props']);
        $data['schema'] = json_encode($data['schema']);
        $data['is_container'] = $data['is_container'] ? 1 : 0;
        $data['accepts_loop'] = $data['accepts_loop'] ? 1 : 0;

        if ($id) {
            unset($data['id']);
            $this->db->query('component_definitions')->where(['id' => $id])->update($data);
            return $id;
        }

        $id = UuidHelper::v4();
        $data['id'] = $id;
        $this->db->query('component_definitions')->insert($data);
        return $id;
    }

    public function delete(string $id): void
    {
        $this->db->query('component_definitions')->where(['id' => $id])->delete();
    }
}
