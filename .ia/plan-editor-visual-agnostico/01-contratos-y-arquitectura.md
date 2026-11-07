# 01. Contratos y arquitectura agnóstica

Estado: propuesto; no implementado por este documento. Dependencias: ninguna.

## Objetivo y base existente

Mantener ceiba-cms como biblioteca PHP integrable en distintos hosts. `composer.json` requiere PHP ^8.1 y ceiba-db ^1.0. El modelo actual de `src/PageBuilder/Domain/Entity/Node.php` y el catálogo `ComponentDefinition.php` serán la base; no introducir dependencias de WordPress ni obligar a usar Bootstrap en documentos nuevos.

## Contratos propuestos

- `DocumentEnvelope`: schemaVersion, documentId, revision, root, settings y referencias a recursos. Separar formato persistido de detalles de transporte.
- Conservar los campos existentes del nodo. Añadir estilos y metadatos mediante migración explícita y versionada; no reinterpretar props antiguos silenciosamente.
- `HostContext`: siteId, actorId, locale y capabilities resueltos por servidor. Nunca confiar en un siteId enviado por el navegador para autorizar acceso.
- Puertos para autorización, repositorios, almacenamiento multimedia, reloj, jobs, entrega de correo y fuentes de contenido. Los adaptadores pueden vivir fuera del núcleo.
- Catálogo de componentes con identificador estable, versión, esquema de propiedades, restricciones de hijos, renderer y controles de editor. El cliente no registra renderers PHP arbitrarios.
- API de editor bajo prefijo configurable y versionado. Errores estructurados con code, message, fieldErrors y requestId; sin trazas ni secretos.
- Capacidades negociadas al iniciar: versiones de documento, componentes disponibles y permisos efectivos. Un componente desconocido se conserva como dato y bloquea operaciones incompatibles, mostrando diagnóstico recuperable.

## Secuencia de implementación

1. Inventariar consumidores del VDOM, renderers, importador HTML y framework registry. Crear fixtures de documentos reales anonimizados.
2. Especificar JSON Schema y un lector compatible con documentos existentes; definir versión de origen cuando falte schemaVersion.
3. Implementar validación antes de persistir: tipos, IDs únicos, profundidad, cantidad de nodos, tamaño y referencias válidas.
4. Introducir puertos con adaptadores sobre los servicios actuales. Evitar duplicar mecanismos de autorización existentes.
5. Añadir migrador puro y determinista de documentos: entrada antigua, salida nueva, informe de incompatibilidades; conservar snapshot original.
6. Publicar contrato de API y catálogo versionado. Verificar consumo desde dos hosts distintos antes de declarar independencia del host.

## Seguridad y consistencia

La validación del cliente mejora UX; el servidor decide. Autorizar cada recurso y operación. Sanitizar HTML, URLs y CSS según contexto; nunca evaluar bindings como código. Las referencias a recursos deben pertenecer al sitio autorizado. Registrar cambios de versión y errores de migración sin registrar contenido sensible.

## Pruebas y aceptación

- Documento antiguo se lee, renderiza y guarda sin perder propiedades conocidas ni extensiones conservables.
- Rechazo de ciclos, IDs repetidos, tamaños excesivos y versiones futuras no soportadas.
- Mismo documento produce estructura semántica equivalente en renderer neutral y adaptador Bootstrap.
- Dos hosts usan el mismo núcleo sin cambios en sus entidades de dominio.
- Solicitudes de otro sitio son rechazadas incluso con IDs válidos.

## Despliegue y reversión

Activar escritura del nuevo formato por sitio. Primera entrega mantiene lectura de ambos formatos. Migración con dry-run, respaldo y reporte; no modificar masivamente documentos al arrancar. Volver al renderer anterior solo para formatos que pueda leer; para formatos nuevos, restaurar snapshots mediante procedimiento probado. No borrar formato antiguo hasta cerrar la ventana de recuperación.
