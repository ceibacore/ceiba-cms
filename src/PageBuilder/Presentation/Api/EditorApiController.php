<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Presentation\Api;

use InvalidArgumentException;
use LemurCms\Media\Domain\Repository\MediaRepositoryInterface;
use LemurCms\Page\Domain\Repository\PageRepositoryInterface;
use LemurCms\PageBuilder\Application\ValidatePageDocument;
use LemurCms\PageBuilder\Domain\Catalogue\ComponentCatalogue;
use LemurCms\PageBuilder\Domain\Contract\DocumentAuthorization;
use LemurCms\PageBuilder\Domain\Document\DocumentEnvelope;
use LemurCms\PageBuilder\Domain\Document\DocumentMigrator;
use LemurCms\PageBuilder\Domain\Document\HostContext;
use RuntimeException;
use Throwable;

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
    ) {
        $this->contextResolver = $contextResolver;
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
            $negotiated = NegotiatedCapabilities::negotiate($context, $this->catalogue);
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
