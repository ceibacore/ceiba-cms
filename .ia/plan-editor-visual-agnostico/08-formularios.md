# Implementación 08 — Formularios, envíos y acciones

Estado: propuesta; no se verificó un constructor de formularios existente. Depende de 01–05 y del puerto de tareas del host. Correo, CRM y webhooks son adaptadores explícitos.

## Alcance

Diseñar formularios de uno o varios pasos con texto, email, número, fecha, selección, checkbox, consentimiento y archivo. Configurar reglas condicionales y validaciones compartidas entre editor y servidor. Guardar envíos, consultar estados, exportar con permisos y ejecutar acciones posteriores. La primera entrega admite guardar envío y notificación; integraciones adicionales se habilitan individualmente.

## Contratos y almacenamiento propuestos

`FormDefinition`: siteId, id, revision, fields, conditionalRules, actionRefs, retentionPolicy y successBehavior. Cada campo tiene ID estable, tipo, etiqueta, restricciones y clasificación de dato; cambiar etiqueta no cambia su identidad. `Submission` conserva formRevision, valores normalizados, fecha, estado e idempotencyKey. El usuario no puede elegir destinatarios ni credenciales mediante campos ocultos.

Puertos `SubmissionRepository`, `SubmissionAction`, `MailGateway`, `JobQueue` y `SecretStore`. Las acciones reciben un contexto mínimo y autorizado. Tabla outbox en la misma transacción que el envío; un worker realiza efectos externos con reintentos limitados, backoff y cola de fallos. No prometer entrega exactamente una vez: aplicar idempotencia al efecto cuando el proveedor la soporte.

API propuesta: definición y revisión bajo `/api/builder/v1/forms`; envío público bajo `/api/forms/{publicId}/submissions`; listado/exportación autenticados bajo `/api/builder/v1/forms/{id}/submissions`. La respuesta pública no incluye valores sensibles ni confirma existencia de usuarios.

## Implementación paso a paso

1. Definir tipos y validadores; esquema de reglas condicionales sin evaluación de código libre.
2. Crear persistencia y política de retención, aislamiento por sitio y permisos por acción.
3. Añadir endpoint público con límites por sitio/formulario/origen y protección antiabuso configurable.
4. Implementar outbox, worker, idempotencia y seguimiento de acciones.
5. Incorporar campos accesibles al editor y navegación de pasos con errores vinculados al campo.
6. Añadir visor de envíos, exportación y eliminación auditada.
7. Integrar correo y webhook mediante adaptadores; CRM requiere contrato y credenciales del host.

## Seguridad

Validación definitiva en servidor, límites de longitud/tamaño y normalización explícita. CSRF en sesiones con cookies; los formularios anónimos necesitan antiabuso adicional. Archivos en cuarentena fuera del webroot, MIME real, nombre generado, descarga autorizada y escaneo mediante puerto. Bloquear SSRF en webhooks y redirecciones de éxito externas no permitidas. Cifrar campos sensibles según política mediante proveedor de claves; TLS en tránsito. No guardar secretos en árboles exportables, logs ni respuestas. Exportar CSV evitando fórmulas ejecutables.

## Pruebas y aceptación

Dos envíos con la misma clave no crean dos registros. Un fallo del correo no pierde el envío y queda visible como acción pendiente/fallida. Validación rechaza valores manipulados aunque el navegador los acepte. Un usuario sin permiso no lee ni exporta envíos; un sitio no accede a otro. Verificar archivos maliciosos, retención, consentimiento versionado, teclado, foco y anuncio de errores. Un worker interrumpido se recupera sin perder acciones; documentar posibles duplicados externos.

## Despliegue

Migraciones aditivas, worker monitorizado y límites configurados antes de publicar el primer formulario. Activar por sitio. Revertir deshabilita nuevos envíos y acciones sin borrar los existentes; conservar capacidad administrativa de exportación y eliminación según retención.
