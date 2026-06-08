<?php
declare(strict_types=1);
namespace LemurCms\PageBuilder\Domain\Entity;

/**
 * Immutable value object representing a single node in the page tree.
 *
 * A node maps 1:1 to an HTML element:
 *   - `type`     → the HTML tag (div, section, h1, button, img, span, etc.)
 *   - `name`     → the component or pattern the element belongs to (card, accordion, hero…)
 *                  null = generic HTML element with no component association
 *   - `props`    → HTML attributes of the element (class, id, href, src, data-*, aria-*, etc.)
 *   - `bindings` → map of attribute → context variable (e.g. ["content" => "product.name"])
 */
final class Node
{
    public function __construct(
        public readonly string      $id,
        /** HTML tag: div, section, h1, button, img, a, ul, span, nav, etc. */
        public readonly string      $type,
        /** Component or pattern name: card, accordion, hero. null = generic element. */
        public readonly ?string     $name,
        /** Optional custom label chosen by the user for this node */
        public readonly ?string     $label = null,
        /** HTML attributes: class, id, href, src, data-*, aria-*, etc. */
        public readonly array       $props = [],
        /** Map of attribute → context variable for dynamic binding. */
        public readonly ?array      $bindings = null,
        public readonly ?LoopConfig $loop = null,
        /** @var Node[] */
        public readonly array       $children = [],
    ) {}

    public static function fromArray(array $data): self
    {
        $loop = isset($data['loop']) && is_array($data['loop'])
            ? LoopConfig::fromArray($data['loop'])
            : null;

        $children = array_map(
            fn(array $child) => self::fromArray($child),
            $data['children'] ?? []
        );

        return new self(
            id:       $data['id']       ?? throw new \InvalidArgumentException('Node missing id'),
            type:     $data['type']     ?? throw new \InvalidArgumentException('Node missing type'),
            name:     isset($data['name']) && is_string($data['name']) ? $data['name'] : null,
            label:    isset($data['label']) && is_string($data['label']) ? $data['label'] : null,
            props:    $data['props']    ?? [],
            bindings: isset($data['bindings']) && is_array($data['bindings']) ? $data['bindings'] : null,
            loop:     $loop,
            children: $children,
        );
    }

    public function toArray(): array
    {
        return [
            'id'       => $this->id,
            'type'     => $this->type,
            'name'     => $this->name,
            'label'    => $this->label,
            'props'    => $this->props,
            'bindings' => $this->bindings,
            'loop'     => $this->loop?->toArray(),
            'children' => array_map(fn(Node $n) => $n->toArray(), $this->children),
        ];
    }

    public function withName(?string $name): self
    {
        return new self($this->id, $this->type, $name, $this->label, $this->props, $this->bindings, $this->loop, $this->children);
    }

    public function withLabel(?string $label): self
    {
        return new self($this->id, $this->type, $this->name, $label, $this->props, $this->bindings, $this->loop, $this->children);
    }

    public function withProps(array $props): self
    {
        return new self($this->id, $this->type, $this->name, $this->label, $props, $this->bindings, $this->loop, $this->children);
    }

    public function withBindings(?array $bindings): self
    {
        return new self($this->id, $this->type, $this->name, $this->label, $this->props, $bindings, $this->loop, $this->children);
    }

    public function withChildren(array $children): self
    {
        return new self($this->id, $this->type, $this->name, $this->label, $this->props, $this->bindings, $this->loop, $children);
    }

    public function withLoop(?LoopConfig $loop): self
    {
        return new self($this->id, $this->type, $this->name, $this->label, $this->props, $this->bindings, $loop, $this->children);
    }
}
