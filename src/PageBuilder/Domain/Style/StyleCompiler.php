<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Domain\Style;

/**
 * CSS compiler of plan 04, mirrored by editor/src/core/styles/compile.ts (fixtures/styles keeps both byte-identical).
 * Output: :root tokens, site classes (declared order) then nodes (document order); base and states first, then one
 * @media block per breakpoint, ascending. Node selectors double the class so a node always beats a site class.
 */
final class StyleCompiler
{
    private const NODE_ID = '/^[A-Za-z0-9_-]{1,64}$/';
    private const CLASS_ID = '/^[a-z][a-z0-9-]{0,40}$/';
    private const BREAKPOINT_ID = '/^[a-z][a-z0-9-]{0,15}$/';

    /** @var list<array{path: string, code: string}> */
    private array $diagnostics = [];
    /** @var array<string, array{type: string, ref: string}> */
    private array $tokens = [];
    /** @var list<array{id: string, minWidth: int}> */
    private array $breakpoints = [];
    /** @var array<string, string> asset id => URL resolved by the host */
    private array $assets = [];

    public static function nodeClass(string $id): string
    {
        return 'cms-n-' . $id;
    }

    public static function siteClass(string $id): string
    {
        return 'cms-c-' . $id;
    }

    /**
     * @param array<string, mixed> $design breakpoints, tokens, classes
     * @param list<array{id: string, styles: mixed}> $nodes styled nodes in document order
     * @param array<string, string> $assets asset id => public URL (background images, plan 05)
     */
    public static function compile(array $design, array $nodes, array $assets = []): CompiledStyles
    {
        $compiler = new self();
        $compiler->assets = $assets;
        return $compiler->run($design, $nodes);
    }

    /** @return array<array-key, mixed> */
    private static function map(mixed $value): array
    {
        return is_array($value) ? $value : [];
    }

    private function diagnose(string $path, string $code): void
    {
        $this->diagnostics[] = ['path' => $path, 'code' => $code];
    }

    private function run(array $design, array $nodes): CompiledStyles
    {
        $resolved = StyleTokens::resolve(self::map($design['tokens'] ?? null), $this->diagnostics);
        $this->tokens = $resolved['table'];
        $this->breakpoints = $this->validBreakpoints($design['breakpoints'] ?? null);

        $classes = $this->fresh();
        $classMap = self::map($design['classes'] ?? null);
        $classIds = array_map('strval', array_keys($classMap));
        if (count($classIds) > StyleMatrix::limit('classes')) {
            $this->diagnose('design.classes', 'LIMIT');
        } else {
            foreach ($classIds as $id) {
                if (!preg_match(self::CLASS_ID, $id)) {
                    $this->diagnose("design.classes.{$id}", 'INVALID_ID');
                } else {
                    $this->block('.' . self::siteClass($id), self::map($classMap[$id])['styles'] ?? null, "design.classes.{$id}.styles", $classes);
                }
            }
        }

        $own = $this->fresh();
        foreach ($nodes as $node) {
            $id = (string) $node['id'];
            if (!preg_match(self::NODE_ID, $id)) {
                $this->diagnose("nodes.{$id}", 'INVALID_ID');
                continue;
            }
            $listed = self::map($node['styles'] ?? null)['classes'] ?? null;
            foreach (is_array($listed) && array_is_list($listed) ? $listed : [] as $i => $class) {
                if (!is_string($class) || !in_array($class, $classIds, true) || !preg_match(self::CLASS_ID, $class)) {
                    $this->diagnose("nodes.{$id}.styles.classes.{$i}", 'UNKNOWN_CLASS');
                }
            }
            $selector = '.' . self::nodeClass($id) . '.' . self::nodeClass($id);
            $this->block($selector, $node['styles'] ?? null, "nodes.{$id}.styles", $own);
        }

        $chunks = $resolved['root'] === '' ? [] : [$resolved['root']];
        $this->emit($classes, $chunks);
        $this->emit($own, $chunks);
        return new CompiledStyles(implode("\n", $chunks), $this->diagnostics);
    }

    /** @return array{rules: list<string>, media: array<string, list<string>>} */
    private function fresh(): array
    {
        return ['rules' => [], 'media' => array_fill_keys(array_column($this->breakpoints, 'id'), [])];
    }

    /** @return list<array{id: string, minWidth: int}> */
    private function validBreakpoints(mixed $list): array
    {
        $ok = is_array($list) && array_is_list($list) && count($list) <= StyleMatrix::limit('breakpoints');
        $seen = [];
        foreach ($ok ? $list : [] as $i => $b) {
            $ok = $ok && is_array($b) && is_string($b['id'] ?? null) && preg_match(self::BREAKPOINT_ID, $b['id'])
                && is_int($b['minWidth'] ?? null) && $b['minWidth'] >= 1 && $b['minWidth'] <= StyleMatrix::limit('minWidth')
                && ($i === 0 || $b['minWidth'] > $list[$i - 1]['minWidth']) && !in_array($b['id'], $seen, true);
            $seen[] = $b['id'] ?? null;
        }
        if (!$ok) {
            $this->diagnose('design.breakpoints', 'INVALID_BREAKPOINTS');
            return [];
        }
        return array_map(fn (array $b) => ['id' => $b['id'], 'minWidth' => $b['minWidth']], $list);
    }

    private function block(string $selector, mixed $raw, string $path, array &$output): void
    {
        $block = self::map($raw);
        $base = $this->declarations($block['base'] ?? null, "{$path}.base");
        if ($base !== '') {
            $output['rules'][] = "{$selector}{{$base}}";
        }
        $states = self::map($block['states'] ?? null);
        foreach (array_keys($states) as $state) {
            if (!in_array((string) $state, StyleMatrix::states(), true)) {
                $this->diagnose("{$path}.states.{$state}", 'UNKNOWN_STATE');
            }
        }
        foreach (StyleMatrix::states() as $state) {
            if (!array_key_exists($state, $states)) {
                continue;
            }
            $body = $this->declarations($states[$state], "{$path}.states.{$state}");
            if ($body !== '') {
                $output['rules'][] = "{$selector}:{$state}{{$body}}";
            }
        }
        foreach (self::map($block['breakpoints'] ?? null) as $id => $declarations) {
            if (!array_key_exists((string) $id, $output['media'])) {
                $this->diagnose("{$path}.breakpoints.{$id}", 'UNKNOWN_BREAKPOINT');
                continue;
            }
            $body = $this->declarations($declarations, "{$path}.breakpoints.{$id}");
            if ($body !== '') {
                $output['media'][(string) $id][] = "{$selector}{{$body}}";
            }
        }
    }

    private function declarations(mixed $raw, string $path): string
    {
        $entries = self::map($raw);
        if (count($entries) > StyleMatrix::limit('declarations')) {
            $this->diagnose($path, 'LIMIT');
            return '';
        }
        $out = [];
        foreach ($entries as $name => $value) {
            $css = (new StyleDeclaration($this->tokens, $this->assets))->css((string) $name, $value);
            if (is_string($css)) {
                $out[] = [StyleMatrix::order((string) $name), StyleMatrix::property((string) $name)['css'] . ':' . $css];
            } else {
                $this->diagnose("{$path}.{$name}", $css['code']);
            }
        }
        usort($out, fn (array $a, array $b) => $a[0] <=> $b[0]);
        return implode(';', array_column($out, 1));
    }

    private function emit(array $output, array &$chunks): void
    {
        array_push($chunks, ...$output['rules']);
        foreach ($this->breakpoints as $bp) {
            $rules = $output['media'][$bp['id']] ?? [];
            if ($rules !== []) {
                $chunks[] = "@media (min-width:{$bp['minWidth']}px){\n" . implode("\n", $rules) . "\n}";
            }
        }
    }
}
