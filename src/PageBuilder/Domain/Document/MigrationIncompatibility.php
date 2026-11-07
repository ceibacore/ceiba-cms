<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Document;

final class MigrationIncompatibility
{
    public const SEVERITY_INFO    = 'info';
    public const SEVERITY_WARNING = 'warning';
    public const SEVERITY_ERROR   = 'error';

    public function __construct(
        public readonly string $path,
        public readonly string $code,
        public readonly string $message,
        public readonly string $severity = self::SEVERITY_WARNING,
        public readonly ?string $action = null,
    ) {}

    /** @return array<string, ?string> */
    public function toArray(): array
    {
        return [
            'path'     => $this->path,
            'code'     => $this->code,
            'message'  => $this->message,
            'severity' => $this->severity,
            'action'   => $this->action,
        ];
    }
}
