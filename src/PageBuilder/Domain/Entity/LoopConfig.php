<?php
declare(strict_types=1);
namespace LemurCms\PageBuilder\Domain\Entity;

/**
 * Immutable value object for loop configuration on a node.
 */
final class LoopConfig
{
    public function __construct(
        public readonly string  $source,
        public readonly string  $variable,
        public readonly string  $key      = 'id',
        public readonly ?int    $limit    = null,
        public readonly ?int    $offset   = null,
        public readonly ?array  $filters  = null,
        public readonly ?array  $sort     = null,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            source:   $data['source']   ?? throw new \InvalidArgumentException('LoopConfig missing source'),
            variable: $data['variable'] ?? throw new \InvalidArgumentException('LoopConfig missing variable'),
            key:      $data['key']      ?? 'id',
            limit:    isset($data['limit'])  ? (int) $data['limit']  : null,
            offset:   isset($data['offset']) ? (int) $data['offset'] : null,
            filters:  isset($data['filters']) && is_array($data['filters']) ? $data['filters'] : null,
            sort:     isset($data['sort']) && is_array($data['sort']) ? $data['sort'] : null,
        );
    }

    public function toArray(): array
    {
        return [
            'source'   => $this->source,
            'variable' => $this->variable,
            'key'      => $this->key,
            'limit'    => $this->limit,
            'offset'   => $this->offset,
            'filters'  => $this->filters,
            'sort'     => $this->sort,
        ];
    }
}

