<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Application;

use CeibaCms\DataSource\Domain\InvalidDataQuery;
use CeibaCms\DataSource\Domain\QueryContext;
use CeibaCms\DataSource\Domain\QueryNodeConfig;
use CeibaCms\DataSource\Domain\QueryOutcome;
use CeibaCms\DataSource\Domain\QueryResult;

/**
 * Dynamic content of a request (plan 07-B): runs every `query` node of the trees once (within the context's budget,
 * with the visitor's declared URL values), then expands the trees. A query that is invalid, over budget or whose
 * source fails shows its error state; the reason goes to the log, never to the page.
 */
final class DynamicContent
{
    public function __construct(
        private readonly DataSourceRegistry $registry,
        private readonly TreeExpander $expander = new TreeExpander(),
        private readonly ?\Closure $log = null,
        private readonly ?ContentRoutes $routes = null,
    ) {}

    /**
     * @param list<list<mixed>> $trees e.g. [header, page, footer]: they share queries, budget and URL values
     * @param array<string, mixed> $request the request's query string
     * @param array<string, mixed> $vars variables in scope for every tree (e.g. `record` on a record page)
     * @return list<list<mixed>> the trees, expanded, in the same order
     */
    public function expand(array $trees, array $request, QueryContext $context, array $vars = []): array
    {
        $nodes = [];
        foreach ($trees as $tree) {
            $this->collect($tree, $nodes);
        }
        if ($nodes === [] && $vars === []) {
            return $trees;
        }
        $outcomes = [];
        $keep = [];
        foreach ($nodes as $props) {
            $id = (string) ($props['id'] ?? '');
            if (isset($outcomes[$id])) {
                continue; // one id, one query: the editor keeps ids unique
            }
            if (($props['source'] ?? null) === '@current') {
                $props['source'] = (string) ($vars['_source'] ?? ''); // the source of the archive or record page (07-D)
            }
            $outcome = $this->run($props, $request, $context, count($outcomes));
            $outcomes[$outcome->config->id ?? $id] = $outcome;
            $keep += $outcome->values;
        }

        return array_map(fn (array $tree) => $this->expander->expand($tree, $outcomes, $context->locale, $vars, $keep), $trees);
    }

    /** @param array<string, mixed> $props */
    private function run(array $props, array $request, QueryContext $context, int $ran): QueryOutcome
    {
        try {
            $config = QueryNodeConfig::fromProps($props);
        } catch (InvalidDataQuery $e) {
            $this->report('invalid query node', $e->toArray());

            return new QueryOutcome(QueryNodeConfig::fromProps(['id' => 'invalid_' . $ran]), null, $e->errorCode);
        }
        $values = $config->values($request);
        foreach ((array) ($props['require'] ?? []) as $required) {
            if (!isset($values[(string) $required])) {
                return new QueryOutcome($config, null, null, $values); // nothing asked yet (e.g. a search without words)
            }
        }
        if ($ran >= $context->maxQueries) {
            return new QueryOutcome($config, null, 'QUERY_BUDGET', $values);
        }
        try {
            $query = $config->query($values);
            $result = $this->withUrls($this->registry->query($query, $context), (string) $query->source, $context);

            return new QueryOutcome($config, $result, null, $values, $this->options((string) $query->source, $context));
        } catch (InvalidDataQuery $e) {
            $this->report('query refused', ['id' => $config->id] + $e->toArray());

            return new QueryOutcome($config, null, $e->errorCode, $values);
        } catch (\Throwable $e) {
            $this->report('query failed', ['id' => $config->id, 'error' => $e->getMessage()]);

            return new QueryOutcome($config, null, 'QUERY_FAILED', $values);
        }
    }

    /** Items of a source with public URLs get `_url` (plan 07-D), for links to each record. */
    private function withUrls(QueryResult $result, string $source, QueryContext $context): QueryResult
    {
        $slugField = ($this->routes?->all()[$source] ?? null) !== null ? $this->registry->descriptor($source, $context)->slugField : null;
        if ($slugField === null) {
            return $result;
        }
        $items = array_map(fn (array $item) => $item + ['_url' => $this->routes->urlFor($source, (string) ($item[$slugField] ?? ''))], $result->items);

        return new QueryResult($items, $result->page, $result->pageSize, $result->total, $result->warnings);
    }

    /** @return array<string, list<array{value: string, label: string}>> options of the source's select fields */
    private function options(string $source, QueryContext $context): array
    {
        $out = [];
        foreach ($this->registry->descriptor($source, $context)->publicFields() as $name => $field) {
            if ($field->type === 'select' && $field->options !== []) {
                $out[$name] = array_map(fn (string $o) => ['value' => $o, 'label' => $o], $field->options);
            }
        }

        return $out;
    }

    /** @param list<array<string, mixed>> $found */
    private function collect(array $nodes, array &$found): void
    {
        foreach ($nodes as $node) {
            if (!is_array($node)) {
                continue;
            }
            if (($node['type'] ?? null) === 'query') {
                $found[] = is_array($node['props'] ?? null) ? $node['props'] : [];
            }
            if (is_array($node['children'] ?? null)) {
                $this->collect($node['children'], $found);
            }
        }
    }

    private function report(string $message, array $context): void
    {
        if ($this->log !== null) {
            ($this->log)($message, $context);
        }
    }
}
