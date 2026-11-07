# 03. Editor visual agnóstico

Estado: propuesta pendiente de implementación. Dependencias: 01 (contratos) y 02 (persistencia y revisiones). Integraciones: 04 (estilos), 05 (catálogo y medios), 07 (contenido dinámico). Ninguna API nueva descrita aquí debe interpretarse como disponible.

## Objetivo y situación comprobada

Entregar un editor integrable por cualquier aplicación anfitriona que pueda montar un elemento HTML y proporcionar acceso a las API. El repositorio contiene un backend PHP con nodos, catálogo y renderizado; no se identificó una aplicación de edición visual ni un pipeline frontend dentro del módulo. Campus sí tiene un editor Svelte que debe auditarse y adaptarse antes de decidir una nueva implementación. El editor debe trabajar sobre el documento canónico del backend, evitando guardar HTML como estado primario.

## Arquitectura propuesta

- Opción de distribución por evaluar tras auditar Campus: paquete de editor con módulos ES y un Web Component `ceiba-page-builder`; la compilación ocurre al publicar el paquete, sin exigir Node.js en el servidor PHP consumidor.
- Núcleo de estado y comandos independiente del DOM. Adaptadores separados para transporte HTTP, selección de medios, permisos, traducción y renderizado de preview.
- Interfaz con panel de componentes, canvas, navegador de estructura e inspector de propiedades. Los controles se obtienen del esquema del catálogo, con extensiones registradas explícitamente.
- Canvas dentro de iframe para aislar CSS del anfitrión. La comunicación usa un canal con origen y sesión verificados y mensajes enumerados; nunca `eval` ni ejecución de código recibido desde el documento.
- Renderizado público siempre a cargo del renderer compatible del servidor. Una representación optimista del canvas debe reconciliarse con el preview del servidor para impedir divergencias persistentes.

## Contratos propuestos

La configuración del montaje incluye `pageId`, `locale`, `transport`, `capabilities`, `previewOrigin` y callbacks. El transporte expone `load`, `save`, `preview`, `listComponents` y `listMedia`; implementa los contratos de 01 y 02 sin acoplar la UI a rutas concretas. Las credenciales permanecen en el adaptador del host; no se serializan dentro de la página ni se imprimen en eventos.

Comandos mínimos: insertar, mover, duplicar, eliminar, actualizar propiedades, renombrar, reemplazar selección y modificar estilos. Cada comando contiene identificadores de nodos y precondiciones. Mover un nodo a un descendiente, duplicar IDs o exceder límites debe fallar antes de alterar el estado. Duplicar regenera IDs y reescribe referencias internas conocidas.

Eventos públicos propuestos: `ready`, `selection-change`, `dirty-change`, `save-start`, `save-success`, `save-error` y `conflict`. Los eventos describen estado o IDs; no exponen contenido privado innecesario. Los errores incluyen código estable y mensaje traducible.

Estados de sesión: cargando, listo, modificado, guardando, conflicto, desconectado y error de carga. Un error no elimina el borrador en memoria. El historial local de comandos y las revisiones persistentes son mecanismos distintos: deshacer no restaura por sí solo una revisión del servidor.

## Entregas incrementales

1. Crear paquete frontend, montaje/desmontaje, traducciones y transporte de referencia; liberar recursos, listeners e iframe al desmontar.
2. Implementar store normalizado y comandos puros con validación de árbol. Integrar undo/redo con agrupación de cambios de texto y límite de memoria configurable.
3. Construir navegador de estructura y selección sincronizada con canvas. Habilitar inserción mediante botones y teclado antes de drag-and-drop.
4. Incorporar contenedores Flex/Grid, título, texto, imagen y enlace/botón. Inspector con validación de tipos y errores por campo.
5. Incorporar arrastre entre contenedores, indicador de destino y cancelación; impedir movimientos inválidos. Ofrecer alternativa completa de teclado.
6. Añadir edición de texto en sitio con saneamiento y conservación de selección; definir formato enriquecido permitido.
7. Integrar guardado, autosave, conflicto y preview de 02. Mostrar claramente versión cargada, estado de sincronización y permisos de publicación.
8. Incorporar edición responsive de 04 y selector de medios de 05. El tamaño de preview no debe modificar contenido automáticamente.
9. Añadir búsqueda de componentes, atajos, copiar/pegar saneado, selección múltiple, breadcrumb y acciones de estructura por lotes.

## Seguridad, accesibilidad y rendimiento

Autorizar todas las operaciones en servidor; ocultar botones no sustituye permisos. Bloquear HTML activo y protocolos peligrosos incluso en preview. Definir CSP compatible con el aislamiento; no conceder permisos excesivos al iframe. Evitar que enlaces y formularios del canvas naveguen o envíen datos mientras se edita.

La selección, arrastre y edición deben ser utilizables con teclado; gestionar foco al borrar nodos y anunciar errores con regiones accesibles. Los atajos no interceptan escritura en campos. Respetar reducción de movimiento. Medir tiempos de carga, edición y guardado con documentos pequeños y cercanos al límite del servidor; acordar presupuestos después de establecer una línea base reproducible.

## Pruebas y aceptación

- Unitarias: comandos e inversas, agrupación de historial, referencias tras duplicación, ciclos, IDs repetidos y límites.
- Integración: cargar → editar → guardar → recargar preserva documento; errores HTTP no pierden cambios; conflicto exige resolución explícita.
- Navegador: mismo editor montado en HTML simple y en otro host; dos instancias simultáneas sin cruzar selección ni sesiones.
- Accesibilidad: crear, ordenar, editar y guardar una página sin ratón; foco estable después de operaciones destructivas.
- Seguridad: payloads de HTML, mensajes de iframe no autorizados y URLs maliciosas son rechazados.
- Flujo de aceptación: un autor crea una página con contenedores anidados, texto e imagen, cambia layout por viewport, deshace una operación, guarda y obtiene el mismo resultado publicado mediante el renderer del servidor.

## Migración y despliegue

Activar mediante capacidad/feature flag del host. Los documentos actuales deben abrirse conservando tipos y propiedades desconocidas, con edición restringida donde no exista control compatible. No sustituir silenciosamente un componente por otro. Desplegar APIs compatibles antes del cliente; rollback del editor debe seguir permitiendo lectura del contenido guardado o bloquear explícitamente versiones incompatibles.

## Integración obligatoria con el host

Auditar primero CmsPageBuilder y PageEditorBuilder.svelte en Campus. La UI distribuida por el módulo es opcional; el host puede mantener su editor. Módulos ES/Web Component son una propuesta de distribución que debe contrastarse con la integración actual antes de implementarse. Véase [00: integración en sistemas existentes](00-integracion-en-sistemas-existentes.md).
