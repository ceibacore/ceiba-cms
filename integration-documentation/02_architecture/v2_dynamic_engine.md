# 08. Plan de Implementación de Arquitectura Dinámica V2

> **Módulo:** `PageBuilder`  
> **Propósito:** Especificar el diseño y la secuencia de desarrollo para la integración de Layouts Envolventes (Templates con Slots), Motor de Consultas Declarativas (Query Engine) y Motor de Reglas de Acceso (Condition Engine).  
> **Estado:** Aprobado para implementación en Versión 2.

---

## 1. Visión General y Objetivos de la V2

Con la Versión 1 ya en producción y en fase de pruebas con clientes, la Versión 2 extiende el Virtual DOM agnóstico mediante tres capacidades avanzadas e independientes:

1. **Page Templates (Layouts con Slots)**: Permite que el árbol VDOM de una página se inyecte de manera flexible en uno o múltiples puntos (`slot`) de un template envolvente (ej. `t_articles` que define el `header`, `footer` y la estructura de grilla).
2. **Data Query Engine**: Permite configurar de forma visual y declarativa consultas de base de datos parametrizables (con filtros basados en la URL, paginación y ordenamiento) que se resuelven de forma segura antes del renderizado.
3. **Render Conditions (Guardias de Acceso)**: Evalúa un conjunto de reglas (autenticación, roles/permisos mediante Spatie, etc.) antes de procesar la petición, ejecutando desvíos o respuestas de fallback si alguna regla no se cumple.

---

## 2. Diagrama de Flujo del Pipeline V2 (Request Lifecycle)

Cada petición a una página dinámica construida en el CMS sigue estrictamente la siguiente secuencia lógica en el backend (PHP/Laravel):

```
              Petición HTTP (ej: GET /articulos?categoria=tech)
                                │
                                ▼
                       ┌─────────────────┐
                       │  PageResolver   │  Carga la página desde DB
                       └────────┬────────┘  (tree, template_id, query_config, conditions)
                                │
                                ▼
                       ┌─────────────────┐
                       │ ConditionEngine │  Evalúa condiciones de acceso.
                       └────────┬────────┘  ¿Falla alguna? ──► SÍ ──► Ejecuta Fallback (Redirect/Abort)
                                │
                                ▼ SÍ (Todas pasan)
                       ┌─────────────────┐
                       │   QueryEngine   │  1. Resuelve variables del Request (URL, Route, Auth)
                       └────────┬────────┘  2. Ejecuta queries seguras ──► Contexto de Datos
                                │
                                ▼
                       ┌─────────────────┐
                       │  BladeRenderer  │  1. Si tiene template, carga su VDOM JSON
                       │   (Compilador)  │  2. Asocia y reemplaza los nodos { type: "slot" }
                       └────────┬────────┘  3. Renderiza el árbol combinado inyectando el Contexto
                                │
                                ▼
                           HTML Final
```

---

## 3. Especificaciones del Esquema de Datos (Base de Datos)

Las migraciones de la V2 están diseñadas para no alterar destructivamente los datos de la V1.

### 3.1 Tabla `pages` (Columnas Adicionales)
Se agregan campos opcionales mediante una nueva migración:

```php
Schema::table('pages', function (Blueprint $table) {
    // Relación al template envolvente
    $table->uuid('template_id')->nullable()->after('status');
    
    // Configuración de consultas de datos necesarias para esta página
    $table->json('query_config')->nullable()->after('template_id');
    
    // Condiciones que se deben cumplir para visualizar la página
    $table->json('conditions')->nullable()->after('query_config');
    
    $table->foreign('template_id')->references('id')->on('page_templates')->nullOnDelete();
});
```

### 3.2 Nueva Tabla `page_templates`
Almacena los esquemas de layouts editables visualmente:

```php
Schema::create('page_templates', function (Blueprint $table) {
    $table->uuid('id')->primary();
    $table->string('name')->unique();        // ej. 't_article', 't_articles'
    $table->string('description')->nullable();
    $table->json('tree');                    // Árbol VDOM conteniendo uno o más nodos de tipo 'slot'
    $table->json('slots_definition');        // Definición de slots disponibles (ej. ['main', 'sidebar'])
    $table->string('thumbnail')->nullable();
    $table->timestamps();
});
```

---

## 4. Diseño de Componentes Técnicos

### 4.1 Page Templates y Slots (Sistema 1)
En la V2, una página ya no es necesariamente un árbol plano. Al elegir un template, el VDOM de la página puede distribuir sus nodos en diferentes slots.

**Estructura del Nodo Slot en el Template VDOM:**
```json
{
  "id": "slot-main-uuid",
  "type": "slot",
  "name": "slot",
  "props": {
    "name": "main",
    "label": "Contenido Principal"
  },
  "children": []
}
```

**Esquema de Contenido de la Página (VDOM Multipropósito):**
Si la página utiliza un template con slots, el campo `content` (árbol de nodos) de la página se estructura mapeando a los slots correspondientes:
```json
{
  "main": [
    { "type": "h1", "props": { "content": "Título del Artículo" } },
    { "type": "p", "props": { "content": "Cuerpo del artículo..." } }
  ],
  "sidebar": [
    { "type": "div", "name": "card", "props": { "title": "Enlaces Relacionados" } }
  ]
}
```
*Nota de Retrocompatibilidad:* Si la página no tiene `template_id` o el JSON de `content` es un array secuencial directo en lugar de un objeto asociativo de slots, el compilador trata todo el contenido como el slot por defecto (`main`).

---

### 4.2 Data Query Engine (Sistema 2)
El `QueryEngine` traduce definiciones JSON abstractas a consultas seguras de Eloquent en tiempo de ejecución.

**Esquema del Objeto `QueryConfig`:**
```json
{
  "id": "query_articles",
  "context_key": "articles",
  "model": "Article",
  "filters": [
    { "field": "status", "operator": "equals", "value": "published" },
    { "field": "category_id", "operator": "equals", "value": "{{ request.route.category_id }}" }
  ],
  "sort": [
    { "field": "published_at", "direction": "desc" }
  ],
  "paginate": {
    "enabled": true,
    "per_page": 12,
    "param": "page"
  },
  "with": ["author", "category"]
}
```

#### Reglas de Seguridad Críticas (Prevención de Inyección SQL y Acceso No Autorizado):
1. **Lista Blanca de Modelos**: Se crea una configuración de seguridad en Laravel (`config/pagebuilder.php`):
   ```php
   return [
       'allowed_query_models' => [
           'Article' => \LemurCms\Models\Article::class,
           'Product' => \LemurCms\Models\Product::class,
       ]
   ];
   ```
   Cualquier petición para consultar un modelo no registrado en este array será rechazada de inmediato.
2. **Sanitización de Filtros**: Los operadores sólo admiten campos que existan en la tabla física y los valores inyectados dinámicamente (`{{ request.query.X }}`) son sanitizados usando bindings parametrizados nativos de PDO (`PDO::prepare`), evitando la concatenación directa de strings.

---

### 4.3 Render Conditions (Sistema 3)
El `ConditionEngine` evalúa el acceso antes de renderizar la página o inyectar datos.

**Esquema de una Condición:**
```json
{
  "id": "cond_check_permission",
  "type": "permission",
  "operator": "has_permission",
  "params": {
    "permission": "articles.read"
  },
  "fallback": {
    "action": "redirect",
    "to": "/login",
    "with_return": true
  }
}
```

**Evaluación en Laravel:**
Se utiliza un mapa de resolvedores (`ConditionProviders`) que implementan un contrato de evaluación:
```php
interface ConditionProviderInterface {
    public function evaluate(array $params): bool;
}
```
* **AuthProvider**: `Auth::check()` / `Auth::guest()`
* **SpatiePermissionProvider**: `$user->hasPermissionTo($params['permission'])` / `$user->hasRole($params['role'])`
* **RequestProvider**: Compara headers, cookies o parámetros de entrada del request.

---

## 5. Plan de Tareas de Desarrollo

### Fase 1: Base de Datos y Modelos (Día 1-2)
* [ ] Crear migración para las nuevas columnas de la tabla `pages`.
* [ ] Crear migración y modelo para `PageTemplate` (`page_templates`).
* [ ] Actualizar la clase `Page` de Eloquent para incorporar relaciones y casts de JSON correspondientes.
* [ ] Escribir tests unitarios de persistencia para validar el guardado de esquemas híbridos y multi-slot.

### Fase 2: Motor de Condiciones (Condition Engine) (Día 3-4)
* [ ] Crear interfaz `ConditionProviderInterface` y clase base `ConditionEngine`.
* [ ] Implementar `AuthProvider` (validaciones de login).
* [ ] Implementar `PermissionProvider` integrado con Spatie Laravel Permission.
* [ ] Implementar middleware global del CMS `EvaluatePageConditions` que intercepta la petición del PageResolver y despacha las acciones de fallback (`redirect`, `abort`).
* [ ] Escribir pruebas unitarias completas para los resolvedores y fallbacks de condiciones.

### Fase 3: Motor de Consulta Seguro (Query Engine) (Día 5-7)
* [ ] Implementar `QueryEngine` y validador de seguridad `QuerySafetyValidator` contra la lista blanca.
* [ ] Implementar `ContextResolver` encargado de parsear expresiones dinámicas (ej: `{{ request.query.category }}`).
* [ ] Integrar el motor de paginación de Laravel de manera transparente dentro del engine.
* [ ] Inyectar el resultado de la consulta (`RenderContext`) en las variables globales que se le pasan al renderizador Blade.
* [ ] Escribir pruebas unitarias y de integración del engine, simulando llamadas maliciosas para verificar la robustez contra inyección SQL.

### Fase 4: Compilación SSR y Renderizado de Slots (Día 8-10)
* [ ] Extender `BladeRenderer` para que soporte de manera nativa la renderización recursiva de slots.
* [ ] Modificar el compilador asíncrono para que al guardar la página genere el layout combinado con el código PHP del loop estructurado del QueryEngine en el caché de disco.
* [ ] Validar con pruebas de regresión que las páginas creadas en la Versión 1 continúen renderizándose perfectamente en el servidor.
* [ ] Actualizar la documentación y preparar el catálogo de componentes en caliente.
