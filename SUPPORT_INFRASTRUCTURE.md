## Infraestructura Faltante - Completada ✅

### 1. Excepciones Personalizadas (src/Support/Exceptions/)

**ValidatorException** - Excepción base para validaciones
- `fromErrors(array $errors): self` - convierte array de errores en excepción

**InvalidMenuException** - Errores en validación de menús
- `missingLabel()` - falta label en item
- `missingUrl()` - falta URL en item tipo link
- `invalidType(string $type)` - tipo no válido
- `missingMenuSlug()` - falta slug de menú
- `missingMenuName()` - falta nombre de menú
- `duplicateMenuSlug(string $slug)` - slug ya existe

**PageNotFoundException** - Página no encontrada
- `byId(int $id)` - por ID
- `bySlug(string $slug)` - por slug
- `nonePublished()` - sin páginas publicadas

**InvalidUserException** - Errores en validación de usuarios
- `missingEmail()` - falta email
- `invalidEmail(string $email)` - formato inválido
- `missingPassword()` - falta contraseña
- `weakPassword()` - contraseña débil
- `emailExists(string $email)` - email duplicado
- `notFound(int $id)` - usuario no existe

**InvalidPermissionException** - Errores en permisos
- `permissionDenied(string $permission)` - permiso denegado
- `roleNotFound(int $roleId)` - role no existe
- `missingPermission(string $slug)` - permiso no existe

### 2. Validadores (src/Support/Validators/)

**MenuValidator**
- `validateMenuItem(array $data)` - valida item individual
- `validateMenu(array $data)` - valida estructura de menú
- `validateBanner(array $data)` - valida banner
- `validateLogo(array $data)` - valida logo

**PageValidator**
- `validatePage(array $data)` - valida página (title, slug, content, status)
- `validateForPublish(array $data)` - valida requisitos mínimos para publicar

**UserValidator**
- `validateUser(array $data)` - valida datos básicos (email, name)
- `validatePassword(array $data)` - valida contraseña fuerte (8+ chars, mayúsculas, minúsculas, números)
- `validateCreateUser(array $data)` - valida creación completa
- `validatePasswordChange(array $data)` - valida cambio de contraseña

### 3. Helpers (src/Support/Helpers/)

**StringHelper**
- `slugify(string $text): string` - "Hello World!" → "hello-world"
- `sanitizeUrl(string $url): string` - sanitiza URLs (relativas/absolutas)
- `htmlTruncate(string $html, int $length): string` - trunca HTML preservando etiquetas
- `hashId(int $id): string` - genera hash compatible con URLs
- `unhashId(string $hash): ?int` - decodifica hash de ID

**DateHelper**
- `now(): string` - fecha actual en formato MySQL
- `toISO8601(\DateTime $date): string` - convierte a ISO8601
- `fromISO8601(string $date): \DateTime` - parsea ISO8601
- `isFuture(string $date): bool` - detecta fecha futura
- `isPast(string $date): bool` - detecta fecha pasada
- `daysDifference(string $date1, string $date2): int` - diferencia en días
- `addDays(string $date, int $days): string` - suma días a fecha

**ArrayHelper**
- `get(array $array, string $key, $default = null)` - obtiene valor con dot notation
- `set(array &$array, string $key, $value)` - establece valor con dot notation
- `only(array $array, array $keys): array` - filtra array por whitelist
- `except(array $array, array $keys): array` - excluye keys
- `toQueryString(array $array): array` - convierte a query string
- `groupBy(array $array, $key): array` - agrupa por clave
- `keyBy(array $array, $key): array` - mapea array por clave

### 4. Tests

**tests/Support/Validators/ValidatorsTest.php**
- 7 tests MenuValidator
- 7 tests PageValidator
- 7 tests UserValidator

**tests/Support/Helpers/HelpersTest.php**
- 11 tests StringHelper
- 6 tests DateHelper
- 10 tests ArrayHelper

### 5. Bootstrap.php Actualizado

Agregados 30 nuevos `require_once` para:
- 5 excepciones personalizadas
- 3 validadores
- 3 helpers

Total de requires: 63 (incluye Migration + Domain + Application + Infrastructure + Presentation + Support)

### Patrones de Uso

**Validación de datos:**
```php
try {
    MenuValidator::validateMenuItem(['label' => 'Home', 'url' => '/']);
    PageValidator::validatePage(['title' => 'About', 'slug' => 'about', 'content' => '...']);
    UserValidator::validateCreateUser(['email' => 'john@example.com', 'name' => 'John', 'password' => 'Strong123']);
} catch (InvalidMenuException|InvalidUserException $e) {
    echo $e->getMessage();
}
```

**Helpers - Strings:**
```php
StringHelper::slugify('Hello World!'); // 'hello-world'
StringHelper::sanitizeUrl('/about'); // '/about'
StringHelper::hashId(123); // 'hash_string'
```

**Helpers - Arrays:**
```php
ArrayHelper::get(['user' => ['name' => 'John']], 'user.name'); // 'John'
ArrayHelper::only($data, ['id', 'name']); // filtra campos
ArrayHelper::groupBy($users, 'role'); // agrupa por role
```

**Helpers - Dates:**
```php
DateHelper::now(); // '2026-05-10 14:30:00'
DateHelper::addDays('2026-05-10', 5); // '2026-05-15'
DateHelper::isFuture('2026-05-20'); // true
```
