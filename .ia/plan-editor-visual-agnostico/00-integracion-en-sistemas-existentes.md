# 00. Integración en sistemas existentes: requisito transversal

Estado: requisito de arquitectura y compatibilidad. Aplicable a todas las implementaciones antes de aprobar su entrega.

## Naturaleza del producto

ceiba-cms es un módulo instalable en aplicaciones existentes. El host conserva su ciclo de vida, router, identidad, permisos, interfaz administrativa y despliegue. El módulo debe permitir uso directo de casos de uso y servicios sin exigir cargar sus rutas HTTP ni reemplazar la aplicación anfitriona. La interfaz visual distribuida por el módulo es opcional: un host puede usar su propia UI con los mismos contratos.

## Integración de referencia comprobada

En `/home/debianuser/projects/bookstores/ceiba-campus/admin-panel`:

- `composer.json` declara `ceibacore/ceiba-cms` con restricción `^1.0`. Cambios incompatibles exigen estrategia de versión y actualización coordinada.
- `app/Providers/CmsServiceProvider.php` registra `lemur-cms` con alcance de petición, resuelve contexto central o tenant, configura conexión y prefijo `cms_`, llama a `LemurCms::boot` y carga `bootstrap.php` del paquete.
- `app/Services/CmsBridge.php` expone casos de uso, repositorios, servicios y metadatos al host mediante las claves del contenedor existente.
- `app/Http/Controllers/Admin/CmsPageController.php` integra renderizado e importación. El host dispone de controladores propios de páginas y medios.
- `resources/js/components/CmsPageBuilder/` y `resources/js/pages/Admin/Cms/PageEditorBuilder.svelte` contienen una interfaz de edición existente. La ausencia de frontend en el repositorio ceiba-cms no implica ausencia de editor en sus consumidores.

El editor de Campus guarda `content_tree` mediante Inertia y rutas `cmsPath`; verificar su transformación al árbol del módulo antes de introducir envelopes. `CmsWrapper` aplica cuotas y políticas comerciales del host; sus métodos `isPageBuilderAllowed()` e `isComponentDefinitionsAllowed()` retornan `false` en el código inspeccionado. La existencia de la interfaz no demuestra que esté habilitada para todos los usuarios.

Estas observaciones provienen de lectura de código; no equivalen a validación funcional de Campus ni garantizan que el paquete instalado coincida con la rama local del módulo.

## Responsabilidades

| Área | Módulo | Host / adaptador |
|---|---|---|
| Contenido | Entidades, validación y casos de uso | Invocación, navegación y contexto |
| HTTP | Contratos y adaptador opcional | Rutas, middleware, sesión, CSRF y respuestas propias |
| Identidad | Capacidades y puertos de autorización | Usuario autenticado, roles y política efectiva |
| Aislamiento | Exigir contexto coherente por operación | Resolver sitio, conexión y ámbito autorizado |
| Persistencia | Repositorios y migraciones del CMS | Credenciales, conexiones, ejecución y respaldo |
| Editor | Esquemas, operaciones y UI opcional | UI existente o montaje del paquete opcional |
| Recursos | Referencias y puertos | Almacenamiento, CDN, correo, jobs y secretos |

No imponer Laravel, Svelte, rutas `/api`, una base central ni un modelo de tabla tenants al núcleo. El aislamiento por base de datos usado por Campus debe seguir siendo viable; un identificador de sitio lógico no obliga a duplicar ese modelo mediante columnas en todas sus tablas.

## Compatibilidad y evolución

1. Inventariar claves del contenedor y firmas consumidas por CmsBridge y controladores antes de modificarlas.
2. Proveer adaptadores para contratos nuevos; conservar temporalmente los accesos actuales y declarar sus deprecaciones.
3. Las migraciones se ejecutan explícitamente desde el host y en cada conexión autorizada; no al construir una entidad o atender una petición.
4. Publicar capacidades del módulo para que la UI existente pueda adoptar cambios gradualmente.
5. Probar actualización con el editor Svelte actual antes de activar nuevos formatos. Las escrituras desde clientes antiguos deben conservar datos o rechazarse explícitamente, nunca perder extensiones silenciosamente.
6. Evitar estado global que mezcle hosts o tenants. Verificar dos contextos consecutivos en el mismo proceso, especialmente workers persistentes.
7. Determinar si conviene extraer partes reutilizables del editor actual o construir el paquete opcional después de auditar sus contratos y dependencias; Web Components es una propuesta, no requisito del host.

## Puertas de aceptación

- Caso de uso invocable directamente desde PHP sin router HTTP ni Laravel.
- Campus conserva sus rutas, sesión, autorización y pantallas al actualizar el módulo.
- Dos tenants consecutivos no comparten conexión, caché, identidad ni configuración accidentalmente.
- Un host PHP mínimo y Campus satisfacen los mismos contratos de dominio.
- Una función nueva se puede activar desde UI propia o cliente opcional.
- El consumidor declara versión/capacidades requeridas y recibe un error compatible cuando no están disponibles.

## Secuencia inmediata

Antes de integrar el nuevo DocumentEnvelope en persistencia o HTTP, contrastar los formatos y guardados de Campus con el contrato propuesto. El prototipo local del envelope no constituye integración terminada. Priorizar compatibilidad y pruebas contractuales del consumidor dentro de 01; luego continuar una tarea a la vez.
