<?php

declare(strict_types=1);

namespace LemurCms\PageBuilder\Import;

/**
 * Utility helper to navigate the DOM tree for contextual rules.
 */
final class DomHelper
{
    /**
     * Checks if the element has an ancestor with the given tag name.
     */
    public static function hasAncestor(\DOMElement $el, string $tag): bool
    {
        $tag = strtolower($tag);
        $parent = $el->parentNode;

        while ($parent instanceof \DOMElement) {
            if (strtolower($parent->tagName) === $tag) {
                return true;
            }
            $parent = $parent->parentNode;
        }

        return false;
    }

    /**
     * Traverses up the DOM tree and returns the first ancestor that matches the callback.
     */
    public static function findAncestor(\DOMElement $el, callable $callback): ?\DOMElement
    {
        $parent = $el->parentNode;

        while ($parent instanceof \DOMElement) {
            if ($callback($parent)) {
                return $parent;
            }
            $parent = $parent->parentNode;
        }

        return null;
    }
}
