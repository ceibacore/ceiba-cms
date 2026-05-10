<?php
declare(strict_types=1);
namespace LemurCms\Menu\Presentation;

/**
 * Fluent API for programmatic menu construction.
 * Usage:
 *   $builder = new LemurMenuBuilder()
 *       ->menu('main', 'Main Menu')
 *       ->item('/', 'Home')
 *       ->item('/about', 'About', ['icon' => 'bi bi-info-circle'])
 *       ->dropdown('Services', [
 *           ['url' => '/web-design', 'label' => 'Web Design'],
 *           ['url' => '/development', 'label' => 'Development'],
 *       ])
 *       ->build();
 */
final class LemurMenuBuilder
{
    private ?string $currentMenu = null;
    private array $menus = [];
    private array $stack = [];

    public function menu(string $slug, string $name, array $options = []): self
    {
        $this->currentMenu = $slug;
        $this->menus[$slug] = [
            'name' => $name,
            'slug' => $slug,
            'type' => $options['type'] ?? 'main',
            'status' => $options['status'] ?? 1,
            'items' => [],
        ];
        $this->stack = [];
        return $this;
    }

    public function item(string $url, string $label, array $options = []): self
    {
        if (!$this->currentMenu) {
            throw new \LogicException('Define a menu first with menu()');
        }

        $item = [
            'url' => $url,
            'label' => $label,
            'type' => $options['type'] ?? 'link',
            'target' => $options['target'] ?? '_self',
            'icon' => $options['icon'] ?? null,
            'css_class' => $options['css_class'] ?? null,
            'sort_order' => $options['sort_order'] ?? count($this->currentStack()['children'] ?? []),
            'status' => $options['status'] ?? 1,
            'children' => [],
        ];

        if (empty($this->stack)) {
            $this->menus[$this->currentMenu]['items'][] = $item;
        } else {
            $current = &$this->currentStack();
            $current['children'][] = $item;
        }

        return $this;
    }

    public function dropdown(string $label, array $items, array $options = []): self
    {
        if (!$this->currentMenu) {
            throw new \LogicException('Define a menu first with menu()');
        }

        $item = [
            'url' => '#',
            'label' => $label,
            'type' => 'dropdown',
            'target' => '_self',
            'icon' => $options['icon'] ?? null,
            'css_class' => $options['css_class'] ?? null,
            'sort_order' => $options['sort_order'] ?? 0,
            'status' => $options['status'] ?? 1,
            'children' => [],
        ];

        foreach ($items as $child) {
            $item['children'][] = [
                'url' => $child['url'] ?? '#',
                'label' => $child['label'] ?? '',
                'type' => 'link',
                'target' => $child['target'] ?? '_self',
                'icon' => $child['icon'] ?? null,
                'status' => $child['status'] ?? 1,
            ];
        }

        if (empty($this->stack)) {
            $this->menus[$this->currentMenu]['items'][] = $item;
        } else {
            $current = &$this->currentStack();
            $current['children'][] = $item;
        }

        return $this;
    }

    public function mega(string $label, array $sections, array $options = []): self
    {
        if (!$this->currentMenu) {
            throw new \LogicException('Define a menu first with menu()');
        }

        $item = [
            'url' => '#',
            'label' => $label,
            'type' => 'mega',
            'target' => '_self',
            'icon' => $options['icon'] ?? null,
            'css_class' => $options['css_class'] ?? null,
            'sort_order' => $options['sort_order'] ?? 0,
            'status' => $options['status'] ?? 1,
            'mega' => [
                'sections' => array_map(fn($sec) => [
                    'title' => $sec['title'] ?? null,
                    'col_span' => $sec['col_span'] ?? 1,
                    'links' => array_map(fn($link) => [
                        'label' => $link['label'] ?? '',
                        'url' => $link['url'] ?? '#',
                        'description' => $link['description'] ?? null,
                        'icon' => $link['icon'] ?? null,
                        'is_featured' => $link['is_featured'] ?? false,
                    ], $sec['links'] ?? []),
                ], $sections),
            ],
        ];

        if (empty($this->stack)) {
            $this->menus[$this->currentMenu]['items'][] = $item;
        } else {
            $current = &$this->currentStack();
            $current['children'][] = $item;
        }

        return $this;
    }

    public function divider(): self
    {
        if (!$this->currentMenu) {
            throw new \LogicException('Define a menu first with menu()');
        }

        $item = [
            'type' => 'divider',
            'label' => '',
            'url' => '#',
            'status' => 1,
        ];

        if (empty($this->stack)) {
            $this->menus[$this->currentMenu]['items'][] = $item;
        } else {
            $current = &$this->currentStack();
            $current['children'][] = $item;
        }

        return $this;
    }

    public function build(): array
    {
        return $this->menus;
    }

    public function buildMenu(string $slug): array
    {
        return $this->menus[$slug] ?? [];
    }

    private function &currentStack(): array
    {
        if (empty($this->stack)) {
            throw new \LogicException('No current menu item in stack');
        }
        return $this->stack[count($this->stack) - 1];
    }
}
