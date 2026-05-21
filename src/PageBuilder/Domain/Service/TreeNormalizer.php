<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Service;

/**
 * TreeNormalizer
 *
 * Garantiza que cada nodo del árbol tenga los props mínimos requeridos para
 * su correcto funcionamiento UI/UX antes de ser persistido.
 *
 * Regla:  si el cliente no envió un prop requerido (o lo envió vacío),
 *         el normalizador lo genera automáticamente.
 *
 * Se ejecuta en CreatePage y UpdatePage —antes de que TreeValidator valide—
 * para que el árbol guardado siempre sea funcional.
 */
final class TreeNormalizer
{
    /**
     * Props requeridos por tipo.
     *
     * Formato:  'type' => [ 'prop_name' => default ]
     *   - null    → auto-genera  "{type}_{uniqid()}"
     *   - string  → valor literal fijo
     *   - callable→ se invoca sin argumentos: fn() => ...
     *
     * ¿Por qué `id` es obligatorio en estos tipos?
     *   Bootstrap necesita un id HTML estable para conectar triggers y
     *   paneles mediante data-bs-target / data-bs-parent.
     *   Sin id el componente se renderiza pero no interactúa.
     */
    private const REQUIRED_PROPS_DEFAULTS = [
        'accordion' => ['id' => null],
        'carousel'  => ['id' => null],
        'collapse'  => ['id' => null],
        'offcanvas' => ['id' => null],
        'scrollspy' => ['id' => null],
        'toast'     => ['id' => null],
    ];

    /**
     * Normaliza un árbol de nodos completo.
     *
     * @param  array $tree  Array de nodos raíz
     * @return array        Árbol normalizado (nueva instancia, no muta el original)
     */
    public function normalize(array $tree): array
    {
        return array_map(fn(array $node) => $this->normalizeNode($node), $tree);
    }

    private function normalizeNode(array $node): array
    {
        $type = $node['type'] ?? '';

        // Asegurar que props sea siempre un array
        if (!isset($node['props']) || !is_array($node['props'])) {
            $node['props'] = [];
        }

        // Rellenar props requeridos si están ausentes o vacíos
        if (isset(self::REQUIRED_PROPS_DEFAULTS[$type])) {
            foreach (self::REQUIRED_PROPS_DEFAULTS[$type] as $prop => $default) {
                if (empty($node['props'][$prop])) {
                    $node['props'][$prop] = $this->resolveDefault($default, $type);
                }
            }
        }

        // Recursión en hijos
        if (!empty($node['children']) && is_array($node['children'])) {
            $node['children'] = array_map(
                fn(array $child) => $this->normalizeNode($child),
                $node['children']
            );
        }

        return $node;
    }

    private function resolveDefault(mixed $default, string $type): string
    {
        if (is_callable($default)) {
            return (string) $default();
        }

        if (is_string($default) && $default !== '') {
            return $default;
        }

        // null o vacío → genera "{type}_{uniqid()}"
        return $type . '_' . uniqid();
    }
}
