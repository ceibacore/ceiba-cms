<?php
declare(strict_types=1);

namespace CeibaCms\Seeders;

use CeibaCms\Seeder\CmsSeeder;
use CeibaCms\Support\Helpers\UuidHelper;

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
                // Segregated revision duties: publish, unpublish and restore are separate grants.
                foreach ([
                    'pages.publish' => 'Publish Pages',
                    'pages.unpublish' => 'Unpublish Pages',
                    'pages.restore' => 'Restore Page Revisions',
                    // Site design (plan 04): tokens, breakpoints and classes shared by every page.
                    'design.update' => 'Edit Site Design',
                    'design.publish' => 'Publish Site Design',
                ] as $permissionSlug => $permissionName) {
                    $this->firstOrCreate('permissions', ['slug' => $permissionSlug], [
                        'id' => UuidHelper::v4(),
                        'module_id' => $module['id'],
                        'name' => $permissionName,
                    ]);
                }
            }
        }
    }
}
