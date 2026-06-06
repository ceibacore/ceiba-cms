# Page Builder - Layouts, SEO & CDN Integration Documentation

This folder contains the technical specifications and documentation for the Presentation, Layout, and SEO subsystems in Lemur CMS.

## Documents Index

### 1. [Page-to-Layout Integration](file:///d:/repositories/lemur-books-lms-2/lemur-cms/integration-documentation/04_page_builder/layouts_and_seo/01_page_layouts_integration.md)
* Architectural roles of page content VDOM, templates, and layouts.
* Database schemas (`page_layouts` and foreign keys in `pages`).
* Detailed request lifecycle flow showing how a visitor request resolves layouts and components.

### 2. [VDOM Layouts & Component Tree](file:///d:/repositories/lemur-books-lms-2/lemur-cms/integration-documentation/04_page_builder/layouts_and_seo/02_vdom_layouts_structure.md)
* Structure of dynamic, component-based layout wrappers (footer trees, menus).
* Concrete examples of layout VDOM node structures.
* Recursive compiling logic handled by the system's `BladeRenderer`.

### 3. [SEO & Metadata System](file:///d:/repositories/lemur-books-lms-2/lemur-cms/integration-documentation/04_page_builder/layouts_and_seo/03_seo_metadata_system.md)
* Polymorphic SEO schema configuration linking metadata to any CMS resource.
* Detailed analysis of existing integration gaps in page rendering.
* Proposed update plan to read and render rich meta tags and dynamic language codes.

### 4. [CDN & Asset Injection](file:///d:/repositories/lemur-books-lms-2/lemur-cms/integration-documentation/04_page_builder/layouts_and_seo/04_cdn_asset_injection.md)
* Requirements for dynamic head and body CDN loading per layout.
* DB schema migration proposal (`head_cdn`, `body_cdn`).
* Fallback configuration mechanics to auto-load Bootstrap 5 when custom CDNs are absent.
