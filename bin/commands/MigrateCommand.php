<?php

declare(strict_types=1);

namespace LemurCms\Commands;

class MigrateCommand extends Command
{
    protected string $signature = 'migrate';
    protected string $description = 'Run database migrations';

    public function __construct(private \PDO $pdo)
    {
    }

    public function handle(): int
    {
        $this->info('Running migrations...');

        try {
            $generator = new \LemurCms\Migration\CmsMigrationGenerator(__DIR__ . '/../../');

            $result = $generator->generate();

            if (!$result->success) {
                $this->error($result->message);
                return 1;
            }

            $this->info($result->message);
            $this->info(sprintf('Executed %d migrations', count($result->migrations)));

            foreach ($result->migrations as $migration) {
                $this->line("  ✓ {$migration}");
            }

            return 0;
        } catch (\Exception $e) {
            $this->error($e->getMessage());
            return 1;
        }
    }
}
