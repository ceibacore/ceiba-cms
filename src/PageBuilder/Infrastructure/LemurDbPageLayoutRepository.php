<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Infrastructure;

use LemurCms\PageBuilder\Domain\Repository\PageLayoutRepositoryInterface;
use LemurCms\PageBuilder\Domain\Entity\PageLayout;
use LemurDB;
use LemurCms\Support\Helpers\UuidHelper;

final class LemurDbPageLayoutRepository implements PageLayoutRepositoryInterface
{
    public function __construct(private readonly \LemurDB $db) {}

    public function findAll(): array
    {
        $rows = $this->db->query('page_layouts')
            ->where(['is_active' => 1])
            ->orderBy('name', 'ASC')
            ->get();

        return array_map(fn($row) => PageLayout::fromArray($row), $rows);
    }

    public function findById(string $id): ?PageLayout
    {
        $row = $this->db->query('page_layouts')->where(['id' => $id])->first();
        return $row !== null ? PageLayout::fromArray($row) : null;
    }

    public function findDefault(): ?PageLayout
    {
        $row = $this->db->query('page_layouts')
            ->where(['is_active' => 1])
            ->orderBy('name', 'ASC')
            ->first();

        return $row !== null ? PageLayout::fromArray($row) : null;
    }

    public function save(array $data): string
    {
        $encoded = $this->encode($data);
        $id = $encoded['id'] ?? null;

        if ($id) {
            unset($encoded['id']);
            $this->db->query('page_layouts')->where(['id' => $id])->update($encoded);
            return $id;
        }

        $id = UuidHelper::v4();
        $encoded['id'] = $id;
        $this->db->query('page_layouts')->insert($encoded);
        return $id;
    }

    public function update(string $id, array $data): void
    {
        $encoded = $this->encode($data);
        unset($encoded['id']);
        $this->db->query('page_layouts')->where(['id' => $id])->update($encoded);
    }

    public function delete(string $id): void
    {
        $this->db->query('page_layouts')->where(['id' => $id])->delete();
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private function encode(array $data): array
    {
        if (isset($data['footer_tree']) && is_array($data['footer_tree'])) {
            $data['footer_tree'] = json_encode($data['footer_tree']);
        }
        if (isset($data['palette']) && is_array($data['palette'])) {
            $data['palette'] = json_encode($data['palette']);
        }
        if (isset($data['use_system_palette'])) {
            $data['use_system_palette'] = $data['use_system_palette'] ? 1 : 0;
        }
        if (isset($data['is_active'])) {
            $data['is_active'] = $data['is_active'] ? 1 : 0;
        }
        return $data;
    }
}
