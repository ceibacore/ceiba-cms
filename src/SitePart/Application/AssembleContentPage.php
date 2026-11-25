<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Application;

use CeibaCms\DataSource\Application\ContentRoutes;
use CeibaCms\DataSource\Application\DataSourceRegistry;
use CeibaCms\DataSource\Application\DefaultContentTrees;
use CeibaCms\DataSource\Domain\DataSourceDescriptor;
use CeibaCms\DataSource\Domain\InvalidDataQuery;
use CeibaCms\DataSource\Domain\QueryContext;
use CeibaCms\SitePart\Domain\RenderContext;
use CeibaCms\SitePart\Domain\SitePartKind;
use CeibaCms\SitePart\Domain\SitePartResolver;
use CeibaCms\SitePart\Infrastructure\SitePartStore;

/**
 * Public pages of data sources (plan 07-D): a record (`/prefix/slug`), the archive (`/prefix`) and the site search.
 * Each is drawn with the published single, archive or search part that applies (or a default tree), with the
 * header and footer parts, through the same assembler as pages. A missing record is a 404.
 */
final class AssembleContentPage
{
    /** @param \Closure(): QueryContext $queryContext */
    public function __construct(
        private readonly AssembleSitePage $site,
        private readonly SitePartStore $store,
        private readonly DataSourceRegistry $registry,
        private readonly ContentRoutes $routes,
        private readonly \Closure $queryContext,
        private readonly DefaultContentTrees $defaults = new DefaultContentTrees(),
    ) {}

    /**
     * @param array<string, mixed> $query the request's query string
     * @param list<mixed> $layoutFooter
     * @return array{status: int, title: string, html?: string, header?: ?string, footer?: string, css?: string, js?: string}|null null: not content
     */
    public function render(string $path, array $query, string $locale, bool $hasSession, array $layoutFooter = [], ?string $layoutId = null): ?array
    {
        $match = $this->routes->match($path);

        return $match === null ? null : $this->renderMatch($match, $path, $query, $locale, $hasSession, $layoutFooter, $layoutId);
    }

    /**
     * A content page already identified (also the editor's preview of a part, with `$parts` and no public URL needed).
     *
     * @param array{content: 'record'|'archive'|'search', source: ?string, slug: ?string} $match
     * @param list<\CeibaCms\SitePart\Domain\SitePart>|null $parts
     * @return array<string, mixed>
     */
    public function renderMatch(array $match, string $path, array $query, string $locale, bool $hasSession, array $layoutFooter = [],
        ?string $layoutId = null, ?array $parts = null): array
    {
        $context = ($this->queryContext)();
        try {
            $source = $match['source'] !== null ? $this->registry->descriptor($match['source'], $context) : null;
        } catch (InvalidDataQuery) {
            return ['status' => 404, 'title' => ''];
        }
        $request = RenderContext::forContent($match['content'], $match['source'], $path, $locale, $hasSession, $layoutId);
        $vars = ['request_query' => $query] + ($source !== null ? ['source' => $source->id] : []);
        $title = $source?->label ?? 'Buscar';
        if ($match['content'] === 'record') {
            $record = $this->record($source, (string) $match['slug'], $context);
            if ($record === null) {
                return ['status' => 404, 'title' => ''];
            }
            $vars['record'] = $record;
            $title = (string) ($record[$this->labelField($source)] ?? $title);
        }
        $parts ??= $this->store->published();
        $part = SitePartResolver::resolve($parts, $request)->part(SitePartKind::FOR_CONTENT[$match['content']]);
        $tree = $part?->tree ?? match ($match['content']) {
            'record' => $this->defaults->record($source),
            'archive' => $this->defaults->archive($source),
            'search' => $this->defaults->search($this->searchable($context), $this->routes->searchPath()),
        };

        return ['status' => 200, 'title' => $title] + $this->site->page($tree, [], $request, $layoutFooter, $vars, $parts);
    }

    /** @return array<string, mixed>|null */
    private function record(DataSourceDescriptor $source, string $slug, QueryContext $context): ?array
    {
        try {
            $record = $source->has('single') ? $this->registry->single($source->id, $slug, $context) : null;
        } catch (InvalidDataQuery) {
            return null;
        }

        return $record === null ? null : $record + ['_url' => $this->routes->urlFor($source->id, $slug)];
    }

    /** @return list<DataSourceDescriptor> */
    private function searchable(QueryContext $context): array
    {
        $out = [];
        foreach ($this->routes->searchable() as $id) {
            try {
                $descriptor = $this->registry->descriptor($id, $context);
                if ($descriptor->has('search') && $descriptor->searchableFields() !== []) {
                    $out[] = $descriptor;
                }
            } catch (InvalidDataQuery) {
                continue; // a source that is gone is left out of the search
            }
        }

        return $out;
    }

    private function labelField(DataSourceDescriptor $source): string
    {
        foreach ($source->publicFields() as $name => $field) {
            if ($field->type === 'text' && !in_array($name, ['id', 'slug'], true)) {
                return $name;
            }
        }

        return 'id';
    }
}
