<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Domain\Catalogue\Defaults;

use CeibaCms\PageBuilder\Domain\Catalogue\ComponentCatalogue;
use CeibaCms\PageBuilder\Domain\Catalogue\ComponentDescriptor;

/**
 * Dynamic content components (plan 07-B): a `query` block runs one query of the data source registry; inside it a
 * node with `loop: {query: ''}` repeats per item, `query_state` shows the empty or error state, `query_filter` and
 * `pagination` change the declared URL parameters. Views in Frameworks/Bootstrap5/views.
 */
final class DynamicComponents
{
    public static function register(ComponentCatalogue $catalogue): void
    {
        $add = static fn (string $name, string $label, array $props, array $controls, bool $container) => $catalogue->register(new ComponentDescriptor(
            name: $name, version: 1, label: $label, category: 'dynamic', propsSchema: $props, allowedChildren: $container ? ['*'] : [],
            allowedParents: ['*'], editorControls: $controls, capabilities: ['styles'], isContainer: $container,
        ));
        $text = static fn (string $default = ''): array => ['type' => 'string', 'default' => $default];

        $add('query', 'Query', [
            'id' => $text('items'), 'source' => $text(), 'filters' => ['type' => 'array', 'default' => []], 'sort' => ['type' => 'array', 'default' => []],
            'page_size' => ['type' => 'integer', 'default' => 12], 'pagination' => ['type' => 'boolean', 'default' => false],
            'page_param' => $text('page'), 'url_params' => ['type' => 'array', 'default' => []],
        ], ['id' => ['type' => 'text', 'label' => 'Query id'], 'source' => ['type' => 'data_source', 'label' => 'Source'],
            'page_size' => ['type' => 'number', 'label' => 'Items per page'], 'pagination' => ['type' => 'toggle', 'label' => 'Pages']], true);
        $add('query_state', 'Query state', ['query' => $text(), 'show' => ['type' => 'string', 'enum' => ['results', 'empty', 'error'], 'default' => 'empty']],
            ['show' => ['type' => 'select', 'options' => ['results', 'empty', 'error'], 'label' => 'Show when']], true);
        $add('pagination', 'Pagination', ['query' => $text(), 'label' => $text('Pages'), 'prev' => $text('«'), 'next' => $text('»')],
            ['label' => ['type' => 'text', 'label' => 'Name for screen readers']], false);
        $add('query_filter', 'Filter', ['query' => $text(), 'param' => $text('q'), 'kind' => ['type' => 'string', 'enum' => ['search', 'select'], 'default' => 'search'],
            'label' => $text('Search'), 'placeholder' => $text(), 'button' => $text('OK'), 'all' => $text('—')],
            ['param' => ['type' => 'text', 'label' => 'URL parameter'], 'kind' => ['type' => 'select', 'options' => ['search', 'select'], 'label' => 'Kind'],
                'label' => ['type' => 'text', 'label' => 'Label']], false);
    }
}
