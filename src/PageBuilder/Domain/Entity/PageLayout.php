<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Entity;

final class PageLayout
{
    public function __construct(
        public readonly string  $id,
        public readonly string  $name,
        public readonly ?string $description,
        public readonly ?string $menuSlug,
        public readonly array   $footerTree,
        public readonly array   $palette,
        public readonly bool    $useSystemPalette,
        public readonly bool    $isActive,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            id:               $data['id']                ?? '',
            name:             $data['name']              ?? throw new \InvalidArgumentException('PageLayout missing name'),
            description:      $data['description']       ?? null,
            menuSlug:         $data['menu_slug']         ?? null,
            footerTree:       is_string($data['footer_tree'] ?? null)
                                  ? (json_decode($data['footer_tree'], true) ?? [])
                                  : ($data['footer_tree'] ?? []),
            palette:          is_string($data['palette'] ?? null)
                                  ? (json_decode($data['palette'], true) ?? [])
                                  : ($data['palette'] ?? []),
            useSystemPalette: (bool) ($data['use_system_palette'] ?? true),
            isActive:         (bool) ($data['is_active'] ?? true),
        );
    }

    public function toArray(): array
    {
        return [
            'id'                  => $this->id,
            'name'                => $this->name,
            'description'         => $this->description,
            'menu_slug'           => $this->menuSlug,
            'footer_tree'         => $this->footerTree,
            'palette'             => $this->palette,
            'use_system_palette'  => $this->useSystemPalette,
            'is_active'           => $this->isActive,
        ];
    }
}
