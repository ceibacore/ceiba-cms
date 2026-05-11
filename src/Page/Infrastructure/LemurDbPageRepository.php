<?php
declare(strict_types=1);
namespace LemurCms\Page\Infrastructure;
use LemurCms\Page\Domain\Repository\PageRepositoryInterface;
use LemurDB;
/**
 * LemurDB adapter — concrete implementation of PageRepositoryInterface.
 * Inject via constructor in your bootstrap.
 */
final class LemurDbPageRepository implements PageRepositoryInterface
{
    public function __construct(private readonly \LemurDB $db) {}

    public function findBySlug(string $slug): ?array
    {
        return $this->db->query('cms_pages')->where(['slug' => $slug, 'status' => 'published'])->first();
    }

    public function findById(int $id): ?array
    {
        return $this->db->query('cms_pages')->where(['id' => $id])->first();
    }

    public function findPublished(int $limit, int $offset): array
    {
        return $this->db->query('cms_pages')
            ->where(['status' => 'published'])
            ->orderBy('sort_order', 'ASC')
            ->limit($limit, $offset)
            ->get();
    }

    public function save(array $data): int
    {
        $id = $data['id'] ?? null;
        if ($id) {
            unset($data['id']);
            $this->db->query('cms_pages')->where(['id' => $id])->update($data);
            return $id;
        }
        return $this->db->query('cms_pages')->insert($data);
    }

    public function delete(int $id): void
    {
        $this->db->query('cms_pages')->where(['id' => $id])->delete();
    }

    public function update(int $id, array $data): void
    {
        $this->db->query('cms_pages')->where(['id' => $id])->update($data);
    }

    public function publish(int $id): void
    {
        $this->db->query('cms_pages')->where(['id' => $id])->update(['status' => 'published']);
    }
}
