<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Entity;

final class PageTemplate
{
    public function __construct(
        public readonly string  $id,
        public readonly string  $name,
        public readonly ?string $description,
        public readonly array   $tree,
        public readonly array   $slotsDefinition,
        public readonly ?string $thumbnail = null,
    ) {}

    public static function fromArray(array $data): self
    {
        $tree = is_string($data['tree'] ?? null)
            ? (json_decode($data['tree'], true) ?? [])
            : ($data['tree'] ?? []);

        $slotsDefinition = is_string($data['slots_definition'] ?? null)
            ? (json_decode($data['slots_definition'], true) ?? [])
            : ($data['slots_definition'] ?? []);

        return new self(
            id:              $data['id']               ?? '',
            name:            $data['name']             ?? throw new \InvalidArgumentException('PageTemplate missing name'),
            description:     $data['description']      ?? null,
            tree:            $tree,
            slotsDefinition: $slotsDefinition,
            thumbnail:       $data['thumbnail']        ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'id'               => $this->id,
            'name'             => $this->name,
            'description'      => $this->description,
            'tree'             => $this->tree,
            'slots_definition' => $this->slotsDefinition,
            'thumbnail'        => $this->thumbnail,
        ];
    }
}
