<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Application;

/**
 * Routes of the host that site part rules may name (plan 06 D-4), with a label for the editor. The host registers
 * them (Campus: its public pages outside the CMS); a rule naming any other route is refused.
 */
final class HostRoutes
{
    /** @param array<string, string> $routes name => label */
    public function __construct(public readonly array $routes = []) {}

    /** @return list<string> */
    public function names(): array
    {
        return array_keys($this->routes);
    }
}
