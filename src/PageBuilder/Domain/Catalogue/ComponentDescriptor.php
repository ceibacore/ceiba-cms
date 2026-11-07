<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Catalogue;

use InvalidArgumentException;

/**
 * Versioned component descriptor in the visual builder catalogue.
 */
final class ComponentDescriptor
{
    /**
     * @param string $name Stable machine identifier (e.g. 'container', 'heading', 'card')
     * @param int $version Descriptor schema version (>= 1)
     * @param string $label Human-readable label
     * @param string $category Grouping category (e.g. 'layout', 'typography', 'media')
     * @param array<string, mixed> $propsSchema Property schema with types and default values
     * @param list<string> $allowedChildren Allowed child component names, or ['*'] for any
     * @param list<string> $allowedParents Allowed parent component names, or ['*'] for any
     * @param array<string, mixed> $editorControls Visual inspector controls specification
     * @param list<string> $capabilities Supported capabilities (e.g. 'loop', 'bindings', 'styles')
     * @param bool $isContainer Whether this component accepts child nodes
     */
    public function __construct(
        public readonly string $name,
        public readonly int $version,
        public readonly string $label,
        public readonly string $category,
        public readonly array $propsSchema = [],
        public readonly array $allowedChildren = ['*'],
        public readonly array $allowedParents = ['*'],
        public readonly array $editorControls = [],
        public readonly array $capabilities = [],
        public readonly bool $isContainer = false,
    ) {
        if (trim($name) === '') {
            throw new InvalidArgumentException('Component name cannot be empty');
        }
        if ($version < 1) {
            throw new InvalidArgumentException('Component version must be >= 1');
        }
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'name'            => $this->name,
            'version'         => $this->version,
            'label'           => $this->label,
            'category'        => $this->category,
            'propsSchema'     => $this->propsSchema,
            'allowedChildren' => $this->allowedChildren,
            'allowedParents'  => $this->allowedParents,
            'editorControls'  => $this->editorControls,
            'capabilities'    => $this->capabilities,
            'isContainer'     => $this->isContainer,
        ];
    }
}
