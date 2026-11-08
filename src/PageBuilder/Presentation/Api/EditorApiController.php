<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Presentation\Api;

use InvalidArgumentException;
use LemurCms\Media\Domain\Repository\MediaRepositoryInterface;
use LemurCms\Page\Domain\Repository\PageRepositoryInterface;
use LemurCms\Page\Application\SavePageDraft;
use LemurCms\Page\Application\PublishPageRevision;
use LemurCms\Page\Application\PageRevisionConflict;
use LemurCms\Page\Application\PagePublicationKeyConflict;
use LemurCms\PageBuilder\Application\ValidatePageDocument;
use LemurCms\PageBuilder\Domain\Catalogue\ComponentCatalogue;
use LemurCms\PageBuilder\Domain\Contract\DocumentAuthorization;
use LemurCms\PageBuilder\Domain\Contract\PagePublicationAuthorization;
use LemurCms\PageBuilder\Domain\Document\DocumentEnvelope;
use LemurCms\PageBuilder\Domain\Document\DocumentMigrator;
use LemurCms\PageBuilder\Domain\Document\HostContext;
use RuntimeException;
use Throwable;
use LemurDB;

/**
 * Controller exposing the versioned editor API under a configurable prefix.
 *
 * Implements structured, sanitized errors (code, message, fieldErrors, requestId),
 * capability negotiation, and multi-host isolation guarantees.
 */
final class EditorApiController
{
    /** @var callable|null */
    private $contextResolver;

    public function __construct(
        public readonly string $prefix,
        public readonly string $siteId,
        private readonly PageRepositoryInterface $pages,
        private readonly MediaRepositoryInterface $media,
        private readonly DocumentAuthorization $authorization,
        private readonly DocumentMigrator $migrator,
        private readonly ValidatePageDocument $validator,
        private readonly ComponentCatalogue $catalogue,
        ?callable $contextResolver = null,
        private readonly ?SavePageDraft $savePageDraft = null,
        private readonly ?LemurDB $revisionDb = null,
        private readonly ?PublishPageRevision $publishPageRevision = null,
        private readonly ?PagePublicationAuthorization $publicationAuthorization = null,
    ) {
        $this->contextResolver = $contextResolver;
    }

    public function saveDraft(string $id, string $json, ?string $ifMatch): array
    {
        if ($ifMatch === null || !preg_match('/^"([0-9]+)"$/', $ifMatch, $match)) {
            return $this->errorResponse('PRECONDITION_REQUIRED', 'A quoted revision is required in If-Match', 428);
        }
        try {
            $context = $this->resolveContext();
            if ($context->siteId !== $this->siteId || !in_array('pages.update', $context->capabilities, true)
                || !$this->authorization->canUpdate($context, $id)) {
                return $this->errorResponse('AUTHORIZATION_DENIED', 'Access denied', 403);
            }
            $document = DocumentEnvelope::fromJson($json);
            if ($document->documentId !== $id) {
                throw new InvalidArgumentException('Document ID does not match the page');
            }
            if ($this->savePageDraft === null) {
                throw new RuntimeException('Draft storage unavailable');
            }
            $revision = $this->savePageDraft->execute($document, (int) $match[1], $context->actorId);
            return ['success' => true, 'data' => ['revision' => $revision, 'etag' => '"' . $revision . '"']];
        } catch (PageRevisionConflict $conflict) {
            return $this->errorResponse('REVISION_CONFLICT', 'Draft revision has changed', 412, [
                'currentRevision' => (string) $conflict->currentRevision,
            ]);
        } catch (EditorAccessDenied $denied) {
            return $this->errorResponse('AUTHORIZATION_DENIED', 'Access denied', 403);
        } catch (InvalidArgumentException $invalid) {
            return $this->errorResponse('VALIDATION_FAILED', $invalid->getMessage(), 422);
        } catch (Throwable $error) {
            return $this->errorResponse('SAVE_FAILED', 'Unable to save draft', 500);
        }
    }

    public function publishRevision(string $id, string $json, ?string $idempotencyKey): array
    {
        try {
            $context = $this->resolveContext();
            if ($context->siteId !== $this->siteId || !in_array('pages.publish', $context->capabilities, true)
                || $this->publicationAuthorization === null
                || !$this->publicationAuthorization->canPublish($context, $id)) {
                return $this->errorResponse('AUTHORIZATION_DENIED', 'Access denied', 403);
            }
            if ($this->publishPageRevision === null) {
                throw new RuntimeException('Publication storage unavailable');
            }
            if ($this->pages->findById($id) === null) {
                return $this->errorResponse('PAGE_NOT_FOUND', 'Page unavailable', 404);
            }
            if ($idempotencyKey === null || trim($idempotencyKey) === '') {
                return $this->errorResponse('PRECONDITION_REQUIRED', 'Idempotency-Key is required', 428);
            }
            if (strlen($idempotencyKey) > 191) {
                throw new InvalidArgumentException('Invalid idempotency key');
            }
            $payload = json_decode($json, false, 512, JSON_THROW_ON_ERROR);
            if (!is_object($payload) || !is_int($payload->revision ?? null) || $payload->revision < 1) {
                throw new InvalidArgumentException('A positive revision is required');
            }
            $revisionId = $this->publishPageRevision->execute($id, $payload->revision, $idempotencyKey);
            return ['success' => true, 'data' => ['revision' => $payload->revision, 'revisionId' => $revisionId]];
        } catch (PageRevisionConflict $conflict) {
            return $this->errorResponse('REVISION_CONFLICT', 'Draft revision has changed', 409, [
                'currentRevision' => (string) $conflict->currentRevision,
            ]);
        } catch (PagePublicationKeyConflict $conflict) {
            return $this->errorResponse('IDEMPOTENCY_CONFLICT', 'Idempotency key belongs to another publication', 409);
        } catch (EditorAccessDenied $denied) {
            return $this->errorResponse('AUTHORIZATION_DENIED', 'Access denied', 403);
        } catch (\JsonException|InvalidArgumentException $invalid) {
            return $this->errorResponse('VALIDATION_FAILED', 'Invalid publication request', 422);
        } catch (Throwable $error) {
            return $this->errorResponse('PUBLISH_FAILED', 'Unable to publish revision', 500);
        }
    }

    public function draftHistory(string $id, int $limit = 20, int $offset = 0): array
    {
        try {
            $context = $this->resolveContext();
            if ($context->siteId !== $this->siteId || !in_array('pages.read', $context->capabilities, true)) {
                return $this->errorResponse('AUTHORIZATION_DENIED', 'Access denied', 403);
            }
            if ($limit < 1 || $limit > 100 || $offset < 0) {
                throw new InvalidArgumentException('Invalid history pagination');
            }
            if ($this->revisionDb === null || $this->pages->findById($id) === null) {
                return $this->errorResponse('PAGE_NOT_FOUND', 'Page unavailable', 404);
            }
            $revisions = $this->revisionDb->query('page_revisions')
                ->where(['page_id' => $id, 'site_id' => $context->siteId])
                ->orderBy('revision', 'DESC')->limit($limit, $offset)->get();
            return ['success' => true, 'data' => ['revisions' => array_map(static fn (array $row): array => [
                'id' => $row['id'], 'revision' => (int) $row['revision'],
                'authorId' => $row['author_id'], 'reason' => $row['reason'],
                'createdAt' => $row['created_at'], 'hash' => $row['content_hash'],
            ], $revisions)]];
        } catch (EditorAccessDenied $denied) {
            return $this->errorResponse('AUTHORIZATION_DENIED', 'Access denied', 403);
        } catch (InvalidArgumentException $invalid) {
            return $this->errorResponse('VALIDATION_FAILED', $invalid->getMessage(), 422);
        } catch (Throwable $error) {
            return $this->errorResponse('HISTORY_ERROR', 'Unable to load history', 500);
        }
    }

    public function showDraft(string $id): array
    {
        try {
            $context = $this->resolveContext();
            if ($context->siteId !== $this->siteId || !in_array('pages.read', $context->capabilities, true)) {
                return $this->errorResponse('AUTHORIZATION_DENIED', 'Access denied', 403);
            }
            if ($this->revisionDb === null || $this->pages->findById($id) === null) {
                return $this->errorResponse('PAGE_NOT_FOUND', 'Page unavailable', 404);
            }
            $head = $this->revisionDb->query('page_revision_heads')->where(['page_id' => $id])->first();
            $revisionId = $head['draft_revision_id'] ?? $head['published_revision_id'] ?? null;
            if ($revisionId === null) {
                return $this->errorResponse('REVISION_NOT_FOUND', 'Page revision unavailable', 404);
            }
            $row = $this->revisionDb->query('page_revisions')
                ->where(['id' => $revisionId, 'page_id' => $id, 'site_id' => $context->siteId])->first();
            if ($row === null) {
                return $this->errorResponse('REVISION_NOT_FOUND', 'Page revision unavailable', 404);
            }
            $revision = (int) $row['revision'];
            return ['success' => true, 'data' => [
                'revision' => $revision, 'etag' => '"' . $revision . '"',
                'snapshot' => json_decode($row['snapshot'], true, 512, JSON_THROW_ON_ERROR),
            ]];
        } catch (EditorAccessDenied $denied) {
            return $this->errorResponse('AUTHORIZATION_DENIED', 'Access denied', 403);
        } catch (Throwable $error) {
            return $this->errorResponse('LOAD_ERROR', 'Unable to load draft', 500);
        }
    }

    /**
     * Resolves the server-authenticated HostContext.
     *
     * @param array<string, mixed> $headers
     */
    public function resolveContext(array $headers = []): HostContext
    {
        $context = $this->contextResolver === null ? null : ($this->contextResolver)();
        if (!$context instanceof HostContext || $context->siteId !== $this->siteId) {
            throw new EditorAccessDenied('Authenticated site context required');
        }
        return $context;
    }

    /**
     * GET {prefix}/capabilities
     * Negotiates supported versions, permissions, and available components.
     *
     * @param array<string, mixed> $headers
     * @return array<string, mixed>
     */
    public function capabilities(array $headers = []): array
    {
        try {
            $context = $this->resolveContext($headers);
            $negotiated = NegotiatedCapabilities::negotiate(
                $context,
                $this->catalogue,
                $this->savePageDraft !== null && $this->revisionDb !== null,
                $this->publishPageRevision !== null && $this->publicationAuthorization !== null
            );
            return [
                'success' => true,
                'data'    => $negotiated->toArray(),
            ];
        } catch (EditorAccessDenied $e) {
            return $this->errorResponse('AUTHORIZATION_DENIED', 'Access denied', 403);
        } catch (Throwable $e) {
            return $this->errorResponse('CAPABILITIES_ERROR', 'Unable to resolve capabilities', 500);
        }
    }

    /**
     * GET {prefix}/components
     * Retrieves the versioned component catalogue.
     *
     * @return array<string, mixed>
     */
    public function components(): array
    {
        return [
            'success' => true,
            'data'    => [
                'components' => $this->catalogue->toArray(),
            ],
        ];
    }

    /**
     * GET {prefix}/components/{name}/diagnose
     * Inspects a component type. Unregistered components are retained as data with a recoverable warning.
     *
     * @return array<string, mixed>
     */
    public function diagnoseComponent(string $name): array
    {
        $diagnostic = $this->catalogue->diagnose($name);
        if ($diagnostic === null) {
            return [
                'success' => true,
                'data'    => [
                    'type'    => $name,
                    'isKnown' => true,
                    'status'  => 'supported',
                ],
            ];
        }

        return [
            'success' => true,
            'data'    => $diagnostic,
        ];
    }

    /**
     * GET {prefix}/pages/{id}
     * Loads a page as a versioned document envelope.
     *
     * @param array<string, mixed> $headers
     * @return array<string, mixed>
     */
    public function showPage(string $id, array $headers = []): array
    {
        try {
            $context = $this->resolveContext($headers);

            if ($context->siteId !== $this->siteId) {
                return $this->errorResponse('SITE_MISMATCH', 'Target page is unavailable on this connection', 403);
            }
            if (!in_array('pages.read', $context->capabilities, true)) {
                return $this->errorResponse('FORBIDDEN', 'Insufficient read permissions', 403);
            }

            $page = $this->pages->findById($id);
            if ($page === null) {
                return $this->errorResponse('PAGE_NOT_FOUND', "Page '{$id}' does not exist", 404);
            }

            $content = $page['content'] ?? [];
            $json = is_string($content) ? $content : json_encode($content, JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES);
            $envelope = DocumentEnvelope::fromJson($json, $id);

            return [
                'success' => true,
                'data'    => [
                    'document'      => json_decode($envelope->toJson(), true, 512, JSON_THROW_ON_ERROR),
                    'sourceVersion' => $envelope->sourceVersion,
                ],
            ];
        } catch (EditorAccessDenied $e) {
            return $this->errorResponse('AUTHORIZATION_DENIED', 'Access denied', 403);
        } catch (Throwable $e) {
            return $this->errorResponse('LOAD_ERROR', 'Unable to load document', 500);
        }
    }

    /**
     * POST {prefix}/pages/{id}/validate
     * Validates a proposed page document against limits, identifiers, and site media references.
     *
     * @param array<string, mixed>|string $documentPayload
     * @param array<string, mixed> $headers
     * @return array<string, mixed>
     */
    public function validatePage(string $id, array|string $documentPayload, array $headers = []): array
    {
        try {
            $context = $this->resolveContext($headers);

            $json = is_string($documentPayload)
                ? $documentPayload
                : json_encode($documentPayload, JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES);

            $document = DocumentEnvelope::fromJson($json, $id);
            if ($document->documentId !== $id) {
                throw new InvalidArgumentException('Document ID does not match the requested page');
            }
            $this->validator->execute($context, $document);

            return [
                'success' => true,
                'data'    => [
                    'valid'      => true,
                    'documentId' => $id,
                ],
            ];
        } catch (RuntimeException $e) {
            return $this->errorResponse('AUTHORIZATION_DENIED', 'Access denied', 403);
        } catch (InvalidArgumentException $e) {
            return $this->errorResponse('VALIDATION_FAILED', $e->getMessage(), 422, [
                'document' => $e->getMessage(),
            ]);
        } catch (Throwable $e) {
            return $this->errorResponse('INTERNAL_ERROR', 'Validation encountered an unexpected error', 500);
        }
    }

    /**
     * POST {prefix}/pages/{id}/migrate
     * Executes deterministic migration of a legacy page to v1 with incompatibility report and snapshot.
     *
     * @param array<string, mixed> $headers
     * @return array<string, mixed>
     */
    public function migratePage(string $id, array $headers = []): array
    {
        try {
            $context = $this->resolveContext($headers);

            if ($context->siteId !== $this->siteId || !in_array('pages.update', $context->capabilities, true)
                || !$this->authorization->canUpdate($context, $id)) {
                return $this->errorResponse('AUTHORIZATION_DENIED', 'Unauthorized migration request', 403);
            }

            $page = $this->pages->findById($id);
            if ($page === null) {
                return $this->errorResponse('PAGE_NOT_FOUND', "Page '{$id}' does not exist", 404);
            }

            $content = $page['content'] ?? [];
            $report = $this->migrator->migrate($content, $id);

            return [
                'success' => $report->isSuccessful,
                'data'    => $report->toArray(),
            ];
        } catch (EditorAccessDenied $e) {
            return $this->errorResponse('AUTHORIZATION_DENIED', 'Access denied', 403);
        } catch (Throwable $e) {
            return $this->errorResponse('MIGRATION_ERROR', 'Unable to migrate document', 500);
        }
    }

    /**
     * Formats structured, sanitized error responses without leaking traces or secrets.
     *
     * @param array<string, string> $fieldErrors
     * @return array<string, mixed>
     */
    private function errorResponse(string $code, string $message, int $status, array $fieldErrors = []): array
    {
        $error = EditorError::create($code, $message, $fieldErrors);
        return [
            'success' => false,
            'status'  => $status,
            ...$error->toArray(),
        ];
    }
}
