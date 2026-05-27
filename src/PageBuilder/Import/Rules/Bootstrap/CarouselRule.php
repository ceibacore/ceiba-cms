<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Bootstrap;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\ClassHelper;
use LemurCms\Support\Helpers\UuidHelper;

/**
 * Converts .carousel into carousel node with carousel_item children.
 */
final class CarouselRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return ClassHelper::hasClass($el, 'carousel');
    }

    public function priority(): int { return 300; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $id         = $el->getAttribute('id') ?: UuidHelper::v4();
        $autoplay   = $el->getAttribute('data-bs-ride') === 'carousel';
        $fade       = ClassHelper::hasClass($el, 'carousel-fade');
        $dark       = ClassHelper::hasClass($el, 'carousel-dark');
        $controls   = false;
        $indicators = false;
        $children   = [];

        foreach ($el->childNodes as $child) {
            if (!($child instanceof \DOMElement)) {
                continue;
            }
            $cls = $child->getAttribute('class');

            if (str_contains($cls, 'carousel-control')) {
                $controls = true;
                continue;
            }
            if (str_contains($cls, 'carousel-indicators')) {
                $indicators = true;
                continue;
            }
            if (!str_contains($cls, 'carousel-inner')) {
                continue;
            }

            // Process carousel-item divs inside carousel-inner
            foreach ($child->childNodes as $item) {
                if (!($item instanceof \DOMElement)) {
                    continue;
                }
                if (!ClassHelper::hasClass($item, 'carousel-item')) {
                    continue;
                }
                $imgSrc  = '';
                $caption = '';
                $active  = ClassHelper::hasClass($item, 'active');

                foreach ($item->childNodes as $itemEl) {
                    if (!($itemEl instanceof \DOMElement)) {
                        continue;
                    }
                    if ($itemEl->tagName === 'img') {
                        $imgSrc = $itemEl->getAttribute('src');
                    } elseif (str_contains($itemEl->getAttribute('class'), 'carousel-caption')) {
                        $caption = trim($itemEl->textContent);
                    }
                }

                $children[] = [
                    'id'       => UuidHelper::v4(),
                    'type'     => 'carousel_item',
                    'props'    => ['image_src' => $imgSrc, 'caption' => $caption, 'active' => $active],
                    'loop'     => null,
                    'children' => [],
                ];
            }
        }

        return [
            'type'     => 'carousel',
            'props'    => [
                'id'         => $id,
                'controls'   => $controls,
                'indicators' => $indicators,
                'autoplay'   => $autoplay,
                'fade'       => $fade,
                'dark'       => $dark,
                'class'      => ClassHelper::extraClasses($el, ['carousel', 'slide', 'carousel-fade', 'carousel-dark']),
            ],
            'consumes' => true,
            'children' => $children,
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
