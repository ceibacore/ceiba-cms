<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Service;

final class HtmlSemanticRulesProvider
{
    /**
     * Obtiene las reglas semánticas y de validación para una etiqueta específica o el catálogo completo.
     *
     * @param string|null $tag Nombre de la etiqueta HTML opcional.
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
                'allowed_children' => ['span', 'strong', 'em', 'a', 'code', 'kbd', 'sub', 'sup', 'mark', 'cite', 'abbr', 'time'],
                'disallowed_children' => ['div', 'p', 'ul', 'ol', 'table', 'section', 'article', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'footer', 'nav', 'main', 'aside'],
                'recommended_children' => ['text', 'strong', 'em', 'a'],
                'best_practices' => 'No anides elementos de bloque dentro de un párrafo. No utilices párrafos vacíos para generar espacio vertical (usa CSS en su lugar).'
            ],
            'div' => [
                'tag' => 'div',
                'meaning' => 'Contenedor genérico sin significado semántico. Se usa como último recurso para estructura visual, layouts (Grid/Flexbox) o propósitos de estilo y scripting.',
                'category' => 'block',
                'allows_children' => true,
                'allowed_children' => ['*'],
                'disallowed_children' => [],
                'recommended_children' => [],
                'best_practices' => 'Utilízalo solo cuando no aplique ningún contenedor semántico (como <section>, <article>, <aside>, <nav>, etc.).'
            ],
            'span' => [
                'tag' => 'span',
                'meaning' => 'Contenedor en línea genérico sin significado semántico. Se usa para aplicar estilos CSS o clases a fragmentos de texto específicos.',
                'category' => 'inline',
                'allows_children' => true,
                'allowed_children' => ['span', 'strong', 'em', 'a', 'code', 'kbd', 'sub', 'sup', 'mark', 'cite', 'abbr', 'time', 'i'],
                'disallowed_children' => ['div', 'p', 'ul', 'ol', 'table', 'section', 'article', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'form'],
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
            'header' => [
                'tag' => 'header',
                'meaning' => 'Contenedor para contenido introductorio o conjunto de enlaces de navegación de una página o sección.',
                'category' => 'structure',
                'allows_children' => true,
                'allowed_children' => ['*'],
                'disallowed_children' => ['header', 'footer', 'main'],
                'recommended_children' => ['h1', 'nav', 'img', 'div'],
                'best_practices' => 'No se permite anidar elementos <header> dentro de otros <header> ni dentro de un <footer>.'
            ],
            'footer' => [
                'tag' => 'footer',
                'meaning' => 'Pie de página para su sección de contenido u hoja de ruta del documento. Contiene típicamente autoría, copyright y enlaces relacionados.',
                'category' => 'structure',
                'allows_children' => true,
                'allowed_children' => ['*'],
                'disallowed_children' => ['header', 'footer', 'main'],
                'recommended_children' => ['p', 'ul', 'div', 'address'],
                'best_practices' => 'No se permite anidar elementos <footer> dentro de otros <footer> ni dentro de un <header>.'
            ],
            'main' => [
                'tag' => 'main',
                'meaning' => 'Representa el contenido principal y dominante del <body> del documento.',
                'category' => 'advanced_structure',
                'allows_children' => true,
                'allowed_children' => ['section', 'div', 'article', 'header', 'footer', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'table'],
                'disallowed_children' => ['main', 'nav', 'aside'],
                'recommended_children' => ['section', 'article', 'div'],
                'best_practices' => 'Solo debe haber un elemento <main> visible por página. No debe ser hijo de elementos como <header>, <nav> o <aside>.'
            ],
            'aside' => [
                'tag' => 'aside',
                'meaning' => 'Sección de una página que consiste en contenido que está tangencialmente relacionado con el contenido que lo rodea (barras laterales, glosarios).',
                'category' => 'advanced_structure',
                'allows_children' => true,
                'allowed_children' => ['*'],
                'disallowed_children' => [],
                'recommended_children' => ['h3', 'h4', 'p', 'ul'],
                'best_practices' => 'No lo utilices para envolver contenido principal, su rol es puramente complementario.'
            ],
            'nav' => [
                'tag' => 'nav',
                'meaning' => 'Sección de una página cuyo propósito es proporcionar enlaces de navegación, ya sea dentro del documento actual o a otros documentos.',
                'category' => 'advanced_structure',
                'allows_children' => true,
                'allowed_children' => ['ul', 'ol', 'div', 'a', 'span'],
                'disallowed_children' => ['main', 'header', 'footer'],
                'recommended_children' => ['ul', 'a'],
                'best_practices' => 'No todos los grupos de enlaces deben ir dentro de un <nav>, reserva este tag para navegaciones primarias o globales.'
            ],
            'a' => [
                'tag' => 'a',
                'meaning' => 'Hipervínculo para enlazar a otros documentos, recursos o anclas dentro de la página.',
                'category' => 'inline_interactive',
                'allows_children' => true,
                'allowed_children' => ['*'],
                'disallowed_children' => ['a', 'button', 'input', 'select', 'textarea'],
                'recommended_children' => ['text', 'span', 'img', 'strong', 'em'],
                'best_practices' => 'Asegúrate de que el atributo href esté presente y sea válido. No anides elementos interactivos (como <button> u otros enlaces <a>) dentro.'
            ],
            'button' => [
                'tag' => 'button',
                'meaning' => 'Botón interactivo para ejecutar acciones dentro del documento (formularios, acciones JS, modales).',
                'category' => 'inline_interactive',
                'allows_children' => true,
                'allowed_children' => ['span', 'strong', 'em', 'img', 'i'],
                'disallowed_children' => ['a', 'button', 'input', 'select', 'textarea', 'div', 'p', 'table', 'ul', 'ol', 'section', 'form'],
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
                'best_practices' => 'El atributo alt es obligatorio para accesibilidad. Usa alt descriptivo para imágenes informativas, y alt="" (vacío) para imágenes decorativas.'
            ],
            'video' => [
                'tag' => 'video',
                'meaning' => 'Elemento multimedia para reproducir flujos de video o películas nativamente.',
                'category' => 'media',
                'allows_children' => false,
                'allowed_children' => [],
                'disallowed_children' => [],
                'recommended_children' => [],
                'best_practices' => 'Proporciona siempre alternativas de accesibilidad o subtítulos si es contenido didáctico relevante.'
            ],
            'audio' => [
                'tag' => 'audio',
                'meaning' => 'Elemento multimedia para reproducir flujos de sonido o música nativamente.',
                'category' => 'media',
                'allows_children' => false,
                'allowed_children' => [],
                'disallowed_children' => [],
                'recommended_children' => [],
                'best_practices' => 'Usa el atributo controls para que el usuario retenga la decisión de pausar o reproducir el elemento.'
            ],
            'iframe' => [
                'tag' => 'iframe',
                'meaning' => 'Contexto de navegación anidado. Embebe otra página HTML de forma directa dentro de la actual.',
                'category' => 'media',
                'allows_children' => false,
                'allowed_children' => [],
                'disallowed_children' => [],
                'recommended_children' => [],
                'best_practices' => 'Utiliza siempre títulos claros mediante el atributo title para mejorar la lectura de los lectores de pantalla.'
            ],
            'hr' => [
                'tag' => 'hr',
                'meaning' => 'Quiebre temático a nivel de párrafo. Tradicionalmente renderizado como una línea horizontal.',
                'category' => 'inline_void',
                'allows_children' => false,
                'allowed_children' => [],
                'disallowed_children' => [],
                'recommended_children' => [],
                'best_practices' => 'No lo utilices con fines puramente decorativos de diseño visual, úsalo si representa un cambio real de tema.'
            ],
            'i' => [
                'tag' => 'i',
                'meaning' => 'Elemento de texto en línea para representar una calidad de texto alternativa, como términos técnicos o glifos de iconos.',
                'category' => 'inline',
                'allows_children' => false,
                'allowed_children' => [],
                'disallowed_children' => [],
                'recommended_children' => [],
                'best_practices' => 'Muy útil para fuentes tipográficas de iconos (Bootstrap Icons / FontAwesome). Recuerda agregarle aria-hidden="true" si es puramente visual.'
            ],
            'ul' => [
                'tag' => 'ul',
                'meaning' => 'Lista desordenada de elementos.',
                'category' => 'block_list',
                'allows_children' => true,
                'allowed_children' => ['li'],
                'disallowed_children' => [],
                'recommended_children' => ['li'],
                'best_practices' => 'Solo se permiten elementos <li> como hijos directos de un <ul>. Cualquier otro elemento de bloque o texto debe ir dentro de los <li>.'
            ],
            'ol' => [
                'tag' => 'ol',
                'meaning' => 'Lista ordenada de elementos. El orden de los ítems es relevante.',
                'category' => 'block_list',
                'allows_children' => true,
                'allowed_children' => ['li'],
                'disallowed_children' => [],
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
            'table' => [
                'tag' => 'table',
                'meaning' => 'Representa datos estructurados bidimensionales en forma de tablas.',
                'category' => 'table',
                'allows_children' => true,
                'allowed_children' => ['thead', 'tbody', 'tfoot', 'tr'],
                'disallowed_children' => ['div', 'p', 'section', 'h1', 'h2', 'h3'],
                'recommended_children' => ['thead', 'tbody'],
                'best_practices' => 'Utilízala exclusivamente para datos tabulares, nunca para crear layouts estructurales de la página.'
            ],
            'thead' => [
                'tag' => 'thead',
                'meaning' => 'Bloque de filas que definen los encabezados de las columnas de la tabla.',
                'category' => 'table',
                'allows_children' => true,
                'allowed_children' => ['tr'],
                'disallowed_children' => ['th', 'td', 'tbody'],
                'recommended_children' => ['tr'],
                'best_practices' => 'Siempre debe contener filas <tr> en su interior.'
            ],
            'tbody' => [
                'tag' => 'tbody',
                'meaning' => 'Bloque de filas que contienen los datos principales o cuerpo de la tabla.',
                'category' => 'table',
                'allows_children' => true,
                'allowed_children' => ['tr'],
                'disallowed_children' => ['th', 'td', 'thead'],
                'recommended_children' => ['tr'],
                'best_practices' => 'Alberga el conjunto de datos dinámicos o filas principales de la tabla.'
            ],
            'tr' => [
                'tag' => 'tr',
                'meaning' => 'Fila de celdas en una tabla.',
                'category' => 'table',
                'allows_children' => true,
                'allowed_children' => ['th', 'td'],
                'disallowed_children' => ['tr', 'table', 'thead', 'tbody'],
                'recommended_children' => ['th', 'td'],
                'best_practices' => 'Solo puede ser hijo directo de <table>, <thead> o <tbody>.'
            ],
            'th' => [
                'tag' => 'th',
                'meaning' => 'Celda de encabezado de una columna o fila en una tabla.',
                'category' => 'table',
                'allows_children' => true,
                'allowed_children' => ['span', 'strong', 'a', 'code', 'i'],
                'disallowed_children' => ['div', 'p', 'table', 'section'],
                'recommended_children' => ['text'],
                'best_practices' => 'Utiliza el atributo scope ("col" o "row") para mejorar radicalmente la accesibilidad tabular.'
            ],
            'td' => [
                'tag' => 'td',
                'meaning' => 'Celda contenedora de datos estándar de una tabla.',
                'category' => 'table',
                'allows_children' => true,
                'allowed_children' => ['*'],
                'disallowed_children' => [],
                'recommended_children' => ['text', 'span', 'button', 'a'],
                'best_practices' => 'Las celdas de datos admiten cualquier tipo de flujo, incluidos botones de acción o badges estructurales.'
            ],
            'form' => [
                'tag' => 'form',
                'meaning' => 'Sección de un documento que contiene controles interactivos para permitir que un usuario envíe información.',
                'category' => 'form',
                'allows_children' => true,
                'allowed_children' => ['input', 'textarea', 'select', 'label', 'button', 'div', 'fieldset', 'p'],
                'disallowed_children' => ['form'],
                'recommended_children' => ['fieldset', 'div', 'button'],
                'best_practices' => 'Nunca anides un formulario directamente dentro de otro formulario.'
            ],
            'input' => [
                'tag' => 'input',
                'meaning' => 'Control interactivo basado en datos para recibir información de formularios en múltiples formatos (text, checkbox, radio).',
                'category' => 'form',
                'allows_children' => false,
                'allowed_children' => [],
                'disallowed_children' => [],
                'recommended_children' => [],
                'best_practices' => 'Asócialo siempre a un <label> mediante el atributo "id" para cumplir con normativas de accesibilidad.'
            ],
            'textarea' => [
                'tag' => 'textarea',
                'meaning' => 'Control de edición de texto multilínea plano.',
                'category' => 'form',
                'allows_children' => false,
                'allowed_children' => [],
                'disallowed_children' => [],
                'recommended_children' => [],
                'best_practices' => 'Utiliza el atributo rows y cols o preferiblemente CSS para determinar su tamaño inicial de UI.'
            ],
            'select' => [
                'tag' => 'select',
                'meaning' => 'Control de formulario que representa un menú desplegable de opciones.',
                'category' => 'form',
                'allows_children' => true,
                'allowed_children' => ['option', 'optgroup'],
                'disallowed_children' => ['div', 'p', 'input'],
                'recommended_children' => ['option'],
                'best_practices' => 'Sus únicos hijos semánticos permitidos son grupos u opciones directas.'
            ],
            'label' => [
                'tag' => 'label',
                'meaning' => 'Representa una etiqueta o título para un elemento de la interfaz de usuario de un formulario.',
                'category' => 'form',
                'allows_children' => true,
                'allowed_children' => ['*'],
                'disallowed_children' => ['label', 'button', 'a', 'form'],
                'recommended_children' => ['text'],
                'best_practices' => 'No anides otros elementos interactivos de navegación clicleables dentro de un label.'
            ],
            'option' => [
                'tag' => 'option',
                'meaning' => 'Representa un ítem seleccionable dentro de un control <select> o una lista de sugerencias.',
                'category' => 'advanced_form',
                'allows_children' => false,
                'allowed_children' => [],
                'disallowed_children' => [],
                'recommended_children' => [],
                'best_practices' => 'Define siempre un atributo value explícito, incluso si coincide con el texto visible.'
            ],
            'optgroup' => [
                'tag' => 'optgroup',
                'meaning' => 'Agrupa lógicamente múltiples elementos <option> dentro de un menú desplegable <select>.',
                'category' => 'advanced_form',
                'allows_children' => true,
                'allowed_children' => ['option'],
                'disallowed_children' => ['*'],
                'recommended_children' => ['option'],
                'best_practices' => 'Usa el atributo label para nombrar visualmente al grupo de opciones.'
            ],
            'fieldset' => [
                'tag' => 'fieldset',
                'meaning' => 'Agrupación lógica de varios controles y etiquetas dentro de un formulario web.',
                'category' => 'advanced_form',
                'allows_children' => true,
                'allowed_children' => ['legend', 'input', 'select', 'textarea', 'div', 'p', 'button'],
                'disallowed_children' => [],
                'recommended_children' => ['legend', 'div'],
                'best_practices' => 'Úsalo en conjunto con <legend> para dar un contexto semántico muy fuerte y accesible a secciones del formulario.'
            ],
            'legend' => [
                'tag' => 'legend',
                'meaning' => 'Representa un título o leyenda para el contenido de su contenedor <fieldset> padre.',
                'category' => 'advanced_form',
                'allows_children' => true,
                'allowed_children' => ['span', 'strong', 'em', 'i'],
                'disallowed_children' => ['div', 'p', 'h1', 'h2'],
                'recommended_children' => ['text'],
                'best_practices' => 'Debe ser estrictamente el primer hijo directo significativo de un elemento <fieldset>.'
            ],
            'details' => [
                'tag' => 'details',
                'meaning' => 'Widget de revelación de información interactivo nativo. El usuario puede abrir o cerrar el contenedor.',
                'category' => 'interactive',
                'allows_children' => true,
                'allowed_children' => ['summary', 'p', 'div', 'ul', 'ol', 'table', 'img'],
                'disallowed_children' => ['details', 'dialog'],
                'recommended_children' => ['summary', 'div'],
                'best_practices' => 'Perfecto para secciones nativas de acordeones y FAQs sin sobrecargar de JavaScript.'
            ],
            'summary' => [
                'tag' => 'summary',
                'meaning' => 'Especifica un encabezado, título o resumen visible para el cuadro de detalles de un elemento <details>.',
                'category' => 'interactive',
                'allows_children' => true,
                'allowed_children' => ['span', 'strong', 'i', 'code'],
                'disallowed_children' => ['div', 'p', 'h1', 'h2', 'table', 'section'],
                'recommended_children' => ['text', 'i'],
                'best_practices' => 'Debe ser el primer hijo directo de un tag <details>.'
            ],
            'dialog' => [
                'tag' => 'dialog',
                'meaning' => 'Representa una caja de diálogo, modal u otro componente interactivo superpuesto en la interfaz.',
                'category' => 'interactive',
                'allows_children' => true,
                'allowed_children' => ['*'],
                'disallowed_children' => [],
                'recommended_children' => ['header', 'div', 'footer'],
                'best_practices' => 'Utiliza los métodos nativos .showModal() y .close() de JS para garantizar el correcto foco de accesibilidad (trap-focus).'
            ],
        ];

        // Construcción dinámica de encabezados jerárquicos (h1 a h6) bajo el patrón DRY
        $headingMeanings = [
            'h1' => 'Encabezado principal del documento o sección de mayor nivel jerárquico.',
            'h2' => 'Encabezado de segundo nivel jerárquico. Representa las secciones principales de una página.',
            'h3' => 'Encabezado de tercer nivel jerárquico. Representa subsecciones dentro de una sección <h2>.',
            'h4' => 'Encabezado de cuarto nivel jerárquico. Representa subsecciones estructuradas profundamente.',
            'h5' => 'Encabezado de quinto nivel jerárquico. Representa subsecciones específicas de bajo nivel.',
            'h6' => 'Encabezado de sexto nivel jerárquico. El nivel de encabezado más bajo y específico del documento.',
        ];

        foreach ($headingMeanings as $level => $meaning) {
            $rules[$level] = [
                'tag' => $level,
                'meaning' => $meaning,
                'category' => 'block_heading',
                'allows_children' => true,
                'allowed_children' => ['span', 'strong', 'em', 'a', 'img', 'code', 'i'],
                'disallowed_children' => ['div', 'p', 'ul', 'ol', 'table', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'section', 'article', 'form'],
                'recommended_children' => ['text'],
                'best_practices' => $level === 'h1' 
                    ? 'Debe haber un único <h1> por página que resuma el tema principal. Nunca te saltes niveles jerárquicos.' 
                    : 'Mantén la jerarquía ordenada lógica. Evita elegir niveles basados en el tamaño de fuente visual deseado.'
            ];
        }

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
     * Obtiene el catálogo completo de elementos HTML nativos inyectado dinámicamente con sus reglas.
     *
     * @return array[]
     */
    public function getNativeElementsCatalog(): array
    {
        $allRules = $this->getRules();

        $catalogDefinition = [
            'structure'          => HTMLTags::structure(),
            'advanced_structure' => HTMLTags::advancedStructure(),
            'text'               => HTMLTags::text(),
            'inline'             => HTMLTags::inlineFormatting(),
            'list'               => HTMLTags::list(),
            'media'              => HTMLTags::media(),
            'table'              => HTMLTags::tables(),
            'form'               => HTMLTags::form(),
            'advanced_form'      => HTMLTags::advancedForm(),
            'interactive'        => HTMLTags::interactive(),
        ];

        $hydratedCatalog = [];

        foreach ($catalogDefinition as $categoryKey => $items) {
            $hydratedItems = [];
            foreach ($items as $item) {
                $tag = $item['type'];
                // Extraemos las reglas semánticas correspondientes a esta etiqueta
                $tagRules = $allRules[$tag] ?? [
                    'meaning' => 'Etiqueta HTML estándar.',
                    'allows_children' => $item['allows_children'],
                    'allowed_children' => $item['allowed_children'] ?? ['*'],
                    'disallowed_children' => [],
                    'recommended_children' => [],
                    'best_practices' => 'Usa elementos semánticos estándar.'
                ];

                // Fusión limpia: preservamos la estructura de la UI (label, props) y le inyectamos las reglas
                $hydratedItems[] = array_merge($item, [
                    'meaning'              => $tagRules['meaning'],
                    'allows_children'      => $tagRules['allows_children'],
                    'allowed_children'     => $tagRules['allowed_children'],
                    'disallowed_children'  => $tagRules['disallowed_children'],
                    'recommended_children' => $tagRules['recommended_children'],
                    'best_practices'       => $tagRules['best_practices']
                ]);
            }

            $hydratedCatalog[] = [
                'category' => $categoryKey,
                'items'    => $hydratedItems,
            ];
        }

        return $hydratedCatalog;
    }
}

class HTMLTags 
{
    public static function structure() {
        return [
            [
                'type' => 'div',
                'label' => 'label_div',
                'allows_children' => true,
                'allowed_children' => ['*'],
                'props' => [],
                'recommended_props' => ['class', 'id', 'style'],
            ],
            [
                'type' => 'section',
                'label' => 'label_section',
                'allows_children' => true,
                'allowed_children' => ['*'],
                'props' => ['class' => 'py-5'],
                'recommended_props' => ['class', 'id', 'style'],
            ],
            [
                'type' => 'header',
                'label' => 'label_header',
                'allows_children' => true,
                'allowed_children' => ['*'],
                'props' => [],
                'recommended_props' => ['class', 'id', 'style'],
            ],
            [
                'type' => 'footer',
                'label' => 'label_footer',
                'allows_children' => true,
                'allowed_children' => ['*'],
                'props' => [],
                'recommended_props' => ['class', 'id', 'style'],
            ],
        ];
    }

    public static function text() {
        // Corregido y reutilizado de forma segura con el '$' correspondiente
        $allowed_children = ['span', 'strong', 'em', 'a', 'code', 'kbd', 'sub', 'sup', 'mark', 'cite', 'abbr', 'time'];
        
        $headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        $structure = [];

        foreach ($headings as $h) {
            $structure[] = [
                'type' => $h,
                'label' => "label_{$h}",
                'allows_children' => true,
                'allowed_children' => $allowed_children,
                'props' => [
                    'content' => "text_{$h}",
                ],
                'recommended_props' => ['class', 'id'],
            ];
        }

        $structure[] = [
            'type' => 'p',
            'label' => 'label_p',
            'allows_children' => true,
            'allowed_children' => $allowed_children,
            'props' => [
                'content' => 'text_p',
            ],
            'recommended_props' => ['class'],
        ];

        $structure[] = [
            'type' => 'blockquote',
            'label' => 'label_blockquote',
            'allows_children' => true,
            'allowed_children' => $allowed_children,
            'props' => [
                'content' => 'text_blockquote',
            ],
            'recommended_props' => ['class'],
        ];

        return $structure;
    }

    public static function list() {
        return [
            [
                'type' => 'ul',
                'label' => 'label_ul',
                'allows_children' => true,
                'allowed_children' => ['li'],
                'props' => [],
                'recommended_props' => ['class'],
            ],
            [
                'type' => 'ol',
                'label' => 'label_ol',
                'allows_children' => true,
                'allowed_children' => ['li'],
                'props' => [],
                'recommended_props' => ['class'],
            ],
            [
                'type' => 'li',
                'label' => 'label_li',
                'allows_children' => true,
                'allowed_children' => ['span', 'strong', 'a', 'ol', 'ul', 'div'],
                'props' => [
                    'content' => 'text_li',
                ],
                'recommended_props' => ['class'],
            ],
        ];
    }

    public static function media() {
        return [
            [
                'type' => 'img',
                'label' => 'label_img',
                'allows_children' => false,
                'allowed_children' => [],
                'props' => [
                    'src' => 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&auto=format&fit=crop',
                    'alt' => 'Imagen',
                    'class' => 'img-fluid rounded',
                ],
                'recommended_props' => ['src', 'alt', 'class', 'width', 'height'],
            ],
            [
                'type' => 'video',
                'label' => 'label_video',
                'allows_children' => false,
                'allowed_children' => [],
                'props' => [
                    'src' => '',
                    'controls' => 'true',
                    'class' => 'w-100',
                ],
                'recommended_props' => ['src', 'controls', 'class', 'autoplay', 'muted', 'loop'],
            ],
            [
                'type' => 'audio',
                'label' => 'label_audio',
                'allows_children' => false,
                'allowed_children' => [],
                'props' => [
                    'src' => '',
                    'controls' => 'true',
                    'class' => 'w-100',
                ],
                'recommended_props' => ['src', 'controls', 'class', 'autoplay', 'muted', 'loop'],
            ],
            [
                'type' => 'iframe',
                'label' => 'label_iframe',
                'allows_children' => false,
                'allowed_children' => [],
                'props' => [
                    'src' => 'https://maps.google.com',
                    'class' => 'w-100 border-0',
                    'height' => '300',
                ],
                'recommended_props' => ['src', 'class', 'height', 'width'],
            ],
        ];
    }

    public static function form() {
        return [
            [
                'type' => 'form',
                'label' => 'label_form',
                'allows_children' => true,
                'allowed_children' => ['input', 'textarea', 'select', 'label', 'button', 'div'], // Corregido: Ahora sí acepta elementos del formulario
                'props' => [
                    'method' => 'POST',
                    'action' => '#',
                ],
                'recommended_props' => ['method', 'action', 'class', 'id', 'enctype'],
            ],
            [
                'type' => 'input',
                'label' => 'label_input',
                'allows_children' => false,
                'allowed_children' => [],
                'props' => [
                    'type' => 'text',
                    'class' => 'form-control',
                    'placeholder' => 'Escribe aquí...',
                ],
                'recommended_props' => ['type', 'name', 'value', 'class', 'placeholder', 'required', 'disabled'],
            ],
            [
                'type' => 'textarea',
                'label' => 'label_textarea',
                'allows_children' => false,
                'allowed_children' => [],
                'props' => [
                    'class' => 'form-control',
                    'rows' => '3',
                ],
                'recommended_props' => ['name', 'class', 'rows', 'placeholder', 'required', 'disabled'],
            ],
            [
                'type' => 'select',
                'label' => 'label_select',
                'allows_children' => true,
                'allowed_children' => ['option'],
                'props' => [
                    'class' => 'form-select',
                ],
                'recommended_props' => ['name', 'class', 'required', 'disabled', 'multiple'],
            ],
            [
                'type' => 'label',
                'label' => 'label',
                'allows_children' => true,
                'allowed_children' => ['*'], 
                'props' => [
                    'content' => 'Etiqueta:',
                ],
                'recommended_props' => ['for', 'class'],
            ],
            [
                'type' => 'button',
                'label' => 'label_submit',
                'allows_children' => true,
                'allowed_children' => ['span', 'i'], // Permite iconos internos por ejemplo
                'props' => [
                    'type' => 'submit',
                    'class' => 'btn btn-primary',
                    'content' => 'Enviar',
                ],
                'recommended_props' => ['type', 'class', 'disabled'],
            ],
        ];
    }

    public static function advancedStructure() {
        return [
            [
                'type' => 'main',
                'label' => 'label_main',
                'allows_children' => true,
                'allowed_children' => ['section', 'div', 'article'],
                'props' => [],
                'recommended_props' => ['id', 'class'],
            ],
            [
                'type' => 'article',
                'label' => 'label_article',
                'allows_children' => true,
                'allowed_children' => ['*'],
                'props' => [],
                'recommended_props' => ['class', 'id'],
            ],
            [
                'type' => 'aside',
                'label' => 'label_aside',
                'allows_children' => true,
                'allowed_children' => ['*'],
                'props' => [],
                'recommended_props' => ['class', 'id'],
            ],
            [
                'type' => 'nav',
                'label' => 'label_nav',
                'allows_children' => true,
                'allowed_children' => ['ul', 'ol', 'div', 'a'],
                'props' => [],
                'recommended_props' => ['class', 'id', 'aria-label'],
            ],
        ];
    }

    public static function tables() {
        return [
            [
                'type' => 'table',
                'label' => 'label_table',
                'allows_children' => true,
                'allowed_children' => ['thead', 'tbody', 'tfoot', 'tr'],
                'props' => ['class' => 'table table-striped table-hover'], // Clases Bootstrap por defecto
                'recommended_props' => ['class', 'id'],
            ],
            [
                'type' => 'thead',
                'label' => 'label_thead',
                'allows_children' => true,
                'allowed_children' => ['tr'],
                'props' => [],
                'recommended_props' => ['class'],
            ],
            [
                'type' => 'tbody',
                'label' => 'label_tbody',
                'allows_children' => true,
                'allowed_children' => ['tr'],
                'props' => [],
                'recommended_props' => ['class'],
            ],
            [
                'type' => 'tr',
                'label' => 'label_tr',
                'allows_children' => true,
                'allowed_children' => ['th', 'td'],
                'props' => [],
                'recommended_props' => ['class'],
            ],
            [
                'type' => 'th',
                'label' => 'label_th',
                'allows_children' => true,
                'allowed_children' => ['span', 'strong', 'a'],
                'props' => [],
                'content' => 'Encabezado',
                'recommended_props' => ['scope', 'class', 'colspan', 'rowspan'],
            ],
            [
                'type' => 'td',
                'label' => 'label_td',
                'allows_children' => true,
                'allowed_children' => ['*'], // Las celdas pueden contener texto, botones, imágenes, etc.
                'props' => [],
                'content' => 'Dato',
                'recommended_props' => ['class', 'colspan', 'rowspan'],
            ],
        ];
    }

    public static function advancedForm() {
        return [
            [
                'type' => 'option',
                'label' => 'label_option',
                'allows_children' => false,
                'allowed_children' => [],
                'props' => ['value' => ''],
                'content' => 'Opción',
                'recommended_props' => ['value', 'selected', 'disabled'],
            ],
            [
                'type' => 'optgroup',
                'label' => 'label_optgroup',
                'allows_children' => true,
                'allowed_children' => ['option'],
                'props' => ['label' => 'Grupo de Opciones'],
                'recommended_props' => ['label', 'disabled'],
            ],
            [
                'type' => 'fieldset',
                'label' => 'label_fieldset',
                'allows_children' => true,
                'allowed_children' => ['legend', 'input', 'select', 'textarea', 'div'],
                'props' => ['class' => 'border p-3 mb-3'],
                'recommended_props' => ['class', 'disabled', 'form'],
            ],
            [
                'type' => 'legend',
                'label' => 'label_legend',
                'allows_children' => true,
                'allowed_children' => ['span', 'strong'],
                'props' => ['class' => 'w-auto px-2'],
                'content' => 'Título del Grupo',
                'recommended_props' => ['class'],
            ],
        ];
    }

    public static function interactive() {
        return [
            [
                'type' => 'details',
                'label' => 'label_details',
                'allows_children' => true,
                'allowed_children' => ['summary', 'p', 'div', 'ul'],
                'props' => ['class' => 'mb-2'],
                'recommended_props' => ['open', 'class'],
            ],
            [
                'type' => 'summary',
                'label' => 'label_summary',
                'allows_children' => true,
                'allowed_children' => ['span', 'strong', 'i'], // Permite texto e iconos de Bootstrap
                'props' => ['class' => 'fw-bold cursor-pointer'],
                'content' => 'Haga clic para expandir',
                'recommended_props' => ['class'],
            ],
            [
                'type' => 'dialog',
                'label' => 'label_dialog',
                'allows_children' => true,
                'allowed_children' => ['*'],
                'props' => ['class' => 'modal-dialog p-4 rounded shadow'],
                'recommended_props' => ['open', 'class', 'id'],
            ],
        ];
    }

    public static function inlineFormatting(): array 
    {
        return [
            [
                'type' => 'a',
                'label' => 'label_link',
                'allows_children' => true,
                'allowed_children' => ['span', 'strong', 'i'],
                'props' => ['href' => '#', 'class' => 'text-primary text-decoration-none'],
                'content' => 'Enlace',
                'recommended_props' => ['href', 'target', 'class', 'id', 'rel'],
            ],
            [
                'type' => 'span',
                'label' => 'label_span',
                'allows_children' => true,
                'allowed_children' => ['i', 'strong', 'em', 'a', 'code', 'kbd', 'sub', 'sup', 'mark', 'cite', 'abbr', 'time'],
                'props' => [],
                'content' => 'Texto span',
                'recommended_props' => ['class', 'id', 'style'],
            ],
            [
                'type' => 'i',
                'label' => 'label_icon',
                'allows_children' => false,
                'allowed_children' => [],
                'props' => ['class' => 'bi bi-info-circle'],
                'recommended_props' => ['class', 'style', 'aria-hidden'],
            ],
            [
                'type' => 'hr',
                'label' => 'label_hr',
                'allows_children' => false,
                'allowed_children' => [],
                'props' => [
                    'class' => 'my-4',
                ],
                'recommended_props' => ['class'],
            ],
        ];
    }
}