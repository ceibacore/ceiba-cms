<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Service;

class BladeRenderer implements BladeRendererInterface
{
    private string $viewsDir;

    public function __construct(
        private readonly LoopResolverInterface $loopResolver,
        private readonly VariableInterpolator $variableInterpolator,
        private readonly ?UiFrameworkRegistry $uiRegistry = null,
        string $viewsDir = ''
    ) {
        $this->viewsDir = $viewsDir;
    }

    public function renderPage(array $tree, array $data = []): string
    {
        $html = '';
        foreach ($tree as $node) {
            if (!is_array($node)) {
                continue;
            }
            $html .= $this->renderNode($node, $data);
        }
        return $html;
    }

    public function renderNode(array $node, array $context = []): string
    {
        // 1. Resolve Loop if present
        if (isset($node['loop']) && is_array($node['loop'])) {
            $loop = $node['loop'];
            if (!empty($loop['source']) && !empty($loop['variable'])) {
                // Interpolate loop options using current context (to resolve e.g. Category ID dynamically)
                $loop = $this->variableInterpolator->interpolateProps($loop, $context);

                $options = [];
                if (isset($loop['limit'])) {
                    $options['limit'] = $loop['limit'];
                }
                if (isset($loop['offset'])) {
                    $options['offset'] = $loop['offset'];
                }
                if (isset($loop['filters']) && is_array($loop['filters'])) {
                    $options['filters'] = $loop['filters'];
                }
                if (isset($loop['sort']) && is_array($loop['sort'])) {
                    $options['sort'] = $loop['sort'];
                }

                $items = $this->loopResolver->resolve($loop['source'], $options);
                $output = '';
                foreach ($items as $item) {
                    $newContext = $context;
                    $newContext[$loop['variable']] = $item;

                    $nodeWithoutLoop = $node;
                    unset($nodeWithoutLoop['loop']);
                    $output .= $this->renderNode($nodeWithoutLoop, $newContext);
                }
                return $output;
            }
        }

        // 2. Interpolate variables in props using the current context
        $rawProps = $node['props'] ?? [];
        $interpolatedProps = $this->variableInterpolator->interpolateProps($rawProps, $context);

        // 3. Render children recursively
        $childrenHtml = '';
        if (isset($node['children']) && is_array($node['children'])) {
            $children = $node['children'];

            // Accordion: the parent id MUST be set so every accordion-item can
            // reference it via data-bs-parent="#<id>" (Bootstrap collapse wiring).
            // TreeValidator enforces props.id at save-time; the fallback here is a
            // last-resort safety net for trees that bypass validation.
            $compName = str_replace('-', '_', $node['name'] ?? $node['type'] ?? '');
            if ($compName === 'accordion') {
                if (empty($interpolatedProps['id'])) {
                    // Should never happen if TreeValidator ran — log and recover.
                    trigger_error(
                        "Accordion node '" . ($node['id'] ?? 'unknown') . "' has no props.id — generating fallback. Run TreeValidator before rendering.",
                        E_USER_WARNING
                    );
                    $interpolatedProps['id'] = 'accordion_' . uniqid();
                }

                // Guaranteed non-empty from this point on.
                $accordionId = $interpolatedProps['id'];
                $alwaysOpen  = $interpolatedProps['always_open'] ?? false;

                foreach ($children as &$child) {
                    if (!isset($child['props']) || !is_array($child['props'])) {
                        $child['props'] = [];
                    }
                    $child['props']['_parent_id'] = $accordionId;  // required by accordion-item view
                    $child['props']['always_open'] = $alwaysOpen;
                }
                unset($child);
            }

            foreach ($children as $child) {
                $childrenHtml .= $this->renderNode($child, $context);
            }
        }

        // 4. Render component view template
        // Use `name` to find the component template (e.g. views/card.php).
        // If `name` is null or no template exists, renderView falls back gracefully to $childrenHtml.
        $viewName = $node['name'] ?? $node['type'];
        $viewName = str_replace('-', '_', $viewName);
        return $this->renderView($viewName, $node['type'] ?? '', $interpolatedProps, $childrenHtml, $context);
    }

    private function getViewsDir(): string
    {
        if ($this->uiRegistry !== null && $this->uiRegistry->hasActive()) {
            return $this->uiRegistry->getActiveModule()->getViewsDirectoryPath();
        }
        return $this->viewsDir;
    }

    private function renderView(string $type, string $originalType, array $props, string $childrenHtml, array $context = []): string
    {
        $viewsDir = $this->getViewsDir();
        $file = $viewsDir !== '' ? $viewsDir . '/' . $type . '.php' : '';
        if ($file !== '' && file_exists($file)) {
            // Prepare variables for clean scope in template file
            $slot = $childrenHtml;

            // Extract context variables so views can access them (e.g. $breadcrumbs)
            extract($context, EXTR_SKIP);
            
            ob_start();
            try {
                include $file;
            } catch (\Throwable $e) {
                ob_end_clean();
                throw $e;
            }
            return ob_get_clean();
        }

        // 1. Fallback to raw HTML if _raw_html prop is defined.
        if (isset($props['_raw_html'])) {
            return (string) $props['_raw_html'];
        }

        // 2. Fallback to rendering a dynamic HTML tag if type is a valid tag name.
        $tag = !empty($props['tag']) ? $props['tag'] : ($originalType === 'text' ? 'p' : $originalType);

        if ($tag === 'html') {
            return $props['content'] ?? '';
        }

        if (preg_match('/^[a-zA-Z0-9\-_:]+$/', $tag)) {
            $content = $props['content'] ?? '';
            $skip = ['tag', 'content', 'children', 'bindings', 'loop', '_raw_html'];
            
            $attrStr = '';
            // Render class first for clean output
            if (!empty($props['class'])) {
                $attrStr .= ' class="' . htmlspecialchars((string) $props['class'], ENT_QUOTES, 'UTF-8') . '"';
            }
            
            foreach ($props as $key => $value) {
                if (in_array($key, $skip, true) || $key === 'class' || $value === null || str_starts_with($key, '_')) {
                    continue;
                }
                
                if (is_bool($value)) {
                    if ($value) {
                        $attrStr .= ' ' . htmlspecialchars((string) $key, ENT_QUOTES, 'UTF-8');
                    }
                } else {
                    $attrStr .= ' ' . htmlspecialchars((string) $key, ENT_QUOTES, 'UTF-8') . '="' . htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8') . '"';
                }
            }

            $selfClosing = ['img', 'hr', 'br', 'input', 'meta', 'link', 'source', 'embed', 'param', 'track', 'area', 'col'];
            if (in_array(strtolower($tag), $selfClosing, true)) {
                return "<{$tag}{$attrStr}>";
            }
            
            $inner = htmlspecialchars((string) $content, ENT_QUOTES, 'UTF-8') . $childrenHtml;
            return "<{$tag}{$attrStr}>{$inner}</{$tag}>";
        }

        return $childrenHtml;
    }

    public function mergeTemplateAndPage(array $templateTree, array $pageContent): array
    {
        $merged = [];
        foreach ($templateTree as $node) {
            if (!is_array($node)) {
                continue;
            }

            if (($node['type'] ?? '') === 'slot') {
                $slotName = $node['props']['name'] ?? 'main';
                
                $slotNodes = [];
                if (isset($pageContent[$slotName]) && is_array($pageContent[$slotName])) {
                    $slotNodes = $pageContent[$slotName];
                } elseif ($slotName === 'main' && $this->isList($pageContent)) {
                    $slotNodes = $pageContent;
                }

                foreach ($this->mergeTemplateAndPage($slotNodes, $pageContent) as $n) {
                    $merged[] = $n;
                }
            } else {
                if (isset($node['children']) && is_array($node['children'])) {
                    $node['children'] = $this->mergeTemplateAndPage($node['children'], $pageContent);
                }
                $merged[] = $node;
            }
        }
        return $merged;
    }

    private function isList(array $arr): bool
    {
        if (empty($arr)) {
            return true;
        }
        return array_keys($arr) === range(0, count($arr) - 1);
    }
}
