<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import;

final class ImportWarning
{
    public function __construct(
        public readonly string  $element,
        public readonly string  $reason,
        public readonly string  $severity,   // 'info' | 'warning' | 'error'
        public readonly string  $suggestion = '',
        public readonly ?int    $line = null,
    ) {}

    public function toArray(): array
    {
        return [
            'element'    => $this->element,
            'reason'     => $this->reason,
            'severity'   => $this->severity,
            'suggestion' => $this->suggestion,
            'line'       => $this->line,
        ];
    }
}
