<?php
declare(strict_types=1);
namespace LemurCms\Migration;

final class GeneratorResult
{
    public function __construct(
        public readonly bool   $success,
        public readonly array  $migrations,
        public readonly array  $sqlLog,
        public readonly ?string $outputFile,
        public readonly array  $errors,
    ) {}

    public function isEmpty(): bool    { return empty($this->migrations); }

    public function toSqlString(string $separator = ";\n\n"): string
    {
        return implode($separator, $this->sqlLog);
    }
}