<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Service;

/**
 * Extracts a subtree (node + all descendants) from a VDOM tree by node ID.
 */
final class SubtreeExtractor
{
    /**
     * Find and return the node with the given ID from the tree.
     * Returns null if not found.
     *
     * @param array  $tree   Flat or nested VDOM node array (the 'tree' key from HtmlImporter result)
     * @param string $nodeId UUID of the target node
     */
    public function findById(array $tree, string $nodeId): ?array
    {
        foreach ($tree as $node) {
            if (!is_array($node)) {
                continue;
            }
            if (($node['id'] ?? '') === $nodeId) {
                return $node;
            }
            if (!empty($node['children'])) {
                $found = $this->findById($node['children'], $nodeId);
                if ($found !== null) {
                    return $found;
                }
            }
        }
        return null;
    }
}
