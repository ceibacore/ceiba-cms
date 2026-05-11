<?php

declare(strict_types=1);

namespace LemurCms\Commands;

class MigrateCommand extends Command
{
    protected string $signature = 'migrate {--rollback} {--refresh}';
    protected string $description = 'Run, rollback or refresh database migrations';

    public function __construct(private readonly \LemurDB $db)
    {
    }

    public function handle(): int
    {
        $rollback = $this->option('rollback');
        $refresh  = $this->option('refresh');

        $generator = new \LemurCms\Migration\CmsMigrationGenerator(
            __DIR__ . '/../../migrations',
            $this->db->getPrefix()
        );

        $runner = new \LemurCms\Migration\CmsMigrationRunner(
            $generator,
            $this->db,
            $this->db->getPrefix()
        );

        try {
            if ($refresh) {
                $this->info('Refreshing migrations (rollback all and migrate)...');
                $result = $runner->refresh();
                $this->info(sprintf('Rolled back %d migrations.', count($result['rolled_back'])));
                $this->info(sprintf('Executed %d migrations.', count($result['migrated'])));
                return 0;
            }

            if ($rollback) {
                $this->info('Rolling back last batch of migrations...');
                $executed = $runner->rollback();
                if (empty($executed)) {
                    $this->info('Nothing to rollback.');
                } else {
                    $this->info(sprintf('Rolled back %d migrations:', count($executed)));
                    foreach ($executed as $m) $this->line("  ✓ {$m}");
                }
                return 0;
            }

            $this->info('Running pending migrations...');
            $executed = $runner->up();

            if (empty($executed)) {
                $this->info('Nothing to migrate.');
            } else {
                $this->info(sprintf('Executed %d migrations:', count($executed)));
                foreach ($executed as $m) $this->line("  ✓ {$m}");
            }

            return 0;
        } catch (\Throwable $e) {
            $this->error($e->getMessage());
            return 1;
        }
    }
}
