<?php
declare(strict_types=1);
namespace LemurCms\Migration;
use LemurCms\Migration\Dialect\CmsDialectInterface;
use LemurCms\Migration\Dialect\MySQLDialect;

/**
 * CmsMigrationGenerator
 *
 * Discovers migration classes, calls up() in pure dry-run mode,
 * and collects the resulting DDL SQL.
 *
 * This class NEVER opens a database connection.
 * It NEVER executes SQL against any database.
 * Its sole purpose is to produce SQL scripts for manual review and execution.
 *
 * Usage:
 *   $gen    = new CmsMigrationGenerator(__DIR__ . '/migrations');
 *   $result = $gen->generate(__DIR__ . '/storage/schema.sql');
 *   echo $result->toSqlString();
 */
final class CmsMigrationGenerator
{
    private const FILE_PATTERN = '/^(\d{14})_([a-z0-9_]+)\.php$/';
    private const CLASS_PREFIX = 'Migration_';

    public function __construct(
        private readonly string              $migrationsPath,
        private readonly string              $prefix  = '',
        private readonly CmsDialectInterface $dialect = new MySQLDialect(),
    ) {}

    /**
     * Collect SQL for all migrations and optionally write to a file.
     *
     * @param string|null $outputFile  Absolute path for the .sql output file.
     *                                 If null, SQL is returned in the result only.
     */
    public function generate(?string $outputFile = null): GeneratorResult
    {
        $discovered = $this->discoverMigrations();

        if (empty($discovered)) {
            return new GeneratorResult(true, [], [], $outputFile, []);
        }

        $allSql  = [];
        $errors  = [];
        $applied = [];

        foreach ($discovered as $meta) {
            try {
                $builder   = new CmsSchemaBuilder($this->prefix, $this->dialect);
                $migration = $this->loadMigration($meta, $builder);
                $migration->up();

                $stmts = $builder->getSqlLog();
                $allSql[] = "-- Migration: {$meta['version']} {$meta['name']}";
                foreach ($stmts as $stmt) {
                    $allSql[] = rtrim($stmt, ';') . ';';
                }
                $allSql[] = '';

                $applied[] = $meta['version'];
            } catch (\Throwable $e) {
                $errors[] = ['version' => $meta['version'], 'message' => $e->getMessage()];
            }
        }

        if ($outputFile !== null && !empty($allSql)) {
            $dir = dirname($outputFile);
            if (!is_dir($dir)) {
                mkdir($dir, 0755, true);
            }
            $header  = "-- Lemur CMS — Generated schema (do not edit manually)\n";
            $header .= "-- Generated: " . date('Y-m-d H:i:s') . "\n";
            $header .= "-- Dialect: " . $this->dialect->getName() . "\n\n";
            file_put_contents($outputFile, $header . implode("\n", $allSql));
        }

        return new GeneratorResult(
            success:    empty($errors),
            migrations: $applied,
            sqlLog:     $allSql,
            outputFile: $outputFile,
            errors:     $errors,
        );
    }

    /**
     * Collect SQL for the down() direction (rollback script).
     * Runs migrations in reverse order.
     */
    public function generateRollback(?string $outputFile = null): GeneratorResult
    {
        $discovered = array_reverse($this->discoverMigrations());

        $allSql = [];
        $errors = [];
        $applied = [];

        foreach ($discovered as $meta) {
            try {
                $builder   = new CmsSchemaBuilder($this->prefix, $this->dialect);
                $migration = $this->loadMigration($meta, $builder);
                $migration->down();

                $stmts = $builder->getSqlLog();
                if (!empty($stmts)) {
                    $allSql[] = "-- Rollback: {$meta['version']} {$meta['name']}";
                    foreach ($stmts as $stmt) {
                        $allSql[] = rtrim($stmt, ';') . ';';
                    }
                    $allSql[] = '';
                }
                $applied[] = $meta['version'];
            } catch (\Throwable $e) {
                $errors[] = ['version' => $meta['version'], 'message' => $e->getMessage()];
            }
        }

        if ($outputFile !== null && !empty($allSql)) {
            $header  = "-- Lemur CMS — Rollback script\n";
            $header .= "-- Generated: " . date('Y-m-d H:i:s') . "\n\n";
            file_put_contents($outputFile, $header . implode("\n", $allSql));
        }

        return new GeneratorResult(
            success:    empty($errors),
            migrations: $applied,
            sqlLog:     $allSql,
            outputFile: $outputFile,
            errors:     $errors,
        );
    }

    /**
     * List all discovered migration files without generating SQL.
     */
    public function list(): array
    {
        return array_map(fn($m) => [
            'version'     => $m['version'],
            'name'        => $m['name'],
            'file'        => basename($m['file']),
            'full_path'   => $m['file'],
            'class'       => $m['class'],
            'description' => $this->resolveDescription($m),
        ], $this->discoverMigrations());
    }

    // ── Internal ──────────────────────────────────────────────────────────────

    private function discoverMigrations(): array
    {
        if (!is_dir($this->migrationsPath)) return [];

        $files = scandir($this->migrationsPath);
        if ($files === false) return [];

        $migrations = [];
        foreach ($files as $file) {
            if (!preg_match(self::FILE_PATTERN, $file, $m)) continue;
            $migrations[] = [
                'version' => $m[1],
                'name'    => $m[2],
                'file'    => $this->migrationsPath . DIRECTORY_SEPARATOR . $file,
                'class'   => self::CLASS_PREFIX . $m[1] . '_' . $this->snakeToStudly($m[2]),
            ];
        }

        usort($migrations, fn($a, $b) => strcmp($a['version'], $b['version']));
        return $migrations;
    }

    private function loadMigration(array $meta, CmsSchemaBuilder $builder): CmsBaseMigration
    {
        if (!file_exists($meta['file'])) {
            throw new \RuntimeException("Migration file not found: {$meta['file']}");
        }
        require_once $meta['file'];

        $class = $meta['class'];
        if (!class_exists($class)) {
            $ns = 'LemurCms\\Migrations\\' . $class;
            if (!class_exists($ns)) {
                throw new \RuntimeException("Migration class '{$class}' not found in {$meta['file']}");
            }
            $class = $ns;
        }

        return new $class($builder);
    }

    private function resolveDescription(array $meta): string
    {
        try {
            $builder   = new CmsSchemaBuilder($this->prefix, $this->dialect);
            $migration = $this->loadMigration($meta, $builder);
            return $migration->getDescription();
        } catch (\Throwable) {
            return '';
        }
    }

    private function snakeToStudly(string $snake): string
    {
        return implode('', array_map('ucfirst', explode('_', $snake)));
    }
}