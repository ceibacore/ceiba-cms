<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Presentation\Api;

use CeibaCms\Page\Application\GetPageWorkingRevision;
use CeibaCms\Page\Domain\Repository\PageRepositoryInterface;
use CeibaCms\PageBuilder\Application\PageAssembler;
use CeibaCms\PageBuilder\Domain\Service\BladeRendererInterface;
use CeibaCms\PageBuilder\Application\GetDefaultLayout;
use CeibaCms\PageBuilder\Application\GetLayoutById;
use CeibaCms\SitePart\Application\AssembleSitePage;
use CeibaCms\SitePart\Domain\RenderContext;
use CeibaCms\Menu\Application\GetNavbar;
use CeibaCms\Settings\Domain\Repository\SettingsRepositoryInterface;
use Throwable;

/**
 * Editor endpoints for the publication state and the server preview (plan 03-D). It reuses the editor and revision
 * controllers, so access rules (site, capabilities, host policy) stay in one place.
 */
final class EditorPreviewController
{
    public function __construct(
        private readonly EditorApiController $editor,
        private readonly RevisionApiController $revisions,
        private readonly GetPageWorkingRevision $working,
        private readonly BladeRendererInterface $renderer,
        private readonly ?PageAssembler $assembler = null,
        private readonly ?PageRepositoryInterface $pages = null,
        private readonly ?AssembleSitePage $sitePage = null,
        private readonly ?GetLayoutById $layouts = null,
        private readonly ?GetDefaultLayout $defaultLayout = null,
        private readonly ?GetNavbar $navbar = null,
        private readonly ?SettingsRepositoryInterface $settings = null,
    ) {}

    /**
     * GET {prefix}/pages/{id}/status — working and published revision, and whether there is something to publish.
     *
     * @return array<string, mixed>
     */
    public function status(string $pageId): array
    {
        $draft = $this->editor->showDraft($pageId);
        if (($draft['success'] ?? false) !== true) {
            return $draft;
        }
        $working = $this->working->execute($pageId);
        return ['success' => true, 'data' => [
            'revision' => $draft['data']['revision'],
            'publishedRevision' => $working['publishedRevision'] ?? null,
            'hasUnpublishedChanges' => (bool) ($working['hasUnpublishedChanges'] ?? true),
        ]];
    }

    /**
     * GET {prefix}/pages/{id}/revisions/{n}/render — the revision as the public renderer draws it (content and its CSS,
     * without the site layout). The editor shows it in a sandboxed frame without scripts.
     *
     * @return array<string, mixed>
     */
    public function render(string $pageId, int $revision): array
    {
        $stored = $this->revisions->showRevision($pageId, $revision);
        if (($stored['success'] ?? false) !== true) {
            return $stored;
        }
        try {
            $root = $stored['data']['snapshot']['root'] ?? [];
            $root = is_array($root) ? $root : [];
            if ($this->assembler === null) {
                return ['success' => true, 'data' => ['revision' => $revision, 'html' => $this->renderer->renderPage($root), 'css' => '']];
            }
            // As an anonymous visitor sees it once published: published design, global and page custom CSS.
            $page = $this->pages?->findById($pageId) ?? [];
            if ($this->sitePage !== null && ($page['kind'] ?? 'page') === 'page') {
                return $this->renderPage($revision, $root, $page);
            }
            $assembled = $this->assembler->assemble($root, $page, false);
            return ['success' => true, 'data' => ['revision' => $revision, 'html' => $assembled['html'], 'css' => $assembled['css']]];
        } catch (Throwable $error) {
            error_log('[ceiba-cms] preview render failed: ' . $error->getMessage());
            return ['success' => false, 'status' => 500, ...EditorError::create('RENDER_FAILED', 'Unable to render the revision')->toArray()];
        }
    }

    private function renderPage(int $revision, array $root, array $page): array
    {
        $layout = !empty($page['layout_id']) ? $this->layouts?->execute((string) $page['layout_id']) : null;
        $layout ??= $this->defaultLayout?->execute();
        $path = '/' . ltrim((string) ($page['slug'] ?? ''), '/');
        $context = RenderContext::forPage([...$page, 'layout_id' => $layout?->id], $path,
            $this->settings?->get('site_language', 'es') ?? 'es', false);
        $assembled = $this->sitePage->page($root, $page, $context, $layout?->footerTree ?? []);
        $header = $assembled['header'];
        if ($header === null && $layout !== null && $layout->menuSlug && $this->navbar !== null) {
            try {
                $header = $this->navbar->execute($layout->menuSlug);
            } catch (Throwable) {
                $header = '';
            }
        }
        return ['success' => true, 'data' => ['revision' => $revision,
            'html' => ($header ?? '') . $assembled['html'] . $assembled['footer'], 'css' => $assembled['css']]];
    }
}
