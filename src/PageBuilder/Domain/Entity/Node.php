<?php
declare(strict_types=1);
namespace LemurCms\PageBuilder\Domain\Entity;

/**
 * Immutable value object representing a single node in the page tree.
 */
final class Node
{
    public function __construct(
        public readonly string  $id,
        public readonly string  $type,
        public readonly array   $props,
        public readonly ?LoopConfig $loop,
        /** @var Node[] */
        public readonly array   $children,
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
            id:       $data['id']    ?? throw new \InvalidArgumentException('Node missing id'),
            type:     $data['type']  ?? throw new \InvalidArgumentException('Node missing type'),
            props:    $data['props'] ?? [],
            loop:     $loop,
            children: $children,
        );
    }

    public function toArray(): array
    {
        return [
            'id'       => $this->id,
            'type'     => $this->type,
            'props'    => $this->props,
            'loop'     => $this->loop?->toArray(),
            'children' => array_map(fn(Node $n) => $n->toArray(), $this->children),
        ];
    }

    public function withProps(array $props): self
    {
        return new self($this->id, $this->type, $props, $this->loop, $this->children);
    }

    public function withChildren(array $children): self
    {
        return new self($this->id, $this->type, $this->props, $this->loop, $children);
    }

    public function withLoop(?LoopConfig $loop): self
    {
        return new self($this->id, $this->type, $this->props, $loop, $this->children);
    }
}
