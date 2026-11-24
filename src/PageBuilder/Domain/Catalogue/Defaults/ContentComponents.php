<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Domain\Catalogue\Defaults;

use CeibaCms\PageBuilder\Domain\Catalogue\ComponentCatalogue;
use CeibaCms\PageBuilder\Domain\Catalogue\ComponentDescriptor;

/**
 * Content components (plan 05-B). Each has a Bootstrap 5 view (Frameworks/Bootstrap5/views), the same markup on the
 * editor canvas (editor/src/ui/canvas/components) and a shared case in fixtures/components.
 */
final class ContentComponents
{
    public static function register(ComponentCatalogue $catalogue): void
    {
        $add = static fn (string $name, string $label, string $category, array $props, array $controls, bool $container = false)
            => $catalogue->register(new ComponentDescriptor(
                name: $name, version: 1, label: $label, category: $category, propsSchema: $props,
                allowedChildren: $container ? ['*'] : [], allowedParents: ['*'], editorControls: $controls,
                capabilities: ['styles'], isContainer: $container,
            ));

        $add('divider', 'Divider', 'layout',
            ['style' => ['type' => 'string', 'enum' => ['solid', 'dashed', 'dotted'], 'default' => 'solid'], 'spacing' => ['type' => 'integer', 'default' => 4]],
            ['style' => ['type' => 'select', 'options' => ['solid', 'dashed', 'dotted'], 'label' => 'Line'],
                'spacing' => ['type' => 'select', 'options' => [0, 1, 2, 3, 4, 5], 'label' => 'Spacing']]);
        $add('spacer', 'Spacer', 'layout', ['size' => ['type' => 'integer', 'default' => 32]],
            ['size' => ['type' => 'number', 'label' => 'Height (px)']]);
        $add('list', 'List', 'typography',
            ['items' => ['type' => 'array', 'default' => ['First item', 'Second item']], 'ordered' => ['type' => 'boolean', 'default' => false],
                'variant' => ['type' => 'string', 'enum' => ['default', 'unstyled', 'inline'], 'default' => 'default']],
            ['items' => ['type' => 'lines', 'label' => 'Items (one per line)'], 'ordered' => ['type' => 'switch', 'label' => 'Numbered'],
                'variant' => ['type' => 'select', 'options' => ['default', 'unstyled', 'inline'], 'label' => 'Style']]);
        $add('quote', 'Quote', 'typography',
            ['text' => ['type' => 'string', 'default' => 'Quote text'], 'cite' => ['type' => 'string', 'default' => '']],
            ['text' => ['type' => 'textarea', 'label' => 'Quote'], 'cite' => ['type' => 'text', 'label' => 'Author']]);
        $add('card', 'Card', 'content',
            ['image' => ['type' => 'media', 'default' => ''], 'title' => ['type' => 'string', 'default' => 'Card title'],
                'text' => ['type' => 'string', 'default' => ''], 'linkLabel' => ['type' => 'string', 'default' => ''], 'linkUrl' => ['type' => 'string', 'default' => '']],
            ['image' => ['type' => 'media_picker', 'label' => 'Image'], 'title' => ['type' => 'text', 'label' => 'Title'],
                'text' => ['type' => 'textarea', 'label' => 'Text'], 'linkLabel' => ['type' => 'text', 'label' => 'Link text'],
                'linkUrl' => ['type' => 'url', 'label' => 'Link']], true);
        $add('gallery', 'Gallery', 'media',
            ['items' => ['type' => 'array', 'default' => []], 'columns' => ['type' => 'integer', 'enum' => [2, 3, 4], 'default' => 3]],
            ['items' => ['type' => 'media_list', 'label' => 'Images'], 'columns' => ['type' => 'select', 'options' => [2, 3, 4], 'label' => 'Columns']]);
        $add('video', 'Video', 'media',
            ['url' => ['type' => 'string', 'default' => ''], 'title' => ['type' => 'string', 'default' => 'Video'],
                'playLabel' => ['type' => 'string', 'default' => 'Play video'], 'poster' => ['type' => 'media', 'default' => '']],
            ['url' => ['type' => 'url', 'label' => 'YouTube or Vimeo link'], 'title' => ['type' => 'text', 'label' => 'Title'],
                'playLabel' => ['type' => 'text', 'label' => 'Play button'], 'poster' => ['type' => 'media_picker', 'label' => 'Cover image']]);
    }
}
