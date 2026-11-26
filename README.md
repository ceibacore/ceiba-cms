# Ceiba CMS

Ceiba CMS es un motor de gestión de contenidos (CMS) headless y desacoplado, diseñado bajo los principios de **Clean Architecture** y **Hexagonal Architecture**. Es compatible con cualquier aplicación host (como Laravel) y está estructurado en módulos para la gestión de páginas, menús de navegación, elementos multimedia, autenticación y SEO.

---

## Características Principales

- **Arquitectura Limpia e Independiente**: Capa de dominio protegida de librerías externas o detalles de infraestructura de bases de datos.
- **Virtual DOM Semántico**: Estructura de componentes y páginas almacenada en DB como VDOM agnóstico del framework de diseño.
- **Motor de Importación de HTML Inteligente**: Conversión en tiempo real de cadenas HTML/PHP a nodos VDOM con caché inteligente y soporte contextual.
- **Generación de Módulos Dinámicos**: Creación de tablas de base de datos físicas y endpoints CRUD sobre la marcha en tiempo de ejecución.
- **Renderizado SSR y compilación en disco**: Compilación y caché asíncrona de páginas y loops a plantillas PHP y Blade optimizadas.

---

## Documentación

La guía de integración y la documentación técnica del módulo son internas del equipo de Ceiba y no se publican en
este repositorio. Si integras el módulo en un sistema propio, solicítala al equipo de Ceiba.

## Ejecución de Pruebas

Para asegurar la estabilidad del sistema tras cualquier cambio en la infraestructura, ejecuta la suite de pruebas unitarias y de integración de PHPUnit:

```bash
php vendor/bin/phpunit
```
