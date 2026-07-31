# Lemur CMS — Documento Maestro de Arquitectura Hexagonal

**Versión:** 1.0.0 · **Fecha:** 10 de mayo de 2026 · **Estado:** Referencia oficial del equipo

---

## Tabla de contenidos

1. [Visión general](#1-visión-general)
2. [Principio de Arquitectura Hexagonal](#2-principio-de-arquitectura-hexagonal)
3. [Mapa de módulos](#3-mapa-de-módulos)
4. [Módulo de Migración](#4-módulo-de-migración)
5. [Módulo de Menú](#5-módulo-de-menú)
6. [Módulo de Página](#6-módulo-de-página)
7. [Módulo de SEO](#7-módulo-de-seo)
8. [Módulo de Media](#8-módulo-de-media)
9. [Módulo de Auth](#9-módulo-de-auth)
10. [Reglas de extensibilidad](#10-reglas-de-extensibilidad)
11. [Integración en cualquier proyecto PHP](#11-integración-en-cualquier-proyecto-php)
12. [Convenciones de namespace](#12-convenciones-de-namespace)
13. [Módulo de PageBuilder y Arquitectura Dinámica V2](#13-módulo-de-pagebuilder-y-arquitectura-dinámica-v2)

---

## 1. Visión general

**Lemur CMS** es un módulo PHP 8.1+ de gestión de contenidos diseñado para ser completamente **agnóstico de framework**. No depende de Laravel, Symfony, CodeIgniter ni ningún otro framework. Puede instalarse en cualquier proyecto PHP limpio, en una aplicación legacy, o dentro de un framework existente sin colisiones.

### ¿Para qué sirve?

Lemur CMS proporciona las piezas de dominio esenciales que todo CMS necesita:

- Navegación y menús configurables (incluyendo mega-menú)
- Gestión de páginas con slugs
- SEO (meta tags, OpenGraph) por entidad
- Librería de medios (imágenes, documentos)
- Autenticación básica de usuarios

### ¿Por qué es agnóstico?

El agnóstico de framework no es una restricción técnica, es una decisión arquitectónica deliberada:

- **Portabilidad:** El mismo módulo se embebe en el servidor dashboard (Laravel/Livewire), en el client CLI, o en un proyecto PHP sin framework, sin modificar una línea de código del dominio.
- **Longevidad:** Los frameworks cambian de versión o quedan obsoletos. El dominio de negocio no cambia.
- **Testabilidad:** Las reglas de negocio pueden probarse sin levantar un framework completo.
- **Responsabilidad única:** Lemur CMS sabe de CMS, no de HTTP, no de contenedores de inyección de dependencias, no de colas de trabajo.

La única dependencia interna permitida es `LemurDB`, el wrapper PDO propio del ecosistema Lemur. No hay dependencias de Composer de terceros en producción.

---

## 2. Principio de Arquitectura Hexagonal

La arquitectura hexagonal (Ports & Adapters, Alistair Cockburn, 2005) organiza el código en tres zonas concéntricas con una regla de dependencia estricta: **las capas internas no conocen a las capas externas**.

```
┌─────────────────────────────────────────────────────────────┐
│                      INFRAESTRUCTURA                        │
│   (LemurDbMenuRepository, LemurDbPageRepository, etc.)      │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                   APLICACIÓN                        │  │
│   │  (GetMainNavbar, GetPageBySlug, AuthenticateUser…)  │  │
│   │                                                     │  │
│   │   ┌───────────────────────────────────────────┐    │  │
│   │   │               DOMINIO                     │    │  │
│   │   │  (MenuRepositoryInterface,                │    │  │
│   │   │   PageRepositoryInterface, …)             │    │  │
│   │   └───────────────────────────────────────────┘    │  │
│   └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Las tres capas en Lemur CMS

| Capa | Qué contiene | Qué NO puede importar |
|---|---|---|
| **Domain** | Interfaces de repositorio (puertos) | Nada de Application ni Infrastructure |
| **Application** | Casos de uso (`final class`) | Nada de Infrastructure |
| **Infrastructure** | Adaptadores concretos (`implements` el puerto) | Solo puede importar Domain |

### Puertos y Adaptadores en la práctica

Un **puerto** es una interfaz PHP declarada en `Domain/Repository/`. Define el contrato que el dominio necesita sin importar quién lo cumple.

Un **adaptador** es una clase en `Infrastructure/` que implementa ese puerto usando una tecnología concreta (`LemurDB`, un ORM externo, una API REST, un mock de tests, etc.).

La capa de **Aplicación** contiene los casos de uso. Un caso de uso recibe el puerto por constructor (inyección de dependencias manual) y orquesta llamadas al dominio. Nunca instancia repositorios concretos.

```
Puerto (interfaz)          Adaptador (implementación)
─────────────────          ──────────────────────────
MenuRepositoryInterface ←── LemurDbMenuRepository
                        ←── ArrayMenuRepository (tests)
                        ←── RedisMenuRepository (caché)
```

El código de aplicación siempre habla con el puerto. El bootstrap del proyecto decide qué adaptador inyectar.

---

## 3. Mapa de módulos

| Módulo | Responsabilidad | Puerto (interfaz) | Adaptador incluido | Casos de uso |
|---|---|---|---|---|
| **Migration** | Generación de DDL SQL | — | `CmsMigrationGenerator` | — |
| **Menu** | Árbol de navegación, banners, logo | `MenuRepositoryInterface` | `LemurDbMenuRepository` | `GetMainNavbar` |
| **Page** | Páginas con slug, publicación | `PageRepositoryInterface` | `LemurDbPageRepository` | `GetPageBySlug` |
| **Seo** | Meta tags por entidad | `SeoRepositoryInterface` | `LemurDbSeoRepository` | `GetSeoForEntity` |
| **Media** | Archivos, imágenes, almacenamiento | `MediaRepositoryInterface` | `LemurDbMediaRepository` | `StoreMedia` |
| **Auth** | Autenticación de usuarios | `UserRepositoryInterface` | `LemurDbUserRepository` | `AuthenticateUser` |

---

## 4. Módulo de Migración

### Principio fundamental: Lemur CMS **nunca** toca la base de datos

El módulo de migración **no abre conexiones**, **no ejecuta DDL**, **no modifica esquemas**. Es un generador de scripts SQL para revisión humana.

Esta decisión es intencional:

- En entornos multi-tenant o SaaS, aplicar migraciones automáticas en la primera petición HTTP es un antipatrón.
- Los DBAs necesitan revisar el SQL antes de ejecutarlo en producción.
- Las pruebas unitarias del motor de migración no requieren una base de datos real.

### Clases del módulo

```
src/Migration/
├── CmsBaseMigration.php         ← Clase base abstracta para cada migración
├── CmsSchemaBuilder.php         ← Acumula SQL en memoria (nunca lo ejecuta)
├── CmsMigrationGenerator.php    ← Orquesta la generación y escribe el .sql
├── CmsColumnBlueprint.php       ← Fluent API para definir columnas
├── CmsColumnDef.php             ← Value object de una definición de columna
├── GeneratorResult.php          ← Resultado inmutable de la generación
└── Dialect/
    ├── CmsDialectInterface.php  ← Puerto de dialecto SQL
    ├── MySQLDialect.php         ← Adaptador MySQL/MariaDB
    └── PostgreSQLDialect.php    ← Adaptador PostgreSQL
```

### Cómo fluye una migración

```
migrations/20260510000001_create_menu_tables.php
        │
        ▼
CmsMigrationGenerator::generate()
  └─ instancia CmsSchemaBuilder (en memoria)
  └─ instancia la clase de migración, le pasa el builder
  └─ llama a $migration->up()
        │
        ▼
CmsSchemaBuilder::createTable(...)
  └─ CmsColumnBlueprint define columnas
  └─ Dialect renderiza el SQL
  └─ SQL se acumula en $sqlLog[]   ← NUNCA se ejecuta
        │
        ▼
GeneratorResult
  └─ toSqlString()       → string completo
  └─ writeFile($path)    → escribe schema.sql en disco
```

### Cómo escribir una migración

```php
<?php
declare(strict_types=1);
namespace LemurCms\Migrations;

use LemurCms\Migration\CmsBaseMigration;
use LemurCms\Migration\CmsColumnBlueprint;

class Migration_20260510000099_create_comments_table extends CmsBaseMigration
{
    public const VERSION     = '20260510000099';
    public const DESCRIPTION = 'Create comments table';

    public function up(): void
    {
        $this->schema->createTable('cms_comments', function (CmsColumnBlueprint $t) {
            $t->id();
            $t->unsignedInteger('page_id')->notNull();
            $t->string('author', 100)->notNull();
            $t->text('body')->notNull();
            $t->tinyInteger('status')->notNull()->default(0);
            $t->timestamps();
            $t->foreignKey('page_id', 'cms_pages', 'id', 'CASCADE');
        });
    }

    public function down(): void
    {
        $this->schema->dropTableIfExists('cms_comments');
    }
}
```

### Cómo generar el SQL

```php
$gen    = new CmsMigrationGenerator(__DIR__ . '/migrations', prefix: 'lmr_');
$result = $gen->generate(__DIR__ . '/storage/schema.sql');

if (!$result->success) {
    foreach ($result->errors as $err) {
        echo "Error en {$err['version']}: {$err['message']}\n";
    }
}

echo $result->toSqlString(); // imprime el DDL completo
```

El archivo `storage/schema.sql` resultante se entrega al DBA o se ejecuta manualmente.

### Dialectos soportados

| Dialecto | Clase | Driver PDO |
|---|---|---|
| MySQL / MariaDB | `MySQLDialect` | `mysql` |
| PostgreSQL | `PostgreSQLDialect` | `pgsql` |

Para agregar un dialecto nuevo, implementar `CmsDialectInterface` e inyectarlo en el constructor de `CmsMigrationGenerator`.

---

## 5. Módulo de Menú

### Responsabilidad

Gestiona la estructura de navegación del sitio: menús jerárquicos, mega-menús, banners posicionados y el logo corporativo. El módulo expone únicamente datos; el renderizado HTML es responsabilidad de la capa de presentación del proyecto consumidor.

### Flujo hexagonal

```
[Controlador HTTP / Template Engine]
        │
        │  new GetMainNavbar($repo)
        │  ->execute('/ruta/actual')
        ▼
┌──────────────────────────────────┐
│  Application: GetMainNavbar      │  ← Caso de uso
│  - recibe MenuRepositoryInterface│
│  - retorna array estructurado    │
└──────────────────────────────────┘
        │
        │  $this->repo->getMenuTree('main')
        │  $this->repo->getActiveLogo()
        │  $this->repo->getActiveBanners('above')
        │  $this->repo->getActiveBanners('below')
        ▼
┌──────────────────────────────────┐
│  Domain: MenuRepositoryInterface │  ← Puerto
│  + getMenuTree(string $slug)     │
│  + getActiveBanners(string $pos) │
│  + getActiveLogo()               │
│  + getMegaMenuData(int $itemId)  │
└──────────────────────────────────┘
        ▲
        │  implements
┌──────────────────────────────────┐
│  Infrastructure:                 │
│  LemurDbMenuRepository           │  ← Adaptador
│  - usa LemurDB ($db->query(...)) │
└──────────────────────────────────┘
```

### Puerto

```php
// src/Menu/Domain/Repository/MenuRepositoryInterface.php
interface MenuRepositoryInterface
{
    public function getMenuTree(string $slug): array;
    public function getActiveBanners(string $position): array;
    public function getActiveLogo(): ?array;
    public function getMegaMenuData(int $itemId): array;
}
```

### Caso de uso

```php
// src/Menu/Application/GetMainNavbar.php
final class GetMainNavbar
{
    public function __construct(private readonly MenuRepositoryInterface $repo) {}

    public function execute(string $currentUrl): array
    {
        return [
            'menu'    => $this->repo->getMenuTree('main'),
            'logo'    => $this->repo->getActiveLogo(),
            'above'   => $this->repo->getActiveBanners('above'),
            'below'   => $this->repo->getActiveBanners('below'),
            'current' => $currentUrl,
        ];
    }
}
```

### Tablas de base de datos generadas

`cms_menus` · `cms_menu_items` · `cms_logos` · `cms_banners`

---

## 6. Módulo de Página

### Responsabilidad

Gestiona las páginas de contenido estático del CMS: creación, publicación, búsqueda por slug y paginación.

### Flujo hexagonal

```
[Controlador HTTP]
        │
        │  new GetPageBySlug($repo)->execute('sobre-nosotros')
        ▼
┌──────────────────────────────────┐
│  Application: GetPageBySlug      │
│  - recibe PageRepositoryInterface│
│  - retorna ?array                │
└──────────────────────────────────┘
        │
        │  $this->repo->findBySlug($slug)
        ▼
┌──────────────────────────────────┐
│  Domain: PageRepositoryInterface │
│  + findBySlug(string $slug)      │
│  + findPublished(int $l, int $o) │
│  + save(array $data): int        │
│  + delete(int $id): void         │
└──────────────────────────────────┘
        ▲
        │
┌──────────────────────────────────┐
│  Infrastructure:                 │
│  LemurDbPageRepository           │
└──────────────────────────────────┘
```

### Puerto

```php
// src/Page/Domain/Repository/PageRepositoryInterface.php
interface PageRepositoryInterface
{
    public function findBySlug(string $slug): ?array;
    public function findPublished(int $limit, int $offset): array;
    public function save(array $data): int;
    public function delete(int $id): void;
}
```

### Caso de uso

```php
// src/Page/Application/GetPageBySlug.php
final class GetPageBySlug
{
    public function __construct(private readonly PageRepositoryInterface $repo) {}

    public function execute(string $slug): ?array
    {
        return $this->repo->findBySlug($slug);
    }
}
```

### Tablas de base de datos generadas

`cms_pages`

---

## 7. Módulo de SEO

### Responsabilidad

Gestiona los metadatos SEO (título, descripción, canonical, Open Graph, robots) asociados a cualquier entidad del sistema. El modelo es polimórfico: `entity_type` + `entity_id` identifican la entidad de forma única.

### Flujo hexagonal

```
[Renderizador de <head>]
        │
        │  new GetSeoForEntity($repo)->execute('page', $pageId)
        ▼
┌──────────────────────────────────┐
│  Application: GetSeoForEntity    │
│  - recibe SeoRepositoryInterface │
│  - retorna ?array con meta tags  │
└──────────────────────────────────┘
        │
        │  $this->repo->findByEntity($entityType, $entityId)
        ▼
┌──────────────────────────────────┐
│  Domain: SeoRepositoryInterface  │
│  + findByEntity(string, int)     │
│  + upsert(string, int, array)    │
└──────────────────────────────────┘
        ▲
        │
┌──────────────────────────────────┐
│  Infrastructure:                 │
│  LemurDbSeoRepository            │
└──────────────────────────────────┘
```

### Puerto

```php
// src/Seo/Domain/Repository/SeoRepositoryInterface.php
interface SeoRepositoryInterface
{
    public function findByEntity(string $entityType, int $entityId): ?array;
    public function upsert(string $entityType, int $entityId, array $data): void;
}
```

### Caso de uso

```php
// src/Seo/Application/GetSeoForEntity.php
final class GetSeoForEntity
{
    public function __construct(private readonly SeoRepositoryInterface $repo) {}

    public function execute(string $entityType, int $entityId): ?array
    {
        return $this->repo->findByEntity($entityType, $entityId);
    }
}
```

### Tablas de base de datos generadas

`cms_seo`

---

## 8. Módulo de Media

### Responsabilidad

Gestiona el almacenamiento de referencias a archivos multimedia (imágenes, vídeos, documentos). **Lemur CMS no mueve archivos físicos**; eso es responsabilidad del adaptador de infraestructura o del proyecto consumidor. El módulo solo almacena y recupera metadatos: ruta, tipo MIME, tamaño, nombre original.

### Flujo hexagonal

```
[Controlador de subida de archivos]
        │
        │  new StoreMedia($repo)->execute($data)
        ▼
┌──────────────────────────────────┐
│  Application: StoreMedia         │
│  - recibe MediaRepositoryInterface│
│  - retorna int (nuevo ID)        │
└──────────────────────────────────┘
        │
        │  $this->repo->store($data)
        ▼
┌──────────────────────────────────┐
│  Domain: MediaRepositoryInterface│
│  + findById(int $id): ?array     │
│  + store(array $data): int       │
│  + delete(int $id): void         │
│  + findAll(int $l, int $o): array│
└──────────────────────────────────┘
        ▲
        │
┌──────────────────────────────────┐
│  Infrastructure:                 │
│  LemurDbMediaRepository          │
└──────────────────────────────────┘
```

### Puerto

```php
// src/Media/Domain/Repository/MediaRepositoryInterface.php
interface MediaRepositoryInterface
{
    public function findById(int $id): ?array;
    public function store(array $data): int;
    public function delete(int $id): void;
    public function findAll(int $limit, int $offset): array;
}
```

### Caso de uso

```php
// src/Media/Application/StoreMedia.php
final class StoreMedia
{
    public function __construct(private readonly MediaRepositoryInterface $repo) {}

    public function execute(array $data): int
    {
        return $this->repo->store($data);
    }
}
```

### Tablas de base de datos generadas

`cms_media`

---

## 9. Módulo de Auth

### Responsabilidad

Autenticación de usuarios del back-office del CMS. Verifica credenciales usando `password_verify()` (bcrypt). No emite tokens, no gestiona sesiones; eso pertenece a la capa de infraestructura del proyecto consumidor.

### Flujo hexagonal

```
[Controlador de login]
        │
        │  new AuthenticateUser($repo)->execute($email, $password)
        ▼
┌──────────────────────────────────┐
│  Application: AuthenticateUser   │
│  - recibe UserRepositoryInterface│
│  - verifica con password_verify()│
│  - retorna ?array (usuario) o null│
└──────────────────────────────────┘
        │
        │  $this->repo->findByEmail($email)
        ▼
┌──────────────────────────────────┐
│  Domain: UserRepositoryInterface │
│  + findByEmail(string): ?array   │
│  + findById(int): ?array         │
│  + save(array): int              │
│  + getUserPermissions(int): array│
└──────────────────────────────────┘
        ▲
        │
┌──────────────────────────────────┐
│  Infrastructure:                 │
│  LemurDbUserRepository           │
└──────────────────────────────────┘
```

### Puerto

```php
// src/Auth/Domain/Repository/UserRepositoryInterface.php
interface UserRepositoryInterface
{
    public function findByEmail(string $email): ?array;
    public function findById(int $id): ?array;
    public function save(array $data): int;
    public function getUserPermissions(int $userId): array;
}
```

### Caso de uso

```php
// src/Auth/Application/AuthenticateUser.php
final class AuthenticateUser
{
    public function __construct(private readonly UserRepositoryInterface $repo) {}

    public function execute(string $email, string $password): ?array
    {
        $user = $this->repo->findByEmail($email);
        if ($user === null) return null;
        return password_verify($password, $user['password_hash']) ? $user : null;
    }
}
```

### Nota de seguridad

El campo `password_hash` en la base de datos **debe** almacenarse como `password_hash($raw, PASSWORD_BCRYPT)`. Nunca se almacena la contraseña en texto plano. El módulo no tiene opinión sobre la gestión de sesiones; el token de sesión o JWT lo emite el proyecto consumidor tras recibir un usuario válido.

### Tablas de base de datos generadas

`cms_users` · `cms_roles` · `cms_permissions` · `cms_user_roles` · `cms_role_permissions`

---

## 10. Reglas de extensibilidad

### Cómo agregar un nuevo módulo

Supongamos que necesitamos un módulo `Comment`.

**Paso 1 — Declarar el puerto en Domain**

```php
// src/Comment/Domain/Repository/CommentRepositoryInterface.php
namespace LemurCms\Comment\Domain\Repository;

interface CommentRepositoryInterface
{
    public function findByPage(int $pageId): array;
    public function save(array $data): int;
    public function delete(int $id): void;
}
```

**Paso 2 — Escribir el caso de uso en Application**

```php
// src/Comment/Application/GetCommentsByPage.php
namespace LemurCms\Comment\Application;

use LemurCms\Comment\Domain\Repository\CommentRepositoryInterface;

final class GetCommentsByPage
{
    public function __construct(private readonly CommentRepositoryInterface $repo) {}

    public function execute(int $pageId): array
    {
        return $this->repo->findByPage($pageId);
    }
}
```

**Paso 3 — Implementar el adaptador en Infrastructure**

```php
// src/Comment/Infrastructure/LemurDbCommentRepository.php
namespace LemurCms\Comment\Infrastructure;

use LemurCms\Comment\Domain\Repository\CommentRepositoryInterface;
use LemurDB;

final class LemurDbCommentRepository implements CommentRepositoryInterface
{
    public function __construct(private readonly LemurDB $db) {}

    public function findByPage(int $pageId): array
    {
        return $this->db->query('cms_comments')
            ->where('page_id', $pageId)
            ->where('status', 1)
            ->orderBy('created_at', 'DESC')
            ->get();
    }

    // ... implementar save() y delete()
}
```

**Paso 4 — Escribir la migración**

```php
// migrations/20260510000099_create_comments_table.php
class Migration_20260510000099_create_comments_table extends CmsBaseMigration
{
    public const VERSION     = '20260510000099';
    public const DESCRIPTION = 'Create comments table';

    public function up(): void
    {
        $this->schema->createTable('cms_comments', function (CmsColumnBlueprint $t) {
            $t->id();
            $t->unsignedInteger('page_id')->notNull();
            $t->string('author', 100)->notNull();
            $t->text('body')->notNull();
            $t->tinyInteger('status')->notNull()->default(0);
            $t->timestamps();
        });
    }

    public function down(): void
    {
        $this->schema->dropTableIfExists('cms_comments');
    }
}
```

**Paso 5 — Inyectar en el bootstrap del proyecto**

```php
$commentRepo = new LemurDbCommentRepository($db);
$getComments = new GetCommentsByPage($commentRepo);
```

### Checklist de un módulo correcto

- [ ] La interfaz vive en `src/{Modulo}/Domain/Repository/`
- [ ] El caso de uso vive en `src/{Modulo}/Application/` y es `final class`
- [ ] El adaptador vive en `src/{Modulo}/Infrastructure/` e implementa la interfaz
- [ ] El caso de uso recibe solo interfaces, nunca clases concretas
- [ ] La migración vive en `migrations/` y extiende `CmsBaseMigration`
- [ ] Ninguna clase del módulo hace `new LemurDB()` directamente; el `$db` se inyecta

---

## 11. Integración en cualquier proyecto PHP

### Requisitos

- PHP 8.1+
- Composer (autoload PSR-4)
- Acceso a una base de datos compatible (MySQL, MariaDB o PostgreSQL)

### Bootstrap completo en 12 líneas

```php
<?php
// bootstrap/cms.php

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../lemur-cms/lemurdb/lemurdb.php';

// 1. Crear la conexión LemurDB
$db = LemurDB::getInstance([
    'driver'   => 'mysql',
    'host'     => 'localhost',
    'port'     => 3306,
    'db'       => 'mi_base_de_datos',
    'username' => 'usuario',
    'password' => 'contraseña',
    'prefix'   => 'lmr_',
]);

// 2. Instanciar los repositorios (adaptadores concretos)
$menuRepo  = new \LemurCms\Menu\Infrastructure\LemurDbMenuRepository($db);
$pageRepo  = new \LemurCms\Page\Infrastructure\LemurDbPageRepository($db);
$seoRepo   = new \LemurCms\Seo\Infrastructure\LemurDbSeoRepository($db);
$mediaRepo = new \LemurCms\Media\Infrastructure\LemurDbMediaRepository($db);
$userRepo  = new \LemurCms\Auth\Infrastructure\LemurDbUserRepository($db);

// 3. Instanciar los casos de uso (Application layer)
$getNavbar   = new \LemurCms\Menu\Application\GetMainNavbar($menuRepo);
$getPage     = new \LemurCms\Page\Application\GetPageBySlug($pageRepo);
$getSeo      = new \LemurCms\Seo\Application\GetSeoForEntity($seoRepo);
$storeMedia  = new \LemurCms\Media\Application\StoreMedia($mediaRepo);
$authenticate = new \LemurCms\Auth\Application\AuthenticateUser($userRepo);
```

### Uso en un controlador

```php
// En cualquier controlador o template

$navbar = $getNavbar->execute($_SERVER['REQUEST_URI']);
$page   = $getPage->execute('sobre-nosotros');
$seo    = $getSeo->execute('page', $page['id']);

// Login
$user = $authenticate->execute('admin@example.com', $_POST['password'] ?? '');
if ($user === null) {
    // credenciales incorrectas
}
```

### Generación del schema SQL antes del primer deploy

```php
// scripts/generate_schema.php
require_once __DIR__ . '/../vendor/autoload.php';

use LemurCms\Migration\CmsMigrationGenerator;
use LemurCms\Migration\Dialect\MySQLDialect;

$gen    = new CmsMigrationGenerator(
    __DIR__ . '/../lemur-cms/migrations',
    prefix:  'lmr_',
    dialect: new MySQLDialect(),
);
$result = $gen->generate(__DIR__ . '/../storage/schema.sql');

echo $result->toSqlString();
// → Entregar schema.sql al DBA para revisión y ejecución manual
```

### Uso con un contenedor de inyección de dependencias externo

Si el proyecto usa PHP-DI, Pimple, o el contenedor de Laravel, simplemente registrar los adaptadores como implementaciones de los puertos:

```php
// Ejemplo con PHP-DI
$container->bind(
    \LemurCms\Menu\Domain\Repository\MenuRepositoryInterface::class,
    \LemurCms\Menu\Infrastructure\LemurDbMenuRepository::class,
);
```

Lemur CMS no impone ningún contenedor. El bootstrap manual es suficiente para proyectos simples.

---

## 12. Convenciones de namespace

### Patrón general

```
LemurCms\{Modulo}\{Capa}\{Clase}
```

| Segmento | Valores válidos | Ejemplo |
|---|---|---|
| `{Modulo}` | `Menu` `Page` `Seo` `Media` `Auth` `Migration` | `Menu` |
| `{Capa}` | `Domain\Repository` `Application` `Infrastructure` | `Application` |
| `{Clase}` | PascalCase, singular | `GetMainNavbar` |

### Ejemplos completos

```
LemurCms\Menu\Domain\Repository\MenuRepositoryInterface   ← Puerto
LemurCms\Menu\Application\GetMainNavbar                   ← Caso de uso
LemurCms\Menu\Infrastructure\LemurDbMenuRepository        ← Adaptador LemurDB

LemurCms\Page\Domain\Repository\PageRepositoryInterface
LemurCms\Page\Application\GetPageBySlug
LemurCms\Page\Infrastructure\LemurDbPageRepository

LemurCms\Seo\Domain\Repository\SeoRepositoryInterface
LemurCms\Seo\Application\GetSeoForEntity
LemurCms\Seo\Infrastructure\LemurDbSeoRepository

LemurCms\Media\Domain\Repository\MediaRepositoryInterface
LemurCms\Media\Application\StoreMedia
LemurCms\Media\Infrastructure\LemurDbMediaRepository

LemurCms\Auth\Domain\Repository\UserRepositoryInterface
LemurCms\Auth\Application\AuthenticateUser
LemurCms\Auth\Infrastructure\LemurDbUserRepository

LemurCms\Migration\CmsBaseMigration
LemurCms\Migration\CmsSchemaBuilder
LemurCms\Migration\CmsMigrationGenerator
LemurCms\Migration\Dialect\CmsDialectInterface
LemurCms\Migration\Dialect\MySQLDialect
LemurCms\Migration\Dialect\PostgreSQLDialect
```

### Autoload en composer.json

```json
{
    "autoload": {
        "psr-4": {
            "LemurCms\\": "src/",
            "LemurCms\\Migrations\\": "migrations/"
        }
    }
}
```

### Convenciones de nomenclatura por capa

| Capa | Sufijo obligatorio | Patrón de nombre | Modificador |
|---|---|---|---|
| Domain / Interfaz de repositorio | `Interface` | `{Entidad}RepositoryInterface` | `interface` |
| Application / Caso de uso | ninguno | verbo + sustantivo: `GetPageBySlug`, `AuthenticateUser` | `final class` |
| Infrastructure / Adaptador | nombre del driver | `LemurDb{Entidad}Repository` | `final class implements …` |
| Migration | ninguno | `Migration_{VERSION}_{descripcion}` | `class extends CmsBaseMigration` |

## 13. Módulo de PageBuilder y Arquitectura Dinámica V2

### Responsabilidad

Gestiona la composición visual de las páginas mediante un **Virtual DOM (VDOM) agnóstico de framework de UI**, resolviendo en caliente o compilando a disco páginas con layouts y slots (`PageTemplate`), consultas a base de datos declarativas y seguras (`QueryEngine`), y guardias de condiciones de acceso (`ConditionEngine`).

### Flujo de Ejecución V2 (Petición HTTP)

Cuando se solicita una página dinâmica con la arquitectura V2, el pipeline sigue la siguiente secuencia ordenada:

1. **Page Resolution**: Se recupera la página y su configuración (content, template_id, query_config, conditions).
2. **Access Guards**: El `ConditionEngine` evalúa las reglas. Si alguna falla, se aborta o redirige inmediatamente al fallback configurado.
3. **Data Fetching**: El `QueryEngine` ejecuta consultas PDO parametrizadas de forma segura y devuelve el contexto de datos.
4. **VDOM Merging**: Se obtienen los nodos del layout (`PageTemplate`), se localizan los nodos de tipo `slot` y se inyecta el VDOM de la página en ellos.
5. **Compilation / Rendering**: El `BladeRenderer` compila y renderiza el árbol completo inyectando las variables de contexto resultantes.

```
       Petición HTTP (GET /articulos?categoria=tech)
                            │
                            ▼
                  ┌─────────────────┐
                  │  PageResolver   │
                  └────────┬────────┘
                            │
                            ▼
                  ┌─────────────────┐
                  │ ConditionEngine │  ──► ¿Falla? ──► Fallback (Redirect/Abort)
                  └────────┬────────┘
                            │
                            ▼ (Pasa)
                  ┌─────────────────┐
                  │   QueryEngine   │  ──► Inyecta variables del Contexto
                  └────────┬────────┘
                            │
                            ▼
                  ┌─────────────────┐
                  │  BladeRenderer  │  ──► Combina layout y renderiza VDOM a HTML
                  └────────┬────────┘
                            │
                            ▼
                        HTML Final
```

### Componentes de Dominio y Servicios V2

* **Node (Entidad)**: Representación de un nodo de árbol HTML. Su propiedad `type` define la etiqueta HTML (ej. `div`, `p`), `name` define el componente (ej. `card`), `props` contiene los atributos HTML, `bindings` mapea atributos a variables dinámicas, y `loop` parametriza bucles de datos.
* **ContextResolver**: Resuelve y mapea paths dinámicos en strings como `{{ request.query.category }}` o `{{ auth.user.email }}` a partir del estado de la petición y sesión actual.
* **QueryEngine**: Construye consultas SQL a través de un mapeo estricto de modelos autorizados (whitelist de seguridad) y enlaza parámetros dinámicos usando bindings seguros de PDO para mitigar inyecciones SQL.
* **ConditionEngine**: Evalúa condiciones lógicas (`is_authenticated`, `is_guest`, `has_role`, `has_permission`) utilizando proveedores de estado (Auth y Spatie Laravel Permission) y ejecuta fallbacks como redirecciones, respuestas JSON customizadas o abortos HTTP.

---

*Este documento refleja la arquitectura implementada en Lemur CMS v2.0. Cualquier cambio estructural al proyecto debe actualizarse aquí antes de fusionarse a la rama principal.*