# Implementación 06 — Theme Builder y partes del sitio

Estado: propuesta pendiente de implementación. Depende de 01, 02, 03 y 04. Los contratos y rutas descritos aquí son nuevos; no describen API disponible.

## Base comprobada y cambio requerido

`src/PageBuilder/Domain/Entity/PageTemplate.php` contiene árbol y `slotsDefinition`; existen `PageLayout`, `LayoutRenderer` y repositorios de layouts y plantillas. Deben reutilizarse y evolucionar sin convertir un layout existente en una plantilla global de forma automática. El nuevo módulo coordinará cabecera, pie, contenido individual, archivos, búsqueda y página 404.

## Alcance funcional

- Crear, duplicar, previsualizar, revisar y publicar partes de sitio mediante el editor común.
- Asignar una parte por tipo de página, tipo de contenido, taxonomía, idioma o ruta registrada por el host.
- Componer slots obligatorios y opcionales; validar ausencia de contenido principal, referencias circulares y partes eliminadas.
- Mostrar antes de publicar qué páginas cambiarían y qué reglas entran en conflicto.
- Conservar una plantilla de respaldo por sitio y tipo; las condiciones de visibilidad nunca sustituyen autorización.

## Modelo y contratos propuestos

`SitePart`: id, siteId, kind, name, draftRevisionId, publishedRevisionId, conditions, priority. `kind` admite header, footer, single, archive, search y not_found. `RenderContext` recibe siteId, locale, routeName, contentType y contentId desde un adaptador del host; no lee variables globales ni exige WordPress.

`SitePartResolver.resolve(context)` devuelve referencias a revisiones publicadas e información de diagnóstico. Las exclusiones prevalecen sobre inclusiones dentro de una regla. Entre candidatas se resuelve por prioridad explícita y luego por especificidad documentada; un empate exacto bloquea publicación, sin desempate oculto por orden de base de datos.

Rutas propuestas bajo `/api/builder/v1/site-parts`: colección, detalle, revisión, preview, publish y impact. Toda mutación usa control de revisión definido en 02. `impact` admite paginación y un conjunto de rutas de muestra; no promete enumerar contenido externo ilimitado.

## Pasos de implementación

1. Introducir entidades y puertos de persistencia; añadir tablas sin modificar registros heredados.
2. Crear resolver puro y adaptadores del contexto; separar la evaluación de audiencia de los controles de acceso.
3. Adaptar renderizado por slots y comprobar compatibilidad con layouts existentes.
4. Implementar API e inspector de condiciones con operadores tipados.
5. Integrar selector de contexto de previsualización: artículo, archivo y página inexistente.
6. Añadir evaluación de impacto, invalidación de caché por dependencia y publicación atómica.
7. Incorporar migrador optativo de layouts con reporte de equivalencias y diferencias.

## Seguridad y operación

El servidor deriva el sitio de la sesión/contexto autorizado. La caché incluye sitio, idioma y revisión; cualquier variante por identidad debe evitar caché pública compartida. Los tokens de preview son breves, revocables y limitados a sitio y revisión. Las reglas desconocidas se rechazan: `ConditionEngine` actualmente permite condiciones desconocidas, por lo que no debe reutilizarse sin endurecimiento para esta función.

## Pruebas y aceptación

- Misma entrada produce la misma selección de partes, incluyendo inclusiones, exclusiones, prioridades y empates.
- Una regla de sitio A no afecta B; visitantes no obtienen revisiones en borrador.
- Cabecera y pie nuevos aparecen juntos después de publicar; un fallo no deja una combinación parcial.
- Un ciclo de slots se rechaza con una ruta comprensible al error.
- Páginas heredadas conservan su renderizado hasta activar el nuevo resolver.
- Preview y render público coinciden para la misma revisión/contexto, salvo herramientas de edición.

## Despliegue y reversión

Habilitar por sitio después de validar rutas de referencia. Guardar la asignación anterior antes de activar. Revertir el puntero de revisión y la selección del resolver; invalidar caché. No borrar layouts antiguos hasta completar una migración independiente y respaldada.

## Integración obligatoria con el host

Resolver partes dentro del renderizado y router del host; no registrar un catch-all obligatorio ni interceptar rutas ajenas al CMS. Véase [00: integración en sistemas existentes](00-integracion-en-sistemas-existentes.md).
