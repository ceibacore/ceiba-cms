<?php
declare(strict_types=1);
namespace LemurCms\PageBuilder\Domain\Service;

use LemurCms\PageBuilder\Domain\Entity\Node;

/**
 * Validates a page tree against structural constraints.
 *
 * Rules (from spec):
 *  - Max depth: 15 levels
 *  - Max total nodes: 500
 *  - Each node must have: id (non-empty string), type (non-empty string)
 *  - Allowed types: container, row, col, text, image, button, card, divider, html
 */
final class TreeValidator
{
    private const MAX_DEPTH = 15;
    private const MAX_NODES = 500;

    private const ALLOWED_TYPES = [
        'container', 'row', 'col', 'text', 'image',
        'button', 'card', 'divider', 'html',
        'accordion', 'accordion_item',
        'button_group', 'breadcrumb',
        'carousel', 'carousel_item', 'collapse', 'list_group',
        'tooltip', 'toast', 'scrollspy', 'offcanvas',
    ];

    /**
     * Containment rules: parent type => allowed child types.
     * An empty array means no children allowed.
     * Null (absent key) means any child type is allowed.
     */
    private const CONTAINMENT_RULES = [
        'accordion' => ['accordion_item'],
        'button_group' => ['button'],
        'breadcrumb' => [],
        'carousel' => ['carousel_item'],
        'list_group' => [],
        'tooltip' => [],
        'toast' => [],
    ];

    /** @var string[] */
    private array $errors = [];
    private int   $nodeCount = 0;

    /**
     * Validate an array of root nodes (the tree).
     *
     * @param  array $tree  Array of raw node arrays
     * @return string[]     List of validation errors (empty = valid)
     */
    public function validate(array $tree): array
    {
        $this->errors    = [];
        $this->nodeCount = 0;

        foreach ($tree as $nodeData) {
            $this->validateNode($nodeData, 0);
        }

        return $this->errors;
    }

    /**
     * Throws on first validation failure (convenience wrapper).
     *
     * @throws \InvalidArgumentException
     */
    public function assertValid(array $tree): void
    {
        $errors = $this->validate($tree);
        if (!empty($errors)) {
            throw new \InvalidArgumentException(
                'Invalid page tree: ' . implode('; ', $errors)
            );
        }
    }

    private function validateNode(array $data, int $depth): void
    {
        $this->nodeCount++;

        if ($this->nodeCount > self::MAX_NODES) {
            $this->errors[] = "Tree exceeds maximum of " . self::MAX_NODES . " nodes";
            return; // stop counting
        }

        if ($depth > self::MAX_DEPTH) {
            $this->errors[] = "Tree exceeds maximum depth of " . self::MAX_DEPTH;
            return;
        }

        // id
        if (empty($data['id']) || !is_string($data['id'])) {
            $this->errors[] = "Node at depth {$depth} missing valid 'id'";
        }

        // type
        if (empty($data['type']) || !is_string($data['type'])) {
            $this->errors[] = "Node '" . ($data['id'] ?? '?') . "' missing valid 'type'";
        } elseif (!in_array($data['type'], self::ALLOWED_TYPES, true)) {
            $this->errors[] = "Node '" . $data['id'] . "' has unknown type '{$data['type']}'";
        }

        // props must be array if present
        if (isset($data['props']) && !is_array($data['props'])) {
            $this->errors[] = "Node '" . ($data['id'] ?? '?') . "' props must be an object";
        }

        // loop validation
        if (isset($data['loop']) && $data['loop'] !== null) {
            $this->validateLoop($data['loop'], $data['id'] ?? '?');
        }

        // children
        if (isset($data['children'])) {
            if (!is_array($data['children'])) {
                $this->errors[] = "Node '" . ($data['id'] ?? '?') . "' children must be an array";
            } else {
                $parentType = $data['type'] ?? '';
                foreach ($data['children'] as $child) {
                    // Validate containment rules
                    if (isset(self::CONTAINMENT_RULES[$parentType])) {
                        $childType = $child['type'] ?? '';
                        $allowed = self::CONTAINMENT_RULES[$parentType];
                        if (!in_array($childType, $allowed, true)) {
                            $this->errors[] = "Node '" . ($data['id'] ?? '?') . "' of type '{$parentType}' cannot contain child of type '{$childType}'";
                        }
                    }
                    $this->validateNode($child, $depth + 1);
                }
            }
        }
    }

    private function validateLoop(mixed $loop, string $nodeId): void
    {
        if (!is_array($loop)) {
            $this->errors[] = "Node '{$nodeId}' loop must be an object";
            return;
        }

        if (empty($loop['source']) || !is_string($loop['source'])) {
            $this->errors[] = "Node '{$nodeId}' loop missing 'source'";
        }

        if (empty($loop['variable']) || !is_string($loop['variable'])) {
            $this->errors[] = "Node '{$nodeId}' loop missing 'variable'";
        }

        if (isset($loop['limit']) && $loop['limit'] !== null && !is_int($loop['limit'])) {
            $this->errors[] = "Node '{$nodeId}' loop.limit must be integer or null";
        }
    }
}
