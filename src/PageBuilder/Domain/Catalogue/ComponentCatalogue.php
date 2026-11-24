<?php
declare(strict_types=1);

namespace CeibaCms\PageBuilder\Domain\Catalogue;

/**
 * Server-managed versioned component catalogue.
 *
 * Ensures component specifications, containment rules, and property schemas
 * are versioned and authoritatively validated on the server.
 */
final class ComponentCatalogue
{
    /** @var array<string, ComponentDescriptor> */
    private array $components = [];

    public function register(ComponentDescriptor $descriptor): void
    {
        $this->components[$descriptor->name] = $descriptor;
    }

    public function has(string $name): bool
    {
        return isset($this->components[$name]);
    }

    public function get(string $name): ?ComponentDescriptor
    {
        return $this->components[$name] ?? null;
    }

    /** @return list<ComponentDescriptor> */
    public function all(): array
    {
        return array_values($this->components);
    }

    /**
     * Inspects a component type. If unknown in this catalogue, returns a recoverable
     * diagnostic indicating the node must be preserved as data without silent mutation.
     *
     * @return array<string, mixed>|null Null if component is recognized, array diagnostic otherwise.
     */
    public function diagnose(string $name): ?array
    {
        if ($this->has($name)) {
            return null;
        }

        return [
            'type'        => $name,
            'isKnown'     => false,
            'status'      => 'retained_as_data',
            'recoverable' => true,
            'message'     => "Component '{$name}' is not registered in the active catalogue. It is retained as data to prevent loss, but mutating its properties is restricted.",
        ];
    }

    /**
     * Factory creating a catalogue populated with the standard components (Defaults/: core, content).
     */
    public static function createDefault(): self
    {
        $catalogue = new self();
        Defaults\CoreComponents::register($catalogue);
        Defaults\ContentComponents::register($catalogue);

        return $catalogue;
    }

    /** @return list<array<string, mixed>> */
    public function toArray(): array
    {
        return array_map(fn(ComponentDescriptor $c) => $c->toArray(), array_values($this->components));
    }
}
