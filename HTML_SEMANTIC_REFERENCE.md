# Guía Completa de Elementos HTML — Semántica, Reglas, Atributos y Accesibilidad

> **Fuentes:** HTML Living Standard (WHATWG) · WAI-ARIA 1.2 (W3C) · MDN Web Docs
> **Propósito:** Referencia para construir HTML correcto, semántico y accesible
> **Principio rector:** "Usa el elemento HTML correcto para el trabajo correcto. La presentación es responsabilidad del CSS; el significado es responsabilidad del HTML."

---

## Índice

1. [Reglas Fundamentales del HTML Semántico](#1-reglas-fundamentales-del-html-semántico)
2. [Estructura de esta Guía](#2-estructura-de-esta-guía)
3. [Estructura del Documento](#3-estructura-del-documento)
4. [Secciones y Agrupación de Contenido](#4-secciones-y-agrupación-de-contenido)
5. [Encabezados](#5-encabezados)
6. [Texto en Línea — Semántica](#6-texto-en-línea--semántica)
7. [Texto en Línea — Presentacional](#7-texto-en-línea--presentacional)
8. [Listas](#8-listas)
9. [Tablas](#9-tablas)
10. [Formularios](#10-formularios)
11. [Media — Imágenes, Video, Audio](#11-media--imágenes-video-audio)
12. [Elementos Interactivos](#12-elementos-interactivos)
13. [Scripting y Embebido](#13-scripting-y-embebido)
14. [Metadatos del Documento](#14-metadatos-del-documento)
15. [Atributos Globales](#15-atributos-globales)
16. [Atributos de Accesibilidad — ARIA](#16-atributos-de-accesibilidad--aria)
17. [Reglas de Accesibilidad — ARIA Roles](#17-reglas-de-accesibilidad--aria-roles)
18. [Errores Comunes y Cómo Evitarlos](#18-errores-comunes-y-cómo-evitarlos)
19. [Mapa Mental — Estructura de Página Correcta](#19-mapa-mental--estructura-de-página-correcta)

---

## 1. Reglas Fundamentales del HTML Semántico

Estas reglas aplican a todo el documento. Son la base de un HTML correcto.

```
REGLA 1 — Usa el elemento correcto para el contenido correcto
  ✅ <button> para acciones
  ✅ <a> para navegación
  ✅ <h1>-<h6> para jerarquía de contenido
  ❌ <div onclick> para simular botones
  ❌ <b> para crear títulos visualmente grandes

REGLA 2 — El HTML comunica estructura; el CSS comunica presentación
  El HTML no debe usarse para hacer que algo "se vea" de cierta forma.
  Si algo "se ve" como un título pero no lo es conceptualmente, no uses <h1>.

REGLA 3 — Nunca saltes niveles de encabezado
  ✅ h1 → h2 → h3
  ❌ h1 → h3 (saltarse h2 rompe la jerarquía para lectores de pantalla)

REGLA 4 — Solo un <h1> por página (en la mayoría de los casos)
  El h1 describe el tema principal de la página.
  En aplicaciones complejas puede haber más, pero con roles de sección explícitos.

REGLA 5 — Los elementos de bloque no van dentro de elementos en línea
  ✅ <p>Texto con <strong>énfasis</strong></p>
  ❌ <span><p>Texto</p></span>

REGLA 6 — ARIA es el último recurso, no el primero
  Primero intenta con HTML semántico nativo.
  "Si puedes usar un elemento HTML nativo con la semántica que necesitas, úsalo."
  — WAI-ARIA Authoring Practices Guide

REGLA 7 — No cambies el rol nativo de un elemento sin justificación
  ❌ <h2 role="button"> — confunde a los lectores de pantalla

REGLA 8 — Todo elemento interactivo debe ser accesible por teclado
  Botones, links, formularios: navegables con Tab, activables con Enter/Space.

REGLA 9 — Las imágenes informativas necesitan texto alternativo
  ✅ <img alt="Descripción del contenido">
  ✅ <img alt=""> para imágenes decorativas (alt vacío, no ausente)

REGLA 10 — El orden del DOM debe coincidir con el orden visual
  Un usuario de lector de pantalla sigue el orden del HTML, no el CSS.
```

---

## 2. Estructura de esta Guía

Cada elemento usa el siguiente formato:

```
### <etiqueta>
Significado semántico: qué comunica al navegador y tecnología asistiva
Categoría: block | inline | void | interactive | metadata
¿Permite hijos?: sí / no / condicional
Hijos permitidos: lista de elementos válidos dentro
Hijos NO permitidos: restricciones importantes
Hijos recomendados: los más apropiados semánticamente
Dónde usarlo: contextos correctos de uso
Dónde NO usarlo: errores comunes
Atributos principales: los más relevantes del elemento
Atributos de accesibilidad: aria-* recomendados
Rol ARIA implícito: el rol que el elemento ya tiene por defecto
```

---

## 3. Estructura del Documento

---

### `<html>`

| Campo | Valor |
|-------|-------|
| Significado | Elemento raíz de todo documento HTML |
| Categoría | Raíz |
| ¿Permite hijos? | Sí — solo `<head>` y `<body>` |
| Hijos permitidos | `<head>`, `<body>` |
| Hijos NO permitidos | Cualquier otro elemento directamente |
| Dónde usarlo | Una sola vez, como raíz del documento |
| Dónde NO usarlo | Nunca anidarlo |

**Atributos principales:**

| Atributo | Descripción | Ejemplo |
|----------|-------------|---------|
| `lang` | Idioma del documento — **obligatorio** | `lang="es"` |
| `dir` | Dirección del texto | `dir="ltr"` / `dir="rtl"` |

**Regla crítica:** `lang` es obligatorio. Sin él, los lectores de pantalla no pueden pronunciar correctamente el contenido.

---

### `<head>`

| Campo | Valor |
|-------|-------|
| Significado | Contenedor de metadatos del documento (no visible) |
| Categoría | Metadata |
| ¿Permite hijos? | Sí |
| Hijos permitidos | `<title>`, `<meta>`, `<link>`, `<style>`, `<script>`, `<base>`, `<noscript>` |
| Hijos NO permitidos | Elementos de contenido (`<p>`, `<div>`, etc.) |

**Atributos principales:** Ninguno propio. Usa los de sus hijos.

---

### `<title>`

| Campo | Valor |
|-------|-------|
| Significado | Título del documento — aparece en la pestaña del navegador y es el primer texto que leen los lectores de pantalla al cargar la página |
| Categoría | Metadata |
| ¿Permite hijos? | Solo texto plano |
| Dónde usarlo | Dentro de `<head>`, una sola vez |

**Regla:** El título debe describir la página específica, no solo el sitio. Formato recomendado: `"Nombre de la página — Nombre del sitio"`.

---

### `<body>`

| Campo | Valor |
|-------|-------|
| Significado | Todo el contenido visible de la página |
| Categoría | Raíz de contenido |
| ¿Permite hijos? | Sí — prácticamente cualquier elemento de contenido |
| Hijos NO permitidos | `<head>`, otro `<body>` |

**Atributos de accesibilidad:**

| Atributo | Uso |
|----------|-----|
| `aria-label` | Raramente necesario en body |

---

## 4. Secciones y Agrupación de Contenido

Estos elementos definen la **estructura semántica** de la página. Son fundamentales para la navegación con lectores de pantalla.

---

### `<header>`

| Campo | Valor |
|-------|-------|
| Significado | Encabezado introductorio de la página o de una sección. Puede contener logo, navegación, título de la sección. |
| Categoría | Bloque — Landmark semántico |
| ¿Permite hijos? | Sí |
| Hijos permitidos | Cualquier elemento de flujo excepto `<footer>` y otro `<header>` |
| Hijos recomendados | `<nav>`, `<h1>`-`<h6>`, `<p>`, `<img>`, `<form>` (buscador) |
| Hijos NO permitidos | `<header>` anidado, `<footer>` anidado |
| Dónde usarlo | Como encabezado del `<body>` (global) o de `<article>`, `<section>` |
| Dónde NO usarlo | Dentro de `<address>` o de otro `<header>` |
| Rol ARIA implícito | `banner` (cuando es hijo directo de `<body>`) / `generic` (cuando está en `<article>` o `<section>`) |

**Atributos de accesibilidad:**

| Atributo | Cuándo usar |
|----------|-------------|
| `aria-label` | Si hay múltiples `<header>` en la página para distinguirlos: `aria-label="Encabezado del artículo"` |

---

### `<nav>`

| Campo | Valor |
|-------|-------|
| Significado | Bloque de navegación principal. Solo para grupos de links de navegación importantes, no para todos los links de la página. |
| Categoría | Bloque — Landmark semántico |
| ¿Permite hijos? | Sí |
| Hijos recomendados | `<ul>` con `<li>` y `<a>`, o `<a>` directamente |
| Hijos NO permitidos | No hay restricción técnica, pero semánticamente debe contener links |
| Dónde usarlo | Menú principal, paginación, breadcrumbs, menú de sección |
| Dónde NO usarlo | Para un grupo de links en el pie de página que no son "navegación principal" — usar `<footer>` directamente |
| Rol ARIA implícito | `navigation` |

**Atributos de accesibilidad:**

| Atributo | Cuándo usar |
|----------|-------------|
| `aria-label` | Cuando hay múltiples `<nav>` en la página: `aria-label="Navegación principal"`, `aria-label="Navegación de pie de página"` |
| `aria-labelledby` | Apuntar al `<h2>` que titula esa navegación |

**Ejemplo correcto:**
```html
<nav aria-label="Navegación principal">
  <ul>
    <li><a href="/">Inicio</a></li>
    <li><a href="/blog">Blog</a></li>
  </ul>
</nav>
```

---

### `<main>`

| Campo | Valor |
|-------|-------|
| Significado | Contenido principal y único de la página. Excluye header, footer, nav lateral. |
| Categoría | Bloque — Landmark semántico |
| ¿Permite hijos? | Sí — cualquier contenido de flujo |
| Cuántos por página | **Solo uno visible a la vez** |
| Dónde usarlo | Una sola vez por página, envolviendo el contenido único de esa vista |
| Dónde NO usarlo | Dentro de `<article>`, `<aside>`, `<footer>`, `<header>`, `<nav>` |
| Rol ARIA implícito | `main` |

**Atributos de accesibilidad:**

| Atributo | Cuándo usar |
|----------|-------------|
| `id="main-content"` | Para el link "Saltar al contenido" (`<a href="#main-content">`) — crítico para accesibilidad de teclado |

---

### `<article>`

| Campo | Valor |
|-------|-------|
| Significado | Contenido independiente y autocontenido. Puede distribuirse o reutilizarse por sí solo: post de blog, artículo de noticias, comentario, card de producto, widget. |
| Categoría | Bloque — Sección |
| ¿Permite hijos? | Sí |
| Hijos recomendados | `<header>`, `<h2>`-`<h6>`, `<p>`, `<footer>`, `<section>`, `<figure>`, `<address>` |
| Dónde usarlo | Post de blog, noticia, comentario, item de feed, card de producto |
| Dónde NO usarlo | Para secciones que no son autocontenidas (usa `<section>`) |
| Rol ARIA implícito | `article` |

**Regla:** Si puedes sindicar el contenido (RSS, API) de forma independiente, es un `<article>`. Si no puede existir por sí solo, es una `<section>`.

**Atributos de accesibilidad:**

| Atributo | Cuándo usar |
|----------|-------------|
| `aria-labelledby` | Apuntar al `<h2>` dentro del artículo para nombrarlo |

---

### `<section>`

| Campo | Valor |
|-------|-------|
| Significado | Agrupación temática de contenido dentro de un documento. Debe tener un encabezado. |
| Categoría | Bloque — Sección |
| ¿Permite hijos? | Sí |
| Hijos recomendados | Siempre debe iniciar con `<h2>`-`<h6>` como primer hijo significativo |
| Dónde usarlo | Capítulos de un artículo, secciones de una landing page (Hero, Features, Pricing) |
| Dónde NO usarlo | Como sustituto de `<div>` cuando no hay semántica que comunicar. Si no tiene encabezado, probablemente es un `<div>`. |
| Rol ARIA implícito | `region` (si tiene `aria-label` o `aria-labelledby`) / `generic` (si no) |

**Atributos de accesibilidad:**

| Atributo | Cuándo usar |
|----------|-------------|
| `aria-labelledby` | Apuntar al encabezado de la sección — convierte la sección en landmark navegable |
| `aria-label` | Si no hay encabezado visible pero la sección tiene significado propio |

---

### `<aside>`

| Campo | Valor |
|-------|-------|
| Significado | Contenido tangencialmente relacionado con el contenido que lo rodea. Sidebar, notas al margen, publicidad, widgets relacionados. |
| Categoría | Bloque — Landmark semántico |
| ¿Permite hijos? | Sí — cualquier contenido de flujo |
| Hijos recomendados | `<h2>`-`<h6>`, `<p>`, `<nav>`, `<ul>` |
| Dónde usarlo | Barra lateral, notas relacionadas, anuncios, perfil del autor |
| Dónde NO usarlo | Para contenido que es parte integral del flujo principal |
| Rol ARIA implícito | `complementary` |

**Atributos de accesibilidad:**

| Atributo | Cuándo usar |
|----------|-------------|
| `aria-label` | Si hay múltiples `<aside>`: `aria-label="Artículos relacionados"` |

---

### `<footer>`

| Campo | Valor |
|-------|-------|
| Significado | Pie de página del documento o de una sección. Información sobre el autor, copyright, links relacionados, información de contacto. |
| Categoría | Bloque — Landmark semántico |
| ¿Permite hijos? | Sí |
| Hijos recomendados | `<p>`, `<nav>`, `<address>`, `<ul>`, `<small>` |
| Hijos NO permitidos | `<footer>` anidado, `<header>` anidado |
| Dónde usarlo | Pie del `<body>` o pie de un `<article>`/`<section>` |
| Rol ARIA implícito | `contentinfo` (cuando es hijo de `<body>`) / `generic` (dentro de `<article>` o `<section>`) |

---

### `<address>`

| Campo | Valor |
|-------|-------|
| Significado | Información de contacto del autor o propietario del documento o del `<article>` más cercano. |
| Categoría | Bloque |
| ¿Permite hijos? | Sí — texto e inline |
| Hijos NO permitidos | `<h1>`-`<h6>`, `<section>`, `<article>`, `<header>`, `<footer>`, otro `<address>` |
| Dónde usarlo | Dentro de `<footer>` o `<article>` para datos de contacto |
| Dónde NO usarlo | Para cualquier dirección postal (solo para datos de contacto del autor) |

---

### `<div>`

| Campo | Valor |
|-------|-------|
| Significado | Contenedor genérico sin significado semántico. El "elemento de último recurso". |
| Categoría | Bloque — Genérico |
| ¿Permite hijos? | Sí — cualquier contenido |
| Dónde usarlo | Cuando necesitas un contenedor para CSS/JS y ningún elemento semántico aplica |
| Dónde NO usarlo | Como reemplazo de elementos semánticos. Antes de usar `<div>`, pregúntate: ¿es una sección? ¿un artículo? ¿un nav? |
| Rol ARIA implícito | Ninguno (`generic`) |

---

### `<p>`

| Campo | Valor |
|-------|-------|
| Significado | Párrafo de texto |
| Categoría | Bloque |
| ¿Permite hijos? | Sí — solo contenido en línea |
| Hijos NO permitidos | Elementos de bloque (`<div>`, `<ul>`, `<table>`, etc.) |
| Dónde usarlo | Texto corrido, descripciones, contenido de prosa |
| Rol ARIA implícito | `paragraph` |

---

### `<blockquote>`

| Campo | Valor |
|-------|-------|
| Significado | Cita extensa de otra fuente |
| Categoría | Bloque |
| ¿Permite hijos? | Sí — elementos de bloque e inline |
| Hijos recomendados | `<p>`, `<footer>`, `<cite>` |
| Dónde usarlo | Citas literales de más de una línea |
| Dónde NO usarlo | Para indentación visual (usar CSS) |

**Atributos principales:**

| Atributo | Descripción |
|----------|-------------|
| `cite` | URL de la fuente original |

---

### `<figure>` y `<figcaption>`

| Campo | Valor |
|-------|-------|
| Significado | Contenido autocontenido (imagen, diagrama, código, video) referenciado desde el texto. `<figcaption>` es su leyenda. |
| Categoría | Bloque |
| ¿Permite hijos? | Sí |
| Hijos recomendados (`<figure>`) | `<img>`, `<video>`, `<audio>`, `<pre>`, `<table>`, `<figcaption>` |
| Hijos de `<figcaption>` | Solo uno permitido, puede ser primero o último hijo de `<figure>` |
| Dónde usarlo | Imagen con descripción, diagrama, fragmento de código con explicación |

```html
<figure>
  <img src="diagrama.png" alt="Diagrama de flujo del sistema">
  <figcaption>Fig. 1 — Flujo de datos entre módulos</figcaption>
</figure>
```

---

### `<details>` y `<summary>`

| Campo | Valor |
|-------|-------|
| `<details>` | Widget de divulgación — muestra/oculta contenido |
| `<summary>` | Etiqueta visible del `<details>`. Siempre el primer hijo. |
| ¿Permite hijos? | `<details>`: sí. `<summary>`: solo inline |
| Dónde usarlo | FAQs, información adicional colapsable, notas técnicas |
| Rol ARIA implícito | `<details>`: `group` / `<summary>`: `button` |

**Atributos principales:**

| Atributo | Elemento | Descripción |
|----------|----------|-------------|
| `open` | `<details>` | Si está presente, el contenido es visible por defecto |

---

### `<hr>`

| Campo | Valor |
|-------|-------|
| Significado | Ruptura temática entre párrafos o secciones. No es meramente decorativo. |
| Categoría | Bloque — Void (sin hijos) |
| ¿Permite hijos? | **No** |
| Dónde usarlo | Cambio de tema dentro de una sección |
| Dónde NO usarlo | Como separador visual decorativo (usar CSS `border`) |
| Rol ARIA implícito | `separator` |

---

### `<pre>`

| Campo | Valor |
|-------|-------|
| Significado | Texto preformateado — preserva espacios y saltos de línea |
| Categoría | Bloque |
| ¿Permite hijos? | Sí — texto e inline |
| Hijos recomendados | `<code>` para código fuente |
| Dónde usarlo | Bloques de código, salida de terminal, poesía con formato específico |

---

## 5. Encabezados

Los encabezados son la estructura de navegación más importante para usuarios de lectores de pantalla. El 67% de usuarios de lectores de pantalla navega páginas usando encabezados.

---

### `<h1>` — `<h6>`

| Campo | Valor |
|-------|-------|
| Significado | Encabezados jerárquicos. `h1` = título principal, `h6` = subtítulo de menor jerarquía |
| Categoría | Bloque |
| ¿Permite hijos? | Sí — solo contenido en línea |
| Hijos NO permitidos | Otros encabezados, elementos de bloque |
| Dónde usarlo | Para crear la jerarquía de contenido del documento |
| Dónde NO usarlo | Para hacer texto "grande" o "llamativo" visualmente (usar CSS) |
| Rol ARIA implícito | `heading` con `aria-level` correspondiente |

**Reglas de uso:**

```
✅ Un solo h1 por página — describe el tema principal
✅ Los niveles se usan en orden jerárquico (h1 → h2 → h3)
✅ Cada sección importante tiene su propio h2
✅ Las subsecciones de un h2 usan h3, no h4
❌ No saltar niveles: h1 → h3 (sin h2) rompe la jerarquía
❌ No usar h1 en el logo o nombre del sitio si hay otro h1 en el contenido
❌ No elegir el nivel por el tamaño visual que produce
```

**Atributos de accesibilidad:**

| Atributo | Cuándo usar |
|----------|-------------|
| `id` | Para que `aria-labelledby` de una `<section>` pueda referenciarlos |

---

## 6. Texto en Línea — Semántica

Estos elementos comunican **significado** sobre el texto, no solo apariencia.

---

### `<strong>`

| Significado | Importancia fuerte. El texto es de alta importancia, gravedad o urgencia. |
|-------------|-----------|
| Render por defecto | Negrita |
| Diferencia con `<b>` | `<strong>` = importancia semántica. `<b>` = atención visual sin importancia extra. |
| ¿Permite hijos? | Sí — inline |
| Rol ARIA implícito | Ninguno específico (pero el lector de pantalla puede anunciarlo) |

---

### `<em>`

| Significado | Énfasis que cambia el sentido de la oración. |
|-------------|-----------|
| Render por defecto | Cursiva |
| Diferencia con `<i>` | `<em>` = énfasis semántico que afecta el significado. `<i>` = voz alternativa o término técnico. |
| ¿Permite hijos? | Sí — inline |

**Ejemplo:**
```html
<!-- "gato" con énfasis cambia el sentido -->
El <em>gato</em> comió el ratón. (no el perro)
El gato <em>comió</em> el ratón. (no dejó restos)
```

---

### `<cite>`

| Significado | Título de una obra creativa (libro, película, canción, website). |
|-------------|-----------|
| Render por defecto | Cursiva |
| ¿Permite hijos? | Sí — inline |
| Dónde usarlo | Siempre que menciones el título de una obra |
| Dónde NO usarlo | Para el nombre de una persona (incorrecto según el estándar HTML5) |

---

### `<abbr>`

| Significado | Abreviatura o acrónimo |
|-------------|-----------|
| ¿Permite hijos? | Sí — inline |
| Atributo principal | `title` — expansión completa de la abreviatura |
| Accesibilidad | El atributo `title` es leído por lectores de pantalla |

```html
<abbr title="HyperText Markup Language">HTML</abbr>
```

---

### `<time>`

| Significado | Fecha y/u hora en formato legible para máquinas |
|-------------|-----------|
| ¿Permite hijos? | Sí — texto (la representación visual) |
| Atributo principal | `datetime` — fecha/hora en formato ISO 8601 |

```html
<time datetime="2025-05-15">15 de mayo de 2025</time>
<time datetime="20:00">8 de la noche</time>
<time datetime="P1D">un día</time>
```

---

### `<mark>`

| Significado | Texto marcado o resaltado por relevancia contextual (resultado de búsqueda, término relevante en el contexto actual). |
|-------------|-----------|
| Render por defecto | Fondo amarillo |
| Dónde usarlo | Resultados de búsqueda, términos relevantes para el usuario actual |
| Dónde NO usarlo | Para resaltado decorativo general (usar CSS) |

---

### `<dfn>`

| Significado | Término que se está definiendo por primera vez |
|-------------|-----------|
| ¿Permite hijos? | Sí — inline |
| Atributo | `title` si el texto del elemento no es el término exacto |

---

### `<code>`

| Significado | Fragmento de código de computadora |
|-------------|-----------|
| ¿Permite hijos? | Sí — texto |
| Dónde usarlo | Código inline dentro de párrafos. Para bloques: `<pre><code>` |

---

### `<kbd>`

| Significado | Entrada del usuario por teclado |
|-------------|-----------|
| Dónde usarlo | `Presiona <kbd>Ctrl</kbd> + <kbd>C</kbd> para copiar` |

---

### `<samp>`

| Significado | Salida de un programa de computadora |
|-------------|-----------|
| Dónde usarlo | Mostrar output de terminal, mensajes de error de programas |

---

### `<var>`

| Significado | Variable matemática o de programación |
|-------------|-----------|
| Dónde usarlo | Documentación técnica, expresiones matemáticas |

---

### `<sub>` y `<sup>`

| Elemento | Significado |
|----------|-------------|
| `<sub>` | Subíndice — H₂O, fórmulas químicas |
| `<sup>` | Superíndice — notas al pie¹, potencias matemáticas x² |

---

### `<q>`

| Significado | Cita en línea corta |
|-------------|-----------|
| Diferencia con `<blockquote>` | `<q>` es inline y para citas breves. `<blockquote>` es bloque para citas largas. |
| Atributo | `cite` — URL de la fuente |

---

### `<s>`

| Significado | Texto que ya no es preciso o relevante (tachado semántico) |
|-------------|-----------|
| Diferencia con `<del>` | `<s>` = ya no relevante. `<del>` = eliminado de una edición (con `<ins>`) |

---

### `<ins>` y `<del>`

| Elemento | Significado |
|----------|-------------|
| `<ins>` | Texto insertado en una edición del documento |
| `<del>` | Texto eliminado en una edición del documento |
| Atributos | `datetime`, `cite` |

---

### `<small>`

| Significado | Letra pequeña — disclaimers, notas legales, copyright |
|-------------|-----------|
| Dónde usarlo | `<small>© 2025 Mi Empresa. Todos los derechos reservados.</small>` |
| Dónde NO usarlo | Para hacer texto visualmente pequeño (usar CSS) |

---

### `<span>`

| Significado | Contenedor inline genérico sin semántica |
|-------------|-----------|
| Dónde usarlo | Para aplicar CSS o JS a texto cuando ningún elemento semántico aplica |
| Dónde NO usarlo | Como reemplazo de elementos semánticos inline |

---

### `<br>`

| Significado | Salto de línea con significado semántico (dirección postal, poema) |
|-------------|-----------|
| ¿Permite hijos? | **No** (elemento void) |
| Dónde usarlo | Dentro de `<address>` para separar líneas, en poesía |
| Dónde NO usarlo | Para crear espacio vertical (usar CSS `margin`) |

---

### `<wbr>`

| Significado | Sugerencia de punto de quiebre de palabra |
|-------------|-----------|
| ¿Permite hijos? | No (void) |
| Dónde usarlo | URLs largas, palabras técnicas muy largas |

---

## 7. Texto en Línea — Presentacional

Estos elementos tienen impacto visual pero también cargan semántica ligera.

| Elemento | Significado semántico | Render default | Usar cuando |
|----------|-----------------------|----------------|-------------|
| `<b>` | Atención sin importancia extra | Negrita | Keywords en resúmenes, nombres de producto en contexto |
| `<i>` | Voz alternativa, término técnico, en otro idioma | Cursiva | Términos técnicos, palabras en otro idioma, pensamientos |
| `<u>` | Anotación no textual (error de ortografía) | Subrayado | Indicar error ortográfico, anotación china (ruby) |

**Regla:** No usar `<b>`, `<i>`, `<u>` solo por su apariencia. Usar CSS para eso.

---

## 8. Listas

---

### `<ul>` — Lista desordenada

| Campo | Valor |
|-------|-------|
| Significado | Colección de ítems sin orden significativo |
| ¿Permite hijos? | Solo `<li>` directamente |
| Hijos NO permitidos | `<p>`, `<div>` directamente (solo dentro de `<li>`) |
| Dónde usarlo | Menús de navegación, listas de características, ingredientes |
| Rol ARIA implícito | `list` |

---

### `<ol>` — Lista ordenada

| Campo | Valor |
|-------|-------|
| Significado | Colección de ítems donde el orden importa |
| ¿Permite hijos? | Solo `<li>` directamente |
| Dónde usarlo | Pasos de un proceso, ranking, instrucciones |
| Rol ARIA implícito | `list` |

**Atributos principales:**

| Atributo | Descripción |
|----------|-------------|
| `type` | Tipo de marcador: `1`, `a`, `A`, `i`, `I` |
| `start` | Número inicial de la lista |
| `reversed` | Cuenta hacia atrás |

---

### `<li>` — Ítem de lista

| Campo | Valor |
|-------|-------|
| ¿Permite hijos? | Sí — contenido de flujo |
| Dónde usarlo | Dentro de `<ul>`, `<ol>`, o `<menu>` únicamente |
| Atributo | `value` (solo en `<ol>`) |
| Rol ARIA implícito | `listitem` |

---

### `<dl>`, `<dt>`, `<dd>` — Lista de definiciones

| Elemento | Significado |
|----------|-------------|
| `<dl>` | Contenedor de la lista de definiciones |
| `<dt>` | Término (definition term) |
| `<dd>` | Descripción o definición del término |

| Dónde usar `<dl>` | Glosarios, metadata de un artículo (autor, fecha, categoría), especificaciones técnicas |
| Regla | Un `<dt>` puede tener múltiples `<dd>`. Múltiples `<dt>` pueden compartir un `<dd>`. |
| Rol ARIA implícito de `<dl>` | `term` para `<dt>`, `definition` para `<dd>` |

---

### `<menu>`

| Significado | Lista de comandos o herramientas. Semánticamente similar a `<ul>` pero para interfaces de usuario. |
|-------------|-----------|
| Dónde usarlo | Barras de herramientas, context menus en aplicaciones web |
| Rol ARIA implícito | `list` |

---

## 9. Tablas

Las tablas son para **datos tabulares**, no para layout.

---

### `<table>`

| Campo | Valor |
|-------|-------|
| Significado | Datos presentados en filas y columnas con relaciones entre ellos |
| ¿Permite hijos? | `<caption>`, `<colgroup>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>` |
| Dónde usarlo | Comparaciones, horarios, datos estadísticos, precios por plan |
| Dónde NO usarlo | Layout de página (usar CSS Grid/Flexbox) |
| Rol ARIA implícito | `table` |

**Atributos de accesibilidad:**

| Atributo | Elemento | Descripción |
|----------|----------|-------------|
| `aria-label` | `<table>` | Nombre de la tabla si no hay `<caption>` |
| `scope="col"` | `<th>` | Indica que el encabezado es de columna |
| `scope="row"` | `<th>` | Indica que el encabezado es de fila |

---

### Elementos de tabla

| Elemento | Significado | Hijos permitidos |
|----------|-------------|-----------------|
| `<caption>` | Título descriptivo de la tabla — **siempre incluir** | Inline, bloque |
| `<thead>` | Grupo de filas de encabezado | `<tr>` |
| `<tbody>` | Grupo de filas de datos | `<tr>` |
| `<tfoot>` | Grupo de filas de pie (totales, resúmenes) | `<tr>` |
| `<tr>` | Fila de la tabla | `<th>`, `<td>` |
| `<th>` | Celda de encabezado | Inline y bloque |
| `<td>` | Celda de dato | Inline y bloque |
| `<col>` | Columna (para CSS, void) | Ninguno |
| `<colgroup>` | Grupo de columnas | `<col>` |

**Atributos de `<th>` y `<td>`:**

| Atributo | Descripción |
|----------|-------------|
| `scope` | `col`, `row`, `colgroup`, `rowgroup` |
| `colspan` | Número de columnas que abarca |
| `rowspan` | Número de filas que abarca |
| `headers` | IDs de los `<th>` que encabezan esta celda (tablas complejas) |

---

## 10. Formularios

Los formularios son la interacción más crítica para accesibilidad.

---

### `<form>`

| Campo | Valor |
|-------|-------|
| Significado | Contenedor de controles de formulario interactivos |
| ¿Permite hijos? | Sí — cualquier contenido excepto otro `<form>` |
| Rol ARIA implícito | `form` (solo si tiene `aria-label` o `aria-labelledby`) |

**Atributos principales:**

| Atributo | Descripción |
|----------|-------------|
| `action` | URL de envío |
| `method` | `get` / `post` |
| `enctype` | `multipart/form-data` para upload de archivos |
| `novalidate` | Desactiva validación nativa del browser |
| `autocomplete` | `on` / `off` |

**Atributos de accesibilidad:**

| Atributo | Cuándo usar |
|----------|-------------|
| `aria-label` | Nombre del formulario si no hay encabezado visible |
| `aria-labelledby` | Apuntar al encabezado del formulario |

---

### `<label>`

**La etiqueta más importante para accesibilidad de formularios.**

| Campo | Valor |
|-------|-------|
| Significado | Etiqueta asociada a un control de formulario |
| ¿Permite hijos? | Sí — inline + el control (o referencia al control) |
| Regla | **Siempre** debe existir un `<label>` para cada `<input>`, `<select>`, `<textarea>` |

**Dos formas correctas de asociar label:**

```html
<!-- Forma 1: for + id (recomendada) -->
<label for="email">Correo electrónico</label>
<input type="email" id="email" name="email">

<!-- Forma 2: envolver el control -->
<label>
  Correo electrónico
  <input type="email" name="email">
</label>
```

---

### `<input>`

| Campo | Valor |
|-------|-------|
| ¿Permite hijos? | **No** (void element) |
| Rol ARIA implícito | Depende del `type` |

**Tipos de `<input>` y su semántica:**

| `type` | Semántica | Rol ARIA |
|--------|-----------|----------|
| `text` | Texto libre de una línea | `textbox` |
| `email` | Dirección de email | `textbox` |
| `password` | Contraseña (oculta) | `textbox` |
| `number` | Número con controles spinner | `spinbutton` |
| `range` | Rango numérico con slider | `slider` |
| `checkbox` | Casilla de verificación | `checkbox` |
| `radio` | Botón de opción en grupo | `radio` |
| `file` | Selector de archivo | — |
| `date` | Selector de fecha | — |
| `time` | Selector de hora | — |
| `datetime-local` | Fecha y hora local | — |
| `color` | Selector de color | — |
| `search` | Campo de búsqueda | `searchbox` |
| `tel` | Número de teléfono | `textbox` |
| `url` | URL | `textbox` |
| `hidden` | Valor oculto | Ninguno |
| `submit` | Botón de envío | `button` |
| `reset` | Botón de reset | `button` |
| `button` | Botón genérico | `button` |
| `image` | Botón de imagen | `button` |

**Atributos principales de `<input>`:**

| Atributo | Descripción |
|----------|-------------|
| `type` | Tipo del input |
| `name` | Nombre del campo (para el servidor) |
| `id` | Para asociar con `<label>` |
| `value` | Valor inicial o del botón |
| `placeholder` | Texto de sugerencia (NO reemplaza al label) |
| `required` | Campo obligatorio |
| `disabled` | Campo deshabilitado |
| `readonly` | Campo de solo lectura |
| `autofocus` | Recibe foco al cargar la página |
| `autocomplete` | Sugerencias del browser |
| `min` / `max` | Rango para number, date, range |
| `step` | Incremento para number, range |
| `pattern` | Regex de validación |
| `maxlength` | Longitud máxima |
| `multiple` | Permite múltiples valores (email, file) |

**Atributos de accesibilidad:**

| Atributo | Cuándo usar |
|----------|-------------|
| `aria-required="true"` | Alternativa a `required` o cuando el required visual no es claro |
| `aria-invalid="true"` | Cuando el campo tiene un error de validación |
| `aria-describedby` | Apuntar al elemento que da instrucciones o muestra el error |
| `aria-label` | Solo si no es posible usar `<label>` (inputs en tablas) |

---

### `<textarea>`

| Campo | Valor |
|-------|-------|
| Significado | Campo de texto multilínea |
| ¿Permite hijos? | Texto plano (valor inicial) |

**Atributos principales:**

| Atributo | Descripción |
|----------|-------------|
| `rows` / `cols` | Dimensiones iniciales |
| `maxlength` | Longitud máxima |
| `placeholder` | Texto de sugerencia |
| `required`, `disabled`, `readonly` | Igual que `<input>` |

---

### `<select>` y `<option>`

| Campo | Valor |
|-------|-------|
| `<select>` | Menú desplegable de opciones |
| `<option>` | Cada opción del menú |
| `<optgroup>` | Agrupación de opciones con etiqueta |
| Rol ARIA de `<select>` | `listbox` |
| Rol ARIA de `<option>` | `option` |

**Atributos de `<select>`:**

| Atributo | Descripción |
|----------|-------------|
| `multiple` | Permite selección múltiple |
| `size` | Número de opciones visibles |
| `required` | Obligatorio |

**Atributos de `<option>`:**

| Atributo | Descripción |
|----------|-------------|
| `value` | Valor enviado al servidor |
| `selected` | Opción seleccionada por defecto |
| `disabled` | Opción no seleccionable |

---

### `<fieldset>` y `<legend>`

| Campo | Valor |
|-------|-------|
| `<fieldset>` | Agrupa controles de formulario relacionados |
| `<legend>` | Título del grupo — debe ser el primer hijo de `<fieldset>` |
| Cuándo es obligatorio | Siempre que se agrupen `<input type="radio">` o `<input type="checkbox">` relacionados |
| Rol ARIA de `<fieldset>` | `group` |

```html
<!-- Correcto: grupo de radios siempre necesita fieldset+legend -->
<fieldset>
  <legend>Método de pago preferido</legend>
  <label><input type="radio" name="payment" value="card"> Tarjeta</label>
  <label><input type="radio" name="payment" value="cash"> Efectivo</label>
</fieldset>
```

---

### `<button>`

| Campo | Valor |
|-------|-------|
| Significado | Elemento de acción interactivo |
| ¿Permite hijos? | Sí — inline (texto, imágenes, íconos) |
| Tipos | `submit` (default), `button`, `reset` |
| Dónde usarlo | Acciones: guardar, eliminar, abrir modal, toggle |
| Dónde NO usarlo | Navegación (usar `<a>`) |
| Rol ARIA implícito | `button` |

**Regla crítica:** Un `<button>` siempre debe tener texto accesible — ya sea texto visible o `aria-label`.

```html
<!-- Botón solo con ícono: necesita aria-label -->
<button type="button" aria-label="Cerrar diálogo">
  <svg aria-hidden="true">...</svg>
</button>
```

---

### `<datalist>`

| Significado | Lista de opciones sugeridas para un `<input>` |
|-------------|-----------|
| Cómo usar | `<input list="id-del-datalist">` |
| Diferencia con `<select>` | El usuario puede escribir libremente o elegir sugerencia |

---

### `<output>`

| Significado | Resultado de un cálculo o acción |
|-------------|-----------|
| Rol ARIA | `status` |
| Dónde usarlo | Resultado de una calculadora, totales dinámicos |

---

### `<progress>`

| Significado | Progreso de una tarea |
|-------------|-----------|
| ¿Permite hijos? | No (void técnicamente, aunque puede tener texto de fallback) |
| Atributos | `value`, `max` |
| Rol ARIA implícito | `progressbar` |

---

### `<meter>`

| Significado | Medida escalar dentro de un rango conocido (no progreso) |
|-------------|-----------|
| Atributos | `value`, `min`, `max`, `low`, `high`, `optimum` |
| Dónde usarlo | Uso de disco, nivel de batería, puntaje |
| Dónde NO usarlo | Progreso de una tarea (usar `<progress>`) |

---

## 11. Media — Imágenes, Video, Audio

---

### `<img>`

| Campo | Valor |
|-------|-------|
| ¿Permite hijos? | **No** (void) |
| Dónde usarlo | Imágenes que son parte del contenido |
| Dónde NO usarlo | Imágenes decorativas (usar CSS `background-image`) |
| Rol ARIA implícito | `img` si tiene `alt` no vacío / `presentation` si `alt=""` |

**Atributos principales:**

| Atributo | Descripción | ¿Obligatorio? |
|----------|-------------|--------------|
| `src` | URL de la imagen | ✅ Sí |
| `alt` | Texto alternativo | ✅ Sí (vacío `""` para decorativas) |
| `width` / `height` | Dimensiones — **siempre incluir** para evitar layout shift | Recomendado |
| `loading` | `lazy` para carga diferida | Recomendado |
| `decoding` | `async` para no bloquear el render | Recomendado |
| `srcset` | Imágenes responsivas | Para multi-resolución |
| `sizes` | Tamaños del viewport para `srcset` | Con `srcset` |

**Reglas del atributo `alt`:**

```
✅ Imagen informativa: describe el contenido y función
   <img src="logo.png" alt="Logo de MiEmpresa">

✅ Imagen funcional (botón/link): describe la acción
   <img src="search.png" alt="Buscar">

✅ Imagen decorativa: alt vacío (no ausente)
   <img src="patron.png" alt="">

✅ Imagen compleja (gráfico): alt breve + descripción larga en <figcaption>
   <img src="grafico.png" alt="Ventas Q1-Q4" aria-describedby="desc-grafico">

❌ alt="imagen", alt="foto", alt="img001.jpg" — inútiles
❌ Omitir alt completamente — el lector de pantalla lee el nombre del archivo
```

---

### `<picture>`

| Significado | Contenedor para versiones alternativas de una imagen |
|-------------|-----------|
| ¿Permite hijos? | `<source>` (varios) + un `<img>` al final (obligatorio) |
| Dónde usarlo | Imágenes responsivas con diferentes formatos (WebP + JPEG) o art direction |

```html
<picture>
  <source type="image/webp" srcset="foto.webp">
  <source type="image/jpeg" srcset="foto.jpg">
  <img src="foto.jpg" alt="Descripción de la foto" width="800" height="600">
</picture>
```

---

### `<video>`

| Campo | Valor |
|-------|-------|
| ¿Permite hijos? | `<source>`, `<track>`, texto de fallback |
| Hijos recomendados | Siempre incluir `<track kind="captions">` para subtítulos |

**Atributos principales:**

| Atributo | Descripción |
|----------|-------------|
| `src` | URL del video |
| `controls` | Muestra controles del player — **siempre incluir** |
| `autoplay` | Reproducción automática — evitar por accesibilidad |
| `muted` | Requerido si se usa `autoplay` |
| `loop` | Reproducción en bucle |
| `poster` | Imagen de vista previa |
| `width` / `height` | Dimensiones |
| `preload` | `none`, `metadata`, `auto` |

**Atributos de accesibilidad:**

| Atributo | Descripción |
|----------|-------------|
| `aria-label` | Nombre del video |

---

### `<audio>`

| Campo | Valor |
|-------|-------|
| ¿Permite hijos? | `<source>`, texto de fallback |
| Atributos clave | `controls` (obligatorio), `src`, `autoplay`, `loop`, `muted` |

**Regla de accesibilidad:** Todo video/audio con diálogo o información sonora debe tener transcripción o subtítulos (`<track kind="captions">`).

---

### `<track>`

| Significado | Pistas de texto para `<video>` y `<audio>` (subtítulos, capítulos, etc.) |
|-------------|-----------|
| ¿Permite hijos? | No (void) |

**Atributos:**

| Atributo | Descripción |
|----------|-------------|
| `kind` | `subtitles`, `captions`, `descriptions`, `chapters`, `metadata` |
| `src` | URL del archivo WebVTT |
| `srclang` | Idioma de la pista |
| `label` | Nombre legible de la pista |
| `default` | Pista activa por defecto |

---

### `<source>`

| Significado | Fuente alternativa para `<picture>`, `<video>`, `<audio>` |
|-------------|-----------|
| ¿Permite hijos? | No (void) |
| Atributos | `src`, `type`, `srcset`, `media`, `sizes` |

---

### `<svg>`

| Significado | Gráfico vectorial |
|-------------|-----------|
| ¿Permite hijos? | Sí — elementos SVG |
| Accesibilidad | Usar `<title>` y `<desc>` dentro del SVG, o `aria-label` en el elemento `<svg>` |

```html
<!-- SVG decorativo -->
<svg aria-hidden="true" focusable="false">...</svg>

<!-- SVG informativo -->
<svg role="img" aria-label="Gráfico de ventas anuales">
  <title>Gráfico de ventas anuales</title>
  ...
</svg>
```

---

### `<iframe>`

| Significado | Documento embebido externo |
|-------------|-----------|
| ¿Permite hijos? | Texto de fallback (si iframe no es soportado) |

**Atributos principales:**

| Atributo | Descripción |
|----------|-------------|
| `src` | URL del documento |
| `title` | **Obligatorio** para accesibilidad — describe el contenido |
| `width` / `height` | Dimensiones |
| `loading` | `lazy` para carga diferida |
| `sandbox` | Restricciones de seguridad |
| `allow` | Permisos (camera, microphone, etc.) |

**Regla de accesibilidad:** El atributo `title` en `<iframe>` es **obligatorio**. Sin él, los lectores de pantalla no pueden identificar el contenido embebido.

---

## 12. Elementos Interactivos

---

### `<a>` — Anchor / Enlace

| Campo | Valor |
|-------|-------|
| Significado | Hipervínculo a otra página, recurso, o posición en la misma página |
| ¿Permite hijos? | Sí — inline y bloque (en HTML5) |
| Hijos NO permitidos | Otro `<a>`, elementos interactivos (`<button>`, `<input>`) |
| Dónde usarlo | Navegación, links a recursos, anchors internos |
| Dónde NO usarlo | Acciones (usar `<button>`) |
| Rol ARIA implícito | `link` (si tiene `href`) / `generic` (si no tiene `href`) |

**Atributos principales:**

| Atributo | Descripción |
|----------|-------------|
| `href` | Destino del link (URL, `#id`, `mailto:`, `tel:`) |
| `target` | `_blank` (nueva pestaña), `_self` (misma pestaña) |
| `rel` | Relación: `noopener noreferrer` (obligatorio con `target="_blank"`), `nofollow`, `canonical` |
| `download` | Descarga el recurso en lugar de navegar |
| `hreflang` | Idioma del recurso destino |
| `type` | MIME type del destino |

**Reglas de texto de link:**

```
✅ El texto del link debe describir el destino por sí solo
   <a href="/blog/seo">Guía completa de SEO</a>

❌ "Haz clic aquí", "Leer más", "Ver" — sin contexto son inútiles
   para usuarios de lectores de pantalla que listan todos los links

✅ Si el texto es ambiguo, usar aria-label para complementar
   <a href="/blog/seo" aria-label="Leer más sobre SEO">Leer más</a>

✅ Links que abren en nueva pestaña deben advertirlo
   <a href="https://ext.com" target="_blank" rel="noopener noreferrer">
     Sitio externo <span class="visually-hidden">(abre en nueva pestaña)</span>
   </a>
```

---

### `<dialog>`

| Significado | Cuadro de diálogo modal o no-modal |
|-------------|-----------|
| ¿Permite hijos? | Sí — cualquier contenido |
| Atributo | `open` — si está presente, el diálogo es visible |
| Rol ARIA implícito | `dialog` |

**Atributos de accesibilidad:**

| Atributo | Descripción |
|----------|-------------|
| `aria-labelledby` | Apuntar al `<h2>` dentro del diálogo |
| `aria-describedby` | Descripción del propósito del diálogo |
| `aria-modal="true"` | Indica que es modal (bloquea el resto de la página) |

---

## 13. Scripting y Embebido

| Elemento | Significado | Atributos clave |
|----------|-------------|-----------------|
| `<script>` | Script ejecutable | `src`, `type`, `defer`, `async` |
| `<noscript>` | Contenido alternativo si JS está desactivado | — |
| `<template>` | Fragmento HTML inerte (no renderizado) | — |
| `<slot>` | Punto de inserción en Web Components | `name` |
| `<canvas>` | Superficie de dibujo para JS | `width`, `height`, necesita `aria-label` |
| `<object>` | Recurso externo embebido | `data`, `type`, `width`, `height` |
| `<embed>` | Punto de integración para contenido externo | `src`, `type` |
| `<math>` | Expresión matemática (MathML) | — |

---

## 14. Metadatos del Documento

### `<meta>`

| Atributo `name` | Descripción |
|-----------------|-------------|
| `charset="UTF-8"` | Codificación del documento — **obligatorio** |
| `viewport` | Control del viewport para responsive design — **obligatorio** |
| `description` | Descripción para SEO (máx. 160 caracteres) |
| `robots` | Instrucciones para crawlers |
| `author` | Autor del documento |
| `theme-color` | Color del browser en mobile |

**Metas de viewport obligatorio:**

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

### `<link>`

| Atributo `rel` | Descripción |
|----------------|-------------|
| `stylesheet` | Hoja de estilos CSS |
| `canonical` | URL canónica (SEO) |
| `icon` / `shortcut icon` | Favicon |
| `preload` | Precarga de recursos críticos |
| `preconnect` | Preconexión a dominio externo |
| `alternate` | Versión alternativa (RSS, otro idioma) |

---

## 15. Atributos Globales

Estos atributos son válidos en **cualquier elemento HTML**.

| Atributo | Descripción | Ejemplo |
|----------|-------------|---------|
| `id` | Identificador único en el documento | `id="main-nav"` |
| `class` | Una o más clases CSS | `class="card card--featured"` |
| `style` | CSS inline — evitar salvo casos justificados | `style="color: red"` |
| `lang` | Idioma del elemento o su contenido | `lang="en"` en cita en inglés dentro de página en español |
| `dir` | Dirección del texto del elemento | `dir="rtl"` |
| `title` | Información adicional (tooltip al hover) | `title="Más información"` |
| `tabindex` | Control del orden de foco por teclado | Ver reglas abajo |
| `hidden` | Oculta el elemento semánticamente (y visualmente) | `hidden` |
| `contenteditable` | Hace el contenido editable | `contenteditable="true"` |
| `draggable` | Habilita drag & drop | `draggable="true"` |
| `spellcheck` | Activa/desactiva corrección ortográfica | `spellcheck="false"` |
| `data-*` | Atributos de datos custom | `data-product-id="42"` |
| `is` | Extiende elemento nativo con Web Components | — |

**Reglas de `tabindex`:**

```
tabindex="0"   → El elemento entra en el orden natural del Tab
                 Usar en elementos custom interactivos (<div> como botón)

tabindex="-1"  → Focusable por JS (focus()) pero no con Tab
                 Útil para diálogos, tooltips, elementos que reciben
                 foco programáticamente

tabindex="1"   → ❌ NUNCA USAR números positivos
                 Crea un orden de tab predecible solo para el autor
                 pero confuso para el usuario. Usar el orden del DOM.
```

---

## 16. Atributos de Accesibilidad — ARIA

### El principio de ARIA

> "No uses ARIA si puedes usar un elemento HTML semántico nativo."
> — WAI-ARIA Authoring Practices Guide (W3C)

ARIA solo modifica el árbol de accesibilidad (lo que ven los lectores de pantalla). **No cambia el comportamiento visual ni funcional del elemento.** Si usas ARIA para hacer accesible un elemento interactivo custom, también debes implementar el comportamiento con JavaScript.

---

### Atributos de Nomenclatura (dar nombre a elementos)

| Atributo | Descripción | Uso |
|----------|-------------|-----|
| `aria-label` | Nombre accesible directo como string | Para íconos sin texto, botones solo con SVG, landmarks sin encabezado visible |
| `aria-labelledby` | Nombre accesible referenciando otro elemento por ID | Cuando hay texto visible que ya describe el elemento. **Tiene precedencia sobre `aria-label`** |
| `aria-describedby` | Descripción adicional (no el nombre) referenciando otro elemento | Instrucciones de un campo, mensajes de error, texto de ayuda |
| `aria-details` | Referencia a descripción extendida | Descripciones largas de imágenes, gráficos complejos |

```html
<!-- aria-label: para el botón de cerrar sin texto visible -->
<button aria-label="Cerrar diálogo">✕</button>

<!-- aria-labelledby: el h2 ya describe la región -->
<section aria-labelledby="titulo-features">
  <h2 id="titulo-features">Características principales</h2>
</section>

<!-- aria-describedby: instrucción adicional para el input -->
<input type="password" aria-describedby="password-hint">
<p id="password-hint">Mínimo 8 caracteres, una mayúscula y un número.</p>
```

---

### Atributos de Estado

| Atributo | Valores | Cuándo usar |
|----------|---------|-------------|
| `aria-expanded` | `true` / `false` | Elementos que muestran/ocultan contenido: acordeones, menús dropdown, colapsos |
| `aria-checked` | `true` / `false` / `mixed` | Checkboxes custom, toggle buttons |
| `aria-selected` | `true` / `false` | Tabs, opciones de listbox seleccionadas |
| `aria-pressed` | `true` / `false` / `mixed` | Toggle buttons (botones que mantienen estado) |
| `aria-disabled` | `true` / `false` | Elemento visualmente deshabilitado pero necesita permanecer en el árbol de accesibilidad |
| `aria-hidden` | `true` | Oculta el elemento Y sus hijos del árbol de accesibilidad. Para decoraciones, duplicados. |
| `aria-invalid` | `true` / `false` / `grammar` / `spelling` | Campo de formulario con error |
| `aria-busy` | `true` / `false` | Región cargando contenido dinámico |
| `aria-current` | `page` / `step` / `location` / `date` / `time` / `true` / `false` | Ítem activo en navegación, paso actual en wizard |

```html
<!-- aria-expanded en un accordion -->
<button aria-expanded="false" aria-controls="panel-1">Pregunta 1</button>
<div id="panel-1" hidden>Respuesta 1...</div>

<!-- aria-current en navegación -->
<nav>
  <a href="/">Inicio</a>
  <a href="/blog" aria-current="page">Blog</a>
  <a href="/contacto">Contacto</a>
</nav>

<!-- aria-invalid en formulario -->
<input type="email" aria-invalid="true" aria-describedby="email-error">
<p id="email-error" role="alert">El email no tiene un formato válido.</p>
```

---

### Atributos de Propiedades

| Atributo | Descripción | Ejemplo |
|----------|-------------|---------|
| `aria-required` | Campo obligatorio | `aria-required="true"` |
| `aria-placeholder` | Placeholder accesible | Alternativa a `placeholder` de HTML |
| `aria-valuemin` | Valor mínimo de widget numérico | En `range`, `slider` |
| `aria-valuemax` | Valor máximo | En `range`, `slider` |
| `aria-valuenow` | Valor actual | En `range`, `progressbar`, `slider` |
| `aria-valuetext` | Representación textual del valor | Cuando el número no tiene sentido solo: `"Volumen: bajo"` |
| `aria-multiline` | Si el campo acepta múltiples líneas | En `textbox` custom |
| `aria-multiselectable` | Si se pueden seleccionar múltiples ítems | En `listbox`, `grid`, `tree` |
| `aria-readonly` | Elemento legible pero no editable | En inputs custom |
| `aria-haspopup` | El elemento tiene un popup asociado | `menu`, `listbox`, `tree`, `grid`, `dialog`, `true` |
| `aria-autocomplete` | Tipo de autocompletado | `inline`, `list`, `both`, `none` |
| `aria-orientation` | Orientación del widget | `horizontal`, `vertical` |
| `aria-level` | Nivel jerárquico | En `heading`, `row`, `listitem` custom |
| `aria-setsize` | Tamaño del set de ítems | Para listas virtualizadas |
| `aria-posinset` | Posición en el set | Para listas virtualizadas |
| `aria-colcount` | Total de columnas en una grid | En tablas y grids complejos |
| `aria-rowcount` | Total de filas | En tablas y grids complejos |
| `aria-colspan` | Número de columnas que abarca una celda | En grid cells |
| `aria-rowspan` | Número de filas que abarca | En grid cells |

---

### Atributos de Relación

| Atributo | Descripción |
|----------|-------------|
| `aria-controls` | IDs de elementos que este elemento controla |
| `aria-owns` | IDs de elementos que son "hijos" en el árbol de accesibilidad pero no en el DOM |
| `aria-flowto` | IDs de elementos que representan el siguiente en el flujo de lectura |
| `aria-errormessage` | ID del elemento que contiene el mensaje de error (cuando `aria-invalid="true"`) |
| `aria-activedescendant` | ID del hijo actualmente activo en un widget compuesto (listbox, grid, tree) |

---

### Atributo Especial: `aria-live`

Para regiones que se actualizan dinámicamente (sin recarga de página):

| Valor | Descripción | Cuándo usar |
|-------|-------------|-------------|
| `off` | Default — no se anuncia | Contenido que no necesita anuncio |
| `polite` | Anuncia cuando el usuario termine lo que está haciendo | Actualizaciones no urgentes: contadores, resultados de búsqueda |
| `assertive` | Anuncia inmediatamente, interrumpe | Errores críticos, alertas urgentes — **usar con cuidado** |

```html
<!-- Mensaje de error que aparece dinámicamente -->
<div aria-live="assertive" aria-atomic="true" id="error-region">
  <!-- El error se inserta aquí por JS -->
</div>

<!-- Atributos relacionados -->
aria-atomic="true"    → Anuncia toda la región, no solo los cambios
aria-relevant="..."   → additions | removals | text | all (qué cambios anunciar)
```

---

## 17. Reglas de Accesibilidad — ARIA Roles

Los roles ARIA se usan en el atributo `role=""`. Definen qué tipo de elemento es para tecnologías asistivas.

### Roles de Landmark (navegación por secciones)

Los landmarks son las secciones principales de la página. Los usuarios de lectores de pantalla los usan para navegar rápidamente.

| Role | Equivalente HTML nativo | Usar cuando... |
|------|------------------------|----------------|
| `banner` | `<header>` (hijo de body) | Encabezado principal del sitio |
| `navigation` | `<nav>` | Menú de navegación |
| `main` | `<main>` | Contenido principal |
| `complementary` | `<aside>` | Contenido complementario |
| `contentinfo` | `<footer>` (hijo de body) | Pie de página del sitio |
| `search` | `<search>` (HTML5.3) / `<form role="search">` | Formulario de búsqueda |
| `form` | `<form>` (con label) | Formulario nombrado |
| `region` | `<section>` (con label) | Sección nombrada de la página |

**Regla:** Usar siempre el elemento HTML nativo primero. Solo usar `role` cuando el elemento no tiene equivalente nativo o cuando se necesita sobreescribir (con justificación).

---

### Roles de Widget Comunes

| Role | Descripción | Elemento nativo equivalente |
|------|-------------|----------------------------|
| `button` | Elemento interactivo que ejecuta acción | `<button>` |
| `link` | Navega a otra ubicación | `<a href>` |
| `checkbox` | Elemento de dos (o tres) estados | `<input type="checkbox">` |
| `radio` | Opción en un grupo | `<input type="radio">` |
| `textbox` | Campo de texto | `<input>`, `<textarea>` |
| `combobox` | Campo + lista desplegable | `<select>` / `<input>` + `<datalist>` |
| `listbox` | Lista de opciones seleccionables | `<select>` |
| `option` | Opción en listbox | `<option>` |
| `slider` | Entrada de rango deslizable | `<input type="range">` |
| `spinbutton` | Input numérico con controles | `<input type="number">` |
| `progressbar` | Indicador de progreso | `<progress>` |
| `tab` | Pestaña de navegación | No hay equivalente nativo |
| `tabpanel` | Panel de contenido de pestaña | No hay equivalente nativo |
| `tablist` | Contenedor de tabs | No hay equivalente nativo |
| `menu` | Menú de opciones | `<ul>` con items |
| `menuitem` | Ítem de menú | `<li>` en menú |
| `dialog` | Diálogo modal o no-modal | `<dialog>` |
| `alertdialog` | Diálogo que requiere respuesta | `<dialog>` + `role="alertdialog"` |
| `alert` | Mensaje urgente | — |
| `status` | Mensaje de estado no urgente | — |
| `log` | Región con historial (chat, log) | — |
| `tooltip` | Información contextual flotante | — |
| `tree` | Lista jerárquica expandible | No hay equivalente nativo |
| `grid` | Grid interactiva de datos | `<table>` interactiva |
| `treegrid` | Grid con filas expandibles | No hay equivalente nativo |

---

## 18. Errores Comunes y Cómo Evitarlos

```
ERROR 1 — Usar <div> o <span> para botones
❌ <div onclick="...">Guardar</div>
✅ <button type="button">Guardar</button>
Por qué: El <button> nativo es focusable por teclado, activable con
Enter y Space, y anunciado como botón por lectores de pantalla.

ERROR 2 — Placeholder en lugar de label
❌ <input placeholder="Correo electrónico">
✅ <label for="email">Correo electrónico</label>
   <input id="email" placeholder="ej: juan@ejemplo.com">
Por qué: El placeholder desaparece al escribir y no es accesible
por todos los lectores de pantalla.

ERROR 3 — Texto de links sin contexto
❌ <a href="/seo">Leer más</a>
✅ <a href="/seo">Leer más sobre estrategias SEO</a>
   o: <a href="/seo" aria-label="Leer más sobre estrategias SEO">Leer más</a>
Por qué: Los usuarios de lectores de pantalla navegan listando todos
los links. "Leer más" × 10 no aporta información.

ERROR 4 — aria-hidden en elementos focusables
❌ <button aria-hidden="true">Cerrar</button>
✅ <button aria-hidden="true" tabindex="-1">Cerrar</button>
   o simplemente: quitar aria-hidden del botón
Por qué: Un elemento oculto al árbol de accesibilidad pero
accesible por teclado crea un elemento "fantasma" invisible.

ERROR 5 — Tablas para layout
❌ <table><tr><td>Menú</td><td>Contenido</td></tr></table>
✅ <div class="layout"> con CSS Grid o Flexbox
Por qué: Los lectores de pantalla anuncian las tablas como datos
tabulares. Una tabla de layout confunde la navegación.

ERROR 6 — Imágenes sin alt o con alt genérico
❌ <img src="foto.jpg">
❌ <img src="foto.jpg" alt="imagen">
✅ <img src="foto.jpg" alt="Equipo de desarrollo en la oficina de Madrid">
✅ <img src="decoracion.jpg" alt=""> (decorativa)

ERROR 7 — Un formulario sin labels
❌ <input type="text" name="name">
✅ <label for="name">Nombre completo</label>
   <input type="text" id="name" name="name">

ERROR 8 — Color como único indicador
❌ "Los campos en rojo son obligatorios"
✅ Usar color + ícono + texto: ✱ Obligatorio
Por qué: Usuarios con daltonismo no distinguen el color.

ERROR 9 — Contraste insuficiente
✅ Texto normal: ratio mínimo 4.5:1 (WCAG AA)
✅ Texto grande (18px+): ratio mínimo 3:1
✅ Componentes UI y gráficos: ratio mínimo 3:1

ERROR 10 — Trampas de foco en modales
✅ Cuando se abre un modal, el foco debe moverse al modal
✅ El foco no debe poder salir del modal con Tab mientras está abierto
✅ Al cerrar el modal, el foco vuelve al elemento que lo abrió
```

---

## 19. Mapa Mental — Estructura de Página Correcta

```
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nombre de la página — Nombre del sitio</title>
  </head>
  <body>

    ┌─ <header> role="banner" ──────────────────────────────┐
    │   Logo, nombre del sitio                              │
    │   <nav aria-label="Navegación principal">             │
    │     <ul>                                              │
    │       <li><a href="/">Inicio</a></li>                 │
    │       <li><a href="/blog" aria-current="page">Blog</a>│
    │     </ul>                                             │
    │   </nav>                                              │
    └───────────────────────────────────────────────────────┘

    ┌─ <main> ──────────────────────────────────────────────┐
    │                                                       │
    │   <h1>Título principal de la página</h1>              │
    │                                                       │
    │   ┌─ <section aria-labelledby="sec-features"> ──────┐ │
    │   │   <h2 id="sec-features">Características</h2>    │ │
    │   │                                                  │ │
    │   │   ┌─ <article> ──────────────────────────────┐  │ │
    │   │   │   <header>                               │  │ │
    │   │   │     <h3>Nombre del feature</h3>          │  │ │
    │   │   │   </header>                              │  │ │
    │   │   │   <p>Descripción...</p>                  │  │ │
    │   │   │   <footer>                               │  │ │
    │   │   │     <address>Por <a href="">Autor</a>    │  │ │
    │   │   │     <time datetime="2025-05-01">         │  │ │
    │   │   │   </footer>                              │  │ │
    │   │   └──────────────────────────────────────────┘  │ │
    │   └──────────────────────────────────────────────────┘ │
    │                                                       │
    │   ┌─ <aside aria-label="Artículos relacionados"> ───┐ │
    │   │   Contenido complementario                      │ │
    │   └──────────────────────────────────────────────────┘ │
    └───────────────────────────────────────────────────────┘

    ┌─ <footer> role="contentinfo" ─────────────────────────┐
    │   <nav aria-label="Navegación secundaria">            │
    │   <address>Información de contacto</address>          │
    │   <small>© 2025 Mi Empresa</small>                    │
    └───────────────────────────────────────────────────────┘

  </body>
</html>
```

---

## Referencia Rápida — ¿Qué elemento usar?

| Necesito... | Usar |
|-------------|------|
| Encabezado del sitio | `<header>` |
| Menú de navegación | `<nav>` |
| Contenido principal | `<main>` |
| Artículo / post / card | `<article>` |
| Sección con título | `<section>` |
| Sidebar / widget | `<aside>` |
| Pie de página | `<footer>` |
| Datos de contacto del autor | `<address>` |
| Jerarquía de contenido | `<h1>`–`<h6>` |
| Párrafo | `<p>` |
| Texto importante | `<strong>` |
| Texto con énfasis | `<em>` |
| Título de obra | `<cite>` |
| Abreviatura | `<abbr title="">` |
| Fecha / hora | `<time datetime="">` |
| Texto resaltado | `<mark>` |
| Código inline | `<code>` |
| Bloque de código | `<pre><code>` |
| Lista sin orden | `<ul>` > `<li>` |
| Lista con orden | `<ol>` > `<li>` |
| Glosario / metadata | `<dl>` > `<dt>` + `<dd>` |
| Tabla de datos | `<table>` con `<caption>`, `<thead>`, `<th scope>` |
| Formulario | `<form>` con `<label>` + controles |
| Acción (guardar, enviar) | `<button type="button">` |
| Navegación (ir a URL) | `<a href="">` |
| Imagen de contenido | `<img alt="descripción">` |
| Imagen decorativa | `<img alt="">` |
| Imagen + descripción | `<figure>` + `<figcaption>` |
| Video | `<video controls>` + `<track kind="captions">` |
| Contenido colapsable | `<details>` + `<summary>` |
| Diálogo modal | `<dialog>` |
| Contenedor sin semántica (bloque) | `<div>` |
| Contenedor sin semántica (inline) | `<span>` |
| Ruptura temática | `<hr>` |
| Cita extensa | `<blockquote cite="">` |
| Cita breve inline | `<q cite="">` |
| Contenido eliminado/insertado | `<del>` + `<ins>` |
| Pie legal / copyright | `<small>` |
