<?php
declare(strict_types=1);

namespace CeibaCms\Tests\DataSource;

use CeibaCms\PageBuilder\Domain\Service\LoopValidator;
use PHPUnit\Framework\TestCase;

/** Plan 07-B: loops over a query block are valid at save time; malformed ones are not. */
final class LoopShapeTest extends TestCase
{
    public function testQueryLoopsAndSourceLoops(): void
    {
        self::assertSame([], LoopValidator::errors(['query' => ''], 'n'));
        self::assertSame([], LoopValidator::errors(['query' => 'courses', 'variable' => 'course'], 'n'));
        self::assertSame([], LoopValidator::errors(['source' => 'module:courses', 'variable' => 'c'], 'n'));
        self::assertNotSame([], LoopValidator::errors(['query' => 'Bad-Id'], 'n'));
        self::assertNotSame([], LoopValidator::errors(['query' => 'a', 'variable' => 3], 'n'));
        self::assertNotSame([], LoopValidator::errors(['variable' => 'c'], 'n'));
        self::assertNotSame([], LoopValidator::errors('x', 'n'));
    }
}
