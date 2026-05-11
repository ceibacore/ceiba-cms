<?php

declare(strict_types=1);

namespace LemurCms\Commands;

abstract class Command
{
    protected string $signature = '';
    protected string $description = '';
    protected array $inputArguments = [];
    protected array $inputOptions = [];

    abstract public function handle(): int;

    public function setInput(array $argv): void
    {
        // Skip script name and command name
        $input = array_slice($argv, 2);
        
        foreach ($input as $arg) {
            if (str_starts_with($arg, '--')) {
                $option = substr($arg, 2);
                $this->inputOptions[$option] = true;
            } else {
                $this->inputArguments[] = $arg;
            }
        }
    }

    protected function option(string $name): bool
    {
        return isset($this->inputOptions[$name]);
    }

    protected function argument(int $index): ?string
    {
        return $this->inputArguments[$index] ?? null;
    }

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
