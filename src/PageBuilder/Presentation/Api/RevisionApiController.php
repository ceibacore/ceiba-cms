<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Presentation\Api;

use InvalidArgumentException;
use JsonException;
use LemurDB;
use LemurCms\Page\Application\ReconcilePageContent;
use LemurCms\Page\Application\PagePreviewTokens;
use LemurCms\Page\Application\PagePublicationKeyConflict;
use LemurCms\Page\Application\PageRevisionAuditLog;
use LemurCms\Page\Application\PageRevisionConflict;
use LemurCms\Page\Application\PageRevisionNotFound;
use LemurCms\Page\Application\PinPageRevision;
use LemurCms\Page\Application\PreviewTokenLimitReached;
use LemurCms\Page\Application\RestorePageRevision;
use LemurCms\Page\Application\UnpublishPage;
use LemurCms\PageBuilder\Domain\Contract\RevisionOperationAuthorization;
use LemurCms\PageBuilder\Domain\Document\HostContext;
use Throwable;

/**
 * Versioned API for revision operations: restore, reconcile, unpublish,
 * authenticated and token previews, retention pins and audit trail.
 *
 * Every operation requires both the HostContext capability and the host policy.
 * Denials and conflicts are audited best-effort; server errors are reported to the
 * optional error reporter with the same requestId returned to the client.
 */
final class RevisionApiController
{
    /** Headers every preview response must carry (route adapters apply them). */
    public const PREVIEW_HEADERS = [
        'Cache-Control' => 'no-store, private, max-age=0',
        'X-Robots-Tag' => 'noindex, nofollow, noarchive',
        'Referrer-Policy' => 'no-referrer',
        'X-Content-Type-Options' => 'nosniff',
    ];

    /** @var callable */
    private $contextResolver;
    /** @var callable|null */
    private $errorReporter;

    public function __construct(
        private readonly string $siteId,
        callable $contextResolver,
        private readonly RevisionOperationAuthorization $authorization,
        private readonly PageRevisionAuditLog $audit,
        private readonly RestorePageRevision $restore,
        private readonly ReconcilePageContent $reconcile,
        private readonly UnpublishPage $unpublishPage,
        private readonly PagePreviewTokens $previews,
        private readonly PinPageRevision $pin,
        private readonly LemurDB $db,
        ?callable $errorReporter = null,
    ) {
        $this->contextResolver = $contextResolver;
        $this->errorReporter = $errorReporter;
    }

    /** POST {prefix}/pages/{id}/restore  body {"sourceRevision": n}, If-Match: "current" */
    public function restore(string $pageId, string $json, ?string $ifMatch): array
    {
        return $this->guarded($pageId, 'restore', 'pages.restore', RevisionOperationAuthorization::RESTORE,
            function (HostContext $context) use ($pageId, $json, $ifMatch): array {
                $expected = $this->ifMatch($ifMatch);
                if ($expected === null) {
                    return $this->error('PRECONDITION_REQUIRED', 'A quoted revision is required in If-Match', 428);
                }
                $source = $this->positiveInt($json, 'sourceRevision');
                $revision = $this->restore->execute($pageId, $source, $expected, $context->actorId);
                return ['success' => true, 'data' => ['revision' => $revision, 'etag' => '"' . $revision . '"']];
            });
    }

    /** POST {prefix}/pages/{id}/reconcile  If-Match: "current" */
    public function reconcile(string $pageId, ?string $ifMatch): array
    {
        return $this->guarded($pageId, 'reconcile', 'pages.update', RevisionOperationAuthorization::RECONCILE,
            function (HostContext $context) use ($pageId, $ifMatch): array {
                $expected = $this->ifMatch($ifMatch);
                if ($expected === null) {
                    return $this->error('PRECONDITION_REQUIRED', 'A quoted revision is required in If-Match', 428);
                }
                $result = $this->reconcile->execute($pageId, $expected, $context->actorId);
                return ['success' => true, 'data' => $result + ['etag' => '"' . $result['revision'] . '"']];
            });
    }

    /** POST {prefix}/pages/{id}/unpublish  Idempotency-Key required */
    public function unpublish(string $pageId, ?string $idempotencyKey): array
    {
        return $this->guarded($pageId, 'unpublish', 'pages.unpublish', RevisionOperationAuthorization::UNPUBLISH,
            function (HostContext $context) use ($pageId, $idempotencyKey): array {
                if ($idempotencyKey === null || trim($idempotencyKey) === '') {
                    return $this->error('PRECONDITION_REQUIRED', 'Idempotency-Key is required', 428);
                }
                if (strlen($idempotencyKey) > 191) {
                    throw new InvalidArgumentException('Invalid idempotency key');
                }
                $revisionId = $this->unpublishPage->execute($pageId, $idempotencyKey, $context->actorId);
                return ['success' => true, 'data' => ['unpublished' => $revisionId !== null, 'revisionId' => $revisionId]];
            });
    }

    /** GET {prefix}/pages/{id}/revisions/{revision} — authenticated preview of any revision. */
    public function showRevision(string $pageId, int $revision): array
    {
        return $this->guarded($pageId, null, 'pages.read', null, function () use ($pageId, $revision): array {
            if ($revision < 1) {
                throw new InvalidArgumentException('A positive revision is required');
            }
            $query = $this->db->pdo()->prepare("SELECT revision, snapshot, reason, author_id, created_at, pinned
                FROM {$this->db->getPrefix()}page_revisions WHERE page_id = ? AND site_id = ? AND revision = ?");
            $query->execute([$pageId, $this->siteId, $revision]);
            $row = $query->fetch(\PDO::FETCH_ASSOC);
            if ($row === false) {
                return $this->error('REVISION_NOT_FOUND', 'Page revision unavailable', 404);
            }
            $snapshot = json_decode($row['snapshot'], true, 512, JSON_THROW_ON_ERROR);
            return ['success' => true, 'data' => [
                'revision' => (int) $row['revision'], 'reason' => $row['reason'], 'authorId' => $row['author_id'],
                'createdAt' => $row['created_at'], 'pinned' => (bool) (int) $row['pinned'], 'snapshot' => $snapshot,
            ]];
        });
    }

    /** POST {prefix}/pages/{id}/preview-tokens  body {"revision": n, "ttl": seconds?} */
    public function issuePreview(string $pageId, string $json): array
    {
        return $this->guarded($pageId, 'preview_issue', 'pages.update', RevisionOperationAuthorization::PREVIEW,
            function (HostContext $context) use ($pageId, $json): array {
                $payload = $this->payload($json);
                $revision = $payload->revision ?? null;
                $ttl = $payload->ttl ?? PagePreviewTokens::DEFAULT_TTL;
                if (!is_int($revision) || $revision < 1 || !is_int($ttl)) {
                    throw new InvalidArgumentException('A positive revision and an integer ttl are required');
                }
                return ['success' => true, 'status' => 201, 'data' => $this->previews->issue($pageId, $revision, $context->actorId, $ttl)];
            });
    }

    /** DELETE {prefix}/pages/{id}/preview-tokens[/{tokenId}] */
    public function revokePreviews(string $pageId, ?string $tokenId = null): array
    {
        return $this->guarded($pageId, 'preview_revoke', 'pages.update', RevisionOperationAuthorization::PREVIEW,
            function (HostContext $context) use ($pageId, $tokenId): array {
                if ($tokenId !== null && !preg_match('/^[0-9a-f-]{36}$/D', $tokenId)) {
                    throw new InvalidArgumentException('Invalid preview token ID');
                }
                return ['success' => true, 'data' => ['revoked' => $this->previews->revoke($pageId, $context->actorId, $tokenId)]];
            });
    }

    /** GET {prefix}/preview/{token} — public, token-bound; apply PREVIEW_HEADERS. */
    public function resolvePreview(string $token): array
    {
        try {
            $preview = $this->previews->resolve($token);
            if ($preview === null) {
                return $this->error('PREVIEW_UNAVAILABLE', 'Preview link is invalid or has expired', 404);
            }
            return ['success' => true, 'data' => $preview];
        } catch (Throwable $error) {
            return $this->failure($error, 'PREVIEW_ERROR', 'Unable to load preview');
        }
    }

    /** PUT|DELETE {prefix}/pages/{id}/revisions/{revision}/pin */
    public function setPin(string $pageId, int $revision, bool $pinned): array
    {
        return $this->guarded($pageId, $pinned ? 'pin' : 'unpin', 'pages.publish', RevisionOperationAuthorization::PIN,
            function (HostContext $context) use ($pageId, $revision, $pinned): array {
                if ($revision < 1) {
                    throw new InvalidArgumentException('A positive revision is required');
                }
                $changed = $this->pin->execute($pageId, $revision, $pinned, $context->actorId);
                return ['success' => true, 'data' => ['revision' => $revision, 'pinned' => $pinned, 'changed' => $changed]];
            });
    }

    /** GET {prefix}/pages/{id}/audit?limit=&offset= */
    public function auditTrail(string $pageId, int $limit = 50, int $offset = 0): array
    {
        return $this->guarded($pageId, null, 'pages.publish', RevisionOperationAuthorization::AUDIT,
            function () use ($pageId, $limit, $offset): array {
                return ['success' => true, 'data' => ['entries' => $this->audit->forPage($pageId, $limit, $offset)]];
            });
    }

    /**
     * @param callable(HostContext): array<string, mixed> $operation
     * @return array<string, mixed>
     */
    private function guarded(string $pageId, ?string $auditAction, string $capability, ?string $policyOperation, callable $operation): array
    {
        $context = null;
        try {
            $context = $this->resolveContext();
            if (!in_array($capability, $context->capabilities, true)
                || ($policyOperation !== null && !$this->authorization->canPerform($context, $pageId, $policyOperation))) {
                return $this->outcome($pageId, $auditAction, 'denied', $context,
                    $this->error('AUTHORIZATION_DENIED', 'Access denied', 403));
            }
            if (!$this->pageExists($pageId)) {
                return $this->error('PAGE_NOT_FOUND', 'Page unavailable', 404);
            }
            return $operation($context);
        } catch (EditorAccessDenied) {
            return $this->error('AUTHORIZATION_DENIED', 'Access denied', 403);
        } catch (PageRevisionConflict $conflict) {
            return $this->outcome($pageId, $auditAction, 'conflict', $context,
                $this->error('REVISION_CONFLICT', 'Draft revision has changed', 412, ['currentRevision' => (string) $conflict->currentRevision]));
        } catch (PagePublicationKeyConflict) {
            return $this->outcome($pageId, $auditAction, 'conflict', $context,
                $this->error('IDEMPOTENCY_CONFLICT', 'Idempotency key belongs to another operation', 409));
        } catch (PageRevisionNotFound) {
            return $this->error('REVISION_NOT_FOUND', 'Page revision unavailable', 404);
        } catch (PreviewTokenLimitReached $limit) {
            return $this->error('PREVIEW_LIMIT_REACHED', $limit->getMessage(), 429);
        } catch (JsonException|InvalidArgumentException $invalid) {
            return $this->error('VALIDATION_FAILED', 'Invalid request', 422);
        } catch (Throwable $error) {
            $response = $this->failure($error, 'OPERATION_FAILED', 'Unable to complete the revision operation');
            return $this->outcome($pageId, $auditAction, 'failed', $context, $response);
        }
    }

    private function resolveContext(): HostContext
    {
        $context = ($this->contextResolver)();
        if (!$context instanceof HostContext || $context->siteId !== $this->siteId) {
            throw new EditorAccessDenied('Authenticated site context required');
        }
        return $context;
    }

    private function pageExists(string $pageId): bool
    {
        if ($pageId === '' || strlen($pageId) > 64) {
            return false;
        }
        $query = $this->db->pdo()->prepare("SELECT 1 FROM {$this->db->getPrefix()}pages WHERE id = ?");
        $query->execute([$pageId]);
        return $query->fetchColumn() !== false;
    }

    private function ifMatch(?string $header): ?int
    {
        return $header !== null && preg_match('/^"([0-9]{1,10})"$/', $header, $match) ? (int) $match[1] : null;
    }

    private function payload(string $json): object
    {
        $payload = json_decode($json, false, 16, JSON_THROW_ON_ERROR);
        if (!is_object($payload)) {
            throw new InvalidArgumentException('A JSON object is required');
        }
        return $payload;
    }

    private function positiveInt(string $json, string $field): int
    {
        $value = $this->payload($json)->{$field} ?? null;
        if (!is_int($value) || $value < 1) {
            throw new InvalidArgumentException("{$field} must be a positive integer");
        }
        return $value;
    }

    /** @param array<string, mixed> $response */
    private function outcome(string $pageId, ?string $action, string $result, ?HostContext $context, array $response): array
    {
        if ($action !== null && $this->pageExists($pageId)) {
            $this->audit->recordQuietly($pageId, $action, $result, $context?->actorId, [], $response['error']['requestId'] ?? null);
        }
        return $response;
    }

    private function failure(Throwable $error, string $code, string $message): array
    {
        $response = $this->error($code, $message, 500);
        if ($this->errorReporter !== null) {
            try {
                ($this->errorReporter)($response['error']['requestId'], $error);
            } catch (Throwable) {
                // Reporting must never change the response.
            }
        }
        return $response;
    }

    /** @param array<string, string> $fieldErrors */
    private function error(string $code, string $message, int $status, array $fieldErrors = []): array
    {
        return ['success' => false, 'status' => $status, ...EditorError::create($code, $message, $fieldErrors)->toArray()];
    }
}
