<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Domain\Catalogue\Defaults;

use CeibaCms\PageBuilder\Domain\Catalogue\ComponentCatalogue;
use CeibaCms\PageBuilder\Domain\Catalogue\ComponentDescriptor;

/** Layout and basic components (plans 01–03): html, container, row, col, heading, text, image, button. */
final class CoreComponents
{
    public static function register(ComponentCatalogue $catalogue): void
    {

        $catalogue->register(new ComponentDescriptor(
            name: 'html',
            version: 1,
            label: 'Raw HTML / Embed',
            category: 'basic',
            propsSchema: ['content' => ['type' => 'string', 'default' => '']],
            allowedChildren: [],
            allowedParents: ['*'],
            editorControls: ['content' => ['type' => 'textarea', 'label' => 'HTML Content']],
            capabilities: ['sanitize'],
            isContainer: false,
        ));

        $catalogue->register(new ComponentDescriptor(
            name: 'container',
            version: 1,
            label: 'Container',
            category: 'layout',
            propsSchema: ['fluid' => ['type' => 'boolean', 'default' => false]],
            allowedChildren: ['*'],
            allowedParents: ['*'],
            editorControls: ['fluid' => ['type' => 'switch', 'label' => 'Full Width']],
            capabilities: ['styles', 'responsive'],
            isContainer: true,
        ));

        $catalogue->register(new ComponentDescriptor(
            name: 'row',
            version: 1,
            label: 'Grid Row',
            category: 'layout',
            propsSchema: ['gutter' => ['type' => 'string', 'default' => '3']],
            allowedChildren: ['col'],
            allowedParents: ['container', 'section', 'div'],
            editorControls: ['gutter' => ['type' => 'select', 'options' => ['1', '2', '3', '4', '5']]],
            capabilities: ['styles', 'responsive'],
            isContainer: true,
        ));

        $catalogue->register(new ComponentDescriptor(
            name: 'col',
            version: 1,
            label: 'Grid Column',
            category: 'layout',
            propsSchema: ['xs' => ['type' => 'integer', 'default' => 12], 'md' => ['type' => 'integer', 'default' => 6]],
            allowedChildren: ['*'],
            allowedParents: ['row'],
            editorControls: ['xs' => ['type' => 'number'], 'md' => ['type' => 'number']],
            capabilities: ['styles', 'responsive'],
            isContainer: true,
        ));

        $catalogue->register(new ComponentDescriptor(
            name: 'heading',
            version: 1,
            label: 'Heading',
            category: 'typography',
            propsSchema: ['text' => ['type' => 'string', 'default' => 'Title'], 'level' => ['type' => 'integer', 'default' => 2]],
            allowedChildren: [],
            allowedParents: ['*'],
            editorControls: ['text' => ['type' => 'text'], 'level' => ['type' => 'select', 'options' => [1, 2, 3, 4, 5, 6]]],
            capabilities: ['bindings', 'styles'],
            isContainer: false,
        ));

        $catalogue->register(new ComponentDescriptor(
            name: 'text',
            version: 1,
            label: 'Paragraph Text',
            category: 'typography',
            propsSchema: ['content' => ['type' => 'string', 'default' => 'Paragraph text']],
            allowedChildren: [],
            allowedParents: ['*'],
            editorControls: ['content' => ['type' => 'richtext']],
            capabilities: ['bindings', 'styles'],
            isContainer: false,
        ));

        $catalogue->register(new ComponentDescriptor(
            name: 'image',
            version: 1,
            label: 'Image',
            category: 'media',
            propsSchema: ['src' => ['type' => 'media', 'default' => ''], 'alt' => ['type' => 'string', 'default' => ''], 'sizes' => ['type' => 'string', 'default' => '']],
            allowedChildren: [],
            allowedParents: ['*'],
            editorControls: ['src' => ['type' => 'media_picker', 'label' => 'Image'], 'alt' => ['type' => 'text', 'label' => 'Alt text']],
            capabilities: ['media', 'responsive', 'lazy'],
            isContainer: false,
        ));

        $catalogue->register(new ComponentDescriptor(
            name: 'button',
            version: 1,
            label: 'Button',
            category: 'action',
            propsSchema: ['label' => ['type' => 'string', 'default' => 'Click Me'], 'url' => ['type' => 'string', 'default' => '#']],
            allowedChildren: [],
            allowedParents: ['*'],
            editorControls: ['label' => ['type' => 'text'], 'url' => ['type' => 'url']],
            capabilities: ['styles', 'link'],
            isContainer: false,
        ));
    }
}
