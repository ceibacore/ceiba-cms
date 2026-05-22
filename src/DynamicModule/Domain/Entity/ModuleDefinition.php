<?php
declare(strict_types=1);

namespace LemurCms\DynamicModule\Domain\Entity;

final class ModuleDefinition
{
    /**
     * @param ModuleField[] $fields
     */
    public function __construct(
        public readonly string  $id,
        public readonly string  $moduleId,
        public readonly string  $moduleName,
        public readonly string  $moduleSlug,
        public readonly array   $fields,
        public readonly ?string $icon = null,
    ) {
        foreach ($fields as $field) {
            if (!$field instanceof ModuleField) {
                throw new \InvalidArgumentException('All elements in fields array must be instances of ModuleField.');
            }
        }
    }

    public function tableName(): string
    {
        return 'cms_' . $this->moduleSlug;
    }

    public static function fromArray(array $data): self
    {
        $fieldsData = $data['fields'] ?? $data['fields_schema'] ?? [];
        if (is_string($fieldsData)) {
            $fieldsData = json_decode($fieldsData, true) ?? [];
        }
        
        $fields = [];
        foreach ($fieldsData as $f) {
            $fields[] = ModuleField::fromArray($f);
        }

        return new self(
            id:         $data['id'] ?? throw new \InvalidArgumentException('ModuleDefinition missing id'),
            moduleId:   $data['module_id'] ?? throw new \InvalidArgumentException('ModuleDefinition missing module_id'),
            moduleName: $data['module_name'] ?? $data['name'] ?? throw new \InvalidArgumentException('ModuleDefinition missing module_name/name'),
            moduleSlug: $data['module_slug'] ?? $data['slug'] ?? throw new \InvalidArgumentException('ModuleDefinition missing module_slug/slug'),
            fields:     $fields,
            icon:       $data['icon'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'id'          => $this->id,
            'module_id'   => $this->moduleId,
            'module_name' => $this->moduleName,
            'module_slug' => $this->moduleSlug,
            'fields'      => array_map(fn(ModuleField $f) => $f->toArray(), $this->fields),
            'icon'        => $this->icon,
        ];
    }
}
