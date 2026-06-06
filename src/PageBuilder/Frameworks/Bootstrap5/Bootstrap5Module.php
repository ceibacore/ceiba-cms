<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Frameworks\Bootstrap5;

use LemurCms\PageBuilder\Domain\Contract\UiFrameworkModuleInterface;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\AccordionRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\BreadcrumbRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\ButtonGroupRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\ButtonRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\CardRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\CarouselRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\CollapseRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\ColRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\ContainerRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\ListGroupRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\OffcanvasRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\RowRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\ScrollspyRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\ToastRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\TooltipRule;


/**
 * Bootstrap 5 UI Framework Module.
 *
 * Encapsulates all Bootstrap 5 specific:
 *  - import rules (HTML → VDOM)
 *  - component definitions
 *  - structural containment rules
 *  - SSR view templates path
 *
 * Register in bootstrap.php:
 *   $uiRegistry = new UiFrameworkRegistry();
 *   $uiRegistry->register(new Bootstrap5Module());
 *   $uiRegistry->setActive('bootstrap5');
 */
final class Bootstrap5Module implements UiFrameworkModuleInterface
{
    public function getIdentifier(): string
    {
        return 'bootstrap5';
    }

    public function getName(): string
    {
        return 'Bootstrap 5';
    }

    /**
     * {@inheritdoc}
     *
     * Returns all rules this framework contributes to the HTML importer.
     * Priority 300 = Bootstrap components, 200 = Semantic HTML5, 100 = Generic.
     * FallbackRule (priority 0) is always added by HtmlImporter itself.
     */
    public function getImportRules(): array
    {
        return [
            // Priority 300 — Bootstrap 5 components (override core rules when BS5 is active)
            new ContainerRule(),
            new RowRule(),
            new ColRule(),
            new CardRule(),
            new ButtonRule(),
            new ButtonGroupRule(),
            new ListGroupRule(),
            new AccordionRule(),
            new CarouselRule(),
            new CollapseRule(),
            new OffcanvasRule(),
            new ToastRule(),
            new TooltipRule(),
            new BreadcrumbRule(),
            new ScrollspyRule(),
        ];
    }

    /**
     * {@inheritdoc}
     *
     * Structural containment: which component names are valid children of which.
     */
    public function getContainmentRules(): array
    {
        return [
            'row'       => ['col'],
            'accordion' => ['accordion-item'],
            'carousel'  => ['carousel-item'],
            'list-group' => ['list-group-item'],
        ];
    }

    /**
     * {@inheritdoc}
     * Component definitions are loaded lazily from the DB via ComponentDefinitionRepository.
     * This method returns an empty array; override in a subclass if static definitions are needed.
     */
    public function getComponentDefinitions(): array
    {
        return [];
    }

    /**
     * {@inheritdoc}
     */
    public function getViewsDirectoryPath(): string
    {
        return __DIR__ . '/views';
    }
}
