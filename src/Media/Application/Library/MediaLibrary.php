<?php

declare(strict_types=1);

namespace CeibaCms\Media\Application\Library;

use CeibaCms\Media\Domain\MediaReferences;
use CeibaCms\Media\Domain\MediaTypes;
use CeibaCms\Media\Infrastructure\CeibaDbMediaResolver;
use CeibaCms\PageBuilder\Domain\Contract\MediaStorage;
use CeibaCms\PageBuilder\Domain\Document\HostContext;

/** The editor's view of the media table (plan 05-A): search, describe and delete when nothing uses the file. */
final class MediaLibrary
{
    public const PAGE_SIZE = 40;

    public function __construct(
        private readonly \CeibaDB $db,
        private readonly string $baseUrl,
        private readonly MediaStorage $storage,
        private readonly FindMediaUsages $usages,
    ) {}

    /** @return array{items: list<array<string, mixed>>, total: int, page: int, pageSize: int} */
    public function search(string $query, int $page): array
    {
        $page = max(1, min($page, 10_000));
        $marks = implode(',', array_fill(0, count(MediaTypes::IMAGES), '?'));
        $where = "mime_type IN ({$marks})";
        $params = MediaTypes::IMAGES;
        $query = mb_substr(trim($query), 0, 100);
        if ($query !== '') {
            $where .= ' AND (filename LIKE ? OR title LIKE ? OR alt_text LIKE ?)';
            $like = '%' . addcslashes($query, '%_\\') . '%';
            array_push($params, $like, $like, $like);
        }
        $table = $this->db->getPrefix() . 'media';
        $count = $this->db->pdo()->prepare("SELECT COUNT(*) FROM {$table} WHERE {$where}");
        $count->execute($params);
        $rows = $this->db->pdo()->prepare("SELECT * FROM {$table} WHERE {$where} ORDER BY created_at DESC, id LIMIT "
            . self::PAGE_SIZE . ' OFFSET ' . (($page - 1) * self::PAGE_SIZE));
        $rows->execute($params);
        return ['items' => array_map(fn (array $row) => $this->item($row), $rows->fetchAll(\PDO::FETCH_ASSOC)),
            'total' => (int) $count->fetchColumn(), 'page' => $page, 'pageSize' => self::PAGE_SIZE];
    }

    /** @return array<string, mixed>|null */
    public function find(string $id): ?array
    {
        $row = $this->row($id);
        return $row === null ? null : $this->item($row);
    }

    /** @return array<string, mixed>|null the updated item */
    public function describe(string $id, mixed $alt): ?array
    {
        if ($this->row($id) === null) {
            return null;
        }
        $this->db->query('media')->where(['id' => $id])->update(['alt_text' => UploadMedia::alt($alt), 'updated_at' => date('Y-m-d H:i:s')]);
        return $this->find($id);
    }

    /** Deletes the row and every stored file; refuses with MediaInUse while a page or the design uses it. */
    public function remove(HostContext $context, string $id): bool
    {
        $row = $this->row($id);
        if ($row === null) {
            return false;
        }
        $usages = $this->usages->execute($id);
        if ($usages['pages'] !== [] || $usages['design']) {
            throw new MediaInUse($usages);
        }
        $this->db->query('media')->where(['id' => $id])->delete();
        $conversions = is_string($row['conversions'] ?? null) ? json_decode($row['conversions'], true) : null;
        $paths = [(string) $row['path'], ...array_column(is_array($conversions['variants'] ?? null) ? $conversions['variants'] : [], 'path')];
        foreach (array_filter($paths, 'is_string') as $path) {
            try {
                $this->storage->delete($context, $path);
            } catch (\InvalidArgumentException) {
                // A key the storage does not own (imported row): nothing to delete.
            }
        }
        return true;
    }

    /** @return array<string, mixed>|null */
    private function row(string $id): ?array
    {
        return MediaReferences::validId($id) ? $this->db->query('media')->where(['id' => $id])->first() : null;
    }

    /** @param array<string, mixed> $row @return array<string, mixed> */
    private function item(array $row): array
    {
        $media = CeibaDbMediaResolver::media($row, $this->baseUrl);
        return [
            ...$media->toArray(),
            'thumbnail' => $media->variants[0]['url'] ?? $media->url,
            'filename' => (string) $row['filename'], 'mime' => (string) $row['mime_type'], 'size' => (int) $row['size'],
            'originalWidth' => isset($row['width']) ? (int) $row['width'] : null,
            'originalHeight' => isset($row['height']) ? (int) $row['height'] : null,
            'createdAt' => (string) ($row['created_at'] ?? ''),
        ];
    }
}
