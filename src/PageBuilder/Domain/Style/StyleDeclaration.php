<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Domain\Style;

/** One declaration: a literal checked by the grammar, or a {token} reference of the type the property accepts. */
final class StyleDeclaration
{
    /** @param array<string, array{type: string, ref: string}> $tokens */
    public function __construct(private readonly array $tokens) {}

    /** @return string|array{code: string} the CSS value, or the diagnostic code */
    public function css(string $name, mixed $value): string|array
    {
        $spec = StyleMatrix::property($name);
        if ($spec === null) {
            return ['code' => 'UNKNOWN_PROPERTY'];
        }
        if (is_array($value)) {
            $ref = $value['token'] ?? null;
            $token = is_string($ref) ? ($this->tokens[$ref] ?? null) : null;
            if ($token === null) {
                return ['code' => 'UNKNOWN_TOKEN'];
            }
            return $token['type'] === StyleValues::acceptedTokenType($spec) ? $token['ref'] : ['code' => 'TOKEN_TYPE'];
        }
        $css = StyleValues::literal($spec, $value);
        return $css ?? ['code' => 'INVALID_VALUE'];
    }
}
