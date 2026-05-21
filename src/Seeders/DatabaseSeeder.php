<?php
declare(strict_types=1);

namespace LemurCms\Seeders;

use LemurCms\Seeder\CmsSeeder;
use LemurCms\Support\Helpers\FakeDataHelper;
use LemurCms\Support\Helpers\UuidHelper;

require_once __DIR__ . '/SystemModulesSeeder.php';
require_once __DIR__ . '/SystemPermissionsSeeder.php';
require_once __DIR__ . '/SystemRolesSeeder.php';
require_once __DIR__ . '/SystemMenusSeeder.php';
require_once __DIR__ . '/ComponentDefinitionsSeeder.php';
require_once __DIR__ . '/TemplatesSeeder.php';

class DatabaseSeeder extends CmsSeeder
{
    public function run(): void
    {
        // 1. Example of Truncating (if in a safe environment)
        $env = getenv('APP_ENV') ?: 'production';
        if ($env !== 'production') {
            $this->truncate('access_roles');
            $this->truncate('access');
            $this->truncate('roles');
            $this->truncate('pages');
            $this->truncate('component_definitions');
            $this->truncate('templates');
        }

        // 2. System Seeders (Modules, Permissions, Roles, Menus)
        (new SystemModulesSeeder($this->db, $this->prefix))->run();
        (new SystemPermissionsSeeder($this->db, $this->prefix))->run();
        (new SystemRolesSeeder($this->db, $this->prefix))->run();
        (new SystemMenusSeeder($this->db, $this->prefix))->run();
        (new ComponentDefinitionsSeeder($this->db, $this->prefix))->run();
        (new TemplatesSeeder($this->db, $this->prefix))->run();

        // 3. Create an Admin user and assign the superadmin role
        $superAdminRoleId = $this->db->query('roles')->where(['slug' => 'superadmin'])->first()['id'] ?? null;
        
        $adminId = $this->firstOrCreate('access', 
            ['email' => 'admin@lemur.local'],
            [
                'id' => UuidHelper::v4(),
                'name' => 'System Admin',
                'is_active' => 1,
                'short_id' => UuidHelper::short(UuidHelper::v4()),
            ]
        );

        if ($superAdminRoleId) {
            $this->firstOrCreate('access_roles', [
                'access_id' => $adminId,
                'role_id' => $superAdminRoleId
            ]);
        }

        // 4. Example of Batch Generation (Fake Data without external dependencies)
        if ($env !== 'production') {
            // Generate 50 fake users
            $fakeUsers = FakeDataHelper::generate(50, function($index) {
                return [
                    'id' => UuidHelper::v4(),
                    'name' => FakeDataHelper::name(),
                    'email' => FakeDataHelper::email(),
                    'is_active' => FakeDataHelper::number(0, 1),
                    'short_id' => substr(uniqid(), -6),
                ];
            });
            $this->insertBatch('access', $fakeUsers);

            // Assign editor role to the first 5 fake users
            $editorRole = $this->db->query('roles')->where(['slug' => 'editor'])->first();
            if ($editorRole) {
                $fakeUserRoles = [];
                for ($i = 0; $i < 5; $i++) {
                    $fakeUserRoles[] = [
                        'access_id' => $fakeUsers[$i]['id'],
                        'role_id' => $editorRole['id']
                    ];
                }
                $this->insertBatch('access_roles', $fakeUserRoles);
            }

            // Generate some fake pages
            $fakePages = FakeDataHelper::generate(20, function($index) use ($adminId) {
                $title = FakeDataHelper::sentence(4);
                $slug = strtolower(str_replace([' ', '.'], ['-', ''], $title));
                return [
                    'id' => UuidHelper::v4(),
                    'title' => $title,
                    'slug' => $slug . '-' . $index,
                    'status' => FakeDataHelper::random(['published', 'draft']),
                    'content' => json_encode(['body' => FakeDataHelper::paragraph()]),
                    // 'author_id' => $adminId, // If pages had an author
                ];
            });
            $this->insertBatch('pages', $fakePages);
        }
    }
}
