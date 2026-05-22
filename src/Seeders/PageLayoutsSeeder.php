<?php
declare(strict_types=1);

namespace LemurCms\Seeders;

use LemurCms\Seeder\CmsSeeder;
use LemurCms\Support\Helpers\UuidHelper;

class PageLayoutsSeeder extends CmsSeeder
{
    public function run(): void
    {
        // ── Default footer tree (copyright bar) ────────────────────────────────
        $defaultFooter = [
            [
                'id'       => 'footer_container',
                'type'     => 'container',
                'props'    => ['fluid' => true, 'class' => 'py-3 bg-dark text-light'],
                'loop'     => null,
                'children' => [
                    [
                        'id'       => 'footer_row',
                        'type'     => 'row',
                        'props'    => ['justify' => 'justify-content-between', 'align' => 'align-items-center'],
                        'loop'     => null,
                        'children' => [
                            [
                                'id'       => 'footer_col_brand',
                                'type'     => 'col',
                                'props'    => ['xs' => 12, 'md' => 6, 'class' => 'mb-2 mb-md-0'],
                                'loop'     => null,
                                'children' => [
                                    [
                                        'id'       => 'footer_brand',
                                        'type'     => 'text',
                                        'props'    => ['tag' => 'p', 'content' => '© 2026 Lemur LMS. Todos los derechos reservados.', 'class' => 'mb-0 small'],
                                        'loop'     => null,
                                        'children' => [],
                                    ],
                                ],
                            ],
                            [
                                'id'       => 'footer_col_links',
                                'type'     => 'col',
                                'props'    => ['xs' => 12, 'md' => 6, 'class' => 'text-md-end'],
                                'loop'     => null,
                                'children' => [
                                    [
                                        'id'       => 'footer_privacy',
                                        'type'     => 'button',
                                        'props'    => ['label' => 'Privacidad', 'href' => '/privacidad', 'variant' => 'link', 'size' => '', 'class' => 'text-light text-decoration-none small me-3'],
                                        'loop'     => null,
                                        'children' => [],
                                    ],
                                    [
                                        'id'       => 'footer_terms',
                                        'type'     => 'button',
                                        'props'    => ['label' => 'Términos', 'href' => '/terminos', 'variant' => 'link', 'size' => '', 'class' => 'text-light text-decoration-none small'],
                                        'loop'     => null,
                                        'children' => [],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ];

        // ── Layout 1: Estándar (navbar + footer, paleta del sistema) ───────────
        $this->firstOrCreate(
            'page_layouts',
            ['name' => 'Estándar'],
            [
                'id'                  => UuidHelper::v4(),
                'description'         => 'Layout general con navegación y footer de copyright. Usa la paleta del tema activo.',
                'menu_slug'           => null,
                'footer_tree'         => json_encode($defaultFooter),
                'palette'             => json_encode([]),
                'use_system_palette'  => 1,
                'is_active'           => 1,
            ]
        );

        // ── Layout 2: Sin footer (landing pages) ──────────────────────────────
        $this->firstOrCreate(
            'page_layouts',
            ['name' => 'Sin footer'],
            [
                'id'                  => UuidHelper::v4(),
                'description'         => 'Layout minimalista: solo navegación, sin footer. Ideal para landing pages.',
                'menu_slug'           => null,
                'footer_tree'         => json_encode([]),
                'palette'             => json_encode([]),
                'use_system_palette'  => 1,
                'is_active'           => 1,
            ]
        );

        // ── Layout 3: Pantalla completa (sin nav ni footer) ───────────────────
        $this->firstOrCreate(
            'page_layouts',
            ['name' => 'Pantalla completa'],
            [
                'id'                  => UuidHelper::v4(),
                'description'         => 'Sin navegación ni footer. Para páginas de error, mantenimiento o splash screens.',
                'menu_slug'           => null,
                'footer_tree'         => json_encode([]),
                'palette'             => json_encode([]),
                'use_system_palette'  => 1,
                'is_active'           => 1,
            ]
        );

        echo "  ✓ PageLayouts seeded (3 layouts)\n";
    }
}
