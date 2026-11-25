<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Domain\Binding;

/**
 * Typed bindings of a node (plan 07, D-4): `bindings: {prop: {from, field, transform?, args?, fallback?}}`.
 * The value comes from a variable in scope (a loop item or the page's record), passes through one transform and is
 * prepared for where it goes: URL props only take safe URLs, HTML props get sanitised rich text or escaped text,
 * every other prop gets plain text (the views escape it).
 */
final class BindingResolver
{
    private const URL_PROPS = ['href', 'src', 'url', 'link', 'image_url'];

    /**
     * @param array<string, mixed> $node
     * @param array<string, mixed> $vars variables in scope (name => record)
     * @return array<string, mixed> the node with bound props set
     */
    public function apply(array $node, array $vars, string $locale, ?string $defaultFrom = null): array
    {
        $bindings = $node['bindings'] ?? null;
        if (!is_array($bindings) || $bindings === []) {
            return $node;
        }
        $props = is_array($node['props'] ?? null) ? $node['props'] : [];
        foreach ($bindings as $prop => $binding) {
            if (!is_string($prop) || !is_array($binding) || !is_string($binding['field'] ?? null)) {
                continue;
            }
            $record = $vars[(string) ($binding['from'] ?? $defaultFrom ?? '')] ?? null;
            $value = is_array($record) ? ($record[$binding['field']] ?? null) : null;
            if (is_string($binding['transform'] ?? null)) {
                $value = ValueTransforms::apply($binding['transform'], $value, is_array($binding['args'] ?? null) ? $binding['args'] : [], $locale);
            }
            $prepared = $this->prepare($prop, (string) ($node['type'] ?? ''), $value, $binding['fallback'] ?? '');
            $props[$prop] = is_string($prepared) ? ValueTransforms::inert($prepared) : $prepared;
        }
        $node['props'] = $props;

        return $node;
    }

    /** Where a prop takes HTML (the html node's content): raw values are escaped there. */
    public static function isHtmlProp(string $type, string $prop): bool
    {
        return $type === 'html' && $prop === 'content';
    }

    private function prepare(string $prop, string $type, mixed $value, mixed $fallback): mixed
    {
        $fallback = is_scalar($fallback) ? (string) $fallback : '';
        if ($value === null || $value === '' || is_array($value)) {
            return self::isHtmlProp($type, $prop) ? htmlspecialchars($fallback, ENT_QUOTES, 'UTF-8') : $fallback;
        }
        if (in_array($prop, self::URL_PROPS, true)) {
            return UrlGuard::safe((string) $value) ?? $fallback;
        }
        if (self::isHtmlProp($type, $prop)) {
            return SafeHtml::clean((string) $value);
        }

        if (is_bool($value)) {
            return $value ? '1' : '';
        }

        return str_contains((string) $value, '<') ? ValueTransforms::text($value) : (string) $value; // rich text into a text prop
    }
}
