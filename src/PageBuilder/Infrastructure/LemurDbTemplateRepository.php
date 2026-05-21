<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Infrastructure;

use LemurCms\PageBuilder\Domain\Repository\TemplateRepositoryInterface;
use LemurDB;
use LemurCms\Support\Helpers\UuidHelper;

final class LemurDbTemplateRepository implements TemplateRepositoryInterface
{
    public function __construct(private readonly \LemurDB $db) {}

    public function findAll(): array
    {
        $rows = $this->db->query('templates')->orderBy('name', 'ASC')->get();
        return array_map([$this, 'decodeTemplate'], $rows);
    }

    public function findById(string $id): ?array
    {
        $row = $this->db->query('templates')->where(['id' => $id])->first();
        return $this->decodeTemplate($row);
    }

    public function findByCategory(string $category): array
    {
        $rows = $this->db->query('templates')->where(['category' => $category])->orderBy('name', 'ASC')->get();
        return array_map([$this, 'decodeTemplate'], $rows);
    }

    public function save(array $data): string
    {
        $data = $this->encodeTemplate($data);
        $id = $data['id'] ?? null;
        if ($id) {
            unset($data['id']);
            $this->db->query('templates')->where(['id' => $id])->update($data);
            return $id;
        }

        $id = UuidHelper::v4();
        $data['id'] = $id;
        $this->db->query('templates')->insert($data);
        return $id;
    }

    public function delete(string $id): void
    {
        $this->db->query('templates')->where(['id' => $id])->delete();
    }

    private function decodeTemplate(?array $template): ?array
    {
        if ($template === null) {
            return null;
        }
        if (isset($template['tree']) && is_string($template['tree'])) {
            $template['tree'] = json_decode($template['tree'], true) ?? [];
        }
        if (isset($template['is_active'])) {
            $template['is_active'] = (bool) $template['is_active'];
        }
        return $template;
    }

    private function encodeTemplate(array $data): array
    {
        if (isset($data['tree']) && is_array($data['tree'])) {
            $data['tree'] = json_encode($data['tree']);
        }
        if (isset($data['is_active'])) {
            $data['is_active'] = $data['is_active'] ? 1 : 0;
        }
        return $data;
    }
}
