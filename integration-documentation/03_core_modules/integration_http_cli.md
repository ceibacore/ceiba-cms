# Prioridad Baja Phase 3 - Integración

## 1. Configuración Centralizada

**Ubicación:** `config/cms.php`

Retorna array de configuración con:
- Cache (driver, TTL, path)
- Menu (tipos, max depth, cache)
- Page (statuses, templates)
- Media (disks, mimes, max size)
- Auth (algoritmo, roles)
- SEO (robots, og types)
- Database (conexión)
- Pagination, Logging

**Uso:**
```php
$config = require __DIR__ . '/config/cms.php';
echo $config['cache']['ttl']; // 3600
```

---

## 2. Comandos CLI

**Base Class:** `bin/commands/Command.php`
- Métodos: info(), error(), warn(), line(), table()

### Comandos Implementados

**migrate** - Ejecutar migraciones
```bash
php bin/lemur migrate
```

**migrate:list** - Listar migraciones disponibles
```bash
php bin/lemur migrate:list
```

**cache:clear** - Limpiar cache de aplicación
```bash
php bin/lemur cache:clear
```

**user:create** - Crear usuario interactivo
```bash
php bin/lemur user:create
```

**Entrada:** `bin/lemur.php`

---

## 3. HTTP Layer - Routers y Controllers

### Router (`src/Http/Router.php`)

Enrutador simple con:
- Métodos: get(), post(), put(), patch(), delete()
- Matching de parámetros: `/items/{id}`
- Named routes: `router->url('item.show', ['id' => 5])`

**Uso:**
```php
$router = new Router();
$router->get('/users/{id}', fn($id) => /* ... */);
$router->dispatch('GET', '/users/42');
```

### Controllers

#### MenuController
- `show(slug)` - GET /api/menus/{slug}
- `store()` - POST /api/menus/items
- `update(id)` - PUT /api/menus/items/{id}
- `destroy(id)` - DELETE /api/menus/items/{id}

#### PageController
- `index()` - GET /api/pages
- `store()` - POST /api/pages
- `update(id)` - PUT /api/pages/{id}
- `destroy(id)` - DELETE /api/pages/{id}
- `publish(id)` - POST /api/pages/{id}/publish

#### CacheController
- `clear()` - POST /api/cache/clear
- `clearMenu(slug)` - POST /api/cache/menus/{slug}/clear

#### BaseController
Métodos base: json(), success(), error(), getRequest(), getQueryParam()

---

## 4. Rutas API

**Ubicación:** `routes/api.php`

### Menu Endpoints
```
GET    /api/menus/{slug}              - Renderizar navbar
POST   /api/menus/items               - Crear item
PUT    /api/menus/items/{id}          - Actualizar item
DELETE /api/menus/items/{id}          - Eliminar item
```

### Page Endpoints
```
GET    /api/pages?limit=20&offset=0   - Listar páginas
POST   /api/pages                     - Crear página
PUT    /api/pages/{id}                - Actualizar página
DELETE /api/pages/{id}                - Eliminar página
POST   /api/pages/{id}/publish        - Publicar página
```

### Cache Endpoints
```
POST   /api/cache/clear                         - Limpiar todo cache
POST   /api/cache/menus/{slug}/clear            - Limpiar menú específico
```

**Entry Point:** `public/api.php`

---

## 5. Database Factories

### Base Factory (`database/factories/Factory.php`)

Proporciona:
- Generador Faker básico
- Métodos: name(), email(), word(), words(), sentence(), paragraph(), slug(), url(), boolean(), randomElement()

### Factories Específicas

**MenuFactory** - Genera menús ficticios
```php
$factory = new MenuFactory();
$menus = $factory->make(5); // 5 menús
```

**PageFactory** - Genera páginas ficticias
```php
$factory = new PageFactory();
$pages = $factory->make(10);
```

**UserFactory** - Genera usuarios ficticios
```php
$factory = new UserFactory();
$users = $factory->make(3);
// password: 'Password123'
```

---

## 6. Tests (13 casos)

### RouterTest (6 tests)
- testRouterRegistersGetRoute
- testRouterRegistersPostRoute
- testRouterMatchesPathParameter
- testRouterReturns404ForNotFound
- testRouterRegistersNamedRoute
- testRouterMultipleRoutes

### FactoriesTest (7 tests)
- testMenuFactoryGeneratesSingleMenu
- testMenuFactoryGeneratesMultiple
- testMenuFactoryHasValidType
- testPageFactoryGeneratesSinglePage
- testPageFactoryHasValidStatus
- testUserFactoryGeneratesSingleUser
- testUserFactoryGeneratesUniqueEmails
- testUserFactoryHasHashedPassword
- testFactoriesGenerateArrayStructure

---

## 7. Integración Bootstrap

### bootstrap.php Actualizado

Nuevos requires:
```php
require_once __DIR__ . '/src/Http/Router.php';
require_once __DIR__ . '/src/Http/Controllers/BaseController.php';
require_once __DIR__ . '/src/Http/Controllers/MenuController.php';
require_once __DIR__ . '/src/Http/Controllers/PageController.php';
require_once __DIR__ . '/src/Http/Controllers/CacheController.php';

require_once __DIR__ . '/database/factories/Factory.php';
require_once __DIR__ . '/database/factories/MenuFactory.php';
require_once __DIR__ . '/database/factories/PageFactory.php';
require_once __DIR__ . '/database/factories/UserFactory.php';
```

Total requires: 83

---

## Uso Completo

### 1. API Request (cURL)

```bash
# Get menu
curl http://localhost/api/menus/main

# Create menu item
curl -X POST http://localhost/api/menus/items \
  -H "Content-Type: application/json" \
  -d '{
    "label": "About",
    "url": "/about",
    "type": "link"
  }'

# Clear cache
curl -X POST http://localhost/api/cache/clear
```

### 2. CLI Commands

```bash
# Migrar base de datos
php bin/lemur migrate

# Crear usuario
php bin/lemur user:create

# Limpiar cache
php bin/lemur cache:clear
```

### 3. Seeding (Programático)

```php
$pageFactory = new PageFactory();
$pages = $pageFactory->make(10);

foreach ($pages as $page) {
    $createPage->execute($page);
}
```

---

## Archivos Creados

### Configuration
- ✅ config/cms.php

### CLI
- ✅ bin/CliKernel.php
- ✅ bin/lemur.php
- ✅ bin/commands/Command.php
- ✅ bin/commands/MigrateCommand.php
- ✅ bin/commands/CacheClearCommand.php
- ✅ bin/commands/CreateUserCommand.php
- ✅ bin/commands/ListMigrationsCommand.php

### HTTP
- ✅ src/Http/Router.php
- ✅ src/Http/Controllers/BaseController.php
- ✅ src/Http/Controllers/MenuController.php
- ✅ src/Http/Controllers/PageController.php
- ✅ src/Http/Controllers/CacheController.php
- ✅ routes/api.php
- ✅ public/api.php

### Factories
- ✅ database/factories/Factory.php
- ✅ database/factories/MenuFactory.php
- ✅ database/factories/PageFactory.php
- ✅ database/factories/UserFactory.php

### Tests
- ✅ tests/Http/RouterTest.php
- ✅ tests/Database/FactoriesTest.php

**Total: 22+ archivos**

**Validación:** 0 errores ✅
