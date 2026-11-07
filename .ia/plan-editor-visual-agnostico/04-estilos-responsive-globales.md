# 04. Estilos responsive, clases y diseño global

Estado: propuesta pendiente. Depende de 01; se consume desde 03 y 06. Referencia local: `src/PageBuilder/Domain/Entity/Node.php` guarda atributos en `props`, pero no declara campos específicos para estilos responsive ni referencias a tokens.

## Resultado esperado

Separar contenido, semántica y presentación. Representar espaciado, tipografía, colores, dimensiones, posición, fondos, bordes, sombras, layout Flex/Grid y estados interactivos mediante datos validados. Compartir decisiones de diseño entre páginas sin depender de Bootstrap, Tailwind o del CSS del host.

## Modelo propuesto

Añadir extensiones versionadas al documento según 01: estilos por nodo, IDs de clases reutilizables y referencias a tokens. Preservar `props.class` heredado sin considerarlo equivalente al nuevo sistema de clases. El vocabulario definitivo se congela con el contrato de 01 antes de implementarse.

Ejemplo ilustrativo del bloque de estilo, no formato vigente:

```json
{
  "base": {"display": "grid", "gap": {"token": "space.medium"}},
  "breakpoints": {"wide": {"gridTemplateColumns": "1fr 1fr"}},
  "states": {"focus-visible": {"outlineWidth": "2px"}}
}
```

Los tokens tienen ID estable, nombre editable, tipo y valor. Tipos iniciales: color, longitud, familia tipográfica, peso, duración y sombra. Referencias de tipos incompatibles se rechazan; detectar referencias circulares. Eliminar un token exige reemplazo, materialización de su valor o bloqueo si está en uso.

## Cascada e herencia

Adoptar mobile-first: `base` aplica siempre y cada breakpoint aplica desde un `minWidth` único ordenado ascendentemente. La configuración de breakpoints pertenece al sitio y tiene versión. No mezclar semánticas min-width y max-width en el modelo inicial. Cambiar breakpoints exige preview de impacto y revisión del diseño global.

Orden propuesto de prioridad: valores del componente, tokens/estilos globales, clases del documento y estilos del nodo. Entre clases, el orden declarado debe producir un resultado determinista. Los estados se compilan en el mismo orden de fuentes. Una propiedad omitida hereda; una acción explícita de quitar override elimina la declaración. No interpretar `null` indistintamente como CSS `unset` y eliminación.

La UI debe mostrar valor efectivo, procedencia y override actual. Cambiar el viewport solo cambia la vista. Un control indica siempre qué breakpoint y estado está editando.

## Compilador CSS

Crear un servicio puro que recibe documento validado, diseño global versionado y manifiesto de componentes, y produce CSS determinista más diagnósticos. Generar selectores acotados a documento y nodo para evitar colisiones. Ordenar declaraciones y normalizar valores; no interpolar texto sin validar.

Permitir propiedades/unidades explícitas; analizar valores compuestos con reglas por propiedad. Rechazar escapes, URLs o funciones no admitidas. Las imágenes de fondo se resuelven mediante identificadores de medios. CSS personalizado, si se incorpora, será una capacidad separada y restringida, con parser, límites y aislamiento; nunca una vía automática para eludir validación.

Cachear por hash de documento, versión de compilador, diseño global y catálogo. El despliegue de un token debe invalidar únicamente dependencias afectadas. Publicación debe asociar HTML y CSS a la misma versión para impedir mezclar contenido nuevo con CSS anterior.

## Pasos de implementación

1. Definir tipos y matriz de propiedades soportadas; resolver contrato de tokens y breakpoints.
2. Añadir serialización compatible y validadores a backend/frontend con fixtures comunes.
3. Implementar compilador y diagnósticos por ruta del documento; probar determinismo.
4. Implementar API de lectura/edición del diseño global con revisión y permisos propios.
5. Integrar controles de dimensiones, layout, tipografía, color y estados en inspector.
6. Agregar administración de clases, referencias y búsqueda de usos antes de eliminar.
7. Incorporar fondos, efectos, transformaciones y animaciones con reducción de movimiento.
8. Añadir publicación atómica del diseño global, preview del impacto y restauración de revisión.

## Pruebas y aceptación

Comparar CSS en límites exactos y alrededor de cada breakpoint. Verificar que borrar un override recupera el valor heredado. Probar precedencia de clases, tokens rotos/cíclicos, estados focus/hover y repetición del compilador con salida idéntica. Validar que un selector no modifica páginas vecinas ni el host.

Ejecutar fixtures de inyección CSS, URLs peligrosas y valores excesivamente grandes. Probar invalidación de cache y rollback de tokens. Aceptar cuando un mismo documento produce estilos reproducibles en editor y SSR, un cambio global actualiza sus consumidores y documentos heredados mantienen su presentación.

## Compatibilidad y recuperación

No convertir automáticamente clases Bootstrap en estilos canónicos: su semántica depende del adaptador. Ofrecer migración optativa con informe de equivalencias y reglas sin equivalencia. Conservar snapshot previo y diseño global asociado. Una versión antigua que no comprenda los nuevos estilos no debe reescribir el documento descartándolos.

## Integración obligatoria con el host

Permitir al editor Svelte consumir los contratos de estilos mediante su transporte actual. Aislar CSS de documentos sin alterar los estilos administrativos del host. Véase [00: integración en sistemas existentes](00-integracion-en-sistemas-existentes.md).
