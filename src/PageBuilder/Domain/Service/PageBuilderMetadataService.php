<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Service;

use LemurCms\PageBuilder\Domain\Repository\TemplateRepositoryInterface;
use LemurCms\PageBuilder\Domain\Repository\PageTemplateRepositoryInterface;

final class PageBuilderMetadataService
{
    public function __construct(
        private readonly ?UiFrameworkRegistry $uiRegistry,
        private readonly TemplateRepositoryInterface $templateRepo,
        private readonly PageTemplateRepositoryInterface $pageTemplateRepo,
        private readonly HtmlSemanticRulesProvider $rulesProvider
    ) {}

    /**
     * Get HTML semantic guidelines and tag constraints.
     */
    public function getHtmlTagRules(?string $tag = null): array
    {
        return $this->rulesProvider->getRules($tag);
    }

    /**
     * Get UI Component Definitions from active framework.
     */
    public function getComponentDefinitions(): array
    {
        if ($this->uiRegistry === null || !$this->uiRegistry->hasActive()) {
            return [];
        }
        $definitions = $this->uiRegistry->getActiveModule()->getComponentDefinitions();
        return array_map(fn($d) => $d->toArray(), $definitions);
    }

    /**
     * Get custom components / global templates.
     */
    public function getTemplates(): array
    {
        return $this->templateRepo->findAll();
    }

    /**
     * Get page templates / layouts.
     */
    public function getPageTemplates(): array
    {
        return $this->pageTemplateRepo->findAll();
    }

    /**
     * Get all metadata in one call.
     */
    public function getAllMetadata(): array
    {
        return [
            'components' => $this->getComponentDefinitions(),
            'templates' => $this->getTemplates(),
            'page_templates' => $this->getPageTemplates(),
            'html_tags' => $this->getHtmlTagRules(),
        ];
    }
}
