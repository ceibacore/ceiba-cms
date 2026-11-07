# Implementación 10 — Componentes de comercio mediante adaptadores

Estado: propuesta. Dependencias: 01–07; requiere un proveedor comercial real para validación de integración. No existe promesa de compatibilidad con todos los proveedores.

## Alcance

Plantillas de producto, catálogo y categoría; galería, título, precio, variantes, disponibilidad, botón de compra, resumen de carrito y enlaces de checkout/cuenta. Carrito y checkout visual se incorporan cuando el adaptador declara soporte. No construir un motor propio de pagos, impuestos o inventario dentro del editor.

## Contratos propuestos

`CommerceProvider` expone capabilities y puertos para catálogo, carrito, checkout y cuenta. `ProductView` contiene ID opaco, título, descripción sanitizada, media, variantes, precio con moneda e importe en unidades menores, disponibilidad y URL. Nunca usar flotantes para dinero.

`CartSnapshot` contiene versión, líneas, totales calculados por proveedor y moneda. `addItem`, `updateQuantity` y `removeItem` aceptan versión e idempotencyKey. `CheckoutSession` devuelve URL autorizada y expiración, o controles embebidos proporcionados por un SDK oficial del proveedor. El CMS no recibe números de tarjeta.

`CommerceContext` lleva sitio, identidad comercial, idioma y moneda autorizados por host. El catálogo público y operaciones de cuenta tienen políticas separadas. La UI consulta capabilities para ocultar funciones no soportadas y muestra errores recuperables si cambia inventario/precio.

## Implementaciones incrementales

1. Definir puertos y proveedor falso para pruebas contractuales; no presentarlo como integración productiva.
2. Integrar catálogo de lectura y bindings con 07; crear componentes accesibles de producto.
3. Crear plantillas single/archive con 06 y preview con producto de referencia.
4. Implementar carrito con control de concurrencia, loading, errores y recuperación.
5. Integrar checkout alojado y retorno seguro; confirmar estado con proveedor, nunca con parámetros del navegador.
6. Añadir adaptador real elegido por proyecto, pruebas sandbox y documentación de capacidades soportadas.
7. Incorporar cuenta/pedidos y checkout embebido solo después de verificar permisos y soporte del proveedor.

## Seguridad y consistencia

Precio, descuentos, stock y total definitivos proceden del proveedor en cada operación. Validar cantidad, variante y pertenencia al sitio. Credenciales solo en servidor; URLs de redirección permitidas. Carritos privados no usan caché pública. Webhooks se verifican según firma, ventana temporal y deduplicación del proveedor; admitir entrega repetida o desordenada. Un evento confirmado actualiza proyecciones con idempotencia y auditoría.

## Criterios de aceptación

- Un cliente no puede manipular precio o ver carrito ajeno.
- Dos cambios concurrentes retornan conflicto recuperable o snapshot vigente, sin pérdida silenciosa.
- Compra de variante agotada se rechaza y conserva contexto del usuario.
- Precio/moneda se formatean correctamente, incluyendo monedas sin dos decimales.
- Repetir solicitud o webhook no duplica operaciones del CMS.
- Timeout del proveedor no informa éxito falso; el usuario puede reintentar o consultar estado.
- Tema publicado funciona con datos reales en sandbox y navegación por teclado.

## Rollout

Activar primero catálogo de lectura; después carrito y checkout en sandbox. Producción requiere credenciales y validación del adaptador del host. Revertir UI no cancela pedidos ni reembolsa pagos; conservar callbacks y tareas pendientes hasta cerrar sus operaciones.
