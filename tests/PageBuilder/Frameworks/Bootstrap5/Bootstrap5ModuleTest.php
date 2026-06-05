<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Frameworks\Bootstrap5;

use LemurCms\PageBuilder\Domain\Contract\UiFrameworkModuleInterface;
use LemurCms\PageBuilder\Frameworks\Bootstrap5\Bootstrap5Module;
use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use PHPUnit\Framework\TestCase;

class Bootstrap5ModuleTest extends TestCase
{
    private Bootstrap5Module $module;

    protected function setUp(): void
    {
        parent::setUp();
        $this->module = new Bootstrap5Module();
    }

    // ── Contract ──────────────────────────────────────────────────────────────

    public function testImplementsInterface(): void
    {
        $this->assertInstanceOf(UiFrameworkModuleInterface::class, $this->module);
    }

    public function testIdentifier(): void
    {
        $this->assertSame('bootstrap5', $this->module->getIdentifier());
    }

    public function testName(): void
    {
        $this->assertSame('Bootstrap 5', $this->module->getName());
    }

    // ── Import rules ──────────────────────────────────────────────────────────

    public function testGetImportRulesReturnsArray(): void
    {
        $rules = $this->module->getImportRules();
        $this->assertIsArray($rules);
        $this->assertNotEmpty($rules);
    }

    public function testAllImportRulesImplementRuleInterface(): void
    {
        foreach ($this->module->getImportRules() as $rule) {
            $this->assertInstanceOf(
                RuleInterface::class,
                $rule,
                sprintf('%s must implement RuleInterface', get_class($rule))
            );
        }
    }

    public function testImportRulesContainBootstrapComponents(): void
    {
        $classes = array_map('get_class', $this->module->getImportRules());

        $expected = [
            \LemurCms\PageBuilder\Import\Rules\Bootstrap\ContainerRule::class,
            \LemurCms\PageBuilder\Import\Rules\Bootstrap\RowRule::class,
            \LemurCms\PageBuilder\Import\Rules\Bootstrap\ColRule::class,
            \LemurCms\PageBuilder\Import\Rules\Bootstrap\CardRule::class,
            \LemurCms\PageBuilder\Import\Rules\Bootstrap\ButtonRule::class,
            \LemurCms\PageBuilder\Import\Rules\Bootstrap\AccordionRule::class,
        ];

        foreach ($expected as $class) {
            $this->assertContains($class, $classes, "Missing rule: {$class}");
        }
    }

    public function testImportRulesContainSemanticRules(): void
    {
        $classes = array_map('get_class', $this->module->getImportRules());

        $expected = [
            \LemurCms\PageBuilder\Import\Rules\Semantic\HeadingRule::class,
            \LemurCms\PageBuilder\Import\Rules\Semantic\ParagraphRule::class,
            \LemurCms\PageBuilder\Import\Rules\Semantic\ImageRule::class,
            \LemurCms\PageBuilder\Import\Rules\Semantic\SemanticSectionRule::class,
        ];

        foreach ($expected as $class) {
            $this->assertContains($class, $classes, "Missing rule: {$class}");
        }
    }

    public function testFallbackRuleIsNotInModuleRules(): void
    {
        // FallbackRule is always added by HtmlImporter, never by the module
        $classes = array_map('get_class', $this->module->getImportRules());
        $this->assertNotContains(
            \LemurCms\PageBuilder\Import\Rules\FallbackRule::class,
            $classes,
            'FallbackRule must NOT be provided by the module — HtmlImporter adds it'
        );
    }

    public function testAllRulesHaveValidPriority(): void
    {
        foreach ($this->module->getImportRules() as $rule) {
            $priority = $rule->priority();
            $this->assertIsInt($priority);
            $this->assertGreaterThan(0, $priority, sprintf(
                '%s must have priority > 0 (0 is reserved for FallbackRule)',
                get_class($rule)
            ));
        }
    }

    // ── Containment rules ─────────────────────────────────────────────────────

    public function testGetContainmentRulesReturnsArray(): void
    {
        $this->assertIsArray($this->module->getContainmentRules());
    }

    public function testContainmentRulesDefineRowAcceptsCol(): void
    {
        $rules = $this->module->getContainmentRules();
        $this->assertArrayHasKey('row', $rules);
        $this->assertContains('col', $rules['row']);
    }

    public function testContainmentRulesDefineAccordionAcceptsItem(): void
    {
        $rules = $this->module->getContainmentRules();
        $this->assertArrayHasKey('accordion', $rules);
        $this->assertContains('accordion-item', $rules['accordion']);
    }

    // ── Views path ────────────────────────────────────────────────────────────

    public function testGetViewsDirectoryPathReturnsString(): void
    {
        $path = $this->module->getViewsDirectoryPath();
        $this->assertIsString($path);
        $this->assertNotEmpty($path);
    }

    public function testViewsDirectoryPathExists(): void
    {
        $path = $this->module->getViewsDirectoryPath();
        $this->assertDirectoryExists($path, "Views directory must exist: {$path}");
    }
}
