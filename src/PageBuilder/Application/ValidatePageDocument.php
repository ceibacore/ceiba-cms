<?php
declare(strict_types=1);

namespace CeibaCms\PageBuilder\Application;

use CeibaCms\Media\Domain\Repository\MediaRepositoryInterface;
use CeibaCms\Page\Domain\Repository\PageRepositoryInterface;
use CeibaCms\PageBuilder\Domain\Contract\DocumentAuthorization;
use CeibaCms\PageBuilder\Domain\Document\DocumentEnvelope;
use CeibaCms\PageBuilder\Domain\Document\DocumentWriteValidator;
use CeibaCms\PageBuilder\Domain\Document\HostContext;
use RuntimeException;

/** Construct with the site ID and repositories of the same server-resolved connection. */
final class ValidatePageDocument
{
    public function __construct(
        private readonly string $siteId,
        private readonly PageRepositoryInterface $pages,
        private readonly MediaRepositoryInterface $media,
        private readonly DocumentAuthorization $authorization,
    ) {}

    public function execute(HostContext $context, DocumentEnvelope $document): void
    {
        $pageId = $document->documentId;
        if ($context->siteId !== $this->siteId || !in_array('pages.update', $context->capabilities, true)
            || !$this->authorization->canUpdate($context, $pageId) || $this->pages->findById($pageId) === null) {
            throw new RuntimeException('Page unavailable for this operation');
        }
        (new DocumentWriteValidator())->validate($document, fn (string $id): bool => $this->media->findById($id) !== null);
    }
}
