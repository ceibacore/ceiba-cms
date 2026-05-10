<?php
declare(strict_types=1);
namespace LemurCms\Media\Infrastructure;
use LemurCms\Media\Domain\MediaRepositoryInterface;
use LemurDB;
/**
 * LemurDB adapter — concrete implementation of MediaRepositoryInterface.
 * Inject via constructor in your bootstrap.
 */
final class LemurDbMediaRepository implements MediaRepositoryInterface
{
    public function __construct(private readonly \LemurDB $db) {}

    public function findById(int $id): ?array
    {
        return $this->db->query('cms_media')->where(['id' => $id])->first();
    }

    public function store(array $data): int
    {
        return $this->db->query('cms_media')->insert($data);
    }

    public function delete(int $id): void
    {
        $this->db->query('cms_media')->where(['id' => $id])->delete();
    }

    public function findAll(int $limit, int $offset): array
    {
        return $this->db->query('cms_media')->limit($limit, $offset)->get();
    }
}
