<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Domain\Catalogue\Defaults;

use CeibaCms\PageBuilder\Domain\Catalogue\ComponentCatalogue;
use CeibaCms\PageBuilder\Domain\Catalogue\ComponentDescriptor;

/**
 * Interactive components (plan 05-C): tabs, accordion and carousel. Each group holds only its own items, the
 * markup is readable without JavaScript, and a small module script (behaviors/) adds the WAI-ARIA behaviour.
 * Names differ from the Bootstrap collapse/carousel views the HTML importer produces (accordion, carousel).
 */
final class InteractiveComponents
{
    public static function register(ComponentCatalogue $catalogue): void
    {
        $add = static fn (string $name, string $label, array $props, array $controls, array $children, array $parents)
            => $catalogue->register(new ComponentDescriptor(
                name: $name, version: 1, label: $label, category: 'interactive', propsSchema: $props,
                allowedChildren: $children, allowedParents: $parents, editorControls: $controls,
                capabilities: ['styles'], isContainer: true,
            ));
        $text = static fn (string $default): array => ['type' => 'string', 'default' => $default];

        $add('tabs', 'Tabs', ['label' => $text('')], ['label' => ['type' => 'text', 'label' => 'Name for screen readers']],
            ['tab_panel'], ['*']);
        $add('tab_panel', 'Tab panel', ['title' => $text('Tab')], ['title' => ['type' => 'text', 'label' => 'Tab title']],
            ['*'], ['tabs']);
        $add('disclosures', 'Accordion', ['single' => ['type' => 'boolean', 'default' => true]],
            ['single' => ['type' => 'switch', 'label' => 'Only one open at a time']], ['disclosure'], ['*']);
        $add('disclosure', 'Accordion item', ['title' => $text('Item'), 'open' => ['type' => 'boolean', 'default' => false]],
            ['title' => ['type' => 'text', 'label' => 'Title'], 'open' => ['type' => 'switch', 'label' => 'Open at first']],
            ['*'], ['disclosures']);
        $add('slideshow', 'Carousel', [
            'label' => $text('Carousel'), 'autoplay' => ['type' => 'boolean', 'default' => false], 'interval' => ['type' => 'integer', 'default' => 6],
            'previousLabel' => $text('Previous'), 'nextLabel' => $text('Next'), 'pauseLabel' => $text('Pause'), 'playLabel' => $text('Play'),
        ], [
            'label' => ['type' => 'text', 'label' => 'Name for screen readers'], 'autoplay' => ['type' => 'switch', 'label' => 'Rotate by itself'],
            'interval' => ['type' => 'number', 'label' => 'Seconds per slide (3–15)'], 'previousLabel' => ['type' => 'text', 'label' => 'Previous button'],
            'nextLabel' => ['type' => 'text', 'label' => 'Next button'], 'pauseLabel' => ['type' => 'text', 'label' => 'Pause button'],
            'playLabel' => ['type' => 'text', 'label' => 'Play button'],
        ], ['slide'], ['*']);
        $add('slide', 'Carousel slide', [], [], ['*'], ['slideshow']);
    }
}
