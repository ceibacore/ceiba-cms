<?php
declare(strict_types=1);

namespace LemurCms\Seeders;

use LemurCms\Seeder\CmsSeeder;
use LemurCms\Support\Helpers\UuidHelper;

class ComponentDefinitionsSeeder extends CmsSeeder
{
    public function run(): void
    {
        $components = [
            [
                'type' => 'container',
                'label' => 'Contenedor',
                'category' => 'layout',
                'icon' => 'layout-sidebar',
                'is_container' => 1,
                'accepts_loop' => 0,
                'default_props' => [
                    'fluid' => false,
                    'class' => '',
                ],
                'schema' => [
                    'fluid' => ['type' => 'boolean', 'label' => 'Ancho completo', 'default' => false],
                    'class' => ['type' => 'string', 'label' => 'Clases CSS adicionales', 'default' => ''],
                ],
            ],
            [
                'type' => 'row',
                'label' => 'Fila',
                'category' => 'layout',
                'icon' => 'layout-row',
                'is_container' => 1,
                'accepts_loop' => 0,
                'default_props' => [
                    'gutter' => 'g-4',
                    'align' => '',
                    'justify' => '',
                    'class' => '',
                ],
                'schema' => [
                    'gutter' => [
                        'type' => 'select',
                        'label' => 'Espaciado (Gutter)',
                        'options' => ['g-0', 'g-1', 'g-2', 'g-3', 'g-4', 'g-5'],
                        'default' => 'g-4',
                    ],
                    'align' => [
                        'type' => 'select',
                        'label' => 'Alineación vertical',
                        'options' => ['', 'align-items-start', 'align-items-center', 'align-items-end'],
                        'default' => '',
                    ],
                    'justify' => [
                        'type' => 'select',
                        'label' => 'Alineación horizontal',
                        'options' => ['', 'justify-content-start', 'justify-content-center', 'justify-content-end', 'justify-content-between', 'justify-content-around'],
                        'default' => '',
                    ],
                    'class' => ['type' => 'string', 'label' => 'Clases CSS adicionales', 'default' => ''],
                ],
            ],
            [
                'type' => 'col',
                'label' => 'Columna',
                'category' => 'layout',
                'icon' => 'layout-column',
                'is_container' => 1,
                'accepts_loop' => 0,
                'default_props' => [
                    'xs' => 12,
                    'sm' => 0,
                    'md' => 0,
                    'lg' => 0,
                    'xl' => 0,
                    'class' => '',
                ],
                'schema' => [
                    'xs' => ['type' => 'number', 'label' => 'Columnas en móvil (xs)', 'default' => 12],
                    'sm' => ['type' => 'number', 'label' => 'Columnas en tablet (sm)', 'default' => 0],
                    'md' => ['type' => 'number', 'label' => 'Columnas en escritorio medio (md)', 'default' => 0],
                    'lg' => ['type' => 'number', 'label' => 'Columnas en escritorio grande (lg)', 'default' => 0],
                    'xl' => ['type' => 'number', 'label' => 'Columnas en pantallas extra grandes (xl)', 'default' => 0],
                    'class' => ['type' => 'string', 'label' => 'Clases CSS adicionales', 'default' => ''],
                ],
            ],
            [
                'type' => 'text',
                'label' => 'Texto',
                'category' => 'content',
                'icon' => 'text',
                'is_container' => 0,
                'accepts_loop' => 1,
                'default_props' => [
                    'tag' => 'p',
                    'content' => 'Texto aquí',
                    'align' => '',
                    'class' => '',
                ],
                'schema' => [
                    'tag' => [
                        'type' => 'select',
                        'label' => 'Etiqueta HTML',
                        'options' => ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'small'],
                        'default' => 'p',
                    ],
                    'content' => ['type' => 'text', 'label' => 'Contenido', 'default' => 'Texto aquí'],
                    'align' => [
                        'type' => 'select',
                        'label' => 'Alineación',
                        'options' => ['', 'text-start', 'text-center', 'text-end'],
                        'default' => '',
                    ],
                    'class' => ['type' => 'string', 'label' => 'Clases CSS adicionales', 'default' => ''],
                ],
            ],
            [
                'type' => 'image',
                'label' => 'Imagen',
                'category' => 'media',
                'icon' => 'image',
                'is_container' => 0,
                'accepts_loop' => 1,
                'default_props' => [
                    'src' => '',
                    'alt' => '',
                    'fluid' => true,
                    'rounded' => false,
                    'width' => 0,
                    'height' => 0,
                    'class' => '',
                ],
                'schema' => [
                    'src' => ['type' => 'string', 'label' => 'URL de la imagen', 'default' => ''],
                    'alt' => ['type' => 'string', 'label' => 'Texto alternativo', 'default' => ''],
                    'fluid' => ['type' => 'boolean', 'label' => 'Imagen fluida (Bootstrap)', 'default' => true],
                    'rounded' => ['type' => 'boolean', 'label' => 'Bordes redondeados', 'default' => false],
                    'width' => ['type' => 'number', 'label' => 'Ancho fijo (px)', 'default' => 0],
                    'height' => ['type' => 'number', 'label' => 'Alto fijo (px)', 'default' => 0],
                    'class' => ['type' => 'string', 'label' => 'Clases CSS adicionales', 'default' => ''],
                ],
            ],
            [
                'type' => 'button',
                'label' => 'Botón',
                'category' => 'interactive',
                'icon' => 'button',
                'is_container' => 0,
                'accepts_loop' => 1,
                'default_props' => [
                    'label' => 'Click aquí',
                    'href' => '#',
                    'variant' => 'primary',
                    'size' => '',
                    'target' => '_self',
                    'class' => '',
                ],
                'schema' => [
                    'label' => ['type' => 'string', 'label' => 'Texto del botón', 'default' => 'Click aquí'],
                    'href' => ['type' => 'string', 'label' => 'Enlace de destino', 'default' => '#'],
                    'variant' => [
                        'type' => 'select',
                        'label' => 'Variante de color',
                        'options' => ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'outline-primary', 'outline-secondary'],
                        'default' => 'primary',
                    ],
                    'size' => [
                        'type' => 'select',
                        'label' => 'Tamaño',
                        'options' => ['', 'btn-sm', 'btn-lg'],
                        'default' => '',
                    ],
                    'target' => [
                        'type' => 'select',
                        'label' => 'Destino de apertura',
                        'options' => ['_self', '_blank'],
                        'default' => '_self',
                    ],
                    'class' => ['type' => 'string', 'label' => 'Clases CSS adicionales', 'default' => ''],
                ],
            ],
            [
                'type' => 'card',
                'label' => 'Tarjeta (Card)',
                'category' => 'content',
                'icon' => 'card',
                'is_container' => 0,
                'accepts_loop' => 1,
                'default_props' => [
                    'title' => 'Título',
                    'subtitle' => '',
                    'text' => '',
                    'image_src' => '',
                    'image_alt' => '',
                    'footer' => '',
                    'class' => '',
                ],
                'schema' => [
                    'title' => ['type' => 'string', 'label' => 'Título de la tarjeta', 'default' => 'Título'],
                    'subtitle' => ['type' => 'string', 'label' => 'Subtítulo', 'default' => ''],
                    'text' => ['type' => 'text', 'label' => 'Texto del cuerpo', 'default' => ''],
                    'image_src' => ['type' => 'string', 'label' => 'URL de imagen superior', 'default' => ''],
                    'image_alt' => ['type' => 'string', 'label' => 'Texto alternativo de imagen', 'default' => ''],
                    'footer' => ['type' => 'string', 'label' => 'Texto del pie de tarjeta', 'default' => ''],
                    'class' => ['type' => 'string', 'label' => 'Clases CSS adicionales', 'default' => ''],
                ],
            ],
            [
                'type' => 'divider',
                'label' => 'Separador (Divider)',
                'category' => 'layout',
                'icon' => 'divider',
                'is_container' => 0,
                'accepts_loop' => 0,
                'default_props' => [
                    'style' => 'solid',
                    'spacing' => 'my-4',
                    'color' => '#dee2e6',
                ],
                'schema' => [
                    'style' => [
                        'type' => 'select',
                        'label' => 'Estilo de línea',
                        'options' => ['solid', 'dashed', 'dotted'],
                        'default' => 'solid',
                    ],
                    'spacing' => [
                        'type' => 'select',
                        'label' => 'Espaciado vertical',
                        'options' => ['my-1', 'my-2', 'my-3', 'my-4', 'my-5'],
                        'default' => 'my-4',
                    ],
                    'color' => ['type' => 'color', 'label' => 'Color del separador', 'default' => '#dee2e6'],
                ],
            ],
            [
                'type' => 'html',
                'label' => 'Código HTML',
                'category' => 'content',
                'icon' => 'html',
                'is_container' => 0,
                'accepts_loop' => 0,
                'default_props' => [
                    'content' => '',
                ],
                'schema' => [
                    'content' => ['type' => 'text', 'label' => 'Contenido HTML crudo', 'default' => ''],
                ],
            ],
        ];

        foreach ($components as $comp) {
            $this->firstOrCreate(
                'component_definitions',
                ['type' => $comp['type']],
                [
                    'id' => UuidHelper::v4(),
                    'label' => $comp['label'],
                    'category' => $comp['category'],
                    'icon' => $comp['icon'],
                    'default_props' => json_encode($comp['default_props']),
                    'schema' => json_encode($comp['schema']),
                    'is_container' => $comp['is_container'],
                    'accepts_loop' => $comp['accepts_loop'],
                ]
            );
        }
    }
}
