# Implementación 11 — Kits, extensiones y funciones avanzadas

Estado: propuesta; depende de 01–07. Exportación de formularios/popups/comercio requiere sus módulos y migradores correspondientes. Las integraciones enumeradas son trabajo pendiente, no capacidades existentes.

## Alcance

Exportar/importar conjuntos de páginas, partes, tokens, componentes reutilizables y referencias a medios. Biblioteca de bloques y kits con versión. Registro de extensiones para componentes, controles, fuentes dinámicas y acciones. Duplicación entre sitios con reasignación de IDs y revisión de enlaces. La importación HTML actual se conserva como flujo distinto: no garantiza importar proyectos Elementor ni archivos de sus productos.

## Formato y contratos propuestos

Un kit contiene `manifest.json` con formatVersion, kitId, version, requiredCapabilities, entries, checksums y metadatos de licencia/procedencia. Cada entrada declara ruta, tipo, versión de esquema y dependencias. Assets llevan checksum y metadatos; no incluir credenciales, envíos, carritos ni datos personales. Los IDs internos se traducen mediante mapa explícito de importación.

`KitImporter.plan()` genera un informe de cambios, dependencias ausentes, conflictos y tamaño previsto sin mutar datos. `apply(planId, expectedSiteRevision)` aplica un plan inmutable autorizado y vigente. Si cambia el sitio o paquete, exige regenerar plan. Estrategias explícitas: crear copias, reemplazar IDs seleccionados o cancelar; nunca sobrescribir por coincidencia de título.

`ExtensionDescriptor` declara id, version, compatibleSchemaRange, capabilities y entrypoints. Registro PHP depende de instalación confiable del operador; un archivo de kit no instala ni ejecuta PHP/JavaScript. Assets del editor se distribuyen por el pipeline autorizado, con política CSP y compatibilidad documentada.

## Pasos de implementación

1. Fijar formato y resolver grafo de dependencias con detección de ciclos y referencias ausentes.
2. Implementar exportador de revisiones seleccionadas y exclusión de secretos/datos personales.
3. Implementar lectura segura, validación de checksum y dry-run con reporte legible.
4. Añadir staging de assets, transacción de metadatos y compensación de objetos si falla la aplicación.
5. Crear biblioteca y UI de conflictos; mostrar dependencias y licencias antes de aplicar.
6. Añadir registro de extensiones, pruebas contractuales y matriz de versiones soportadas.
7. Incorporar migradores explícitos entre versiones y fixtures permanentes de kits antiguos.

## Seguridad y recuperación

Rechazar path traversal, enlaces simbólicos, rutas absolutas, archivos excesivos y bombas de descompresión. Límites se aplican tanto al tamaño comprimido como al expandido. Checksums detectan corrupción; no autentican al autor. Si hay distribución remota confiable, introducir firmas y un registro de claves como implementación específica. La descarga remota pasa por política SSRF. Importar siempre como borrador salvo publicación autorizada posterior. Conservar auditoría del plan, autor y resultados.

## Pruebas y aceptación

Exportar/importar conserva referencias, estilos y renderizado esperado en otro sitio. Una colisión no sobrescribe contenido sin selección explícita. Dependencia desconocida produce bloqueo o placeholder seguro declarado en el reporte. Fallos intermedios no dejan registros publicados ni assets huérfanos permanentes. Kits maliciosos no escriben fuera de staging. Revertir restaura revisiones previas sin borrar contenido creado posteriormente por otros usuarios.

## Backlog avanzado que requiere documentos propios antes de implementar

| Capacidad | Contrato y decisión pendientes | Condición de entrada |
|---|---|---|
| Asistente IA de texto, imágenes y layouts | `AiProvider`, cuotas, consentimiento, retención, moderación y procedencia; resultado validado como borrador | Elegir proveedor y presupuesto; nunca ejecutar código generado directamente |
| Marketing y experimentos A/B | Proveedor analítico, consentimiento, asignación estable y métricas definidas | Aprobar modelo de medición y tratamiento de datos |
| Notas y colaboración | Comentarios anclados a ID/revisión; permisos, menciones y auditoría | Revisiones estables; tiempo real requiere diseño separado de conflictos |
| Flujos de aprobación editorial | Estados, roles, transiciones y segregación publicación/edición | Puerto de identidad/permisos operativo |
| Traducción asistida | Proveedor y referencias entre revisiones por idioma | Política de fallback y traducción validada |
| Motion effects, sliders y contenido interactivo | Runtime accesible, límites y movimiento reducido | Catálogo básico estable y presupuesto de rendimiento |
| Código personalizado | Política por rol, CSP, aislamiento y auditoría | Diseño explícito de ejecución confiable; no habilitar en kits por defecto |

Esta lista evita declarar paridad total prematuramente. Cada capacidad necesita inventario funcional verificable, pruebas y un documento de implementación adicional cuando se seleccione. El alcance de productos externos y servicios comerciales debe verificarse en sus fuentes oficiales antes de comprometer equivalencia.

## Despliegue

Comenzar por exportación y dry-run; después importación de kits internos. Activar extensiones individualmente con compatibilidad verificada. Reversión desactiva registro/runtime y restaura revisiones; no elimina automáticamente datos cuyo renderer podría volver a instalarse.

## Integración obligatoria con el host

Los kits transfieren contenido del CMS, no configuración privada del host. La instalación de extensiones y dependencias pertenece al despliegue del consumidor. Véase [00: integración en sistemas existentes](00-integracion-en-sistemas-existentes.md).
