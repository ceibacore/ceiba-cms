<?php

declare(strict_types=1);

namespace LemurCms;

class CliKernel
{
    /**
     * @var array<string, object>
     */
    private array $commands = [];

    public function registerCommand(string $name, object $command): void
    {
        $this->commands[$name] = $command;
    }

    public function getCommand(string $name): ?object
    {
        return $this->commands[$name] ?? null;
    }

    public function listCommands(): array
    {
        return $this->commands;
    }

    public function run(array $argv): int
    {
        if (count($argv) < 2) {
            $this->showUsage();
            return 0;
        }

        $commandName = $argv[1];
        $command = $this->getCommand($commandName);

        if (!$command) {
            echo "Command not found: $commandName\n";
            $this->showUsage();
            return 1;
        }

        if (method_exists($command, 'setInput')) {
            $command->setInput($argv);
        }

        return $command->handle();
    }

    private function showUsage(): void
    {
        echo "╔════════════════════════════════════════╗\n";
        echo "║      Lemur CMS - CLI Application       ║\n";
        echo "╚════════════════════════════════════════╝\n\n";

        echo "Available Commands:\n";
        echo "───────────────────\n";

        foreach ($this->commands as $name => $command) {
            $signature = method_exists($command, 'getSignature') ? $command->getSignature() : $name;
            $description = method_exists($command, 'getDescription') ? $command->getDescription() : '';
            printf("  %-30s %s\n", $signature, $description);
        }

        echo "\nUsage: php bin/lemur <command> [options]\n\n";
    }
}
