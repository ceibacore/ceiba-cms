<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Document;

use InvalidArgumentException;
use JsonException;
use stdClass;

final class DocumentEnvelope
{
    public const VERSION = 1;

    private function __construct(
        public readonly int $sourceVersion,
        private readonly string $json,
    ) {}

    public static function fromJson(string $json, ?string $legacyDocumentId = null): self
    {
        try {
            $data = json_decode($json, false, 512, JSON_THROW_ON_ERROR);
        } catch (JsonException $e) {
            throw new InvalidArgumentException('Invalid document JSON', 0, $e);
        }

        $sourceVersion = self::VERSION;
        if ($data instanceof stdClass && array_keys(get_object_vars($data)) === ['body'] && is_string($data->body)) {
            $data = [(object) ['type' => 'html', 'props' => (object) ['content' => $data->body], 'children' => []]];
            $json = json_encode($data, JSON_THROW_ON_ERROR);
        }
        if (is_array($data)) {
            $sourceVersion = 0;
            $data = (object) [
                'schemaVersion' => self::VERSION, 'documentId' => $legacyDocumentId, 'revision' => 0,
                'root' => $data, 'settings' => new stdClass(), 'resources' => [],
            ];
        }
        if (!$data instanceof stdClass || ($data->schemaVersion ?? null) !== self::VERSION) {
            throw new InvalidArgumentException('Unsupported document schema version');
        }
        $fields = ['schemaVersion', 'documentId', 'revision', 'root', 'settings', 'resources'];
        if (array_diff(array_keys(get_object_vars($data)), $fields)
            || !self::nonEmptyString($data->documentId ?? null)
            || !is_int($data->revision ?? null) || $data->revision < 0
            || !is_array($data->root ?? null) || !(($data->settings ?? null) instanceof stdClass)
            || !is_array($data->resources ?? null)) {
            throw new InvalidArgumentException('Invalid document envelope');
        }
        foreach ($data->resources as $resource) {
            if (!self::nonEmptyString($resource)) {
                throw new InvalidArgumentException('Invalid resource reference');
            }
        }
        self::validateNodes($data->root);
        if ($sourceVersion === 0) {
            // Keep the original tree JSON so extension values retain numeric precision and object shape.
            $id = json_encode($data->documentId, JSON_THROW_ON_ERROR);
            $json = '{"schemaVersion":1,"documentId":' . $id . ',"revision":0,"root":' . $json
                . ',"settings":{},"resources":[]}';
            json_decode($json);
            if (json_last_error() === JSON_ERROR_DEPTH) {
                throw new InvalidArgumentException('Tree exceeds maximum envelope depth');
            }
        }
        return new self($sourceVersion, $json);
    }

    private static function validateNodes(array $nodes): void
    {
        foreach ($nodes as $node) {
            if (!$node instanceof stdClass || !self::nonEmptyString($node->type ?? null)) {
                throw new InvalidArgumentException('Expected node with a type');
            }
            foreach (['id', '_id'] as $field) {
                if (property_exists($node, $field) && !self::nonEmptyString($node->$field)) {
                    throw new InvalidArgumentException("Invalid node {$field}");
                }
            }
            foreach (['name', 'label'] as $field) {
                if (isset($node->$field) && !is_string($node->$field)) {
                    throw new InvalidArgumentException("Invalid node {$field}");
                }
            }
            foreach (['props', 'loop', 'bindings'] as $field) {
                if (!property_exists($node, $field)) {
                    continue;
                }
                $value = $node->$field;
                if ($value instanceof stdClass || $value === [] || ($field !== 'props' && $value === null)) {
                    continue;
                }
                throw new InvalidArgumentException("Invalid node {$field}");
            }
            if (property_exists($node, 'children')) {
                if (!is_array($node->children)) {
                    throw new InvalidArgumentException('Expected child node list');
                }
                self::validateNodes($node->children);
            }
        }
    }

    private static function nonEmptyString(mixed $value): bool
    {
        return is_string($value) && $value !== '';
    }

    /** PHP node list for existing renderers and editor adapters. */
    public function root(): array
    {
        return json_decode($this->json, true, 512, JSON_THROW_ON_ERROR | JSON_BIGINT_AS_STRING)['root'];
    }

    /** @return list<string> */
    public function resources(): array
    {
        return json_decode($this->json, true, 512, JSON_THROW_ON_ERROR)['resources'];
    }

    public function toJson(): string
    {
        return $this->json;
    }
}
