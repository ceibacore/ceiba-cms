<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Entity;

final class RenderCondition
{
    public function __construct(
        public readonly string  $id,
        public readonly string  $type,
        public readonly string  $operator,
        public readonly array   $params = [],
        public readonly array   $fallback = [],
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            id:       $data['id']       ?? throw new \InvalidArgumentException('RenderCondition missing id'),
            type:     $data['type']     ?? throw new \InvalidArgumentException('RenderCondition missing type'),
            operator: $data['operator'] ?? throw new \InvalidArgumentException('RenderCondition missing operator'),
            params:   $data['params']   ?? [],
            fallback: $data['fallback'] ?? [],
        );
    }

    public function toArray(): array
    {
        return [
            'id'       => $this->id,
            'type'     => $this->type,
            'operator' => $this->operator,
            'params'   => $this->params,
            'fallback' => $this->fallback,
        ];
    }
}
