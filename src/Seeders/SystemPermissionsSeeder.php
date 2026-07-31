<?php
declare(strict_types=1);

namespace LemurCms\Seeders;

use LemurCms\Seeder\CmsSeeder;
use LemurCms\Support\Helpers\UuidHelper;

class SystemPermissionsSeeder extends CmsSeeder
{
    public function run(): void
    {
        // Define common actions for most modules
        $crudActions = ['view', 'create', 'update', 'delete'];

        // Get all active modules from the database
        $modules = $this->db->query('modules')->where(['is_active' => 1])->get();

        foreach ($modules as $module) {
            $slug = $module['slug'];

            foreach ($crudActions as $action) {
                $permissionSlug = "{$slug}.{$action}";
                $permissionName = ucfirst($action) . ' ' . ucfirst($slug);

                $this->firstOrCreate('permissions',
                    ['slug' => $permissionSlug],
                    [
                        'id' => UuidHelper::v4(),
                        'module_id' => $module['id'],
                        'name' => $permissionName,
                    ]
                );
            }

            // Add some specific permissions based on module
            if ($slug === 'users') {
                $this->firstOrCreate('permissions', ['slug' => 'users.manage_roles'], [
                    'id' => UuidHelper::v4(),
                    'module_id' => $module['id'],
                    'name' => 'Manage Roles',
                ]);
            }

            if ($slug === 'pages') {
                $this->firstOrCreate('permissions', ['slug' => 'pages.publish'], [
                    'id' => UuidHelper::v4(),
                    'module_id' => $module['id'],
                    'name' => 'Publish Pages',
                ]);
            }
        }
    }
}
