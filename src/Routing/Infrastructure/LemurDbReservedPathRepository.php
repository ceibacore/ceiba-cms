<?php
declare(strict_types=1);

namespace LemurCms\Routing\Infrastructure;

use LemurCms\Routing\Domain\Repository\ReservedPathRepositoryInterface;
use LemurDB;
use LemurCms\Support\Helpers\UuidHelper;

final class LemurDbReservedPathRepository implements ReservedPathRepositoryInterface
{
    public function __construct(private readonly \LemurDB $db) {}

    public function findAll(): array
    {
        return $this->db->query('reserved_paths')->orderBy('path', 'ASC')->get();
    }

    public function findById(string $id): ?array
    {
        return $this->db->query('reserved_paths')->where(['id' => $id])->first();
    }

    public function findByPath(string $path): ?array
    {
        return $this->db->query('reserved_paths')->where(['path' => $path])->first();
    }

    public function save(array $data): string
    {
        $id = UuidHelper::v4();
        $this->db->query('reserved_paths')->insert([
            'id'     => $id,
            'path'   => $data['path'],
            'reason' => $data['reason'] ?? null,
        ]);
        return $id;
    }

    public function delete(string $id): void
    {
        $this->db->query('reserved_paths')->where(['id' => $id])->delete();
    }

    public function deleteByPath(string $path): void
    {
        $this->db->query('reserved_paths')->where(['path' => $path])->delete();
    }
}
