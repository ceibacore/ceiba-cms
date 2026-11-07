# Implementación 07 — Contenido dinámico, consultas y loops

Estado: propuesta. Dependencias: 01, 03, 04, 05; 06 para plantillas de archivo. Contratos nuevos sujetos a validación contra adaptadores reales.

## Base comprobada

`QueryConfig` ya representa modelo, filtros, orden, paginación, límite y relaciones; `DataProviderInterface.getData()` devuelve un iterable. Existen `QueryEngine`, `LoopResolver`, `ContextResolver`, `VariableInterpolator` y proveedores de `DynamicModule`. Falta ofrecer estas capacidades como flujo visual con un esquema seguro y verificable de campos y consultas.

## Funciones a entregar

Selector de fuentes y campos; bindings con valor de respaldo; filtros tipados; orden; paginación; plantillas de item reutilizables; estados vacío, carga y error; previsualización con datos autorizados; transformaciones permitidas de fecha, número, texto e imagen. Relaciones se seleccionan con profundidad limitada. Añadir búsquedas y filtros visibles que actualicen resultados sin exigir JavaScript del framework anfitrión.

## Contratos propuestos

`DataSourceDescriptor`: id, label, fields, allowedFilters, allowedSorts, relations y capabilities. Cada campo declara tipo, nulabilidad, clasificación pública/privada y si puede mostrarse al rol actual. `DataQuery` usa IDs registrados, operadores enumerados, cursor o página y pageSize con tope. No admite SQL, nombres de tabla libres ni expresiones PHP/JavaScript.

`QueryResult`: items, pagination, warnings y sourceRevision opcional. `Binding`: sourceId, fieldPath, fallback y transformId opcional. `QueryContext` lleva sitio, usuario, idioma y presupuesto de ejecución, inyectados por servidor. Extender el puerto existente mediante adaptador para no romper proveedores que solo implementan `getData()`.

Rutas propuestas: `GET /api/builder/v1/data-sources`, `GET .../data-sources/{id}/schema`, `POST .../queries/preview`. El preview tiene los mismos permisos de lectura que el render; nunca eleva privilegios por usar el editor.

## Secuencia de trabajo

1. Inventariar proveedores actuales y campos; clasificar qué puede ser público.
2. Definir registro de fuentes, esquemas y operadores; validar consultas antes de resolverlas.
3. Incorporar adaptador compatible con `QueryConfig` y normalizar errores y paginación.
4. Implementar bindings tipados y escape según destino: texto, atributo o URL.
5. Construir panel de consultas, picker de campos y selección de registro de preview.
6. Incorporar loop item, filtros interactivos y parámetros URL permitidos.
7. Instrumentar consultas, caché e invalidación; bloquear relaciones recursivas y N+1 mediante carga agrupada.

## Límites y seguridad

Presupuestos configurables para tiempo, items y profundidad; valores iniciales se fijan con medición local, no como garantías previas. Proveedores HTTP requieren lista de destinos permitidos, bloqueo de redes internas, límites de respuesta, redirecciones y timeout. Secretos viven en el host. Las claves de caché incluyen permisos relevantes; no cachear datos privados en la variante pública. Rechazar operadores/campos desconocidos y consultas de otro sitio.

## Verificación y aceptación

Fixtures con valores nulos, relaciones vacías, HTML malicioso y permisos distintos. Verificar paginación sin duplicados para un orden estable, coherencia preview/publicado y límites ante una fuente lenta. Confirmar que un campo privado no aparece en el catálogo, no se obtiene por petición manual y no queda en HTML/cache. Una fuente caída muestra el fallback diseñado sin publicar trazas o credenciales. Validar equivalencia de consultas heredadas antes de migrarlas.

## Activación

Registrar fuentes nuevas de forma optativa y habilitar el inspector por sitio. Mantener adaptador de lecturas antiguas. Ante regresión deshabilitar consultas nuevas o restaurar revisión, preservando configuraciones para diagnóstico. No reinterpretar silenciosamente filtros heredados.
