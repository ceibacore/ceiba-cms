<?php
declare(strict_types=1);

namespace LemurCms\Localization\Infrastructure;

use LemurCms\Localization\Domain\Repository\LanguageRepositoryInterface;
use LemurDB;
use LemurCms\Support\Helpers\UuidHelper;

final class LemurDbLanguageRepository implements LanguageRepositoryInterface
{
    public function __construct(private readonly \LemurDB $db) {}

    public function all(): array
    {
        return $this->db->query('cms_languages')
            ->orderBy('is_default', 'DESC')
            ->orderBy('label', 'ASC')
            ->get();
    }

    public function find(string $id): ?array
    {
        return $this->db->query('cms_languages')->where(['id' => $id])->first();
    }

    public function findByCode(string $code): ?array
    {
        return $this->db->query('cms_languages')->where(['code' => $code])->first();
    }

    public function create(array $data): string
    {
        $id = $data['id'] ?? UuidHelper::v4();
        $data['id'] = $id;

        if (!isset($data['is_active'])) {
            $data['is_active'] = 1;
        } else {
            $data['is_active'] = $data['is_active'] ? 1 : 0;
        }

        if (!isset($data['is_default'])) {
            $data['is_default'] = 0;
        } else {
            $data['is_default'] = $data['is_default'] ? 1 : 0;
        }

        $now = date('Y-m-d H:i:s');
        $data['created_at'] = $now;
        $data['updated_at'] = $now;

        $this->db->query('cms_languages')->insert($data);

        return $id;
    }

    public function update(string $id, array $data): void
    {
        if (isset($data['id'])) {
            unset($data['id']);
        }

        if (isset($data['is_active'])) {
            $data['is_active'] = $data['is_active'] ? 1 : 0;
        }
        if (isset($data['is_default'])) {
            $data['is_default'] = $data['is_default'] ? 1 : 0;
        }

        $data['updated_at'] = date('Y-m-d H:i:s');

        $this->db->query('cms_languages')->where(['id' => $id])->update($data);
    }

    public function delete(string $id): void
    {
        $this->db->query('cms_languages')->where(['id' => $id])->delete();
    }
}
