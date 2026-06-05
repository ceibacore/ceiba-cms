<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Import\Rules;

use LemurCms\PageBuilder\Import\Rules\FallbackRule;
use LemurCms\PageBuilder\Import\Rules\Generic\GenericDivRule;
use LemurCms\PageBuilder\Import\Rules\Generic\SpanRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\AnchorRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\DetailsRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\DividerRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\FigureRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\HeadingRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\ImageRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\InlineTextRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\ParagraphRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\PictureRule;
use LemurCms\PageBuilder\Import\Rules\Semantic\SemanticSectionRule;
use PHPUnit\Framework\TestCase;

class SemanticAndGenericRulesTest extends TestCase
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

    // ── SemanticSectionRule ───────────────────────────────────────────────────

    public function testSemanticSectionRuleMatchesAllSemanticTags(): void
    {
        $rule = new SemanticSectionRule();
        foreach (['header', 'footer', 'nav', 'main', 'aside', 'section', 'article'] as $tag) {
            $this->assertTrue($rule->matches($this->el("<{$tag}></{$tag}>")), "Should match <{$tag}>");
        }
        $this->assertFalse($rule->matches($this->el('<div></div>')));
    }

    public function testSemanticSectionRuleExtractsClassAndRole(): void
    {
        $rule   = new SemanticSectionRule();
        $result = $rule->extract($this->el('<header class="sticky-top"></header>'), $this->noop());
        $this->assertSame('header', $result['type']);
        $this->assertNull($result['name']);
        $this->assertStringContainsString('pb-semantic-header', $result['props']['class']);
        $this->assertStringContainsString('sticky-top', $result['props']['class']);
        $this->assertSame('banner', $result['props']['role']);
        $this->assertFalse($result['consumes']);
    }

    public function testSemanticSectionRuleFooterRole(): void
    {
        $rule   = new SemanticSectionRule();
        $result = $rule->extract($this->el('<footer></footer>'), $this->noop());
        $this->assertSame('contentinfo', $result['props']['role']);
    }

    // ── HeadingRule ───────────────────────────────────────────────────────────

    public function testHeadingRuleMatchesH1ToH6(): void
    {
        $rule = new HeadingRule();
        foreach (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as $tag) {
            $this->assertTrue($rule->matches($this->el("<{$tag}>Titulo</{$tag}>")), "Should match <{$tag}>");
        }
        $this->assertFalse($rule->matches($this->el('<p>Texto</p>')));
    }

    public function testHeadingRuleExtractsTagAndContent(): void
    {
        $rule   = new HeadingRule();
        $result = $rule->extract($this->el('<h2 class="fw-bold">Mi Heading</h2>'), $this->noop());
        $this->assertSame('h2', $result['type']);
        $this->assertNull($result['name']);
        $this->assertSame('Mi Heading', $result['props']['content']);
        $this->assertSame('fw-bold', $result['props']['class']);
        $this->assertTrue($result['consumes']);
    }

    // ── ParagraphRule ─────────────────────────────────────────────────────────

    public function testParagraphRuleMatchesParagraph(): void
    {
        $rule = new ParagraphRule();
        $this->assertTrue($rule->matches($this->el('<p>Texto</p>')));
        $this->assertFalse($rule->matches($this->el('<div>Texto</div>')));
    }

    public function testParagraphRulePlainTextBecomesTextNode(): void
    {
        $rule   = new ParagraphRule();
        $result = $rule->extract($this->el('<p class="lead">Párrafo simple</p>'), $this->noop());
        $this->assertSame('p', $result['type']);
        $this->assertNull($result['name']);
        $this->assertSame('Párrafo simple', $result['props']['content']);
    }

    public function testParagraphRuleWithChildElementsBecomesHtml(): void
    {
        $rule   = new ParagraphRule();
        $result = $rule->extract($this->el('<p>Texto con <strong>negrita</strong> y más</p>'), $this->noop());
        $this->assertSame('p', $result['type']);
        $this->assertNull($result['name']);
        // Children are recursed, not serialized to _raw_html
        $this->assertFalse($result['consumes']);
    }

    // ── ImageRule ─────────────────────────────────────────────────────────────

    public function testImageRuleMatchesImg(): void
    {
        $rule = new ImageRule();
        $this->assertTrue($rule->matches($this->el('<img src="/img.jpg" alt="Test">')));
        $this->assertFalse($rule->matches($this->el('<picture></picture>')));
    }

    public function testImageRuleExtractsProps(): void
    {
        $rule   = new ImageRule();
        $result = $rule->extract($this->el('<img src="/img.jpg" alt="Alt text" class="img-fluid rounded" width="200" height="100">'), $this->noop());
        $this->assertSame('img', $result['type']);
        $this->assertNull($result['name']);
        $this->assertSame('/img.jpg', $result['props']['src']);
        $this->assertSame('Alt text', $result['props']['alt']);
        $this->assertStringContainsString('img-fluid', $result['props']['class']);
        $this->assertStringContainsString('rounded', $result['props']['class']);
        $this->assertSame('200', $result['props']['width']);
        $this->assertSame('100', $result['props']['height']);
    }

    public function testImageRuleWarnsOnRelativeSrc(): void
    {
        $rule   = new ImageRule();
        $result = $rule->extract($this->el('<img src="images/foto.jpg" alt="">'), $this->noop());
        $this->assertNotEmpty($result['warnings']);
        $this->assertSame('warning', $result['warnings'][0]->severity);
    }

    public function testImageRuleNoWarningOnAbsoluteSrc(): void
    {
        $rule   = new ImageRule();
        $result = $rule->extract($this->el('<img src="https://example.com/foto.jpg" alt="">'), $this->noop());
        $this->assertEmpty($result['warnings']);
    }

    // ── PictureRule ───────────────────────────────────────────────────────────

    public function testPictureRuleMatchesPicture(): void
    {
        $rule = new PictureRule();
        $this->assertTrue($rule->matches($this->el('<picture><img src="/a.jpg" alt=""></picture>')));
        $this->assertFalse($rule->matches($this->el('<img src="/a.jpg" alt="">')));
    }

    public function testPictureRuleUsesInnerImgSrc(): void
    {
        $rule   = new PictureRule();
        $result = $rule->extract($this->el('<picture><source srcset="/sm.jpg" media="(max-width:600px)"><img src="/lg.jpg" alt="Hero"></picture>'), $this->noop());
        $this->assertSame('img', $result['type']);
        $this->assertNull($result['name']);
        $this->assertSame('/lg.jpg', $result['props']['src']);
        $this->assertSame('Hero', $result['props']['alt']);
        $this->assertTrue($result['props']['fluid']);
    }

    // ── FigureRule ────────────────────────────────────────────────────────────

    public function testFigureRuleMatchesFigure(): void
    {
        $rule = new FigureRule();
        $this->assertTrue($rule->matches($this->el('<figure></figure>')));
        $this->assertFalse($rule->matches($this->el('<div></div>')));
    }

    public function testFigureRuleWithImageExtractsCaption(): void
    {
        $rule   = new FigureRule();
        $result = $rule->extract($this->el('<figure><img src="/photo.jpg" alt="Foto"><figcaption>Leyenda</figcaption></figure>'), $this->noop());
        $this->assertSame('img', $result['type']);
        $this->assertNull($result['name']);
        $this->assertSame('/photo.jpg', $result['props']['src']);
        $this->assertSame('Leyenda', $result['props']['caption']);
    }

    public function testFigureRuleWithoutImageBecomesSection(): void
    {
        $rule   = new FigureRule();
        $result = $rule->extract($this->el('<figure class="highlight"><pre><code>echo 1;</code></pre></figure>'), $this->noop());
        $this->assertSame('figure', $result['type']); // FigureRule returns real HTML tag when no inner <img>
        $this->assertNull($result['name']);
        $this->assertStringContainsString('pb-semantic-figure', $result['props']['class']);
    }

    // ── DetailsRule ───────────────────────────────────────────────────────────

    public function testDetailsRuleMatchesDetails(): void
    {
        $rule = new DetailsRule();
        $this->assertTrue($rule->matches($this->el('<details><summary>Q</summary>A</details>')));
        $this->assertFalse($rule->matches($this->el('<div class="collapse"></div>')));
    }

    public function testDetailsRuleExtractsSummaryLabel(): void
    {
        $rule   = new DetailsRule();
        $result = $rule->extract($this->el('<details open><summary>¿Qué es esto?</summary><p>Es una cosa</p></details>'), $this->noop());
        $this->assertSame('details', $result['type']);
        $this->assertSame('collapse', $result['name']);
        $this->assertSame('¿Qué es esto?', $result['props']['trigger_label']);
        $this->assertTrue($result['props']['open']);
    }

    // ── InlineTextRule ────────────────────────────────────────────────────────

    public function testInlineTextRuleMatchesTargetTags(): void
    {
        $rule = new InlineTextRule();
        foreach (['strong', 'em', 'mark', 'blockquote', 'abbr', 'small', 'kbd', 'ins', 'del'] as $tag) {
            $this->assertTrue($rule->matches($this->el("<{$tag}>texto</{$tag}>")), "Should match <{$tag}>");
        }
        $this->assertFalse($rule->matches($this->el('<p>texto</p>')));
    }

    public function testInlineTextRuleStrongGetsBold(): void
    {
        $rule   = new InlineTextRule();
        $result = $rule->extract($this->el('<strong>Negrita</strong>'), $this->noop());
        $this->assertSame('strong', $result['type']);
        $this->assertNull($result['name']);
        $this->assertSame('Negrita', $result['props']['content']);
    }

    public function testInlineTextRuleAbbrBecomesTooltip(): void
    {
        $rule   = new InlineTextRule();
        $result = $rule->extract($this->el('<abbr title="HyperText Markup Language">HTML</abbr>'), $this->noop());
        $this->assertSame('abbr', $result['type']);
        $this->assertSame('tooltip', $result['name']);
        $this->assertSame('HyperText Markup Language', $result['props']['text']);
        $this->assertSame('HTML', $result['props']['trigger_label']);
    }

    public function testInlineTextRuleBlockquoteGetsClass(): void
    {
        $rule   = new InlineTextRule();
        $result = $rule->extract($this->el('<blockquote class="blockquote">Una cita</blockquote>'), $this->noop());
        $this->assertSame('blockquote', $result['type']);
        $this->assertNull($result['name']);
        $this->assertStringContainsString('blockquote', $result['props']['class'] ?? '');
    }

    // ── DividerRule ───────────────────────────────────────────────────────────

    public function testDividerRuleMatchesHr(): void
    {
        $rule = new DividerRule();
        $this->assertTrue($rule->matches($this->el('<hr>')));
        $this->assertFalse($rule->matches($this->el('<br>')));
    }

    public function testDividerRuleExtractsSpacing(): void
    {
        $rule   = new DividerRule();
        $result = $rule->extract($this->el('<hr class="my-4">'), $this->noop());
        $this->assertSame('hr', $result['type']);
        $this->assertSame('divider', $result['name']);
        $this->assertSame('4', $result['props']['spacing']);
    }

    // ── AnchorRule ────────────────────────────────────────────────────────────

    public function testAnchorRuleMatchesAnchorWithoutBtn(): void
    {
        $rule = new AnchorRule();
        $this->assertTrue($rule->matches($this->el('<a href="/page">Link</a>')));
        $this->assertFalse($rule->matches($this->el('<a class="btn btn-primary" href="/page">Button</a>')));
    }

    public function testAnchorRuleExtractsProps(): void
    {
        $rule   = new AnchorRule();
        $result = $rule->extract($this->el('<a href="/about" target="_blank" class="text-primary">Nosotros</a>'), $this->noop());
        $this->assertSame('a', $result['type']);
        $this->assertNull($result['name']);
        $this->assertSame('Nosotros', $result['props']['content']);
        $this->assertSame('/about', $result['props']['href']);
        $this->assertSame('_blank', $result['props']['target']);
    }

    // ── GenericDivRule ────────────────────────────────────────────────────────

    public function testGenericDivRuleMatchesOnlyDiv(): void
    {
        $rule = new GenericDivRule();
        $this->assertTrue($rule->matches($this->el('<div class="custom-block"></div>')));
        $this->assertFalse($rule->matches($this->el('<section class="custom-block"></section>')));
    }

    public function testGenericDivRuleBecomesSection(): void
    {
        $rule   = new GenericDivRule();
        $result = $rule->extract($this->el('<div class="hero-wrapper"></div>'), $this->noop());
        $this->assertSame('div', $result['type']);
        $this->assertNull($result['name']);
        $this->assertSame('hero-wrapper', $result['props']['class']);
        $this->assertFalse($result['consumes']);
        $this->assertEmpty($result['warnings']);
    }

    // ── SpanRule ──────────────────────────────────────────────────────────────

    public function testSpanRuleMatchesSpan(): void
    {
        $rule = new SpanRule();
        $this->assertTrue($rule->matches($this->el('<span class="badge">3</span>')));
        $this->assertFalse($rule->matches($this->el('<div>texto</div>')));
    }

    public function testSpanRuleExtractsContent(): void
    {
        $rule   = new SpanRule();
        $result = $rule->extract($this->el('<span class="text-muted">Secundario</span>'), $this->noop());
        $this->assertSame('span', $result['type']);
        $this->assertNull($result['name']);
        $this->assertSame('Secundario', $result['props']['content']);
        $this->assertSame('text-muted', $result['props']['class']);
    }

    // ── FallbackRule ──────────────────────────────────────────────────────────

    public function testFallbackRuleMatchesEverything(): void
    {
        $rule = new FallbackRule();
        $this->assertTrue($rule->matches($this->el('<video src="/v.mp4"></video>')));
        $this->assertTrue($rule->matches($this->el('<table><tr><td>X</td></tr></table>')));
    }

    public function testFallbackRuleIgnoresScript(): void
    {
        $rule   = new FallbackRule();
        $result = $rule->extract($this->el('<script>alert(1)</script>'), $this->noop());
        $this->assertTrue($result['ignored']);
        $this->assertNotEmpty($result['warnings']);
        $this->assertSame('info', $result['warnings'][0]->severity);
    }

    public function testFallbackRuleVideoBecomesHtmlWithWarning(): void
    {
        $rule   = new FallbackRule();
        $result = $rule->extract($this->el('<video src="/v.mp4" controls></video>'), $this->noop());
        $this->assertSame('video', $result['type']);
        $this->assertNull($result['name']);
        $this->assertFalse($result['ignored']);
        $this->assertNotEmpty($result['warnings']);
        $this->assertSame('warning', $result['warnings'][0]->severity);
    }

    public function testFallbackRuleUnknownElementBecomesHtml(): void
    {
        $rule   = new FallbackRule();
        $result = $rule->extract($this->el('<canvas id="myCanvas" width="200" height="100"></canvas>'), $this->noop());
        $this->assertSame('canvas', $result['type']);
        $this->assertNull($result['name']);
        $this->assertArrayHasKey('_raw_html', $result['props']);
        $this->assertStringContainsString('<canvas', $result['props']['_raw_html']);
    }

    public function testFallbackRulePriorityIsZero(): void
    {
        $this->assertSame(0, (new FallbackRule())->priority());
    }
}
