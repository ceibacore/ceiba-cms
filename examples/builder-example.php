<?php
/**
 * EXAMPLE: Using CeibaMenuBuilder to create menus programmatically
 */

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

use CeibaCms\Menu\Presentation\CeibaMenuBuilder;
use CeibaCms\Menu\Presentation\CeibaMenuRenderer;

// Create menus programmatically using fluent API
$builder = new CeibaMenuBuilder();

$menus = $builder
    ->menu('main', 'Main Menu', ['type' => 'main'])
        ->item('/', 'Home', ['icon' => 'bi bi-house'])
        ->item('/about', 'About Us')
        ->dropdown('Services', [
            ['url' => '/web-design', 'label' => 'Web Design', 'icon' => 'bi bi-palette'],
            ['url' => '/development', 'label' => 'Development', 'icon' => 'bi bi-code-square'],
            ['url' => '/seo', 'label' => 'SEO', 'icon' => 'bi bi-search'],
        ])
        ->mega('Products', [
            [
                'title' => 'Software',
                'col_span' => 2,
                'links' => [
                    ['url' => '/products/cms', 'label' => 'CMS', 'description' => 'Content Management System', 'is_featured' => true],
                    ['url' => '/products/lms', 'label' => 'LMS', 'description' => 'Learning Management System'],
                ]
            ],
            [
                'title' => 'Services',
                'col_span' => 2,
                'links' => [
                    ['url' => '/services/consulting', 'label' => 'Consulting'],
                    ['url' => '/services/support', 'label' => '24/7 Support'],
                ]
            ],
        ])
        ->item('/blog', 'Blog')
        ->item('/contact', 'Contact', ['css_class' => 'btn btn-primary'])
    ->build();

// Render the main menu
$renderer = new CeibaMenuRenderer('/about');
$navbarHtml = $renderer->render($menus['main']['items']);

echo $navbarHtml;
