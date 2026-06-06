<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;

/**
 * Stores all registered rules, ordered by priority (DESC).
 * New rules can be added without modifying any existing code.
 */
final class RuleRegistry
{
    /** @var RuleInterface[] */
    private array $rules = [];
    private array $cache = [];

    public function register(RuleInterface $rule): void
    {
        $this->rules[] = $rule;
        // Keep sorted descending so getRulesFor() returns highest priority first
        usort($this->rules, fn(RuleInterface $a, RuleInterface $b) => $b->priority() <=> $a->priority());
        // Clear cache when new rules are registered
        $this->cache = [];
    }

    /**
     * Returns all rules that match the given element, sorted by priority DESC.
     *
     * @return RuleInterface[]
     */
    public function getRulesFor(\DOMElement $el): array
    {
        $tag = $el->tagName;
        
        // Serialize attributes to build a safe cache key, since rules can match on any attribute
        $attrs = [];
        foreach ($el->attributes as $attr) {
            $attrs[$attr->name] = $attr->value;
        }
        ksort($attrs);
        $cacheKey = $tag . '|' . json_encode($attrs);

        if (isset($this->cache[$cacheKey])) {
            return $this->cache[$cacheKey];
        }

        $matched = array_values(
            array_filter($this->rules, fn(RuleInterface $r) => $r->matches($el))
        );

        $this->cache[$cacheKey] = $matched;
        return $matched;
    }
}
