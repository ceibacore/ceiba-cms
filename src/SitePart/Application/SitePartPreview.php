<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Application;

use CeibaCms\Http\Controllers\HomeController;
use CeibaCms\Page\Domain\Repository\PageRepositoryInterface;
use CeibaCms\PageBuilder\Application\GetDefaultLayout;
use CeibaCms\PageBuilder\Application\GetLayoutById;
use CeibaCms\SitePart\Domain\InvalidRules;
use CeibaCms\SitePart\Domain\RenderContext;
use CeibaCms\SitePart\Domain\SitePart;
use CeibaCms\SitePart\Domain\SitePartRules;
use CeibaCms\SitePart\Infrastructure\SitePartStore;

/**
 * A page (or the 404) as it would look if one revision of a site part and its draft rules were published (plan
 * 06-C): the other parts stay as published. The resolution says whether the part applies in that context.
 */
final class SitePartPreview
{
    public function __construct(
        private readonly \CeibaDB $db,
        private readonly string $siteId,
        private readonly SitePartStore $store,
        private readonly AssembleSitePage $sitePage,
        private readonly PageRepositoryInterface $pages,
        private readonly GetLayoutById $layouts,
        private readonly GetDefaultLayout $defaultLayout,
        private readonly HostRoutes $routes = new HostRoutes(),
        /** The site language, or a closure that reads it when a preview is drawn (never at bootstrap). */
        private readonly \Closure|string $locale = 'es',
    ) {}

    private function locale(): string
    {
        return is_string($this->locale) ? $this->locale : (string) ($this->locale)();
    }

    /** @return array{html: string, css: string, parts: array<string, mixed>, applies: bool} */
    public function render(string $partId, int $revision, ?string $pageId, bool $hasSession = false): array
    {
        $row = $this->store->find($partId);
        $tree = $row === null ? null : $this->tree($partId, $revision);
        if ($row === null || $tree === null) {
            throw new InvalidRules('id', 'NOT_FOUND');
        }
        $part = new SitePart($partId, $row['kind'], $row['name'], SitePartRules::from($row['rules'], $row['kind'], $this->routes->names()), $tree);
        $parts = [...array_values(array_filter($this->store->published(), fn (SitePart $p) => $p->id !== $partId)), $part];
        if ($pageId === null) {
            $layout = $this->defaultLayout->execute();
            $assembled = $this->sitePage->notFound(RenderContext::notFound('/preview-404', $this->locale(), $hasSession), $layout?->footerTree ?? [], $parts)
                ?? ['html' => '', 'header' => null, 'footer' => '', 'css' => '', 'parts' => ['parts' => [], 'conflicts' => []]];
        } else {
            $page = $this->pages->findById($pageId);
            if ($page === null || ($page['kind'] ?? 'page') !== 'page') {
                throw new InvalidRules('page', 'NOT_FOUND');
            }
            $layout = (!empty($page['layout_id']) ? $this->layouts->execute((string) $page['layout_id']) : null) ?? $this->defaultLayout->execute();
            $slug = (string) ($page['slug'] ?? '');
            $context = RenderContext::forPage([...$page, 'layout_id' => $layout?->id], '/' . $slug, $this->locale(), $hasSession,
                in_array($slug, HomeController::HOME_SLUGS, true));
            $content = is_array($page['content'] ?? null) ? $page['content'] : [];
            $assembled = $this->sitePage->page($content, $page, $context, $layout?->footerTree ?? [], [], $parts);
        }
        $applies = in_array($partId, $assembled['parts']['parts'], true);
        return ['html' => ($assembled['header'] ?? '') . $assembled['html'] . $assembled['footer'], 'css' => $assembled['css'],
            'parts' => $assembled['parts'], 'applies' => $applies];
    }

    /** @return list<mixed>|null root of the stored revision of this site */
    private function tree(string $partId, int $revision): ?array
    {
        $query = $this->db->pdo()->prepare("SELECT snapshot FROM {$this->db->getPrefix()}page_revisions WHERE page_id = ? AND revision = ? AND site_id = ?");
        $query->execute([$partId, $revision, $this->siteId]);
        $snapshot = $query->fetchColumn();
        $decoded = is_string($snapshot) ? json_decode($snapshot, true) : null;
        return is_array($decoded['root'] ?? null) ? array_values($decoded['root']) : null;
    }
}
