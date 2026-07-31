<?php
declare(strict_types=1);
namespace LemurCms\Menu\Presentation;

/**
 * Renders menu tree as Bootstrap 5 navbar HTML.
 * Handles dropdowns, mega menus, and accessibility attributes.
 */
final class LemurMenuRenderer
{
    public function __construct(
        private readonly string $activeUrl = '',
        private readonly bool $includeAriaLabels = true,
    ) {}

    public function render(array $items, string $wrapperClass = 'navbar-nav'): string
    {
        if (empty($items)) return '';
        
        return sprintf(
            '<ul class="%s">%s</ul>',
            htmlspecialchars($wrapperClass),
            $this->renderItems($items)
        );
    }

    private function renderItems(array $items): string
    {
        return implode('', array_map(fn($item) => $this->renderItem($item), $items));
    }

    private function renderItem(array $item): string
    {
        $classes = ['nav-item'];
        $isActive = $this->isActive($item);
        $isMega = $item['type'] === 'mega';
        $isDropdown = $item['type'] === 'dropdown' || $isMega;

        if ($isActive) $classes[] = 'active';
        if ($isDropdown) $classes[] = 'dropdown';
        if ($item['css_class'] ?? null) $classes[] = htmlspecialchars($item['css_class']);

        $link = $this->renderLink($item, $isDropdown);
        $content = $link;

        if ($isDropdown && !empty($item['children'])) {
            $content .= $isMega ? $this->renderMegaMenu($item) : $this->renderDropdown($item);
        }

        return sprintf('<li class="%s">%s</li>', implode(' ', $classes), $content);
    }

    private function renderLink(array $item, bool $isDropdown): string
    {
        $url = htmlspecialchars($item['url'] ?? '#');
        $label = htmlspecialchars($item['label'] ?? '');
        $classes = ['nav-link'];
        if ($isDropdown) $classes[] = 'dropdown-toggle';
        if ($this->isActive($item)) $classes[] = 'active';

        $attrs = sprintf(
            'href="%s" class="%s"%s%s',
            $url,
            implode(' ', $classes),
            $isDropdown ? ' role="button" data-bs-toggle="dropdown" aria-expanded="false"' : '',
            $this->includeAriaLabels ? ' aria-label="' . $label . '"' : ''
        );

        if ($item['icon'] ?? null) {
            $icon = sprintf('<i class="%s"></i> ', htmlspecialchars($item['icon']));
            $label = $icon . $label;
        }

        return sprintf('<a %s>%s</a>', $attrs, $label);
    }

    private function renderDropdown(array $item): string
    {
        if (empty($item['children'])) return '';
        
        $items = implode('', array_map(fn($child) => $this->renderDropdownItem($child), $item['children']));
        return sprintf('<ul class="dropdown-menu">%s</ul>', $items);
    }

    private function renderDropdownItem(array $item): string
    {
        $url = htmlspecialchars($item['url'] ?? '#');
        $label = htmlspecialchars($item['label'] ?? '');
        $classes = [];
        if ($this->isActive($item)) $classes[] = 'active';

        $class = !empty($classes) ? sprintf(' class="%s"', implode(' ', $classes)) : '';

        return sprintf(
            '<li><a href="%s" class="dropdown-item"%s>%s</a></li>',
            $url,
            $class,
            $label
        );
    }

    private function renderMegaMenu(array $item): string
    {
        if (empty($item['mega']['sections'] ?? null)) return '';

        $sections = implode('', array_map(
            fn($sec) => $this->renderMegaSection($sec),
            $item['mega']['sections']
        ));

        return sprintf(
            '<div class="mega-menu dropdown-menu p-3"><div class="row">%s</div></div>',
            $sections
        );
    }

    private function renderMegaSection(array $section): string
    {
        $colClass = 'col-md-' . (12 / max(1, $section['col_span'] ?? 1));
        $title = $section['title'] ? sprintf('<h6 class="dropdown-header">%s</h6>', htmlspecialchars($section['title'])) : '';
        $links = implode('', array_map(
            fn($link) => $this->renderMegaLink($link),
            $section['links'] ?? []
        ));

        return sprintf(
            '<div class="%s">%s<ul class="list-unstyled">%s</ul></div>',
            $colClass,
            $title,
            $links
        );
    }

    private function renderMegaLink(array $link): string
    {
        $url = htmlspecialchars($link['url'] ?? '#');
        $label = htmlspecialchars($link['label'] ?? '');
        $classes = ['dropdown-item'];
        if ($link['is_featured'] ?? false) $classes[] = 'fw-bold';

        $desc = $link['description'] ? sprintf(' <small class="d-block text-muted">%s</small>', htmlspecialchars($link['description'])) : '';

        return sprintf(
            '<li><a href="%s" class="%s">%s%s</a></li>',
            $url,
            implode(' ', $classes),
            $label,
            $desc
        );
    }

    private function isActive(array $item): bool
    {
        if (empty($this->activeUrl)) return false;
        return ($item['url'] ?? null) === $this->activeUrl;
    }
}
