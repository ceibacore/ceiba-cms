<?php
declare(strict_types=1);

namespace CeibaCms\Routing\Infrastructure;

use CeibaCms\Routing\Domain\Repository\ReservedPathRepositoryInterface;
use CeibaDB;
use CeibaCms\Support\Helpers\UuidHelper;

final class CeibaDbReservedPathRepository implements ReservedPathRepositoryInterface
{
    public function __construct(private readonly \CeibaDB $db) {}

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
