<?php
declare(strict_types=1);

namespace LemurCms\Seeder;

use LemurDB;

class CmsSeederRunner
{
    private array $seeders = [];

    public function __construct(
        private readonly LemurDB $db,
        private readonly string $prefix = ''
    ) {}

    /**
     * Add a seeder class to the execution queue.
     */
    public function addSeeder(string $className): self
    {
        $this->seeders[] = $className;
        return $this;
    }

    /**
     * Run all registered seeders.
     * 
     * @param callable|null $outputCallback Optional callback to receive output messages.
     */
    public function run(?callable $outputCallback = null): void
    {
        $env = getenv('APP_ENV') ?: 'production';
        
        foreach ($this->seeders as $seederClass) {
            // Basic protection: prevent running "Fake" seeders in production
            if ($env === 'production' && str_contains(strtolower($seederClass), 'fake')) {
                if ($outputCallback) {
                    $outputCallback("Skipping {$seederClass} (Blocked in production environment)", 'warn');
                }
                continue;
            }

            if ($outputCallback) {
                $outputCallback("Running {$seederClass}...");
            }

            try {
                /** @var CmsSeeder $seeder */
                $seeder = new $seederClass($this->db, $this->prefix);
                $seeder->run();

                if ($outputCallback) {
                    $outputCallback("✓ {$seederClass} completed successfully.", 'success');
                }
            } catch (\Throwable $e) {
                if ($outputCallback) {
                    $outputCallback("✗ Error in {$seederClass}: " . $e->getMessage(), 'error');
                }
                throw $e;
            }
        }
    }
}
