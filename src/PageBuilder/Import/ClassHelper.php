<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import;

/**
 * Utility for working with Bootstrap / HTML class attributes.
 */
final class ClassHelper
{
    /** @return string[] */
    public static function classes(\DOMElement $el): array
    {
        $raw = trim($el->getAttribute('class'));
        if ($raw === '') {
            return [];
        }
        return array_values(array_filter(explode(' ', preg_replace('/\s+/', ' ', $raw))));
    }

    public static function hasClass(\DOMElement $el, string $class): bool
    {
        return in_array($class, self::classes($el), true);
    }

    public static function hasAnyClass(\DOMElement $el, string ...$classes): bool
    {
        $elClasses = self::classes($el);
        foreach ($classes as $class) {
            if (in_array($class, $elClasses, true)) {
                return true;
            }
        }
        return false;
    }

    public static function hasPrefixedClass(\DOMElement $el, string $prefix): bool
    {
        foreach (self::classes($el) as $cls) {
            if (str_starts_with($cls, $prefix)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Returns class string with the given classes removed.
     */
    public static function extraClasses(\DOMElement $el, array $exclude): string
    {
        $kept = array_filter(self::classes($el), fn($c) => !in_array($c, $exclude, true));
        return implode(' ', $kept);
    }

    /**
     * Extracts Bootstrap column breakpoints.
     * col-md-6 → ['md' => 6], col → ['xs' => 12]
     *
     * @return array<string, int>
     */
    public static function colBreakpoints(\DOMElement $el): array
    {
        $bp = [];
        foreach (self::classes($el) as $cls) {
            if ($cls === 'col') {
                $bp['xs'] = 12;
            } elseif (preg_match('/^col-(xs|sm|md|lg|xl|xxl)-(\d+)$/', $cls, $m)) {
                $bp[$m[1]] = (int) $m[2];
            } elseif (preg_match('/^col-(\d+)$/', $cls, $m)) {
                $bp['xs'] = (int) $m[1];
            } elseif (preg_match('/^col-(sm|md|lg|xl|xxl)$/', $cls, $m)) {
                // col-md (auto) → store as 'auto'
                $bp[$m[1]] = 'auto';
            }
        }
        return $bp;
    }

    /**
     * Extracts Bootstrap button variant.
     * btn-primary → 'primary', btn-outline-danger → 'outline-danger'
     */
    public static function btnVariant(\DOMElement $el): string
    {
        $skip = ['btn', 'btn-sm', 'btn-lg', 'btn-block', 'btn-close'];
        foreach (self::classes($el) as $cls) {
            if (in_array($cls, $skip, true)) {
                continue;
            }
            if (preg_match('/^btn-(outline-)?([a-z-]+)$/', $cls, $m)) {
                return $m[1] ? 'outline-' . $m[2] : $m[2];
            }
        }
        return 'primary';
    }

    /**
     * Extracts Bootstrap button size: btn-sm → 'sm', btn-lg → 'lg', else ''.
     */
    public static function btnSize(\DOMElement $el): string
    {
        if (self::hasClass($el, 'btn-sm')) {
            return 'sm';
        }
        if (self::hasClass($el, 'btn-lg')) {
            return 'lg';
        }
        return '';
    }
}
