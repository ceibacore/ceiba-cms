<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Infrastructure;

use LemurCms\PageBuilder\Domain\Repository\PageTemplateRepositoryInterface;
use LemurDB;
use LemurCms\Support\Helpers\UuidHelper;

final class LemurDbPageTemplateRepository implements PageTemplateRepositoryInterface
{
    public function __construct(private readonly LemurDB $db) {}

    public function findById(string $id): ?array
    {
        $res = $this->db->query('page_templates')->where(['id' => $id])->first();
        if ($res === null) {
            return null;
        }
        if (isset($res['tree']) && is_string($res['tree'])) {
            $res['tree'] = json_decode($res['tree'], true) ?? [];
        }
        if (isset($res['slots_definition']) && is_string($res['slots_definition'])) {
            $res['slots_definition'] = json_decode($res['slots_definition'], true) ?? [];
        }
        return $res;
    }

    public function save(array $data): string
    {
        if (isset($data['tree']) && is_array($data['tree'])) {
            $data['tree'] = json_encode($data['tree']);
        }
        if (isset($data['slots_definition']) && is_array($data['slots_definition'])) {
            $data['slots_definition'] = json_encode($data['slots_definition']);
        }

        $id = $data['id'] ?? null;
        if ($id) {
            unset($data['id']);
            $this->db->query('page_templates')->where(['id' => $id])->update($data);
            return $id;
        }

        $id = UuidHelper::v4();
        $data['id'] = $id;
        $this->db->query('page_templates')->insert($data);
        return $id;
    }

    public function delete(string $id): void
    {
        $this->db->query('page_templates')->where(['id' => $id])->delete();
    }
}
