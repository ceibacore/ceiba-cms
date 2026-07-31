<?php
declare(strict_types=1);

namespace LemurCms\DynamicModule\Application;

use LemurCms\DynamicModule\Domain\Repository\ModuleDefinitionRepositoryInterface;
use LemurCms\DynamicModule\Infrastructure\DynamicTableManager;
use LemurDB;

final class DeleteDynamicModule
{
    public function __construct(
        private readonly LemurDB                             $db,
        private readonly ModuleDefinitionRepositoryInterface $repo,
        private readonly DynamicTableManager                 $tableManager,
    ) {}

    public function execute(string $id): void
    {
        $def = $this->repo->findById($id);
        if (!$def) {
            throw new \RuntimeException("Module definition not found.");
        }

        // 1. Delete definition schema
        $this->repo->delete($id);

        // 2. Delete module core entry
        $this->db->query('modules')->where(['id' => $def->moduleId])->delete();

        // 3. Drop physical table
        $this->tableManager->dropTable($def->tableName());

        // 4. Delete permissions associated with this module
        $this->db->query('permissions')->where(['module_id' => $def->moduleId])->delete();
    }
}
