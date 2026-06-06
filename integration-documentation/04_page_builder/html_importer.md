# HTML-to-Node Importer

Convierte HTML estático en un árbol de nodos compatible con el Page Builder del CMS.

> **Ver también:** [vdom_architecture.md](../02_architecture/vdom_architecture.md) para el contexto arquitectónico completo.

---

## Problema que resuelve

Cuando un usuario importa una plantilla HTML (Bootstrap, Tailwind, Material UI u otro), el importador la convierte automáticamente en nodos del CMS, permitiendo edición visual, reutilización y gestión de contenido sin tocar código.

---

## Principio fundamental del esquema de nodo

> **Un nodo = un elemento HTML.**

| Campo      | Rol                                    | Ejemplo                                                  |
| ---------- | -------------------------------------- | -------------------------------------------------------- |
| `type`     | La etiqueta HTML real                  | `"div"`, `"section"`, `"h1"`, `"button"`, `"img"`        |
| `name`     | El componente o patrón identificado    | `"card"`, `"accordion"`, `"col"`, `null` (genérico)      |
| `props`    | Atributos HTML del elemento            | `{ "class": "card shadow", "id": "main" }`               |
| `bindings` | Variables dinámicas vinculadas a props | `{ "content": "product.name", "src": "product.image" }`  |
| `loop`     | Configuración de bucle de datos        | `{ "source": "module:products", "variable": "product" }` |
| `children` | Nodos hijos (árbol recursivo)          | `[ Node, Node, ... ]`                                    |

El `name` es el puente con el sistema de componentes. Si es `null`, el nodo es un elemento HTML genérico. Si tiene valor, el editor visual mostrará el panel de configuración del componente correspondiente.

---

## Flujo de importación

```
Archivo HTML (o fragmento pegado)
        ↓ HtmlImporter::import($html)
        ↓
  Árbol de nodos en MEMORIA (no persistido)
        ↓
  Interfaz de revisión y selección interactiva
        ↓
  El usuario decide:
    A) Guardar como página completa
    B) Guardar un subárbol como componente reutilizable
        ↓
  Persistencia en DB (pages.content / templates.tree)
```

**Clave:** el árbol se genera en memoria primero. El usuario puede revisar, identificar variables dinámicas y convertir subárboles en componentes **antes** de persistir.

---

## Arquitectura del módulo

El core del importador es **agnóstico del framework UI**. Las reglas de reconocimiento de componentes (`Bootstrap/`, `Tailwind/`, etc.) no viven en el importador — son inyectadas en tiempo de ejecución por el módulo de framework UI activo a través del `UiFrameworkRegistry` (ver [vdom_architecture.md](../02_architecture/vdom_architecture.md), sección 3).

```
# Core del importador (agnóstico)
src/PageBuilder/
└── Import/
    ├── HtmlImporter.php              ← punto de entrada; recibe UiFrameworkRegistry
    ├── HtmlParser.php                ← wrapper DOMDocument
    ├── NodeBuilder.php               ← construye nodos con UUID
    ├── RuleRegistry.php              ← registro de reglas ordenadas por prioridad
    ├── RuleEngine.php                ← orquesta matcher + extractor por nodo DOM
    ├── ImportResult.php              ← resultado: tree + warnings + stats
    ├── ImportWarning.php
    ├── ClassHelper.php
    ├── Contract/
    │   └── RuleInterface.php
    └── Rules/
        └── FallbackRule.php          ← única regla del core; siempre al final → html raw

# Reglas específicas de framework (provistos por cada UiFrameworkModule)
src/PageBuilder/Frameworks/
├── Bootstrap5/
│   ├── Bootstrap5Module.php          ← implementa UiFrameworkModuleInterface
│   └── Rules/
│       ├── ContainerRule.php
│       ├── RowRule.php
│       ├── ColRule.php
│       ├── CardRule.php
│       ├── HeadingRule.php
│       ├── ImageRule.php
│       └── ...
└── TailwindCss/
    ├── TailwindModule.php
    └── Rules/
        └── ...
```

Al iniciar una importación, `HtmlImporter` llama a `UiFrameworkRegistry::getActiveModule()->getImportRules()` y registra esas reglas en el `RuleRegistry` junto con `FallbackRule`. Agregar soporte para un nuevo framework solo requiere crear un nuevo módulo sin tocar el core.

---

## Interfaz pública

```php
// El importador recibe el registry para resolver las reglas del framework activo
$registry = app(UiFrameworkRegistry::class);
$importer = new HtmlImporter($registry);

// Importar HTML → ImportResult con árbol EN MEMORIA (no persistido)
$result = $importer->import('<div class="container">...</div>');

// El árbol está listo para revisar o persistir
$tree     = $result->tree;     // array de nodos
$warnings = $result->warnings; // advertencias de conversión
$stats    = $result->stats;    // estadísticas

// Persistir SOLO cuando el usuario confirme en la UI de revisión
CmsBridge::useCase('createPage')->execute([
    'title'   => 'Mi página importada',
    'slug'    => 'mi-pagina',
    'status'  => 'draft',
    'content' => $tree,
]);
```

---

## Contrato de la interfaz de reglas

```php
interface RuleInterface
{
    /**
     * Determina si esta regla puede manejar el elemento DOM dado.
     */
    public function matches(\DOMElement $el): bool;

    /**
     * Extrae el nodo. Recibe un callable $recurse(DOMElement): array
     * para convertir los hijos del elemento.
     *
     * @return array Nodo en formato:
     *   ['type' => 'div', 'name' => 'card', 'props' => [...], 'children' => [...]]
     */
    public function extract(\DOMElement $el, callable $recurse): array;

    /**
     * Prioridad de la regla. Mayor número = mayor prioridad.
     * 400 = exact match, 300 = bootstrap component,
     * 200 = semantic HTML5, 100 = generic, 0 = fallback
     */
    public function priority(): int;
}
```

---

## Tabla de mapeo HTML → Nodo

| Patrón HTML detectado           | `type`       | `name`      | Props extraídas                                   |
| ------------------------------- | ------------ | ----------- | ------------------------------------------------- |
| `<div class="container">`       | `div`        | `container` | `class: "container"`                              |
| `<div class="container-fluid">` | `div`        | `container` | `class: "container-fluid"`                        |
| `<div class="row">`             | `div`        | `row`       | `class`, gutter (`g-*`), align, justify           |
| `<div class="col-md-6">`        | `div`        | `col`       | `class`, breakpoints xs/sm/md/lg/xl               |
| `<div class="card">`            | `div`        | `card`      | `class`, title, subtitle, text, image_src, footer |
| `<div class="accordion">`       | `div`        | `accordion` | `class`, flush, always_open                       |
| `<div class="carousel slide">`  | `div`        | `carousel`  | `class`, controls, indicators, autoplay           |
| `<div class="collapse">`        | `div`        | `collapse`  | `class`, id, open                                 |
| `<a class="btn btn-primary">`   | `a`          | `button`    | `class`, href, variant, size, target              |
| `<button class="btn">`          | `button`     | `button`    | `class`, variant, size                            |
| `<h1>`…`<h6>`                   | `h1`…`h6`    | `null`      | `class`, content (textContent)                    |
| `<p>`                           | `p`          | `null`      | `class`, content, align                           |
| `<img>`                         | `img`        | `null`      | `src`, `alt`, `class`, width, height              |
| `<hr>`                          | `hr`         | `divider`   | `class`, style, spacing                           |
| `<header>`                      | `header`     | `null`      | `class`, role: "banner"                           |
| `<footer>`                      | `footer`     | `null`      | `class`, role: "contentinfo"                      |
| `<nav>`                         | `nav`        | `null`      | `class`, role: "navigation"                       |
| `<section>`                     | `section`    | `null`      | `class`                                           |
| `<article>`                     | `article`    | `null`      | `class`                                           |
| **todo lo demás**               | tag original | `null`      | `content` (outerHTML raw)                         |

---

## Formato de salida de ejemplo

**Input HTML:**
```html
<div class="container py-5">
  <div class="row g-4">
    <div class="col-md-6">
      <div class="card shadow">
        <div class="card-body">
          <h5 class="card-title">Nuestro producto</h5>
          <p class="card-text">Descripción breve.</p>
          <a href="/pricing" class="btn btn-primary">Ver precios</a>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <img src="/img/product.png" alt="Producto" class="img-fluid rounded">
    </div>
  </div>
</div>
```

**Output — árbol de nodos (en memoria):**
```json
[
  {
    "id": "node_abc123",
    "type": "div",
    "name": "container",
    "props": { "class": "container py-5" },
    "bindings": null,
    "loop": null,
    "children": [
      {
        "id": "node_def456",
        "type": "div",
        "name": "row",
        "props": { "class": "row g-4" },
        "bindings": null,
        "loop": null,
        "children": [
          {
            "id": "node_ghi789",
            "type": "div",
            "name": "col",
            "props": { "class": "col-md-6" },
            "bindings": null,
            "loop": null,
            "children": [
              {
                "id": "node_jkl012",
                "type": "div",
                "name": "card",
                "props": { "class": "card shadow" },
                "bindings": null,
                "loop": null,
                "children": [
                  {
                    "id": "node_h5_001",
                    "type": "h5",
                    "name": null,
                    "props": { "class": "card-title" },
                    "bindings": null,
                    "loop": null,
                    "children": []
                  },
                  {
                    "id": "node_p_001",
                    "type": "p",
                    "name": null,
                    "props": { "class": "card-text" },
                    "bindings": null,
                    "loop": null,
                    "children": []
                  },
                  {
                    "id": "node_mno345",
                    "type": "a",
                    "name": "button",
                    "props": {
                      "class": "btn btn-primary",
                      "href": "/pricing"
                    },
                    "bindings": null,
                    "loop": null,
                    "children": []
                  }
                ]
              }
            ]
          },
          {
            "id": "node_pqr678",
            "type": "div",
            "name": "col",
            "props": { "class": "col-md-6" },
            "bindings": null,
            "loop": null,
            "children": [
              {
                "id": "node_stu901",
                "type": "img",
                "name": null,
                "props": {
                  "src": "/img/product.png",
                  "alt": "Producto",
                  "class": "img-fluid rounded"
                },
                "bindings": null,
                "loop": null,
                "children": []
              }
            ]
          }
        ]
      }
    ]
  }
]
```

---

## Regla de fallback — nodo HTML genérico

Todo elemento que ninguna regla reconozca se convierte en un nodo HTML con su contenido original intacto:

```json
{
  "type": "div",
  "name": null,
  "props": {
    "class": "swiper-wrapper",
    "_raw_html": "<div class=\"swiper-wrapper\">...</div>"
  },
  "bindings": null,
  "loop": null,
  "children": []
}
```

Esto garantiza **zero data loss**: el HTML siempre renderiza aunque el sistema no lo reconozca como componente.

---

## Extensibilidad — agregar una nueva regla

### Ejemplo: soporte para `.alert` de Bootstrap

```php
final class AlertRule implements RuleInterface
{
    public function priority(): int { return 300; }

    public function matches(\DOMElement $el): bool
    {
        return str_contains($el->getAttribute('class'), 'alert');
    }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $classes = explode(' ', $el->getAttribute('class'));
        $variant = 'primary';
        foreach ($classes as $cls) {
            if (str_starts_with($cls, 'alert-') && $cls !== 'alert-dismissible') {
                $variant = substr($cls, 6);
                break;
            }
        }

        return [
            'type'     => 'div',
            'name'     => 'alert',
            'props'    => [
                'class'       => $el->getAttribute('class'),
                'variant'     => $variant,
                'dismissible' => str_contains($el->getAttribute('class'), 'dismissible'),
            ],
            'bindings' => null,
            'loop'     => null,
            'children' => $recurse($el),
        ];
    }
}
```

Registrarla **antes** del `FallbackRule`:

```php
$registry->register(new AlertRule());
```

---

## Integración con el CMS

### Desde el controlador (importación manual)

El flujo sigue los 3 pasos definidos en [vdom_architecture.md](../02_architecture/vdom_architecture.md) sección 5:

**Paso 1 — Convertir a VDOM en memoria, retornar al editor sin persistir:**
```php
public function importHtml(Request $request): JsonResponse
{
    $html = $request->validate(['html' => 'required|string'])['html'];

    $registry = app(UiFrameworkRegistry::class);
    $importer = new \LemurCms\PageBuilder\Import\HtmlImporter($registry);
    $result   = $importer->import($html);

    // Retornar árbol JSON al editor Svelte SIN persistir
    // El usuario revisa, identifica variables y convierte subárboles a componentes
    return response()->json([
        'tree'     => $result->tree,
        'warnings' => $result->warnings,
        'stats'    => $result->stats,
    ]);
}
```

**Paso 2 — El usuario revisa en la UI interactiva de Svelte (mapeo de variables y loops).**

**Paso 3 — Guardar cuando el usuario confirme:**
```php
public function saveImported(Request $request): RedirectResponse
{
    $data = $request->validate([
        'title'   => 'required|string',
        'slug'    => 'required|string',
        'content' => 'required|array',
    ]);

    $id = CmsBridge::useCase('createPage')->execute([
        'title'   => $data['title'],
        'slug'    => $data['slug'],
        'status'  => 'draft',
        'content' => $data['content'],
    ]);

    return redirect()->route('manager.pages.edit', $id)
        ->with('success', 'HTML importado. Revisa y publica cuando esté listo.');
}
```

### Desde CLI

```bash
php lemur-cms/bin/lemur html:import \
  --file=templates/landing.html \
  --title="Landing Page" \
  --slug=landing \
  --status=draft
```

---

## Optimizaciones y Nuevas Características del Motor

### 1. Caché de Coincidencia de Reglas (Performance)
El `RuleRegistry` incluye un sistema de caché interno que memoriza las reglas coincidentes para un elemento basándose en su nombre de etiqueta (`tagName`) y sus atributos. Esto acelera notablemente la importación de documentos HTML extensos y con múltiples elementos repetidos. La caché se invalida de manera segura al registrar nuevas reglas.

### 2. Navegación Contextual (DomHelper)
Se provee la clase de utilidad `DomHelper` para permitir que las reglas examinen el contexto del nodo actual:
- `DomHelper::hasAncestor(\DOMElement $el, string $tag): bool`: Comprueba si el nodo tiene un ancestro con el tag indicado.
- `DomHelper::findAncestor(\DOMElement $el, callable $callback): ?\DOMElement`: Sube por el árbol y retorna el primer ancestro que cumpla la condición.

### 3. Nuevas Reglas Semánticas Core
- **BlockquoteRule**: Mapea elementos de cita y fecha (`blockquote`, `address`, `time`) de forma semántica agregando el prefijo `pb-semantic-{tag}` a sus clases, permitiendo recursar sus hijos sin aplanarlos a texto plano.
- **TableRule**: Añade soporte estructural completo para tablas (`table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`).
- **ListRule**: Soporte estructural completo para listas (`ul`, `ol`, `li`).

---

## Limitaciones conocidas

| Situación                        | Comportamiento                                  |
| -------------------------------- | ----------------------------------------------- |
| `<script>` o `<style>` inline    | Se descartan (no se incluyen en ningún nodo)    |
| Clases CSS custom (no Bootstrap) | Se preservan en `props.class` del nodo          |
| Bootstrap Icons / Font Awesome   | Caen en nodo genérico (sin `name`) con HTML raw |
| Formularios `<form>`             | Nodo `form` con `name: null` y HTML raw         |
| SVG inline complejos             | Nodo `svg` con `name: null` + warning           |
| Profundidad > 15 niveles         | Se trunca en nivel 15; el resto cae a HTML raw  |
