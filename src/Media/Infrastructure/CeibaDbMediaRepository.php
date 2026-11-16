<?php
declare(strict_types=1);

namespace CeibaCms\Media\Infrastructure;

use CeibaCms\Media\Domain\Repository\MediaRepositoryInterface;
use CeibaDB;

/**
 * CeibaDB adapter — concrete implementation of MediaRepositoryInterface.
 * Inject via constructor in your bootstrap.
 */
final class CeibaDbMediaRepository implements MediaRepositoryInterface
{
    public function __construct(private readonly \CeibaDB $db) {}

    public function findById(string $id): ?array
    {
        return $this->db->query('media')->where(['id' => $id])->first();
    }

    public function store(array $data): string
    {
        $id = $data['id'] ?? \CeibaCms\Support\Helpers\UuidHelper::v4();
        $data['id'] = $id;
        $this->db->query('media')->insert($data);
        return $id;
    }

    public function delete(string $id): void
    {
        $this->db->query('media')->where(['id' => $id])->delete();
    }

    public function findAll(int $limit, int $offset): array
    {
        return $this->db->query('media')->limit($limit, $offset)->get();
    }
}
