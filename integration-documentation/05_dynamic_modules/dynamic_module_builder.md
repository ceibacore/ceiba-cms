# Dynamic Module Builder — Plan de Desarrollo

Sistema para crear módulos de datos en tiempo de ejecución, con CRUD auto-generado, data binding en el Page Builder y gestión de permisos automática.

---

## Principios de diseño

- La tabla `modules` **no se modifica** — ya tiene todo lo necesario
- Los permisos se crean en la tabla `permissions` existente (patrón `{slug}.view`, `{slug}.create`, etc.)
- Al crear un módulo se asignan sus permisos al rol `admin` y al creador automáticamente
- Cada módulo dinámico genera su propia tabla física `cms_{slug}` en la BD
- Soporte integrado para **Soft Deletes** (`deleted_at`), para evitar pérdida accidental de datos
- Un único controlador genérico maneja el CRUD de todos los módulos
- La integración con el Page Builder usa el `LoopResolver` existente, soportando **filtros complejos** y **ordenamiento**.

---

## Arquitectura general

```
modules (tabla existente)
    ↓ 1:1
module_definitions          ← NEW: schema de campos del módulo
    ↓ genera
cms_{slug}                  ← NEW: tabla física por módulo (runtime)

modules.id
    ↓ FK existente
permissions (tabla existente)   ← 4 permisos auto-creados por módulo
    ↓
role_permissions (existente)    ← asignados a rol admin
    ↓
access_roles (existente)        ← creator también los recibe
```

---

## Tabla nueva: `module_definitions`

```sql
module_definitions
  id           CHAR(36)   PK
  module_id    CHAR(36)   FK → modules.id  UNIQUE (1:1)
  fields_schema JSON      NOT NULL         -- definición de campos
  icon         VARCHAR(50)  NULL           -- emoji o clase de icono
  created_at   DATETIME
  updated_at   DATETIME
```

`fields_schema` es un array JSON de objetos `ModuleField`:

```json
[
  { "name": "name",        "type": "text",     "label": "Nombre",      "required": true,  "rules": { "max": 200 } },
  { "name": "price",       "type": "decimal",  "label": "Precio",      "required": true  },
  { "name": "description", "type": "textarea", "label": "Descripción", "required": false },
  { "name": "image",       "type": "image",    "label": "Imagen",      "required": false },
  { "name": "is_featured", "type": "boolean",  "label": "Destacado",   "required": false, "default": false }
]
```

**Tipos de campo soportados:**

> **Nota:** El `type` en `fields_schema` indica el **tipo de dato del campo** (text, decimal, image…). No confundir con el `type` del nodo VDOM, que siempre es una etiqueta HTML real (`div`, `h1`, `img`…). Son dos contextos completamente distintos.

| `type`     | Input UI         | Columna DB             | Notas |
| ---------- | ---------------- | ---------------------- | ----- |
| `text`     | `<input>`        | `VARCHAR(200)`         | |
| `textarea` | `<textarea>`     | `TEXT`                 | |
| `richtext` | editor rich      | `LONGTEXT`             | |
| `number`   | `<input number>` | `INT`                  | |
| `decimal`  | `<input number>` | `DECIMAL(10,2)`        | |
| `boolean`  | toggle           | `TINYINT(1) DEFAULT 0` | |
| `date`     | datepicker       | `DATE`                 | |
| `datetime` | datetimepicker   | `DATETIME`             | |
| `select`   | `<select>`       | `VARCHAR(100)`         | Opciones definidas en `options` del schema |
| `image`    | media picker     | `VARCHAR(500) NULL`    | Guarda la URL/path provisto por el Media Picker |
| `relation` | autocomplete     | `CHAR(36) NULL`        | FK a otro módulo (se define el target en `relationTarget`) |

---

## Fases de desarrollo

---

## Fase 1 — Infraestructura del Module Builder

### Paso 1.1 — Migración `module_definitions`

**Archivo:** `lemur-cms/migrations/20260522000013_create_module_definitions_table.php`

Crea la tabla `module_definitions` con `module_id` (FK única a `modules`) y `fields_schema JSON`.

---

### Paso 1.2 — Value Object `ModuleField`

**Archivo:** `lemur-cms/src/DynamicModule/Domain/Entity/ModuleField.php`

```php
final class ModuleField
{
    public function __construct(
        public readonly string  $name,      // snake_case, nombre de columna
        public readonly string  $type,      // text | textarea | number | ...
        public readonly string  $label,     // etiqueta UI
        public readonly bool    $required,
        public readonly mixed   $default,
        public readonly array   $rules,     // ['max' => 200, 'min' => 0, ...]
        public readonly array   $options,   // para type=select: ['A','B']
        public readonly ?string $relationTarget = null, // para type=relation (slug del módulo target)
        public readonly bool    $isSearchable = true,   // si se incluye en búsquedas globales
    ) {}

    public static function fromArray(array $data): self { ... }
    public function toArray(): array { ... }
    public function toColumnDefinition(): string { ... } // "VARCHAR(200) NOT NULL"
}
```

---

### Paso 1.3 — Entity `ModuleDefinition`

**Archivo:** `lemur-cms/src/DynamicModule/Domain/Entity/ModuleDefinition.php`

```php
final class ModuleDefinition
{
    public function __construct(
        public readonly string  $id,
        public readonly string  $moduleId,
        public readonly string  $moduleName,
        public readonly string  $moduleSlug,
        public readonly array   $fields,     // ModuleField[]
        public readonly ?string $icon,
    ) {}

    public function tableName(): string
    {
        return 'cms_' . $this->moduleSlug;
    }

    public static function fromArray(array $data): self { ... }
}
```

---

### Paso 1.4 — `DynamicTableManager`

**Archivo:** `lemur-cms/src/DynamicModule/Infrastructure/DynamicTableManager.php`

Responsabilidad: crear, alterar y eliminar la tabla física del módulo, incluyendo borrado lógico (Soft Deletes).

```php
final class DynamicTableManager
{
    public function createTable(ModuleDefinition $def): void
    {
        // CREATE TABLE cms_{slug} (
        //   id CHAR(36) PRIMARY KEY,
        //   ...campos del schema...,
        //   created_at DATETIME,
        //   updated_at DATETIME,
        //   deleted_at DATETIME NULL -- Para Soft Deletes
        // )
    }

    public function addColumn(string $table, ModuleField $field): void { ... }
    public function dropColumn(string $table, string $fieldName): void { ... }
    public function renameColumn(string $table, string $oldName, string $newName): void { ... }
    public function dropTable(string $table): void { ... }
}
```

> **Nota de Seguridad en Alteraciones (Migrations Runtime):** 
> Los cambios de tipo de dato destructivos (ej. de `VARCHAR` a `INT`) o renombrados de columnas deben verificarse. Si la tabla ya contiene datos, el sistema debe requerir confirmación explícita o bloquear el cambio para evitar corrupción o pérdida de información.

---

### Paso 1.5 — `ModuleDefinitionRepository`

**Archivo:** `lemur-cms/src/DynamicModule/Infrastructure/LemurDbModuleDefinitionRepository.php`

CRUD estándar sobre `modules` + `module_definitions` (JOIN). Devuelve `ModuleDefinition`.

---

### Paso 1.6 — Use cases

**Directorio:** `lemur-cms/src/DynamicModule/Application/`

| Use case              | Responsabilidad                                                                                          |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| `CreateDynamicModule` | Inserta en `modules`, inserta en `module_definitions`, crea tabla física, crea permisos, asigna al admin |
| `UpdateDynamicModule` | Actualiza `module_definitions`, ejecuta ALTER TABLE si campos cambiaron                                  |
| `DeleteDynamicModule` | Elimina entradas, elimina tabla física, elimina permisos huérfanos                                       |
| `GetModuleDefinition` | Lee la definición completa con sus campos                                                                |
| `ListDynamicModules`  | Lista todos los módulos dinámicos con is_active                                                          |

---

### Paso 1.7 — Creación automática de permisos

Sigue exactamente el mismo patrón que `SystemPermissionsSeeder`. Al ejecutar `CreateDynamicModule`:

```text
1. INSERT INTO modules (name, slug, ...)
2. INSERT INTO module_definitions (module_id, fields_schema)
3. DynamicTableManager::createTable()
4. Para cada acción [view, create, update, delete]:
   INSERT INTO permissions (module_id, name, slug)
   slug pattern: "{slug}.view", "{slug}.create", etc.
5. Asignar todos esos permisos al rol 'admin':
   INSERT INTO role_permissions (role_id, permission_id)
   -- Si el creador NO es admin, también a su rol/access directamente
```

> **Regla:** si el creador ya tiene el rol `admin`, un solo INSERT en `role_permissions` es suficiente.
> Si es otro rol, además se insertan en `access_roles` para esa sesión.

---

## Fase 2 — CRUD genérico auto-generado

### Paso 2.1 — `GenericModuleRepository`

**Archivo:** `lemur-cms/src/DynamicModule/Infrastructure/GenericModuleRepository.php`

Maneja el CRUD de tablas dinámicas, incluyendo la resolución automática de **Foreign Keys (relaciones)** mediante `LEFT JOIN` a los módulos objetivo, y soporte para filtros avanzados (`LIKE`, `>`, `<`).

```php
final class GenericModuleRepository
{
    public function list(string $table, array $filters = [], array $sort = [], int $limit = 50, int $offset = 0): array
    public function findById(string $table, string $id): ?array
    public function create(string $table, array $data): string   // returns id
    public function update(string $table, string $id, array $data): void
    public function delete(string $table, string $id): void      // Ejecuta Soft Delete actualizando deleted_at
    public function forceDelete(string $table, string $id): void // Eliminación física
    public function count(string $table, array $filters = []): int
}
```

---

### Paso 2.2 — `DynamicModuleController` (Laravel)

**Archivo:** `lemur-server-dashboard/app/Http/Controllers/Admin/DynamicModuleController.php`

Un único controlador para todos los módulos dinámicos. Recibe `{module_slug}` como parámetro:

```text
GET    /manager/data/{slug}           → index  (listar registros)
GET    /manager/data/{slug}/create    → create (form vacío)
POST   /manager/data/{slug}           → store
GET    /manager/data/{slug}/{id}      → show
GET    /manager/data/{slug}/{id}/edit → edit   (form con datos)
PUT    /manager/data/{slug}/{id}      → update
DELETE /manager/data/{slug}/{id}      → destroy
```

Flujo interno:
1. Resuelve el `ModuleDefinition` por `slug`
2. Valida permisos: `{slug}.view` / `{slug}.create` / etc.
3. **Construye validación dinámica**: Traduce el array JSON de `rules` del schema a reglas nativas de validación de Laravel (ej. `['max' => 200, 'required' => true]` se convierte dinámicamente en `['field' => 'required|max:200']`). Resuelve validaciones de unicidad sobre la tabla `cms_{slug}`.
4. Delega CRUD a `GenericModuleRepository`
5. Pasa a Inertia: `definition` (schema) + `records` / `record`

---

### Paso 2.3 — Rutas dinámicas

**Archivo:** `lemur-server-dashboard/routes/web.php` — dentro del grupo `manager`:

```php
Route::prefix('data/{module_slug}')
    ->name('manager.data.')
    ->group(function () {
        Route::get('/',           [DynamicModuleController::class, 'index'])->name('index');
        Route::get('/create',     [DynamicModuleController::class, 'create'])->name('create');
        Route::post('/',          [DynamicModuleController::class, 'store'])->name('store');
        Route::get('/{id}',       [DynamicModuleController::class, 'show'])->name('show');
        Route::get('/{id}/edit',  [DynamicModuleController::class, 'edit'])->name('edit');
        Route::put('/{id}',       [DynamicModuleController::class, 'update'])->name('update');
        Route::delete('/{id}',    [DynamicModuleController::class, 'destroy'])->name('destroy');
    });
```

---

### Paso 2.4 — Svelte: `DynamicModuleIndex.svelte` y `DynamicModuleForm.svelte`

**Dos páginas Svelte únicas** — no hay una por módulo.

**`DynamicModuleIndex.svelte`** recibe:
```ts
{ definition: ModuleDefinition, records: any[], pagination: Pagination }
```
- Renderiza tabla dinámica con columnas según `definition.fields`
- Acciones: ver, editar, eliminar

**`DynamicModuleForm.svelte`** recibe:
```ts
{ definition: ModuleDefinition, record: any | null }
```
- Itera `definition.fields` y renderiza el input correcto por `field.type`
- Un switch: `text` → `<input>`, `textarea` → `<textarea>`, `boolean` → toggle, `image` → media picker, etc.

> **Nota para Relaciones:** Los campos de tipo `relation` invocarán un endpoint de autocompletado (`/manager/api/data/{relationTarget}/search`) para buscar dinámicamente registros foráneos.

---

### Paso 2.5 — Sidebar dinámico

**Archivo:** `lemur-server-dashboard/resources/js/stores/menustructure.svelte.ts`

El sidebar ya es estático. Se necesita que el backend envíe los módulos dinámicos activos en el `AppLayout` via Inertia shared data:

```php
// AppServiceProvider o HandleInertiaRequests
Inertia::share('dynamicModules', function () {
    return CmsBridge::useCase('listDynamicModules')->execute();
});
```

El sidebar itera `$page.props.dynamicModules` y añade los links bajo una sección **"Contenido dinámico"**.

---

## Fase 3 — Data Binding en el Page Builder

### Paso 3.1 — `DynamicModuleDataProvider`

**Archivo:** `lemur-cms/src/DynamicModule/Infrastructure/DynamicModuleDataProvider.php`

```php
final class DynamicModuleDataProvider implements DataProviderInterface
{
    public function __construct(
        private readonly GenericModuleRepository $repo,
        private readonly string $table,       // cms_{slug}
        private readonly array  $defaultFilters = [],
        private readonly array  $defaultSort = ['created_at' => 'desc']
    ) {}

    public function getData(array $options = []): iterable
    {
        $filters = array_merge($this->defaultFilters, $options['filters'] ?? []);
        $sort    = $options['sort'] ?? $this->defaultSort;
        $limit   = $options['limit']  ?? 50;
        $offset  = $options['offset'] ?? 0;
        
        return $this->repo->list($this->table, $filters, $sort, $limit, $offset);
    }
}
```

---

### Paso 3.2 — `ApiDataProvider`

**Archivo:** `lemur-cms/src/DynamicModule/Infrastructure/ApiDataProvider.php`

```php
final class ApiDataProvider implements DataProviderInterface
{
    public function __construct(
        private readonly string $url,
        private readonly string $dataKey = '',   // dot-path dentro del JSON
        private readonly int    $cacheTtl = 300  // segundos
    ) {}

    public function getData(array $options = []): iterable
    {
        // 1. Cache check (simple file/APCu)
        // 2. HTTP GET con timeout 5s (usando file_get_contents + stream_context)
        // 3. json_decode response
        // 4. Extraer $dataKey (ej: "data.products" → $response['data']['products'])
        // 5. Return array
    }
}
```

---

### Paso 3.3 — Registro automático en bootstrap

**Archivo:** `lemur-cms/bootstrap.php`

```php
// Registro automático de todos los módulos dinámicos activos
$dynamicModules = $db->query('module_definitions')
    ->join('modules', 'module_definitions.module_id', 'modules.id')
    ->where(['modules.is_active' => 1])
    ->get();

foreach ($dynamicModules as $mod) {
    $loopResolver->register(
        'module:' . $mod['slug'],
        new DynamicModuleDataProvider($genericRepo, 'cms_' . $mod['slug'])
    );
}
```

Con esto, en cualquier nodo del page builder funciona:

```json
{
  "id": "uuid-v4",
  "type": "div",
  "name": "col",
  "props": { "class": "col-md-4" },
  "bindings": null,
  "loop": {
    "source": "module:products",
    "variable": "item",
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

> **Esquema del nodo:** `type` = etiqueta HTML real (`div`, `section`, `h1`…). `name` = componente o patrón (`card`, `col`, `null` si genérico). Ver detalles completos en [vdom_architecture.md](../02_architecture/vdom_architecture.md).

---

### Paso 3.4 — UI en el Page Builder (selector de fuente)

En el panel de configuración del nodo en el editor visual, se añade una sección **"Datos dinámicos"**:

```text
┌────────────────────────────────────────────────┐
│  Datos dinámicos                               │
│  Fuente   [ module:products ▼ ]               │
│             ├ module:products                  │
│             ├ module:courses                   │
│             └ api: (URL personalizada)         │
│  Variable [ item            ]                  │
│  Límite   [ 6   ] Offset [ 0 ]                │
│  Orden    [ created_at DESC ▼ ]                │
│  Filtros  [ + agregar filtro avanzado ]        │
└────────────────────────────────────────────────┘
```

El dropdown se llena con `$page.props.dynamicModules` (compartido via Inertia).

---

### Paso 3.5 — Soporte de `filters` y `sort` en LoopConfig

**Archivo:** `lemur-cms/src/PageBuilder/Domain/Entity/LoopConfig.php`

Añadir campos `filters` y `sort`:

```php
public readonly array $filters = [],   // ej: ['is_featured' => true, 'price' => ['>', 100]]
public readonly array $sort = [],      // ej: ['created_at' => 'desc']
```

El `BladeRenderer` ya pasa `$options` al `LoopResolver::resolve()`, solo hay que incluirlos:

```php
$options['filters'] = $loop['filters'] ?? [];
$options['sort']    = $loop['sort'] ?? [];
```

> **Nota sobre el renderer:** Actualmente `BladeRenderer` actúa como el **Hot Render Engine** (previsualzación en tiempo real). Usa `$node['name']` para localizar la plantilla de vista del componente (ej. `views/card.php`) y cae a emitir el HTML directo si no encuentra vista. El SSR Compiler (compilación asíncrona a disco) es una fase futura descrita en `07_ui_agnostic_virtual_dom_architecture.md §4`.

---

## Resumen de archivos a crear

### lemur-cms

```
migrations/
  20260522000013_create_module_definitions_table.php

src/DynamicModule/
  Domain/
    Entity/
      ModuleField.php
      ModuleDefinition.php
    Repository/
      ModuleDefinitionRepositoryInterface.php
      GenericModuleRepositoryInterface.php
  Application/
    CreateDynamicModule.php
    UpdateDynamicModule.php
    DeleteDynamicModule.php
    GetModuleDefinition.php
    ListDynamicModules.php
  Infrastructure/
    DynamicTableManager.php
    LemurDbModuleDefinitionRepository.php
    GenericModuleRepository.php
    DynamicModuleDataProvider.php
    ApiDataProvider.php
```

**Modificaciones en lemur-cms:**
- `bootstrap.php` — registro automático de DataProviders
- `src/PageBuilder/Domain/Entity/LoopConfig.php` — añadir `filters` y `sort`
- `src/PageBuilder/Domain/Service/BladeRenderer.php` — pasar `filters` y `sort` a `LoopResolver`

### lemur-server-dashboard

```
app/Http/Controllers/Admin/
  DynamicModuleController.php    ← CRUD genérico
  ModuleBuilderController.php    ← gestión de definiciones

resources/js/pages/admin/cms/
  DynamicModuleIndex.svelte      ← lista de registros (genérica)
  DynamicModuleForm.svelte       ← form crear/editar (genérica)
  ModuleBuilder.svelte           ← UI definir módulos y campos
  ModuleBuilderEdit.svelte       ← editar definición
```

**Modificaciones en lemur-server-dashboard:**
- `routes/web.php` — rutas `/manager/data/{slug}` y `/manager/modules-builder`
- `app/Http/Middleware/HandleInertiaRequests.php` — compartir `dynamicModules`
- `resources/js/stores/menustructure.svelte.ts` — sección dinámica en sidebar

---

## Orden de implementación recomendado

```text
1. Migración module_definitions
2. ModuleField + ModuleDefinition entities
3. DynamicTableManager (incluyendo manejo seguro de ALTER TABLE)
4. ModuleDefinitionRepository
5. CreateDynamicModule (con permisos automáticos)
6. ModuleBuilderController + ModuleBuilder.svelte  ← primer UI visible
7. GenericModuleRepository (incluyendo JOINS automáticos)
8. DynamicModuleController + rutas (Traducción de rules nativas)
9. DynamicModuleIndex.svelte + DynamicModuleForm.svelte
10. Sidebar dinámico
11. DynamicModuleDataProvider + registro en bootstrap
12. ApiDataProvider
13. LoopConfig.filters y sort + BladeRenderer update
14. UI de data binding en Page Builder
```
