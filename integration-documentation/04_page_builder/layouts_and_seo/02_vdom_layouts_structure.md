# VDOM Layout Structure & Component Tree

This document outlines how layouts in Lemur CMS are constructed dynamically using the internal Virtual DOM (VDOM) node tree system. This allows administrative templates, headers, and footers to be edited as flexible, component-based structures rather than static files.

---

## 1. Concept of VDOM in Layouts

A **Page Layout** in Lemur CMS is not just database metadata; it holds executable interface structures. Layout components are declared as a VDOM node tree, which the renderer parses recursively.

Specifically, the footer of the layout (`footer_tree`) is stored in the `page_layouts` table as a JSON array of node definitions, identical to how a standard page's content is modeled. This enables admins to build rich, multi-column footers with links, paragraphs, and images using standard builder blocks.

---

## 2. VDOM Node Schema

A node in a layout's VDOM tree matches the standard node interface.

### 2.1 Node Object Interface
```json
{
  "id": "uuid-v4-node-identifier",
  "type": "component_type_or_html_tag",
  "name": "optional_component_override_name",
  "props": {
    "class": "custom-css-class",
    "content": "Text content of the node",
    "attributes": "Other key-value properties mapping to HTML attributes"
  },
  "children": [
    {
      "id": "child-node-uuid",
      "type": "span",
      "props": {
        "content": "Nested Text"
      }
    }
  ],
  "loop": null
}
```

### 2.2 Example footer_tree JSON
Here is an example representing a two-column footer containing copyright info and quick links:

```json
[
  {
    "id": "footer-row-id",
    "type": "div",
    "props": { "class": "row py-4" },
    "children": [
      {
        "id": "col-1-id",
        "type": "div",
        "props": { "class": "col-md-6" },
        "children": [
          {
            "id": "logo-id",
            "type": "img",
            "props": { 
              "src": "/assets/logo-footer.png", 
              "alt": "Lemur CMS Logo",
              "class": "mb-2" 
            }
          },
          {
            "id": "copyright-id",
            "type": "p",
            "props": { 
              "content": "© 2026 Lemur Bookstores. Todos los derechos reservados.",
              "class": "text-muted small"
            }
          }
        ]
      },
      {
        "id": "col-2-id",
        "type": "div",
        "props": { "class": "col-md-6 text-md-end" },
        "children": [
          {
            "id": "link-1-id",
            "type": "a",
            "props": { 
              "href": "/privacy-policy", 
              "content": "Política de Privacidad",
              "class": "text-decoration-none me-3" 
            }
          },
          {
            "id": "link-2-id",
            "type": "a",
            "props": { 
              "href": "/terms", 
              "content": "Términos de Servicio",
              "class": "text-decoration-none" 
            }
          }
        ]
      }
    ]
  }
]
```

---

## 3. Dynamic Menu Linking

Rather than declaring navbar nodes directly in the VDOM of the layout, layouts link to dynamic menu entities via the `menu_slug` column.

1. The layout defines `menu_slug` (e.g. `"main-navigation"`).
2. During page load, the page controller invokes `GetNavbar::execute($menuSlug)`.
3. The menu system resolves the hierarchy from `menu_items` and renders it using `LemurMenuRenderer` to produce Bootstrap 5 navbar HTML.
4. This generated markup is injected directly as `$navbarHtml` into the layout's header placeholder.

---

## 4. Compilation & Rendering Details

The VDOM compiler (`BladeRenderer`) compiles the layout nodes recursively in PHP.

### 4.1 Recursive Rendering Sequence
Located in [BladeRenderer.php](../../../src/PageBuilder/Domain/Service/BladeRenderer.php):

1. **Loop Processing**: If a node has a `loop` definition (e.g., query lists, menu loops), the compiler queries its data source and iterates over the node.
2. **Prop Interpolation**: Dynamic variables (e.g., `{{ user.name }}` or context queries) are resolved.
3. **Children Execution**: Children array is compiled recursively to create a `childrenHtml` string.
4. **View Compilation**:
   - The engine looks for a PHP template file named after the component name/type in the active UI views directory (e.g., `views/card.php`, `views/accordion.php`).
   - If found, it includes it within an isolated scope, passing `$props`, `$slot` (holding `$childrenHtml`), and `$context`.
   - If no template exists, it falls back to rendering a standard HTML tag or custom attributes as defined.

### 4.2 Layout Rendering Code in Controller
Located in [PageRenderController.php](../../../src/Http/Controllers/PageRenderController.php#L79-L93):

```php
$footerHtml = '';
if ($layout !== null) {
    if (!empty($layout->footerTree)) {
        // Compile the VDOM tree for the layout footer
        $footerHtml = $this->bladeRenderer->renderPage($layout->footerTree, $context);
    }
    // ... Resolve navbar HTML using layout->menuSlug
}
```
This ensures that the footer is rendered using the exact same template and validation rules as the core page content.
