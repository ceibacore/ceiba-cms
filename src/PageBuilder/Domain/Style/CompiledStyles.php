<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Domain\Style;

/** Stylesheet of a page (or a design) and the declarations that were left out, with their path and reason. */
final class CompiledStyles
{
    /** @param list<array{path: string, code: string}> $diagnostics */
    public function __construct(
        public readonly string $css,
        public readonly array $diagnostics,
    ) {}

    /** @return array{css: string, diagnostics: list<array{path: string, code: string}>} */
    public function toArray(): array
    {
        return ['css' => $this->css, 'diagnostics' => $this->diagnostics];
    }
}
