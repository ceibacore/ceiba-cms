# Implementación 02: borradores, revisiones y publicación

Estado: en desarrollo. Cada entrega debe conservar la lectura pública existente hasta que las pruebas demuestren equivalencia.

## Decisiones para esta implementación

- Las revisiones viven en una tabla propia. El contenido actual de `pages` continúa siendo la fuente pública durante la transición.
- La migración de esquema es aditiva y corre con el mecanismo existente del host en cada conexión autorizada.
- La copia de páginas existentes a revisiones es una operación explícita, reanudable e idempotente. No se ejecuta al construir servicios ni al recibir una petición.
- Los snapshots guardan JSON exacto, versión de esquema, hash SHA-256, autor, fecha y motivo. Los punteros de trabajo y publicación se agregan en una tabla auxiliar para evitar alterar consumidores antiguos de `pages`.
- Toda escritura compara la revisión esperada y guarda snapshot y puntero dentro de una transacción de la conexión del sitio.
- Una edición guarda borrador. Publicar una revisión exacta actualiza el contenido visible solo después de comprobar permisos y revisión.

## Entregas

1. **Esquema aditivo:** tabla `page_revisions`, tabla `page_revision_heads` con punteros draft/published, índices e identificadores únicos por página y número. Probar SQL generado y rollback de las dos tablas.
2. **Inicializador explícito:** caso de uso que recorre páginas por lotes, crea la revisión inicial preservando status y contenido, calcula hash y fija los punteros. Repetir o reanudar no duplica snapshots. Reporta inválidos sin perder el original.
3. **Lectura administrativa:** listar páginas borrador con filtros y paginación. Mantener `findBySlug` y `findPublished` apuntando al contenido público actual.
4. **Guardado con concurrencia:** guardar una revisión nueva con `expectedRevision`; crear snapshot y mover puntero en transacción. Responder conflicto si el puntero cambió.
5. **Autosave e historial:** endpoints autenticados, historial paginado y comparación por snapshot. Ninguna escritura de autosave cambia la publicación.
6. **Restaurar y publicar:** restaurar crea nueva revisión. Publicación refiere una revisión concreta, actualiza el snapshot público y es atómica e idempotente.
7. **Operación:** auditoría, retención que preserve publicaciones fijadas, métricas, respaldo, recuperación y prueba de aislamiento entre dos conexiones tenant.

## Estado de entregas

- **1 Esquema aditivo:** implementado y probado a nivel de SQL generado y rollback.
- **2 Inicializador explícito:** implementado y probado en SQLite. Lee por lotes, conserva contenido/status, crea un snapshot inicial, fija el puntero según estado, reporta fallos por página y omite páginas ya inicializadas.

- **3 Lectura administrativa:** caso de uso disponible en el contenedor.
- **4 Guardado con concurrencia:** caso de uso PHP verificado con SQLite (guardado, conflicto y rollback). En una instancia MariaDB temporal se verificaron la migración, la inicialización, la edición desde la revisión publicada y el rechazo de una segunda escritura obsoleta. La integración HTTP y el autosave de Campus corresponden a la entrega 5.

La inicialización sigue siendo explícita. El host debe ejecutar la migración antes de invocar `initializePageRevisions` en la conexión tenant correspondiente.
