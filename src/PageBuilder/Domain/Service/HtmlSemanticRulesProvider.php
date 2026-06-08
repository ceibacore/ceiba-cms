<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Service;

final class HtmlSemanticRulesProvider
{
    /**
     * @return array<string, array>
     */
    public function getRules(?string $tag = null): array
    {
        $rules = [
            'p' => [
                'tag' => 'p',
                'meaning' => 'Párrafo de texto. Se utiliza para bloques de texto corrido o prosa.',
                'category' => 'block',
                'allows_children' => true,
                'allowed_children' => ['span', 'strong', 'em', 'a', 'img', 'code', 'kbd', 'sub', 'sup', 'mark', 'cite', 'abbr', 'time'],
                'disallowed_children' => ['div', 'p', 'ul', 'ol', 'table', 'section', 'article', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'footer', 'nav'],
                'recommended_children' => ['text', 'strong', 'em', 'a'],
                'best_practices' => 'No anides elementos de bloque dentro de un párrafo. No utilices párrafos vacíos para generar espacio vertical (usa CSS en su lugar).'
            ],
            'div' => [
                'tag' => 'div',
                'meaning' => 'Contenedor genérico sin significado semántico. Se usa como último recurso para estructura visual, layouts (Grid/Flexbox) o propósitos de estilo y scripting.',
                'category' => 'block',
                'allows_children' => true,
                'allowed_children' => ['*'], // allows anything
                'disallowed_children' => [],
                'recommended_children' => [],
                'best_practices' => 'Utilízalo solo cuando no aplique ningún contenedor semántico (como <section>, <article>, <aside>, <nav>, etc.).'
            ],
            'span' => [
                'tag' => 'span',
                'meaning' => 'Contenedor en línea genérico sin significado semántico. Se usa para aplicar estilos CSS o clases a fragmentos de texto específicos.',
                'category' => 'inline',
                'allows_children' => true,
                'allowed_children' => ['span', 'strong', 'em', 'a', 'img', 'code', 'kbd', 'sub', 'sup', 'mark', 'cite', 'abbr', 'time'],
                'disallowed_children' => ['div', 'p', 'ul', 'ol', 'table', 'section', 'article', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                'recommended_children' => ['text'],
                'best_practices' => 'No anides elementos de bloque dentro de un <span>.'
            ],
            'section' => [
                'tag' => 'section',
                'meaning' => 'Agrupación temática de contenido en una página. Cada sección debe tener una temática clara y, por regla general, comenzar con un encabezado.',
                'category' => 'block_section',
                'allows_children' => true,
                'allowed_children' => ['*'],
                'disallowed_children' => [],
                'recommended_children' => ['h2', 'h3', 'h4', 'p', 'div'],
                'best_practices' => 'Siempre debe comenzar con un encabezado (<h2>-<h6>) como primer hijo significativo para estructurar correctamente el documento. No lo uses como un simple contenedor de estilos (para eso usa <div>).'
            ],
            'article' => [
                'tag' => 'article',
                'meaning' => 'Contenido independiente y autocontenido que podría distribuirse de manera autónoma (ej. posts de blog, cards de producto, comentarios, widgets).',
                'category' => 'block_section',
                'allows_children' => true,
                'allowed_children' => ['*'],
                'disallowed_children' => [],
                'recommended_children' => ['header', 'h2', 'p', 'footer'],
                'best_practices' => 'Asegúrate de que el contenido dentro de un <article> tenga sentido de forma aislada de la página en la que se renderiza.'
            ],
            'h1' => [
                'tag' => 'h1',
                'meaning' => 'Encabezado principal del documento o sección de mayor nivel jerárquico.',
                'category' => 'block_heading',
                'allows_children' => true,
                'allowed_children' => ['span', 'strong', 'em', 'a', 'img', 'code'],
                'disallowed_children' => ['div', 'p', 'ul', 'ol', 'table', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                'recommended_children' => ['text'],
                'best_practices' => 'Debe haber un único <h1> por página que resuma el tema principal. Nunca te saltes niveles jerárquicos (ej. pasar de h1 directo a h3).'
            ],
            'h2' => [
                'tag' => 'h2',
                'meaning' => 'Encabezado de segundo nivel jerárquico. Representa las secciones principales de una página.',
                'category' => 'block_heading',
                'allows_children' => true,
                'allowed_children' => ['span', 'strong', 'em', 'a', 'img', 'code'],
                'disallowed_children' => ['div', 'p', 'ul', 'ol', 'table', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                'recommended_children' => ['text'],
                'best_practices' => 'Úsalo para estructurar las secciones principales bajo el <h1>. Evita elegir niveles basados en el tamaño de fuente visual deseado.'
            ],
            'h3' => [
                'tag' => 'h3',
                'meaning' => 'Encabezado de tercer nivel jerárquico. Representa subsecciones dentro de una sección <h2>.',
                'category' => 'block_heading',
                'allows_children' => true,
                'allowed_children' => ['span', 'strong', 'em', 'a', 'img', 'code'],
                'disallowed_children' => ['div', 'p', 'ul', 'ol', 'table', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                'recommended_children' => ['text'],
                'best_practices' => 'Mantén la jerarquía ordenada lógica.'
            ],
            'a' => [
                'tag' => 'a',
                'meaning' => 'Hipervínculo para enlazar a otros documentos, recursos o anclas dentro de la página.',
                'category' => 'inline_interactive',
                'allows_children' => true,
                'allowed_children' => ['*'], // Can contain structural elements (HTML5)
                'disallowed_children' => ['a', 'button', 'input', 'select', 'textarea'], // interactive elements disallowed
                'recommended_children' => ['text', 'span', 'img', 'strong', 'em'],
                'best_practices' => 'Asegúrate de que el atributo href esté presente y sea válido. No anides elementos interactivos (como <button> u otros enlaces <a>) dentro.'
            ],
            'button' => [
                'tag' => 'button',
                'meaning' => 'Botón interactivo para ejecutar acciones dentro del documento (formularios, acciones JS, modales).',
                'category' => 'inline_interactive',
                'allows_children' => true,
                'allowed_children' => ['span', 'strong', 'em', 'img', 'i'],
                'disallowed_children' => ['a', 'button', 'input', 'select', 'textarea', 'div', 'p', 'table', 'ul', 'ol'],
                'recommended_children' => ['text', 'i', 'span'],
                'best_practices' => 'Usa <button> para ejecutar acciones de la aplicación y <a> para navegación. Siempre define un atributo type ("button", "submit" o "reset").'
            ],
            'img' => [
                'tag' => 'img',
                'meaning' => 'Elemento para embeber imágenes en el documento.',
                'category' => 'inline_void',
                'allows_children' => false,
                'allowed_children' => [],
                'disallowed_children' => [],
                'recommended_children' => [],
                'best_practices' => 'El atributo alt es obligatorio para accesibilidad. Usa alt descritivo para imágenes informativas, y alt="" (vacío) para imágenes decorativas.'
            ],
            'ul' => [
                'tag' => 'ul',
                'meaning' => 'Lista desordenada de elementos.',
                'category' => 'block_list',
                'allows_children' => true,
                'allowed_children' => ['li'],
                'disallowed_children' => ['*'], // anything except li is disallowed directly
                'recommended_children' => ['li'],
                'best_practices' => 'Solo se permiten elementos <li> como hijos directos de un <ul>. Cualquier otro elemento de bloque o texto debe ir dentro de los <li>.'
            ],
            'ol' => [
                'tag' => 'ol',
                'meaning' => 'Lista ordenada de elementos. El orden de los ítems es relevante.',
                'category' => 'block_list',
                'allows_children' => true,
                'allowed_children' => ['li'],
                'disallowed_children' => ['*'],
                'recommended_children' => ['li'],
                'best_practices' => 'Solo se permiten elementos <li> como hijos directos de un <ol>. Úsalo para pasos ordenados, listas de rankings, etc.'
            ],
            'li' => [
                'tag' => 'li',
                'meaning' => 'Ítem de una lista ordenada (<ol>) o desordenada (<ul>).',
                'category' => 'block',
                'allows_children' => true,
                'allowed_children' => ['*'],
                'disallowed_children' => [],
                'recommended_children' => ['text', 'p', 'div', 'a'],
                'best_practices' => 'Solo debe ser utilizado como hijo directo de un <ul>, <ol> o <menu>.'
            ],
        ];

        if ($tag !== null) {
            $tag = strtolower($tag);
            return $rules[$tag] ?? [
                'tag' => $tag,
                'meaning' => 'Etiqueta HTML estándar.',
                'category' => 'generic',
                'allows_children' => true,
                'allowed_children' => ['*'],
                'disallowed_children' => [],
                'recommended_children' => [],
                'best_practices' => 'Usa el elemento semántico más específico posible según los estándares de HTML5.'
            ];
        }

        return $rules;
    }

    /**
     * Get the native HTML standard elements catalog categorized for the UI.
     *
     * @return array[]
     */
    public function getNativeElementsCatalog(): array
    {
        return [
            [
                'category' => 'Estructura & Rejilla',
                'items' => [
                    [
                        'type' => 'div',
                        'label' => 'Caja (Div)',
                        'allows_children' => true,
                        'props' => new \stdClass(),
                        'recommended_props' => ['class', 'id', 'style'],
                    ],
                    [
                        'type' => 'div',
                        'label' => 'Contenedor',
                        'allows_children' => true,
                        'props' => ['class' => 'container'],
                        'recommended_props' => ['class', 'id'],
                    ],
                    [
                        'type' => 'div',
                        'label' => 'Fila (Row)',
                        'allows_children' => true,
                        'props' => ['class' => 'row'],
                        'recommended_props' => ['class', 'id'],
                    ],
                    [
                        'type' => 'div',
                        'label' => 'Columna (Col)',
                        'allows_children' => true,
                        'props' => ['class' => 'col'],
                        'recommended_props' => ['class', 'id'],
                    ],
                    [
                        'type' => 'section',
                        'label' => 'Sección',
                        'allows_children' => true,
                        'props' => ['class' => 'py-5'],
                        'recommended_props' => ['class', 'id', 'style'],
                    ],
                    [
                        'type' => 'header',
                        'label' => 'Header',
                        'allows_children' => true,
                        'props' => new \stdClass(),
                        'recommended_props' => ['class', 'id'],
                    ],
                    [
                        'type' => 'footer',
                        'label' => 'Footer',
                        'allows_children' => true,
                        'props' => new \stdClass(),
                        'recommended_props' => ['class', 'id'],
                    ],
                ],
            ],
            [
                'category' => 'Texto',
                'items' => [
                    [
                        'type' => 'h1',
                        'label' => 'Título H1',
                        'allows_children' => true,
                        'props' => ['text' => 'Título Principal'],
                        'recommended_props' => ['class', 'id'],
                    ],
                    [
                        'type' => 'h2',
                        'label' => 'Título H2',
                        'allows_children' => true,
                        'props' => ['text' => 'Subtítulo'],
                        'recommended_props' => ['class', 'id'],
                    ],
                    [
                        'type' => 'h3',
                        'label' => 'Título H3',
                        'allows_children' => true,
                        'props' => ['text' => 'Sección Secundaria'],
                        'recommended_props' => ['class', 'id'],
                    ],
                    [
                        'type' => 'p',
                        'label' => 'Párrafo',
                        'allows_children' => true,
                        'props' => ['text' => 'Este es un párrafo de texto para rellenar tu diseño.'],
                        'recommended_props' => ['class'],
                    ],
                    [
                        'type' => 'span',
                        'label' => 'Texto Inline (Span)',
                        'allows_children' => true,
                        'props' => ['text' => 'Texto'],
                        'recommended_props' => ['class'],
                    ],
                    [
                        'type' => 'blockquote',
                        'label' => 'Cita',
                        'allows_children' => true,
                        'props' => [
                            'class' => 'blockquote border-start ps-3',
                            'text' => 'Cita o frase célebre.',
                        ],
                        'recommended_props' => ['class'],
                    ],
                    [
                        'type' => 'ul',
                        'label' => 'Lista Desordenada',
                        'allows_children' => true,
                        'props' => new \stdClass(),
                        'recommended_props' => ['class'],
                    ],
                    [
                        'type' => 'ol',
                        'label' => 'Lista Ordenada',
                        'allows_children' => true,
                        'props' => new \stdClass(),
                        'recommended_props' => ['class'],
                    ],
                    [
                        'type' => 'li',
                        'label' => 'Elemento de Lista',
                        'allows_children' => true,
                        'props' => ['text' => 'Elemento'],
                        'recommended_props' => ['class'],
                    ],
                ],
            ],
            [
                'category' => 'Multimedia',
                'items' => [
                    [
                        'type' => 'img',
                        'label' => 'Imagen',
                        'allows_children' => false,
                        'props' => [
                            'src' => 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&auto=format&fit=crop',
                            'alt' => 'Imagen',
                            'class' => 'img-fluid rounded',
                        ],
                        'recommended_props' => ['src', 'alt', 'class', 'width', 'height'],
                    ],
                    [
                        'type' => 'video',
                        'label' => 'Video player',
                        'allows_children' => false,
                        'props' => [
                            'src' => '',
                            'controls' => 'true',
                            'class' => 'w-100',
                        ],
                        'recommended_props' => ['src', 'controls', 'class', 'autoplay', 'muted', 'loop'],
                    ],
                    [
                        'type' => 'iframe',
                        'label' => 'Iframe embed',
                        'allows_children' => false,
                        'props' => [
                            'src' => 'https://maps.google.com',
                            'class' => 'w-100 border-0',
                            'height' => '300',
                        ],
                        'recommended_props' => ['src', 'class', 'height', 'width', 'frameborder'],
                    ],
                ],
            ],
            [
                'category' => 'Formularios',
                'items' => [
                    [
                        'type' => 'form',
                        'label' => 'Formulario',
                        'allows_children' => true,
                        'props' => [
                            'method' => 'POST',
                            'action' => '#',
                        ],
                        'recommended_props' => ['method', 'action', 'class', 'id', 'enctype'],
                    ],
                    [
                        'type' => 'input',
                        'label' => 'Campo de Entrada',
                        'allows_children' => false,
                        'props' => [
                            'type' => 'text',
                            'class' => 'form-control',
                            'placeholder' => 'Escribe aquí...',
                        ],
                        'recommended_props' => ['type', 'name', 'value', 'class', 'placeholder', 'required', 'disabled'],
                    ],
                    [
                        'type' => 'textarea',
                        'label' => 'Área de Texto',
                        'allows_children' => false,
                        'props' => [
                            'class' => 'form-control',
                            'rows' => '3',
                        ],
                        'recommended_props' => ['name', 'class', 'rows', 'placeholder', 'required', 'disabled'],
                    ],
                    [
                        'type' => 'select',
                        'label' => 'Selector Dropdown',
                        'allows_children' => true,
                        'props' => [
                            'class' => 'form-select',
                        ],
                        'recommended_props' => ['name', 'class', 'required', 'disabled', 'multiple'],
                    ],
                    [
                        'type' => 'label',
                        'label' => 'Etiqueta (Label)',
                        'allows_children' => true,
                        'props' => [
                            'text' => 'Etiqueta:',
                        ],
                        'recommended_props' => ['for', 'class'],
                    ],
                    [
                        'type' => 'button',
                        'label' => 'Botón Form',
                        'allows_children' => true,
                        'props' => [
                            'type' => 'submit',
                            'class' => 'btn btn-primary',
                            'text' => 'Enviar',
                        ],
                        'recommended_props' => ['type', 'class', 'disabled'],
                    ],
                ],
            ],
            [
                'category' => 'Otros',
                'items' => [
                    [
                        'type' => 'a',
                        'label' => 'Enlace (Link)',
                        'allows_children' => true,
                        'props' => [
                            'href' => '#',
                            'class' => 'text-primary',
                            'text' => 'Enlace',
                        ],
                        'recommended_props' => ['href', 'target', 'class'],
                    ],
                    [
                        'type' => 'button',
                        'label' => 'Botón Enlace',
                        'allows_children' => true,
                        'props' => [
                            'type' => 'button',
                            'class' => 'btn btn-primary',
                            'text' => 'Haga Clic',
                        ],
                        'recommended_props' => ['class', 'disabled', 'onclick'],
                    ],
                    [
                        'type' => 'hr',
                        'label' => 'Línea de División',
                        'allows_children' => false,
                        'props' => [
                            'class' => 'my-4',
                        ],
                        'recommended_props' => ['class'],
                    ],
                ],
            ],
        ];
    }
}
