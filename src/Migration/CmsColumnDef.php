<?php
declare(strict_types=1);
namespace LemurCms\Migration;
use LemurCms\Migration\Dialect\CmsDialectInterface;
final class CmsColumnDef
{
    public string  $name;
    public string  $type;
    public bool    $nullable      = false;
    public bool    $notNull       = false;
    public bool    $isPrimary     = false;
    public bool    $isUnique      = false;
    public bool    $unsigned      = false;
    public bool    $autoIncrement = false;
    public mixed   $default       = null;
    public bool    $hasDefault    = false;
    public ?string $after         = null;
    public bool    $onUpdateCurrentTimestamp = false;
    public function __construct(string $name, string $type) { $this->name = $name; $this->type = $type; }
    public function nullable(): self    { $this->nullable = true; $this->notNull = false; return $this; }
    public function notNull(): self     { $this->notNull = true; $this->nullable = false; return $this; }
    public function unsigned(): self    { $this->unsigned = true; return $this; }
    public function primary(): self     { $this->isPrimary = true; $this->notNull = true; return $this; }
    public function unique(): self      { $this->isUnique = true; return $this; }
    public function autoIncrement(): self { $this->autoIncrement = true; return $this; }
    public function after(string $col): self { $this->after = $col; return $this; }
    public function default(mixed $value): self { $this->default = $value; $this->hasDefault = true; return $this; }
    public function onUpdateCurrentTimestamp(): self { $this->onUpdateCurrentTimestamp = true; return $this; }
    public function toInlineSql(CmsDialectInterface $dialect): string
    {
        $q    = fn(string $n) => $dialect->quoteIdentifier($n);
        $type = $this->resolveType($dialect);
        $sql  = $q($this->name) . " {$type}";
        
        // Handle primary key with auto increment first (before unsigned, not after)
        if ($this->isPrimary && $this->autoIncrement) {
            $sql = $q($this->name) . ' ' . $dialect->autoIncrementPkDefinition() . ' PRIMARY KEY';
            return $sql;
        }
        
        if ($this->unsigned && str_contains(strtoupper($type), 'INT')) $sql .= ' UNSIGNED';
        if ($this->notNull)   $sql .= ' NOT NULL';
        if ($this->nullable)  $sql .= ' NULL';
        if ($this->hasDefault) {
            $d = $this->default;
            if ($d === 'CURRENT_TIMESTAMP') $sql .= ' DEFAULT ' . $dialect->currentTimestamp();
            elseif (is_null($d))  $sql .= ' DEFAULT NULL';
            elseif (is_bool($d))  $sql .= ' DEFAULT ' . ($d ? '1' : '0');
            elseif (is_numeric($d)) $sql .= ' DEFAULT ' . $d;
            else $sql .= " DEFAULT '" . addslashes((string)$d) . "'";
        }
        if ($this->onUpdateCurrentTimestamp) $sql .= ' ' . $dialect->onUpdateTimestamp();
        if ($this->isPrimary) $sql .= ' PRIMARY KEY';
        if ($this->isUnique)  $sql .= ' UNIQUE';
        return $sql;
    }
    private function resolveType(CmsDialectInterface $dialect): string
    {
        return match(strtoupper($this->type)) {
            'JSON'    => $dialect->jsonType(),
            'BOOLEAN' => $dialect->booleanType(),
            'TEXT'    => $dialect->textType(),
            default   => $this->type,
        };
    }
}