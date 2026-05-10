<?php
declare(strict_types=1);
namespace LemurCms\Migration;
use LemurCms\Migration\Dialect\CmsDialectInterface;
final class CmsColumnBlueprint
{
    private array $columns = [];
    private array $indexes = [];
    public function __construct(private readonly string $tableName = '') {}
    public function id(string $name = 'id'): CmsColumnDef { return $this->addColumn($name,'INT')->unsigned()->autoIncrement()->primary(); }
    public function string(string $name, int $length = 255): CmsColumnDef { return $this->addColumn($name, "VARCHAR({$length})"); }
    public function char(string $name, int $length = 36): CmsColumnDef   { return $this->addColumn($name, "CHAR({$length})"); }
    public function text(string $name): CmsColumnDef         { return $this->addColumn($name, 'TEXT'); }
    public function integer(string $name): CmsColumnDef      { return $this->addColumn($name, 'INT'); }
    public function unsignedInteger(string $name): CmsColumnDef { return $this->addColumn($name, 'INT')->unsigned(); }
    public function bigInteger(string $name): CmsColumnDef   { return $this->addColumn($name, 'BIGINT'); }
    public function tinyInteger(string $name): CmsColumnDef  { return $this->addColumn($name, 'TINYINT(1)'); }
    public function smallInteger(string $name): CmsColumnDef { return $this->addColumn($name, 'SMALLINT'); }
    public function boolean(string $name): CmsColumnDef      { return $this->addColumn($name, 'BOOLEAN'); }
    public function json(string $name): CmsColumnDef         { return $this->addColumn($name, 'JSON'); }
    public function datetime(string $name): CmsColumnDef     { return $this->addColumn($name, 'DATETIME'); }
    public function timestamp(string $name): CmsColumnDef    { return $this->addColumn($name, 'TIMESTAMP'); }
    public function decimal(string $name, int $p = 10, int $s = 2): CmsColumnDef { return $this->addColumn($name, "DECIMAL({$p},{$s})"); }
    public function enum(string $name, array $values): CmsColumnDef
    {
        $q = implode(',', array_map(fn($v) => "'{$v}'", $values));
        return $this->addColumn($name, "ENUM({$q})");
    }
    public function timestamps(): void
    {
        $this->addColumn('created_at','TIMESTAMP')->default('CURRENT_TIMESTAMP');
        $this->addColumn('updated_at','TIMESTAMP')->default('CURRENT_TIMESTAMP')->onUpdateCurrentTimestamp();
    }
    public function softDeletes(): void { $this->addColumn('deleted_at','DATETIME')->nullable(); }
    public function index(string|array $columns, string $name = ''): void
    {
        $this->indexes[] = ['type'=>'index','columns'=>is_array($columns)?$columns:[$columns],'name'=>$name];
    }
    public function uniqueIndex(string|array $columns, string $name = ''): void
    {
        $this->indexes[] = ['type'=>'unique','columns'=>is_array($columns)?$columns:[$columns],'name'=>$name];
    }
    public function foreignKey(string $col, string $refTable, string $refColumn = 'id', string $onDelete = 'CASCADE', string $name = ''): void
    {
        $n = $name ?: ($this->tableName ? "fk_{$this->tableName}_{$col}" : "fk_{$col}");
        $this->indexes[] = ['type'=>'fk','columns'=>[$col],'name'=>$n,'refTable'=>$refTable,'refColumn'=>$refColumn,'onDelete'=>$onDelete];
    }
    public function toCreateSql(string $prefixedTable, CmsDialectInterface $dialect, string $prefix = ''): string
    {
        $colLines = array_map(fn($c) => '    ' . $c->toInlineSql($dialect), $this->columns);
        $idxLines = [];
        foreach ($this->indexes as $idx) {
            $q    = fn($n) => $dialect->quoteIdentifier($n);
            $cols = implode(', ', array_map($q, $idx['columns']));
            $name = $idx['name'] ?: 'idx_' . implode('_', $idx['columns']);
            switch ($idx['type']) {
                case 'index':  $idxLines[] = "    INDEX {$q($name)} ({$cols})"; break;
                case 'unique': $idxLines[] = "    UNIQUE INDEX {$q($name)} ({$cols})"; break;
                case 'fk':
                    $idxLines[] = sprintf('    CONSTRAINT %s FOREIGN KEY (%s) REFERENCES %s(%s) ON DELETE %s',
                        $q($idx['name']),$cols,$q($prefix.$idx['refTable']),$q($idx['refColumn']),$idx['onDelete']);
                    break;
            }
        }
        return $dialect->createTableSql($prefixedTable, implode(",\n", $colLines), implode(",\n", $idxLines));
    }
    private function addColumn(string $name, string $type): CmsColumnDef
    {
        $col = new CmsColumnDef($name, $type);
        $this->columns[] = $col;
        return $col;
    }
}