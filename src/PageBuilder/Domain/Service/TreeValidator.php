<?php
declare(strict_types=1);
namespace LemurCms\PageBuilder\Domain\Service;

use LemurCms\PageBuilder\Domain\Entity\Node;

/**
 * Validates a page tree against structural constraints.
 *
 * Rules:
 *  - Max depth: 15 levels
 *  - Max total nodes: 500
 *  - Each node must have: id (non-empty string), type (valid HTML tag)
 *  - `name` is optional; structural containment rules apply to `name` (not `type`)
 *  - Accordion nodes must declare a non-empty props.id so children can wire data-bs-parent
 */
final class TreeValidator
{
    private const MAX_DEPTH = 15;
    private const MAX_NODES = 500;

    /**
     * Valid HTML5 void elements (cannot have children).
     */
    private const VOID_ELEMENTS = [
        'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
        'link', 'meta', 'param', 'source', 'track', 'wbr',
    ];

    /**
     * Valid HTML5 tag names accepted by the VDOM.
     * Extends the minimal set with all commonly used block, inline, form, table,
     * media and interactive elements.
     */
    private const ALLOWED_TAGS = [
        // Structural / layout
        'div', 'span', 'section', 'article', 'aside', 'header', 'footer',
        'main', 'nav', 'address', 'details', 'summary', 'dialog',
        // Headings
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        // Text
        'p', 'blockquote', 'pre', 'code', 'cite', 'q', 'abbr', 'acronym',
        'strong', 'b', 'em', 'i', 'u', 's', 'del', 'ins', 'small', 'mark',
        'sub', 'sup', 'time', 'data', 'var', 'samp', 'kbd', 'dfn', 'bdi', 'bdo',
        'ruby', 'rt', 'rp', 'figcaption', 'figure',
        // Lists
        'ul', 'ol', 'li', 'dl', 'dt', 'dd',
        // Links and interactive
        'a', 'button', 'label', 'legend', 'fieldset',
        // Media
        'img', 'picture', 'source', 'audio', 'video', 'track', 'embed', 'object',
        'iframe', 'canvas', 'svg', 'map', 'area',
        // Table
        'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption', 'colgroup', 'col',
        // Form
        'form', 'input', 'textarea', 'select', 'option', 'optgroup', 'datalist',
        'output', 'progress', 'meter', 'button',
        // Misc
        'hr', 'br', 'wbr', 'noscript', 'template', 'slot',
    ];

    /**
     * Component names (node.name) whose props.id is mandatory.
     * Accordion needs a stable HTML id so its items can reference it
     * via data-bs-parent="#<id>" — without it the collapse behaviour breaks.
     */
    private const NAMES_REQUIRING_PROPS_ID = ['accordion'];

    /**
     * Containment rules based on component `name` (not HTML `type`):
     * parent name => allowed child names.
     * An empty array means no named children allowed.
     * Absent key means any child name is allowed.
     */
    private const CONTAINMENT_RULES = [
        'accordion'   => ['accordion-item'],
        'button-group' => ['button'],
        'carousel'    => ['carousel-item'],
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
            $this->errors[] = 'Tree exceeds maximum of ' . self::MAX_NODES . ' nodes';
            return;
        }

        if ($depth > self::MAX_DEPTH) {
            $this->errors[] = 'Tree exceeds maximum depth of ' . self::MAX_DEPTH;
            return;
        }

        // id
        if (empty($data['id']) || !is_string($data['id'])) {
            $this->errors[] = "Node at depth {$depth} missing valid 'id'";
        }

        // type — must be a valid HTML tag
        $type = $data['type'] ?? '';
        if (empty($type) || !is_string($type)) {
            $this->errors[] = "Node '" . ($data['id'] ?? '?') . "' missing valid 'type'";
        } elseif (!in_array(strtolower($type), self::ALLOWED_TAGS, true)) {
            $this->errors[] = "Node '" . ($data['id'] ?? '?') . "' has unknown HTML tag '{$type}'";
        }

        // name — optional, must be string if present
        if (isset($data['name']) && $data['name'] !== null && !is_string($data['name'])) {
            $this->errors[] = "Node '" . ($data['id'] ?? '?') . "' name must be a string or null";
        }

        // props must be array if present
        if (isset($data['props']) && !is_array($data['props'])) {
            $this->errors[] = "Node '" . ($data['id'] ?? '?') . "' props must be an object";
        }

        // bindings must be array if present
        if (isset($data['bindings']) && $data['bindings'] !== null && !is_array($data['bindings'])) {
            $this->errors[] = "Node '" . ($data['id'] ?? '?') . "' bindings must be an object or null";
        }

        // names that require props.id
        $name = isset($data['name']) && is_string($data['name']) ? $data['name'] : null;
        if ($name !== null && in_array($name, self::NAMES_REQUIRING_PROPS_ID, true)) {
            $propsId = $data['props']['id'] ?? null;
            if (empty($propsId) || !is_string($propsId)) {
                $this->errors[] = "Node '" . ($data['id'] ?? '?') . "' with name '{$name}' must have a non-empty string props.id";
            }
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
                $parentName = $name;
                foreach ($data['children'] as $child) {
                    // Validate containment rules by name
                    if ($parentName !== null && isset(self::CONTAINMENT_RULES[$parentName])) {
                        $childName   = isset($child['name']) && is_string($child['name']) ? $child['name'] : null;
                        $allowed     = self::CONTAINMENT_RULES[$parentName];
                        if (!empty($allowed) && !in_array($childName, $allowed, true)) {
                            $this->errors[] = "Node '" . ($data['id'] ?? '?') . "' (name='{$parentName}') cannot contain child with name='" . ($childName ?? 'null') . "'";
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
