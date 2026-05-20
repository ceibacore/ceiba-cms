<?php
declare(strict_types=1);

namespace LemurCms\Seeders;

use LemurCms\Seeder\CmsSeeder;
use LemurCms\Support\Helpers\UuidHelper;

class SystemRolesSeeder extends CmsSeeder
{
    public function run(): void
    {
        // 1. Create Super Admin (Bypasses everything)
        $superAdminId = $this->firstOrCreate('roles', 
            ['slug' => 'superadmin'], 
            ['id' => UuidHelper::v4(), 'name' => 'Super Administrator']
        );

        // 2. Create Standard Admin (Has all current permissions explicitly)
        $adminId = $this->firstOrCreate('roles', 
            ['slug' => 'admin'], 
            ['id' => UuidHelper::v4(), 'name' => 'Administrator']
        );

        // 3. Create Editor (Only content permissions)
        $editorId = $this->firstOrCreate('roles', 
            ['slug' => 'editor'], 
            ['id' => UuidHelper::v4(), 'name' => 'Content Editor']
        );

        // Assign all permissions to Standard Admin
        $allPermissions = $this->db->query('permissions')->get();
        foreach ($allPermissions as $permission) {
            $this->firstOrCreate('role_permissions', [
                'role_id' => $adminId,
                'permission_id' => $permission['id']
            ]);
        }

        // Assign only content permissions to Editor (pages, media, menus, seo)
        $contentPermissions = array_filter($allPermissions, function($p) {
            return in_array(explode('.', $p['slug'])[0], ['pages', 'media', 'menus', 'seo']);
        });

        foreach ($contentPermissions as $permission) {
            // Exclude publish permission for basic editor as an example
            if ($permission['slug'] === 'pages.publish') continue;

            $this->firstOrCreate('role_permissions', [
                'role_id' => $editorId,
                'permission_id' => $permission['id']
            ]);
        }
    }
}
