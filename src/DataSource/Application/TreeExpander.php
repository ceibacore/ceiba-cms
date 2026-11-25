<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Application;

use CeibaCms\DataSource\Domain\Binding\BindingResolver;
use CeibaCms\DataSource\Domain\Binding\ValueTransforms;
use CeibaCms\DataSource\Domain\QueryControls;
use CeibaCms\DataSource\Domain\QueryOutcome;

/**
 * Turns a tree with dynamic nodes into a plain tree for the renderer (plan 07-B), with the queries already run:
 * - `loop: {query: '<id>' | '', variable}` repeats the node once per item ('' = the enclosing `query` node);
 * - `bindings` and `{{ var.field }}` take values from the loop item (or the page's record) in scope;
 * - `query_state` stays only when its query is in the state it shows (results, empty, error);
 * - `pagination` and `query_filter` get what their views draw.
 * Pure: the same tree and outcomes always give the same result.
 */
final class TreeExpander
{
    public function __construct(private readonly BindingResolver $bindings = new BindingResolver()) {}

    /**
     * @param list<mixed> $nodes
     * @param array<string, QueryOutcome> $outcomes
     * @param array<string, mixed> $vars variables already in scope (e.g. `record` on a record page)
     * @param array<string, string> $keep declared URL values of every query
     * @return list<mixed>
     */
    public function expand(array $nodes, array $outcomes, string $locale, array $vars = [], array $keep = [], ?QueryOutcome $query = null, ?string $default = null): array
    {
        $out = [];
        foreach ($nodes as $node) {
            if (!is_array($node)) {
                $out[] = $node;
                continue;
            }
            array_push($out, ...$this->node($node, $outcomes, $locale, $vars, $keep, $query, $default));
        }

        return $out;
    }

    /** @return list<array<string, mixed>> */
    private function node(array $node, array $outcomes, string $locale, array $vars, array $keep, ?QueryOutcome $query, ?string $default): array
    {
        $type = (string) ($node['type'] ?? '');
        $props = is_array($node['props'] ?? null) ? $node['props'] : [];
        $named = fn (): ?QueryOutcome => isset($props['query']) && $props['query'] !== '' ? ($outcomes[(string) $props['query']] ?? null) : $query;
        if ($type === 'query') {
            $query = $outcomes[(string) ($props['id'] ?? '')] ?? null;
            $node['props'] = ['_state' => $query?->state() ?? 'error'] + $props;
        } elseif ($type === 'query_state') {
            if (($named()?->state() ?? 'error') !== ($props['show'] ?? 'empty')) {
                return [];
            }
        } elseif ($type === 'pagination') {
            $pages = ($o = $named()) !== null ? QueryControls::pagination($o, $keep) : null;
            if ($pages === null) {
                return [];
            }
            $node['props'] = ['_pages' => $pages] + $props;
        } elseif ($type === 'query_filter') {
            $filter = ($o = $named()) !== null ? QueryControls::filter($o, (string) ($props['param'] ?? ''), (string) ($props['kind'] ?? 'search'), $keep) : null;
            if ($filter === null) {
                return [];
            }
            $node['props'] = ['_filter' => $filter] + $props;
        }

        $loop = $node['loop'] ?? null;
        if (is_array($loop) && array_key_exists('query', $loop)) {
            unset($node['loop']);
            $source = $loop['query'] === '' || $loop['query'] === null ? $query : ($outcomes[(string) $loop['query']] ?? null);
            $var = is_string($loop['variable'] ?? null) && preg_match('/^[A-Za-z_][A-Za-z0-9_]{0,40}$/', $loop['variable']) ? $loop['variable'] : 'item';
            $copies = [];
            $items = $source?->items() ?? [];
            foreach ($items as $i => $item) {
                $scope = [$var => $item, 'loop' => ['index' => $i + 1, 'first' => $i === 0, 'last' => $i === count($items) - 1]] + $vars;
                $copies[] = $this->single($node, $outcomes, $locale, $scope, $keep, $source, $var);
            }

            return $copies;
        }

        return [$this->single($node, $outcomes, $locale, $vars, $keep, $query, $default)];
    }

    private function single(array $node, array $outcomes, string $locale, array $vars, array $keep, ?QueryOutcome $query, ?string $default): array
    {
        if ($vars !== []) {
            $node = $this->bindings->apply($node, $vars, $locale, $default);
            if (is_array($node['props'] ?? null)) {
                $node['props'] = $this->interpolate($node['props'], $vars, (string) ($node['type'] ?? ''));
            }
        }
        if (is_array($node['children'] ?? null)) {
            $node['children'] = $this->expand($node['children'], $outcomes, $locale, $vars, $keep, $query, $default);
        }

        return $node;
    }

    /** `{{ var.field }}` for variables in scope only; others stay for the renderer. Escaped where the prop is HTML. */
    private function interpolate(array $props, array $vars, string $type, string $prefix = ''): array
    {
        foreach ($props as $key => $value) {
            if (is_array($value)) {
                $props[$key] = $this->interpolate($value, $vars, $type, $prefix === '' ? (string) $key : $prefix);
            } elseif (is_string($value) && str_contains($value, '{{')) {
                $html = BindingResolver::isHtmlProp($type, $prefix === '' ? (string) $key : $prefix);
                $props[$key] = preg_replace_callback('/\{\{\s*([A-Za-z_][A-Za-z0-9_]*)((?:\.[A-Za-z0-9_]+){0,3})\s*\}\}/', function (array $m) use ($vars, $html) {
                    if (!array_key_exists($m[1], $vars)) {
                        return $m[0];
                    }
                    $v = $vars[$m[1]];
                    foreach (array_filter(explode('.', $m[2])) as $part) {
                        $v = is_array($v) ? ($v[$part] ?? null) : null;
                    }
                    $text = is_scalar($v) ? ValueTransforms::inert((string) $v) : '';

                    return $html ? htmlspecialchars($text, ENT_QUOTES, 'UTF-8') : $text;
                }, $value) ?? $value;
            }
        }

        return $props;
    }
}
