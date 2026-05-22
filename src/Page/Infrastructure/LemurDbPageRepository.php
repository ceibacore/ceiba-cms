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
        $res = $this->db->query('pages')->where(['slug' => $slug, 'status' => 'published'])->first();
        return $this->decodePage($res);
    }

    public function findById(string $id): ?array
    {
        $res = $this->db->query('pages')->where(['id' => $id])->first();
        return $this->decodePage($res);
    }

    public function findPublished(int $limit, int $offset): array
    {
        $rows = $this->db->query('pages')
            ->where(['status' => 'published'])
            ->orderBy('sort_order', 'ASC')
            ->limit($limit, $offset)
            ->get();
        return array_map([$this, 'decodePage'], $rows);
    }

    public function save(array $data): string
    {
        $data = $this->encodePage($data);
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
        $data = $this->encodePage($data);
        $this->db->query('pages')->where(['id' => $id])->update($data);
    }

    public function publish(string $id): void
    {
        $this->db->query('pages')->where(['id' => $id])->update(['status' => 'published']);
    }

    private function decodePage(?array $page): ?array
    {
        if ($page === null) {
            return null;
        }
        if (isset($page['content']) && is_string($page['content'])) {
            $decoded = json_decode($page['content'], true) ?? [];

            // Migrate legacy format {"body": "..."} → node array
            if (isset($decoded['body']) && is_string($decoded['body'])) {
                $decoded = [
                    [
                        'type'     => 'html',
                        'props'    => ['content' => $decoded['body']],
                        'children' => [],
                    ],
                ];
            }

            $page['content'] = $decoded;
        }
        return $page;
    }

    private function encodePage(array $data): array
    {
        if (isset($data['content']) && is_array($data['content'])) {
            $data['content'] = json_encode($data['content']);
        }
        return $data;
    }
}
