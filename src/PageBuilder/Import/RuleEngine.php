<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import;

use LemurCms\Support\Helpers\UuidHelper;

/**
 * Orchestrates rule evaluation and recursive DOM traversal.
 * Collects warnings and conversion statistics.
 */
final class RuleEngine
{
    /** @var ImportWarning[] */
    private array $warnings    = [];
    private int   $mappedCount  = 0;
    private int   $fallbackCount = 0;
    private int   $ignoredCount = 0;

    public function __construct(private readonly RuleRegistry $registry) {}

    public function resetCounters(): void
    {
        $this->warnings      = [];
        $this->mappedCount   = 0;
        $this->fallbackCount = 0;
        $this->ignoredCount  = 0;
    }

    /** @return ImportWarning[] */
    public function getWarnings(): array    { return $this->warnings; }
    public function getMappedCount(): int   { return $this->mappedCount; }
    public function getFallbackCount(): int { return $this->fallbackCount; }
    public function getIgnoredCount(): int  { return $this->ignoredCount; }

    /**
     * Process a single DOMElement → PageBuilder node array, or null if ignored.
     */
    public function processElement(\DOMElement $el, int $depth = 0): ?array
    {
        $rules = $this->registry->getRulesFor($el);

        // FallbackRule always matches — this should never be empty
        if (empty($rules)) {
            return null;
        }

        $rule    = $rules[0]; // highest priority
        $recurse = fn(\DOMElement $child): ?array => $this->processElement($child, $depth + 1);
        $result  = $rule->extract($el, $recurse);

        // Collect warnings from rule
        foreach ($result['warnings'] ?? [] as $w) {
            $this->warnings[] = $w;
        }

        if ($result['ignored'] ?? false) {
            $this->ignoredCount++;
            return null;
        }

        $type = $result['type'] ?? 'html';

        // Build children
        if (!($result['consumes'] ?? false)) {
            // Engine recurses through DOM children
            $children = $this->processChildren($el, $depth + 1);
        } else {
            // Rule pre-built its children (or none)
            $children = $result['children'] ?? [];
        }

        if ($type === 'html') {
            $this->fallbackCount++;
        } else {
            $this->mappedCount++;
        }

        return [
            'id'       => UuidHelper::v4(),
            'type'     => $type,
            'props'    => $result['props'] ?? [],
            'loop'     => null,
            'children' => $children,
        ];
    }

    /**
     * Iterate all DOMElement children of $parent and process each.
     *
     * @return array[]  PageBuilder node arrays
     */
    public function processChildren(\DOMElement $parent, int $depth): array
    {
        $children = [];
        foreach ($parent->childNodes as $child) {
            if (!($child instanceof \DOMElement)) {
                continue;
            }
            $node = $this->processElement($child, $depth);
            if ($node !== null) {
                $children[] = $node;
            }
        }
        return $children;
    }
}
