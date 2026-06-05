<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Contract;

use LemurCms\PageBuilder\Domain\Entity\ComponentDefinition;
use LemurCms\PageBuilder\Import\Contract\RuleInterface;

/**
 * Contract for installable UI framework modules (Bootstrap 5, Tailwind, Material UI, etc.).
 *
 * Each framework encapsulates:
 *  - its component catalogue (ComponentDefinition[])
 *  - its structural containment rules
 *  - its HTML import rules (RuleInterface[])
 *  - the path to its SSR view templates
 *
 * The core of Lemur CMS never depends on a concrete framework; it only
 * depends on this interface, making the system fully agnostic.
 */
interface UiFrameworkModuleInterface
{
    /**
     * Unique machine identifier for this framework module.
     * Examples: 'bootstrap5', 'tailwind_css', 'material_ui_v5'
     */
    public function getIdentifier(): string;

    /**
     * Human-readable name shown in the admin UI.
     */
    public function getName(): string;

    /**
     * Component definitions that this module contributes to the Page Builder catalogue.
     *
     * @return ComponentDefinition[]
     */
    public function getComponentDefinitions(): array;

    /**
     * Structural containment rules: which component names are valid children of which.
     * Used by TreeValidator to enforce structure.
     *
     * Example: ['accordion' => ['accordion-item'], 'row' => ['col']]
     *
     * @return array<string, string[]>
     */
    public function getContainmentRules(): array;

    /**
     * HTML import rules specific to this framework.
     * Injected into RuleRegistry when importing HTML with this framework active.
     *
     * @return RuleInterface[]
     */
    public function getImportRules(): array;

    /**
     * Absolute path to the directory containing SSR view templates for this framework.
     */
    public function getViewsDirectoryPath(): string;
}
