<?php
declare(strict_types=1);

namespace LemurCms\Seeders;

use LemurCms\Seeder\CmsSeeder;
use LemurCms\Support\Helpers\UuidHelper;

class TemplatesSeeder extends CmsSeeder
{
    public function run(): void
    {
        $templates = [
            [
                'name' => 'Hero Centrado Simple',
                'description' => 'Título, subtítulo y CTA al centro',
                'category' => 'hero',
                'tree' => [
                    [
                        'id' => 'hero_01_container',
                        'type' => 'container',
                        'props' => ['fluid' => false, 'class' => 'py-5 my-4'],
                        'loop' => null,
                        'children' => [
                            [
                                'id' => 'hero_01_row',
                                'type' => 'row',
                                'props' => ['justify' => 'justify-content-center', 'align' => ''],
                                'loop' => null,
                                'children' => [
                                    [
                                        'id' => 'hero_01_col',
                                        'type' => 'col',
                                        'props' => ['xs' => 12, 'md' => 8, 'lg' => 7, 'class' => 'text-center'],
                                        'loop' => null,
                                        'children' => [
                                            [
                                                'id' => 'hero_01_title',
                                                'type' => 'text',
                                                'props' => ['tag' => 'h1', 'content' => 'Construye algo increíble', 'class' => 'fw-bold mb-3 display-5'],
                                                'loop' => null,
                                                'children' => [],
                                            ],
                                            [
                                                'id' => 'hero_01_subtitle',
                                                'type' => 'text',
                                                'props' => ['tag' => 'p', 'content' => 'Una descripción breve y convincente de tu propuesta de valor. Máximo dos líneas.', 'class' => 'lead text-muted mb-4'],
                                                'loop' => null,
                                                'children' => [],
                                            ],
                                            [
                                                'id' => 'hero_01_btn1',
                                                'type' => 'button',
                                                'props' => ['label' => 'Comenzar ahora', 'href' => '#', 'variant' => 'primary', 'size' => 'btn-lg', 'class' => 'me-2'],
                                                'loop' => null,
                                                'children' => [],
                                            ],
                                            [
                                                'id' => 'hero_01_btn2',
                                                'type' => 'button',
                                                'props' => ['label' => 'Ver demo', 'href' => '#', 'variant' => 'outline-secondary', 'size' => 'btn-lg'],
                                                'loop' => null,
                                                'children' => [],
                                            ],
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
            [
                'name' => 'Hero con Imagen Derecha',
                'description' => 'Split: texto izquierda, imagen derecha',
                'category' => 'hero',
                'tree' => [
                    [
                        'id' => 'hero_02_container',
                        'type' => 'container',
                        'props' => ['fluid' => false, 'class' => 'py-5'],
                        'loop' => null,
                        'children' => [
                            [
                                'id' => 'hero_02_row',
                                'type' => 'row',
                                'props' => ['align' => 'align-items-center', 'gutter' => 'g-4'],
                                'loop' => null,
                                'children' => [
                                    [
                                        'id' => 'hero_02_col_text',
                                        'type' => 'col',
                                        'props' => ['xs' => 12, 'lg' => 6],
                                        'loop' => null,
                                        'children' => [
                                            [
                                                'id' => 'hero_02_title',
                                                'type' => 'text',
                                                'props' => ['tag' => 'h1', 'content' => 'Tu solución empieza aquí', 'class' => 'fw-bold display-6 mb-3'],
                                                'loop' => null,
                                                'children' => [],
                                            ],
                                            [
                                                'id' => 'hero_02_desc',
                                                'type' => 'text',
                                                'props' => ['tag' => 'p', 'content' => 'Describe el valor principal de tu producto o servicio en pocas palabras claras y directas.', 'class' => 'text-muted mb-4 fs-5'],
                                                'loop' => null,
                                                'children' => [],
                                            ],
                                            [
                                                'id' => 'hero_02_btn',
                                                'type' => 'button',
                                                'props' => ['label' => 'Empezar gratis', 'href' => '#', 'variant' => 'primary', 'size' => 'btn-lg'],
                                                'loop' => null,
                                                'children' => [],
                                            ],
                                        ],
                                    ],
                                    [
                                        'id' => 'hero_02_col_img',
                                        'type' => 'col',
                                        'props' => ['xs' => 12, 'lg' => 6],
                                        'loop' => null,
                                        'children' => [
                                            [
                                                'id' => 'hero_02_img',
                                                'type' => 'image',
                                                'props' => ['src' => 'https://placehold.co/600x400', 'alt' => 'Imagen del producto', 'fluid' => true, 'rounded' => true],
                                                'loop' => null,
                                                'children' => [],
                                            ],
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
            [
                'name' => 'Features 3 Columnas',
                'description' => 'Grid 3 col con ícono, título y texto',
                'category' => 'features',
                'tree' => [
                    [
                        'id' => 'feat_04_container',
                        'type' => 'container',
                        'props' => ['fluid' => false, 'class' => 'py-5'],
                        'loop' => null,
                        'children' => [
                            [
                                'id' => 'feat_04_title_row',
                                'type' => 'row',
                                'props' => ['justify' => 'justify-content-center', 'class' => 'mb-5'],
                                'loop' => null,
                                'children' => [
                                    [
                                        'id' => 'feat_04_title_col',
                                        'type' => 'col',
                                        'props' => ['xs' => 12, 'md' => 8, 'class' => 'text-center'],
                                        'loop' => null,
                                        'children' => [
                                            [
                                                'id' => 'feat_04_heading',
                                                'type' => 'text',
                                                'props' => ['tag' => 'h2', 'content' => 'Todo lo que necesitas', 'class' => 'fw-bold mb-2'],
                                                'loop' => null,
                                                'children' => [],
                                            ],
                                            [
                                                'id' => 'feat_04_subheading',
                                                'type' => 'text',
                                                'props' => ['tag' => 'p', 'content' => 'Herramientas poderosas para equipos modernos.', 'class' => 'text-muted'],
                                                'loop' => null,
                                                'children' => [],
                                            ],
                                        ],
                                    ],
                                ],
                            ],
                            [
                                'id' => 'feat_04_row',
                                'type' => 'row',
                                'props' => ['gutter' => 'g-4'],
                                'loop' => null,
                                'children' => [
                                    [
                                        'id' => 'feat_04_col_1',
                                        'type' => 'col',
                                        'props' => ['xs' => 12, 'md' => 4, 'class' => 'text-center'],
                                        'loop' => null,
                                        'children' => [
                                            [
                                                'id' => 'feat_04_title_1',
                                                'type' => 'text',
                                                'props' => ['tag' => 'h5', 'content' => '⚡ Velocidad', 'class' => 'fw-bold mb-2'],
                                                'loop' => null,
                                                'children' => [],
                                            ],
                                            [
                                                'id' => 'feat_04_desc_1',
                                                'type' => 'text',
                                                'props' => ['tag' => 'p', 'content' => 'Rendimiento optimizado para que tu flujo de trabajo no se detenga.', 'class' => 'text-muted'],
                                                'loop' => null,
                                                'children' => [],
                                            ],
                                        ],
                                    ],
                                    [
                                        'id' => 'feat_04_col_2',
                                        'type' => 'col',
                                        'props' => ['xs' => 12, 'md' => 4, 'class' => 'text-center'],
                                        'loop' => null,
                                        'children' => [
                                            [
                                                'id' => 'feat_04_title_2',
                                                'type' => 'text',
                                                'props' => ['tag' => 'h5', 'content' => '🔒 Seguridad', 'class' => 'fw-bold mb-2'],
                                                'loop' => null,
                                                'children' => [],
                                            ],
                                            [
                                                'id' => 'feat_04_desc_2',
                                                'type' => 'text',
                                                'props' => ['tag' => 'p', 'content' => 'Encriptación de extremo a extremo y control de acceso granular.', 'class' => 'text-muted'],
                                                'loop' => null,
                                                'children' => [],
                                            ],
                                        ],
                                    ],
                                    [
                                        'id' => 'feat_04_col_3',
                                        'type' => 'col',
                                        'props' => ['xs' => 12, 'md' => 4, 'class' => 'text-center'],
                                        'loop' => null,
                                        'children' => [
                                            [
                                                'id' => 'feat_04_title_3',
                                                'type' => 'text',
                                                'props' => ['tag' => 'h5', 'content' => '📊 Analítica', 'class' => 'fw-bold mb-2'],
                                                'loop' => null,
                                                'children' => [],
                                            ],
                                            [
                                                'id' => 'feat_04_desc_3',
                                                'type' => 'text',
                                                'props' => ['tag' => 'p', 'content' => 'Reportes en tiempo real para tomar decisiones basadas en datos.', 'class' => 'text-muted'],
                                                'loop' => null,
                                                'children' => [],
                                            ],
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ];

        foreach ($templates as $tpl) {
            $this->firstOrCreate(
                'templates',
                ['name' => $tpl['name']],
                [
                    'id' => UuidHelper::v4(),
                    'description' => $tpl['description'],
                    'category' => $tpl['category'],
                    'tree' => json_encode($tpl['tree']),
                    'thumbnail' => null,
                    'is_active' => 1,
                ]
            );
        }
    }
}
