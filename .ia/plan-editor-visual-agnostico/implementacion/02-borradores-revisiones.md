# Implementación 02: borradores, revisiones y publicación

Estado: **completado** (2026-11-07). Sin compatibilidad heredada: el sistema está en desarrollo y no tiene clientes, así que todo el contenido de página es versionado desde su creación. Verificado en SQLite, en MariaDB 11.8 con las migraciones reales y de extremo a extremo desde Campus.

## Modelo

- **Toda página nace versionada.** `CreatePage` crea en una sola transacción la fila de `pages`, la revisión 1 (documento canónico v1), la cabecera de revisiones, la entrada de auditoría y, si nace publicada, el evento del outbox.
- **El contenido solo cambia mediante revisiones:** `SavePageContent` (árbol del editor o HTML → documento canónico; guardar contenido idéntico no crea revisión) o `SavePageDraft` (documento ya canónico). Ambos usan concurrencia optimista (`If-Match`/`draft_revision`).
- **`UpdatePage` solo modifica metadatos.** Rechaza `content`, `published_at` e `id`, y solo permite pasar de `draft` a `archived` y viceversa en páginas no publicadas.
- **La publicación solo cambia mediante `PublishPage`** (publica el borrador de trabajo), `PublishPageRevision` (una revisión exacta, idempotente) y `UnpublishPage`.
- `pages.content` contiene siempre el JSON canónico de la revisión publicada; para páginas nunca publicadas, el de la revisión inicial. La lectura pública (`findBySlug`, `findPublished`) no cambia.
- **Integridad:** si `pages.content` se modifica por fuera (SQL directo, importación externa), la publicación se rechaza con `PUBLIC_CONTENT_DRIFT`. `ReconcilePageContent` conserva ese contenido como borrador nuevo sin perder el anterior.
- `GetPageWorkingRevision` entrega al editor la revisión de trabajo, su ETag, la revisión publicada y si hay cambios sin publicar.
- Se eliminaron el inicializador de backfill, los snapshots de esquema 0 y la captura «legacy». Las revisiones solo admiten el esquema 1.
- Migraciones reseteadas: `20261107000000_create_page_revision_tables` crea en una sola migración revisiones, cabeceras, outbox (`sequence` como clave primaria para FIFO), auditoría y tokens de preview. `20260522000013` ya no fija el nombre de su constraint, así que varias instalaciones pueden compartir base de datos.
- Todas las rutas mutantes del adaptador HTTP del módulo exigen `auth` + `csrf`.

## API (prefijo configurable, por defecto `/api/builder/v1`)

Todas las mutaciones exigen `auth` + `csrf`; cada operación exige la capacidad del contexto **y** la política del host (`RevisionOperationAuthorization`).

| Método y ruta | Capacidad / permiso CMS | Notas |
|---|---|---|
| `PUT pages/{id}/draft[?reason=autosave]` | `pages.update` | `If-Match: "n"`; 428 sin él, 412 si está obsoleto |
| `POST pages/{id}/publish-revision` | `pages.publish` | `Idempotency-Key`; 409 `PUBLIC_CONTENT_DRIFT` o `REVISION_CONFLICT` |
| `POST pages/{id}/restore` | `pages.restore` | Cuerpo `{"sourceRevision":n}` + `If-Match` |
| `POST pages/{id}/reconcile` | `pages.update` | `If-Match`; idempotente si no hay divergencia |
| `POST pages/{id}/unpublish` | `pages.unpublish` | `Idempotency-Key`; la revisión retirada pasa a ser el borrador de trabajo |
| `GET pages/{id}/revisions/{n}` | `pages.read` | Preview autenticado; `no-store` |
| `POST/DELETE pages/{id}/preview-tokens[/{tokenId}]` | `pages.update` | TTL 60–3600 s; máximo 50 activos por página; solo se guarda el SHA-256 |
| `GET preview/{token}` | público | Ligado a sitio, página y revisión; `no-store`, `noindex`, `no-referrer` |
| `PUT/DELETE pages/{id}/revisions/{n}/pin` | `pages.publish` | Protege la revisión de la retención |
| `GET pages/{id}/audit` | `pages.publish` | Orden estricto (ID autoincremental) |

Los errores 500 devuelven un mensaje genérico con `requestId`; el host recibe la excepción con ese mismo `requestId` mediante el reporter (por defecto `error_log`).

## Runbook operativo por tenant

1. **Migrar** con el runner del host (Campus: `CmsWrapper::initializeTenant` o `php artisan lemur:cms-migrate`). En entornos de desarrollo con datos anteriores, usar `refresh`.
2. **Permisos:** `SystemPermissionsSeeder` y `SystemRolesSeeder` crean `pages.restore` y `pages.unpublish`. El rol editor recibe `pages.restore`, pero no `pages.publish` ni `pages.unpublish`.
3. **Worker del outbox:** el host implementa `PublicationEventHandler` (idempotente por `event->id`) y ejecuta periódicamente `useCases.createPublicationOutboxDispatcher($handler)->execute()`. El FIFO por página es estricto, de modo que un evento en dead-letter bloquea los posteriores de esa página hasta `requeueFailed()`.
4. **Retención (cron, nunca vía web):** `useCases.purgePageRevisions->execute($policy)` en dry-run; después `execute($policy, false, 'ops:<usuario>')`. Primero archiva en `REVISION_ARCHIVE_PATH` y, si el archivo falla, no borra nada.
5. **Monitorización:** `useCases.pageRevisionMetrics->snapshot()`. Alertas sugeridas: `outboxDeadLettered > 0`, el retraso del outbox y el crecimiento de `conflicts` o `denied`.
6. **Divergencia:** ante `PUBLIC_CONTENT_DRIFT`, revisar el historial y ejecutar `reconcile`.
7. **Identidad de sitio:** el host fija `CMS_SITE_ID` en cada arranque (Campus: `tenant-<id>` o `central`). Esa variable es estado global del proceso y no debe heredarse entre tenants.

## Evidencia de verificación

- Módulo, suite completa con MariaDB temporal: **690 pruebas, 2.442 aserciones, en verde**. La única deprecación es previa, en `HtmlImporter.php:120`.
- Contrato MariaDB (`MariaDbRevisionContractTest`, opt-in con `CMS_CONTRACT_DB_*`): migraciones reales, ciclo completo, republicación idéntica, bloqueo entre conexiones, retención, FIFO, rollback y reaplicación, y escape de `LIKE`. También se verificó que dos prefijos conviven en la misma base de datos (19 migraciones cada uno).
- Arranque sin autoload de Composer: carga completa, 0 rutas mutantes sin CSRF, y crear, guardar y publicar funciona de extremo a extremo.
- Campus (`tests/Feature/Admin/CmsPageRevisionFlowTest.php`, opt-in): flujo HTTP real contra MariaDB, con 66 aserciones.

## Hallazgos previos fuera de alcance

1. `tests/TestCase.php` del módulo contiene credenciales por defecto de MySQL y espera un servidor en `127.0.0.1:3307`. Sin él, esas pruebas tardan hasta el timeout de conexión.
2. Campus: 59 claves `controllers.*` no tenían fichero de idioma. Se añadió el grupo `page`; el resto sigue mostrando la clave en bruto.
3. Campus: 3 pruebas fallan ya en el `HEAD` limpio (`InternalSsoTest` ×2 y `MarketplaceIntegrationTest`); no están relacionadas con el CMS.
4. Campus: ESLint y Prettier no tienen configuración válida (no hay `eslint.config.js` ni plugin de Svelte para Prettier).
