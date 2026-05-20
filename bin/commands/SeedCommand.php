<?php
declare(strict_types=1);

namespace LemurCms\Commands;

use LemurDB;
use LemurCms\Seeder\CmsSeederRunner;

class SeedCommand extends Command
{
    protected string $signature = 'db:seed {--class=}';
    protected string $description = 'Run database seeders';

    public function __construct(private readonly LemurDB $db) {}

    public function handle(): int
    {
        $specificClass = $this->option('class') ? $this->getOptionValue('class') : null;

        $runner = new CmsSeederRunner($this->db, $this->db->getPrefix());

        $className = $specificClass ?: 'DatabaseSeeder';
        $fullClass = str_contains($className, '\\') ? $className : "LemurCms\\Seeders\\" . $className;
        
        // Extract base name to find the file
        $parts = explode('\\', $fullClass);
        $baseName = end($parts);
        $filePath = __DIR__ . "/../../src/Seeders/{$baseName}.php";

        if (file_exists($filePath)) {
            require_once $filePath;
        }

        if (!class_exists($fullClass)) {
            $this->error("Seeder class {$fullClass} does not exist (checked path: {$filePath}).");
            return 1;
        }

        $runner->addSeeder($fullClass);

        try {
            $runner->run(function(string $message, string $type = 'info') {
                if ($type === 'error') {
                    $this->error($message);
                } elseif ($type === 'success') {
                    $this->line("\033[32m{$message}\033[0m");
                } elseif ($type === 'warn') {
                    $this->warn($message);
                } else {
                    $this->info($message);
                }
            });
            return 0;
        } catch (\Throwable $e) {
            $this->error("Seeding failed: " . $e->getMessage());
            return 1;
        }
    }

    // Helper to get option value (e.g. --class=UserSeeder)
    // Since our Command.php only handles boolean options currently, we need a small parsing trick
    private function getOptionValue(string $key): ?string
    {
        global $argv;
        foreach ($argv as $arg) {
            if (str_starts_with($arg, "--{$key}=")) {
                return explode('=', $arg, 2)[1];
            }
        }
        return null;
    }
}
