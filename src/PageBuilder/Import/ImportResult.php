<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import;

final class ImportResult
{
    public function __construct(
        public readonly array $tree,
        public readonly array $warnings,
        public readonly array $stats,
    ) {}

    public function toArray(): array
    {
        return [
            'tree'     => $this->tree,
            'warnings' => array_map(fn(ImportWarning $w) => $w->toArray(), $this->warnings),
            'stats'    => $this->stats,
        ];
    }
}
