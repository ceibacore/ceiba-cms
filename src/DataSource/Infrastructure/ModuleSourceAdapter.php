<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Infrastructure;

use CeibaCms\DataSource\Domain\DataQuery;
use CeibaCms\DataSource\Domain\DataSourceAdapter;
use CeibaCms\DataSource\Domain\DataSourceDescriptor;
use CeibaCms\DataSource\Domain\FieldDescriptor;
use CeibaCms\DataSource\Domain\QueryContext;
use CeibaCms\DynamicModule\Domain\Entity\ModuleDefinition;
use CeibaCms\DynamicModule\Domain\Entity\ModuleField;

/**
 * A dynamic module as a data source `module:<slug>` (plan 07-A), generated from its definition. Private fields
 * (`isPublic: false`) are described as private and never leave it. A field named `slug` (else the id) gives the
 * record its public URL.
 */
final class ModuleSourceAdapter implements DataSourceAdapter
{
    private const TYPES = ['text' => 'text', 'textarea' => 'text', 'richtext' => 'richtext', 'number' => 'number', 'decimal' => 'decimal',
        'boolean' => 'boolean', 'date' => 'date', 'datetime' => 'datetime', 'select' => 'select', 'image' => 'image', 'relation' => 'relation'];

    private ?DataSourceDescriptor $descriptor = null;

    public function __construct(
        private readonly ModuleDefinition $module,
        private readonly ModuleQueryRunner $runner,
        private readonly ModuleRelationLabels $labels,
    ) {}

    public function descriptor(QueryContext $context): DataSourceDescriptor
    {
        if ($this->descriptor !== null) {
            return $this->descriptor;
        }
        $fields = [new FieldDescriptor('id', 'id', 'ID', nullable: false)];
        $names = ['id'];
        foreach ($this->module->fields as $field) {
            $fields[] = $this->field($field);
            $names[] = $field->name;
        }
        $fields[] = new FieldDescriptor('created_at', 'datetime', 'Creado', nullable: false);
        $fields[] = new FieldDescriptor('updated_at', 'datetime', 'Actualizado');
        $slug = in_array('slug', $names, true) && $this->isPublicField('slug') ? 'slug' : 'id';

        return $this->descriptor = new DataSourceDescriptor('module:' . $this->module->moduleSlug, $this->module->moduleName, $fields,
            ['search', 'pagination', 'single'], ['field' => 'created_at', 'direction' => 'desc'], 50, $slug);
    }

    public function fetch(DataQuery $query, QueryContext $context): array
    {
        $descriptor = $this->descriptor($context);
        $result = $this->runner->run($this->module->tableName(), $query, $descriptor->searchableFields());

        return ['items' => $this->labels->attach($result['items'], $descriptor), 'total' => $result['total']];
    }

    public function findBySlug(string $slug, QueryContext $context): ?array
    {
        $descriptor = $this->descriptor($context);
        $row = $this->runner->findBy($this->module->tableName(), (string) $descriptor->slugField, $slug);

        return $row === null ? null : $this->labels->attach([$row], $descriptor)[0];
    }

    private function field(ModuleField $field): FieldDescriptor
    {
        $type = self::TYPES[$field->type] ?? 'text';
        $options = array_is_list($field->options) ? array_map('strval', $field->options) : array_map('strval', array_keys($field->options));

        return new FieldDescriptor($field->name, $type, $field->label, nullable: !$field->required, public: $field->isPublic,
            searchable: $field->isSearchable && in_array($field->type, ['text', 'textarea', 'richtext'], true),
            options: $type === 'select' ? $options : [], relationSource: $type === 'relation' ? 'module:' . $field->relationTarget : null);
    }

    private function isPublicField(string $name): bool
    {
        foreach ($this->module->fields as $field) {
            if ($field->name === $name) {
                return $field->isPublic;
            }
        }

        return false;
    }
}
