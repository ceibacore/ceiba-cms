# Fuentes de datos (plan 07)

Todo el contenido dinámico (bucles, consultas de una página, páginas de registros) se pide a un **registro de fuentes**.
No hay SQL, nombres de tabla ni URLs libres en los documentos.

## Piezas

| Pieza | Qué hace |
|---|---|
| `DataSourceDescriptor` | Id (`module:<slug>` o `host:<nombre>`), campos tipados (`FieldDescriptor`), capacidades (`search`, `pagination`, `single`), orden por defecto, tamaño máximo de página y campo de slug |
| `FieldDescriptor` | Tipo, nulabilidad, **público/privado**, buscable, ordenable, opciones y fuente de una relación. El tipo decide los operadores permitidos |
| `DataQuery` | `source`, `filters[{field, op, value}]`, `sort[{field, direction}]`, `search`, `page`, `page_size` |
| `QueryValidator` | Rechaza (`InvalidDataQuery` con código y ruta) campos desconocidos o privados, operadores no permitidos, valores de otro tipo y páginas fuera de límites. Nunca ignora nada |
| `DataSourceRegistry` | Valida, llama al adaptador y **recorta el resultado a los campos públicos** |
| `QueryContext` | Sitio, idioma, sesión y presupuesto; lo crea el servidor. La vista previa del editor usa el mismo que un visitante |

Operadores: `eq`, `neq`, `in`, `contains`, `starts_with`, `gt`, `gte`, `lt`, `lte`, `is_null`, `not_null`.

## Módulos dinámicos

`ModuleDataSources` publica cada módulo como `module:<slug>`. Un campo con `isPublic: false` no sale nunca del módulo.
Las relaciones traen `<campo>_label` con una consulta por página, sin N+1. La URL de un registro usa el campo `slug` si existe y si no, el `id`.

## Registrar una fuente del host

```php
final class ProductsSource implements \CeibaCms\DataSource\Domain\DataSourceAdapter
{
    public function descriptor(QueryContext $c): DataSourceDescriptor { /* host:marketplace.products, campos públicos */ }
    public function fetch(DataQuery $q, QueryContext $c): array { /* ['items' => [...], 'total' => n]; $q ya está validada */ }
    public function findBySlug(string $slug, QueryContext $c): ?array { /* o null */ }
}

$container['dataSources']->register(new ProductsSource(...));
```

Una fuente del host con el mismo id que una generada gana sobre ella.

## Bucles de nodo

`loop.source` acepta `module:<slug>` y `host:<nombre>`. `DataSourceLoopResolver` los convierte en `DataQuery`; un bucle inválido no dibuja nada.

**Retirado:**
- `api:<url>`: era riesgo de SSRF. Una fuente HTTP la registra el host, con destinos fijos.
- `QueryEngine` y `pages.query_config`: los sustituyen las consultas del documento (07-B).
