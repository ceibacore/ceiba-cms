<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Document;

use InvalidArgumentException;
use JsonException;
use stdClass;

/**
 * Pure and deterministic document migrator.
 *
 * Converts legacy page content (HTML strings, legacy node trees, campus editor shapes)
 * into a fully compliant DocumentEnvelope v1, tracking all incompatibilities and
 * preserving the exact original snapshot for audit and rollback.
 */
final class DocumentMigrator
{
    private const MAX_BYTES = 2_000_000;
    private const MAX_NODES = 500;
    private const MAX_DEPTH = 15;

    private const RESOURCE_PROPS = [
        'src',
        'image',
        'media_id',
        'mediaId',
        'imageId',
        'background_image',
        'backgroundImage',
    ];

    /**
     * Pure, deterministic migration without side effects or I/O.
     *
     * @param string|array<mixed>|DocumentEnvelope $input
     * @param string $documentId Stable document identifier.
     * @param array<string, mixed> $options
     */
    public function migrate(string|array|DocumentEnvelope $input, string $documentId, array $options = []): MigrationReport
    {
        if (trim($documentId) === '') {
            throw new InvalidArgumentException('Document ID must be a non-empty string');
        }

        $incompatibilities = [];
        $originalSnapshot = '';
        $rawDecoded = null;

        // 1. Extract snapshot & parse into intermediate structure
        if ($input instanceof DocumentEnvelope) {
            $originalSnapshot = $input->toJson();
            try {
                $rawDecoded = json_decode($originalSnapshot, false, 512, JSON_THROW_ON_ERROR);
            } catch (JsonException $e) {
                return $this->errorReport($documentId, $originalSnapshot, 'INVALID_JSON', 'Malformed document JSON: ' . $e->getMessage());
            }
        } elseif (is_array($input)) {
            try {
                $originalSnapshot = json_encode($input, JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES);
                $rawDecoded = json_decode($originalSnapshot, false, 512, JSON_THROW_ON_ERROR);
            } catch (JsonException $e) {
                return $this->errorReport($documentId, '', 'CYCLE_DETECTED', 'Circular reference or unencodable tree structure: ' . $e->getMessage());
            }
        } elseif (is_string($input)) {
            $originalSnapshot = $input;
            if (strlen($input) > self::MAX_BYTES) {
                return $this->errorReport($documentId, $originalSnapshot, 'SIZE_LIMIT_EXCEEDED', 'Input exceeds maximum allowed bytes');
            }

            $trimmed = trim($input);
            if ($trimmed === '' || !in_array($trimmed[0], ['{', '['], true)) {
                // Plain HTML string or body text
                $rawDecoded = [(object) [
                    'type'     => 'html',
                    'props'    => (object) ['content' => $input],
                    'children' => [],
                ]];
                $incompatibilities[] = new MigrationIncompatibility(
                    'root',
                    'LEGACY_HTML_BODY',
                    'Plain text or HTML body adapted to canonical html component',
                    MigrationIncompatibility::SEVERITY_INFO,
                    'wrapped_html'
                );
            } else {
                try {
                    $rawDecoded = json_decode($input, false, 512, JSON_THROW_ON_ERROR);
                } catch (JsonException $e) {
                    return $this->errorReport($documentId, $originalSnapshot, 'INVALID_JSON', 'Invalid JSON syntax: ' . $e->getMessage());
                }
            }
        } else {
            throw new InvalidArgumentException('Expected string, array, or DocumentEnvelope');
        }

        // 2. Normalize top-level envelope/root structure
        $settings = new stdClass();
        $revision = 0;
        $existingResources = [];
        $rootNodes = [];

        if ($rawDecoded instanceof stdClass) {
            $vars = get_object_vars($rawDecoded);
            if (array_keys($vars) === ['body'] && is_string($rawDecoded->body)) {
                $rootNodes = [(object) [
                    'type'     => 'html',
                    'props'    => (object) ['content' => $rawDecoded->body],
                    'children' => [],
                ]];
                $incompatibilities[] = new MigrationIncompatibility(
                    'root',
                    'LEGACY_HTML_BODY',
                    'Legacy body object converted to html component',
                    MigrationIncompatibility::SEVERITY_INFO,
                    'adapted_body'
                );
            } elseif (($rawDecoded->schemaVersion ?? null) === 1 && isset($rawDecoded->root) && is_array($rawDecoded->root)) {
                $rootNodes = $rawDecoded->root;
                $settings = ($rawDecoded->settings instanceof stdClass) ? $rawDecoded->settings : new stdClass();
                $revision = is_int($rawDecoded->revision ?? null) && $rawDecoded->revision >= 0 ? $rawDecoded->revision : 0;
                $existingResources = is_array($rawDecoded->resources ?? null) ? $rawDecoded->resources : [];
            } elseif (isset($rawDecoded->tree) && is_array($rawDecoded->tree)) {
                $rootNodes = $rawDecoded->tree;
            } else {
                return $this->errorReport($documentId, $originalSnapshot, 'INVALID_ROOT_SHAPE', 'Expected envelope or node list');
            }
        } elseif (is_array($rawDecoded)) {
            $rootNodes = $rawDecoded;
        } else {
            return $this->errorReport($documentId, $originalSnapshot, 'INVALID_ROOT_SHAPE', 'Expected array of nodes');
        }

        // 3. Deterministic node traversal
        $seenIds = [];
        $nodeCount = 0;
        $maxDepth = 0;
        $generatedIdsCount = 0;
        $deduplicatedIdsCount = 0;
        $extractedResources = [];

        $traverse = function (array $nodes, int $depth, string $pathPrefix) use (
            &$traverse, &$seenIds, &$nodeCount, &$maxDepth, &$generatedIdsCount,
            &$deduplicatedIdsCount, &$extractedResources, &$incompatibilities, $documentId
        ): array {
            $normalizedNodes = [];

            foreach ($nodes as $index => $node) {
                $nodeCount++;
                if ($nodeCount > self::MAX_NODES) {
                    throw new InvalidArgumentException('Node limit exceeded (> 500 nodes)');
                }
                if ($depth > self::MAX_DEPTH) {
                    throw new InvalidArgumentException('Tree depth limit exceeded (> 15 levels)');
                }
                $maxDepth = max($maxDepth, $depth);
                $currentPath = $pathPrefix === '' ? (string) $index : "{$pathPrefix}.{$index}";

                if (is_array($node)) {
                    $node = (object) $node;
                }
                if (!$node instanceof stdClass || !isset($node->type) || !is_string($node->type) || $node->type === '') {
                    throw new InvalidArgumentException("Invalid node type at '{$currentPath}'");
                }

                // Node Identifier Resolution
                $id = (isset($node->id) && is_string($node->id) && trim($node->id) !== '') ? trim($node->id) : null;
                $legacyId = (isset($node->{'_id'}) && is_string($node->{'_id'}) && trim($node->{'_id'}) !== '') ? trim($node->{'_id'}) : null;

                if ($id === null && $legacyId === null) {
                    $type = $node->type;
                    $hash = substr(hash('sha256', "{$documentId}:{$currentPath}:{$type}"), 0, 8);
                    $chosenId = "{$type}-{$hash}";
                    $generatedIdsCount++;
                    $incompatibilities[] = new MigrationIncompatibility(
                        $currentPath,
                        'MISSING_ID',
                        "Node of type '{$type}' at '{$currentPath}' lacked an identifier; assigned deterministic '{$chosenId}'",
                        MigrationIncompatibility::SEVERITY_INFO,
                        'assigned_deterministic_id'
                    );
                } else {
                    $chosenId = $id ?? $legacyId;
                }

                // Check for duplicate ID
                if (isset($seenIds[$chosenId])) {
                    $originalPath = $seenIds[$chosenId];
                    $dedupHash = substr(hash('sha256', "{$documentId}:{$currentPath}:dup"), 0, 6);
                    $dedupId = "{$chosenId}-dup-{$dedupHash}";
                    $deduplicatedIdsCount++;
                    $incompatibilities[] = new MigrationIncompatibility(
                        $currentPath,
                        'DUPLICATE_ID',
                        "Duplicate identifier '{$chosenId}' at '{$currentPath}' (first seen at '{$originalPath}'); re-assigned to '{$dedupId}'",
                        MigrationIncompatibility::SEVERITY_WARNING,
                        'deduplicated_id'
                    );
                    $chosenId = $dedupId;
                }

                $seenIds[$chosenId] = $currentPath;
                $node->id = $chosenId;
                $node->{'_id'} = $chosenId;

                // Props normalization & Media scanning
                if (!isset($node->props) || !($node->props instanceof stdClass)) {
                    if (is_array($node->props ?? null) && !empty($node->props)) {
                        $node->props = (object) $node->props;
                    } else {
                        $node->props = new stdClass();
                    }
                }

                foreach (self::RESOURCE_PROPS as $propKey) {
                    if (isset($node->props->$propKey) && is_string($node->props->$propKey)) {
                        $val = trim($node->props->$propKey);
                        if ($val !== '' && !str_starts_with($val, 'data:') && !str_starts_with($val, 'http://') && !str_starts_with($val, 'https://')) {
                            if (!isset($extractedResources[$val])) {
                                $extractedResources[$val] = true;
                                $incompatibilities[] = new MigrationIncompatibility(
                                    "{$currentPath}.props.{$propKey}",
                                    'RESOURCE_EXTRACTED',
                                    "Extracted media resource '{$val}' from node '{$chosenId}'",
                                    MigrationIncompatibility::SEVERITY_INFO,
                                    'registered_resource'
                                );
                            }
                        }
                    }
                }

                // Children traversal
                if (isset($node->children)) {
                    if (is_array($node->children)) {
                        $node->children = $traverse($node->children, $depth + 1, $currentPath);
                    } else {
                        $node->children = [];
                        $incompatibilities[] = new MigrationIncompatibility(
                            "{$currentPath}.children",
                            'NORMALIZED_CHILDREN',
                            "Non-array children converted to empty list at '{$currentPath}'",
                            MigrationIncompatibility::SEVERITY_INFO,
                            'normalized_children'
                        );
                    }
                } else {
                    $node->children = [];
                }

                $normalizedNodes[] = $node;
            }

            return $normalizedNodes;
        };

        try {
            $migratedRoot = $traverse($rootNodes, 0, '');
        } catch (InvalidArgumentException $e) {
            return $this->errorReport($documentId, $originalSnapshot, 'LIMIT_EXCEEDED', $e->getMessage());
        }

        // 4. Combine resources deterministically
        $allResources = array_values(array_unique(array_merge(
            array_filter($existingResources, 'is_string'),
            array_keys($extractedResources)
        )));
        sort($allResources);

        // 5. Build envelope JSON
        $envelopeData = (object) [
            'schemaVersion' => 1,
            'documentId'    => $documentId,
            'revision'      => $revision,
            'root'          => $migratedRoot,
            'settings'      => $settings,
            'resources'     => $allResources,
        ];

        try {
            $json = json_encode($envelopeData, JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES);
        } catch (JsonException $e) {
            return $this->errorReport($documentId, $originalSnapshot, 'ENCODING_ERROR', 'Failed to encode envelope JSON: ' . $e->getMessage());
        }

        if (strlen($json) > self::MAX_BYTES) {
            return $this->errorReport($documentId, $originalSnapshot, 'SIZE_LIMIT_EXCEEDED', 'Document exceeds maximum envelope size (2 MB)');
        }

        try {
            $envelope = DocumentEnvelope::fromJson($json, $documentId);
            // Self-validate against tree limits and node ID requirements
            (new DocumentWriteValidator())->validate($envelope, fn(string $id): bool => true);
        } catch (InvalidArgumentException $e) {
            return $this->errorReport($documentId, $originalSnapshot, 'VALIDATION_FAILED', 'Migrated document failed write validation: ' . $e->getMessage());
        }

        $stats = [
            'nodeCount'            => $nodeCount,
            'maxDepth'             => $maxDepth,
            'generatedIdsCount'    => $generatedIdsCount,
            'deduplicatedIdsCount' => $deduplicatedIdsCount,
            'resourcesCount'       => count($allResources),
            'byteSize'             => strlen($json),
        ];

        return new MigrationReport(
            $documentId,
            $originalSnapshot,
            $envelope,
            $incompatibilities,
            $stats,
            true
        );
    }

    private function errorReport(string $documentId, string $snapshot, string $code, string $message): MigrationReport
    {
        return new MigrationReport(
            $documentId,
            $snapshot,
            null,
            [new MigrationIncompatibility('root', $code, $message, MigrationIncompatibility::SEVERITY_ERROR, 'migration_blocked')],
            ['nodeCount' => 0, 'maxDepth' => 0, 'generatedIdsCount' => 0, 'deduplicatedIdsCount' => 0, 'resourcesCount' => 0, 'byteSize' => strlen($snapshot)],
            false
        );
    }
}
