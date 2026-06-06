# Lemur CMS

Lemur CMS es un motor de gestión de contenidos (CMS) headless y desacoplado, diseñado bajo los principios de **Clean Architecture** y **Hexagonal Architecture**. Es compatible con cualquier aplicación host (como Laravel) y está estructurado en módulos para la gestión de páginas, menús de navegación, elementos multimedia, autenticación y SEO.

---

## Características Principales

- **Arquitectura Limpia e Independiente**: Capa de dominio protegida de librerías externas o detalles de infraestructura de bases de datos.
- **Virtual DOM Semántico**: Estructura de componentes y páginas almacenada en DB como VDOM agnóstico del framework de diseño.
- **Motor de Importación de HTML Inteligente**: Conversión en tiempo real de cadenas HTML/PHP a nodos VDOM con caché inteligente y soporte contextual.
- **Generación de Módulos Dinámicos**: Creación de tablas de base de datos físicas y endpoints CRUD sobre la marcha en tiempo de ejecución.
- **Renderizado SSR y compilación en disco**: Compilación y caché asíncrona de páginas y loops a plantillas PHP y Blade optimizadas.

---

## Índice de Documentación de Integración

Toda la documentación técnica del sistema, especificaciones de la API y guías de integración se ha consolidado en el directorio [`integration-documentation`](file:///d:/repositories/lemur-books-lms-2/lemur-cms/integration-documentation). A continuación se muestra la estructura disponible:

### 1. [Primeros Pasos (Getting Started)](file:///d:/repositories/lemur-books-lms-2/lemur-cms/integration-documentation/01_getting_started)
- **[Guía de Inicio Rápido](file:///d:/repositories/lemur-books-lms-2/lemur-cms/integration-documentation/01_getting_started/quickstart.md)**: Configuración del entorno, base de datos de pruebas y ejecución de comandos CLI.
- **[Estado de Implementación](file:///d:/repositories/lemur-books-lms-2/lemur-cms/integration-documentation/01_getting_started/status.md)**: Bitácora completa y lista de chequeo de características implementadas y aprobadas en el core del sistema.

### 2. [Arquitectura (Architecture)](file:///d:/repositories/lemur-books-lms-2/lemur-cms/integration-documentation/02_architecture)
- **[Visión General de la Arquitectura](file:///d:/repositories/lemur-books-lms-2/lemur-cms/integration-documentation/02_architecture/overview.md)**: Capas del sistema, mapeo de módulos en código y convenciones de namespaces.
- **[Arquitectura de VDOM y Renderizado Agnóstico](file:///d:/repositories/lemur-books-lms-2/lemur-cms/integration-documentation/02_architecture/vdom_architecture.md)**: Desacoplamiento del core de layouts visuales como Bootstrap o Tailwind mediante un Virtual DOM semántico.
- **[Motor de Arquitectura Dinámica V2](file:///d:/repositories/lemur-books-lms-2/lemur-cms/integration-documentation/02_architecture/v2_dynamic_engine.md)**: Especificación detallada del motor de condiciones dinámicas y consultas avanzadas sobre la marcha.

### 3. [Módulos Core (Core Modules)](file:///d:/repositories/lemur-books-lms-2/lemur-cms/integration-documentation/03_core_modules)
- **[Infraestructura de Soporte](file:///d:/repositories/lemur-books-lms-2/lemur-cms/integration-documentation/03_core_modules/support_infrastructure.md)**: Excepciones personalizadas, validadores de entidades y clases helpers utilitarias.
- **[Integración HTTP y CLI](file:///d:/repositories/lemur-books-lms-2/lemur-cms/integration-documentation/03_core_modules/integration_http_cli.md)**: Enrutador del CMS, endpoints REST del API, controladores y consola de comandos CLI.
- **[Componentes de Presentación](file:///d:/repositories/lemur-books-lms-2/lemur-cms/integration-documentation/03_core_modules/presentation_components.md)**: Renderizador de menús de navegación con caché integrada, breadcrumbs, banners dinámicos y notificaciones flash.

### 4. [Page Builder](file:///d:/repositories/lemur-books-lms-2/lemur-cms/integration-documentation/04_page_builder)
- **[Importador de HTML a Nodos VDOM](file:///d:/repositories/lemur-books-lms-2/lemur-cms/integration-documentation/04_page_builder/html_importer.md)**: Motor de conversión stateless de cadenas HTML a JSON VDOM, sistema de caché de reglas y navegación con `DomHelper`.
- **[Referencia Semántica de HTML](file:///d:/repositories/lemur-books-lms-2/lemur-cms/integration-documentation/04_page_builder/html_semantic_reference.md)**: Catálogo y especificación de etiquetas HTML5 y directivas ARIA soportadas por el motor.

### 5. [Módulos Dinámicos (Dynamic Modules)](file:///d:/repositories/lemur-books-lms-2/lemur-cms/integration-documentation/05_dynamic_modules)
- **[Creador de Módulos Dinámicos](file:///d:/repositories/lemur-books-lms-2/lemur-cms/integration-documentation/05_dynamic_modules/dynamic_module_builder.md)**: Generación automática de esquemas de tablas físicas en tiempo de ejecución, controladores genéricos CRUD e integración de loops de datos.

---

## Ejecución de Pruebas

Para asegurar la estabilidad del sistema tras cualquier cambio en la infraestructura, ejecuta la suite de pruebas unitarias y de integración de PHPUnit:

```bash
php vendor/bin/phpunit
```
