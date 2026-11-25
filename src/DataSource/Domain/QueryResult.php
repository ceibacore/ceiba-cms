<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Domain;

/** Items of a query (public fields only), its page and any warnings (plan 07). */
final class QueryResult
{
    /**
     * @param list<array<string, mixed>> $items
     * @param list<string> $warnings
     */
    public function __construct(
        public readonly array $items,
        public readonly int $page,
        public readonly int $pageSize,
        public readonly ?int $total = null,
        public readonly array $warnings = [],
    ) {}

    public function hasMore(): bool
    {
        return $this->total !== null ? $this->page * $this->pageSize < $this->total : count($this->items) >= $this->pageSize;
    }

    public function pages(): ?int
    {
        return $this->total === null ? null : max(1, (int) ceil($this->total / max(1, $this->pageSize)));
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return ['items' => $this->items, 'pagination' => ['page' => $this->page, 'page_size' => $this->pageSize, 'total' => $this->total,
            'pages' => $this->pages(), 'has_more' => $this->hasMore()], 'warnings' => $this->warnings];
    }
}
