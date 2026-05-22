<?php
declare(strict_types=1);

namespace LemurCms\DynamicModule\Domain\Entity;

final class ModuleField
{
    public function __construct(
        public readonly string  $name,
        public readonly string  $type,
        public readonly string  $label,
        public readonly bool    $required = false,
        public readonly mixed   $default = null,
        public readonly array   $rules = [],
        public readonly array   $options = [],
        public readonly ?string $relationTarget = null,
        public readonly bool    $isSearchable = true,
    ) {
        if (!preg_match('/^[a-z0-9_]+$/', $name)) {
            throw new \InvalidArgumentException("Field name '{$name}' must be snake_case (lowercase letters, numbers, and underscores).");
        }
        if (!ModuleFieldType::isValid($type)) {
            throw new \InvalidArgumentException("Field type '{$type}' is not a valid ModuleFieldType.");
        }
        if ($type === ModuleFieldType::SELECT && empty($options)) {
            throw new \InvalidArgumentException("Field of type 'select' requires non-empty options array.");
        }
        if ($type === ModuleFieldType::RELATION && empty($relationTarget)) {
            throw new \InvalidArgumentException("Field of type 'relation' requires a non-empty relationTarget.");
        }
    }

    public static function fromArray(array $data): self
    {
        return new self(
            name:           $data['name'] ?? throw new \InvalidArgumentException('ModuleField missing name'),
            type:           $data['type'] ?? throw new \InvalidArgumentException('ModuleField missing type'),
            label:          $data['label'] ?? throw new \InvalidArgumentException('ModuleField missing label'),
            required:       (bool) ($data['required'] ?? false),
            default:        $data['default'] ?? null,
            rules:          $data['rules'] ?? [],
            options:        $data['options'] ?? [],
            relationTarget: $data['relationTarget'] ?? null,
            isSearchable:   (bool) ($data['isSearchable'] ?? true),
        );
    }

    public function toArray(): array
    {
        return [
            'name'           => $this->name,
            'type'           => $this->type,
            'label'          => $this->label,
            'required'       => $this->required,
            'default'        => $this->default,
            'rules'          => $this->rules,
            'options'        => $this->options,
            'relationTarget' => $this->relationTarget,
            'isSearchable'   => $this->isSearchable,
        ];
    }

    /**
     * Converts the field schema to database type declaration.
     */
    public function toColumnDefinition(): string
    {
        switch ($this->type) {
            case ModuleFieldType::TEXT:
                $max = $this->rules['max'] ?? 200;
                return "VARCHAR({$max})";
            case ModuleFieldType::TEXTAREA:
                return "TEXT";
            case ModuleFieldType::RICHTEXT:
                return "LONGTEXT";
            case ModuleFieldType::NUMBER:
                return "INT";
            case ModuleFieldType::DECIMAL:
                $p = $this->rules['precision'] ?? 10;
                $s = $this->rules['scale'] ?? 2;
                return "DECIMAL({$p},{$s})";
            case ModuleFieldType::BOOLEAN:
                return "TINYINT(1)";
            case ModuleFieldType::DATE:
                return "DATE";
            case ModuleFieldType::DATETIME:
                return "DATETIME";
            case ModuleFieldType::SELECT:
                return "VARCHAR(100)";
            case ModuleFieldType::IMAGE:
                return "VARCHAR(500)";
            case ModuleFieldType::RELATION:
                return "CHAR(36)";
            default:
                throw new \RuntimeException("Unhandled field type '{$this->type}' for database column mapping.");
        }
    }
}
