<?php
declare(strict_types=1);

namespace LemurCms\DynamicModule\Infrastructure;

use LemurCms\DynamicModule\Domain\Entity\ModuleDefinition;
use LemurCms\DynamicModule\Domain\Entity\ModuleField;
use LemurCms\DynamicModule\Domain\Entity\ModuleFieldType;
use LemurDB;

final class DynamicTableManager
{
    public function __construct(private readonly LemurDB $db) {}

    private function prefixedTable(string $table): string
    {
        $prefix = $this->db->getPrefix();
        if (str_starts_with($table, $prefix)) {
            return $table;
        }
        return $prefix . $table;
    }

    private function hasData(string $table): bool
    {
        $prefixed = $this->prefixedTable($table);
        try {
            $stmt = $this->db->pdo()->query("SELECT COUNT(*) FROM `{$prefixed}`");
            return ((int) $stmt->fetchColumn()) > 0;
        } catch (\Throwable $e) {
            return false;
        }
    }

    public function createTable(ModuleDefinition $def): void
    {
        $prefixed = $this->prefixedTable($def->tableName());
        
        $columns = [
            "`id` CHAR(36) PRIMARY KEY",
        ];

        foreach ($def->fields as $field) {
            $colDef = "`{$field->name}` " . $field->toColumnDefinition();
            if ($field->required) {
                $colDef .= " NOT NULL";
            } else {
                $colDef .= " NULL";
            }

            if ($field->default !== null) {
                if (is_bool($field->default)) {
                    $val = $field->default ? 1 : 0;
                    $colDef .= " DEFAULT {$val}";
                } elseif (is_numeric($field->default)) {
                    $colDef .= " DEFAULT {$field->default}";
                } else {
                    $escaped = $this->db->pdo()->quote((string) $field->default);
                    $colDef .= " DEFAULT {$escaped}";
                }
            } else {
                if (!$field->required) {
                    $colDef .= " DEFAULT NULL";
                }
            }

            $columns[] = $colDef;
        }

        $columns[] = "`created_at` DATETIME NOT NULL";
        $columns[] = "`updated_at` DATETIME NOT NULL";
        $columns[] = "`deleted_at` DATETIME NULL"; // Soft Deletes

        $sql = "CREATE TABLE `{$prefixed}` (\n" . implode(",\n", $columns) . "\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
        $this->db->pdo()->exec($sql);
    }

    public function addColumn(string $table, ModuleField $field): void
    {
        $prefixed = $this->prefixedTable($table);
        $colDef = "`{$field->name}` " . $field->toColumnDefinition();
        if ($field->required) {
            $colDef .= " NOT NULL";
        } else {
            $colDef .= " NULL";
        }

        if ($field->default !== null) {
            if (is_bool($field->default)) {
                $val = $field->default ? 1 : 0;
                $colDef .= " DEFAULT {$val}";
            } elseif (is_numeric($field->default)) {
                $colDef .= " DEFAULT {$field->default}";
            } else {
                $escaped = $this->db->pdo()->quote((string) $field->default);
                $colDef .= " DEFAULT {$escaped}";
            }
        } else {
            if (!$field->required) {
                $colDef .= " DEFAULT NULL";
            }
        }

        $sql = "ALTER TABLE `{$prefixed}` ADD COLUMN {$colDef};";
        $this->db->pdo()->exec($sql);
    }

    public function dropColumn(string $table, string $fieldName): void
    {
        if ($this->hasData($table)) {
            throw new \RuntimeException("Destructive change blocked: Cannot drop column '{$fieldName}' from table '{$table}' because it contains data.");
        }
        $prefixed = $this->prefixedTable($table);
        $sql = "ALTER TABLE `{$prefixed}` DROP COLUMN `{$fieldName}`;";
        $this->db->pdo()->exec($sql);
    }

    public function renameColumn(string $table, string $oldName, string $newName): void
    {
        if ($this->hasData($table)) {
            throw new \RuntimeException("Destructive change blocked: Cannot rename column '{$oldName}' to '{$newName}' in table '{$table}' because it contains data.");
        }
        $prefixed = $this->prefixedTable($table);
        $sql = "ALTER TABLE `{$prefixed}` RENAME COLUMN `{$oldName}` TO `{$newName}`;";
        $this->db->pdo()->exec($sql);
    }

    public function modifyColumn(string $table, string $fieldName, ModuleField $newField): void
    {
        if ($this->hasData($table)) {
            throw new \RuntimeException("Destructive change blocked: Cannot modify column '{$fieldName}' type in table '{$table}' because it contains data.");
        }
        $prefixed = $this->prefixedTable($table);
        $colDef = "`{$newField->name}` " . $newField->toColumnDefinition();
        if ($newField->required) {
            $colDef .= " NOT NULL";
        } else {
            $colDef .= " NULL";
        }

        if ($newField->default !== null) {
            if (is_bool($newField->default)) {
                $val = $newField->default ? 1 : 0;
                $colDef .= " DEFAULT {$val}";
            } elseif (is_numeric($newField->default)) {
                $colDef .= " DEFAULT {$newField->default}";
            } else {
                $escaped = $this->db->pdo()->quote((string) $newField->default);
                $colDef .= " DEFAULT {$escaped}";
            }
        } else {
            if (!$newField->required) {
                $colDef .= " DEFAULT NULL";
            }
        }

        $sql = "ALTER TABLE `{$prefixed}` MODIFY COLUMN {$colDef};";
        $this->db->pdo()->exec($sql);
    }

    public function dropTable(string $table): void
    {
        $prefixed = $this->prefixedTable($table);
        $sql = "DROP TABLE IF EXISTS `{$prefixed}`;";
        $this->db->pdo()->exec($sql);
    }
}
