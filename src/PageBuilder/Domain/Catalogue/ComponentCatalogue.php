<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Catalogue;

/**
 * Server-managed versioned component catalogue.
 *
 * Ensures component specifications, containment rules, and property schemas
 * are versioned and authoritatively validated on the server.
 */
final class ComponentCatalogue
{
    /** @var array<string, ComponentDescriptor> */
    private array $components = [];

    public function register(ComponentDescriptor $descriptor): void
    {
        $this->components[$descriptor->name] = $descriptor;
    }

    public function has(string $name): bool
    {
        return isset($this->components[$name]);
    }

    public function get(string $name): ?ComponentDescriptor
    {
        return $this->components[$name] ?? null;
    }

    /** @return list<ComponentDescriptor> */
    public function all(): array
    {
        return array_values($this->components);
    }

    /**
     * Inspects a component type. If unknown in this catalogue, returns a recoverable
     * diagnostic indicating the node must be preserved as data without silent mutation.
     *
     * @return array<string, mixed>|null Null if component is recognized, array diagnostic otherwise.
     */
    public function diagnose(string $name): ?array
    {
        if ($this->has($name)) {
            return null;
        }

        return [
            'type'        => $name,
            'isKnown'     => false,
            'status'      => 'retained_as_data',
            'recoverable' => true,
            'message'     => "Component '{$name}' is not registered in the active catalogue. It is retained as data to prevent loss, but mutating its properties is restricted.",
        ];
    }

    /**
     * Factory creating a catalogue populated with standard core components.
     */
    public static function createDefault(): self
    {
        $catalogue = new self();

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
            propsSchema: ['src' => ['type' => 'string', 'default' => ''], 'alt' => ['type' => 'string', 'default' => '']],
            allowedChildren: [],
            allowedParents: ['*'],
            editorControls: ['src' => ['type' => 'media_picker'], 'alt' => ['type' => 'text']],
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

        return $catalogue;
    }

    /** @return list<array<string, mixed>> */
    public function toArray(): array
    {
        return array_map(fn(ComponentDescriptor $c) => $c->toArray(), array_values($this->components));
    }
}
