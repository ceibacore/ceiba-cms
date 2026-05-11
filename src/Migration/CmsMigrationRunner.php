<?php
declare(strict_types=1);

namespace LemurCms\Migration;

use LemurDB;
use Throwable;

/**
 * CmsMigrationRunner
 * 
 * Handles the actual execution of migrations against the database.
 * Tracks applied migrations in a dedicated table.
 */
class CmsMigrationRunner
{
    private const MIGRATIONS_TABLE = 'migrations';

    public function __construct(
        private readonly CmsMigrationGenerator $generator,
        private readonly LemurDB               $db,
        private readonly string                $prefix = ''
    ) {}

    /**
     * Run all pending migrations.
     */
    public function up(): array
    {
        $this->ensureMigrationsTable();
        
        $applied = $this->getAppliedMigrations();
        $all = $this->generator->list();
        
        $pending = array_filter($all, fn($m) => !in_array($m['version'], $applied));
        
        if (empty($pending)) {
            return [];
        }

        $results = [];
        foreach ($pending as $meta) {
            $this->db->transaction(function() use ($meta, &$results) {
                // We use a temporary generator for this specific migration to get its SQL
                // (This is a bit inefficient but keeps logic separated)
                $tempGen = new CmsMigrationGenerator(
                    dirname($meta['full_path']) . '/../migrations', 
                    $this->prefix
                );
                
                // We need to find the specific meta in the new generator discovery
                // Actually, let's just use the current generator's logic but filtered.
                // For simplicity, we'll manually load and run it here if we want full control,
                // or just rely on the generator to give us the SQL log for one.
                
                // Better approach: Update Generator to handle single migrations or just 
                // use the SchemaBuilder directly here.
                
                // But wait, the Generator already has everything.
                // Let's just use the Generator to get the SQL.
            });
        }
        
        // Refactored approach:
        return $this->runPending($pending);
    }

    private function runPending(array $pending): array
    {
        $executed = [];
        $batch = $this->getNextBatchNumber();

        foreach ($pending as $meta) {
            try {
                $builder = new CmsSchemaBuilder($this->prefix, new \LemurCms\Migration\Dialect\MySQLDialect());
                
                // Load migration class
                require_once $meta['full_path'];
                $class = $meta['class'];
                if (!class_exists($class)) {
                    $class = 'LemurCms\\Migrations\\' . $class;
                }
                
                /** @var CmsBaseMigration $migration */
                $migration = new $class($builder);
                $migration->up();
                
                $statements = $builder->getSqlLog();
                foreach ($statements as $sql) {
                    $this->db->pdo()->exec($sql);
                }
                
                // Record in migrations table
                $this->db->query(self::MIGRATIONS_TABLE)->insert([
                    'migration' => $meta['version'],
                    'batch'     => $batch,
                    'applied_at' => date('Y-m-d H:i:s')
                ]);
                
                $executed[] = $meta['version'];
            } catch (Throwable $e) {
                throw new \RuntimeException("Migration {$meta['version']} failed: " . $e->getMessage(), 0, $e);
            }
        }
        return $executed;
    }

    /**
     * Rollback the last batch of migrations.
     */
    public function rollback(): array
    {
        $this->ensureMigrationsTable();
        
        $lastBatch = $this->getLastBatchNumber();
        if ($lastBatch === 0) {
            return [];
        }

        $toRollback = $this->db->query(self::MIGRATIONS_TABLE)
            ->where(['batch' => $lastBatch])
            ->orderBy('migration', 'DESC')
            ->get();

        $allMigrations = $this->generator->list();
        $executed = [];

        foreach ($toRollback as $row) {
            $version = $row['migration'];
            $meta = array_values(array_filter($allMigrations, fn($m) => $m['version'] === $version))[0] ?? null;
            
            if (!$meta) {
                throw new \RuntimeException("Migration file for version {$version} not found for rollback.");
            }

            $builder = new CmsSchemaBuilder($this->prefix, new \LemurCms\Migration\Dialect\MySQLDialect());
            
            require_once $meta['full_path'];
            $class = $meta['class'];
            if (!class_exists($class)) {
                $class = 'LemurCms\\Migrations\\' . $class;
            }
            
            $migration = new $class($builder);
            $migration->down();
            
            foreach ($builder->getSqlLog() as $sql) {
                $this->db->pdo()->exec($sql);
            }
            
            $this->db->query(self::MIGRATIONS_TABLE)
                ->where(['migration' => $version])
                ->delete();
            
            $executed[] = $version;
        }

        return $executed;
    }

    /**
     * Rollback all migrations and run them again.
     */
    public function refresh(): array
    {
        $rolledBack = [];
        while ($batch = $this->rollback()) {
            $rolledBack = array_merge($rolledBack, $batch);
        }
        
        return [
            'rolled_back' => $rolledBack,
            'migrated'    => $this->up()
        ];
    }

    private function ensureMigrationsTable(): void
    {
        $tableName = $this->prefix . self::MIGRATIONS_TABLE;
        $this->db->pdo()->exec("
            CREATE TABLE IF NOT EXISTS `{$tableName}` (
                `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                `migration` VARCHAR(255) NOT NULL,
                `batch` INT NOT NULL,
                `applied_at` DATETIME NOT NULL,
                UNIQUE INDEX `uq_migration` (`migration`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");
    }

    private function getAppliedMigrations(): array
    {
        return array_column(
            $this->db->query(self::MIGRATIONS_TABLE)->select('migration')->get(),
            'migration'
        );
    }

    private function getNextBatchNumber(): int
    {
        return $this->getLastBatchNumber() + 1;
    }

    private function getLastBatchNumber(): int
    {
        $row = $this->db->query(self::MIGRATIONS_TABLE)
            ->select('MAX(batch) as last_batch')
            ->first();
            
        return (int) ($row['last_batch'] ?? 0);
    }
}
