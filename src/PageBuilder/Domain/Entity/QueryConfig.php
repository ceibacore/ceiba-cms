<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Entity;

final class QueryConfig
{
    public function __construct(
        public readonly string  $id,
        public readonly string  $contextKey,
        public readonly string  $model,
        public readonly array   $filters = [],
        public readonly array   $sort = [],
        public readonly array   $paginate = [],
        public readonly ?int    $limit = null,
        public readonly array   $with = [],
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            id:         $data['id']          ?? throw new \InvalidArgumentException('QueryConfig missing id'),
            contextKey: $data['context_key'] ?? throw new \InvalidArgumentException('QueryConfig missing context_key'),
            model:      $data['model']       ?? throw new \InvalidArgumentException('QueryConfig missing model'),
            filters:    $data['filters']     ?? [],
            sort:       $data['sort']        ?? [],
            paginate:   $data['paginate']    ?? [],
            limit:      isset($data['limit']) ? (int) $data['limit'] : null,
            with:       $data['with']        ?? [],
        );
    }

    public function toArray(): array
    {
        return [
            'id'          => $this->id,
            'context_key' => $this->contextKey,
            'model'       => $this->model,
            'filters'     => $this->filters,
            'sort'        => $this->sort,
            'paginate'    => $this->paginate,
            'limit'       => $this->limit,
            'with'        => $this->with,
        ];
    }
}
