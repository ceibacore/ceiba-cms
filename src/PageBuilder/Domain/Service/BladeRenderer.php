<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Service;

class BladeRenderer implements BladeRendererInterface
{
    private string $viewsDir;

    public function __construct(
        private readonly LoopResolverInterface $loopResolver,
        private readonly VariableInterpolator $variableInterpolator,
        string $viewsDir = ''
    ) {
        $this->viewsDir = $viewsDir !== '' ? $viewsDir : dirname(__DIR__, 2) . '/Presentation/views';
    }

    public function renderPage(array $tree, array $data = []): string
    {
        $html = '';
        foreach ($tree as $node) {
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
                $options = [];
                if (isset($loop['limit'])) {
                    $options['limit'] = $loop['limit'];
                }
                if (isset($loop['offset'])) {
                    $options['offset'] = $loop['offset'];
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

            // Special case: accordion injects _parent_id and always_open into its items
            if (($node['type'] ?? '') === 'accordion') {
                $accordionId = $interpolatedProps['id'] ?? '';
                $alwaysOpen = $interpolatedProps['always_open'] ?? false;
                foreach ($children as &$child) {
                    $child['props']['_parent_id'] = $accordionId;
                    $child['props']['always_open'] = $alwaysOpen;
                }
                unset($child);
            }

            foreach ($children as $child) {
                $childrenHtml .= $this->renderNode($child, $context);
            }
        }

        // 4. Render component view template
        return $this->renderView($node['type'], $interpolatedProps, $childrenHtml, $context);
    }

    private function renderView(string $type, array $props, string $childrenHtml, array $context = []): string
    {
        $file = $this->viewsDir . '/' . $type . '.php';
        if (!file_exists($file)) {
            return $childrenHtml;
        }

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
}
