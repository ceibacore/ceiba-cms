# 02. Borradores, revisiones y publicación

Estado: propuesta. Depende de 01. Habilita 03 y todos los builders posteriores.

## Problema observado

`src/Page/Application/ListPages.php` utiliza findPublished. El editor necesita listar borradores autorizados y recuperar trabajo sin modificar la versión pública. Las rutas de páginas existen en `routes/api.php`; ampliar sus casos de uso manteniendo compatibilidad con consumidores actuales.

## Modelo propuesto

Separar identidad de página, revisión de trabajo y revisión publicada. Una revisión guarda ID, pageId, siteId, número creciente, schemaVersion, snapshot, hash, autor, fecha y motivo. La página referencia draftRevisionId y publishedRevisionId. Autosave es una revisión de trabajo, nunca una publicación implícita. La retención no elimina revisiones publicadas ni revisiones fijadas para auditoría.

Estados: borrador → publicado; una edición de una página publicada crea un borrador nuevo conservando el contenido público. Restaurar genera una revisión nueva, sin reescribir el historial. Despublicar requiere permiso propio y deja trazabilidad.

## API propuesta

- Listar páginas con filtros status, búsqueda, cursor y límite; resolver scope en servidor.
- GET documento devuelve revisión y ETag opaco.
- Guardar y autosave requieren If-Match. Precondición ausente: 428; versión obsoleta: 412. Devolver revisión actual y permitir comparación sin sobrescritura automática.
- POST de publicación referencia una revisión exacta y usa clave de idempotencia. El mismo intento no genera múltiples eventos.
- Endpoints versionados para historial, restauración y vista previa. Son propuestas; no asumir su existencia actual.
- Preview autenticado o token corto ligado a sitio, documento y revisión; revocable y excluido de cachés públicos e indexación.

## Implementación

1. Añadir migración aditiva para snapshots y punteros. Inicializar una revisión por página existente conservando su estado real.
2. Añadir consulta administrativa que incluya borradores sin cambiar la consulta pública.
3. Transacción atómica para comparar versión, guardar snapshot y actualizar puntero. Conflictos nunca usan last-write-wins.
4. Autosave con debounce, una petición en curso por documento y cola del último cambio. Mostrar estados guardando, guardado, sin conexión y conflicto.
5. Historial paginado, comparación y restauración con autorización.
6. Publicación atómica con outbox para invalidación de caché y eventos. Reintentos idempotentes; ningún job publica una revisión diferente de la solicitada.
7. Aplicar retención configurable y respaldo antes de purgar.

## Permisos y auditoría

Separar leer, editar, publicar, restaurar y borrar. Registrar actor, sitio, revisión origen/destino, acción y resultado. Verificar permisos nuevamente al ejecutar jobs. Sanitizar preview igual que el contenido público; no habilitar scripts arbitrarios por ser un borrador.

## Pruebas y aceptación

Dos sesiones cargan revisión 4: la primera guarda 5; la segunda recibe 412 y conserva sus cambios locales. Fallo de DB revierte snapshot y puntero juntos. Un autosave no altera el HTML público. Restaurar revisión 2 crea revisión 6. Repetir publicación con la misma clave devuelve el mismo resultado. Tokens vencidos y acceso cruzado entre sitios son rechazados. Reintentar invalidación tras fallo no duplica publicación.

## Operación y reversión

Medir conflictos, latencia de guardado, errores de autosave y retraso de outbox. Probar recuperación desde respaldo en staging. Desactivar edición nueva por feature flag sin borrar historial. Rollback de aplicación exige compatibilidad con punteros nuevos; no revertir destructivamente tablas con contenido creado por clientes.

## Integración obligatoria con el host

Integrar revisiones mediante los controladores y permisos del host. El editor Svelte actual debe poder seguir leyendo documentos; negociar capacidades antes de activar escritura del nuevo formato. Véase [00: integración en sistemas existentes](00-integracion-en-sistemas-existentes.md).
