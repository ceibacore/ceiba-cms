<?php
declare(strict_types=1);

namespace LemurCms\Seeders;

use LemurCms\Seeder\CmsSeeder;
use LemurCms\Support\Helpers\UuidHelper;

class SystemModulesSeeder extends CmsSeeder
{
    public function run(): void
    {
        $modules = [
            ['name' => 'Users & Access', 'slug' => 'users', 'description' => 'Manage users, roles and permissions.'],
            ['name' => 'Pages', 'slug' => 'pages', 'description' => 'Manage CMS pages and content.'],
            ['name' => 'Menus', 'slug' => 'menus', 'description' => 'Manage navigation menus.'],
            ['name' => 'Media', 'slug' => 'media', 'description' => 'Manage files and images.'],
            ['name' => 'SEO', 'slug' => 'seo', 'description' => 'Manage search engine optimization data.'],
        ];

        foreach ($modules as $index => $module) {
            $this->firstOrCreate('modules',
                ['slug' => $module['slug']],
                [
                    'id' => UuidHelper::v4(),
                    'name' => $module['name'],
                    'description' => $module['description'],
                    'is_active' => 1,
                    'sort_order' => $index,
                ]
            );
        }
    }
}
