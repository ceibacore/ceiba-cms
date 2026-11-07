# 05. Catálogo de componentes y biblioteca de medios

Estado: propuesta pendiente. Dependencias: 01, 03 y 04. El catálogo actual se describe en `src/PageBuilder/Domain/Entity/ComponentDefinition.php` mediante ID, tipo, etiqueta, categoría, icono, propiedades predeterminadas, esquema, contenedor y soporte de loop. Existe un módulo de referencia Bootstrap5; no debe convertirse en dependencia obligatoria del editor.

## Objetivo

Ofrecer componentes extensibles con controles coherentes, renderizado seguro y comportamiento accesible. Proporcionar selección, carga y reutilización de medios mediante adaptadores de almacenamiento, con referencias estables desde páginas, plantillas y diseños globales.

## Contrato de componente propuesto

Extender el descriptor con identificador estable con namespace, versión, esquema de propiedades, controles de edición, capacidades, slots admitidos, restricciones de hijos, bindings aceptados y dependencias de assets. Mantener separados el `type` de etiqueta HTML del nodo y la identidad del componente; no reinterpretar documentos existentes sin migración.

Cada componente debe declarar renderer de servidor, representación de edición, esquema de estilos permitido y migraciones entre versiones. El registro de plugins pertenece al host; el contenido de una página no puede registrar funciones PHP/JavaScript ni cargar módulos remotos arbitrarios.

Los controles admitidos inicialmente son texto, texto enriquecido saneado, número, selector, booleano, enlace, color, dimensiones, media y repetidor. El backend valida el mismo esquema independientemente del editor. Registrar controles personalizados requiere versión de API y fallback legible para clientes que no los soporten.

## Catálogo incremental

| Entrega | Componentes | Requisitos adicionales |
|---|---|---|
| Inicial | Contenedores Flex/Grid, título, texto, imagen, botón/enlace, separador y espaciador | Edición por teclado, HTML semántico y responsive |
| Contenido | Icono, lista, tarjeta, cita, galería y vídeo | Medios tipados, derechos/atribución cuando corresponda y embeds permitidos |
| Interacción | Pestañas, acordeón, carrusel, menú y búsqueda | Foco, estado accesible, eventos y comportamiento sin editor |
| Datos | Lista dinámica, paginación y tarjeta de entidad | Contratos de 07 y estados vacío/error |
| Especializados | Formulario, popup y producto | Contratos de 08, 09 y 10; no duplicar lógica de dominio |

No incluir todos los widgets como un bloque monolítico. Cada componente tiene ficha de soporte, propiedades, restricciones y casos de aceptación. Las animaciones respetan reducción de movimiento; vídeos y embeds no deben provocar solicitudes a terceros sin la política del host.

## Medios: modelo y API propuestos

Activo: ID, ámbito del sitio, tipo MIME detectado, tamaño, hash, dimensiones, estado de procesamiento, ubicación de almacenamiento y variantes. Metadatos editables: nombre, descripción, texto alternativo, crédito y licencia cuando aplique. El texto alternativo puede sobrescribirse por uso porque depende del contexto.

Operaciones lógicas: listar con filtros/paginación, iniciar carga, completar y validar carga, consultar estado, actualizar metadatos, obtener variantes, consultar usos y eliminar. Las rutas se acuerdan con 01; no dar por existentes endpoints de medios. Soportar un adaptador local de referencia y un puerto para almacenamiento de objetos sin acoplar el dominio a un proveedor.

Los nodos guardan `assetId` y selección de variante, no URLs temporales firmadas. El renderer resuelve la URL final según permisos y política de entrega. Para medios privados, impedir que una URL de preview termine en la página pública o en una cache compartida.

## Flujo de carga y procesamiento

1. Autorizar carga y reservar cuota; limitar cantidad/tamaño y nombre de archivo.
2. Recibir en área no pública, calcular hash y detectar MIME por contenido.
3. Rechazar tipos no permitidos y discrepancias relevantes; procesar SVG solo con saneamiento definido o deshabilitarlo inicialmente.
4. Crear variantes de imagen con límites de dimensiones y recursos; corregir orientación y tratar metadatos sensibles según política.
5. Publicar el activo solo tras validación. Reintentos deben ser idempotentes; registrar error recuperable sin dejar un activo aparentemente listo.
6. Mantener referencias para impedir borrados accidentales. Eliminar un activo usado requiere reemplazo o decisión explícita; limpiar objetos huérfanos mediante tarea controlada.

La descarga remota por URL no forma parte del flujo inicial. Si se añade, deberá incluir controles SSRF, límites, validación de redirecciones y aislamiento del procesador.

## Extensiones y degradación

Un componente desconocido debe mostrarse como bloque no editable con sus datos preservados. Informar dependencias ausentes antes de publicar; nunca borrar silenciosamente sus hijos. Los assets de interacción se cargan una sola vez por versión y solo cuando se necesitan. Un fallo de JavaScript debe conservar contenido legible cuando la semántica lo permita.

## Pruebas y aceptación

Probar validación de cada descriptor, defaults compatibles con su esquema, migración de versiones, restricciones de hijos y renderizado con escaping. Verificar un componente añadido por un host sin modificar el núcleo. Comparar componentes equivalentes bajo adaptador Bootstrap y renderer neutral.

Para medios, cubrir archivo válido, MIME falso, tamaño excesivo, SVG activo, procesamiento fallido, reintento, acceso entre ámbitos, eliminación con referencias y restauración. Probar imágenes responsive con dimensiones reservadas para evitar saltos de layout. El flujo de aceptación permite cargar una imagen, describirla, insertarla, reutilizarla y reemplazarla sin romper referencias ni exponer un activo privado.

## Migración y rollout

Inventariar esquemas/componentes existentes antes de ampliar el contrato. Mantener IDs y rutas públicas actuales. Añadir metadatos mediante campos opcionales y backfill repetible; convertir URLs heredadas a referencias solo cuando se pueda identificar inequívocamente el activo. Habilitar nuevos tipos por capacidades del sitio y observar errores de renderizado y procesamiento antes de ampliar el catálogo.

## Integración obligatoria con el host

Integrar mediante adaptadores los selectores y controladores de medios existentes de Campus. No exigir sustituir almacenamiento o biblioteca del host para usar el catálogo. Véase [00: integración en sistemas existentes](00-integracion-en-sistemas-existentes.md).
