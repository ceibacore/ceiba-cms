<?php

declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Import;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\RuleRegistry;
use PHPUnit\Framework\TestCase;

class MockCacheRule implements RuleInterface
{
    public int $matchesCalled = 0;

    public function matches(\DOMElement $el): bool
    {
        $this->matchesCalled++;
        return strtolower($el->tagName) === 'div';
    }

    public function priority(): int
    {
        return 150;
    }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        return [];
    }
}

class RuleRegistryCacheTest extends TestCase
{
    public function testRuleRegistryCachesMatches(): void
    {
        $registry = new RuleRegistry();
        $rule = new MockCacheRule();
        $registry->register($rule);

        $dom = new \DOMDocument();
        $el1 = $dom->createElement('div');
        $el1->setAttribute('class', 'container');

        $el2 = $dom->createElement('div');
        $el2->setAttribute('class', 'container');

        // First call evaluates matches()
        $rules1 = $registry->getRulesFor($el1);
        $this->assertCount(1, $rules1);
        $this->assertSame(1, $rule->matchesCalled);

        // Second call on similar element retrieves from cache
        $rules2 = $registry->getRulesFor($el2);
        $this->assertCount(1, $rules2);
        $this->assertSame(1, $rule->matchesCalled); // matchesCalled should not increment

        // Registering a new rule clears cache
        $registry->register(new MockCacheRule());
        
        // Third call on same element evaluates matches() again
        $rules3 = $registry->getRulesFor($el1);
        $this->assertSame(2, $rule->matchesCalled); // matchesCalled increments now
    }
}
