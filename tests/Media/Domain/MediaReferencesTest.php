<?php
declare(strict_types=1);

namespace CeibaCms\Tests\Media\Domain;

use CeibaCms\Media\Domain\MediaReferences;
use CeibaCms\Media\Domain\MediaSettings;
use CeibaCms\Media\Infrastructure\Images\VariantRequest;
use PHPUnit\Framework\TestCase;

final class MediaReferencesTest extends TestCase
{
    public function testReferencesAreFoundInPropsAndStylesAtAnyDepthOncePerId(): void
    {
        $tree = [
            ['id' => 'a', 'type' => 'image', 'props' => ['src' => ['asset' => 'm1', 'alt' => 'Hero']], 'children' => [
                ['id' => 'b', 'type' => 'gallery', 'props' => ['items' => [['image' => ['asset' => 'm2']], ['image' => ['asset' => 'm1']]]]],
            ]],
            ['id' => 'c', 'type' => 'section', 'styles' => ['breakpoints' => ['md' => ['backgroundImage' => ['asset' => 'm3']]]]],
            ['id' => 'd', 'type' => 'text', 'props' => ['content' => 'asset', 'meta' => ['asset' => 'm4', 'other' => 1]]],
            ['id' => 'e', 'type' => 'image', 'props' => ['src' => ['asset' => '../etc/passwd']]],
        ];
        self::assertSame(['m1', 'm2', 'm3'], MediaReferences::collect($tree));
        self::assertSame(['m9'], MediaReferences::inValues(['hero' => ['styles' => ['base' => ['backgroundImage' => ['asset' => 'm9']]]]]));
    }

    public function testSettingsKeepOnlyValidWidthsAndFallBackToDefaults(): void
    {
        self::assertSame([320, 480, 2000], MediaSettings::widths(['2000', 480, 'x', 10, 480, ' 320 ', 99999]));
        self::assertSame([480, 960, 1600], MediaSettings::from(null)->widths);
        self::assertTrue(MediaSettings::from(null)->webp);
    }

    public function testTheUploaderChoicesOverrideTheSiteDefaults(): void
    {
        $settings = new MediaSettings([480, 960], 75, true);
        $defaults = VariantRequest::fromInput([], $settings);
        self::assertSame([[480, 960], true, true, 75], [$defaults->widths, $defaults->optimize, $defaults->webp, $defaults->quality]);
        $chosen = VariantRequest::fromInput(['widths' => '1600', 'optimize' => '0', 'webp' => 'false'], $settings);
        self::assertSame([[1600], false, false], [$chosen->widths, $chosen->optimize, $chosen->webp]);
        self::assertFalse(VariantRequest::fromInput(['widths' => '', 'optimize' => '0', 'webp' => '0'], $settings)->wantsVariants());
    }
}
