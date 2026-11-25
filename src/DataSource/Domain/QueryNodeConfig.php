<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Domain;

/**
 * The props of a `query` node (plan 07-B): the query it runs and the URL parameters visitors may change.
 *
 *   {id, source, filters, sort, page_size, pagination: bool, page_param: 'page',
 *    url_params: [{param: 'q', target: 'search'}, {param: 'nivel', target: 'filter', field: 'level', op: 'eq'}]}
 *
 * Only declared parameters are read from the URL; their values go through the same validation as the query.
 */
final class QueryNodeConfig
{
    /** @param list<array{param: string, target: string, field?: string, op?: string}> $urlParams */
    private function __construct(
        public readonly string $id,
        public readonly array $base,
        public readonly bool $paginated,
        public readonly string $pageParam,
        public readonly array $urlParams,
    ) {}

    /** @param array<string, mixed> $props */
    public static function fromProps(array $props): self
    {
        $id = (string) ($props['id'] ?? '');
        if (!preg_match('/^[a-z][a-z0-9_]{0,40}$/', $id)) {
            throw new InvalidDataQuery('QUERY_ID', 'id', 'A query needs an id (lowercase letters, digits, _).');
        }
        $pageParam = (string) ($props['page_param'] ?? 'page');
        $params = [];
        foreach ((array) ($props['url_params'] ?? []) as $i => $p) {
            $param = is_array($p) ? (string) ($p['param'] ?? '') : '';
            $target = is_array($p) ? (string) ($p['target'] ?? '') : '';
            if (!preg_match('/^[a-z][a-z0-9_]{0,30}$/', $param) || !in_array($target, ['search', 'filter'], true) || $param === $pageParam
                || ($target === 'filter' && (!is_string($p['field'] ?? null) || !is_string($p['op'] ?? null)))) {
                throw new InvalidDataQuery('QUERY_URL_PARAM', "url_params.{$i}", 'Invalid URL parameter.');
            }
            $params[$param] = ['param' => $param, 'target' => $target] + ($target === 'filter' ? ['field' => $p['field'], 'op' => $p['op']] : []);
        }
        if (!preg_match('/^[a-z][a-z0-9_]{0,30}$/', $pageParam)) {
            throw new InvalidDataQuery('QUERY_URL_PARAM', 'page_param', 'Invalid page parameter.');
        }
        $base = ['source' => $props['source'] ?? null, 'filters' => $props['filters'] ?? [], 'sort' => $props['sort'] ?? [],
            'page_size' => $props['page_size'] ?? 12];

        return new self($id, $base, (bool) ($props['pagination'] ?? false), $pageParam, array_values($params));
    }

    /**
     * The query with the visitor's declared URL values applied.
     *
     * @param array<string, string> $values declared parameters present in the URL
     */
    public function query(array $values): DataQuery
    {
        $data = $this->base;
        foreach ($this->urlParams as $p) {
            $value = $values[$p['param']] ?? '';
            if ($value === '') {
                continue;
            }
            if ($p['target'] === 'search') {
                $data['search'] = $value;
            } else {
                $data['filters'][] = ['field' => $p['field'], 'op' => $p['op'], 'value' => $p['op'] === 'in' ? explode(',', $value) : $value];
            }
        }
        $page = $values[$this->pageParam] ?? '1';
        $data['page'] = $this->paginated && ctype_digit($page) && (int) $page > 0 ? $page : 1;

        return DataQuery::fromArray($data);
    }

    /**
     * Declared parameters (and the page) present in the request, as short strings.
     *
     * @param array<string, mixed> $request
     * @return array<string, string>
     */
    public function values(array $request): array
    {
        $out = [];
        foreach ([...array_column($this->urlParams, 'param'), ...($this->paginated ? [$this->pageParam] : [])] as $name) {
            $value = $request[$name] ?? null;
            if (is_scalar($value) && trim((string) $value) !== '') {
                $out[$name] = str_replace(['{{', '}}'], '', mb_substr(trim((string) $value), 0, 100)); // never a template
            }
        }

        return $out;
    }
}
