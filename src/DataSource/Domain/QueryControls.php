<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Domain;

/**
 * What the `pagination` and `query_filter` views draw (plan 07, D-6): plain GET links and forms built from the
 * declared URL parameters, so they work without JavaScript. Other declared values are kept; a filter resets the page.
 */
final class QueryControls
{
    /**
     * @param array<string, string> $keep declared values of every query on the page
     * @return array{current: int, pages: ?int, prev: ?string, next: ?string, links: list<array{label: string, href: string, current: bool}>}|null
     */
    public static function pagination(QueryOutcome $outcome, array $keep): ?array
    {
        $result = $outcome->result;
        if (!$outcome->config->paginated || $result === null) {
            return null;
        }
        $param = $outcome->config->pageParam;
        $href = static function (int $page) use ($keep, $param): string {
            $query = $keep;
            unset($query[$param]);
            if ($page > 1) {
                $query[$param] = (string) $page;
            }

            return $query === [] ? '?' : '?' . http_build_query($query);
        };
        $current = $result->page;
        $pages = $result->pages();
        $links = [];
        if ($pages !== null) {
            foreach (array_unique([1, ...range(max(1, $current - 2), min($pages, $current + 2)), $pages]) as $page) {
                $links[] = ['label' => (string) $page, 'href' => $href($page), 'current' => $page === $current];
            }
        }

        return ['current' => $current, 'pages' => $pages, 'prev' => $current > 1 ? $href($current - 1) : null,
            'next' => $result->hasMore() ? $href($current + 1) : null, 'links' => $links];
    }

    /**
     * @param array<string, string> $keep
     * @return array{name: string, kind: string, value: string, options: list<array{value: string, label: string}>, hidden: array<string, string>}|null
     */
    public static function filter(QueryOutcome $outcome, string $param, string $kind, array $keep): ?array
    {
        $declared = null;
        foreach ($outcome->config->urlParams as $p) {
            if ($p['param'] === $param) {
                $declared = $p;
            }
        }
        if ($declared === null) {
            return null;
        }
        $options = $declared['target'] === 'filter' ? ($outcome->options[$declared['field']] ?? []) : [];
        $hidden = $keep;
        unset($hidden[$param], $hidden[$outcome->config->pageParam]);

        return ['name' => $param, 'kind' => $kind === 'select' && $options !== [] ? 'select' : 'search',
            'value' => $outcome->values[$param] ?? '', 'options' => $options, 'hidden' => $hidden];
    }
}
