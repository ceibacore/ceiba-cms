<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Domain\Binding;

/**
 * Rich text from a data source placed as HTML (plan 07, D-4): only formatting tags survive, every attribute is
 * dropped except a safe href on links; scripts, styles, frames and event handlers never reach the page.
 */
final class SafeHtml
{
    private const ALLOWED = ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'ul', 'ol', 'li', 'a', 'h2', 'h3', 'h4', 'h5', 'blockquote', 'span', 'code', 'pre'];
    private const DROP_WITH_CONTENT = ['script', 'style', 'iframe', 'object', 'embed', 'template', 'svg', 'math', 'noscript', 'form'];

    public static function clean(string $html): string
    {
        if (trim($html) === '') {
            return '';
        }
        $doc = new \DOMDocument();
        $previous = libxml_use_internal_errors(true);
        $doc->loadHTML('<?xml encoding="UTF-8"><div id="cms-safe-root">' . $html . '</div>', LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD | LIBXML_NONET);
        libxml_clear_errors();
        libxml_use_internal_errors($previous);
        $root = $doc->getElementById('cms-safe-root') ?? $doc->documentElement;
        if ($root === null) {
            return '';
        }
        self::walk($root);
        $out = '';
        foreach (iterator_to_array($root->childNodes) as $child) {
            $out .= $doc->saveHTML($child);
        }

        return $out;
    }

    private static function walk(\DOMNode $node): void
    {
        foreach (iterator_to_array($node->childNodes) as $child) {
            if ($child instanceof \DOMElement) {
                $tag = strtolower($child->tagName);
                if (in_array($tag, self::DROP_WITH_CONTENT, true)) {
                    $node->removeChild($child);
                    continue;
                }
                self::walk($child);
                if (!in_array($tag, self::ALLOWED, true)) {
                    while ($child->firstChild !== null) {
                        $node->insertBefore($child->firstChild, $child);
                    }
                    $node->removeChild($child);
                    continue;
                }
                $href = $tag === 'a' ? $child->getAttribute('href') : '';
                foreach (iterator_to_array($child->attributes) as $attribute) {
                    $child->removeAttribute($attribute->nodeName);
                }
                if ($tag === 'a' && UrlGuard::safe($href) !== null) {
                    $child->setAttribute('href', (string) UrlGuard::safe($href));
                    $child->setAttribute('rel', 'noopener nofollow');
                }
            } elseif ($child instanceof \DOMComment || $child instanceof \DOMProcessingInstruction) {
                $node->removeChild($child);
            }
        }
    }
}
