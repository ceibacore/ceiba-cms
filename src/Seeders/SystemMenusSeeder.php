<?php
declare(strict_types=1);

namespace LemurCms\Seeders;

use LemurCms\Seeder\CmsSeeder;
use LemurCms\Support\Helpers\UuidHelper;

class SystemMenusSeeder extends CmsSeeder
{
    public function run(): void
    {
        // 1. Clean existing menus (only if not in production and configured in parent)
        $env = getenv('APP_ENV') ?: 'production';
        if ($env !== 'production') {
            $this->truncate('mega_links');
            $this->truncate('mega_sections');
            $this->truncate('menu_items');
            $this->truncate('menus');
        }

        // 2. Define the system menu types to seed
        $menuTypes = [
            [
                'name' => 'Main Navigation',
                'slug' => 'main-menu',
                'type' => 'main',
                'items' => [
                    ['label' => 'Home', 'url' => '/', 'type' => 'link', 'sort_order' => 0],
                    ['label' => 'Pages', 'url' => '/pages', 'type' => 'link', 'sort_order' => 1],
                    ['label' => 'Media', 'url' => '/media', 'type' => 'link', 'sort_order' => 2],
                    ['label' => 'Contact Us', 'url' => '/contact', 'type' => 'link', 'sort_order' => 3],
                ]
            ],
            [
                'name' => 'Footer Navigation',
                'slug' => 'footer-menu',
                'type' => 'footer',
                'items' => [
                    ['label' => 'Privacy Policy', 'url' => '/privacy', 'type' => 'link', 'sort_order' => 0],
                    ['label' => 'Terms of Service', 'url' => '/terms', 'type' => 'link', 'sort_order' => 1],
                    ['label' => 'Sitemap', 'url' => '/sitemap', 'type' => 'link', 'sort_order' => 2],
                ]
            ],
            [
                'name' => 'Sidebar Navigation',
                'slug' => 'sidebar-menu',
                'type' => 'sidebar',
                'items' => [
                    ['label' => 'Dashboard', 'url' => '/admin/dashboard', 'type' => 'link', 'sort_order' => 0],
                    ['label' => 'Settings', 'url' => '/admin/settings', 'type' => 'link', 'sort_order' => 1],
                ]
            ],
            [
                'name' => 'Mobile Navigation',
                'slug' => 'mobile-menu',
                'type' => 'mobile',
                'items' => [
                    ['label' => 'Home', 'url' => '/', 'type' => 'link', 'sort_order' => 0],
                    ['label' => 'Pages', 'url' => '/pages', 'type' => 'link', 'sort_order' => 1],
                    ['label' => 'Media', 'url' => '/media', 'type' => 'link', 'sort_order' => 2],
                    ['label' => 'Contact', 'url' => '/contact', 'type' => 'link', 'sort_order' => 3],
                ]
            ]
        ];

        foreach ($menuTypes as $menuData) {
            // Create or verify the menu
            $menuId = $this->firstOrCreate('menus',
                ['slug' => $menuData['slug']],
                [
                    'id' => UuidHelper::v4(),
                    'name' => $menuData['name'],
                    'type' => $menuData['type'],
                    'status' => 1
                ]
            );

            // Populate the menu items
            foreach ($menuData['items'] as $item) {
                $this->firstOrCreate('menu_items',
                    [
                        'menu_id' => $menuId,
                        'label' => $item['label']
                    ],
                    [
                        'id' => UuidHelper::v4(),
                        'parent_id' => null,
                        'url' => $item['url'],
                        'type' => $item['type'],
                        'target' => '_self',
                        'sort_order' => $item['sort_order'],
                        'status' => 1
                    ]
                );
            }
        }
    }
}
