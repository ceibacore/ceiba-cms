<?php
declare(strict_types=1);
namespace LemurCms\Migration;

abstract class CmsBaseMigration
{
    public const VERSION     = '';
    public const DESCRIPTION = '';

    protected CmsSchemaBuilder $schema;

    final public function __construct(CmsSchemaBuilder $schema)
    {
        $this->schema = $schema;
    }

    abstract public function up(): void;
    abstract public function down(): void;

    final public function getVersion(): string     { return static::VERSION; }
    final public function getDescription(): string { return static::DESCRIPTION; }
}