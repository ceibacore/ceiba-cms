<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Document;

use InvalidArgumentException;
use LemurCms\PageBuilder\Domain\Service\TreeValidator;

/** Versioned, lossless boundary for page-builder documents. No persistence or host dependency. */
final class DocumentEnvelope
{
    public const VERSION = 1;

    private function __construct(
        public readonly string $documentId,
        public readonly int $revision,
        public readonly array $root,
        public readonly array $settings,
        public readonly array $resources,
    ) {}

    /** Legacy content is an array of root nodes. A versioned document is an object. */
    public static function fromArray(array $data, ?string $legacyDocumentId = null): self
    {
        if (array_is_list($data)) {
            if ($legacyDocumentId === null || $legacyDocumentId === '') {
                throw new InvalidArgumentException('Legacy tree requires a document ID');
            }
            $data = [
                'schemaVersion' => self::VERSION,
                'documentId' => $legacyDocumentId,
                'revision' => 0,
                'root' => $data,
                'settings' => [],
                'resources' => [],
            ];
        }

        $unknown = array_diff(array_keys($data), ['schemaVersion', 'documentId', 'revision', 'root', 'settings', 'resources']);
        if ($unknown !== []) {
            throw new InvalidArgumentException('Unknown document fields: ' . implode(', ', $unknown));
        }
        if (($data['schemaVersion'] ?? null) !== self::VERSION) {
            throw new InvalidArgumentException('Unsupported document schema version');
        }
        if (!is_string($data['documentId'] ?? null) || $data['documentId'] === '') {
            throw new InvalidArgumentException('Invalid document ID');
        }
        if (!is_int($data['revision'] ?? null) || $data['revision'] < 0) {
            throw new InvalidArgumentException('Invalid document revision');
        }
        foreach (['root', 'settings', 'resources'] as $field) {
            if (!is_array($data[$field] ?? null)) {
                throw new InvalidArgumentException("Invalid document {$field}");
            }
        }
        if (!array_is_list($data['root'])) {
            throw new InvalidArgumentException('Document root must be a list');
        }
        if (strlen(json_encode($data, JSON_THROW_ON_ERROR)) > 2_000_000) {
            throw new InvalidArgumentException('Document exceeds maximum size');
        }

        self::assertTreeShape($data['root']);
        (new TreeValidator())->assertValid($data['root']);

        return new self($data['documentId'], $data['revision'], $data['root'], $data['settings'], $data['resources']);
    }

    public function toArray(): array
    {
        return [
            'schemaVersion' => self::VERSION,
            'documentId' => $this->documentId,
            'revision' => $this->revision,
            'root' => $this->root,
            'settings' => $this->settings,
            'resources' => $this->resources,
        ];
    }

    private static function assertTreeShape(array $root): void
    {
        $seen = [];
        $count = 0;
        $pending = [];
        foreach ($root as $node) {
            $pending[] = [$node, 0];
        }
        while ($pending !== []) {
            [$node, $depth] = array_pop($pending);
            if (!is_array($node) || $depth > 15 || ++$count > 500) {
                throw new InvalidArgumentException('Invalid document tree shape or limits');
            }
            $id = $node['id'] ?? null;
            if (!is_string($id) || $id === '' || isset($seen[$id])) {
                throw new InvalidArgumentException('Invalid or duplicate node ID');
            }
            $seen[$id] = true;
            $children = $node['children'] ?? [];
            if (!is_array($children) || !array_is_list($children)) {
                throw new InvalidArgumentException('Node children must be a list');
            }
            foreach ($children as $child) {
                $pending[] = [$child, $depth + 1];
            }
        }
    }
}
