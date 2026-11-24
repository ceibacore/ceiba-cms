<?php

declare(strict_types=1);

namespace CeibaCms\Tests\SitePart;

use CeibaCms\SitePart\Domain\DetectSitePartConflicts;
use CeibaCms\SitePart\Domain\RuleContextMatrix;
use CeibaCms\SitePart\Domain\SitePart;
use CeibaCms\SitePart\Domain\SitePartRules;
use PHPUnit\Framework\TestCase;

final class RuleContextMatrixTest extends TestCase
{
    public function testSamplesPrefixExclusionsLocalesSessionRoutesAndNotFound(): void
    {
        $rules = SitePartRules::from(['include' => [['type' => 'path_prefix', 'value' => '/courses']],
            'exclude' => [['type' => 'path_prefix', 'value' => '/courses/free']],
            'locales' => ['es'], 'session' => 'with'], 'header');
        $route = SitePartRules::from(['include' => [['type' => 'routes', 'names' => ['portal']]]], 'footer', ['portal']);
        $parts = [new SitePart('one', 'header', 'One', $rules), new SitePart('two', 'header', 'Two', $rules),
            new SitePart('route', 'footer', 'Route', $route)];
        $contexts = iterator_to_array(RuleContextMatrix::generate($parts, []));
        $hits = DetectSitePartConflicts::inContexts($parts, $contexts);
        self::assertNotEmpty($hits);
        self::assertNotEmpty(array_filter($hits, fn ($hit) => $hit['context']->path === '/courses/__cms_probe'
            && $hit['context']->locale === 'es' && $hit['context']->hasSession && $hit['context']->notFound));
        self::assertEmpty(array_filter($hits, fn ($hit) => str_starts_with($hit['context']->path, '/courses/free')));
        self::assertNotEmpty(array_filter($contexts, fn ($context) => $context->routeName === 'portal'));
        self::assertNotEmpty(array_filter($contexts, fn ($context) => $context->locale !== 'es' && str_starts_with($context->locale, 'es-')));
    }

    public function testIncludesActualPageAndHomeContexts(): void
    {
        $rules = SitePartRules::from(['include' => [['type' => 'pages', 'ids' => ['page-1']]]], 'header');
        $parts = [new SitePart('one', 'header', 'One', $rules), new SitePart('two', 'header', 'Two', $rules)];
        $pages = [['path' => '/', 'pageId' => 'page-1', 'layoutId' => 'layout-1', 'isHome' => true]];
        $hits = DetectSitePartConflicts::inContexts($parts, RuleContextMatrix::generate($parts, $pages));
        self::assertNotEmpty($hits);
        self::assertSame('page-1', $hits[0]['context']->pageId);
        self::assertTrue($hits[0]['context']->isHome);
        self::assertSame('layout-1', $hits[0]['context']->layoutId);
    }

    public function testLargeMatrixFailsInsteadOfSilentlySkippingContexts(): void
    {
        $page = ['path' => '/x', 'pageId' => 'p', 'layoutId' => null, 'isHome' => false];
        $this->expectException(\LengthException::class);
        foreach (RuleContextMatrix::generate([], array_fill(0, 50001, $page)) as $context) {
            // Consume lazily; the limit applies to the complete validation, not a single page.
        }
    }
}
