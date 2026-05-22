<?php
declare(strict_types=1);

namespace LemurCms\DynamicModule\Application;

use LemurCms\DynamicModule\Domain\Entity\ModuleDefinition;
use LemurCms\DynamicModule\Domain\Entity\ModuleField;
use LemurCms\DynamicModule\Domain\Repository\ModuleDefinitionRepositoryInterface;
use LemurCms\DynamicModule\Infrastructure\DynamicTableManager;
use LemurDB;

final class UpdateDynamicModule
{
    public function __construct(
        private readonly LemurDB                             $db,
        private readonly ModuleDefinitionRepositoryInterface $repo,
        private readonly DynamicTableManager                 $tableManager,
    ) {}

    public function execute(string $id, array $data): void
    {
        $oldDef = $this->repo->findById($id);
        if (!$oldDef) {
            throw new \RuntimeException("Module definition not found.");
        }

        $name = $data['name'] ?? $oldDef->moduleName;
        $icon = $data['icon'] ?? $oldDef->icon;
        $fieldsData = $data['fields'] ?? [];

        // Update module info in modules table
        $this->db->query('modules')->where(['id' => $oldDef->moduleId])->update([
            'name'       => $name,
            'sort_order' => (int) ($data['sort_order'] ?? 0),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        // Parse new fields
        $newFields = [];
        foreach ($fieldsData as $f) {
            $newFields[] = ModuleField::fromArray($f);
        }

        $tableName = $oldDef->tableName();

        // 1. Process drops
        $newFieldNames = array_map(fn($f) => $f->name, $newFields);
        foreach ($oldDef->fields as $oldField) {
            if (!in_array($oldField->name, $newFieldNames, true)) {
                $this->tableManager->dropColumn($tableName, $oldField->name);
            }
        }

        // 2. Process additions and modifications
        $oldFieldsMap = [];
        foreach ($oldDef->fields as $oldField) {
            $oldFieldsMap[$oldField->name] = $oldField;
        }

        foreach ($newFields as $newField) {
            if (!isset($oldFieldsMap[$newField->name])) {
                $this->tableManager->addColumn($tableName, $newField);
            } else {
                $oldField = $oldFieldsMap[$newField->name];
                if ($this->hasFieldChanged($oldField, $newField)) {
                    $this->tableManager->modifyColumn($tableName, $newField->name, $newField);
                }
            }
        }

        // 3. Save new definition
        $newDef = new ModuleDefinition(
            id:         $oldDef->id,
            moduleId:   $oldDef->moduleId,
            moduleName: $name,
            moduleSlug: $oldDef->moduleSlug,
            fields:     $newFields,
            icon:       $icon
        );
        $this->repo->save($newDef);
    }

    private function hasFieldChanged(ModuleField $old, ModuleField $new): bool
    {
        return $old->type !== $new->type
            || $old->required !== $new->required
            || $old->default !== $new->default
            || $old->rules !== $new->rules
            || $old->options !== $new->options
            || $old->relationTarget !== $new->relationTarget;
    }
}
