<?php
declare(strict_types=1);

namespace LemurCms\Seeder;

use LemurDB;
use LemurCms\Support\Helpers\UuidHelper;

abstract class CmsSeeder
{
    public function __construct(
        protected LemurDB $db,
        protected string $prefix = ''
    ) {}

    /**
     * Run the seeder logic.
     */
    abstract public function run(): void;

    /**
     * Check if a table exists.
     */
    protected function checkTableExists(string $tableName): bool
    {
        $prefixed = $this->prefix . $tableName;
        try {
            $driver = $this->db->pdo()->getAttribute(\PDO::ATTR_DRIVER_NAME);
        } catch (\Throwable) {
            $driver = 'mysql';
        }
        if ($driver === 'sqlite') {
            $sql = "SELECT name FROM sqlite_master WHERE type='table' AND name='{$prefixed}'";
            $stmt = $this->db->pdo()->query($sql);
            return count($stmt->fetchAll()) > 0;
        }
        $sql = "SHOW TABLES LIKE '{$prefixed}'";
        $stmt = $this->db->pdo()->query($sql);
        return $stmt->rowCount() > 0;
    }

    /**
     * Truncate a table (disables foreign key checks temporarily).
     */
    protected function truncate(string $tableName): void
    {
        if (!$this->checkTableExists($tableName)) {
            return;
        }
        $prefixed = $this->prefix . $tableName;
        $this->db->pdo()->exec('SET FOREIGN_KEY_CHECKS = 0;');
        $this->db->pdo()->exec("TRUNCATE TABLE `{$prefixed}`");
        $this->db->pdo()->exec('SET FOREIGN_KEY_CHECKS = 1;');
    }

    /**
     * Insert a record only if it doesn't exist based on unique attributes.
     * Generates a UUID if the 'id' field is missing.
     * 
     * @return string|int The ID of the found or created record.
     */
    protected function firstOrCreate(string $tableName, array $attributes, array $values = []): string|int|null
    {
        if (!$this->checkTableExists($tableName)) {
            throw new \RuntimeException("Table {$tableName} does not exist.");
        }

        $query = $this->db->query($tableName)->where($attributes);
        $existing = $query->first();

        if ($existing) {
            return $existing['id'] ?? $existing['uuid'] ?? $existing[array_key_first($existing)];
        }

        $insertData = array_merge($attributes, $values);

        $this->db->query($tableName)->insert($insertData);
        
        return $insertData['id'] ?? $insertData['uuid'] ?? null;
    }

    /**
     * Insert multiple records in a single query.
     */
    protected function insertBatch(string $tableName, array $rows): int
    {
        if (empty($rows)) {
            return 0;
        }

        if (!$this->checkTableExists($tableName)) {
            throw new \RuntimeException("Table {$tableName} does not exist.");
        }

        return $this->db->query($tableName)->insertBatch($rows);
    }
}
