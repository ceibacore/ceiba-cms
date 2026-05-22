<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Service;

class LoopResolver implements LoopResolverInterface
{
    /** @var array<string, DataProviderInterface> */
    private array $providers = [];

    public function register(string $name, DataProviderInterface $provider): void
    {
        $this->providers[$name] = $provider;
    }

    public function resolve(string $source, array $options = []): iterable
    {
        $provider = $this->providers[$source] ?? null;

        if ($provider === null && str_starts_with($source, 'api:')) {
            $provider = $this->providers['api'] ?? null;
            $options['url'] = substr($source, 4);
        }

        if ($provider === null) {
            return [];
        }

        $data = $provider->getData($options);

        // Convert iterable to array to support offset and limit if needed
        if ($data instanceof \Traversable) {
            $data = iterator_to_array($data);
        }

        if (is_array($data)) {
            $offset = isset($options['offset']) ? (int) $options['offset'] : 0;
            $limit = isset($options['limit']) ? (int) $options['limit'] : null;

            if ($offset > 0 || $limit !== null) {
                return array_slice($data, $offset, $limit);
            }
        }

        return $data;
    }
}
