<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import;

/**
 * Extracts ALL attributes from a DOMElement into a plain key→value array.
 * Used by import rules to guarantee no attribute is silently dropped.
 */
final class AttrExtractor
{
    /**
     * Return every attribute of the element as ['attr-name' => 'value'].
     * The 'tag' key is reserved for the renderer and is NOT added here.
     */
    public static function all(\DOMElement $el): array
    {
        $attrs = [];
        foreach ($el->attributes as $attr) {
            $attrs[$attr->name] = $attr->value;
        }
        return $attrs;
    }
}
