# 07. Arquitectura de Virtual DOM y Renderizado Agnóstico de Framework UI

> **Módulo:** `PageBuilder` & `HtmlImporter`  
> **Propósito:** Desacoplar el CMS de Bootstrap 5, implementando un sistema de Virtual DOM semántico y agnóstico donde los frameworks UI (Bootstrap, Material UI, Tailwind) se cargan como módulos instalables.  
> **Estado:** Propuesta de Arquitectura y Especificación de Refactorización.

---

## 1. Visión General del Cambio Arquitectónico

Actualmente, el Page Builder y el importador de HTML de Lemur CMS están fuertemente condicionados a Bootstrap 5. Clases CSS como `row`, `col-md-*`, `card`, `accordion`, etc., y la estructura exacta de sus elementos hijos están "hardcodeadas" tanto en los renderizadores del backend como en las reglas del importador.

Esta refactorización tiene como objetivo **desacoplar completamente el core del CMS del framework de interfaz (UI Framework)**, implementando una arquitectura de **Virtual DOM (VDOM) Semántico** que actúe como único punto de verdad. Los frameworks de UI concretos pasarán a ser **módulos instalables independientes**.

```
┌──────────────────────────────────────────────────────────────────┐
│                      VIRTUAL DOM SEMÁNTICO                      │
│             (Árbol de Nodos Reales HTML + Identidad de Componente)│
│                                                                  │
│  Cada nodo = etiqueta HTML real + nombre de componente opcional  │
│  { type: "div", name: "card" }  { type: "button", name: null }   │
└────────────────────────────────┬─────────────────────────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│  Módulo BOOTSTRAP│    │  Módulo MATERIAL │    │  Módulo TAILWIND │
│      (Install)   │    │    UI (Install)  │    │    (Install)     │
│                  │    │                  │    │                  │
│   Renderiza a:   │    │   Renderiza a:   │    │   Renderiza a:   │
│   class="row"    │    │  <Grid container>│    │   class="grid"   │
│   class="col-*"  │    │  <Grid item>     │    │   class="flex-*" │
└──────────────────┘    └──────────────────┘    └──────────────────┘
```

### Objetivos Principales
1. **Independencia de UI**: Permitir que un desarrollador cree y registre un módulo para Material UI, Tailwind o cualquier otro sistema de diseño sin modificar el núcleo de Lemur CMS.
2. **Virtual DOM como Única Verdad**: El árbol de nodos guardado en la base de datos es un espejo 1:1 del DOM HTML real. Cada nodo es una etiqueta HTML (`type`) con sus atributos (`props`), más un campo opcional `name` que identifica si ese nodo pertenece a un componente conocido (ej. `"card"`, `"accordion"`).
3. **Flujo de Importación Decoplado**: El importador analiza un HTML y, a través de las reglas provistas por el módulo del framework activo, lo traduce a nodos del Virtual DOM sin persistirlo inicialmente.
4. **Conversión Interactiva a Componentes**: Durante la importación, el usuario puede seleccionar un subárbol (ej. un banner, un listado), definirle variables y propiedades dinámicas, y guardarlo como un componente reutilizable.
5. **Renderizado en Caliente y Compilación SSR**: Previsualización instantánea en memoria (hot-render) y compilación optimizada en disco de forma asíncrona tras guardar la página, generando la plantilla final para Server-Side Rendering (SSR).

---

## 2. El Virtual DOM (VDOM) — Esquema del Nodo

El punto de verdad del CMS es el árbol de nodos persistido en la base de datos (`pages.content` o `templates.tree`). Un nodo equivale exactamente a **un elemento HTML con sus atributos, clases y propiedades**, más un campo `name` opcional que identifica si ese nodo pertenece a un componente o patrón conocido.

### Principio fundamental

> **Un nodo = un elemento HTML.**  
> `type` es la etiqueta HTML (`div`, `section`, `h1`, `button`, `img`...).  
> `name` es el componente o patrón que representa (`card`, `accordion`, `hero`, `null` si es genérico).

Esto hace que el renderer sea trivial: `<{node.type} {node.props}>`. No se necesita ningún mapeo intermedio.

### Estructura de un Nodo VDOM (`Node`)

```json
{
  "id": "uuid-v4-estable",
  "type": "div",
  "name": "card",
  "props": {
    "class": "card shadow-sm",
    "id": "product-card-01",
    "data-component": "card"
  },
  "bindings": {
    "class": null,
    "content": null
  },
  "loop": null,
  "children": [
    {
      "id": "uuid-v4",
      "type": "img",
      "name": null,
      "props": {
        "class": "card-img-top",
        "alt": "Producto"
      },
      "bindings": {
        "src": "product.image",
        "alt": "product.name"
      },
      "loop": null,
      "children": []
    },
    {
      "id": "uuid-v4",
      "type": "div",
      "name": "card-body",
      "props": {
        "class": "card-body"
      },
      "bindings": null,
      "loop": null,
      "children": [
        {
          "id": "uuid-v4",
          "type": "h5",
          "name": null,
          "props": {
            "class": "card-title"
          },
          "bindings": {
            "content": "product.name"
          },
          "loop": null,
          "children": []
        },
        {
          "id": "uuid-v4",
          "type": "a",
          "name": "button",
          "props": {
            "class": "btn btn-primary",
            "href": "/productos"
          },
          "bindings": {
            "href": "product.url",
            "content": "product.cta_label"
          },
          "loop": null,
          "children": []
        }
      ]
    }
  ]
}
```

### Ejemplo con loop dinámico

```json
{
  "id": "uuid-v4",
  "type": "div",
  "name": "col",
  "props": {
    "class": "col-md-4"
  },
  "bindings": null,
  "loop": {
    "source": "module:products",
    "variable": "product",
    "limit": 6,
    "filters": { "is_featured": true },
    "sort": { "created_at": "desc" }
  },
  "children": [
    {
      "id": "uuid-v4",
      "type": "div",
      "name": "card",
      "props": { "class": "card h-100" },
      "bindings": null,
      "loop": null,
      "children": []
    }
  ]
}
```

### Campos del Nodo — Definición

| Campo      | Tipo            | Obligatorio | Descripción                                                                             |
| ---------- | --------------- | ----------- | --------------------------------------------------------------------------------------- |
| `id`       | `string (uuid)` | ✅           | Identificador único e inmutable del nodo                                                |
| `type`     | `string`        | ✅           | Etiqueta HTML real: `div`, `section`, `h1`, `button`, `img`, `ul`, `span`, etc.         |
| `name`     | `string\|null`  | ❌           | Nombre del componente o patrón: `card`, `accordion`, `hero`. `null` = elemento genérico |
| `props`    | `object`        | ✅           | Atributos HTML del elemento: `class`, `id`, `href`, `src`, `data-*`, `aria-*`           |
| `bindings` | `object\|null`  | ❌           | Mapa de atributo → variable de contexto. Ej. `{ "content": "product.name" }`            |
| `loop`     | `object\|null`  | ❌           | Configuración de bucle de datos sobre este nodo y sus hijos                             |
| `children` | `Node[]`        | ✅           | Nodos hijos (árbol recursivo)                                                           |

### Por qué `type` = etiqueta HTML y `name` = componente

1. **El renderer es trivial**: Recorre el árbol y emite `<{type} {props}>` directamente. Sin mapeos intermedios.
2. **El editor lo usa para contexto**: Si `name = "card"`, el panel de propiedades muestra la configuración específica del componente Card. Si `name = null`, muestra el editor genérico de atributos HTML.
3. **El importador es preciso**: Al leer `<div class="card">`, produce `{ type: "div", name: "card" }` sin ambigüedad.
4. **Agnóstico del framework**: El módulo Bootstrap puede definir que `name: "card"` usa `class="card"`. El módulo Material UI puede definir que `name: "card"` usa `class="MuiCard-root"`. El nodo en DB es siempre el mismo.

---

## 3. Módulos de Framework UI Instalables

Para estructurar los componentes según el framework de UI de elección, se introduce el concepto de **UI Framework Module**. Cada framework se encapsula en una clase que implementa un contrato común.

### Contrato: `UiFrameworkModuleInterface`

```php
namespace LemurCms\PageBuilder\Domain\Contract;

use LemurCms\PageBuilder\Domain\Entity\ComponentDefinition;
use LemurCms\PageBuilder\Import\Contract\RuleInterface;

interface UiFrameworkModuleInterface
{
    /**
     * Identificador único del framework (ej. 'bootstrap5', 'material_ui_v5').
     */
    public function getIdentifier(): string;

    /**
     * Nombre amigable del módulo.
     */
    public function getName(): string;

    /**
     * Catálogo de definiciones de componentes que este módulo aporta al CMS.
     * @return ComponentDefinition[]
     */
    public function getComponentDefinitions(): array;

    /**
     * Reglas de contención estructural y validación (qué nombres de componente pueden ser hijos de cuáles).
     * @return array<string, string[]> ej. ['accordion' => ['accordion-item'], 'row' => ['col']]
     */
    public function getContainmentRules(): array;

    /**
     * Colección de reglas específicas para el importador de HTML.
     * @return RuleInterface[]
     */
    public function getImportRules(): array;

    /**
     * Retorna la ruta física donde se alojan las vistas/templates de renderizado (SSR).
     */
    public function getViewsDirectoryPath(): string;
}
```

### Registro e Inyección: `UiFrameworkRegistry`

Un servicio central administra los frameworks de UI disponibles y registra el framework activo para la renderización actual.

```php
namespace LemurCms\PageBuilder\Domain\Service;

use LemurCms\PageBuilder\Domain\Contract\UiFrameworkModuleInterface;

final class UiFrameworkRegistry
{
    /** @var array<string, UiFrameworkModuleInterface> */
    private array $modules = [];
    private ?string $activeModuleIdentifier = null;

    public function register(UiFrameworkModuleInterface $module): void
    {
        $this->modules[$module->getIdentifier()] = $module;
    }

    public function setActive(string $identifier): void
    {
        if (!isset($this->modules[$identifier])) {
            throw new \InvalidArgumentException("UI Module '{$identifier}' is not registered.");
        }
        $this->activeModuleIdentifier = $identifier;
    }

    public function getActiveModule(): UiFrameworkModuleInterface
    {
        if ($this->activeModuleIdentifier === null) {
            // Cae a un valor por defecto o excepción
            throw new \RuntimeException("No active UI framework module configured.");
        }
        return $this->modules[$this->activeModuleIdentifier];
    }
}
```

---

## 4. Pipeline de Renderizado y Compilación (SSR)

El flujo de renderizado del sistema se divide en dos caminos independientes que satisfacen la agilidad en el desarrollo y el rendimiento en producción:

```
                  ┌───────────────────────────────┐
                  │      Virtual DOM (JSON)       │
                  └──────────────┬────────────────┘
                                 │
         ┌───────────────────────┴───────────────────────┐
         ▼ (En vivo / Preview)                           ▼ (Evento: Guardar/Publicar)
┌─────────────────────────────────┐             ┌─────────────────────────────────┐
│   Renderizador en Caliente      │             │    Compilador de SSR            │
│   (Hot Render Engine)           │             │    (Event-Driven Compiler)      │
│                                 │             │                                 │
│   - Toma VDOM en memoria        │             │   - Toma VDOM desde DB          │
│   - Traduce props abstractas    │             │   - Genera archivo PHP estático │
│   - Evalúa loops en el server   │             │     o Blade optimizado en disco │
│   - Retorna HTML listo          │             │   - Preserva dynamic loops nativo│
└─────────────────────────────────┘             └─────────────────────────────────┘
```

### 1. Previsualización en Caliente (Real-time Hot Preview)
Se ejecuta en cada petición de edición o preview sin persistir el archivo.
- Toma el árbol VDOM JSON enviado por el cliente o cargado de borrador.
- Invoca al framework UI activo desde el `UiFrameworkRegistry` para mapear tipos abstractos a sus respectivos templates.
- Resuelve variables y loops en caliente usando el contexto dinámico actual.

### 2. Compilación de Plantilla SSR (Event-Driven)
Al crear, actualizar o importar una página, el árbol de nodos pasa por la validación estructural del framework. Si es válido, se almacena en la base de datos.
Inmediatamente después, se dispara un **evento asíncrono** (`PageSaved` / `PagePublished`) que ejecuta el compilador del Page Builder:
- El compilador recorre el VDOM y genera una plantilla de código de servidor (ej. un archivo Blade de Laravel compilado, o código PHP directo) y lo almacena en caché en el sistema de archivos (ej. `storage/cms/compiled/pages/{page_slug}.php`).
- **Rendimiento Máximo**: Cuando un visitante final accede a la página, Lemur CMS sirve directamente el archivo compilado en disco, evitando el coste computacional de analizar el árbol JSON recursivamente y mapear propiedades en cada petición HTTP.

#### Ejemplo de compilación de bucles dinámicos a directivas SSR:
Un nodo `div[name=col]` con loop sobre `module:products` se compila a un archivo PHP/Blade en caché:

**VDOM (Source of Truth en DB):**
```json
{
  "type": "div",
  "name": "col",
  "props": { "class": "col-md-4" },
  "loop": { "source": "module:products", "variable": "product" },
  "children": [
    {
      "type": "div",
      "name": "card",
      "props": { "class": "card" },
      "children": [
        { "type": "h5", "name": null, "props": { "class": "card-title" }, "bindings": { "content": "product.name" } }
      ]
    }
  ]
}
```

**Código Compilado SSR (Resultado en Caché en disco):**
```php
<?php foreach ($loopResolver->resolve('module:products') as $product): ?>
  <div class="col-md-4">
    <div class="card">
      <h5 class="card-title"><?php echo htmlspecialchars($product['name']); ?></h5>
    </div>
  </div>
<?php endforeach; ?>
```

---

## 5. El Nuevo Flujo de Importación (HTML-to-VDOM)

El importador de HTML ya no generará nodos específicos de Bootstrap directamente en la base de datos de manera estática. En su lugar, el flujo de trabajo tiene los siguientes pasos:

### Paso 1: Lectura y Conversión en Memoria (Abstract VDOM)
El usuario carga un archivo HTML (o una URL) en el importador:
- El `HtmlImporter` ejecuta el pipeline tradicional.
- En la fase de aplicación de reglas de coincidencia, consulta al `UiFrameworkRegistry` para extraer las reglas del framework seleccionado (ej. `Bootstrap5Rules` o `MaterialUiRules`).
- Genera un árbol de nodos Virtual DOM **en memoria**, mapeando las clases del framework original a las `props` abstractas de los componentes del CMS.
- **Sin persistir en base de datos**: Este árbol de VDOM se envía a la interfaz en formato JSON plano para su inspección preliminar.

### Paso 2: Vista de Selección y Mapeo Dinámico
La interfaz muestra el HTML importado de manera interactiva. Al pasar el cursor por encima o hacer clic en la estructura, el desarrollador puede interactuar con el VDOM en memoria:
- El usuario selecciona un nodo raíz o un subárbol completo (ej. un banner, un listado de productos, un menú).
- Al seleccionarlo, se despliega la opción **"Convertir a Componente Reutilizable"**.
- El editor permite:
  - **Identificar variables**: Mapear un bloque de texto estático dentro del HTML a una variable dinámica (ej. reemplazar "Nuestro Banner" por `{{ banner_title }}`).
  - **Identificar bucles**: Seleccionar un elemento repetitivo (como una card) y asociarlo a un origen de datos dinámico (`{{ products }}`), definiendo qué elementos internos representan los campos (imagen, título, precio) de cada iteración del bucle.
  - **Definir Props**: Configurar las variables identificadas como propiedades configurables del nuevo componente en su esquema.

### Paso 3: Guardado Flexible
El usuario tiene dos opciones de almacenamiento:
- **Guardar como Página completa**: Almacena el árbol VDOM final en la tabla `pages`.
- **Guardar Componentes Reutilizables**: Almacena únicamente el subárbol seleccionado en la tabla `templates` o en una nueva tabla de componentes personalizados (`custom_components`), registrándolos en el catálogo para que puedan ser arrastrados y soltados en cualquier otra página.

---

## 6. Estructuras de Página: Simples vs Compuestas

Para agilizar el renderizado y optimizar el almacenamiento de datos, se clasifican los árboles de nodos de las páginas en dos tipos de estructuras:

### A. Estructuras Simples (Páginas Estáticas)
* **Definición**: Árboles VDOM que no contienen lógica de loops (`LoopConfig`), lógica de condicionales ni bindeos a orígenes de datos externos (`bindings` vacíos).
* **Casos de Uso**: Páginas "Quiénes somos", políticas de privacidad, contacto estático.
* **Optimización**: Se compilan directamente a HTML plano. Durante la ejecución en el backend, no se realiza ninguna consulta a bases de datos dinámicas ni resolución de loops, comportándose como una página estática HTML.

### B. Estructuras Compuestas (Páginas Dinámicas)
* **Definición**: Árboles de nodos complejos que involucran:
  - Bucles anidados vinculados a fuentes de datos (`loop: { source: "module:*" }`).
  - Lógica condicional (ej. renderizar un componente de alerta solo si el stock es bajo).
  - Componentes anidados complejos y variables inyectadas de manera contextual.
* **Casos de Uso**: Catálogos de productos, dashboards, portales de noticias dinámicos.
* **Optimización**: Compilación a archivos con lógica de control (PHP nativo o directivas Blade estructuradas). En tiempo de ejecución, el motor SSR evalúa la directiva cargando los repositorios adecuados de forma automática.

---

## 7. Mejoras al Sistema de Origen de Datos (Data Binding)

El sistema existente de loops (`LoopConfig`) se extiende para soportar un enlace de datos más robusto y genérico.

1. **Jerarquía en Interpolación**: Soporte para rutas de puntos complejas en expresiones como `{{ product.category.name }}`.
2. **Filtros de Interpolación (Pipes)**: Permitir modificadores de formato directamente en la variable para evitar lógica en el componente del frontend:
   - `{{ product.price | currency }}`
   - `{{ product.created_at | date("d-m-Y") }}`
   - `{{ product.description | truncate(100) }}`
3. **Filtros Dinámicos basados en Contexto**: Permitir que el selector de orígenes de datos de un loop filtre registros usando valores dinámicos tomados de la URL actual o parámetros de ruta (ej. `url:category_slug`).

---

## 8. Plan de Tareas de Implementación

Para llevar a cabo la refactorización sin interrumpir el funcionamiento actual del sistema, se propone el siguiente cronograma estructurado:

```
┌────────────────────────────────────────────────────────┐
│  FASE 1: Contratos e Infraestructura Agnóstica (VDOM)   │
│  - Definir UiFrameworkModuleInterface y Registry        │
│  - Refactorizar TreeValidator y TreeNormalizer          │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│  FASE 2: Creación del Módulo Bootstrap Instalable      │
│  - Extraer vistas y reglas actuales a BootstrapUiModule│
│  - Limpiar el core de clases de Bootstrap              │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│  FASE 3: Eventos y Caché de Compilación SSR            │
│  - Eventos de persistencia de página                   │
│  - Compilador de VDOM a plantillas compiladas en disco │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│  FASE 4: Flujo de Importación Interactivo y VDOM       │
│  - Pipeline de importación en memoria                  │
│  - Interfaz Svelte de selección y "Convert to Component"│
└────────────────────────────────────────────────────────┘
```

---

## 9. Actualización de la Especificación del Importador

> **Especificación actualizada en [html_importer.md](../04_page_builder/html_importer.md)**

Los cambios arquitectónicos agnósticos ya están reflejados en esa especificación. Los puntos clave son:

1. **Desacoplamiento del Catálogo de Reglas**:
   - `RuleRegistry` ya no se inicializa con un listado estático de reglas de Bootstrap en el constructor del `HtmlImporter`.
   - Se inyecta dinámicamente el listado de reglas devuelto por `UiFrameworkRegistry::getActiveModule()->getImportRules()`.
2. **Resultado de Conversión en Memoria**:
   - La API de `/api/import/html` retornará el árbol VDOM directamente al editor de Svelte **sin persistir**, permitiendo la fase de selección e identificación de variables antes de almacenar.
3. **Escenario C (Tailwind CSS)**:
   - El escenario planteado originalmente como "Tailwind CSS (v2)" ahora se integra de forma nativa a través de la implementación de `UiFrameworkModuleInterface` para Tailwind.
