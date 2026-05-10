<?php

declare(strict_types=1);

namespace LemurCms\Menu\Presentation;

class BreadcrumbBuilder
{
    /**
     * @var array<array<string, string>>
     */
    private array $breadcrumbs = [];

    /**
     * Agregar un item al breadcrumb
     *
     * @param string $label Texto mostrado
     * @param string|null $url URL del link (null para item actual)
     * @param string|null $icon Clase de icono (Bootstrap Icons)
     * @return self
     */
    public function add(string $label, ?string $url = null, ?string $icon = null): self
    {
        $this->breadcrumbs[] = [
            'label' => $label,
            'url' => $url,
            'icon' => $icon,
            'active' => $url === null,
        ];

        return $this;
    }

    /**
     * Agregar el item "Home"
     *
     * @param string $url URL de home
     * @param string|null $icon Clase de icono
     * @return self
     */
    public function home(string $url = '/', ?string $icon = 'bi bi-house'): self
    {
        array_unshift($this->breadcrumbs, [
            'label' => 'Home',
            'url' => $url,
            'icon' => $icon,
            'active' => false,
        ]);

        return $this;
    }

    /**
     * Agregar item actual (sin URL)
     *
     * @param string $label Texto del item actual
     * @return self
     */
    public function current(string $label): self
    {
        return $this->add($label, null);
    }

    /**
     * Renderizar breadcrumbs como HTML (Bootstrap 5)
     *
     * @return string HTML
     */
    public function render(): string
    {
        if (empty($this->breadcrumbs)) {
            return '';
        }

        $items = array_map(fn($b) => $this->renderItem($b), $this->breadcrumbs);

        return sprintf(
            '<nav aria-label="breadcrumb"><ol class="breadcrumb">%s</ol></nav>',
            implode('', $items)
        );
    }

    /**
     * Renderizar un item individual
     *
     * @param array<string, mixed> $item
     * @return string HTML
     */
    private function renderItem(array $item): string
    {
        $iconHtml = '';
        if (!empty($item['icon'])) {
            $icon = htmlspecialchars($item['icon']);
            $iconHtml = sprintf('<i class="%s"></i> ', $icon);
        }

        $label = htmlspecialchars($item['label']);

        if ($item['active']) {
            return sprintf(
                '<li class="breadcrumb-item active" aria-current="page">%s%s</li>',
                $iconHtml,
                $label
            );
        }

        $url = htmlspecialchars($item['url']);
        return sprintf(
            '<li class="breadcrumb-item"><a href="%s">%s%s</a></li>',
            $url,
            $iconHtml,
            $label
        );
    }

    /**
     * Obtener breadcrumbs como array
     *
     * @return array<array<string, mixed>>
     */
    public function toArray(): array
    {
        return $this->breadcrumbs;
    }

    /**
     * Obtener breadcrumbs como JSON
     *
     * @return string JSON
     */
    public function toJson(): string
    {
        return json_encode($this->breadcrumbs, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }

    /**
     * Limpiar breadcrumbs
     *
     * @return self
     */
    public function reset(): self
    {
        $this->breadcrumbs = [];
        return $this;
    }

    /**
     * Obtener cantidad de items
     */
    public function count(): int
    {
        return count($this->breadcrumbs);
    }
}
