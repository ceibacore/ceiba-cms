<?php
declare(strict_types=1);
namespace LemurCms\Migration;
use LemurCms\Migration\Dialect\CmsDialectInterface;
use LemurCms\Migration\Dialect\MySQLDialect;

/**
 * DDL builder — NEVER executes SQL against the database.
 * All generated statements accumulate in $sqlLog for export.
 * This is intentional: Lemur CMS generates migration scripts,
 * it does NOT auto-apply schema changes to the database.
 */
final class CmsSchemaBuilder
{
    private array $sqlLog = [];

    public function __construct(
        private readonly string             $prefix  = '',
        private readonly CmsDialectInterface $dialect = new MySQLDialect(),
    ) {}

    // ── Table-level ──────────────────────────────────────────────────────────

    public function createTable(string $table, callable $definition): void
    {
        $blueprint = new CmsColumnBlueprint($table);
        $blueprint->setTablePrefix($this->prefix);
        $definition($blueprint);
        $sql = $blueprint->toCreateSql($this->prefix($table), $this->dialect, $this->prefix);
        $this->log($sql);
    }

    public function dropTable(string $table): void
    {
        $this->log($this->dialect->dropTableSql($this->prefix($table)));
    }

    public function dropTableIfExists(string $table): void
    {
        $this->log($this->dialect->dropTableIfExistsSql($this->prefix($table)));
    }

    public function renameTable(string $from, string $to): void
    {
        $this->log($this->dialect->renameTableSql($this->prefix($from), $this->prefix($to)));
    }

    // ── Column-level ─────────────────────────────────────────────────────────

    public function addColumn(string $table, string $column, string $type, array $options = []): void
    {
        $col = $this->buildColumnDef($column, $type, $options);
        $this->log($this->dialect->addColumnSql($this->prefix($table), $col));
    }

    public function dropColumn(string $table, string $column): void
    {
        $this->log($this->dialect->dropColumnSql($this->prefix($table), $column));
    }

    public function modifyColumn(string $table, string $column, string $type, array $options = []): void
    {
        $col = $this->buildColumnDef($column, $type, $options);
        $this->log($this->dialect->modifyColumnSql($this->prefix($table), $col));
    }

    public function renameColumn(string $table, string $oldName, string $newName): void
    {
        $this->log($this->dialect->renameColumnSql($this->prefix($table), $oldName, $newName, ''));
    }

    // ── Index-level ───────────────────────────────────────────────────────────

    public function addIndex(string $table, string|array $columns, string $name = '', bool $unique = false): void
    {
        $cols = is_array($columns) ? $columns : [$columns];
        $this->log($this->dialect->addIndexSql($this->prefix($table), $cols, $name, $unique));
    }

    public function dropIndex(string $table, string $name): void
    {
        $this->log($this->dialect->dropIndexSql($this->prefix($table), $name));
    }

    public function addForeignKey(string $table, string $column, string $refTable, string $refColumn = 'id', string $onDelete = 'RESTRICT', string $name = ''): void
    {
        $this->log($this->dialect->addForeignKeySql(
            $this->prefix($table), $column,
            $this->prefix($refTable), $refColumn,
            $onDelete, $name
        ));
    }

    public function dropForeignKey(string $table, string $name): void
    {
        $this->log($this->dialect->dropForeignKeySql($this->prefix($table), $name));
    }

    // ── Raw SQL accumulation ──────────────────────────────────────────────────

    public function statement(string $sql): void
    {
        $this->log($sql);
    }

    // ── Introspection ─────────────────────────────────────────────────────────

    public function getSqlLog(): array          { return $this->sqlLog; }
    public function getDialect(): CmsDialectInterface { return $this->dialect; }

    // ── Internal ──────────────────────────────────────────────────────────────

    private function prefix(string $table): string { return $this->prefix . $table; }

    private function log(string $sql): void { $this->sqlLog[] = $sql; }

    private function buildColumnDef(string $column, string $type, array $options): CmsColumnDef
    {
        $col = new CmsColumnDef($column, $type);
        if ($options['nullable']       ?? false) $col->nullable();
        if ($options['unsigned']       ?? false) $col->unsigned();
        if ($options['auto_increment'] ?? false) $col->autoIncrement();
        if (array_key_exists('default', $options)) $col->default($options['default']);
        if ($options['after']          ?? null)  $col->after($options['after']);
        if ($options['on_update']      ?? false) $col->onUpdateCurrentTimestamp();
        return $col;
    }
}