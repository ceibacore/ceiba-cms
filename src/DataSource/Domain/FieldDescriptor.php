<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Domain;

/**
 * One field of a data source (plan 07, D-1): its type decides which operators, sorts and transforms apply.
 * A private field never leaves the source: not in the catalogue, not in a result, not usable in a filter.
 */
final class FieldDescriptor
{
    public const TYPES = ['text', 'richtext', 'number', 'decimal', 'boolean', 'date', 'datetime', 'image', 'url', 'select', 'relation', 'id'];

    /** @param list<string> $options allowed values of a select */
    public function __construct(
        public readonly string $name,
        public readonly string $type,
        public readonly string $label,
        public readonly bool $nullable = true,
        public readonly bool $public = true,
        public readonly bool $searchable = false,
        public readonly bool $sortable = true,
        public readonly array $options = [],
        public readonly ?string $relationSource = null,
    ) {
        if (!preg_match('/^[a-z][a-z0-9_]{0,63}$/', $name)) {
            throw new \InvalidArgumentException("Invalid field name '{$name}'.");
        }
        if (!in_array($type, self::TYPES, true)) {
            throw new \InvalidArgumentException("Invalid field type '{$type}' for '{$name}'.");
        }
        if ($type === 'relation' && ($relationSource === null || $relationSource === '')) {
            throw new \InvalidArgumentException("Relation field '{$name}' needs its source.");
        }
    }

    /** @return list<string> */
    public function operators(): array
    {
        $base = $this->nullable ? ['is_null', 'not_null'] : [];

        return match ($this->type) {
            'text', 'url' => ['eq', 'neq', 'in', 'contains', 'starts_with', ...$base],
            'richtext', 'image' => $base,
            'number', 'decimal', 'date', 'datetime' => ['eq', 'neq', 'in', 'gt', 'gte', 'lt', 'lte', ...$base],
            'boolean' => ['eq', ...$base],
            'select', 'relation', 'id' => ['eq', 'neq', 'in', ...$base],
        };
    }

    public function isSortable(): bool
    {
        return $this->sortable && !in_array($this->type, ['richtext', 'image', 'relation'], true);
    }

    /** @return array<string, mixed> the catalogue entry shown to the editor */
    public function toArray(): array
    {
        return ['name' => $this->name, 'type' => $this->type, 'label' => $this->label, 'nullable' => $this->nullable,
            'searchable' => $this->searchable, 'sortable' => $this->isSortable(), 'operators' => $this->operators(),
            'options' => $this->options, 'relation' => $this->relationSource];
    }
}
