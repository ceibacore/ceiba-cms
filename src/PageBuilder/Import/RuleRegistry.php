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

    public function register(RuleInterface $rule): void
    {
        $this->rules[] = $rule;
        // Keep sorted descending so getRulesFor() returns highest priority first
        usort($this->rules, fn(RuleInterface $a, RuleInterface $b) => $b->priority() <=> $a->priority());
    }

    /**
     * Returns all rules that match the given element, sorted by priority DESC.
     *
     * @return RuleInterface[]
     */
    public function getRulesFor(\DOMElement $el): array
    {
        return array_values(
            array_filter($this->rules, fn(RuleInterface $r) => $r->matches($el))
        );
    }
}
