<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Domain\Catalogue\Defaults;

use CeibaCms\PageBuilder\Domain\Catalogue\ComponentCatalogue;
use CeibaCms\PageBuilder\Domain\Catalogue\ComponentDescriptor;

/** Components of site headers and footers (plan 06 D-6): menu, logo, site name and search box. */
final class SiteComponents
{
    public static function register(ComponentCatalogue $catalogue): void
    {
        $add = static fn (string $name, string $label, array $props, array $controls) => $catalogue->register(new ComponentDescriptor(
            name: $name, version: 1, label: $label, category: 'site', propsSchema: $props, allowedChildren: [],
            allowedParents: ['*'], editorControls: $controls, capabilities: ['styles'], isContainer: false,
        ));
        $text = static fn (string $default): array => ['type' => 'string', 'default' => $default];

        $add('site_menu', 'Site menu', ['slug' => $text('main'), 'label' => $text('Main')],
            ['slug' => ['type' => 'text', 'label' => 'Menu (slug)'], 'label' => ['type' => 'text', 'label' => 'Name for screen readers']]);
        $add('site_logo', 'Site logo', ['image' => ['type' => 'media', 'default' => ''], 'name' => $text('Home'),
            'href' => $text('/'), 'height' => ['type' => 'integer', 'default' => 40]],
            ['image' => ['type' => 'media_picker', 'label' => 'Logo'], 'name' => ['type' => 'text', 'label' => 'Site name (alt text)'],
                'href' => ['type' => 'url', 'label' => 'Link'], 'height' => ['type' => 'number', 'label' => 'Height (px)']]);
        $add('site_title', 'Site name', ['text' => $text('Site'), 'href' => $text('/')],
            ['text' => ['type' => 'text', 'label' => 'Text'], 'href' => ['type' => 'url', 'label' => 'Link']]);
        $add('search_form', 'Search box', ['action' => $text('/buscar'), 'label' => $text('Search'), 'placeholder' => $text(''),
            'button' => $text('Search')],
            ['action' => ['type' => 'url', 'label' => 'Search page'], 'label' => ['type' => 'text', 'label' => 'Label'],
                'placeholder' => ['type' => 'text', 'label' => 'Placeholder'], 'button' => ['type' => 'text', 'label' => 'Button']]);
    }
}
