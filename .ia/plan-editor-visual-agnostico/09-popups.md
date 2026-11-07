# Implementación 09 — Popups y reglas de interacción

Estado: propuesta pendiente. Dependencias: 01–05; 06 para condiciones de ubicación; 08 si incorpora formularios.

## Entregable

Editor de popups basado en el mismo árbol de componentes, con modal, panel lateral y barra informativa. Configurar ubicación, tamaño adaptable, overlay, cierre, animación, disparadores y frecuencia. Incluir preview que permite probar reglas sin alterar contadores reales.

## Contratos propuestos

`PopupDefinition`: siteId, id, publishedRevisionId, placement, triggers, audienceRules, frequency, priority y accessibility. Disparadores iniciales: click de un elemento registrado, demora, porcentaje de scroll y entrada de elemento en viewport. Intención de salida será mejora opcional limitada a dispositivos compatibles; no inferir soporte equivalente en móvil.

`PopupRuntimeAdapter` obtiene manifiesto público de popups ya autorizados para la ruta. El manifiesto no incluye condiciones privadas ni borradores. `PopupStateStore` abstrae estado de sesión/local según consentimiento y política del host. Si almacenamiento está bloqueado, degradar a memoria de sesión sin fallo de renderizado. Una definición de frecuencia expresa alcance, periodo y máximo; no promete exactitud entre dispositivos anónimos.

API administrativa propuesta `/api/builder/v1/popups`; manifiesto público versionado `/api/popups/manifest`. Un solo coordinador de overlays aplica prioridad y evita modales simultáneos; cerrar uno no dispara inmediatamente el siguiente sin regla explícita.

## Trabajo requerido

1. Crear esquema de reglas tipadas y validador; rechazar selectores arbitrarios inseguros usando IDs de acción registrados.
2. Reutilizar revisión, publicación, árbol y estilos; introducir renderer de overlay.
3. Implementar motor de disparadores con lifecycle, limpieza de listeners y navegación cliente del host.
4. Implementar foco inicial, contención de foco, Escape, retorno al invocador y etiquetas accesibles.
5. Añadir controles de frecuencia y adaptación al consentimiento; no registrar datos identificables por defecto.
6. Construir inspector y modo simulación de disparadores, viewport y audiencia.
7. Exponer eventos opcionales de apertura/cierre/conversión mediante adaptador analítico.

## Seguridad y experiencia

No usar popups para controles de autorización. El contenido confidencial debe filtrarse en servidor antes del manifiesto. Sanitizar HTML, enlaces y estilos según contratos comunes. Respetar preferencias de movimiento reducido; no bloquear permanentemente navegación ni lectura. Auditar impresión y lectores de pantalla para que contenido oculto no sea anunciado como visible.

## Pruebas y aceptación

Verificar triggers con reloj y scroll controlados, límites de frecuencia, almacenamiento deshabilitado, consentimiento revocado y cambio de ruta. Dos reglas coincidentes producen una sola apertura. Teclado puede cerrar y recuperar el foco. Una página sin popups no carga runtime innecesario. Preview no incrementa métricas ni frecuencia. Revisiones de otro sitio y borradores no aparecen en manifiesto.

## Activación y reversión

Bandera por sitio, primer despliegue con trigger de click y después triggers automáticos. Desactivar manifiesto de una revisión revierte sin editar páginas. Invalidar caché del manifiesto al publicar/despublicar y limpiar listeners al desmontar runtime.

## Integración obligatoria con el host

El host decide montaje, navegación y consentimiento. Runtime desacoplado de Svelte/Laravel; no exigir incluir las rutas del módulo. Véase [00: integración en sistemas existentes](00-integracion-en-sistemas-existentes.md).
