<?php
declare(strict_types=1);

namespace LemurCms\DynamicModule\Application;

use LemurCms\DynamicModule\Domain\Entity\ModuleDefinition;
use LemurCms\DynamicModule\Domain\Entity\ModuleField;
use LemurCms\DynamicModule\Domain\Repository\ModuleDefinitionRepositoryInterface;
use LemurCms\DynamicModule\Infrastructure\DynamicTableManager;
use LemurCms\Support\Helpers\UuidHelper;
use LemurDB;

final class CreateDynamicModule
{
    public function __construct(
        private readonly LemurDB                             $db,
        private readonly ModuleDefinitionRepositoryInterface $repo,
        private readonly DynamicTableManager                 $tableManager,
    ) {}

    public function execute(array $data, ?string $creatorAccessId = null): string
    {
        $moduleId = UuidHelper::v4();
        $definitionId = UuidHelper::v4();
        
        $name = $data['name'] ?? throw new \InvalidArgumentException('Module name is required');
        $slug = $data['slug'] ?? throw new \InvalidArgumentException('Module slug is required');
        $icon = $data['icon'] ?? null;
        $fieldsData = $data['fields'] ?? [];

        // 1. Insert into modules
        $this->db->query('modules')->insert([
            'id'          => $moduleId,
            'name'        => $name,
            'slug'        => $slug,
            'description' => $data['description'] ?? "Dynamic module for {$name}",
            'version'     => '1.0.0',
            'is_active'   => 1,
            'sort_order'  => (int) ($data['sort_order'] ?? 0),
            'created_at'  => date('Y-m-d H:i:s'),
            'updated_at'  => date('Y-m-d H:i:s'),
        ]);

        // 2. Parse fields
        $fields = [];
        foreach ($fieldsData as $f) {
            $fields[] = ModuleField::fromArray($f);
        }

        // 3. Save definition
        $definition = new ModuleDefinition(
            id:         $definitionId,
            moduleId:   $moduleId,
            moduleName: $name,
            moduleSlug: $slug,
            fields:     $fields,
            icon:       $icon
        );
        $this->repo->save($definition);

        // 4. Create physical table
        $this->tableManager->createTable($definition);

        // 5. Create permissions
        $actions = ['view', 'create', 'update', 'delete'];
        $adminRole = $this->db->query('roles')->where(['slug' => 'admin'])->first();
        
        foreach ($actions as $action) {
            $permissionId = UuidHelper::v4();
            $permSlug = "{$slug}.{$action}";
            $permName = "Can {$action} " . strtolower($name);

            $this->db->query('permissions')->insert([
                'id'        => $permissionId,
                'module_id' => $moduleId,
                'name'      => $permName,
                'slug'      => $permSlug,
            ]);

            // Assign to admin role
            if ($adminRole) {
                $this->db->query('role_permissions')->insert([
                    'role_id'       => $adminRole['id'],
                    'permission_id' => $permissionId,
                ]);
            }

            // Assign to creator's other roles
            if ($creatorAccessId) {
                $creatorRoles = $this->db->query('access_roles')->where(['access_id' => $creatorAccessId])->get();
                foreach ($creatorRoles as $ar) {
                    if (!$adminRole || $ar['role_id'] !== $adminRole['id']) {
                        $exists = $this->db->query('role_permissions')
                            ->where(['role_id' => $ar['role_id'], 'permission_id' => $permissionId])
                            ->first();
                        if (!$exists) {
                            $this->db->query('role_permissions')->insert([
                                'role_id'       => $ar['role_id'],
                                'permission_id' => $permissionId,
                            ]);
                        }
                    }
                }
            }
        }

        return $definitionId;
    }
}
