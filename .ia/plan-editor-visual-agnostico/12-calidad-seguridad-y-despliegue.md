# 12. Calidad, seguridad y despliegue

Estado: plan de validación, no evidencia de pruebas ejecutadas. Transversal desde 01; cierre de cada entrega y de la integración completa.

## Matriz de validación

| Nivel | Escenario | Resultado exigido |
|---|---|---|
| Dominio | Migración de árbol antiguo y estilos heredados | Sin pérdida silenciosa; resultado determinista |
| API | Dos editores guardan simultáneamente | Conflicto explícito, sin sobrescritura |
| API | Actor intenta leer, copiar, publicar o exportar recursos de otro sitio | Denegación consistente y sin filtraciones |
| Render | Documento con HTML, URL, SVG o CSS malicioso | Rechazo o sanitización contextual |
| Publicación | Falla DB o caché durante publicación | Estado atómico; invalidación recuperable |
| Navegador | Crear, mover, editar, deshacer, guardar, recargar, publicar | Árbol persistido y render público coherentes |
| Navegador | Red interrumpida y reconectada | Estado visible y recuperación sin duplicación |
| Integración | Host neutral y host con adaptador | Mismos contratos y reglas de autorización |
| Recursos | Archivo falso, sobredimensionado o importación con traversal | Rechazo antes de extracción o publicación |
| Formularios | Reintento de envío y webhook | Idempotencia y trazabilidad |
| Comercio | Precio o checkout manipulados desde cliente | Autoridad del proveedor comercial |

## Infraestructura local

Proporcionar host mínimo reproducible con almacenamiento temporal, base de datos compatible, correo capturado y proveedor de comercio simulado. Seeds con dos sitios, usuarios de permisos diferentes, borradores y páginas publicadas. Secretos fuera de fixtures. Comandos de instalación y pruebas deberán documentarse cuando se determine el toolchain real del editor; no presentar comandos aún inexistentes como disponibles.

El proyecto dispone de dependencia PHPUnit en composer.json. Seleccionar runner de navegador durante 03, fijar versión y lockfile. Separar pruebas unitarias de dominio, contratos HTTP, persistencia y recorrido de navegador. Cada corrección debe añadir una regresión que reproduzca el fallo, sin duplicar mecánicamente la implementación.

## Accesibilidad y experiencia

Objetivo: WCAG 2.2 AA para las interacciones del editor y componentes suministrados, sujeto a auditoría. Validar teclado, foco tras mover/eliminar, lector de pantalla, anuncios de guardado y conflicto, contraste, reduced-motion y alternativas a drag-and-drop. Combinar pruebas automáticas con revisión manual; un escáner aprobado no demuestra conformidad completa.

## Rendimiento

Medir una línea base antes de fijar presupuestos definitivos: tiempo de apertura, cambio de selección, guardar, render y tamaño de assets. Escenarios con árboles pequeños, medianos y cercanos al límite admitido. Registrar p50/p95, entorno y tamaño del documento. Evitar consultas por nodo, cargar componentes bajo demanda y cachear por sitio, revisión, idioma y contexto permitido. No compartir caché de contenido personalizado entre usuarios.

## Staging

Usar datos ficticios, dominios y credenciales independientes, correo en sandbox y pagos de prueba. Ejecutar migración desde una copia anonimizada, dry-run, respaldo, publicación, invalidación y restauración. Validar restricciones reales del host: CSP, CORS, cookies, CSRF y límites de subida. Exponer health checks sin secretos.

## Criterios de salida por implementación

- Contratos y migraciones revisados; casos felices y fallos relevantes cubiertos.
- Flujo de usuario funcional, no solo endpoints disponibles.
- Autorización por recurso y sitio demostrada.
- Documentos anteriores conservan lectura y render.
- Eventos, métricas y errores permiten diagnosticar fallos sin capturar datos sensibles.
- Feature flag y recuperación verificados antes de ampliación del despliegue.

## Entrega gradual

Primero host local, luego staging, después sitios internos y finalmente adopción por cohortes. Flags por capacidad y sitio; desactivar una capacidad debe preservar sus datos y mostrar un estado recuperable. Registrar versión de código, migraciones, contrato y resultado de validación por entrega. No declarar paridad total con Elementor hasta cerrar una matriz versionada de requisitos y sus evidencias.
