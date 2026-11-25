<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Application;

use CeibaCms\DataSource\Domain\DataSourceDescriptor;

/**
 * What a record, an archive or the site search show when no site part of that kind applies (plan 07-D): plain trees
 * of ordinary components, drawn like any page (same views, escaping and bindings). The site replaces them with parts.
 */
final class DefaultContentTrees
{
    private const HIDDEN = ['id', 'slug', 'created_at', 'updated_at'];

    /** @return list<array<string, mixed>> */
    public function record(DataSourceDescriptor $source): array
    {
        $label = self::labelField($source);
        $nodes = [['type' => 'heading', 'props' => ['level' => 1, 'text' => $source->label], 'bindings' => $label ? ['text' => ['from' => 'record', 'field' => $label]] : [], 'children' => []]];
        foreach ($source->publicFields() as $name => $field) {
            if ($name === $label || in_array($name, self::HIDDEN, true) || $field->type === 'relation') {
                continue;
            }
            $nodes[] = match ($field->type) {
                'image' => ['type' => 'image', 'props' => ['alt' => $field->label], 'bindings' => ['src' => ['from' => 'record', 'field' => $name]], 'children' => []],
                'richtext' => ['type' => 'html', 'props' => ['content' => ''], 'bindings' => ['content' => ['from' => 'record', 'field' => $name]], 'children' => []],
                default => ['type' => 'text', 'props' => ['content' => ''], 'bindings' => ['content' => ['from' => 'record', 'field' => $name]
                    + (in_array($field->type, ['date', 'datetime'], true) ? ['transform' => 'date'] : [])], 'children' => []],
            };
        }

        return [['type' => 'container', 'props' => ['class' => 'cms-record py-4'], 'children' => $nodes]];
    }

    /** @return list<array<string, mixed>> */
    public function archive(DataSourceDescriptor $source): array
    {
        $search = $source->has('search') && $source->searchableFields() !== [];

        return [['type' => 'container', 'props' => ['class' => 'cms-archive py-4'], 'children' => [
            ['type' => 'heading', 'props' => ['level' => 1, 'text' => $source->label], 'children' => []],
            self::block('archive', '@current', $search, true, 12, $source, $search ? [['type' => 'query_filter', 'props' => ['param' => 'q', 'label' => 'Buscar', 'button' => 'Buscar'], 'children' => []]] : []),
        ]]];
    }

    /**
     * @param list<DataSourceDescriptor> $sources the searchable sources
     * @return list<array<string, mixed>>
     */
    public function search(array $sources, string $searchPath): array
    {
        $children = [['type' => 'heading', 'props' => ['level' => 1, 'text' => 'Buscar'], 'children' => []],
            ['type' => 'search_form', 'props' => ['action' => '/' . $searchPath, 'label' => 'Buscar'], 'children' => []]];
        foreach (array_values($sources) as $i => $source) {
            $children[] = ['type' => 'heading', 'props' => ['level' => 2, 'text' => $source->label], 'children' => []];
            $children[] = self::block('search_' . $i, $source->id, true, false, 10, $source, [], ['q']);
        }

        return [['type' => 'container', 'props' => ['class' => 'cms-search-results py-4'], 'children' => $children]];
    }

    /** @param list<array<string, mixed>> $before @param list<string> $require */
    private static function block(string $id, string $sourceId, bool $search, bool $pages, int $size, DataSourceDescriptor $source, array $before, array $require = []): array
    {
        $label = self::labelField($source);
        $item = ['type' => 'section', 'props' => ['class' => 'cms-item border-bottom py-3'], 'loop' => ['query' => '', 'variable' => 'item'], 'children' => [
            ['type' => 'heading', 'props' => ['level' => 2, 'text' => ''], 'bindings' => $label ? ['text' => ['field' => $label]] : [], 'children' => []],
            ['type' => 'button', 'props' => ['label' => 'Ver', 'url' => '#'], 'bindings' => ['url' => ['field' => '_url', 'fallback' => '#']], 'children' => []],
        ]];

        return ['type' => 'query', 'props' => ['id' => $id, 'source' => $sourceId, 'page_size' => min($size, $source->maxPageSize), 'pagination' => $pages,
            'url_params' => $search ? [['param' => 'q', 'target' => 'search']] : [], 'require' => $require], 'children' => [
            ...$before, $item,
            ['type' => 'query_state', 'props' => ['show' => 'empty'], 'children' => [['type' => 'text', 'props' => ['content' => 'No hay resultados.'], 'children' => []]]],
            ...($pages ? [['type' => 'pagination', 'props' => ['label' => 'Páginas'], 'children' => []]] : []),
        ]];
    }

    private static function labelField(DataSourceDescriptor $source): ?string
    {
        foreach ($source->publicFields() as $name => $field) {
            if ($field->type === 'text' && !in_array($name, self::HIDDEN, true)) {
                return $name;
            }
        }

        return null;
    }
}
