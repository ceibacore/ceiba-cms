<?php
declare(strict_types=1);

namespace LemurCms\Page\Infrastructure;

use LemurCms\Page\Domain\Repository\AdministrativePageReaderInterface;
use LemurCms\Page\Domain\Repository\PageRepositoryInterface;
use LemurDB;
use LemurCms\Support\Helpers\UuidHelper;

/**
 * LemurDB adapter — concrete implementation of PageRepositoryInterface.
 * Inject via constructor in your bootstrap.
 */
final class LemurDbPageRepository implements PageRepositoryInterface, AdministrativePageReaderInterface
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

    public function findAdministrative(?string $status, ?string $search, int $limit, int $offset): array
    {
        // Explicit SQL: the query builder keeps only the last orderBy(), and the listing
        // needs a deterministic two-column order.
        $where = [];
        $params = [];
        if ($status !== null) {
            $where[] = '`status` = ?';
            $params[] = $status;
        }
        if ($search !== null && $search !== '') {
            // '!' escape is portable across SQLite and MySQL/MariaDB.
            $pattern = '%' . str_replace(['!', '%', '_'], ['!!', '!%', '!_'], $search) . '%';
            $where[] = "(`title` LIKE ? ESCAPE '!' OR `slug` LIKE ? ESCAPE '!')";
            array_push($params, $pattern, $pattern);
        }
        $sql = "SELECT * FROM `{$this->db->getPrefix()}pages`"
            . ($where === [] ? '' : ' WHERE ' . implode(' AND ', $where))
            . ' ORDER BY `sort_order` ASC, `id` ASC LIMIT ' . max(0, $limit) . ' OFFSET ' . max(0, $offset);
        $query = $this->db->pdo()->prepare($sql);
        $query->execute($params);
        return array_map([$this, 'decodePage'], $query->fetchAll(\PDO::FETCH_ASSOC));
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

        if (isset($page['query_config']) && is_string($page['query_config'])) {
            $page['query_config'] = json_decode($page['query_config'], true) ?? [];
        }
        if (isset($page['conditions']) && is_string($page['conditions'])) {
            $page['conditions'] = json_decode($page['conditions'], true) ?? [];
        }

        return $page;
    }

    private function encodePage(array $data): array
    {
        if (isset($data['content']) && is_array($data['content'])) {
            $data['content'] = json_encode($data['content']);
        }
        if (isset($data['query_config']) && is_array($data['query_config'])) {
            $data['query_config'] = json_encode($data['query_config']);
        }
        if (isset($data['conditions']) && is_array($data['conditions'])) {
            $data['conditions'] = json_encode($data['conditions']);
        }
        return $data;
    }
}
