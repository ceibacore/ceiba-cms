<?php
declare(strict_types=1);

namespace LemurCms\Page\Infrastructure;

use LemurCms\Page\Domain\Repository\PageRepositoryInterface;
use LemurDB;
use LemurCms\Support\Helpers\UuidHelper;

/**
 * LemurDB adapter — concrete implementation of PageRepositoryInterface.
 * Inject via constructor in your bootstrap.
 */
final class LemurDbPageRepository implements PageRepositoryInterface
{
    public function __construct(private readonly \LemurDB $db) {}

    public function findBySlug(string $slug): ?array
    {
        return $this->db->query('pages')->where(['slug' => $slug, 'status' => 'published'])->first();
    }

    public function findById(string $id): ?array
    {
        return $this->db->query('pages')->where(['id' => $id])->first();
    }

    public function findPublished(int $limit, int $offset): array
    {
        return $this->db->query('pages')
            ->where(['status' => 'published'])
            ->orderBy('sort_order', 'ASC')
            ->limit($limit, $offset)
            ->get();
    }

    public function save(array $data): string
    {
        $id = $data['id'] ?? null;
        if ($id) {
            unset($data['id']);
            $this->db->query('pages')->where(['id' => $id])->update($data);
            return $id;
        }
        
        $id = UuidHelper::v4();
        $data['id'] = $id;
        $this->db->query('pages')->insert($data);
        return $id;
    }

    public function delete(string $id): void
    {
        $this->db->query('pages')->where(['id' => $id])->delete();
    }

    public function update(string $id, array $data): void
    {
        $this->db->query('pages')->where(['id' => $id])->update($data);
    }

    public function publish(string $id): void
    {
        $this->db->query('pages')->where(['id' => $id])->update(['status' => 'published']);
    }
}
