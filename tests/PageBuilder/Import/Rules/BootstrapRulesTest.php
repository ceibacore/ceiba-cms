<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Import\Rules;

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
use LemurCms\PageBuilder\Import\Rules\Bootstrap\RowRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\ScrollspyRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\ToastRule;
use LemurCms\PageBuilder\Import\Rules\Bootstrap\TooltipRule;
use PHPUnit\Framework\TestCase;

class BootstrapRulesTest extends TestCase
{
    // ── Helper ───────────────────────────────────────────────────────────────

    private function el(string $html): \DOMElement
    {
        $dom = new \DOMDocument();
        libxml_use_internal_errors(true);
        $dom->loadHTML('<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>' . $html . '</body></html>');
        libxml_clear_errors();
        libxml_use_internal_errors(false);
        return $dom->getElementsByTagName('body')->item(0)->firstChild;
    }

    private function noop(): callable
    {
        return fn(\DOMElement $el): ?array => null;
    }

    // ── ContainerRule ────────────────────────────────────────────────────────

    public function testContainerRuleMatchesContainer(): void
    {
        $rule = new ContainerRule();
        $this->assertTrue($rule->matches($this->el('<div class="container"></div>')));
        $this->assertTrue($rule->matches($this->el('<div class="container-fluid"></div>')));
        $this->assertTrue($rule->matches($this->el('<div class="container-lg"></div>')));
        $this->assertFalse($rule->matches($this->el('<div class="row"></div>')));
    }

    public function testContainerRuleExtractsFluidFlag(): void
    {
        $rule   = new ContainerRule();
        $result = $rule->extract($this->el('<div class="container-fluid"></div>'), $this->noop());
        $this->assertSame('container', $result['type']);
        $this->assertTrue($result['props']['fluid']);
    }

    public function testContainerRuleNonFluid(): void
    {
        $rule   = new ContainerRule();
        $result = $rule->extract($this->el('<div class="container mt-4"></div>'), $this->noop());
        $this->assertFalse($result['props']['fluid']);
        $this->assertSame('mt-4', $result['props']['class']);
    }

    // ── RowRule ──────────────────────────────────────────────────────────────

    public function testRowRuleMatchesRow(): void
    {
        $rule = new RowRule();
        $this->assertTrue($rule->matches($this->el('<div class="row"></div>')));
        $this->assertFalse($rule->matches($this->el('<div class="col-md-6"></div>')));
    }

    public function testRowRuleExtractsGutterAndAlign(): void
    {
        $rule   = new RowRule();
        $result = $rule->extract($this->el('<div class="row g-3 align-items-center justify-content-end"></div>'), $this->noop());
        $this->assertSame('row', $result['type']);
        $this->assertSame('g-3', $result['props']['gutter']);
        $this->assertSame('center', $result['props']['align']);
        $this->assertSame('end', $result['props']['justify']);
    }

    // ── ColRule ──────────────────────────────────────────────────────────────

    public function testColRuleMatchesColVariants(): void
    {
        $rule = new ColRule();
        $this->assertTrue($rule->matches($this->el('<div class="col"></div>')));
        $this->assertTrue($rule->matches($this->el('<div class="col-md-6"></div>')));
        $this->assertTrue($rule->matches($this->el('<div class="col-6"></div>')));
        $this->assertFalse($rule->matches($this->el('<div class="row"></div>')));
    }

    public function testColRuleExtractsBreakpoints(): void
    {
        $rule   = new ColRule();
        $result = $rule->extract($this->el('<div class="col-sm-4 col-lg-8"></div>'), $this->noop());
        $this->assertSame('col', $result['type']);
        $this->assertSame(4, $result['props']['sm']);
        $this->assertSame(8, $result['props']['lg']);
    }

    // ── ButtonRule ───────────────────────────────────────────────────────────

    public function testButtonRuleMatchesBtnOnAnchor(): void
    {
        $rule = new ButtonRule();
        $this->assertTrue($rule->matches($this->el('<a class="btn btn-primary" href="#">Click</a>')));
        $this->assertTrue($rule->matches($this->el('<button class="btn btn-secondary">Click</button>')));
        $this->assertFalse($rule->matches($this->el('<div class="btn btn-primary"></div>')));
    }

    public function testButtonRuleExtractsLabelAndVariant(): void
    {
        $rule   = new ButtonRule();
        $result = $rule->extract($this->el('<a class="btn btn-danger" href="/go" target="_blank">Go</a>'), $this->noop());
        $this->assertSame('button', $result['type']);
        $this->assertSame('Go', $result['props']['label']);
        $this->assertSame('danger', $result['props']['variant']);
        $this->assertSame('/go', $result['props']['href']);
        $this->assertSame('_blank', $result['props']['target']);
        $this->assertTrue($result['consumes']);
    }

    public function testButtonRuleExtractsOutlineVariant(): void
    {
        $rule   = new ButtonRule();
        $result = $rule->extract($this->el('<button class="btn btn-outline-secondary btn-sm">Cancelar</button>'), $this->noop());
        $this->assertSame('outline-secondary', $result['props']['variant']);
        $this->assertSame('sm', $result['props']['size']);
    }

    // ── ButtonGroupRule ──────────────────────────────────────────────────────

    public function testButtonGroupRuleMatches(): void
    {
        $rule = new ButtonGroupRule();
        $this->assertTrue($rule->matches($this->el('<div class="btn-group"></div>')));
        $this->assertTrue($rule->matches($this->el('<div class="btn-group-vertical"></div>')));
        $this->assertFalse($rule->matches($this->el('<div class="btn"></div>')));
    }

    public function testButtonGroupRuleExtractsVertical(): void
    {
        $rule   = new ButtonGroupRule();
        $result = $rule->extract($this->el('<div class="btn-group-vertical"></div>'), $this->noop());
        $this->assertSame('button_group', $result['type']);
        $this->assertTrue($result['props']['vertical']);
        $this->assertFalse($result['consumes']);
    }

    // ── CardRule ─────────────────────────────────────────────────────────────

    public function testCardRuleMatchesCard(): void
    {
        $rule = new CardRule();
        $this->assertTrue($rule->matches($this->el('<div class="card"></div>')));
        $this->assertFalse($rule->matches($this->el('<div class="row"></div>')));
    }

    public function testCardRuleExtractsTitleAndText(): void
    {
        $rule = new CardRule();
        $html = '<div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Mi Titulo</h5>
                        <p class="card-text">Descripcion</p>
                    </div>
                    <div class="card-footer">Pie</div>
                 </div>';
        $result = $rule->extract($this->el($html), $this->noop());
        $this->assertSame('card', $result['type']);
        $this->assertSame('Mi Titulo', $result['props']['title']);
        $this->assertSame('Descripcion', $result['props']['text']);
        $this->assertSame('Pie', $result['props']['footer']);
        $this->assertTrue($result['consumes']);
    }

    // ── ListGroupRule ────────────────────────────────────────────────────────

    public function testListGroupRuleMatchesListGroup(): void
    {
        $rule = new ListGroupRule();
        $this->assertTrue($rule->matches($this->el('<ul class="list-group"></ul>')));
        $this->assertFalse($rule->matches($this->el('<ul class="nav"></ul>')));
    }

    public function testListGroupRuleExtractsItems(): void
    {
        $rule = new ListGroupRule();
        $html = '<ul class="list-group">
                    <li class="list-group-item active">Primero</li>
                    <li class="list-group-item">Segundo</li>
                 </ul>';
        $result = $rule->extract($this->el($html), $this->noop());
        $this->assertSame('list_group', $result['type']);
        $this->assertCount(2, $result['props']['items']);
        $this->assertTrue($result['props']['items'][0]['active']);
        $this->assertSame('Primero', $result['props']['items'][0]['label']);
        $this->assertFalse($result['props']['items'][1]['active']);
    }

    // ── AccordionRule ────────────────────────────────────────────────────────

    public function testAccordionRuleMatchesAccordion(): void
    {
        $rule = new AccordionRule();
        $this->assertTrue($rule->matches($this->el('<div class="accordion"></div>')));
        $this->assertFalse($rule->matches($this->el('<div class="collapse"></div>')));
    }

    public function testAccordionRuleExtractsItems(): void
    {
        $rule = new AccordionRule();
        $html = '<div class="accordion" id="acc1">
                    <div class="accordion-item">
                        <h2 class="accordion-header">Pregunta 1</h2>
                        <div class="accordion-collapse show">
                            <div class="accordion-body">Respuesta 1</div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">Pregunta 2</h2>
                        <div class="accordion-collapse">
                            <div class="accordion-body">Respuesta 2</div>
                        </div>
                    </div>
                 </div>';
        $result = $rule->extract($this->el($html), $this->noop());
        $this->assertSame('accordion', $result['type']);
        $this->assertCount(2, $result['children']);
        $this->assertSame('accordion_item', $result['children'][0]['type']);
        $this->assertSame('Pregunta 1', $result['children'][0]['props']['title']);
        $this->assertTrue($result['children'][0]['props']['open']);
        $this->assertFalse($result['children'][1]['props']['open']);
    }

    // ── BreadcrumbRule ───────────────────────────────────────────────────────

    public function testBreadcrumbRuleMatchesBreadcrumb(): void
    {
        $rule = new BreadcrumbRule();
        $this->assertTrue($rule->matches($this->el('<ol class="breadcrumb"></ol>')));
        $this->assertFalse($rule->matches($this->el('<ul class="list-group"></ul>')));
    }

    public function testBreadcrumbRuleExtractsItems(): void
    {
        $rule = new BreadcrumbRule();
        $html = '<ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/">Inicio</a></li>
                    <li class="breadcrumb-item active">Página</li>
                 </ol>';
        $result = $rule->extract($this->el($html), $this->noop());
        $this->assertSame('breadcrumb', $result['type']);
        $this->assertCount(2, $result['props']['items']);
        $this->assertSame('Inicio', $result['props']['items'][0]['label']);
        $this->assertSame('/', $result['props']['items'][0]['href']);
        $this->assertTrue($result['props']['items'][1]['active']);
    }

    // ── CollapseRule ─────────────────────────────────────────────────────────

    public function testCollapseRuleMatchesCollapse(): void
    {
        $rule = new CollapseRule();
        $this->assertTrue($rule->matches($this->el('<div class="collapse" id="c1"></div>')));
        $this->assertFalse($rule->matches($this->el('<div class="accordion-collapse"></div>')));
    }

    public function testCollapseRuleExtractsId(): void
    {
        $rule   = new CollapseRule();
        $result = $rule->extract($this->el('<div class="collapse" id="collapseDemo"></div>'), $this->noop());
        $this->assertSame('collapse', $result['type']);
        $this->assertSame('collapseDemo', $result['props']['id']);
        $this->assertFalse($result['consumes']);
    }

    // ── TooltipRule ──────────────────────────────────────────────────────────

    public function testTooltipRuleMatchesDataBsToggle(): void
    {
        $rule = new TooltipRule();
        $this->assertTrue($rule->matches($this->el('<button data-bs-toggle="tooltip" data-bs-title="Tip">?</button>')));
        $this->assertFalse($rule->matches($this->el('<button class="btn">Click</button>')));
    }

    public function testTooltipRuleExtractsTextAndPlacement(): void
    {
        $rule   = new TooltipRule();
        $result = $rule->extract($this->el('<button data-bs-toggle="tooltip" data-bs-title="Ayuda" data-bs-placement="bottom">?</button>'), $this->noop());
        $this->assertSame('tooltip', $result['type']);
        $this->assertSame('Ayuda', $result['props']['text']);
        $this->assertSame('bottom', $result['props']['placement']);
        $this->assertSame('?', $result['props']['trigger_label']);
    }

    // ── ToastRule ────────────────────────────────────────────────────────────

    public function testToastRuleMatchesToast(): void
    {
        $rule = new ToastRule();
        $this->assertTrue($rule->matches($this->el('<div class="toast"></div>')));
        $this->assertFalse($rule->matches($this->el('<div class="toast-container"></div>')));
    }

    public function testToastRuleExtractsTitleAndBody(): void
    {
        $rule = new ToastRule();
        $html = '<div class="toast bg-success">
                    <div class="toast-header"><strong>Éxito</strong></div>
                    <div class="toast-body">Operación completada</div>
                 </div>';
        $result = $rule->extract($this->el($html), $this->noop());
        $this->assertSame('toast', $result['type']);
        $this->assertSame('Éxito', $result['props']['title']);
        $this->assertSame('Operación completada', $result['props']['body']);
        $this->assertSame('success', $result['props']['variant']);
    }

    // ── CarouselRule ─────────────────────────────────────────────────────────

    public function testCarouselRuleMatchesCarousel(): void
    {
        $rule = new CarouselRule();
        $this->assertTrue($rule->matches($this->el('<div class="carousel slide" id="c1"></div>')));
        $this->assertFalse($rule->matches($this->el('<div class="row"></div>')));
    }

    public function testCarouselRuleExtractsItems(): void
    {
        $rule = new CarouselRule();
        $html = '<div class="carousel" id="carouselEx" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active"><img src="/img1.jpg" alt="A"></div>
                        <div class="carousel-item"><img src="/img2.jpg" alt="B"></div>
                    </div>
                 </div>';
        $result = $rule->extract($this->el($html), $this->noop());
        $this->assertSame('carousel', $result['type']);
        $this->assertTrue($result['props']['autoplay']);
        $this->assertCount(2, $result['children']);
        $this->assertSame('carousel_item', $result['children'][0]['type']);
        $this->assertSame('/img1.jpg', $result['children'][0]['props']['image_src']);
        $this->assertTrue($result['children'][0]['props']['active']);
        $this->assertFalse($result['children'][1]['props']['active']);
    }

    // ── ScrollspyRule ────────────────────────────────────────────────────────

    public function testScrollspyRuleMatchesDataBsSpy(): void
    {
        $rule = new ScrollspyRule();
        $this->assertTrue($rule->matches($this->el('<div data-bs-spy="scroll" data-bs-target="#nav"></div>')));
        $this->assertFalse($rule->matches($this->el('<div class="row"></div>')));
    }

    public function testScrollspyRuleExtractsNavTarget(): void
    {
        $rule   = new ScrollspyRule();
        $result = $rule->extract($this->el('<div data-bs-spy="scroll" data-bs-target="#mainNav" data-bs-offset="70"></div>'), $this->noop());
        $this->assertSame('scrollspy', $result['type']);
        $this->assertSame('mainNav', $result['props']['nav_target_id']);
        $this->assertSame('70', $result['props']['offset']);
    }
}
