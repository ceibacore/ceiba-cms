<?php
declare(strict_types=1);

namespace LemurCms\Seeders;

use LemurCms\Seeder\CmsSeeder;
use LemurCms\Support\Helpers\UuidHelper;

class SystemTranslationsSeeder extends CmsSeeder
{
    public function run(): void
    {
        // 1. Create Default Languages
        $englishId = $this->firstOrCreate('cms_languages',
            ['code' => 'en'],
            [
                'id' => UuidHelper::v4(),
                'label' => 'English',
                'is_active' => 1,
                'is_default' => 1,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
        );

        $spanishId = $this->firstOrCreate('cms_languages',
            ['code' => 'es'],
            [
                'id' => UuidHelper::v4(),
                'label' => 'Español',
                'is_active' => 1,
                'is_default' => 0,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
        );

        // 2. Default English translations catalog
        $catalog = [
            'errors' => [
                'menu' => [
                    'missing_label' => 'Menu item label is required and must not be empty',
                    'missing_url' => 'Menu item URL is required',
                    'invalid_type' => 'Invalid menu item type "{type}". Valid types: {valid_types}',
                    'missing_menu_slug' => 'Menu slug is required',
                    'missing_menu_name' => 'Menu name is required',
                    'duplicate_menu_slug' => 'Menu with slug "{slug}" already exists'
                ],
                'permission' => [
                    'denied' => 'Permission "{permission}" denied',
                    'role_not_found' => 'Role with ID {role_id} not found',
                    'missing_permission' => 'Permission "{slug}" does not exist'
                ],
                'user' => [
                    'missing_email' => 'User email is required',
                    'invalid_email' => 'Invalid email format: {email}',
                    'missing_password' => 'User password is required',
                    'weak_password' => 'Password must be at least 8 characters with uppercase, lowercase, and numbers',
                    'email_exists' => 'User with email "{email}" already exists',
                    'not_found' => 'User with ID {id} not found',
                    'new_password_required' => 'New password is required'
                ],
                'page' => [
                    'not_found_by_id' => 'Page with ID {id} not found',
                    'not_found_by_slug' => 'Page with slug "{slug}" not found',
                    'none_published' => 'No published pages found',
                    'title_required' => 'Page title is required and must be a string',
                    'title_max_length' => 'Page title must not exceed 255 characters',
                    'slug_required' => 'Page slug is required and must be a string',
                    'slug_format' => 'Page slug must contain only alphanumeric characters and hyphens',
                    'content_required' => 'Page content is required',
                    'content_invalid_tree' => 'Invalid page tree: {errors}',
                    'content_malformed_json' => 'Page content is malformed JSON',
                    'content_json_array_object' => 'Page content JSON must be an array or object',
                    'content_invalid_format' => 'Page content must be a string or array',
                    'status_invalid' => 'Invalid page status "{status}". Valid: {valid_statuses}',
                    'publish_title_required' => 'Page must have a title to be published',
                    'publish_content_required' => 'Page must have content to be published'
                ],
                'layout' => [
                    'name_required' => 'Layout name is required and must be a string',
                    'name_max_length' => 'Layout name must not exceed 200 characters',
                    'menu_slug_string' => 'Layout menu_slug must be a string',
                    'menu_slug_max_length' => 'Layout menu_slug must not exceed 300 characters',
                    'palette_malformed_json' => 'Layout palette is malformed JSON',
                    'palette_decode_array' => 'Layout palette must decode to an array',
                    'palette_array_or_json' => 'Layout palette must be an array or JSON string',
                    'footer_tree_malformed_json' => 'Layout footer_tree is malformed JSON',
                    'footer_tree_array_or_json' => 'Layout footer_tree must be an array or JSON string',
                    'footer_tree_invalid' => 'Invalid layout footer_tree: {errors}'
                ],
                'template' => [
                    'name_required' => 'Template name is required and must be a string',
                    'name_max_length' => 'Template name must not exceed 200 characters',
                    'tree_required' => 'Template tree is required',
                    'tree_invalid' => 'Invalid template tree: {errors}',
                    'tree_malformed_json' => 'Template tree is malformed JSON',
                    'tree_json_array_object' => 'Template tree JSON must be an array or object',
                    'tree_invalid_format' => 'Template tree must be a string or array'
                ],
                'language' => [
                    'code_required' => 'Language code is required.',
                    'label_required' => 'Language label is required.',
                    'translations_array' => 'Translations must be an array.'
                ]
            ],
            'messages' => [
                'language' => [
                    'retrieved' => 'Languages retrieved',
                    'created' => 'Language created',
                    'updated' => 'Language updated',
                    'deleted' => 'Language deleted'
                ],
                'translation' => [
                    'retrieved' => 'Translations retrieved',
                    'updated' => 'Translations updated'
                ],
                'settings' => [
                    'retrieved' => 'Settings retrieved',
                    'updated' => 'Settings updated'
                ],
                'template' => [
                    'retrieved' => 'Templates retrieved',
                    'saved' => 'Template saved',
                    'deleted' => 'Template deleted'
                ],
                'reserved_path' => [
                    'added' => 'Reserved path added',
                    'removed' => 'Reserved path removed'
                ],
                'cache' => [
                    'cleared' => 'Cache cleared',
                    'menu_cleared' => 'Menu cache cleared for: {slug}'
                ]
            ]
        ];

        // 3. Seed English Translations
        $now = date('Y-m-d H:i:s');
        foreach ($catalog as $group => $categories) {
            foreach ($categories as $category => $items) {
                foreach ($items as $key => $value) {
                    $compositeKey = "{$category}.{$key}";
                    $this->firstOrCreate('cms_translations',
                        [
                            'language_id' => $englishId,
                            'group' => $group,
                            'key' => $compositeKey
                        ],
                        [
                            'id' => UuidHelper::v4(),
                            'value' => $value,
                            'created_at' => $now,
                            'updated_at' => $now
                        ]
                    );
                }
            }
        }
    }
}
