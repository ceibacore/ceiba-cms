<?php
declare(strict_types=1);

namespace CeibaCms\PageBuilder\Domain\Service;

/** Shape of a node's loop at save time (TreeValidator): a query block (plan 07-B) or a registered source. */
final class LoopValidator
{
    /** @return list<string> */
    public static function errors(mixed $loop, string $nodeId): array
    {
        $errors = [];
        if (!is_array($loop)) {
            return ["Node '{$nodeId}' loop must be an object"];
        }

        // Plan 07-B: a loop repeats over a query block ({query: '<id>' or '' for the enclosing one}) or a source.
        if (array_key_exists('query', $loop)) {
            if (!is_string($loop['query']) || !preg_match('/^([a-z][a-z0-9_]{0,40})?$/', $loop['query'])) {
                $errors[] = "Node '{$nodeId}' loop.query must be a query id or ''";
            }
        } elseif (empty($loop['source']) || !is_string($loop['source'])) {
            $errors[] = "Node '{$nodeId}' loop missing 'source'";
        }

        if (array_key_exists('variable', $loop) && !is_string($loop['variable'])) {
            $errors[] = "Node '{$nodeId}' loop.variable must be a string";
        } elseif (!array_key_exists('query', $loop) && (empty($loop['variable']) || !is_string($loop['variable']))) {
            $errors[] = "Node '{$nodeId}' loop missing 'variable'";
        }

        if (isset($loop['limit']) && $loop['limit'] !== null && !is_int($loop['limit'])) {
            $errors[] = "Node '{$nodeId}' loop.limit must be integer or null";
        }

        return $errors;
    }
}
