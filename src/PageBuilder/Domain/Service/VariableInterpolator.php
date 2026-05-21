<?php
declare(strict_types=1);
namespace LemurCms\PageBuilder\Domain\Service;

/**
 * Interpolates {{ variable.field }} expressions in string values.
 *
 * Given a context array like ['product' => ['name' => 'Widget']],
 * the expression {{ product.name }} → 'Widget'.
 *
 * Supports up to 3 levels of dot notation: var.field.subfield
 */
final class VariableInterpolator
{
    /**
     * Interpolate all {{ ... }} expressions in a string.
     */
    public function interpolate(string $template, array $context): string
    {
        return preg_replace_callback(
            '/\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/',
            function (array $matches) use ($context): string {
                return (string) ($this->resolve($matches[1], $context) ?? '');
            },
            $template
        ) ?? $template;
    }

    /**
     * Interpolate all string values in a props array recursively.
     */
    public function interpolateProps(array $props, array $context): array
    {
        $result = [];
        foreach ($props as $key => $value) {
            if (is_string($value)) {
                $result[$key] = $this->interpolate($value, $context);
            } elseif (is_array($value)) {
                $result[$key] = $this->interpolateProps($value, $context);
            } else {
                $result[$key] = $value;
            }
        }
        return $result;
    }

    /**
     * Resolve a dot-notation path against a context array.
     * e.g. 'product.name' → $context['product']['name']
     */
    private function resolve(string $path, array $context): mixed
    {
        $parts = explode('.', $path);
        $value = $context;

        foreach ($parts as $part) {
            if (!is_array($value) || !array_key_exists($part, $value)) {
                return null;
            }
            $value = $value[$part];
        }

        return $value;
    }
}
