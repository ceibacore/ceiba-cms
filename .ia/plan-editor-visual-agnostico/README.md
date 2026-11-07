# Plan de evolución del editor visual agnóstico

Fecha: 2026-11-06. Estado: planificación; ninguna funcionalidad descrita queda implementada por estos documentos.

## Objetivo

Ampliar ceiba-cms con capacidades comparables a un constructor visual como Elementor, manteniendo independencia del framework anfitrión. La referencia es funcional; no se copiarán código, marca ni recursos de Elementor. La paridad completa requiere una matriz de requisitos acordada y evidencia de aceptación; este plan no certifica equivalencia con todos sus productos o extensiones.

## Base auditada y limitaciones

El repositorio contiene un núcleo PHP, árboles de nodos, catálogo de componentes, plantillas, layouts, consultas dinámicas y renderizado servidor. El catálogo y modelo existentes son puntos de extensión. La auditoría previa no identificó un editor visual frontend ni un sistema completo de revisiones, estilos adaptables, formularios o popups. Esto es inspección estática, no certificación de comportamiento mediante pruebas.

Referencias locales: `composer.json`, `routes/api.php`, `src/PageBuilder/Domain/Entity/Node.php`, `src/PageBuilder/Domain/Entity/ComponentDefinition.php` y `src/Page/Application/ListPages.php`.

## Implementaciones y orden

| Orden | Documento | Dependencias | Entrega verificable |
|---|---|---|---|
| 01 | [Contratos y arquitectura](01-contratos-y-arquitectura.md) | Ninguna | Formato versionado y puertos de integración |
| 02 | [Borradores y revisiones](02-borradores-revisiones-publicacion.md) | 01 | Guardado, conflicto, preview y publicación atómica |
| 03 | [Editor visual](03-editor-visual.md) | 01, 02; integrar 04–05 | Crear y publicar una página desde navegador |
| 04 | [Estilos adaptables y globales](04-estilos-responsive-globales.md) | 01 | Herencia y estilos compartidos coherentes |
| 05 | [Componentes y multimedia](05-componentes-y-media.md) | 01, 03, 04 | Catálogo editable y recursos seguros |
| 06 | [Theme Builder](06-theme-builder.md) | 02–05 | Partes de sitio y condiciones de aplicación |
| 07 | [Contenido dinámico](07-contenido-dinamico.md) | 01–05 | Bindings y listas configurables visualmente |
| 08 | [Formularios](08-formularios.md) | 02–05 | Envíos validados y acciones trazables |
| 09 | [Popups](09-popups.md) | 02–06 | Disparadores y accesibilidad |
| 10 | [Comercio](10-comercio.md) | 06, 07 | Integración mediante proveedor comercial |
| 11 | [Kits y extensiones](11-kits-extensiones.md) | Contratos de capacidades exportadas | Portabilidad y ampliación controlada |
| 12 | [Calidad y despliegue](12-calidad-seguridad-y-despliegue.md) | Transversal | Evidencias para local, staging y adopción |

Las dependencias de integración no obligan a terminar todo un módulo para comenzar el siguiente. En 03 se usan primero componentes mínimos; 05 amplía el catálogo. Aplicar 12 desde la primera entrega.

## Hitos

1. **Fundación:** 01–02 y validación de compatibilidad. No continuar con escrituras de producción si migración o aislamiento fallan.
2. **Primer editor utilizable:** 03–05. Crear una página con contenedores, texto, imagen y botón; adaptar a móvil, guardar, recuperar conflicto y publicar.
3. **Constructor de sitio:** 06–07. Cabecera/pie, plantillas y consultas seguras.
4. **Interacción y negocio:** 08–10. Formularios, popups y comercio con adaptadores reales o sandbox.
5. **Ecosistema:** 11 y cierre de matriz 12. Importación, extensiones y operación verificadas.

## Gestión de trabajo

Cada documento es una unidad de planificación que se descompone en PRs revisables. Usar feature/* desde develop conforme a Gitflow; commits en inglés agrupados por cambio. No fusionar sin contratos, validaciones y criterios de aceptación relevantes. Registrar por capacidad: pendiente, en desarrollo, validada local, validada staging y disponible. No asignar estimaciones de calendario sin revisar tamaño, equipo y hosts reales.

## Decisiones a resolver en implementación

Toolchain frontend y distribución; hosts de referencia; proveedor de almacenamiento y jobs; políticas de retención; proveedor comercial; fuentes de contenido externas; idiomas y estrategia de traducción; requisitos exactos de colaboración e IA. Mantener estas decisiones detrás de contratos y registrar su resolución antes de introducir dependencias irreversibles.

## Referencias funcionales oficiales consultadas en el análisis

- [Edición adaptable](https://elementor.com/help/responsive-editing/).
- [Contenedores](https://elementor.com/help/what-is-a-container/).
- [Theme Builder](https://elementor.com/help/the-elementor-theme-builder/).
- [Funciones Free y Pro](https://elementor.com/help/elementor-pro-vs-free/?level=2).
- [Estilos globales](https://developers.elementor.com/docs/data-structure/global-styles/).
- [Loop Builder](https://elementor.com/help/customize-items-in-loop/).
- [Popups](https://elementor.com/help/how-do-i-create-my-first-popup/).

Estas referencias orientan requisitos; no fijan contratos internos ni demuestran que ceiba-cms ya los soporte. Revisar su vigencia al cerrar cada implementación.
