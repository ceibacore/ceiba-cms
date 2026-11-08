<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use InvalidArgumentException;
use LemurCms\Page\Domain\Repository\PageRepositoryInterface;

/**
 * Updates page metadata (title, slug, layout, custom code...). Content is
 * versioned and changes only through SavePageContent/SavePageDraft; publication
 * changes only through PublishPage/UnpublishPage.
 */
final class UpdatePage
{
    private const FORBIDDEN = ['id', 'content', 'published_at', 'created_at'];
    private const OFFLINE_STATUSES = ['draft', 'archived'];

    public function __construct(private readonly PageRepositoryInterface $repo) {}

    /** @param array<string, mixed> $data */
    public function execute(string $id, array $data): void
    {
        $page = $this->repo->findById($id);
        if ($page === null) {
            throw new PageNotFound();
        }
        foreach (self::FORBIDDEN as $field) {
            if (array_key_exists($field, $data)) {
                throw new InvalidArgumentException($field === 'content'
                    ? 'Page content is versioned; save it with savePageContent'
                    : "Field {$field} cannot be updated");
            }
        }
        if (array_key_exists('status', $data)) {
            if ($data['status'] === $page['status']) {
                unset($data['status']);
            } elseif ($page['status'] === 'published' || !in_array($data['status'], self::OFFLINE_STATUSES, true)) {
                throw new InvalidArgumentException('Publication changes go through publishPage and unpublishPage');
            }
        }
        if ($data === []) {
            return;
        }
        $data['updated_at'] = date('Y-m-d H:i:s');
        $this->repo->update($id, $data);
    }
}
