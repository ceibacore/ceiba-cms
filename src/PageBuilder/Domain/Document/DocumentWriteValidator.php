<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Document;

use InvalidArgumentException;
use JsonException;

final class DocumentWriteValidator
{
    private const MAX_BYTES = 2_000_000;
    private const MAX_NODES = 500;
    private const MAX_DEPTH = 15;

    /** The host resolves resource IDs against the authorized site's storage. */
    public function validate(DocumentEnvelope $document, callable $resourceBelongsToSite): void
    {
        self::checkBytes($document->toJson());
        $this->validateTree($document->root(), true);
        foreach ($document->resources() as $id) {
            if ($resourceBelongsToSite($id) !== true) {
                throw new InvalidArgumentException('Resource is unavailable for this site');
            }
        }
    }

    /** Guard the existing page writer, which persists only legacy content. */
    public function validatePageContent(mixed $content): void
    {
        try {
            $json = is_string($content) ? $content : json_encode($content, JSON_THROW_ON_ERROR);
        } catch (JsonException $e) {
            throw new InvalidArgumentException('Page content must be acyclic JSON', 0, $e);
        }
        self::checkBytes($json);
        if (is_string($content) && !in_array(ltrim($json)[0] ?? '', ['{', '['], true)) {
            return;
        }
        if (!is_array($content) && !is_string($content)) {
            throw new InvalidArgumentException('Expected page content as text or a tree');
        }
        $document = DocumentEnvelope::fromJson($json, 'legacy');
        if ($document->sourceVersion !== 0) {
            throw new InvalidArgumentException('Versioned storage is not enabled for this page writer');
        }
        $this->validateTree($document->root(), false);
    }

    public static function checkBytes(string $json): void
    {
        if (strlen($json) > self::MAX_BYTES) {
            throw new InvalidArgumentException('Document exceeds maximum size');
        }
    }

    private function validateTree(array $root, bool $requireId): void
    {
        $seen = [];
        $count = 0;
        $visit = function (array $nodes, int $depth) use (&$visit, &$seen, &$count, $requireId): void {
            foreach ($nodes as $node) {
                if (++$count > self::MAX_NODES || $depth > self::MAX_DEPTH) {
                    throw new InvalidArgumentException('Document exceeds tree limits');
                }
                $ids = array_unique(array_intersect_key($node, ['id' => true, '_id' => true]));
                if ($requireId && !$ids) {
                    throw new InvalidArgumentException('Node requires an ID');
                }
                foreach ($ids as $id) {
                    if (isset($seen[$id])) {
                        throw new InvalidArgumentException('Duplicate node ID');
                    }
                    $seen[$id] = true;
                }
                $visit($node['children'] ?? [], $depth + 1);
            }
        };
        $visit($root, 0);
    }
}
