<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Contract;

/**
 * Contract for all HTML-to-PageBuilder conversion rules.
 *
 * Each rule knows:
 *  1. When it applies   → matches()
 *  2. How to convert    → extract()
 *  3. Its priority      → priority()
 */
interface RuleInterface
{
    /**
     * Returns true if this rule can handle the given DOM element.
     */
    public function matches(\DOMElement $el): bool;

    /**
     * Extracts a PageBuilder node from the DOM element.
     *
     * @param  \DOMElement $el       The element to convert
     * @param  callable    $recurse  fn(\DOMElement): ?array  — processes a single child element
     * @return array{
     *   type: string,
     *   props: array<string, mixed>,
     *   consumes: bool,
     *   children: array,
     *   warnings: array,
     *   ignored: bool
     * }
     */
    public function extract(\DOMElement $el, callable $recurse): array;

    /**
     * Higher number = evaluated first (wins over lower-priority rules).
     * Scale: 400=exact, 300=bootstrap, 200=semantic, 100=generic, 0=fallback
     */
    public function priority(): int;
}
