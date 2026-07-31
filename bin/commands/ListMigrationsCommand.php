<?php

declare(strict_types=1);

namespace LemurCms\Commands;

class ListMigrationsCommand extends Command
{
    protected string $signature = 'migrate:list';
    protected string $description = 'List all migrations';

    public function handle(): int
    {
        $this->info('Available migrations:');

        $migrationsPath = __DIR__ . '/../../migrations';
        $files = glob($migrationsPath . '/*.php');

        if (empty($files)) {
            $this->warn('No migrations found');
            return 0;
        }

        $migrations = [];
        foreach ($files as $file) {
            $name = basename($file, '.php');
            $migrations[] = [$name];
        }

        $this->table(['Migration'], $migrations);

        return 0;
    }
}
