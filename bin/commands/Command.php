<?php

declare(strict_types=1);

namespace LemurCms\Commands;

abstract class Command
{
    protected string $signature = '';
    protected string $description = '';
    protected array $arguments = [];
    protected array $options = [];

    abstract public function handle(): int;

    public function getSignature(): string
    {
        return $this->signature;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    protected function info(string $message): void
    {
        echo "\033[32m[INFO]\033[0m $message\n";
    }

    protected function error(string $message): void
    {
        echo "\033[31m[ERROR]\033[0m $message\n";
    }

    protected function warn(string $message): void
    {
        echo "\033[33m[WARN]\033[0m $message\n";
    }

    protected function line(string $message): void
    {
        echo "$message\n";
    }

    protected function table(array $headers, array $rows): void
    {
        $widths = array_map(fn($h) => strlen($h), $headers);

        foreach ($rows as $row) {
            foreach ($row as $i => $cell) {
                $widths[$i] = max($widths[$i] ?? 0, strlen((string)$cell));
            }
        }

        $this->line(implode(' | ', array_map(fn($h, $w) => str_pad($h, $w), $headers, $widths)));
        $this->line(implode('-+-', array_map(fn($w) => str_repeat('-', $w), $widths)));

        foreach ($rows as $row) {
            $this->line(implode(' | ', array_map(fn($cell, $w) => str_pad((string)$cell, $w), $row, $widths)));
        }
    }
}
