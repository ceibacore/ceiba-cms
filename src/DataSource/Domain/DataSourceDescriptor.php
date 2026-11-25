<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Domain;

/**
 * What a data source offers (plan 07, D-1): its public fields, capabilities and limits. Ids look like
 * `module:<slug>` (generated from a dynamic module) or `host:<name>` (registered by the host).
 */
final class DataSourceDescriptor
{
    public const CAPABILITIES = ['search', 'pagination', 'single'];

    /** @var array<string, FieldDescriptor> */
    private array $fields = [];

    /**
     * @param list<FieldDescriptor> $fields
     * @param list<string> $capabilities
     * @param array{field: string, direction: string}|null $defaultSort
     */
    public function __construct(
        public readonly string $id,
        public readonly string $label,
        array $fields,
        public readonly array $capabilities = ['pagination'],
        public readonly ?array $defaultSort = null,
        public readonly int $maxPageSize = 50,
        public readonly ?string $slugField = null,
    ) {
        if (!preg_match('/^(module|host):[a-z0-9][a-z0-9_.-]{0,80}$/', $id)) {
            throw new \InvalidArgumentException("Invalid data source id '{$id}'.");
        }
        foreach ($fields as $field) {
            $this->fields[$field->name] = $field;
        }
        foreach ($capabilities as $capability) {
            if (!in_array($capability, self::CAPABILITIES, true)) {
                throw new \InvalidArgumentException("Unknown capability '{$capability}' in '{$id}'.");
            }
        }
        if ($slugField !== null && !isset($this->fields[$slugField])) {
            throw new \InvalidArgumentException("Slug field '{$slugField}' is not a field of '{$id}'.");
        }
    }

    public function has(string $capability): bool
    {
        return in_array($capability, $this->capabilities, true);
    }

    /** A public field, or null (unknown and private fields look the same from outside). */
    public function publicField(string $name): ?FieldDescriptor
    {
        $field = $this->fields[$name] ?? null;

        return $field !== null && $field->public ? $field : null;
    }

    /** @return array<string, FieldDescriptor> */
    public function publicFields(): array
    {
        return array_filter($this->fields, fn (FieldDescriptor $f) => $f->public);
    }

    /** @return list<string> */
    public function searchableFields(): array
    {
        return array_keys(array_filter($this->publicFields(), fn (FieldDescriptor $f) => $f->searchable));
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return ['id' => $this->id, 'label' => $this->label, 'capabilities' => $this->capabilities, 'max_page_size' => $this->maxPageSize,
            'default_sort' => $this->defaultSort, 'slug_field' => $this->slugField,
            'fields' => array_values(array_map(fn (FieldDescriptor $f) => $f->toArray(), $this->publicFields()))];
    }
}
