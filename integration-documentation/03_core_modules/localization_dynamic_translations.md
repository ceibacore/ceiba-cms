## Localización y Traducciones Dinámicas - Completado ✅

Este módulo implementa el soporte para Localization (idiomas) y Traducciones Dinámicas dentro del CMS, permitiendo gestionar de forma autónoma los idiomas activos y su diccionario de traducción a través de base de datos (`LemurDB`), con un sistema de cargado personalizado de Laravel que optimiza el acceso y la invalidación automática en caché.

---

### 1. Modelo de Datos y Migraciones

El módulo utiliza dos tablas principales creadas por la migración `20260608000000_create_translations_tables.php`:

#### Tabla `languages`
Almacena los lenguajes configurados en la plataforma:
- `id` (CHAR(36)/UUID) - Llave primaria.
- `code` (VARCHAR(10)) - Código ISO del idioma (ej: `es`, `en`). Único.
- `label` (VARCHAR(100)) - Nombre visible del idioma (ej: `Español`, `English`).
- `flag` (VARCHAR(50), nullable) - Indicador visual / bandera (opcional).
- `is_active` (TINYINT(1)) - Define si está habilitado en la UI (1 = activo).
- `is_default` (TINYINT(1)) - Define si es el idioma por defecto del sitio.
- `created_at` y `updated_at` (TIMESTAMP).

#### Tabla `translations`
Almacena los textos traducidos:
- `id` (CHAR(36)/UUID) - Llave primaria.
- `language_id` (CHAR(36)/UUID) - Llave foránea hacia `languages.id` en cascada.
- `group` (VARCHAR(100)) - El grupo o archivo de traducción de Laravel (ej: `messages`, `validation`, `*` para raíz).
- `key` (VARCHAR(255)) - La clave de traducción dentro del grupo.
- `value` (TEXT) - El texto traducido.
- `created_at` y `updated_at` (TIMESTAMP).
- **Index Único**: `uq_translations_key` compuesto por `(language_id, group, key)`.

---

### 2. Capa de Dominio (Domain Ports)

Las interfaces especifican los contratos para gestionar e interactuar con la base de datos de idiomas y traducciones:

#### [`LanguageRepositoryInterface`](file:///d:/repositories/lemur-books-lms-2/lemur-cms/src/Localization/Domain/Repository/LanguageRepositoryInterface.php)
```php
interface LanguageRepositoryInterface
{
    public function all(): array;
    public function find(string $id): ?array;
    public function findByCode(string $code): ?array;
    public function create(array $data): string;
    public function update(string $id, array $data): void;
    public function delete(string $id): void;
}
```

#### [`TranslationRepositoryInterface`](file:///d:/repositories/lemur-books-lms-2/lemur-cms/src/Localization/Domain/Repository/TranslationRepositoryInterface.php)
```php
interface TranslationRepositoryInterface
{
    public function getTranslationsForLanguage(string $languageId): array;
    public function updateTranslationsForLanguage(string $languageId, array $translations): void;
    public function getTranslation(string $locale, string $group, string $key): ?string;
    public function getTranslationsByLocaleAndGroup(string $locale, string $group): array;
    public function deleteTranslationsForLanguage(string $languageId): void;
}
```

---

### 3. Capa de Infraestructura (Adapters)

Implementa la persistencia utilizando `LemurDB` e integra la invalidación de caché si Laravel está disponible.

- **[`LemurDbLanguageRepository`](file:///d:/repositories/lemur-books-lms-2/lemur-cms/src/Localization/Infrastructure/LemurDbLanguageRepository.php)**: Administra el guardado y actualización de idiomas en la tabla `languages`.
- **[`LemurDbTranslationRepository`](file:///d:/repositories/lemur-books-lms-2/lemur-cms/src/Localization/Infrastructure/LemurDbTranslationRepository.php)**: Guarda traducciones masivas dentro de una transacción de base de datos.
  - **Invalidación Proactiva de Caché**: En cada actualización o eliminación de traducciones, se calculan las claves de caché afectadas `"locale.translations.{$locale}.{$group}"` y se limpian proactivamente usando `Illuminate\Support\Facades\Cache::forget()`.

---

### 4. Capa de Aplicación (Use Cases)

Los casos de uso encapsulan la lógica de negocio del módulo de localización bajo `src/Localization/Application/`:

- **`ListLanguages`**: Retorna el listado de idiomas ordenados por defecto primero.
- **`CreateLanguage`**: Crea un idioma asignándole un nuevo UUID. Si se proporciona `source_language_id`, clona masivamente todas las traducciones de ese idioma origen al nuevo. Además, si el idioma es marcado como por defecto (`is_default`), desmarca todos los demás.
- **`UpdateLanguage`**: Modifica un idioma. Si se establece como default (`is_default`), quita el flag de default de otros idiomas.
- **`DeleteLanguage`**: Remueve un idioma y sus traducciones en cascada.
- **`ListTranslations`**: Retorna todas las traducciones de un idioma específico.
- **`UpdateTranslations`**: Inserta o actualiza un conjunto de traducciones llave-valor para un idioma específico.

---

### 5. API RESTful y HTTP Layer

#### Controlador [`LanguageController`](file:///d:/repositories/lemur-books-lms-2/lemur-cms/src/Http/Controllers/LanguageController.php)
Expone las APIs para la gestión en la UI:

- **Listar Idiomas**: `GET /api/languages`
- **Crear Idioma**: `POST /api/languages` (Soporta `source_language_id` en el cuerpo del JSON para clonación).
- **Actualizar Idioma**: `PUT /api/languages/{id}`
- **Eliminar Idioma**: `DELETE /api/languages/{id}`
- **Listar Traducciones**: `GET /api/languages/{id}/translations`
- **Guardar/Actualizar Traducciones**: `PUT /api/languages/{id}/translations` (Recibe `{ "translations": [ { "group": "messages", "key": "welcome", "value": "Hola" } ] }`).

#### Registro de Rutas
Se añadieron a `routes/api.php` y se inyectaron todas las dependencias y clases en `bootstrap.php` para asegurar su disponibilidad en el CMS.

---

### 6. Integración con Laravel (Loader y Provider)

Para asegurar que Laravel consuma estas traducciones sin degradar el rendimiento, se crearon adaptadores específicos que interceptan las llamadas al traductor de Laravel:

#### [`DatabaseTranslationLoader`](file:///d:/repositories/lemur-books-lms-2/lemur-cms/src/Support/Translation/DatabaseTranslationLoader.php)
- Extiende `Illuminate\Translation\FileLoader`.
- Sobrescribe el método `load($locale, $group, $namespace)`.
- **Flujo de Carga**:
  1. Carga las traducciones locales físicas de Laravel mediante `parent::load(...)`.
  2. Si es una traducción de la aplicación base (`namespace === null`), realiza una consulta optimizada a través del repositorio usando `Cache::rememberForever(...)`.
  3. Ejecuta un `array_merge` donde las traducciones dinámicas guardadas en base de datos sobrescriben a las traducciones físicas estáticas del disco.

#### [`TranslationServiceProvider`](file:///d:/repositories/lemur-books-lms-2/lemur-cms/src/Support/Translation/TranslationServiceProvider.php)
- Extiende `Illuminate\Translation\TranslationServiceProvider`.
- Sobrescribe la instanciación de `translation.loader` en el contenedor para utilizar el `DatabaseTranslationLoader` e inyectar el repositorio correspondiente recuperado dinámicamente de `\LemurCms\LemurCms::container()`.

---

### 7. Cómo Habilitarlo en el Dashboard Laravel

Para activar el soporte dinámico en tu aplicación Laravel, edita el archivo de configuración `config/app.php` y reemplaza el provider de traducción nativo de Laravel por el personalizado del CMS:

```diff
- Illuminate\Translation\TranslationServiceProvider::class,
+ LemurCms\Support\Translation\TranslationServiceProvider::class,
```

Esto habilitará automáticamente la carga en base de datos para todas las llamadas al helper `__(...)`, `@lang` de Blade e `Inertia` en tu frontend.
