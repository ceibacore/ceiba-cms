<?php
declare(strict_types=1);
namespace LemurCms\PageBuilder\Domain\Entity;

/**
 * Represents a registered component type in the page builder catalogue.
 */
final class ComponentDefinition
{
    public function __construct(
        public readonly string $id,
        public readonly string $type,
        public readonly string $label,
        public readonly string $category,
        public readonly ?string $icon,
        public readonly array  $defaultProps,
        public readonly array  $schema,
        public readonly bool   $isContainer,
        public readonly bool   $acceptsLoop,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            id:           $data['id']            ?? '',
            type:         $data['type']          ?? throw new \InvalidArgumentException('ComponentDefinition missing type'),
            label:        $data['label']         ?? $data['type'],
            category:     $data['category']      ?? 'layout',
            icon:         $data['icon']          ?? null,
            defaultProps: is_string($data['default_props'] ?? null)
                              ? (json_decode($data['default_props'], true) ?? [])
                              : ($data['default_props'] ?? []),
            schema:       is_string($data['schema'] ?? null)
                              ? (json_decode($data['schema'], true) ?? [])
                              : ($data['schema'] ?? []),
            isContainer:  (bool) ($data['is_container'] ?? false),
            acceptsLoop:  (bool) ($data['accepts_loop']  ?? true),
        );
    }

    public function toArray(): array
    {
        return [
            'id'            => $this->id,
            'type'          => $this->type,
            'label'         => $this->label,
            'category'      => $this->category,
            'icon'          => $this->icon,
            'default_props' => $this->defaultProps,
            'schema'        => $this->schema,
            'is_container'  => $this->isContainer,
            'accepts_loop'  => $this->acceptsLoop,
        ];
    }
}
