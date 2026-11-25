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
        /** @var (\Closure(): ?AssembleContentPage)|null content pages (plan 07-D), resolved when a preview is drawn */
        private readonly ?\Closure $contentPages = null,
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
        if ($pageId !== null && str_starts_with($pageId, 'content|')) {
            $assembled = $this->content($pageId, $parts, $hasSession);
        } elseif ($pageId === null) {
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

    /**
     * `content|record|<source>|<slug>`, `content|archive|<source>` or `content|search||<words>` (plan 07-D).
     * @param list<SitePart> $parts
     * @return array<string, mixed>
     */
    private function content(string $context, array $parts, bool $hasSession): array
    {
        $pages = $this->contentPages === null ? null : ($this->contentPages)();
        [, $kind, $source, $slug] = array_pad(explode('|', $context, 4), 4, '');
        if ($pages === null || !in_array($kind, ['record', 'archive', 'search'], true) || ($kind !== 'search' && $source === '')) {
            throw new InvalidRules('page', 'NOT_FOUND');
        }
        $sourceId = $kind === 'search' ? null : $source;
        $layout = $this->defaultLayout->execute();
        $assembled = $pages->renderMatch(['content' => $kind, 'source' => $sourceId, 'slug' => $slug], '/preview-content',
            $kind === 'search' ? ['q' => (string) $slug] : [], $this->locale(), $hasSession, $layout?->footerTree ?? [], $layout?->id, $parts);
        if (($assembled['status'] ?? 200) === 404) {
            throw new InvalidRules('page', 'NOT_FOUND');
        }

        return $assembled;
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
