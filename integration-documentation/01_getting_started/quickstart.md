# Lemur CMS - Quick Start

## Setup

### 1. Environment
```bash
cp .env.example .env
# Editar .env con credenciales de BD
```

### 2. Base de datos
```bash
# Crear base de datos 'dashboard'
mysql -u manager -p
> CREATE DATABASE dashboard CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Migrar schema
php bin/lemur migrate
```

### 3. Crear usuario admin
```bash
php bin/lemur user:create
# Ingresar nombre, email, password
```

## Uso

### CLI
```bash
# Listar comandos
php bin/lemur

# Migrar
php bin/lemur migrate

# Limpiar cache
php bin/lemur cache:clear
```

### API
```bash
# Iniciar servidor
php -S localhost:8000 -t public/

# Endpoints
curl http://localhost:8000/api/pages
curl http://localhost:8000/api/menus/main
```

### Tests
```bash
bash bin/test.sh
```

## Archivos Clave

- `bootstrap.php` - DI container (83+ requires)
- `config/cms.php` - Configuración centralizada
- `routes/api.php` - Definición de endpoints
- `bin/lemur.php` - CLI entry point
- `public/api.php` - HTTP entry point
- `storage/schema.sql` - Schema generado

## Estructura

```
src/
├── Http/           - Router + Controllers
├── Menu/           - Menu domain + use cases + presentation
├── Page/           - Page domain + use cases
├── Support/        - Exceptions, validators, helpers
└── Migration/      - Migration system

bin/
├── lemur.php       - CLI entry
└── commands/       - CLI commands (5)

database/
└── factories/      - Data factories (3)

tests/
├── Http/           - Router tests
├── Database/       - Factory tests
└── [Modules]/      - Module tests (100+ cases)

storage/
├── cache/          - File-based cache
├── logs/           - Application logs
└── schema.sql      - Database schema
```

## Status

✅ Phase 1-3 completo
✅ 119+ test cases
✅ 0 errores de sintaxis
✅ 83 requires en bootstrap.php
✅ 11 API endpoints
✅ 5 CLI commands
✅ 4 Database factories

## Próximos pasos

1. Ejecutar `php bin/lemur migrate`
2. Ejecutar `php bin/lemur user:create`
3. Iniciar servidor: `php -S localhost:8000 -t public/`
4. Probar API: `curl http://localhost:8000/api/pages`
